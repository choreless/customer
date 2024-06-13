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
					sand: '#f2f1ec',
					xanthous: '#ebb317',
					atomic: '#f69469',
					periwinkle: '#b6bfe6',
					tea: {
						rose: '#fac1bd',
						green: '#cde3aa'
					},
					'tiffany-blue': '#85c6c0',
					'cyan-light': '#d1e8e6',
					'reseda-green': '#6e7839',
					lapis: '#265576',
					purple: '#715485'
				}
			},
			fontFamily: {
				GTWalsheim: 'GTWalsheim',
				CaveatBrush: 'CaveatBrush'
			},
			boxShadow: {
				'order-card': '0px 0px 10px 0px rgba(0, 0, 0, 0.05)',
				addressHead: '0px 2px 6px 0px rgba(0, 0, 0, 0.05)',
				card: '0 0px 15px 0px rgba(0, 0, 0, 0.10)'
			}
		}
	},
	plugins: [daisyui, pseudoClasses],
	daisyui: {
		themes: ['light']
	}
}
export default config;
