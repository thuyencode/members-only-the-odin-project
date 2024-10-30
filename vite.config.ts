import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), visualizer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
