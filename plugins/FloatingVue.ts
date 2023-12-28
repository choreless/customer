import FloatingVue from 'floating-vue';

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.use(FloatingVue, {
		themes: {
			'tooltip-primary':   { $extend: 'tooltip', $resetCss: false },
			'tooltip-secondary': { $extend: 'tooltip', $resetCss: false },
			'tooltip-info':      { $extend: 'tooltip', $resetCss: false },
			'tooltip-warning':   { $extend: 'tooltip', $resetCss: false },
			'tooltip-error':     { $extend: 'tooltip', $resetCss: false },
			'tooltip-success':   { $extend: 'tooltip', $resetCss: false }
		}
	});
})
