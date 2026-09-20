import { collectMeaningfulLines, groupMeaningfulLines, validateExplanation } from "./groups.mjs";
import { validateClangSyntax } from "./cpp.mjs";
import { requestExplanation } from "./providers.mjs";
import { clangLanguages, detectLanguage, languageLabel } from "../src/language.js";

const maxBodyBytes = 100_000;

function setCorsHeaders(request, response) {
  const configuredOrigin = process.env.FRONTEND_ORIGIN || "*";
  const requestOrigin = request.headers.origin;
  const allowedOrigin =
    configuredOrigin === "*" || configuredOrigin === requestOrigin
      ? configuredOrigin
      : null;

  if (allowedOrigin) {
    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  }
  response.setHeader("Vary", "Origin");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response, status, value) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.end(JSON.stringify(value));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body, "utf8") > maxBodyBytes) {
        reject(new Error("The submitted code is too large."));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("The request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

export async function handleApiRequest(request, response, prefix = "") {
  setCorsHeaders(request, response);

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }

  const pathname = new URL(request.url || "/", "http://localhost").pathname;
  const route = pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname;

  if (request.method === "GET" && route === "/health") {
    sendJson(response, 200, {
      ok: true,
      provider: process.env.AI_PROVIDER || "openai",
    });
    return;
  }

  if (request.method !== "POST" || route !== "/explain") {
    sendJson(response, 404, { message: "That API route does not exist." });
    return;
  }

  try {
    const body = await readJson(request);
    if (typeof body.code !== "string" || !body.code.trim()) {
      sendJson(response, 400, { message: "Paste some code first." });
      return;
    }

    const language = detectLanguage(body.code, body.filename, body.language);

    const meaningfulLines = collectMeaningfulLines(body.code);
    const limit = Number(process.env.MAX_MEANINGFUL_LINES || 100);
    if (meaningfulLines.length > limit) {
      sendJson(response, 400, {
        message: `Please use ${limit} meaningful lines or fewer.`,
      });
      return;
    }

    if (clangLanguages.has(language)) {
      let syntax;
      try {
        syntax = await validateClangSyntax(body.code, language);
      } catch (error) {
        sendJson(response, 503, {
          kind: "validator_unavailable",
          message: `The ${languageLabel(language)} checker is unavailable. Make sure clang is installed.`,
          detail: error.message,
        });
        return;
      }

      if (!syntax.valid) {
        const diagnostics = syntax.diagnostics.length
          ? syntax.diagnostics
          : [
              {
                line: 1,
                column: 1,
                message: "The checker found a problem.",
                simpleMessage:
                  "The computer found a problem in this code but could not point to one exact line.",
              },
            ];
        sendJson(response, 422, {
          kind: "syntax_error",
          message: "The code needs a small fix before it can be explained.",
          diagnostics,
        });
        return;
      }
    }

    const groups = groupMeaningfulLines(body.code, language);
    const generated = await requestExplanation(body.code, groups, language);
    const explanation = validateExplanation(generated.result, groups);

    sendJson(response, 200, {
      ...explanation,
      language,
      provider: generated.provider,
    });
  } catch (error) {
    sendJson(response, 502, {
      kind: "explanation_error",
      message: error.message || "The explanation service failed.",
    });
  }
}
