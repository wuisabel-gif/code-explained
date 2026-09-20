# Deployment

The application uses two deployment targets:

```text
GitHub Pages → React/Vite frontend
Render       → Node API, Clang, and AI provider integration
```

GitHub Pages cannot run the Node API or hold AI provider secrets. The API is
therefore deployed as a Render web service using the included `Dockerfile` and
`render.yaml`.

## 1. Deploy the API to Render

1. Open the Render dashboard and choose **New → Blueprint**.
2. Connect the `wuisabel-gif/code-explained` repository.
3. Select the repository's `render.yaml` file.
4. Enter the private `OPENAI_API_KEY` value when Render prompts for it.
5. Create the service.

The service URL will look like:

```text
https://code-explained-api.onrender.com
```

Check the API after deployment:

```bash
curl https://code-explained-api.onrender.com/api/health
```

## 2. Configure the frontend origin in Render

Set `FRONTEND_ORIGIN` to the GitHub Pages origin. Do not include the
repository path, because browsers omit paths from the `Origin` header:

```text
https://wuisabel-gif.github.io
```

Render automatically redeploys the service after the environment variable is
updated.

## 3. Configure GitHub Pages

In the GitHub repository:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Settings → Secrets and variables → Actions → Variables**.
4. Add this repository variable:

```text
Name:  VITE_API_URL
Value: https://code-explained-api.onrender.com
```

The `Deploy frontend to GitHub Pages` workflow builds the Vite app with the
repository base path and publishes it whenever `main` changes.

The resulting site URL is:

```text
https://wuisabel-gif.github.io/code-explained/
```

## Local development

Without `VITE_API_URL`, the frontend calls `/api` on the same origin, which is
the correct behavior for the local Vite server and the bundled Node server.
