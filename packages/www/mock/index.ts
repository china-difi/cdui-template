import { http } from 'cdui-js';

// @ts-ignore
const modules = import.meta.glob(['./mock-data/*.json'], {
  eager: false, // 使用懒加载，这样每个 JSON 文件会成为一个单独的 chunk
  import: 'default', // 导入默认导出（JSON 文件默认导出的就是整个对象）
});

if (import.meta.env.VITE_API_MOCK) {
  const get = http.get;

  http.get = (url, config) => {
    let index = url.indexOf('?');
    let path = index >= 0 ? url.slice(0, index) : url;

    path = `./mock-data/${path.replace('/api/', '')}.json`;

    if (modules[path]) {
      // 模拟 200ms 风络加载时间
      return new Promise((resolve) => {
        setTimeout(() => resolve(modules[path]()), 200);
      });
    }

    return get.call(http, url, config);
  };
}
