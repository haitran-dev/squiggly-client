/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			screens: {
				'sm-height': { raw: '(max-height: 639px)' },
			},
			colors: {
				dark: '#000000',
				light: '#ffffff',
			},
		},
	},

	plugins: [],
};
