import { parentPort, workerData } from 'worker_threads';

// 预先加载 window 补丁
import { SSRRenderPage, renderSSRPages } from 'cdui-js';

import { switchLanguage } from '../src/i18n';
import { App } from '../src/pages/App';

import { languages } from './i18n';

// 全局异常捕获
process.on('uncaughtException', (err) => {
  console.error(err);
});

// 当前语言
const language = workerData.language;

// 切换语言
switchLanguage(language, (languages.find((item) => item.name === language) || languages[0]).data);

/**
 * 要渲染的服务端页面集合，请根据实际业务需求进行相应配置
 */
const pages: SSRRenderPage[] = [
  {
    path: '/index.html',
    title: 'Home',
    description: 'Home',
  },
];

parentPort.on('message', (message) => {
  message = JSON.parse(message);

  renderSSRPages(App, languages, language, message.root, message.template, pages).then(
    () => parentPort.postMessage(''),
    (err) => parentPort.postMessage(JSON.stringify(err)),
  );
});
