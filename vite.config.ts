import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: 'components/**/*', dest: 'components' },
        { src: 'js/**/*', dest: 'js' },
        { src: 'asset/**/*', dest: 'asset' },
        { src: 'pages/**/*', dest: 'pages' },
      ]
    })
  ],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) return 'style.css'
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  server: {
    allowedHosts: true
  }
})