/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
 content: [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
 ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    extend: {
      fontFamily: {
        'sans': ['Segoe UI', ...defaultTheme.fontFamily.sans],
      },
      width: {
        '75' : '19rem',
        '150': '45rem',
        '170': '48.5rem',
        '180': '52.5rem',
        '200': '55rem',
      },
      height: {
        '110': '27rem',
        '128': '32rem',
        '140': '36.5rem'
      },
      margin: {
        '100': '50rem',
      },
      colors: {
        'beigeL': '#FFF2E9',
        'beigeD': '#FFD9BD',
        'beigeSD': '#E9975B'
      }
    },
  },
  plugins: [],
}
