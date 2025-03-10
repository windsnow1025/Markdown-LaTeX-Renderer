import {parseMarkdown} from "./MarkdownParser";
import {renderLaTeX} from "./LaTeXRenderer";
import {applyTheme, ThemeType} from "./Theme";

export async function parseMarkdownLaTeX(
  content_div: HTMLElement,
  content: string,
  darkMode: boolean,
  sanitize: boolean = true,
) {
  const theme = darkMode ? ThemeType.Dark : ThemeType.Light;
  applyTheme(theme);

  content_div.innerHTML = await parseMarkdown(content, sanitize);
  renderLaTeX(content_div);
}