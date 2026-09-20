const extensionLanguage = {
  c: "c",
  h: "c",
  cpp: "cpp",
  cc: "cpp",
  cxx: "cpp",
  hpp: "cpp",
  hh: "cpp",
  py: "python",
  js: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  jsx: "javascript",
  ts: "typescript",
  tsx: "typescript",
  java: "java",
  go: "go",
  rs: "rust",
  rb: "ruby",
  cs: "csharp",
  php: "php",
  swift: "swift",
  kt: "kotlin",
  kts: "kotlin",
  m: "objective-c",
  mm: "cpp",
  r: "r",
  lua: "lua",
  sh: "shell",
  bash: "shell",
  zsh: "shell",
  sql: "sql",
  html: "html",
  css: "css",
  json: "json",
  md: "markdown",
  txt: "text",
};

const languageLabels = {
  c: "C",
  cpp: "C++",
  python: "Python",
  javascript: "JavaScript",
  typescript: "TypeScript",
  java: "Java",
  go: "Go",
  rust: "Rust",
  ruby: "Ruby",
  csharp: "C#",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  "objective-c": "Objective-C",
  r: "R",
  lua: "Lua",
  shell: "Shell",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  markdown: "Markdown",
  text: "Text",
  code: "code",
};

const aliases = {
  "c++": "cpp",
  cxx: "cpp",
  py: "python",
  python3: "python",
  js: "javascript",
  node: "javascript",
  ts: "typescript",
  cs: "csharp",
  "c#": "csharp",
  golang: "go",
  rs: "rust",
  rb: "ruby",
  sh: "shell",
  bash: "shell",
  any: "code",
  auto: "",
};

export const hashCommentLanguages = new Set([
  "python",
  "ruby",
  "shell",
  "r",
  "yaml",
  "toml",
  "elixir",
  "perl",
]);

export const clangLanguages = new Set(["c", "cpp"]);

export const uploadAccept = [
  ...new Set(Object.keys(extensionLanguage).map((ext) => `.${ext}`)),
].join(",");

export function normalizeLanguage(value) {
  if (!value || typeof value !== "string") return "";
  const key = value.trim().toLowerCase();
  if (!key || key === "auto") return "";
  if (aliases[key] === "") return "";
  if (aliases[key]) return aliases[key];
  if (languageLabels[key]) return key;
  return "code";
}

export function languageFromFilename(name) {
  if (!name || typeof name !== "string") return "";
  const ext = name.split(".").pop()?.toLowerCase();
  if (!ext || ext === name.toLowerCase()) return "";
  return extensionLanguage[ext] || "";
}

export function sniffLanguage(code) {
  const text = String(code || "");
  if (/^\s*#include\b/m.test(text) || /\bstd::/.test(text)) return "cpp";
  if (/\bint\s+main\s*\(/.test(text) && /;\s*$/m.test(text)) return "cpp";
  if (/^\s*(from\s+\w+\s+import|import\s+\w+)/m.test(text) || /^\s*def\s+\w+\s*\(/m.test(text)) {
    return "python";
  }
  if (/^\s*print\s*\(/m.test(text) && !/;\s*$/m.test(text)) return "python";
  if (
    /^\s*(export\s+)?(async\s+)?function\b/m.test(text) ||
    /^\s*(const|let|var)\s+\w+\s*=/.test(text) ||
    /\bconsole\.log\b/.test(text)
  ) {
    return "javascript";
  }
  if (/^\s*package\s+\w+/m.test(text) && /\bfunc\s+/.test(text)) return "go";
  if (/\bfn\s+\w+/m.test(text) && /\blet\s+mut\b/.test(text)) return "rust";
  if (/^\s*public\s+(class|static|void)\b/m.test(text)) return "java";
  if (/^\s*#include\s+<stdio\.h>/m.test(text)) return "c";
  return "code";
}

export function detectLanguage(code, filename, hint) {
  const fromHint = normalizeLanguage(hint);
  if (fromHint && fromHint !== "code") return fromHint;
  const fromName = languageFromFilename(filename);
  if (fromName && fromName !== "text") return fromName;
  if (fromHint) return fromHint;
  return sniffLanguage(code) || "code";
}

export function languageLabel(language) {
  return languageLabels[language] || "code";
}

export function fenceTag(language) {
  if (language === "code" || language === "text") return "text";
  return language || "text";
}

export function defaultFilename(language) {
  const map = {
    c: "source.c",
    cpp: "source.cpp",
    python: "source.py",
    javascript: "source.js",
    typescript: "source.ts",
    java: "source.java",
    go: "source.go",
    rust: "source.rs",
    ruby: "source.rb",
    csharp: "source.cs",
    php: "source.php",
    swift: "source.swift",
    kotlin: "source.kt",
    shell: "source.sh",
  };
  return map[language] || "source.txt";
}
