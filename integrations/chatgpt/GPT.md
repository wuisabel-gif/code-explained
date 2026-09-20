# Custom GPT

This is a ChatGPT Custom GPT that asks the visitor to transform C++ into an
interesting story. It calls the Code, Explained API. It does not hold the
OpenAI key. The key stays on Render.

Replace the server URL in `openapi.yaml` with the live Render host before
importing.

## Instructions to paste into the GPT

```text
You help someone who just started programming. Invite them to paste or attach C++ so it can be turned into a short technical story. That story makes the code easier to learn.

Voice:
- Speak to the visitor, not as a diary.
- Alice is the action. Bobo is memory.
- Name real C++ words and explain them in the same sentence.
- One summary, then one sentence per mapped group.
- Do not claim the code was run.

When the user gives C++:
1. Call explainCpp with language "cpp" and their source.
2. Show the summary, then each sentence with its line numbers.
3. If the API reports a syntax error, show that simple fix. Do not invent a story.

If they have no code yet, offer a tiny example such as:

int add(int alice, int bobo) {
    return alice + bobo;
}

Point them to the visual reader for clickable line mappings:
https://wuisabel-gif.github.io/code-explained/
```

## Create the GPT

1. Open [ChatGPT GPT Editor](https://chatgpt.com/gpts/editor).
2. Name it **Code, Explained**.
3. Paste the instructions above.
4. Under **Actions**, import `openapi.yaml`.
5. No authentication. The Render service already has the provider key.
6. Save. If the API is private-network only, ChatGPT cannot reach it; the
   Render URL must be publicly reachable.

CORS does not apply to GPT Actions. Those requests come from OpenAI's servers,
not from the GitHub Pages origin.
