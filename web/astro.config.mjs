import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),

  // tests for reverse proxy on fanum
  //site: "https://fanum.univ-fcomte.fr",
    site: 'http://localhost:4321',
    base: process.env.PUBLIC_BASE_URL,
    server: {
      host: true
    }
});