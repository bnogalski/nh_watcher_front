module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    flex: {
      '300px': '0 0 300px',
      '100px': '0 0 100px',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
