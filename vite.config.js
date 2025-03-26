import {ViteMinifyPlugin} from "vite-plugin-minify"
import { defineConfig } from "vite"

export default defineConfig({
    base: '/',
    plugins: [
        ViteMinifyPlugin({})
    ],
    build: {
        outDir: 'build'
    },
    preview: {
        port: '3000',
        cors: true,
        open: true
    }
})