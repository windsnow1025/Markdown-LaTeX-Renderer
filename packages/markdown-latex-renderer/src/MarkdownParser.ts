const markdownit = require('markdown-it');
import hljs from 'highlight.js';
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');

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

  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    }
  })
    .use(markdownItSup)
    .use(markdownItSub);

  content = md.render(content);
  content = decodeEntitiesInParsedCode(content);
  return content;
}
