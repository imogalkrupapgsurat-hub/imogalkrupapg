import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": { target: "https://imogalkrupapg-ten.vercel.app", changeOrigin: true },
      "/uploads": { target: "https://imogalkrupapg-ten.vercel.app", changeOrigin: true },
    },
  },
})
