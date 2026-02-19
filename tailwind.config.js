/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
  colors: {
    primary: "#4F46E5",     // Indigo
    secondary: "#14B8A6",   // Teal
    background: "#F8FAFC",  // Light slate
    darkbg: "#0F172A",
  },
},

  },
  plugins: [],
}
