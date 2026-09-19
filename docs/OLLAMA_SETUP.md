# Run Code, Explained. with Ollama

Ollama lets the explanation model run on your own computer. This mode does not
use OpenAI or Gemini credits, and the submitted code stays on your machine.

## What you need

- Node.js 20 or newer
- `clang++`
- Ollama
- Enough free memory for the model you choose

## 1. Install Ollama

Download Ollama from [ollama.com/download](https://ollama.com/download) and
follow the installer for your computer.

Open a terminal and check that it works:

```bash
ollama --version
```

## 2. Download a coding model

The project uses `qwen3-coder:30b` by default:

```bash
ollama pull qwen3-coder:30b
```

That model is large. If your computer cannot run it comfortably, choose a
smaller coding model and put its exact Ollama name in `OLLAMA_MODEL`.

## 3. Start Ollama

The Ollama desktop app usually starts its local service automatically. You can
check it with:

```bash
curl http://127.0.0.1:11434/api/tags
```

If you receive JSON containing a `models` list, Ollama is ready.

## 4. Set up this project

From the project folder:

```bash
npm install
cp .env.example .env
```

Open `.env` and change the provider:

```text
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3-coder:30b
```

You do not need `OPENAI_API_KEY` or `GEMINI_API_KEY` in Ollama mode.

## 5. Start the website

The project reads `.env` when it starts:

```bash
npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173), paste C++ code, and press
**Explain my code**.

## Common problems

### “Ollama is not running”

Open the Ollama app, then retry:

```bash
curl http://127.0.0.1:11434/api/tags
```

### “model not found”

The value in `OLLAMA_MODEL` must match a downloaded model:

```bash
ollama list
```

### The explanation is slow

The model may be too large for the computer. Choose a smaller coding model,
update `OLLAMA_MODEL`, and restart the website.

### C++ checker is unavailable

Install Clang and confirm this command works:

```bash
clang++ --version
```
