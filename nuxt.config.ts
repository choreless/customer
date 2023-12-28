/** base */
const AppName = 'Admin';
const AppUrl  = process.env.AppUrl ?? 'http://localhost:3000';
const AppVersion = 'v0.1.0';
const ApiMain = process.env.ApiMain ?? 'https://api.getchoreless.com';

/** dev */
const debug = Boolean(process.env.debug) ?? false;

export default defineNuxtConfig({
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
