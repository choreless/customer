import daisyui from 'daisyui';
import pseudoClasses from './lib/pseudo_classes';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
	],
	theme: {
		extend: {
			colors: {
				brand: {
					black: '#011631',
					blue: '#3063ff',
					orange: '#f85a47',
				}
			},
			fontFamily: {
				'GTWalsheim': 'GTWalsheim'
			},
		}
	},
	plugins: [daisyui, pseudoClasses],
	daisyui: {
		themes: ['light']
	}
}
export default config;
