const keywordPattern =
  /\b(async|await|auto|bool|break|case|catch|char|class|const|continue|def|default|delete|do|double|elif|else|enum|except|export|false|finally|float|fn|for|from|func|function|if|import|in|int|lambda|let|long|namespace|new|None|null|nullptr|pass|print|private|protected|public|range|return|short|signed|sizeof|static|std|string|struct|switch|template|this|throw|true|try|typeof|undefined|unsigned|using|var|vector|void|while|with|yield)\b/g;

const tokenPattern =
  /(#include\b[^\n]*|\/\/[^\n]*|#[^\n]*|`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b\d+(?:\.\d+)?\b)/gm;

export function highlightLine(line) {
  const parts = [];
  let lastIndex = 0;

  for (const match of line.matchAll(tokenPattern)) {
    if (match.index > lastIndex) {
      parts.push(highlightKeywords(line.slice(lastIndex, match.index)));
    }

    const value = match[0];
    let className = "token-number";
    if (value.startsWith("//") || (value.startsWith("#") && !value.startsWith("#include"))) {
      className = "token-comment";
    } else if (value.startsWith("#include")) className = "token-preprocessor";
    else if (
      value.startsWith('"') ||
      value.startsWith("'") ||
      value.startsWith("`")
    ) {
      className = "token-string";
    }

    parts.push(
      <span className={className} key={`${match.index}-${value}`}>
        {value}
      </span>,
    );
    lastIndex = match.index + value.length;
  }

  if (lastIndex < line.length) {
    parts.push(highlightKeywords(line.slice(lastIndex)));
  }

  return parts.length ? parts : "\u00a0";
}

function highlightKeywords(text) {
  const pieces = text.split(keywordPattern);
  return pieces.map((piece, index) =>
    index % 2 === 1 ? (
      <span className="token-keyword" key={`${piece}-${index}`}>
        {piece}
      </span>
    ) : (
      piece
    ),
  );
}
