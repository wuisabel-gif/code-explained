import { useMemo, useRef, useState } from "react";
import { highlightLine } from "./codeHighlight.jsx";
import { sampleCode, sampleExplanation } from "./sample.js";

const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function lineLabel(lineNumbers) {
  if (lineNumbers.length === 1) return `Line ${lineNumbers[0]}`;
  return `Lines ${lineNumbers[0]}–${lineNumbers.at(-1)}`;
}

function meaningfulLineCount(code) {
  return code.split("\n").filter((line) => {
    const trimmed = line.trim();
    return trimmed && !/^[{};]+$/.test(trimmed);
  }).length;
}

function CodeEditor({
  code,
  onChange,
  selectedLines,
  errorLines,
  onExplain,
  isLoading,
  error,
}) {
  const textareaRef = useRef(null);
  const backdropRef = useRef(null);
  const gutterRef = useRef(null);
  const lines = code.split("\n");
  const count = meaningfulLineCount(code);

  function syncScroll(event) {
    const { scrollTop, scrollLeft } = event.currentTarget;
    backdropRef.current.style.transform = `translate(${-scrollLeft}px, ${-scrollTop}px)`;
    gutterRef.current.style.transform = `translateY(${-scrollTop}px)`;
  }

  return (
    <section className="workspace-column editor-column" aria-labelledby="code-label">
      <div className="section-heading-row">
        <h2 id="code-label">Your C++ code</h2>
        <span className={count > 100 ? "line-count over-limit" : "line-count"}>
          {count} / 100 lines
        </span>
      </div>

      <div className="editor-frame">
        <div className="gutter-window" aria-hidden="true">
          <div className="gutter-lines" ref={gutterRef}>
            {lines.map((_, index) => (
              <div className="gutter-line" key={index}>
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="code-window">
          <pre className="code-backdrop" ref={backdropRef} aria-hidden="true">
            {lines.map((line, index) => {
              const number = index + 1;
              const isSelected = selectedLines.includes(number);
              const hasError = errorLines.includes(number);
              return (
                <div
                  className={[
                    "code-line",
                    isSelected ? "selected" : "",
                    hasError ? "has-error" : "",
                  ].join(" ")}
                  key={index}
                >
                  {highlightLine(line)}
                </div>
              );
            })}
          </pre>
          <textarea
            aria-label="C++ code"
            autoCapitalize="off"
            autoCorrect="off"
            onChange={(event) => onChange(event.target.value)}
            onScroll={syncScroll}
            ref={textareaRef}
            spellCheck="false"
            value={code}
          />
        </div>
      </div>

      <div className="editor-actions">
        <button
          className="primary-button"
          disabled={isLoading || !code.trim() || count > 100}
          onClick={onExplain}
          type="button"
        >
          {isLoading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Explaining…
            </>
          ) : (
            "Explain my code"
          )}
        </button>
        <span className="privacy-note">Your code is explained, not run.</span>
      </div>

      {error ? (
        <div className="inline-error" role="alert">
          <strong>{error.title}</strong>
          <span>{error.message}</span>
        </div>
      ) : null}
    </section>
  );
}

function ExplanationRail({ result, selectedId, onSelect, isLoading }) {
  return (
    <section
      className="workspace-column explanation-column"
      aria-labelledby="explanation-label"
      aria-live="polite"
    >
      <div className="section-heading-row">
        <h2 id="explanation-label">The simple version</h2>
        {result?.provider && result.provider !== "preview" ? (
          <span className="provider-name">{result.provider}</span>
        ) : null}
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="skeleton summary-skeleton" />
          <div className="skeleton row-skeleton" />
          <div className="skeleton row-skeleton short" />
          <p>Reading the code one small piece at a time…</p>
        </div>
      ) : result ? (
        <>
          <p className="program-summary">{result.summary}</p>
          <div className="lesson-rail">
            {result.explanations.map((explanation) => (
              <button
                aria-pressed={selectedId === explanation.groupId}
                className={
                  selectedId === explanation.groupId
                    ? "explanation-row selected"
                    : "explanation-row"
                }
                key={explanation.groupId}
                onClick={() => onSelect(explanation)}
                onMouseEnter={() => onSelect(explanation)}
                type="button"
              >
                <span className="rail-dot" aria-hidden="true" />
                <span className="line-label">
                  {lineLabel(explanation.lineNumbers)}
                </span>
                <span className="explanation-sentence">
                  {explanation.sentence}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state">
          <span className="empty-cursor" aria-hidden="true" />
          <h3>Your explanation will appear here.</h3>
          <p>Paste your C++ code, then press “Explain my code.”</p>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [code, setCode] = useState(sampleCode);
  const [result, setResult] = useState(sampleExplanation);
  const [selectedId, setSelectedId] = useState("group-4");
  const [selectedLines, setSelectedLines] = useState([7, 8]);
  const [errorLines, setErrorLines] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const count = useMemo(() => meaningfulLineCount(code), [code]);

  function handleCodeChange(nextCode) {
    setCode(nextCode);
    setResult(null);
    setSelectedId(null);
    setSelectedLines([]);
    setErrorLines([]);
    setError(null);
  }

  function selectExplanation(explanation) {
    setSelectedId(explanation.groupId);
    setSelectedLines(explanation.lineNumbers);
  }

  async function explainCode() {
    if (!code.trim() || count > 100) return;

    setIsLoading(true);
    setError(null);
    setErrorLines([]);
    setSelectedLines([]);

    try {
      const response = await fetch(`${apiBaseUrl}/api/explain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: "cpp" }),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.kind === "syntax_error") {
          setErrorLines(data.diagnostics.map((item) => item.line));
          setError({
            title: "The code needs one small fix.",
            message: data.diagnostics[0]?.simpleMessage ?? data.message,
          });
        } else {
          setError({
            title: "We could not explain this code yet.",
            message: data.message ?? "Please try again in a moment.",
          });
        }
        return;
      }

      setResult(data);
      const first = data.explanations[0];
      if (first) selectExplanation(first);
    } catch {
      setError({
        title: "The website could not reach the explanation service.",
        message: "Please check the server and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="Code, Explained home">
          Code, Explained.
        </a>
      </header>

      <main>
        <div className="intro">
          <h1>Paste C++. Get the story.</h1>
          <p>Every one or two lines, explained in one clear sentence.</p>
        </div>

        <div className="workspace">
          <CodeEditor
            code={code}
            error={error}
            errorLines={errorLines}
            isLoading={isLoading}
            onChange={handleCodeChange}
            onExplain={explainCode}
            selectedLines={selectedLines}
          />
          <ExplanationRail
            isLoading={isLoading}
            onSelect={selectExplanation}
            result={result}
            selectedId={selectedId}
          />
        </div>
      </main>
    </div>
  );
}
