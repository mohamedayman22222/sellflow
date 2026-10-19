/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { fontFamily: { sans: ['Cairo', 'sans-serif'] }, colors: { navy: '#0b1d35', brand: '#1769e0', canvas: '#f4f7fb' }, boxShadow: { soft: '0 5px 22px rgba(15, 35, 65, .06)' } } },
  plugins: [],
}