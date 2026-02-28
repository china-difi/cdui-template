import { Switch, location, registerAutoClose, listenAutoCloseEvent, layout, onMount } from 'cdui-js';

// 引入 API MOCK
import '../mock';

import { Header, SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from './Header';
import { Menu } from './Menu';
import { ToolBar } from './ToolBar';

import { NotFound } from './NotFound';
import { MyPage } from './my/pc/Main';
import { MyPageMobile, MyPageNotFoundMobile } from './my/mobile/Main';

/**
 * 路由集合
 */
const routes = [
  {
    path: '/page1.html',
    component: NotFound,
    keepalive: 'page1',
  },
  {
    path: '/page2.html',
    component: NotFound,
    keepalive: 'page2',
  },
];

const pcRoutes = [
  {
    path: '/my',
    component: MyPage,
    keepalive: 'my',
    match: () => location.paths[0] === '/my',
  },
];

const mobileRoutes = [
  {
    path: '/my',
    component: MyPageMobile,
    keepalive: 'my-mobile',
  },
];

/**
 * 切换分支
 */
const switchCase = () => {
  let path = location.path;

  // 主页
  if (path === '/' || path === '/index.html') {
    return {
      component: NotFound,
      keepalive: 'home',
    };
  }

  return (
    // 通用路由优先
    routes.find((item: any) => item.path === path) ||
    (layout['gt-800'] ? pcRoutes : mobileRoutes).find((item: any) =>
      item.match ? item.match() : item.path === path,
    ) || {
      component: path.startsWith('/my/') && layout['le-800'] ? MyPageNotFoundMobile : NotFound,
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

export const App = () => {
  return (
    <div id="app" class="bg-c-XXD color font-s" {...listenAutoCloseEvent}>
      <Header />
      <div id="sidebar">
        <Menu />
      </div>
      <main id="main" style={{ 'min-height': '100vh' }}>
        <div class="container">
          <Switch case={switchCase()}></Switch>
        </div>
      </main>
      <ToolBar></ToolBar>
    </div>
  );
};
