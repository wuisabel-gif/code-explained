const braceOnlyPattern = /^[{};]+$/;
const commentPattern = /^(\/\/|\/\*|\*|\*\/)/;
const preprocessorPattern = /^#/;

export function isMeaningfulLine(line) {
  const trimmed = line.trim();
  return Boolean(trimmed) && !braceOnlyPattern.test(trimmed);
}

function lineKind(text) {
  const trimmed = text.trim();
  if (commentPattern.test(trimmed)) return "comment";
  if (preprocessorPattern.test(trimmed)) return "preprocessor";
  if (/^(if|else|for|while|switch|case|catch)\b/.test(trimmed)) return "control";
  if (/\)\s*(const\s*)?\{?\s*$/.test(trimmed)) return "signature";
  return "statement";
}

function canPair(first, second) {
  const firstKind = lineKind(first.text);
  const secondKind = lineKind(second.text);

  if (firstKind === "comment" || secondKind === "comment") return false;
  if (firstKind === "preprocessor" || secondKind === "preprocessor") {
    return firstKind === secondKind;
  }

  if (firstKind === "signature") return false;
  if (firstKind === "control") return true;
  if (secondKind === "signature" || secondKind === "control") return false;
  return true;
}

export function collectMeaningfulLines(code) {
  return code
    .split(/\r?\n/)
    .map((text, index) => ({ line: index + 1, text }))
    .filter(({ text }) => isMeaningfulLine(text));
}

export function groupMeaningfulLines(code) {
  const meaningful = collectMeaningfulLines(code);
  const groups = [];

  for (let index = 0; index < meaningful.length; index += 1) {
    const current = meaningful[index];
    const next = meaningful[index + 1];
    const members = [current];

    if (next && canPair(current, next)) {
      members.push(next);
      index += 1;
    }

    groups.push({
      id: `group-${groups.length + 1}`,
      lineNumbers: members.map(({ line }) => line),
      code: members.map(({ line, text }) => `${line}: ${text}`).join("\n"),
    });
  }

  return groups;
}

function hasMoreThanOneSentence(text) {
  const withoutCommonAbbreviations = text
    .replace(/\b(?:e\.g|i\.e|Mr|Mrs|Dr|vs)\./gi, "")
    .trim();
  const endings = withoutCommonAbbreviations.match(/[.!?]+(?=\s|$)/g) || [];
  return endings.length > 1;
}

export function validateExplanation(result, groups) {
  if (!result || typeof result.summary !== "string" || !result.summary.trim()) {
    throw new Error("The explanation did not include a summary.");
  }
  if (hasMoreThanOneSentence(result.summary)) {
    throw new Error("The program summary must be exactly one sentence.");
  }
  if (!Array.isArray(result.explanations)) {
    throw new Error("The explanation did not include line explanations.");
  }

  const expectedIds = groups.map(({ id }) => id);
  const receivedIds = result.explanations.map(({ groupId }) => groupId);
  if (
    receivedIds.length !== expectedIds.length ||
    expectedIds.some((id, index) => receivedIds[index] !== id)
  ) {
    throw new Error("The explanation did not cover every code group in order.");
  }

  return {
    summary: result.summary.trim(),
    explanations: result.explanations.map((item, index) => {
      if (typeof item.sentence !== "string" || !item.sentence.trim()) {
        throw new Error(`The explanation for ${item.groupId} was empty.`);
      }
      if (hasMoreThanOneSentence(item.sentence)) {
        throw new Error(
          `The explanation for ${item.groupId} contained more than one sentence.`,
        );
      }

      return {
        groupId: item.groupId,
        lineNumbers: groups[index].lineNumbers,
        sentence: item.sentence.trim(),
      };
    }),
  };
}
