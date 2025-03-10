# Markdown LaTeX Renderer

Markdown LaTeX Renderer is a library that allows you to parse and render Markdown content with LaTeX equations as well as creating highlights for code blocks.

- Markdown parsing: `marked`
- LaTeX rendering: `KaTeX`
- Code highlighting: `marked-highlight` + `highlight.js`

GitHub: [https://github.com/windsnow1025](https://github.com/windsnow1025)

NPM: [https://www.npmjs.com/package/markdown-latex-renderer](https://www.npmjs.com/package/markdown-latex-renderer)

## Installation

```bash
npm install markdown-latex-renderer github-markdown-css highlight.js
```

## Usage

To use in a Next.js project, update your `next.config.mjs` to include the following configuration:

```js
const nextConfig = {
  transpilePackages: ['markdown-latex-renderer'],
};

export default nextConfig;
```

In component:

```tsx
import 'github-markdown-css/github-markdown-light.css';
import 'highlight.js/styles/github.css';

// For dark theme
// import 'github-markdown-css/github-markdown-dark.css';
// import 'highlight.js/styles/github-dark.css';

import { useEffect, useRef } from 'react';
import { parseMarkdownLaTeX } from "markdown-latex-renderer";

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
    <div className="markdown-body" ref={contentRef}></div>
  );
}
```

See example in `./usage/`.

### Theme Switching

To implement theme switching (light/dark mode), you can dynamically change the CSS files. Here's an example implementation:

1. Move the Theme files to public directory:
   
   ```bash
   cp node_modules/highlight.js/styles/github.css public/css/highlight/
   cp node_modules/highlight.js/styles/github-dark.css public/css/highlight/
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
