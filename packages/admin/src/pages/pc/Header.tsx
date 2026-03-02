import { If, Icon, location, disableAutoCloseEvent } from 'cdui-js';

import { Header as i18n } from '../../i18n';
import { user } from '../../lib/user';

export const SIDEBAR_EXPANDED = 'sidebar-expanded';
export const SIDEBAR_COLLAPSED = 'sidebar-collapsed';

export const toggleMenuCollapsed = (event: Event) => {
  let classList = document.body.classList;

  // 停止冒泡以屏蔽自动收拢
  event.stopPropagation();

  // 收拢状态
  if (!classList.contains(SIDEBAR_EXPANDED)) {
    classList.remove(SIDEBAR_COLLAPSED);
    classList.add(SIDEBAR_EXPANDED);
  } else {
    classList.remove(SIDEBAR_EXPANDED);
    classList.add(SIDEBAR_COLLAPSED);
  }

  // 触发内容区大小变化事件
  window.dispatchEvent(new Event('content-resize'));
};

/**
 * 页头组件
 */
export const Header = () => {
  return (
    <header id="header" class="padding-r bg-c">
      {/* 展开收拢 */}
      <Icon
        name="sidebar-toggle"
        class="sidebar-toggle icon-s-L icon-c-XXL"
        style={{ padding: '0 22px' }}
        {...disableAutoCloseEvent}
        onclick={(event) => toggleMenuCollapsed(event)}
      ></Icon>
      {/* logo */}
      <Icon name="logo" class="logo" style={{ padding: '0' }} onclick={() => location.routeTo('/', [0, 0])}></Icon>
      <div style="flex:auto;"></div>
      {/* 登录用户 */}
      <If when={user.login}>
        {/* 搜索 */}
        <Icon name="search" class="auto-hidden"></Icon>
        {/* 提醒 */}
        <Icon name="remind"></Icon>
        {/* 换肤 */}
        <Icon name="theme" class="auto-hidden"></Icon>
        {/* 头像 */}
        <img
          class="auto-hidden height-100 padding-S cursor-pointer"
          src={user.image}
          onclick={() => location.routeTo('/my', [0, 0])}
        ></img>
      </If>
      {/* 非登录用户 */}
      <If when={!user.login}>
        <button class="button-primary font-bold">{i18n.Login}</button>
      </If>
    </header>
  );
};
