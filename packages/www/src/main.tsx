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
