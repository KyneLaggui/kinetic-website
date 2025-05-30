import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@validation": path.resolve(__dirname, "./src/lib/validation.js"),
      "@utils": path.resolve(__dirname, "./src/lib/utils.js"),
      "@custom-hooks": path.resolve(__dirname, "./src/supabase/custom-hooks"),
    },
  },
});
