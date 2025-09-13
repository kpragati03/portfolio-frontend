import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
}

