import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  define: {
    "import.meta.env.VITE_GIT_SHA": JSON.stringify(process.env.VITE_GIT_SHA || "development")
  }
})
