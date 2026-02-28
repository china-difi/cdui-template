import { parentPort } from 'worker_threads';

// 预先加载 window 补丁
import './window';
import language from './language';

import fs from './fs';
import path from 'path';

import { createComponent } from 'solid-js';
import { generateHydrationScript, renderToString } from 'solid-js/web';

import { ServerContext, setServerContext, updateURL } from 'cdui-js';

import { languages, defaultLanguage } from '@cdui-js/www/src/ssr/i18n';
import { SSR_ERRORS } from '@cdui-js/www/src/http-interceptor';
import { getAllPages, SSRRenderPage } from '@cdui-js/www/src/ssr/load-pages';
import { App } from '@cdui-js/www/src/pages/App';

const renderToStringAsync = async <T>(context: ServerContext, fn: () => T) => {
  while (true) {
    setServerContext(context);

    let html = renderToString(fn);

    if (context.promises[0]) {
      await Promise.all(context.promises);
      context.promises.length = 0;
    } else {
      return html;
    }
  }
};

/**
 * 渲染单个页面
 */
const renderPage = async (root: string, template: string, page: SSRRenderPage) => {
  let context = { promises: [], cache: new Map(), ssr: {} };
  let title = page.title;
  let description = page.description;
  let scripts = [];

  // 设置当前路由路径
  updateURL(page.path, page.search);

  // 渲染html
  let html = await renderToStringAsync(context, () => createComponent(App, null));

  // 多语言
  if (language !== defaultLanguage) {
    template = template.replace('lang="en"', 'lang="' + language + '"');

    if (languages[language]) {
      scripts.push('<script type="text/javascript">window.I18N=' + JSON.stringify(languages[language]) + '</script>');
    }
  }

  if (Object.getOwnPropertyNames(context.ssr).length > 0) {
    scripts.push('<script type="text/javascript">window.SSR=' + JSON.stringify(context.ssr) + '</script>');
  }

  scripts.push(generateHydrationScript());

  // 插入内容
  html = template.replace('<!-- ssr-body -->', html);

  // 插入头部脚本
  html = html.replace('<!-- ssr-head -->', scripts.join(''));

  if (title) {
    html = html.replace(/\<title\>[^<]+/, '<title>' + title);
  }

  if (description) {
    html = html.replace(
      /\<meta\s+name\=\"description\"\s+content\=\"[^"]+/,
      '<meta name="description" content="' + description
    );
  }

  let file = path.join(root, 'ssr', language, page.path);
  let dir = path.dirname(file);

  if (!(await fs.exists(dir))) {
    await fs.mkdir(dir);
  }

  await fs.writeFile(file, html, 'utf8');
};

/**
 * 渲染页面集合
 */
const renderPages = async (root: string, template: string) => {
  let pages;

  try {
    pages = await getAllPages();
  } catch (err) {
    console.error(language, err);
    SSR_ERRORS.push((err.message || err) + (err.cause ? ': ' + err.cause : ''));

    return Promise.reject({
      language,
      errors: SSR_ERRORS,
    });
  }

  for (let i = 0, l = pages.length; i < l; i++) {
    let page = pages[i];

    try {
      console.log(`rendering：${language} ${page.path}`);

      // let now = Date.now();
      await renderPage(root, template, page);
      // console.log(language, page.path, Date.now() - now, process.memoryUsage().heapTotal);
    } catch (err) {
      console.error(err);
      SSR_ERRORS.push(err.message + ': ' + (err.cause || { message: '...' }).message);
    }

    // 页面渲染失败终止渲染
    if (SSR_ERRORS[0] && page.abort !== false) {
      break;
    }
  }

  if (SSR_ERRORS[0]) {
    return Promise.reject({
      language,
      errors: SSR_ERRORS,
    });
  }
};

parentPort.on('message', (message) => {
  message = JSON.parse(message);

  renderPages(message.root, message.template).then(
    () => parentPort.postMessage(''),
    (err) => parentPort.postMessage(JSON.stringify(err))
  );
});
