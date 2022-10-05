/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{md,njk,html}"],
  theme: {
    extend: {
      textUnderlineOffset: {
        "m4": "-4px"
      }
    },
  },
  plugins: [],
}
