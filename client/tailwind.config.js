export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:   { 900:"#1a1a2e", 800:"#16213e", 700:"#0f3460" },
        accent: "#e94560",
        gold:   "#f5a623",
        cream:  "#faf8f5",
      },
      fontFamily: {
        sans:  ["Poppins",          "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      animation: {
        blob:  "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform:"translate(0,0) scale(1)" },
          "33%":     { transform:"translate(30px,-50px) scale(1.1)" },
          "66%":     { transform:"translate(-20px,20px) scale(0.9)" },
        },
        float: {
          "0%,100%": { transform:"translateY(0)" },
          "50%":     { transform:"translateY(-18px)" },
        },
        "pulse-ring": {
          "0%":   { transform:"scale(0.8)", opacity:"1" },
          "100%": { transform:"scale(2.2)", opacity:"0" },
        },
      },
      screens: { "3xl":"1920px" },
    },
  },
  plugins: [],
}
