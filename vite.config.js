// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react"; // default React plugin
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (dev, devlocal, production, etc.)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/smca": {
          target: env.BASE_URL, // from your .env file
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [
      react()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
        "@environments": path.resolve(__dirname, "./environments"),
      },
    },
    define: {
      __BASE_URL__: JSON.stringify(env.BASE_URL),
    },
  };
});
