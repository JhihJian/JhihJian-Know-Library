---
title: Websockets
nav:
  path: /Python
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /Python
  title: Python
  order: 2
---

#### 简单发消息 Demo

```python
async def hello():
    async with websockets.connect("ws://localhost:6700/api") as websocket:
        await websocket.send(data)
        await websocket.recv()

```
