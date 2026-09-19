# Code, Explained.

Code, Explained. turns a small C++ file into patient English:

- one short summary of the whole program;
- exactly one explanation sentence for every one or two meaningful lines;
- clickable mappings between each sentence and its code lines;
- beginner-friendly explanations for C++ syntax errors;
- OpenAI as the primary provider;
- Gemini as an automatic fallback only after a technical OpenAI failure;
- optional local Ollama mode.

The submitted C++ is syntax-checked with Clang but never compiled into an
executable or run.

See [docs/DEMO.md](docs/DEMO.md) for a complete example of the code a user can
paste and the explanation they will receive.

## Local development

Requirements:

- Node.js 20 or newer
- `clang++`

Install dependencies:

```bash
npm install
```

Set provider keys in your shell:

```bash
export OPENAI_API_KEY="your-key"
export GEMINI_API_KEY="your-fallback-key"
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173).

Do not put either API key in browser code or commit a `.env` file.

## Provider behavior

The default flow is:

```text
OpenAI
  ↓ only after a technical failure, quota error, or unavailable service
Gemini
```

An OpenAI response that violates the required explanation structure is not
silently retried with Gemini. The server rejects it so quality problems remain
visible.

Set `AI_PROVIDER=ollama` to use a local model instead. See
[docs/OLLAMA_SETUP.md](docs/OLLAMA_SETUP.md).

## Commands

```bash
npm run dev
npm test
npm run build
npm run check
npm start
```

`npm start` serves the built `dist` folder at
[http://127.0.0.1:4173](http://127.0.0.1:4173).

## API

`POST /api/explain`

```json
{
  "language": "cpp",
  "code": "int main() { return 0; }"
}
```

The response contains a summary, a provider label, and server-owned line
mappings:

```json
{
  "summary": "This program starts and immediately finishes.",
  "provider": "OpenAI",
  "explanations": [
    {
      "groupId": "group-1",
      "lineNumbers": [1],
      "sentence": "This line starts the main part of the program and gives zero back when it finishes."
    }
  ]
}
```
