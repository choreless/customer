/** base */
const APP_NAME = 'Customer';
const APP_VERSION = process.env.APP_VERSION ?? 'Dev';
const APP_URL = process.env.APP_URL ?? 'http://localhost:3000';
const API_MAIN = process.env.API_MAIN ?? 'https://api.getchoreless.com';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY ?? '';

/** dev */
const DEBUG = Boolean(process.env.DEBUG) ?? false;

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', '@vueuse/nuxt'],

	tailwindcss: {
		viewer: false,
		cssPath: '~/assets/css/index.css'
	},

	runtimeConfig: {
		public: {
			base: {
				APP_NAME,
				APP_VERSION,
				APP_URL,
				API_MAIN,
				GOOGLE_API_KEY
			},
			dev: {
				DEBUG
			}
		}
	},
	devtools: { enabled: DEBUG }
})
