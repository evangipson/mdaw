import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import mkcert from'vite-plugin-mkcert';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	/* register all the plugins for the application, most importantly, mkcert to allow https */
	plugins: [react(), svgr(), mkcert({
		/* save the generated certificate into certs directory */
		savePath: './certs',
		/* force generation of certs even without setting https property in the vite config */
		force: false,
	})],
	server: {
		port: 5173,
		strictPort: true,
		host: true,
		origin: `https://localhost:5173`,
		/* use the generated cert from mkcert */
		https: {
			cert: './certs/cert.pem',
			key: './certs/dev.pem',
		},
		/* allow access to the API via a server proxy */
		proxy: {
			'/server': {
				target: `https://localhost:5270`,
				changeOrigin: true,
				secure: true,
				rewrite: (path) => path.replace(/^\/server/, '')
			},
		}
	},
})
