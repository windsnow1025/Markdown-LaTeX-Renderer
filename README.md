# Markdown LaTeX Renderer

Markdown LaTeX Renderer is a library that allows you to parse and render Markdown content with LaTeX equations. It uses `marked` for Markdown parsing and `KaTeX` for rendering LaTeX equations.

GitHub: [https://github.com/windsnow1025](https://github.com/windsnow1025)

NPM: [https://www.npmjs.com/package/markdown-latex-renderer](https://www.npmjs.com/package/markdown-latex-renderer)

## Features

- Parse Markdown content
- Render LaTeX equations within Markdown
- Syntax highlighting for code blocks

## Installation

To install the library, use npm or yarn:

```bash
npm install markdown-latex-renderer
```

or

```bash
yarn add markdown-latex-renderer
```

## Usage

### Basic Usage

Here's a basic example of how to use the library:

```typescript
import { parseMarkdownLaTeX } from 'markdown-latex-renderer';

const contentDiv = document.getElementById('content');
const markdownContent = `
# Example Markdown

This is a paragraph with an inline equation $E = mc^2$.

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
`;

parseMarkdownLaTeX(contentDiv, markdownContent);
```

### Integration with Next.js

To use in a Next.js project, update your `next.config.mjs` to include the following configuration:

```mjs
const nextConfig = {
  transpilePackages: ['markdown-latex-renderer'],
};

export default nextConfig;
```

3. Use the library in your Next.js components:

```tsx
// pages/index.tsx
import { useEffect, useRef } from 'react';
import { parseMarkdownLaTeX } from 'markdown-latex-renderer';

const Home = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentDiv = contentRef.current;
    const markdownContent = `
# Example Markdown

This is a paragraph with an inline equation $E = mc^2$.

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
`;

    if (contentDiv) {
      parseMarkdownLaTeX(contentDiv, markdownContent);
    }
  }, []);

  return <div ref={contentRef}></div>;
};

export default Home;
```

## API

1. `parseMarkdownLaTeX(content_div: HTMLElement, content: string, sanitize = true)`

    Parses the given Markdown content and renders LaTeX equations within the specified HTML element.

    - `content_div`: The HTML element where the parsed content will be rendered.
    - `content`: The Markdown content to be parsed.
    - `sanitize`: A boolean indicating whether to sanitize the content. Default is `true`.

2. `parseMarkdown(content: string, sanitize = true): Promise<string>`

    Parses the given Markdown content and returns the parsed HTML as a string.
    
    - `content`: The Markdown content to be parsed.
    - `sanitize`: A boolean indicating whether to sanitize the content. Default is `true`.
    - **Returns**: A `Promise<string>` containing the parsed HTML.

3. `renderLaTeX(content_div: HTMLElement)`

    Renders LaTeX equations inside the given HTML element using KaTeX.
    
    - `content_div`: The HTML element containing the LaTeX equations.

4. `sanitize(content: string): string`

    Sanitizes the given content by escaping special HTML characters.
    
    - `content`: The string to be sanitized.
    - **Returns**: A sanitized string.

5. `desanitize(content: string): string`

    Reverses the sanitization process, converting escaped HTML characters back to their original form.
    
    - `content`: The string to be desanitized.
    - **Returns**: A desanitized string.
