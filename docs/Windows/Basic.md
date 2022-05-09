---
title: Windows基本操作
nav:
  path: /Windows
  title: Windows
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /Windows
  title: Windows
  order: 3
---

### 将 Bat 或者 CMD 文件 创建为 windows service 实现开机自启

使用工具 nssm

```CMD
nssm install GuyuQQ
配置
Application
- Path  start.cmd的路径
- Startup directory start.cmd的目录

Details
- DisplayName GuyuQQService

Sevice name:GuyuQQ
```

注：[nssm 下载地址](http://nssm.cc/download) 另外，如果是 exe，可以使用 windows 自带的 sc.exe [文档](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/sc-create)

```CMD
创建
sc.exe create GuyuQQBotService binpath= K:\3-WorkSpace\2-Python-Projects\Jhih_Ai_Assistant\lib\go-cqhttp\go-cqhttp_windows_amd64.exe type=share start=auto displayname= GuyuQQ
启动
net start GuyuQQ
删除
sc.exe delete GuyuQQBotService
```
