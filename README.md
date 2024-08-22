# Markdown LaTeX Renderer

Markdown LaTeX Renderer is a library that allows you to parse and render Markdown content with LaTeX equations. It uses `marked` for Markdown parsing and `KaTeX` for rendering LaTeX equations.

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

### Usage with Next.js

To use `markdown-latex-renderer` in a Next.js project, follow these steps:

1. Install the library

2. Update your `next.config.mjs` to include the following configuration:

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

### `parseMarkdownLaTeX(content_div: HTMLElement, content: string, sanitize = true)`

Parses the given Markdown content and renders LaTeX equations within the specified HTML element.

- `content_div`: The HTML element where the parsed content will be rendered.
- `content`: The Markdown content to be parsed.
- `sanitize`: A boolean indicating whether to sanitize the content. Default is `true`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## Bugs and Issues

If you encounter any bugs or issues, please report them on the [GitHub Issues](https://github.com/windsnow1025/Markdown-LaTeX-Renderer/issues) page.

## Author

Created by [windsnow1025](https://github.com/windsnow1025).
