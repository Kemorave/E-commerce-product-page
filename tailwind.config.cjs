/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      keyframes: {
        'moving-line': {
            from: {
                width: '0px',
                opacity: '0',
            },
            to: {
                width: '100%',
                opacity: '1',
            },
        },
    },
    animation: {
        'moving-line': 'moving-line .8s  forwards',
    },


    },
  },
  plugins: [],
}
