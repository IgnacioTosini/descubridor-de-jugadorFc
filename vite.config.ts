import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  dynamicImport()
  ],
  assetsInclude: ['**/*.webp', '**/*.png', '**/*.jpg', '**/*.jpeg'],
})
