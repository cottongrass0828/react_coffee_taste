/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      require('@tailwindcss/forms')
    ],
    extend: {
      colors: {
        'coffee': {
          '50': '#fffbf2',
          '100': '#fcf4e3',
          '200': '#fae2be',
          '300': '#f7cc97',
          '400': '#f2984e',
          '500': '#ec5506',
          '600': '#d64c06',
          '700': '#b33804',
          '800': '#8f2b03',
          '900': '#6b1c01',
          '950': '#451101'
        }
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [],
}

