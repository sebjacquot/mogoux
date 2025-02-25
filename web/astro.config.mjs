import { defineConfig } from "astro/config";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),

  // tests for reverse proxy on fanum
  //, base: "/memoires-ouvrieres-goux",
  site: "https://fanum.univ-fcomte.fr",
});