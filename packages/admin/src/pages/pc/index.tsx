import { Switch, location, registerAutoClose } from 'cdui-js';

import { Header, SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from './Header';
import { Menu } from './Menu';

import { NotFound } from '../NotFound';
import { HomePage } from '../all/home';

/**
 * 路由集合
 */
const routes = [
  {
    id: 'home',
    path: '/',
    component: HomePage,
  },
  {
    id: 'page1',
    path: '/page1.html',
    component: NotFound,
  },
  {
    id: 'page2',
    path: '/page2.html',
    component: NotFound,
  },
];

/**
 * 切换分支
 */
const switchCase = () => {
  let path = location.path;

  // 主页
  if (path === '/' || path === '/index.html') {
    return routes[0];
  }

  return (
    routes.find((item: any) => item.path === path) || {
      component: NotFound,
      keepalive: '404',
    }
  );
};

// 注册点击时关闭侧边栏方法
registerAutoClose(() => {
  const classList = document.body.classList;

  if (classList.contains(SIDEBAR_EXPANDED) && window.innerWidth < 1280) {
    classList.remove(SIDEBAR_EXPANDED);
    classList.add(SIDEBAR_COLLAPSED);
  }
});

export const PCHost = () => {
  return (
    <>
      <Header></Header>
      <main id="main" style={{ 'min-height': '100vh' }}>
        <div class="container">
          <Switch case={switchCase()}></Switch>
        </div>
      </main>
      <div id="sidebar">
        <Menu />
      </div>
    </>
  );
};
