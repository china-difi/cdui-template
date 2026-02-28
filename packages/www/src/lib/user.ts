import { reactive } from 'cdui-js';

/**
 * 用户信息
 */
export const user = reactive({
  /**
   * 是否已经登录
   */
  login: true,
  /**
   * 用户名称
   */
  name: 'User Name',
  /**
   * 用户头像
   */
  image: '/images/head.jpg'
});
