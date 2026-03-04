import fs from 'fs';
import path from 'path';
import { Worker } from 'worker_threads';

import express from 'express';
import { Command } from 'commander';

import { minify } from 'html-minifier';

import { languages } from './i18n';

// render.ts 单独打包
// @ts-ignore
import.meta.glob(['./render.ts'], {
  eager: false, // 使用懒加载，这样每个 JSON 文件会成为一个单独的 chunk
})['./render.ts'];

const program = new Command();

// 设置程序的版本号
program.version('0.0.1');

program.option('-m --mode [mode]', '渲染模式 build server', 'build');
program.option('-p --port [port]', '侦听端口号', '8088');
program.option('-r --root [root]', 'www静态文件根目录 "./"开头表示相对路径', '../www');

program.parse(process.argv);

// 获取选项
const options = program.opts();

const mode = options.mode;
const port = options.port;
const root = options.root[0] === '.' ? path.join(process.cwd(), options.root) : options.root;

// 全局异常捕获
process.on('uncaughtException', (err) => {
  console.error(err);
});

/**
 * 起动线程（每种语言对应一个线程）
 */
const startWorker = (language, template) => {
  let worker = new Worker('./render.js', {
    workerData: {
      language: language.code,
    },
  });

  return new Promise((resolve) => {
    worker.on('message', (result) => {
      // 结束线程
      worker.terminate();
      resolve(result);
    });

    worker.on('error', (err) => {
      // 结束线程
      worker.terminate();
      resolve(err);
    });

    worker.postMessage(
      JSON.stringify({
        root,
        template,
      }),
    );
  });
};

const loadTemplate = () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  return minify(html, {
    collapseWhitespace: true, // 折叠空白字符
    // removeComments: true, // 移除注释
    minifyCSS: true, // 压缩内联 CSS
    minifyJS: {
      compress: {
        arrows: false, // 禁止箭头函数（核心）
      },
      output: {
        beautify: false,
      },
    },
  });
};

/**
 * 执行渲染
 */
const execute = (template) => {
  let now = Date.now();

  console.log(`begin render at: ${new Date().toString()}`);

  return Promise.all(languages.map((language) => startWorker(language, template))).then((results) => {
    results = results.filter((item) => item);

    if (results[0]) {
      results = results.map((item) => {
        console.error(item);
        return JSON.parse(item as string);
      });

      return Promise.reject(results);
    }

    console.log(`end render at: ${new Date().toString()}  elapsed: ${Date.now() - now}`);
  });
};

if (mode === 'build') {
  try {
    let template = loadTemplate();

    // 立即渲染
    execute(template).catch(() => {});
  } catch {
    console.error('load www/index.html fail');
  }
} else {
  // Create http server
  const app = express();

  const header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  // 是否正在渲染
  let rendering = false;

  // 注册路由
  app.use('/full', (request, response) => {
    if (rendering) {
      response.status(508).set(header).send('{ "status": 508, "message": "还有未完成渲染请求" }');
    } else {
      // 标记正在渲染
      rendering = true;

      try {
        let template = loadTemplate();

        execute(template).then(
          () => {
            rendering = false;
            response.status(200).set(header).send('{ "status": 200, "message": "OK" }');
          },
          (err) => {
            rendering = false;
            console.error(err);
            response
              .status(500)
              .set(header)
              .send(JSON.stringify({ status: 500, message: err }));
          },
        );
      } catch (err) {
        rendering = false;
        response.status(500).set(header).send(`{ "status": 500, "message": "load www/index.html fail" }`);
      }
    }
  });

  // 开启侦听服务
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}
