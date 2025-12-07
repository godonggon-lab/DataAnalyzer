import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    worker: {
        format: 'es',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // React core
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                    // ECharts core
                    'echarts-core': ['echarts/core', 'echarts/charts', 'echarts/components', 'echarts/renderers'],
                    // ECharts React wrapper
                    'echarts-react': ['echarts-for-react', 'echarts-wordcloud'],
                    // Data processing
                    'data-libs': ['papaparse', 'xlsx'],
                    // State management
                    'zustand': ['zustand'],
                    // AI
                    'ai-libs': ['@google/generative-ai', 'react-markdown'],
                },
            },
        },
        chunkSizeWarningLimit: 1000, // Increase limit to 1000 KB
        sourcemap: false, // Disable sourcemaps in production for smaller size
    },
})
