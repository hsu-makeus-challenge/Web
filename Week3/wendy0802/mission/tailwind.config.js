/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./week3_ex/**/*.{js,ts,jsx,tsx}" // MovieCard 경로 포함됐는지 확인
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
