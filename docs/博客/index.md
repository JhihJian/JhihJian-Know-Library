---
title: 博客开发
nav:
path: /博客
title: 博客
order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
path: /博客
title: 博客
order: 3
---

## 开发文档

### 目录结构

<Tree>
  <ul>
    <li>
      docs
      <small>组件库文档目录</small>
      <ul>
        <li>
          index.md
          <small>组件库文档首页（如果不存在，会 fallback 到 README.md）</small>
        </li>
        <li>
          guide
          <small>组件库文档其他路由（示意）</small>
          <ul>
            <li>index.md</li>
            <li>sample.md</li>
            <li>help.md</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      src
      <small>组件库源码目录</small>
      <ul>
        <li>
          Button
          <small>单个组件</small>
          <ul>
            <li>
              index.tsx
              <small>组件源码</small>
            </li>
            <li>
              index.less
              <small>组件样式</small>
            </li>
            <li>
              index.md
              <small>组件文档</small>
            </li>
          </ul>
        </li>
        <li>
          index.ts
          <small>组件库入口文件</small>
        </li>
      </ul>
    </li>
    <li>
      .umirc.ts
      <small>dumi 配置文件（也可以是 config/config.ts）</small>
    </li>
    <li>
      .fatherrc.ts
      <small>father-build 的配置文件，用于组件库打包</small>
    </li>
  </ul>
</Tree>

## 生成项目

`yarn create @umijs/dumi-lib`

## 使用 Github Page 与 Github Action 自动部署

_利用 Github Action 在每次 master 分支更新后自动部署_

1. 新建 `.github/workflows/gh-pages.yml` 文件

```
name: github pages

on:
  push:
    branches:
      - origin # default branch
  schedule:
    - cron: "22 22 * * *"
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-18.04
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run docs:build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          publish_dir: ./docs-dist
```

注： `workflow_dispatch: `允许页面点击开始 Action

2. [设置 Personal Access Token](https://github.com/settings/tokens) 并添加到添加到项目设置的 Actions secrets

配置自动部署到 GitHub Pages

打包文件发布到 Pages 后，显示页面为空白，控制台报错 Failed to load resource 无法加载 css js 文件调整.umirc.ts 配置添加后，解决

```
  base: '/JhihJian-Know-Library',
  publicPath: '/JhihJian-Know-Library/',
```

github pages Action 过程报错

```
Push the commit or tag
/usr/bin/git push origin gh-pages
remote: Permission to JhihJian/JhihJian-Know-Library.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/JhihJian/JhihJian-Know-Library.git/': The requested URL returned error: 403
Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
```

remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead. remote: Please see https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/ for more information. fatal: Authentication failed for 'https://github.com/JhihJian/JhihJian-Know-Library.git/'

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

3

### 生成项目

`yarn create @umijs/dumi-lib`

### 使用 Github Page 与 Github Action 自动部署

_利用 Github Action 在每次 master 分支更新后自动部署_

1. 新建 `.github/workflows/gh-pages.yml` 文件

```
name: github pages

on:
  push:
    branches:
      - origin # default branch
  schedule:
    - cron: "22 22 * * *"
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-18.04
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run docs:build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          publish_dir: ./docs-dist
```

注： `workflow_dispatch: `允许页面点击开始 Action

2. [设置 Personal Access Token](https://github.com/settings/tokens) 并添加到添加到项目设置的 Actions secrets
