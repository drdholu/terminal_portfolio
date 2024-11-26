export const themes = {
  matrix: {
    name: 'Matrix',
    colors: {
      background: '#000000',
      text: '#00ff00',
      accent: '#00cc00',
      muted: '#004400',
      border: '#003300',
    }
  },
  dracula: {
    name: 'Dracula',
    colors: {
      background: '#282a36',
      text: '#f8f8f2',
      accent: '#bd93f9',
      muted: '#44475a',
      border: '#6272a4',
    }
  },
  monokai: {
    name: 'Monokai',
    colors: {
      background: '#272822',
      text: '#f8f8f2',
      accent: '#e6db74',
      muted: '#49483e',
      border: '#75715e',
    }
  },
  nord: {
    name: 'Nord',
    colors: {
      background: '#2e3440',
      text: '#d8dee9',
      accent: '#88c0d0',
      muted: '#3b4252',
      border: '#4c566a',
    }
  },
  solarizedDark: {
    name: 'Solarized Dark',
    colors: {
      background: '#002b36',
      text: '#839496',
      accent: '#b58900',
      muted: '#073642',
      border: '#586e75',
    }
  }
} as const;

export type ThemeName = keyof typeof themes;