# Markdown LaTeX Renderer

Markdown LaTeX Renderer is a library for parsing and rendering Markdown with LaTeX equations and syntax-highlighted code blocks.

- Markdown parsing: `marked`
- LaTeX rendering: `KaTeX`
- Code highlighting: `marked-highlight` + `highlight.js`

GitHub: [https://github.com/windsnow1025](https://github.com/windsnow1025)

NPM: [https://www.npmjs.com/package/markdown-latex-renderer](https://www.npmjs.com/package/markdown-latex-renderer)

## Installation

```bash
npm install markdown-latex-renderer
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
import '../src/global.css'
import {useEffect, useRef, useState} from 'react';
import {FormControlLabel, Switch} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import {parseMarkdownLaTeX, ThemeType, applyTheme} from "../node_modules/markdown-latex-renderer/dist";

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

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<ThemeType>(ThemeType.Light);

  const renderContent = () => {
    applyTheme(theme);
    const contentDiv = contentRef.current;
    if (!contentDiv) {
      return;
    }
    parseMarkdownLaTeX(contentDiv, markdownContent);
  };

  useEffect(() => {
    renderContent();
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(prevTheme => prevTheme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={theme === ThemeType.Dark}
            onChange={handleThemeChange}
            color="primary"
          />
        }
        label={theme === ThemeType.Dark ? <DarkModeIcon /> : <LightModeIcon />}
      />
      <div className="markdown-body p-4" ref={contentRef}></div>
    </>
  );
}

```

See example in `./usage/`.

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

6. `ThemeType`

    An enum that defines the available themes.

    - `ThemeType.Light`: Light theme
    - `ThemeType.Dark`: Dark theme

7. `applyTheme(theme: ThemeType)`

    Applies the specified theme to both Markdown content and code highlighting.

    - `theme`: The theme to apply (`ThemeType.Light` or `ThemeType.Dark`).
