import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import { defaultLocale, localeKeys, astroI18nConfigPaths } from "./src/i18n/config";

const { SITE_URL, SITE_BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
const PORT = 4321;
const URL = import.meta.env.DEV ? `http://localhost:${PORT}` : SITE_URL ?? "https://www.daliborhon.dev/";

console.log(`> Using SITE_URL: '${URL}'`);
console.log(`> Using SITE_BASE: '${SITE_BASE === undefined ? "/" : SITE_BASE}'`);

// https://astro.build/config
export default defineConfig({
    site: URL,
    base: SITE_BASE,
    trailingSlash: "never",
    build: {
        format: "file",
    },
    output: "hybrid",
    adapter: cloudflare({
        imageService: "passthrough", // "compile" is currently broken - https://github.com/withastro/adapters/issues/213
        platformProxy: {
            enabled: true,
        },
    }),
    i18n: {
        defaultLocale: defaultLocale,
        locales: [...astroI18nConfigPaths],
        routing: {
            prefixDefaultLocale: false,
        },
    },
    vite: {
        server: {
            port: PORT,
        },
    },
});
