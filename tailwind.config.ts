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
					orange: '#f85a47',
					ginkgo: {
						DEFAULT: '#f8d881',
						light: '#fdecc0'
					},
					frost: {
						DEFAULT: '#b6d0cd',
						light: '#d8e4e4'
					},
					lilac: {
						DEFAULT: '#c2bac7',
						light: '#dcd6e0'
					},
					sage: {
						DEFAULT: '#b8bfaf',
						light: '#d9ddcf'
					},
					stone: '#6f6e74',
					sand: '#f2f1ec'
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
