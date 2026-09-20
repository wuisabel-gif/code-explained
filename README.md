# Code, Explained.

Code, Explained. turns small C++ programs into technical stories for people who just started programming. Alice is the action, Bobo is memory, and each sentence maps back to the source lines it describes.

## Features

- A short summary of the whole program
- One explanation sentence for every one or two meaningful lines
- Clickable mappings between explanations and source lines
- Beginner-friendly C++ syntax diagnostics
- Clang-based syntax validation without compiling or executing submitted code
- OpenAI as the primary explanation provider
- Gemini fallback after a technical OpenAI failure
- Optional local Ollama mode
- A built-in preview example before an AI provider is configured

[View the complete demo](docs/DEMO.md).

## How it works

```text
C++ source
    ↓
Clang syntax validation
    ↓
Line grouping
    ↓
AI explanation provider
    ↓
Validated explanation with server-owned line mappings
```

Submitted C++ is syntax-checked but never compiled into an executable or run.

## Local development

### Requirements

- Node.js 20 or newer
- `clang++`
- An OpenAI or Gemini API key, unless using Ollama locally

### Installation

```bash
npm install
cp .env.example .env
```

Set the provider configuration in `.env`, or export the variables in the shell:

```text
AI_PROVIDER=openai
OPENAI_API_KEY=your-key
OPENAI_MODEL=gpt-5.6-luna
GEMINI_API_KEY=your-fallback-key
GEMINI_MODEL=gemini-3.6-flash
```

Start the development server:

```bash
npm run dev
```

The development site is available at [http://127.0.0.1:5173](http://127.0.0.1:5173).

API keys belong only in server-side environment variables. `.env` is ignored by Git and must not be committed.

## Provider behavior

The default provider flow is:

```text
OpenAI
  ↓ technical failure, quota error, or unavailable service
Gemini
```

Responses that do not satisfy the required explanation structure are rejected rather than silently retried. This keeps quality problems visible.

For local-only processing, set:

```text
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3-coder:30b
```

See [docs/OLLAMA_SETUP.md](docs/OLLAMA_SETUP.md) for Ollama installation and configuration.

## Commands

```bash
npm run dev     # Start the Vite development server
npm test        # Run the test suite
npm run build   # Build the production frontend
npm run check   # Run tests and the production build
npm start       # Serve the built app and API
```

`npm start` serves the built application at [http://127.0.0.1:4173](http://127.0.0.1:4173). Production deployments require Node.js and `clang++`. The server accepts a `PORT` variable and listens on `HOST` (default: `0.0.0.0`).

## API

### `POST /api/explain`

Request:

```json
{
  "language": "cpp",
  "code": "int main() { return 0; }"
}
```

Successful responses contain a summary, provider label, and server-owned line mappings:

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

### `GET /api/health`

Returns the API status and active provider:

```json
{
  "ok": true,
  "provider": "openai"
}
```

## Project structure

```text
src/       React frontend
server/    API, validation, grouping, and provider integrations
tests/     Node test suite
docs/      Demo and setup documentation
design/    Product and implementation design materials
```

## Deployment

The frontend can be deployed as a static Vite site. The explanation API requires a server runtime with Node.js, `clang++`, and provider secrets, so it must be deployed separately from a static-only host such as GitHub Pages.

## License

This project is available under the [MIT License](LICENSE). Copyright © 2026 Isabel Wu.
