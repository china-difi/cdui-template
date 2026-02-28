import { languages } from './i18n.ts';

/**
 * 服务端渲染页面配置
 */
export interface SSRRenderPage {
  /**
   * 页面路径
   */
  path: string;

  /**
   * 搜索
   */
  search?: string;

  /**
   * 页面 title 集合，(key 为语言代码)
   */
  title?: string;

  /**
   * 页面描述集合，(key 为语言代码)
   */
  description?: string;

  /**
   * 出现异常时是否终止渲染（渲染终止）
   */
  abort?: boolean;
}

/**
 * 加载服务端渲染页面集合方法，需根据实际业务代码返回相应配置
 */
export const getAllPages = async (): Promise<SSRRenderPage[]> => {
  return Promise.resolve([
    {
      path: '/index.html',
      title: 'Home',
      description: 'Home',
    }
  ]);
};
