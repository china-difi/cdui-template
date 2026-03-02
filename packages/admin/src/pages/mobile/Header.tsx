import { If, Icon, location } from 'cdui-js';

import { Header as i18n } from '../../i18n';
import { user } from '../../lib/user';

/**
 * 页头组件
 */
export const Header = () => {
  return (
    <header id="header" class="padding-r bg-c">
      {/* logo */}
      <Icon
        name="logo"
        class="logo"
        style={{ 'margin-left': '16px', padding: '0' }}
        onclick={() => location.routeTo('/', [0, 0])}
      ></Icon>
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
