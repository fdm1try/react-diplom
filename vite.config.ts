import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pluginRewriteAll(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /loader\.png|banner\.jpg|header-logo\.png/i,
            handler: 'CacheFirst',
          }
        ]
      }
    })],  
})
