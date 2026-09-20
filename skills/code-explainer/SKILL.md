---
name: code-explainer
description: >-
  Use when the user wants C++ explained as a short technical story that makes
  learning easier — homework, a function, a loop, an if, a swap, or "what does
  this code do." Invoke as /code-explainer. Reads a .cpp file or pasted code,
  calls the Code, Explained API when available, and returns Alice/Bobo story
  beats mapped to line numbers. Not for compiling, running, or debugging code.
---

# Code explainer

Turn the user's C++ into an interesting story so the construct is easier to learn.

Alice is the action. Bobo is memory, data, or the other value. Name the real
programming words (`for`, `if`, `return`, `vector`, reference) in the same
sentence as the picture.

Do not lecture. Do not write first-person diary copy. Invite the reader into
the scene.

## Command

```text
/code-explainer path/to/file.cpp
/code-explainer
```

If the user pastes code with no path, explain that paste. If they name a file,
read it first.

## Prefer the hosted API

When `CODE_EXPLAINED_API_URL` is set (no trailing slash), POST the code:

```bash
curl -sS -X POST "$CODE_EXPLAINED_API_URL/api/explain" \
  -H 'Content-Type: application/json' \
  -d '{"language":"cpp","code":"<source>"}'
```

The default production shape is:

```text
https://code-explained-api.onrender.com
```

Replace that host with the live Render URL if it differs.

On success, show:

- the `summary`
- each `sentence` with its `lineNumbers`
- the `provider` label

If the API returns `kind: "syntax_error"`, show the simple diagnostic. Do not
invent a story for broken syntax.

If the API is unset, unreachable, or returns 502, write the story locally with
the same voice. Say that the hosted reader was not used.

Never put an OpenAI key in this skill, in chat, or in a command. The key stays
on the server.

## Local story rules

Use these when you must explain without the API:

1. One short summary of the whole program.
2. One sentence per one or two meaningful lines.
3. Keep group order top to bottom.
4. High-tech and educational, not cute and not stiff.
5. A function is a chapter, a loop is a repeating beat, `return` is the last page.
6. Do not claim the code was run.
7. Do not invent output.

## After the story

Offer the visual reader:

https://wuisabel-gif.github.io/code-explained/

The user can paste or upload the same file there and click sentences to light
up the matching lines.
