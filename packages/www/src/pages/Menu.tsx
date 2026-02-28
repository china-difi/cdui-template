import { JSX, CollapsiblePanel, CollapsiblePanelApi, Icon, location, disableAutoCloseEvent, untrack } from 'cdui-js';

import { Menu as i18n } from '../i18n';
import { SIDEBAR_COLLAPSED, SIDEBAR_EXPANDED } from './Header';

/**
 * 菜单项信息
 */
interface MenuItemInfo {
  /**
   * 名称
   */
  name: string;

  /**
   * 图标
   */
  icon: string;

  /**
   * 文字
   */
  text: string;

  /**
   * 路径
   */
  path: string;

  /**
   * 子菜单集合
   */
  items?: MenuItemInfo[];
}

const menuList: (MenuItemInfo | '-')[] = [
  {
    name: 'home',
    icon: 'menu-home',
    path: '/',
    text: '主页',
  },
  {
    name: 'page1',
    icon: 'menu-home',
    path: '/page1.html',
    text: '页面1',
  },
  {
    name: 'page2',
    icon: 'menu-home',
    path: '/page2.html',
    text: '页面2',
  },
  '-',
  {
    name: 'blog',
    icon: 'menu-blog',
    path: '/blog.html',
    text: '博客',
  },
  {
    name: 'forum',
    icon: 'menu-forum',
    path: '/forum.html',
    text: '论坛',
  },
  '-',
  {
    name: 'language',
    icon: 'menu-language',
    text: i18n.Language,
    path: '',
    items: [],
  },
];

/**
 * 选中菜单
 *
 * @param event 目标事件
 * @param item 菜单数据
 */
const selectMenu = (event: Event, item: MenuItemInfo) => {
  // 直接使用 DOM 操作切换菜单状态以提升性能
  let target = event.currentTarget as HTMLElement;

  if (!target.classList.contains('selected')) {
    // 切换路由
    location.routeTo(item.path, [0, 0]);

    if (window.innerWidth < 1280) {
      const classList = document.body.classList;

      classList.remove(SIDEBAR_EXPANDED);
      classList.add(SIDEBAR_COLLAPSED);
    }
  }
};

/**
 * 子菜单组件
 */
const SubMenu = (self: { items: MenuItemInfo[] }) => {
  return (
    <div class="menu-items color icon-c-D font-s-XS">
      <span class="menu-line absolute border-l" style={{ left: '18px', width: '1px', height: '100%' }}></span>
      {self.items.map((item) => (
        <MenuLeaf {...item} second={true}></MenuLeaf>
      ))}
    </div>
  );
};

const MenuLeaf = (props: MenuItemInfo & { toggle?: JSX.Element; second?: boolean }) => {
  return (
    <a
      class={
        'menu-leaf padding-x hover' +
        (props.path === location.path + location.search ? ' round color-XXL selected' : '')
      }
      {...(import.meta.env.SSR && { href: '/' + props.name + '.html' })}
      {...disableAutoCloseEvent}
      role="button"
      onclick={(event) => selectMenu(event, props as MenuItemInfo)}
    >
      <Icon class="icon-c-primary-hover icon-c-primary-selected" name={props.icon}></Icon>
      <span
        class={
          'menu-leaf-text margin-l flex-auto ' +
          (props.second ? 'color-hover color-selected' : 'color-primary-hover color-primary-selected')
        }
      >
        {props.text}
      </span>
      {props.toggle}
    </a>
  );
};

/**
 * 可收拢菜单项组件
 */
const CollapsableMenuItem = (props: MenuItemInfo) => {
  let collapsiblePanel: CollapsiblePanelApi;

  return (
    <CollapsiblePanel
      api={(api) => (collapsiblePanel = api)}
      collapsed={untrack(() => props.path !== location.path || !location.search)}
      useTransition={true}
      class="menu-node"
    >
      <MenuLeaf
        {...props}
        toggle={
          <span
            class="flex justify-end align-center cursor-pointer text-align-right"
            style={{ left: '156px', width: '32px', height: '100%' }}
            onclick={(event) => {
              event.stopPropagation();
              collapsiblePanel.collapsed = !collapsiblePanel.collapsed;
            }}
          >
            <Icon
              name="menu-toggle"
              class="menu-leaf-toggle icon-s-S"
              {...(collapsiblePanel.collapsed ? null : { style: 'transform: rotateZ(90deg)' })}
            ></Icon>
          </span>
        }
      ></MenuLeaf>
      <SubMenu items={props.items}></SubMenu>
    </CollapsiblePanel>
  );
};

/**
 * 菜单组件
 */
export const Menu = () => {
  let ref: HTMLElement;

  return (
    <nav ref={ref} id="menu" class="padding-x padding-y-L bg-c-XD color-XXL icon-c-XXL scrollbar-hidden">
      {menuList.map((item) =>
        item !== '-' ? (
          item.items ? (
            <CollapsableMenuItem {...item}></CollapsableMenuItem>
          ) : (
            <MenuLeaf {...item}></MenuLeaf>
          )
        ) : (
          <div class="margin-y-XS border-t border-t-c-D" style="height:1px"></div>
        ),
      )}
    </nav>
  );
};
