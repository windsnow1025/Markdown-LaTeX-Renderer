import {useEffect, useRef, useState} from "react";
// import {applyTheme, parseMarkdownLaTeX} from "markdown-latex-renderer";
import {applyTheme, desanitizeContent, parseMarkdownLaTeX, sanitizeContent} from "markdown-latex-renderer/src";
import {ContentEditable, RawEditableState} from "@/lib/EditableState";

function TextContent({
                       content,
                       setContent,
                       rawEditableState,
                       sanitizeLevel,
                       mode,
                     }) {
  const [contentEditable, setContentEditable] = useState(ContentEditable.PlainTextOnly);
  const contentRef = useRef(null);

  const parse = (content) => {
    contentRef.current.innerHTML = parseMarkdownLaTeX(content, sanitizeLevel);
  }
  const unparse = (content) => {
    contentRef.current.innerHTML = sanitizeContent(content);
  }

  const updateDisplay = async (content, editableState) => {
    applyTheme(mode);

    if (!contentRef.current) {
      return;
    }

    // Always False -> Parse and not allow edit
    if (editableState === RawEditableState.AlwaysFalse) {
      parse(content);
      setContentEditable(ContentEditable.False);
      return;
    }

    // Always True -> Unparse and allow edit
    if (editableState === RawEditableState.AlwaysTrue) {
      unparse(content);
      setContentEditable(ContentEditable.PlainTextOnly);
      return;
    }
  }

  useEffect(() => {
    updateDisplay(content, rawEditableState);
  }, [content, rawEditableState, mode, sanitizeLevel]);

  const handleBlur = () => {
    let html = contentRef.current.innerHTML;
    if (html === "<br>") {
      html = "";
    }
    const newContent = desanitizeContent(html);
    setContent(newContent);
  };

  return (
    <>
      <div
        className="markdown-body p-4 h-full rounded min-h-16"
        contentEditable={contentEditable}
        ref={contentRef}
        onBlur={handleBlur}
      />
    </>
  );
}

export default TextContent;