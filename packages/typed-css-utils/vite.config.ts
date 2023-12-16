import path from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'typed-css-utils',
			formats: ['es'],
			fileName: (format) => `typed-css-utils.${format}.js`,
		},
	},
	define: { 
		'import.meta.vitest': 'undefined', 
	},
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
	test: {
		includeSource: ['src/**/*.ts'],
		coverage: {
			provider: 'v8',
			reporter: [ 'text', 'json', 'html' ],
		},
	},
});
