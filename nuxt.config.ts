/** base */
const AppName = 'Customer';
const AppUrl = process.env.AppUrl ?? 'http://localhost:3000';
const AppVersion = process.env.AppVersion ?? 'Dev';
const ApiMain = process.env.ApiMain ?? 'https://api.getchoreless.com';

/** dev */
const debug = Boolean(process.env.debug) ?? false;

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', '@vite-pwa/nuxt', '@vueuse/nuxt'],

	pwa: {
		registerType: 'prompt',
		manifest: {
			name: 'Choreless',
			short_name: 'Choreless',
			description: '',
			start_url: '/',
			id: 'v2.getchoreless.com',
			display: 'standalone',
			theme_color: '#f85a47',
			background_color: '#ffffff',
			icons: [
				{
					src: '/pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'any'
				},
				{
					src: '/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any'
				},
				{
					src: '/pwa-maskable-192x192.png',
					sizes: '192x192',
					type: 'image/png',
					purpose: 'maskable'
				},
				{
					src: '/pwa-maskable-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'maskable'
				}
			],
			screenshots: [
				{
					src: '/screenshot.png',
					sizes: '1280x640'
				},
				{
					src: '/screenshot.png',
					sizes: '1280x640',
					form_factor: 'wide'
				}
			]
		},
		devOptions: {
			enabled: debug,
			type: 'module'
		}
	},

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
