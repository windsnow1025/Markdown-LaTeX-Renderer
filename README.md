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

## Styling

The library doesn't include any default styles. You need to add CSS for both Markdown content and code highlighting.

### Adding Styles

1. For Markdown content, you can use [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)
2. For code highlighting, you can use [highlight.js styles](https://highlightjs.org/static/demo/)
3. KaTeX styles are automatically included with the library

Example of adding styles:

```html
<!-- Markdown styling -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.8.1/github-markdown.min.css">

<!-- Code highlighting -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js@11.11.1/styles/github.min.css">
```

### Theme Switching

To implement theme switching (light/dark mode), you can dynamically change the CSS files. Here's an example implementation:

1. Download the Theme files:
   
   ```bash
   # For highlight.js themes
   npm install highlight.js
   cp node_modules/highlight.js/styles/github.css public/css/highlight/
   cp node_modules/highlight.js/styles/github-dark.css public/css/highlight/
   
   # For GitHub Markdown CSS
   npm install github-markdown-css
   cp node_modules/github-markdown-css/github-markdown-light.css public/css/markdown/
   cp node_modules/github-markdown-css/github-markdown-dark.css public/css/markdown/
   ```

2. Theme.ts:

   ```typescript
   export enum ThemeType {
     System = "system",
     Light = "light",
     Dark = "dark",
   }
   
   function convertTheme(
     systemTheme: ThemeType, prefersDarkMode: boolean
   ): ThemeType.Light | ThemeType.Dark {
     if (systemTheme === ThemeType.Light || systemTheme === ThemeType.Dark) {
       return systemTheme;
     } else {
       return prefersDarkMode ? ThemeType.Dark : ThemeType.Light;
     }
   }
   
   export function applyTheme(systemTheme: ThemeType, prefersDarkMode: boolean) {
     const theme = convertTheme(systemTheme, prefersDarkMode);
     applyMarkdownTheme(theme);
     applyHighlightTheme(theme);
   }
   
   function applyMarkdownTheme(theme: ThemeType.Light | ThemeType.Dark) {
     // Get all link elements
     const links = document.getElementsByTagName('link');
   
     // Loop through all link elements
     for (let i = 0; i < links.length; i++) {
       const link = links[i];
       const href = link.getAttribute('href');
   
       // If link is for github-markdown-css, remove it
       if (href && href.includes('/markdown/')) {
         link.parentNode?.removeChild(link);
       }
     }
   
     // Add new link element
     if (theme === 'dark') {
       const darkCss = document.createElement('link');
       darkCss.setAttribute('rel', 'stylesheet');
       darkCss.setAttribute('href', '/css/markdown/github-markdown-dark.css');
       document.head.appendChild(darkCss);
     } else if (theme === 'light') {
       const lightCss = document.createElement('link');
       lightCss.setAttribute('rel', 'stylesheet');
       lightCss.setAttribute('href', '/css/markdown/github-markdown-light.css');
       document.head.appendChild(lightCss);
     }
   }
   
   function applyHighlightTheme(theme: string) {
     // Get all link elements
     const links = document.getElementsByTagName('link');
   
     // Loop through all link elements
     for (let i = 0; i < links.length; i++) {
       const link = links[i];
       const href = link.getAttribute('href');
   
       // If link is for highlight.js, remove it
       if (href && href.includes('highlight')) {
         link.parentNode?.removeChild(link);
       }
     }
   
     // Add new link element
     if (theme === 'dark') {
       const darkCss = document.createElement('link');
       darkCss.setAttribute('rel', 'stylesheet');
       darkCss.setAttribute('href', '/css/highlight/github-dark.css');
       document.head.appendChild(darkCss);
     } else if (theme === 'light') {
       const lightCss = document.createElement('link');
       lightCss.setAttribute('rel', 'stylesheet');
       lightCss.setAttribute('href', '/css/highlight/github.css');
       document.head.appendChild(lightCss);
     }
   }
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
