import renderMathInElement from "katex/contrib/auto-render";
import 'katex/dist/katex.min.css';

/**
 * <p>
 *   \[e^{ix} = \cos(x) + i\sin(x)\]
 * </p>
 */
export function renderLaTeX(content_div: HTMLElement) {
  renderMathInElement(content_div);
}