import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    server: {
        host: 'localhost',
        port: 3000
    },
    plugins: [vue()],
    base: '/campervans-calendar/',
    resolve: {
        alias: {
            '@': '/src',
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
});

