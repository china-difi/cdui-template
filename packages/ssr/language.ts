import { workerData } from 'worker_threads';
import { switchLanguage } from '@cdui-js/www/src/i18n';

import { languages } from '@cdui-js/www/src/ssr/i18n';

const language = workerData.language;

// 全局异常捕获
process.on('uncaughtException', (err) => {
  console.error(err);
});

// 切换语言
switchLanguage(language, (languages.find((item) => item.name === language) || languages[0]).data);

export default language;
