/** base */
const AppName = 'Customer';
const AppUrl = process.env.AppUrl ?? 'http://localhost:3000';
const AppVersion = process.env.AppVersion ?? 'Dev';
const ApiMain = process.env.ApiMain ?? 'https://api.getchoreless.com';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY ?? '';

/** dev */
const debug = Boolean(process.env.debug) ?? false;

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', '@vueuse/nuxt'],

	tailwindcss: {
		viewer: false,
		cssPath: '~/assets/css/index.css'
	},

	runtimeConfig: {
		public: {
			base: {
				AppName,
				AppUrl,
				AppVersion,
				ApiMain,
				GOOGLE_API_KEY
			},
			dev: {
				debug
			}
		}
	},
	devtools: { enabled: debug }
})
