import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

import { readIconFile, readIconsDirectory, writeIconsModule, writeIconsToHtml } from 'cdui-js/build/icons';

// 创建 require 函数
const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = [
  // 加载 cdui-js/icons 下的图标
  readIconsDirectory(path.join(path.dirname(require.resolve('cdui-js')), 'icons'), 'both'),

  readIconFile(path.join(__dirname, 'logo.svg')),

  readIconsDirectory(path.join(__dirname, 'header'), 'both'),

  readIconsDirectory(path.join(__dirname, 'menu'), 'both'),
  readIconsDirectory(path.join(__dirname, 'menu/color')),

  readIconsDirectory(path.join(__dirname, 'my'), 'both'),
];

writeIconsToHtml(path.join(__dirname, '../index.html'), icons.join('\n'));
