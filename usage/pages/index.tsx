import '../src/global.css'
import {useEffect, useRef, useState} from 'react';
import {parseMarkdownLaTeX} from "../node_modules/markdown-latex-renderer/dist";
import {FormControlLabel, Switch} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

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
      parseMarkdownLaTeX(contentDiv, markdownContent, darkMode);
    }
  };

  useEffect(() => {
    renderContent();
  }, [darkMode]);

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
      <div className="markdown-body p-4" ref={contentRef}></div>
    </>
  );
}
