import restart from 'vite-plugin-restart'
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src/',
    publicDir: 'public',
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env),
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        minify: 'esbuild',
        brotliSize: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                sobreNosotros: resolve(__dirname, 'src/sobre-nosotros/index.html'),
                pastores: resolve(__dirname, 'src/pastores/index.html'),
                sermones: resolve(__dirname, 'src/sermones/index.html'),
                agenda: resolve(__dirname, 'src/agenda/index.html'),
                ofrendar: resolve(__dirname, 'src/ofrendar/index.html'),
                libreria: resolve(__dirname, 'src/libreria/index.html'),
                privacidadCookies: resolve(__dirname, 'src/privacidad-cookies/index.html'),
            },
            output: {
                manualChunks(id) {
                  if (id.includes('node_modules')) {
                    return 'vendor';
                  }
                }
            }
        }
    },
    plugins: [
        restart({ restart: ['../static/**'] })
    ],
});
