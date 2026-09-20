import assert from "node:assert/strict";
import test from "node:test";
import {
  detectLanguage,
  languageFromFilename,
  sniffLanguage,
} from "../src/language.js";
import { groupMeaningfulLines } from "../server/groups.mjs";

test("filenames pick a language", () => {
  assert.equal(languageFromFilename("homework.py"), "python");
  assert.equal(languageFromFilename("app.js"), "javascript");
  assert.equal(languageFromFilename("main.cpp"), "cpp");
});

test("code sniffing picks python and javascript", () => {
  assert.equal(sniffLanguage("def add(a, b):\n    return a + b\n"), "python");
  assert.equal(
    sniffLanguage("function add(a, b) {\n  return a + b;\n}\n"),
    "javascript",
  );
  assert.equal(sniffLanguage("#include <iostream>\nint main() { return 0; }"), "cpp");
});

test("an explicit hint wins", () => {
  assert.equal(detectLanguage("print(1)", "note.txt", "python"), "python");
  assert.equal(detectLanguage("int x = 1;", "source.cpp", "javascript"), "javascript");
});

test("python hash comments stay in their own group", () => {
  const groups = groupMeaningfulLines(
    `# A note
total = 0
total += 2`,
    "python",
  );
  assert.deepEqual(
    groups.map((group) => group.lineNumbers),
    [[1], [2, 3]],
  );
});
