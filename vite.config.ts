import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// NOTE: the previous version of this file used `define` to inject the
// Gemini API key into the client JS bundle. That is what caused NEWKEY
// to leak (see Leak_Vector_Forensics.md). DO NOT reintroduce a `define`
// block for API keys, passwords, or any other secret.
//
// Anything the browser needs must now go through a serverless function
// in /api/* where process.env.* stays on the server.

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
}));
