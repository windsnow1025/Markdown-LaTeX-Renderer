import {Marked} from "marked";
import {markedHighlight} from "marked-highlight";
import hljs from 'highlight.js';


const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const addLaTeXEscape = (text: string) => {
  return text
    .replace(/\\\[/g, '\\\\\[')
    .replace(/\\\]/g, '\\\\\]')
    .replace(/\\\(/g, '\\\\\(')
    .replace(/\\\)/g, '\\\\\)');
};

// Order: '&' -> '< >'
export function sanitizeContent(content: string) {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Order: '< >' -> '&'
export function desanitizeContent(content: string) {
  return content
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

const decodeEntitiesInParsedCode = function (text: string) {
  // Use "\S\s" instead of "." to match newlines
  return text.replace(/<code([^>]*?)>([\S\s]*?)<\/code>/g, function (match, p1, p2) {
    return `<code${p1}>${p2.replace(/&amp;/g, "&")}</code>`;
  });
};

export async function parseMarkdown(content: string, sanitizeLevel: number) {
  content = addLaTeXEscape(content);

  if (sanitizeLevel < 0) {
    for (let i = 0; i < Math.abs(sanitizeLevel); i++) {
      content = desanitizeContent(content);
    }
  } else if (sanitizeLevel > 0) {
    for (let i = 0; i < sanitizeLevel; i++) {
      content = sanitizeContent(content);
    }
  }

  content = await marked.parse(content);
  content = decodeEntitiesInParsedCode(content);
  return content;
}
