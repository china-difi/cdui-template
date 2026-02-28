export interface MenuItem {
  name: string;
  icon: string;
  text: string;
  onclick?: () => void;
}

export const menuItems: MenuItem[][] = [
  [
    {
      name: 'page1',
      icon: 'menu-home',
      text: '页面1',
    },
    {
      name: 'page2',
      icon: 'menu-home',
      text: '页面2',
    },
  ],
  [
    {
      name: 'security',
      icon: 'my-security',
      text: '安全中心',
    },
    {
      name: 'settings',
      icon: 'my-setting',
      text: '个人设置',
    },
    {
      name: 'logout',
      icon: 'my-logout',
      text: '登出',
      onclick: () => {},
    },
  ],
];
