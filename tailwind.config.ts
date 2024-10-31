// import aspectRatio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Geist', ...defaultTheme.fontFamily.sans]
			}
		}
	},

	plugins: [typography]
} as Config;
