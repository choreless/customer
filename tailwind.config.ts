import daisyui from 'daisyui';
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
		fontFamily: {
			'GTWalsheim': 'GTWalsheim'
		},
		extend: {
			colors: {
				brand: {
					black: '#011631',
					blue: '#3063ff',
					orange: '#f85a47',
				}
			}
		}
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['light']
	}
}
export default config;
