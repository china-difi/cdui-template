import { For, Icon, location } from 'cdui-js';

import { user } from '../../../lib/user';
import { menuItems } from '../menu';
import { Breadcrumbs } from './Breadcrumbs';
import { NotFound } from '../../NotFound';

export const MyPageMobile = () => {
  return (
    <div class="my-page relative flex-column align-center font-s-S color-XXL">
      <div class="width-100 padding-XXL" style={{ 'max-width': '480px' }}>
        <div class="font-bold text-align-center">
          <img src={user.image}></img>
          <div style={{ 'margin-top': '4px' }}>{user.name}</div>
        </div>
        <For each={menuItems}>
          {(group) => (
            <div class="margin-t round-L padding-XL bg-c-XD icon-c-XXL">
              <For each={group}>
                {(item) => (
                  <div
                    class="flex align-center hover cursor-pointer"
                    style={{ height: '52px' }}
                    onclick={item.onclick || (() => location.routeTo(`/my/${item.name}`, [0, 0]))}
                  >
                    <Icon class="icon-c-primary-hover icon-c-primary-selected" name={item.icon}></Icon>
                    <span class="margin-l color-primary-hover color-primary-selected">{item.text}</span>
                  </div>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export const MyPageNotFoundMobile = () => {
  return (
    <div>
      <Breadcrumbs class="margin"></Breadcrumbs>
      <NotFound></NotFound>
    </div>
  );
};
