/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A cor principal da sua marca (Azul Profissional)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Cor principal (botões, destaques)
          600: '#0284c7', // Hover
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Cores neutras para fundo e texto (Slate é melhor que cinza puro)
        slate: {
          850: '#1e293b', // Sidebar
          900: '#0f172a', // Sidebar Darker
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Recomendado importar a fonte Inter no index.css ou HTML
      }
    },
  },
  plugins: [],
}