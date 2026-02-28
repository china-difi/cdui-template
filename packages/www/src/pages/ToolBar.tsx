import { For, Icon, location, disableAutoCloseEvent } from 'cdui-js';

import { Menu as i18n } from '../i18n';
import { toggleMenuCollapsed } from './Header';

const buttons = [
  {
    icon: 'menu-more',
    text: '更多',
  },
  {
    icon: 'menu-home',
    text: i18n.Home,
    path: '/',
  },
  {
    icon: 'menu-home',
    text: '页面1',
    path: '/page1.html',
  },
  {
    icon: 'menu-home',
    text: '页面2',
    path: '/page2.html',
  },
  {
    icon: 'menu-my',
    text: '我的',
    path: '/my',
  },
];

export const ToolBar = () => {
  return (
    <div class="toolbar bg-c">
      <For each={buttons}>
        {(item) => (
          <div
            class={
              'toolbutton color-primary-active color-primary-selected' +
              (item.path === location.paths[0] || (location.path === '/index.html' && item.path === '/')
                ? ' selected'
                : '')
            }
            // 点击更多时防止自动关闭菜单
            {...(item.icon === 'menu-more' && disableAutoCloseEvent)}
            onclick={(event) => (item.path ? location.routeTo(item.path, [0, 0]) : toggleMenuCollapsed(event))}
          >
            <Icon name={item.icon}></Icon>
            <span>{item.text}</span>
          </div>
        )}
      </For>
    </div>
  );
};
