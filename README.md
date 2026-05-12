# Markdown LaTeX Renderer

Markdown LaTeX Renderer is a TypeScript library that parses Markdown text with LaTeX equations and renders it into HTML, supporting code highlighting, theme switching, and content sanitization.

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

## Usage

To use in a Next.js project, update your `next.config.mjs` to include the following configuration:

```js
const nextConfig = {
  transpilePackages: ['markdown-latex-renderer'],
};

export default nextConfig;
```

See full example in `./packages/usage/`.

## Development

### pnpm

1. Install Node.js
2. Install pnpm: `npm install -g pnpm`
3. Install dependencies: `pnpm install`

#### Update Package Manager

```bash
pnpm self-update
```

### WebStorm

Settings >> Languages & Frameworks >> JavaScript Runtime >> Package manager: `~\AppData\Roaming\npm\pnpm.cmd`

### Run

```bash
pnpm run dev
```
