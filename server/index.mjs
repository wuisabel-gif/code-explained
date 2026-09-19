import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleApiRequest } from "./api.mjs";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const distDirectory = path.resolve(currentDirectory, "../dist");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "0.0.0.0";

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function serveFile(response, filename) {
  const extension = path.extname(filename);
  response.statusCode = 200;
  response.setHeader(
    "Content-Type",
    mimeTypes[extension] || "application/octet-stream",
  );
  createReadStream(filename).pipe(response);
}

const server = createServer(async (request, response) => {
  if ((request.url || "").startsWith("/api/")) {
    await handleApiRequest(request, response, "/api");
    return;
  }

  if (!existsSync(distDirectory)) {
    response.statusCode = 503;
    response.end("Run `npm run build` before starting the production server.");
    return;
  }

  const requestPath = decodeURIComponent(
    new URL(request.url || "/", "http://localhost").pathname,
  );
  const candidate = path.resolve(
    distDirectory,
    requestPath === "/" ? "index.html" : `.${requestPath}`,
  );

  if (!candidate.startsWith(distDirectory)) {
    response.statusCode = 403;
    response.end("Forbidden");
    return;
  }

  try {
    const fileStat = await stat(candidate);
    if (fileStat.isFile()) {
      serveFile(response, candidate);
      return;
    }
  } catch {
    // Client-side routes fall through to index.html.
  }

  serveFile(response, path.join(distDirectory, "index.html"));
});

server.listen(port, host, () => {
  console.log(`Code, Explained. is running at http://${host}:${port}`);
});
