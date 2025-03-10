import {useEffect, useRef, useState} from 'react';
import {parseMarkdownLaTeX} from "../node_modules/markdown-latex-renderer/dist";
import {ThemeType, applyTheme} from "@/app/Theme";
import {FormControlLabel, Switch} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  // Apply theme when darkMode changes
  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(darkMode ? ThemeType.Dark : ThemeType.Light, prefersDarkMode);

    // Re-render content with new theme
    renderContent();
  }, [darkMode]);

  const renderContent = () => {
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
  };

  useEffect(() => {
    renderContent();
  }, []);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={handleThemeChange}
            color="primary"
          />
        }
        label={darkMode ? <DarkModeIcon/> : <LightModeIcon/>}
      />
      <div className="markdown-body" ref={contentRef}></div>
    </>
  );
}