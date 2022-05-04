import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'JhihJian',
  favicon:
    'https://avatars.githubusercontent.com/u/23160988?s=400&u=2cdc89d0d9c79eaf3c03d7b05c33e231f3696ede&v=4',
  logo: 'https://avatars.githubusercontent.com/u/23160988?s=400&u=2cdc89d0d9c79eaf3c03d7b05c33e231f3696ede&v=4',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  base: '/JhihJian-Know-Library',
  publicPath: '/JhihJian-Know-Library/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
});
