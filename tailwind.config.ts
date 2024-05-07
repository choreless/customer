import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import pseudoClasses from './lib/pseudo_classes';

const config: Config = {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue'
	],
	theme: {
		extend: {
			boxShadow: {
				card: '0 0px 15px 0px rgba(0, 0, 0, 0.10)'
			},
			colors: {
				brand: {
					black: '#011631',
					blue: '#3063ff',
					orange: '#f85a47'
				}
			},
			fontFamily: {
				GTWalsheim: 'GTWalsheim',
				CaveatBrush: 'CaveatBrush'
			}
		}
	},
	plugins: [daisyui, pseudoClasses],
	daisyui: {
		themes: ['light']
	}
}
export default config;
