import { Loader } from '@googlemaps/js-api-loader';

export default defineNuxtPlugin(nuxtApp=>({
	provide: {
		google_loader: new Loader({
			apiKey: nuxtApp.$config.public.base.GOOGLE_API_KEY,
			version: 'weekly'
		})
	}
}))
