const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ["./src/**/*.{md,njk,html}"],
	theme: {
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px'
	 	},
		colors: {
			black: 'black',
			white: 'white',
			slate: '#475569',
			light: '#f3f3f3',
			dark: '#252525',
			rose: '#9F1239',
			christmas: {
				darkGreen: '#165B33',
				lightGreen: '#146B3A',
				yellow: '#F8B229',
				lightRed: '#EA4630',
				darkRed: '#930C24'
			},
			lightGrey: '#f3f4f6',
			darkGrey: '#374151',
		},
		backgroundColor: ({theme}) => theme('colors'),
		textColor: ({theme}) => theme('colors'),
		spacing: {
			'size-0': 'clamp(0.83rem, 0.90rem + -0.32vw, 0.67rem)',
			'base': 'clamp(1.00rem, 1.00rem + 0.00vw, 1.00rem)',
			'size-1': 'clamp(1.20rem, 1.08rem + 0.59vw, 1.50rem)',
			'size-2': 'clamp(1.44rem, 1.12rem + 1.58vw, 2.25rem)',
			'size-3': 'clamp(1.73rem, 1.09rem + 3.21vw, 3.38rem)',
			'size-4': 'clamp(2.07rem, 0.91rem + 5.83vw, 5.06rem)',
			'size-5': 'clamp(2.49rem, 0.50rem + 9.96vw, 7.59rem)'
		},
		fontSize: {
			'size-0': 'clamp(0.83rem, 0.90rem + -0.32vw, 0.67rem)',
			'base': 'clamp(1.00rem, 1.00rem + 0.00vw, 1.00rem)',
			'size-1': 'clamp(1.20rem, 1.08rem + 0.59vw, 1.50rem)',
			'size-2': 'clamp(1.44rem, 1.12rem + 1.58vw, 2.25rem)',
			'size-3': 'clamp(1.73rem, 1.09rem + 3.21vw, 3.38rem)',
			'size-4': 'clamp(2.07rem, 0.91rem + 5.83vw, 5.06rem)',
			'size-5': 'clamp(2.49rem, 0.50rem + 9.96vw, 7.59rem)'
		},
		fontFamily: {
			// sans: ['"Inter"', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif']
			sans: '"Inter"',
			mono: defaultTheme.fontFamily.mono,
			spooky: ['"Creepy Pumkin"', ...defaultTheme.fontFamily.mono],
			christmas: ['"Christmas"', ...defaultTheme.fontFamily.sans]
		},
		gap: ({theme}) => ({
			none: '0px',
			...theme('spacing'),
		}),
		margin: ({theme}) => ({
			auto: 'auto',
			none: '0',
			...theme('spacing')
		}),
		padding: ({theme}) => ({
			none: '0',
			...theme('spacing')
		}),
		scrollMargin: ({theme}) => ({
			...theme('spacing')
		}),
		textColor: ({theme}) => theme('colors'),
		zIndex: {
			auto: 'auto',
			0: '0',
			10: '10',
			20: '20',
			30: '30',
			40: '40',
			50: '50',
			60: '60'
		}
	},
	variantOrder: [
		'first',
		'last',
		'odd',
		'even',
		'visited',
		'checked',
		'empty',
		'read-only',
		'group-hover',
		'group-focus',
		'focus-within',
		'hover',
		'focus',
		'focus-visible',
		'active',
		'disabled',
		'spooky'
	],
	plugins: [
		plugin(({addVariant}) => {
			addVariant('spooky', 'body[data-color-scheme="spooky"] &');
			addVariant('christmas', 'body[data-color-scheme="christmas"] &');
		}),
	],
}
  