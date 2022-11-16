import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	define: {
		'process.env': {},
	},
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.jsx'),
			name: 'deadwaves-elementor',
			fileName: 'deadwaves-elementor',
		},
		watch: {
			buildDelay: 500,
		},
	},
})
