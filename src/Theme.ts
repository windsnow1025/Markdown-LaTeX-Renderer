export enum ThemeType {
  Light = "light",
  Dark = "dark",
}

export function applyTheme(theme: ThemeType) {
  applyMarkdownTheme(theme);
  applyHighlightTheme(theme);
}

function applyMarkdownTheme(theme: ThemeType.Light | ThemeType.Dark) {
  // Get all link elements
  const links = document.getElementsByTagName('link');

  // Loop through all link elements
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');

    // If link is for github-markdown-css, remove it
    if (href && href.includes('github-markdown')) {
      link.parentNode?.removeChild(link);
    }
  }

  // Add new link element
  if (theme === 'dark') {
    const darkCss = document.createElement('link');
    darkCss.setAttribute('rel', 'stylesheet');
    darkCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.css');
    document.head.appendChild(darkCss);
  } else if (theme === 'light') {
    const lightCss = document.createElement('link');
    lightCss.setAttribute('rel', 'stylesheet');
    lightCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.css');
    document.head.appendChild(lightCss);
  }
}

function applyHighlightTheme(theme: string) {
  // Get all link elements
  const links = document.getElementsByTagName('link');

  // Loop through all link elements
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');

    // If link is for highlight.js, remove it
    if (href && href.includes('highlight')) {
      link.parentNode?.removeChild(link);
    }
  }

  // Add new link element
  if (theme === 'dark') {
    const darkCss = document.createElement('link');
    darkCss.setAttribute('rel', 'stylesheet');
    darkCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css');
    document.head.appendChild(darkCss);
  } else if (theme === 'light') {
    const lightCss = document.createElement('link');
    lightCss.setAttribute('rel', 'stylesheet');
    lightCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css');
    document.head.appendChild(lightCss);
  }
}
