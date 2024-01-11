/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["*.html", "./src/**/*.rs", "./input.css"],
  },
  theme: {
    extend: {
      fontFamily: {
        'opensans': ['Open Sans', 'sans-serif'],
        'robotomono': ['Roboto Mono', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'h2': {
              fontSize: theme('fontSize.2xl'),
              fontWeight: theme('fontWeight.semibold'),
              margin: theme('margin.4'),
            },
            'p': {
              fontSize: theme('fontSize.base'),
              margin: theme('margin.2'),
            },
            // Other tags...
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}

