import {
  buildUserPrompt,
  explanationSchema,
  systemInstructions,
} from "./prompt.mjs";

class ProviderError extends Error {
  constructor(provider, message, status, cause) {
    super(message, { cause });
    this.name = "ProviderError";
    this.provider = provider;
    this.status = status;
  }
}

async function fetchWithTimeout(url, options, timeoutMs = 45_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function parseErrorResponse(response) {
  const text = await response.text();
  try {
    const parsed = JSON.parse(text);
    return parsed.error?.message || parsed.message || text;
  } catch {
    return text;
  }
}

function parseOpenAIOutput(payload) {
  for (const output of payload.output || []) {
    if (output.type !== "message") continue;
    for (const content of output.content || []) {
      if (content.type === "refusal") {
        throw new Error(content.refusal || "The model refused this request.");
      }
      if (content.type === "output_text") {
        return JSON.parse(content.text);
      }
    }
  }
  throw new Error("OpenAI returned no explanation.");
}

export async function explainWithOpenAI(code, groups) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new ProviderError(
      "openai",
      "OPENAI_API_KEY is not configured.",
      503,
    );
  }

  let response;
  try {
    response = await fetchWithTimeout("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.6-luna",
        reasoning: { effort: "none" },
        store: false,
        instructions: systemInstructions,
        input: buildUserPrompt(code, groups),
        max_output_tokens: 4_000,
        text: {
          verbosity: "low",
          format: {
            type: "json_schema",
            name: "code_explanation",
            strict: true,
            schema: explanationSchema,
          },
        },
      }),
    });
  } catch (error) {
    throw new ProviderError(
      "openai",
      "OpenAI could not be reached.",
      503,
      error,
    );
  }

  if (!response.ok) {
    throw new ProviderError(
      "openai",
      await parseErrorResponse(response),
      response.status,
    );
  }

  try {
    return parseOpenAIOutput(await response.json());
  } catch (error) {
    throw new ProviderError(
      "openai",
      "OpenAI returned an explanation we could not safely use.",
      502,
      error,
    );
  }
}

export async function explainWithGemini(code, groups) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ProviderError(
      "gemini",
      "GEMINI_API_KEY is not configured for fallback.",
      503,
    );
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  let response;

  try {
    response = await fetchWithTimeout(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstructions }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: buildUserPrompt(code, groups) }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: explanationSchema,
          temperature: 0.2,
          maxOutputTokens: 4_000,
        },
      }),
    });
  } catch (error) {
    throw new ProviderError(
      "gemini",
      "Gemini could not be reached.",
      503,
      error,
    );
  }

  if (!response.ok) {
    throw new ProviderError(
      "gemini",
      await parseErrorResponse(response),
      response.status,
    );
  }

  try {
    const payload = await response.json();
    const text = payload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("");
    if (!text) throw new Error("Gemini returned no explanation.");
    return JSON.parse(text);
  } catch (error) {
    throw new ProviderError(
      "gemini",
      "Gemini returned an explanation we could not safely use.",
      502,
      error,
    );
  }
}

export async function explainWithOllama(code, groups) {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  let response;

  try {
    response = await fetchWithTimeout(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "qwen3-coder:30b",
        stream: false,
        format: explanationSchema,
        messages: [
          { role: "system", content: systemInstructions },
          { role: "user", content: buildUserPrompt(code, groups) },
        ],
        options: { temperature: 0.2 },
      }),
    });
  } catch (error) {
    throw new ProviderError(
      "ollama",
      "Ollama is not running or could not be reached.",
      503,
      error,
    );
  }

  if (!response.ok) {
    throw new ProviderError(
      "ollama",
      await parseErrorResponse(response),
      response.status,
    );
  }

  try {
    const payload = await response.json();
    return JSON.parse(payload.message?.content);
  } catch (error) {
    throw new ProviderError(
      "ollama",
      "Ollama returned an explanation we could not safely use.",
      502,
      error,
    );
  }
}

export async function requestExplanation(code, groups) {
  const provider = (process.env.AI_PROVIDER || "openai").toLowerCase();

  if (provider === "ollama") {
    return {
      provider: "Ollama",
      result: await explainWithOllama(code, groups),
    };
  }

  if (provider !== "openai") {
    throw new ProviderError(
      provider,
      `The provider “${provider}” is not supported.`,
      500,
    );
  }

  try {
    return {
      provider: "OpenAI",
      result: await explainWithOpenAI(code, groups),
    };
  } catch (openAIError) {
    if (openAIError.status === 502) throw openAIError;

    try {
      return {
        provider: "Gemini fallback",
        result: await explainWithGemini(code, groups),
      };
    } catch (geminiError) {
      throw new AggregateError(
        [openAIError, geminiError],
        `OpenAI failed (${openAIError.message}) and Gemini fallback failed (${geminiError.message}).`,
      );
    }
  }
}

export { ProviderError };
