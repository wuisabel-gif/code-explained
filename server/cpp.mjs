import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

function simplifyDiagnostic(message) {
  const clean = message.replace(/\s*\[-W[^\]]+\]$/, "").trim();
  if (/expected ';'/.test(clean)) {
    return "The computer expected a semicolon at the end of this line.";
  }
  if (/expected '}'/.test(clean)) {
    return "The computer expected a closing curly bracket near this line.";
  }
  if (/use of undeclared identifier/.test(clean)) {
    const name = clean.match(/'([^']+)'/)?.[1];
    return name
      ? `The name “${name}” is used here, but it has not been created yet.`
      : "A name is used here before it has been created.";
  }
  if (/no matching function/.test(clean)) {
    return "This function call does not match the inputs that the function expects.";
  }
  return `The computer found a problem here: ${clean}`;
}

function parseDiagnostics(stderr, filename) {
  const escaped = filename.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `${escaped}:(\\d+):(\\d+):\\s+(fatal error|error):\\s+(.+)`,
    "g",
  );
  const diagnostics = [];

  for (const match of stderr.matchAll(pattern)) {
    diagnostics.push({
      line: Number(match[1]),
      column: Number(match[2]),
      message: match[4].trim(),
      simpleMessage: simplifyDiagnostic(match[4]),
    });
  }

  return diagnostics;
}

function runClang(filename, language) {
  const isC = language === "c";
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.env.CLANG_PATH || (isC ? "clang" : "clang++"),
      isC
        ? ["-std=c17", "-fsyntax-only", "-x", "c", filename]
        : ["-std=c++20", "-fsyntax-only", "-x", "c++", filename],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      if (!settled) {
        settled = true;
        reject(new Error("Syntax checking took too long."));
      }
    }, 8_000);

    child.stderr.setEncoding("utf8");
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      if (stderr.length > 100_000) child.kill("SIGKILL");
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      if (!settled) {
        settled = true;
        reject(error);
      }
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (!settled) {
        settled = true;
        resolve({ code, stderr });
      }
    });
  });
}

export async function validateClangSyntax(code, language = "cpp") {
  const directory = await mkdtemp(path.join(tmpdir(), "code-explained-"));
  const filename = path.join(
    directory,
    language === "c" ? "input.c" : "input.cpp",
  );

  try {
    await writeFile(filename, code, "utf8");
    const result = await runClang(filename, language);
    return {
      valid: result.code === 0,
      diagnostics: parseDiagnostics(result.stderr, filename),
      raw: result.stderr,
    };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

export async function validateCppSyntax(code) {
  return validateClangSyntax(code, "cpp");
}
