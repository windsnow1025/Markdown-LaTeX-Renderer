import {parseMarkdown} from "./MarkdownParser";
import {renderLaTeX} from "./LaTeXRenderer";

export async function parseMarkdownLaTeX(
  content_div: HTMLElement,
  content: string,
  sanitizeLevel = 1,
) {
  content_div.innerHTML = await parseMarkdown(content, sanitizeLevel);
  renderLaTeX(content_div);
}