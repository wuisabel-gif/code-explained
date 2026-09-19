import assert from "node:assert/strict";
import test from "node:test";
import {
  collectMeaningfulLines,
  groupMeaningfulLines,
  isMeaningfulLine,
  validateExplanation,
} from "../server/groups.mjs";

test("blank and brace-only lines are not meaningful", () => {
  assert.equal(isMeaningfulLine(""), false);
  assert.equal(isMeaningfulLine("   "), false);
  assert.equal(isMeaningfulLine("}"), false);
  assert.equal(isMeaningfulLine("};"), false);
  assert.equal(isMeaningfulLine("return 0;"), true);
  assert.equal(isMeaningfulLine("// a note"), true);
});

test("comments receive their own groups", () => {
  const groups = groupMeaningfulLines(`// A note
int total = 0;
total += 2;`);

  assert.deepEqual(groups.map((group) => group.lineNumbers), [[1], [2, 3]]);
});

test("groups contain no more than two meaningful lines", () => {
  const code = `#include <iostream>
#include <vector>

int main() {
  int total = 0;
  for (int i = 0; i < 3; ++i) {
    total += i;
  }
  return total;
}`;
  const meaningful = collectMeaningfulLines(code);
  const groups = groupMeaningfulLines(code);
  const groupedLines = groups.flatMap((group) => group.lineNumbers);

  assert.ok(groups.every((group) => group.lineNumbers.length <= 2));
  assert.deepEqual(
    groupedLines,
    meaningful.map(({ line }) => line),
  );
});

test("validated output receives server-owned line mappings", () => {
  const groups = [
    { id: "group-1", lineNumbers: [1, 2], code: "1: a\n2: b" },
    { id: "group-2", lineNumbers: [4], code: "4: c" },
  ];
  const result = validateExplanation(
    {
      summary: " This program does something. ",
      explanations: [
        { groupId: "group-1", sentence: " First sentence. " },
        { groupId: "group-2", sentence: "Second sentence." },
      ],
    },
    groups,
  );

  assert.deepEqual(result.explanations[0].lineNumbers, [1, 2]);
  assert.equal(result.summary, "This program does something.");
});

test("validation rejects missing or reordered groups", () => {
  const groups = [
    { id: "group-1", lineNumbers: [1], code: "1: a" },
    { id: "group-2", lineNumbers: [2], code: "2: b" },
  ];

  assert.throws(() =>
    validateExplanation(
      {
        summary: "Summary.",
        explanations: [
          { groupId: "group-2", sentence: "Second." },
          { groupId: "group-1", sentence: "First." },
        ],
      },
      groups,
    ),
  );
});

test("validation rejects more than one explanation sentence", () => {
  const groups = [{ id: "group-1", lineNumbers: [1], code: "1: a" }];

  assert.throws(
    () =>
      validateExplanation(
        {
          summary: "One summary.",
          explanations: [
            {
              groupId: "group-1",
              sentence: "This is the first sentence. This is another one.",
            },
          ],
        },
        groups,
      ),
    /more than one sentence/,
  );
});
