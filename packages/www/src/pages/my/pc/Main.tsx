import { For, Icon, Switch, location } from 'cdui-js';

import { NotFound } from '../../NotFound';
import { MenuItem, menuItems } from '../menu';

const switchCase = () => {
  if (location.paths[0] === '/my') {
    // 页面

    return {
      component: NotFound,
      keepalive: '404',
    };
  }
};

export const MyPage = () => {
  return (
    <div class="my-page relative padding-XXL color-XXL">
      <div class="font-s-XL font-bold">{'个人中心'}</div>
      <div class="flex align-start margin-t">
        <div class="round-L padding-XL bg-c-XD icon-c-XXL" style={{ width: '200px' }}>
          <For each={menuItems}>
            {(group: MenuItem[], index) => (
              <>
                {index() > 0 ? <div class="margin-y-XS border-t border-t-c-D" style="height:1px"></div> : void 0}
                <For each={group}>
                  {(item) => (
                    <div
                      class={
                        'flex align-center hover cursor-pointer' +
                        (location.paths[0] === '/my' && (location.path.slice(4) || 'history') === item.name
                          ? ' selected'
                          : '')
                      }
                      style={{ height: '52px' }}
                      onclick={item.onclick || (() => location.routeTo(`/my/${item.name}`))}
                    >
                      <Icon class="icon-c-primary-hover icon-c-primary-selected" name={item.name}></Icon>
                      <span class="margin-l color-primary-hover color-primary-selected">{item.text}</span>
                    </div>
                  )}
                </For>
              </>
            )}
          </For>
        </div>
        <div class="flex-auto margin-l-L">
          <Switch case={switchCase()}></Switch>
        </div>
      </div>
    </div>
  );
};
