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
  const oldLinks: HTMLLinkElement[] = [];
  const removeOldLinks = () => oldLinks.forEach(link => link.remove());

  // Loop through all link elements
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');

    // If link is for github-markdown-css, collect it
    if (href && href.includes('github-markdown')) {
      oldLinks.push(link);
    }
  }

  // Add new link element, then remove the old ones once it has loaded
  if (theme === 'dark') {
    const darkCss = document.createElement('link');
    darkCss.setAttribute('rel', 'stylesheet');
    darkCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-dark.css');
    darkCss.addEventListener('load', removeOldLinks);
    document.head.appendChild(darkCss);
  } else if (theme === 'light') {
    const lightCss = document.createElement('link');
    lightCss.setAttribute('rel', 'stylesheet');
    lightCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.css');
    lightCss.addEventListener('load', removeOldLinks);
    document.head.appendChild(lightCss);
  }
}

function applyHighlightTheme(theme: string) {
  // Get all link elements
  const links = document.getElementsByTagName('link');
  const oldLinks: HTMLLinkElement[] = [];
  const removeOldLinks = () => oldLinks.forEach(link => link.remove());

  // Loop through all link elements
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute('href');

    // If link is for highlight.js, collect it
    if (href && href.includes('highlight')) {
      oldLinks.push(link);
    }
  }

  // Add new link element, then remove the old ones once it has loaded
  if (theme === 'dark') {
    const darkCss = document.createElement('link');
    darkCss.setAttribute('rel', 'stylesheet');
    darkCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github-dark.min.css');
    darkCss.addEventListener('load', removeOldLinks);
    document.head.appendChild(darkCss);
  } else if (theme === 'light') {
    const lightCss = document.createElement('link');
    lightCss.setAttribute('rel', 'stylesheet');
    lightCss.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css');
    lightCss.addEventListener('load', removeOldLinks);
    document.head.appendChild(lightCss);
  }
}
