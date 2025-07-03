import '@/lib/global.css'
import {useEffect, useRef, useState} from 'react';
import {FormControlLabel, IconButton, Switch, Tooltip} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import {applyTheme, parseMarkdownLaTeX, sanitizeContent, ThemeType} from "markdown-latex-renderer";
import {applyTheme, parseMarkdownLaTeX, sanitizeContent, ThemeType} from "markdown-latex-renderer/src";
import TextContent from "@/app/TextContent";
import {RawEditableState} from '@/lib/EditableState';
import {testMarkdownContent} from "@/lib/TestMarkdownContent";

export default function Home() {
  const sanitizeLevel = 0;

  const [theme, setTheme] = useState<ThemeType>(ThemeType.Dark);

  const handleThemeChange = () => {
    setTheme(prevTheme => prevTheme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light);
  };

  const [content, setContent] = useState(testMarkdownContent);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <>
      <div>
        <div className="flex items-center">
          <Tooltip title={showPreview ? "Edit Mode" : "Preview Mode"}>
            <IconButton
              aria-label="toggle-preview"
              onClick={() => {
                setShowPreview(!showPreview)
              }}
              size="small"
            >
              {showPreview ? <VisibilityOffIcon fontSize="small"/> : <VisibilityIcon fontSize="small"/>}
            </IconButton>
          </Tooltip>
          <div className="flex-1"></div>
          <FormControlLabel
            control={
              <Switch
                checked={theme === ThemeType.Dark}
                onChange={handleThemeChange}
                color="primary"
              />
            }
            label={theme === ThemeType.Dark ? <DarkModeIcon/> : <LightModeIcon/>}
          />
        </div>
        <TextContent
          content={content}
          setContent={setContent}
          rawEditableState={showPreview ? RawEditableState.AlwaysFalse : RawEditableState.AlwaysTrue}
          sanitizeLevel={sanitizeLevel}
          mode={theme}
        />
      </div>
    </>
  );
}
