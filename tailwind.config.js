/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,ts}'],
	corePlugins: {
		preflight: false,
	},
	theme: {
		extend: {
			fontFamily: {
				display: ['Syne', 'sans-serif'],
				sans: ['Outfit', 'sans-serif'],
			},
			letterSpacing: {
				studio: '0.22em',
			},
		},
	},
	plugins: [],
};
