/** base */
const AppName = 'Admin';
const AppUrl = process.env.AppUrl ?? 'http://localhost:3000';
const AppVersion = process.env.AppVersion ?? 'Dev';
const ApiMain = process.env.ApiMain ?? 'https://api.getchoreless.com';

/** dev */
const debug = Boolean(process.env.debug) ?? false;

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-icon', '@vite-pwa/nuxt', '@vueuse/nuxt'],

	pwa: {
		registerType: 'autoUpdate',
		manifest: {
			name: 'Choreless Point of Sale (POS)',
			short_name: 'Choreless (POS)',
			description: 'The Choreless Point of Sale App streamlines laundromat operations for owners, managers, and attendants. Our proprietary tablet system facilitates processing wash and fold orders, transactions, inventory tracking, and in-store management from A to Z. Choreless optimizes employee and customer interactions with tailored tools to boost efficiency and revenue.',
			start_url: '/',
			id: 'admin.getchoreless.com',
			display: 'fullscreen',
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
