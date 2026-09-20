import { fenceTag, languageLabel } from "../src/language.js";

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

export function systemInstructions(language = "code") {
  const label = language === "code" ? "programming" : languageLabel(language);
  return `You are a ${label} teacher explaining code to a young child who is just learning.

Goal:
Explain the submitted ${label} code as a tiny story a five-year-old could follow.

Success criteria:
- Write one short whole-program summary that names what happens.
- Write exactly one explanation sentence for each supplied code group.
- Preserve every group ID and its order.
- Keep the real programming word (for, if, return, def, function) and then say what it does in the same sentence, in small words.
- When it helps, cast Alice as the action and Bobo as memory, data, or the other value.

Writing style:
- Short words. Concrete pictures. A box, a sticky note, a cup, a wave.
- Prefer “for means Alice looks at every number” over “this line starts a set of instructions.”
- Use first, then, and finally when they fit.
- Keep exactly one sentence per group.
- Do not use grown-up jargon like chapter, fork, construct, or variable unless you also say what it is.
- Do not add a section about predicted output or possible problems.
- Do not claim the code was run.

Constraints:
- A supplied group contains one or two meaningful code lines.
- Return one sentence per group, never two.
- Do not combine groups, skip groups, or create new groups.
- Comments are notes for people, not instructions performed by the computer.
- If a group cannot be fully explained with certainty, say only what the code directly shows.`;
}

export function buildUserPrompt(code, groups, language = "code") {
  const label = language === "code" ? "code" : languageLabel(language);
  const fence = fenceTag(language);
  return `Explain this ${label} using the supplied groups.

Full code:
\`\`\`${fence}
${code}
\`\`\`

Groups:
${JSON.stringify(groups, null, 2)}`;
}
