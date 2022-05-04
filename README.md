# JhihJian-Know-Library

create by

```
yarn create @umijs/dumi-lib
```

配置自动部署到 GitHub Pages

打包文件发布到 Pages 后，显示页面为空白，控制台报错 Failed to load resource 无法加载 css js 文件调整.umirc.ts 配置添加后，解决

```
  base: '/JhihJian-Know-Library',
  publicPath: '/JhihJian-Know-Library/',
```

## Getting Started

Install dependencies,

```bash
$ npm i
```

Start the dev server,

```bash
$ npm start
```

Build documentation,

```bash
$ npm run docs:build
```

Run test,

```bash
$ npm test
```

Build library via `father-build`,

```bash
$ npm run build
```
