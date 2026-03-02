import { getLanguage, saveLanguage } from 'cdui-js';

import current from './languages/en.json';

// @ts-ignore
if (typeof I18N !== 'undefined') {
  // @ts-ignore
  Object.assign(current, I18N);
}

// 获取当前语言
export const langauge = getLanguage();

/**
 * 页头
 */
export const Header = current.Header;

/**
 * 菜单
 */
export const Menu = current.Menu;

/**
 * 切换语言
 *
 * @param name 语言名称
 * @param data 语言配置
 */
export const switchLanguage = (name: string, data?: any) => {
  saveLanguage(name);
  data && Object.assign(current, data);
};
