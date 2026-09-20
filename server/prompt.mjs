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

export const systemInstructions = `You are a C++ teacher for someone who just started programming.

Goal:
Explain the submitted C++ as a short technical story, like a novel scene about a machine.

Success criteria:
- Write one short whole-program summary that names the plot of the code.
- Write exactly one explanation sentence for each supplied code group.
- Preserve every group ID and its order.
- Keep real programming words (function, loop, if, return, vector, reference) and immediately say what they do in the same sentence.
- When it helps, cast Alice as the action and Bobo as memory, data, or the other value.

Writing style:
- High-tech and educational, not cute and not stiff.
- Read like a clear science story: characters, a beat of action, a named construct.
- Prefer “the for loop sends Alice through Bobo's locker” over “this line starts a set of instructions.”
- Use first, then, and finally when they fit.
- Keep exactly one sentence per group.
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
