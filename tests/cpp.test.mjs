import assert from "node:assert/strict";
import test from "node:test";
import { validateCppSyntax } from "../server/cpp.mjs";

test("valid C++ passes syntax validation", async () => {
  const result = await validateCppSyntax("int main() { return 0; }");
  assert.equal(result.valid, true);
});

test("missing semicolon gets a simple diagnostic", async () => {
  const result = await validateCppSyntax(`int main() {
  int answer = 42
  return answer;
}`);

  assert.equal(result.valid, false);
  assert.equal(result.diagnostics[0].line, 2);
  assert.match(result.diagnostics[0].simpleMessage, /semicolon/i);
});
