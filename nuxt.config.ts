/** base */
const AppName = 'Admin';
const AppUrl  = process.env.AppUrl ?? 'http://localhost:3000';
const AppVersion = '0.1.0';
const ApiMain = process.env.ApiMain ?? 'https://api.getchoreless.com';

/** dev */
const debug = Boolean(process.env.debug) ?? false;

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon'],

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
				ApiMain
			},
			dev: {
				debug
			}
		}
	},
	devtools: { enabled: debug }
})
