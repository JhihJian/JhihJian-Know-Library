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
