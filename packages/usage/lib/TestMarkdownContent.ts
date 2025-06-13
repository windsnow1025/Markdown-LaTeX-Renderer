export const testMarkdownContent = `
# Markdown LaTeX Renderer Demo

## Markdown Plugins

### Sub Plugin

H~2~0

### Sup Plugin

29^th^

## LaTeX

### \\[ Display Mode Supported

\\[
e^{ix} = \\cos(x) + i\\sin(x)
\\]

### $$ Display Mode Supported

$$
e^{ix} = \\cos(x) + i\\sin(x)
$$

### \\( Inline Mode Supported

\\( e \\), \\( i \\), \\( x \\), \\( \\cos(x) \\), \\( \\sin(x) \\)

### $ Inline Mode Unsupported

$ e $, $ i $, $ x $, $ \\cos(x) $, $ \\sin(x) $

## Code

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`

## Table Example

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1,1 | Cell 1,2 | Cell 1,3 |
| Cell 2,1 | Cell 2,2 | Cell 2,3 |
| Cell 3,1 | Cell 3,2 | Cell 3,3 |

## Link

1. [google.com](https://www.google.com)

## Parsing Test

<div>&</div>

\`<div>&</div>\`

\`\`\`
<div>&</div>
\`\`\`

\`\`\`html
<div>&</div>
\`\`\`

<div>&amp;</div>

\`<div>&amp;</div>\`

\`\`\`
<div>&lt;&amp;&gt;</div>
\`\`\`

\`\`\`html
<div>&lt;&amp;&gt;</div>
\`\`\`

## Java vs Kotlin parsing bug

\`\`\`java
int test(List<Integer> list);
\`\`\`

\`\`\`kotlin
fun test(list: List<Int>): Int
\`\`\`
`;
