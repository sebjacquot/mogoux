import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),

  // tests for reverse proxy on fanum
  //site: "https://fanum.univ-fcomte.fr",
    site: 'http://localhost:4321',
    base: '/memoires-ouvrieres',
    server: {
      host: true
    }
});