/** base */
const APP_NAME = "Customer";
const APP_VERSION = process.env.APP_VERSION ?? "Dev";
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";
const API_MAIN = process.env.API_MAIN ?? "https://api.getchoreless.com";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY ?? "";
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY ?? "";
/** dev */
const DEBUG = Boolean(process.env.DEBUG) ?? false;

export default defineNuxtConfig({
  build: {
    transpile: ["@googlemaps/js-api-loader", "@vue-stripe/vue-stripe"],
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon", "@vueuse/nuxt"],

  tailwindcss: {
    viewer: false,
    cssPath: "~/assets/css/index.css",
  },

  runtimeConfig: {
    public: {
      base: {
        APP_NAME,
        APP_VERSION,
        APP_URL,
        API_MAIN,
        GOOGLE_API_KEY,
        STRIPE_PUBLISHABLE_KEY,
      },
      dev: {
        DEBUG,
      },
    },
  },
  devtools: { enabled: DEBUG },
});
