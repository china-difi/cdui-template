import { Switch, location } from 'cdui-js';

import { Header } from './Header';

import { NotFound } from '../NotFound';
import { HomePage } from '../all/home';
import { MyPage } from './my';

import { ToolBar } from './ToolBar';

/**
 * 路由集合
 */
const routes = [
  {
    path: '/',
    component: HomePage,
    keepalive: 'home',
  },
  {
    path: '/page1.html',
    component: NotFound,
    keepalive: 'm-page1',
  },
  {
    path: '/page2.html',
    component: NotFound,
    keepalive: 'm-page2',
  },
  {
    path: '/my',
    component: MyPage,
    keepalive: 'm-my',
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

export const MobileHost = () => {
  return (
    <>
      <Header></Header>
      <main id="main" style={{ 'min-height': '100vh' }}>
        <div class="container">
          <Switch case={switchCase()}></Switch>
        </div>
      </main>
      <ToolBar></ToolBar>
    </>
  );
};
