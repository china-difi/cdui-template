import path from 'path';
import { fileURLToPath } from 'url';

import { loadIconFile, loadIconsDirectory, saveIconsModule, saveIconsToHtml } from 'cdui-js/build/icons';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const icons = [
  // 加载 cdui-js/icons 下的图标
  loadIconsDirectory(path.join(__dirname, '../node_modules/cdui-js/icons'), 'both'),

  loadIconFile(path.join(__dirname, 'logo.svg')),

  loadIconsDirectory(path.join(__dirname, 'header'), 'both'),

  loadIconsDirectory(path.join(__dirname, 'menu'), 'both'),
  loadIconsDirectory(path.join(__dirname, 'menu/color')),

  loadIconsDirectory(path.join(__dirname, 'my'), 'both'),
];

saveIconsToHtml(path.join(__dirname, '../index.html'), icons.join('\n'));
