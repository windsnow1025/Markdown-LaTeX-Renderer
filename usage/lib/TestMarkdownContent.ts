export const testMarkdownContent = `
# Markdown LaTeX Renderer Demo

## Inline Mode LaTeX

Mass–energy equivalence: $E = mc^2$

## Display Mode LaTeX

Gaussian integral:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

## Code Example

Hello World

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
