import markdownit from 'markdown-it';
import hljs from 'highlight.js';
import markdownItSup from 'markdown-it-sup';
import markdownItSub from 'markdown-it-sub';
import { katex } from "@mdit/plugin-katex";
import 'katex/dist/katex.min.css';

export function sanitizeContent(content: string): string {
  return content
    .replaceAll('&', '&amp;')
    .replaceAll('<', "&lt;")
    .replaceAll('>', "&gt;");
}

export function desanitizeContent(content: string): string {
  return content
    .replaceAll('&lt;', "<")
    .replaceAll('&gt;', ">")
    .replaceAll('&amp;', "&");
}

export function parseMarkdownLaTeX(
  content: string,
  sanitizeLevel: number = 0
): string {
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
    typographer: false,
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch {}
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
