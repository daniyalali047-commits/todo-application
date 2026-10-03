import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
//--------------------------------------------------
  server: {
    // any request to /add-task from the frontend gets forwarded
    // to your backend running on localhost:8000 (server-side, no browser CORS/auth issue)
    proxy: {
      '/add-task': 'http://localhost:8000',
      '/tasks': 'http://localhost:8000',
      '/delete-task': 'http://localhost:8000',   
'/update-task': 'http://localhost:8000',
'/auth': 'http://localhost:8000',
   '/signup': {
     target: 'http://localhost:8000',
     bypass: (req) => (req.method === 'GET' ? '/index.html' : undefined)
   },
   '/login': {
     target: 'http://localhost:8000',
     bypass: (req) => (req.method === 'GET' ? '/index.html' : undefined)
   }
  }
    }
    
})
