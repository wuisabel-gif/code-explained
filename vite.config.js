import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { handleApiRequest } from "./server/api.mjs";

function apiPlugin() {
  return {
    name: "code-explained-api",
    configureServer(server) {
      server.middlewares.use("/api", (request, response, next) => {
        handleApiRequest(request, response, "/api").catch(next);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
});
