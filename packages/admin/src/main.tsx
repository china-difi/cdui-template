import './css/all.css';

import { hydrate, render } from 'cdui-js';
import { App } from './pages/App';

let body = document.body;

// 服务端渲染
if ((window as any)._$HY) {
  let icons = document.getElementById('ICONS');

  // 激活客户端组件
  hydrate(() => <App />, body);
  body.insertBefore(icons, body.firstChild);
} else {
  // 客户端渲染
  render(App, body);
}

declare global {
  export interface ImportMeta {
    // 配置环境变量类型
    env: {
      /**
       * 应用运行模式
       */
      MODE: string;

      /**
       * 是否服务端渲染
       */
      SSR: boolean;

      /**
       * API基础路径
       */
      VITE_API_BASE_URL: string;

      /**
       * 是否开启 API Mock
       */
      VITE_API_MOCK: boolean;
    };
  }
}
