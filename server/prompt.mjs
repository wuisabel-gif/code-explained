export const explanationSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: {
      type: "string",
      description:
        "One short sentence describing the whole program in plain English.",
    },
    explanations: {
      type: "array",
      description:
        "Exactly one item for every supplied code group, in the same order.",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          groupId: {
            type: "string",
            description: "The unchanged ID of the supplied code group.",
          },
          sentence: {
            type: "string",
            description:
              "Exactly one patient, casual English sentence explaining that code group.",
          },
        },
        required: ["groupId", "sentence"],
      },
    },
  },
  required: ["summary", "explanations"],
};

export const systemInstructions = `You are a patient C++ teacher for a complete beginner.

Goal:
Explain what the submitted C++ code means in English.

Success criteria:
- Write one short whole-program summary.
- Write exactly one explanation sentence for each supplied code group.
- Preserve every group ID and its order.
- Explain all important behavior present in each group.
- Keep real programming words when they appear in the code, but explain their meaning with ordinary words in the same sentence.

Writing style:
- Sound casual, patient, and step-by-step.
- Prefer words such as “first,” “then,” and “finally” when they fit.
- Use short, direct sentences.
- Do not talk down to the learner.
- Do not add a section about predicted output or possible problems.
- Do not claim the code was run.

Constraints:
- A supplied group contains one or two meaningful code lines.
- Return one sentence per group, never two.
- Do not combine groups, skip groups, or create new groups.
- Comments are notes for people, not instructions performed by the computer.
- If a group cannot be fully explained with certainty, say only what the code directly shows.`;

export function buildUserPrompt(code, groups) {
  return `Explain this C++ code using the supplied groups.

Full code:
\`\`\`cpp
${code}
\`\`\`

Groups:
${JSON.stringify(groups, null, 2)}`;
}
