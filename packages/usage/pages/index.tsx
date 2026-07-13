import '@/lib/global.css'
import {useEffect, useState} from 'react';
import {
  createTheme, CssBaseline,
  IconButton,
  Theme,
  ThemeProvider,
  Tooltip
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextContent from "@/app/TextContent";
import {RawEditableState} from '@/lib/EditableState';
import {testMarkdownContent} from "@/lib/TestMarkdownContent";
import {ThemeType} from "markdown-latex-renderer";

const lightMuiTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkMuiTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const sanitizeLevel = 0;

  const [theme, setTheme] = useState<ThemeType>(ThemeType.Dark);
  const [muiTheme, setMuiTheme] = useState<Theme>(lightMuiTheme);

  const handleThemeChange = () => {
    setTheme(prevTheme => prevTheme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light);
  };

  useEffect(() => {
    setMuiTheme(theme === ThemeType.Dark ? darkMuiTheme : lightMuiTheme);
  }, [theme]);

  const [content, setContent] = useState(testMarkdownContent);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
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
          <Tooltip title={theme === ThemeType.Dark ? "Light Mode" : "Dark Mode"}>
            <IconButton
              aria-label="toggle-theme"
              onClick={handleThemeChange}
              size="small"
            >
              {theme === ThemeType.Dark ? <DarkModeIcon fontSize="small"/> : <LightModeIcon fontSize="small"/>}
            </IconButton>
          </Tooltip>
        </div>
        <TextContent
          content={content}
          setContent={setContent}
          rawEditableState={showPreview ? RawEditableState.AlwaysFalse : RawEditableState.AlwaysTrue}
          sanitizeLevel={sanitizeLevel}
          mode={theme}
        />
      </div>
    </ThemeProvider>
  );
}
