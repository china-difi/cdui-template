import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import legacy from '@vitejs/plugin-legacy';
import VitePlugin from 'cdui-js/vite-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * h5构建方法
 */
export default defineConfig({
  root: __dirname,
  base: '/',
  plugins: [
    VitePlugin({}),
    // legacy({
    //   targets: ['Chrome >= 49'],
    //   // targets: ['ie >= 10', 'chrome >= 58', 'firefox >= 54'],
    //   // 强制 Babel 转译所有 ES6+ 语法（包括箭头函数）
    //   // babelPresetOptions: {
    //   //   useBuiltIns: 'usage', // 自动按需注入 polyfill（不冗余）
    //   // corejs: 3, // 依赖 core-js@3 提供 polyfill
    //   // }
    // }),
  ],
  optimizeDeps: {
    // 关键：从 vite 预构建中排除这个包
    exclude: ['cdui-js']
  },
  build: {
    // target: 'es2015',
    modulePreload: false,
    outDir: path.join(__dirname, '../../dist/www'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(__dirname, 'index.html'),
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
    // minify: false,
    cssCodeSplit: false,
    sourcemap: true,
  },
  server: {
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/api': {
        target: 'https://api.xxx.com', // 测试环境
        changeOrigin: true, //支持跨域
        // rewrite: (path) => path.replace(/^\/api/, ''), //重写路径,替换/api,开发环境需要重写路径
        // secure: false,
        // protocolRewrite: 'https',
      },
    },
  },
});
