
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'casino-gold': '#D4AF37',
        'casino-dark': '#121620',
        'casino-red': '#9D2235',
        'casino-blue': '#1E3A5F',
        'casino-cream': '#F5F5DC',
      },
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(to right, #D4AF37, #F9DF74, #D4AF37)',
      }
    },
  },
  plugins: [],
}
