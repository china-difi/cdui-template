import { For, Icon, location, disableAutoCloseEvent } from 'cdui-js';

import { Menu as i18n } from '../../i18n';

const buttons = [
  {
    icon: 'menu-home',
    text: '主页',
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
            onclick={() => location.routeTo(item.path, [0, 0])}
          >
            <Icon name={item.icon}></Icon>
            <span>{item.text}</span>
          </div>
        )}
      </For>
    </div>
  );
};
