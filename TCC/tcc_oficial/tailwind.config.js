/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html", // Todos os templates HTML no diretório "templates"
    "./static/js/**/*.js", // Scripts JavaScript na pasta "static/js"
  ],
  theme: {
    extend: {
      colors: {
        gray: "#5D5D5D",
        button: "#B91D32",
        red: "#900000",
      },
    },
  },
  plugins: [],
};
