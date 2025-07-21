# Markdown LaTeX Renderer

Markdown LaTeX Renderer is a library for parsing and rendering Markdown with LaTeX equations and syntax-highlighted code blocks.

GitHub: [https://github.com/windsnow1025](https://github.com/windsnow1025)

NPM: [https://www.npmjs.com/package/markdown-latex-renderer](https://www.npmjs.com/package/markdown-latex-renderer)

## Features

- Markdown parsing: `markdown-it` + `markdown-it-sub` + `markdown-it-sup`
- LaTeX rendering: `@mdit/plugin-katex` + `katex`
- Code highlighting: `highlight.js`
- Customizable sanitize level

### Custom Sanitize Level

You can control the HTML sanitization level by passing the `sanitizeLevel` parameter to `parseMarkdownLaTeX`.
- Positive values: increase sanitization (escape HTML tags)
- Negative values: decrease sanitization (unescape HTML tags)
- Default is `0`.

## Installation

```bash
npm install markdown-latex-renderer
```

## Usage

To use in a Next.js project, update your `next.config.mjs` to include the following configuration:

```js
const nextConfig = {
  transpilePackages: ['markdown-latex-renderer'],
};

export default nextConfig;
```

See full example in `./packages/usage/`.
