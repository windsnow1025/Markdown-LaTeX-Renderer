import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github.css';

// For dark theme
// import 'github-markdown-css/github-markdown-dark.css';
// import 'highlight.js/styles/github-dark.css';

import { useEffect, useRef } from 'react';
import { parseMarkdownLaTeX } from "../node_modules/markdown-latex-renderer/dist";
// import { parseMarkdownLaTeX } from "markdown-latex-renderer";

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentDiv = contentRef.current;
    const markdownContent = `
# Markdown LaTeX Renderer Demo

## Inline Mode LaTeX

Mass–energy equivalence: $E = mc^2$

## Display Mode LaTeX

Gaussian integral:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

## Code Example

Hello World

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## Table Example

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1,1 | Cell 1,2 | Cell 1,3 |
| Cell 2,1 | Cell 2,2 | Cell 2,3 |
| Cell 3,1 | Cell 3,2 | Cell 3,3 |

`;

    if (contentDiv) {
      parseMarkdownLaTeX(contentDiv, markdownContent);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="markdown-body w-full max-w-3xl" ref={contentRef}></div>
    </main>
  );
}
