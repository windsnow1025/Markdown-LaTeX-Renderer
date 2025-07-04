const markdownit = require('markdown-it');
import hljs from 'highlight.js';
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');
import { katex } from "@mdit/plugin-katex";

// Order: '&' -> '< >'
export function sanitizeContent(content: string): string {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Order: '< >' -> '&'
export function desanitizeContent(content: string): string {
  return content
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

export async function parseMarkdownLaTeX(
  content: string,
  sanitizeLevel: number = 0
): Promise<string> {
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
    html: false,
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
    .use(markdownItSub)
    .use(katex, {
      delimiters: "all"
    });

  content = md.render(content);
  return content;
}
