import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { SSRPackageJSON } from 'cdui-js/ssr-package.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建 package.json 文件
fs.writeFileSync(path.join(__dirname, '../../../dist/ssr/package.json'), SSRPackageJSON, 'utf8');
