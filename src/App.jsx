import { useMemo, useRef, useState } from "react";
import { highlightLine } from "./codeHighlight.jsx";
import { examples } from "./sample.js";

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

function BrandMark() {
  return (
    <svg
      aria-hidden="true"
      className="brandmark"
      fill="none"
      viewBox="0 0 200 200"
    >
      <rect x="21" y="51" width="22" height="107" rx="11" fill="#2348a1" />
      <rect x="55" y="96" width="22" height="62" rx="11" fill="#2348a1" />
      <rect x="89" y="38" width="22" height="120" rx="11" fill="#2348a1" />
      <rect x="123" y="68" width="22" height="90" rx="11" fill="#db332c" />
      <rect x="157" y="108" width="22" height="50" rx="11" fill="#2348a1" />
    </svg>
  );
}

function CodeEditor({
  code,
  filename,
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
        <h2 id="code-label">The source</h2>
        <span className={count > 100 ? "line-count over-limit" : "line-count"}>
          {count} / 100 lines
        </span>
      </div>

      <div className="editor-frame">
        <div className="editor-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>{filename}</span>
        </div>
        <div className="editor-body">
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
            "Read this code"
          )}
        </button>
        <span className="privacy-note">
          Syntax-checked, never executed.
        </span>
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
        <h2 id="explanation-label">The story</h2>
        {result?.provider && result.provider !== "preview" ? (
          <span className="provider-name">{result.provider}</span>
        ) : null}
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="skeleton summary-skeleton" />
          <div className="skeleton row-skeleton" />
          <div className="skeleton row-skeleton short" />
          <p>Reading the next beat of the program…</p>
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
          <h3>The story starts here.</h3>
          <p>Paste C++ or pick a scene, then press “Read this code.”</p>
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [activeExample, setActiveExample] = useState(examples[0].id);
  const [code, setCode] = useState(examples[0].code);
  const [result, setResult] = useState(examples[0].explanation);
  const [selectedId, setSelectedId] = useState(examples[0].focusId);
  const [selectedLines, setSelectedLines] = useState(
    examples[0].explanation.explanations.find(
      (item) => item.groupId === examples[0].focusId,
    )?.lineNumbers ?? [],
  );
  const [errorLines, setErrorLines] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const count = useMemo(() => meaningfulLineCount(code), [code]);
  const activeScene = examples.find((item) => item.id === activeExample);
  const filename = activeScene?.filename ?? "source.cpp";

  function handleCodeChange(nextCode) {
    setActiveExample(null);
    setCode(nextCode);
    setResult(null);
    setSelectedId(null);
    setSelectedLines([]);
    setErrorLines([]);
    setError(null);
  }

  function loadExample(example) {
    const focus =
      example.explanation.explanations.find(
        (item) => item.groupId === example.focusId,
      ) ?? example.explanation.explanations[0];
    setActiveExample(example.id);
    setCode(example.code);
    setResult(example.explanation);
    setErrorLines([]);
    setError(null);
    if (focus) {
      setSelectedId(focus.groupId);
      setSelectedLines(focus.lineNumbers);
    }
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
        <a
          className="brand"
          href={import.meta.env.BASE_URL}
          aria-label="Code, Explained home"
        >
          <BrandMark />
          Code, Explained.
        </a>
        <span className="header-chip">C++</span>
        <a
          className="header-github"
          href="https://github.com/wuisabel-gif/code-explained"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </header>

      <main>
        <div className="intro">
          <p className="eyebrow">lab notes · first-year c++ · story mode</p>
          <h1>Read C++ like a novel.</h1>
          <p className="lede">
            Built for people who just started programming. Alice is the action.
            Bobo is memory. Each function is a scene, each loop a repeating
            beat, each return the last page.
          </p>
          <ul className="intro-points">
            <li>
              <b>Name the construct.</b> Loop, if, return, vector — then what
              it does in the story.
            </li>
            <li>
              <b>Follow the characters.</b> Click a sentence and the matching
              lines light up.
            </li>
            <li>
              <b>Lab-safe.</b> Clang checks syntax. The machine never runs the
              plot.
            </li>
          </ul>
        </div>

        <div className="example-row" aria-label="Example scenes">
          <span className="example-label">Scenes</span>
          {examples.map((example) => (
            <button
              className={
                activeExample === example.id
                  ? "example-chip selected"
                  : "example-chip"
              }
              key={example.id}
              onClick={() => loadExample(example)}
              type="button"
            >
              {example.title}
            </button>
          ))}
        </div>

        <div className="readout">
          <div className="readout-head">
            <span className="file">{filename}</span>
            <span className={count > 100 ? "count-chip over-limit" : "count-chip"}>
              {count} / 100 lines
            </span>
            <span className="state">
              <span
                className={
                  result?.provider && result.provider !== "preview"
                    ? "tdot live"
                    : "tdot preview"
                }
              />
              {result?.provider === "preview" || !result
                ? "preview"
                : result?.provider || "ready"}
            </span>
          </div>
          <div className="workspace">
            <CodeEditor
              code={code}
              error={error}
              errorLines={errorLines}
              filename={filename}
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
        </div>
      </main>

      <footer className="site-footer">
        <a
          href="https://github.com/wuisabel-gif/code-explained"
          rel="noopener noreferrer"
          target="_blank"
        >
          Source on GitHub
        </a>
        <span className="footer-sep" aria-hidden="true">
          ·
        </span>
        <span>
          © 2026{" "}
          <a
            href="https://github.com/wuisabel-gif"
            rel="noopener noreferrer"
            target="_blank"
          >
            Isabel Wu
          </a>
        </span>
        <span className="footer-sep" aria-hidden="true">
          ·
        </span>
        <a
          href="https://github.com/wuisabel-gif/code-explained/blob/main/LICENSE"
          rel="noopener noreferrer"
          target="_blank"
        >
          MIT License
        </a>
      </footer>
    </div>
  );
}
