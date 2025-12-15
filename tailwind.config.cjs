/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IRANSansX"', 'sans-serif'], // تنظیم ایران سنس به عنوان فونت اصلی
      },
    },
  },
  plugins: [],
}