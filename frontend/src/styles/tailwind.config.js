module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A67C52', // tierra
        secondary: '#B5B682', // verde oliva suave
        accent: '#FFD700', // dorado
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
