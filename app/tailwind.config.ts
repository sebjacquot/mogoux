import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary:     '#161616',
        secondary:   '#f3f3f3',
        ouvrier:     '#ff7979',
        article:     'hsl(0,0%,96%)',
        legende:     '#616161',
        'site-text': '#e8e6e3',
        nav:         '#242424',
        navigation:  '#e22b40',
        'nav-dark':  '#1a1a1a',
      },
      fontFamily: {
        graphik:     ['Graphik', 'sans-serif'],
        helvetica:   ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        times:       ['"Times New Roman"', 'Times', 'serif'],
        merriweather: ['Merriweather', 'serif'],
        inter:       ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
