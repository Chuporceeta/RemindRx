import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  includeAssets: [],
  manifest: {
    "name": "RemindRx",
    "short_name": "RemindRx",
    "description": "A medication reminder and management app.",
    "icons": [
      {
        "purpose": "maskable",
        "sizes": "1024x1024",
        "src": "/maskable_icon.png",
        "type": "image/png"
      }
    ],
    "theme_color": "#000000",
    "background_color": "#ffffff",
    "display": "standalone",
    "scope": "/",
    "start_url": "/",
    "orientation": "portrait"
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})

