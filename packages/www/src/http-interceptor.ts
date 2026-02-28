import { httpInterceptor } from 'cdui-js';

// 服务端渲染错误信息集合
export const SSR_ERRORS = [];

// http请求拦截
httpInterceptor.request = (url: string, options: RequestInit) => {
  if (!import.meta.env.SSR && import.meta.env.MODE === 'development') {
    return url;
  }

  // 返回新的地址
  return url && !/^[a-z]+:/.test(url) ? import.meta.env.VITE_API_BASE_URL + url : url;
};

// http响应拦截
httpInterceptor.response = (response: Response, options?: RequestInit, preventLogon?: boolean) => {
  // 401拦截
  //   if (response.status === 401) {
  //     return new Promise(resolve => {
  //       // 打开登录登录窗口等待返回结果
  //       openLoginDialog(message => resolve(message.data as boolean));
  //     });
  //   }

  if (import.meta.env.SSR && response.status !== 200) {
    SSR_ERRORS.push(response.status + ' ' + response.url + '\n');
    return;
  }
};
