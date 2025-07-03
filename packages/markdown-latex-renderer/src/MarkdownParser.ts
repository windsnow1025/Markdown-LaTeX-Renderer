const markdownit = require('markdown-it');
import hljs from 'highlight.js';
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');

function smartSanitize(content: string): string {
  /**
   * --- REGEX BREAKDOWN ---
   *
   * 1. ```[\s\S]*?```
   *    - Matches fenced code blocks that start and end with triple backticks.
   *    - [\s\S]*? non-greedily matches any character, including newlines.
   *
   * 2.  {4}.*(?:\n {4}.*)*
   *    - Matches indented code blocks where each line starts with four spaces.
   *    - {4}.* matches a line that starts with four spaces, followed by any characters.
   *    - (?:\n {4}.*)* matches zero or more additional lines that each start with a newline and four spaces, followed by any characters.
   *
   * 3. `[^`\n]+`
   *    - Matches inline code spans enclosed in single backticks.
   *    - [^`\n]+ matches one or more characters that are not a backtick or a newline.
   *
   * 4. \$\$[\s\S]*?\$\$
   *    - Matches LaTeX display math blocks enclosed in `$$...$$`.
   *    - [\s\S]*? non-greedily matches any character, including newlines.
   *
   * 5. \\[[\s\S]*?\\]
   *    - Matches LaTeX display math blocks enclosed in `\[ ... \]`.
   *    - [\s\S]*? non-greedily matches any character, including newlines.
   *
   * 6. \\([\s\S]*?\\)
   *    - Matches LaTeX inline math formulas enclosed in `\( ... \)`.
   *    - [\s\S]*? non-greedily matches any character, including newlines.
   */
  const regex = /(```[\s\S]*?```| {4}.*(?:\n {4}.*)*|`[^`\n]+`|\$\$[\s\S]*?\$\$|\\[[\s\S]*?\\]|\\([\s\S]*?\\))/g;

  const sanitize = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let lastIndex = 0;
  let result = '';
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    // Sanitize the text segment before the current match
    if (lastIndex < match.index) {
      result += sanitize(content.slice(lastIndex, match.index));
    }
    // Append the matched (un-sanitized) code/formula block
    result += match[0];
    lastIndex = regex.lastIndex;
  }

  // Sanitize the remaining text after the last match
  if (lastIndex < content.length) {
    result += sanitize(content.slice(lastIndex));
  }

  return result;
}

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

export async function parseMarkdown(content: string, sanitizeLevel: number) {
  content = smartSanitize(content);
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
  return content;
}
