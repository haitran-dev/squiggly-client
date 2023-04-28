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
				'md-height': { raw: '(min-height: 640px)' },
			},
			colors: {
				dark: '#000000',
				light: '#ffffff',
			},
		},
	},

	plugins: [],
};
