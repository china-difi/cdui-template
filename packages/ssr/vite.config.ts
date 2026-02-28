import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';

import legacy from '@vitejs/plugin-legacy';
import VitePlugin from 'cdui-js/vite-plugin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [
    VitePlugin({
      ssr: true,
    }),
    legacy({
      targets: ['Chrome >= 49'],
      // targets: ['ie >= 10', 'chrome >= 58', 'firefox >= 54'],
      renderLegacyChunks: false,
      // 强制 Babel 转译所有 ES6+ 语法（包括箭头函数）
      // babelPresetOptions: {
      //   useBuiltIns: 'usage', // 自动按需注入 polyfill（不冗余）
      // corejs: 3, // 依赖 core-js@3 提供 polyfill
      // }
    }),
  ],
  ssr: {
    external: [],
    noExternal: [],
  },
  optimizeDeps: {
    // 关键：从 vite 预构建中排除这个包
    exclude: ['cdui-js'],
  },
  build: {
    target: 'node22',
    outDir: path.resolve(__dirname, '../../dist/ssr'),
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      // output: {
      //   assetFileNames: (assetInfo) => {
      //     return `[name]-[hash].[ext]`;
      //   },
      // },
    },
  },
});
