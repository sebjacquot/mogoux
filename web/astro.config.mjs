import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  // tests for reverse proxy on fanum
   site: "https://fanum.univ-fcomte.fr"
  ,  base: "/memoires-ouvrieres-goux"
});
