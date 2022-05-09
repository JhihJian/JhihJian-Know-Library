---
title: Python核心库
nav:
  path: /Python
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /Python
  title: Python
  order: 2
---

### 时间处理

#### 时间差比较

```python
begin=datetime.now()
time.sleep(0.3)
diff = (datetime.now() - begin).microseconds
assert diff > 300*1000
```

#### timestamp 转换

1. converting a float to hh:mm format

```
def _pprint_secs(secs):
    """Format seconds in a human readable form."""
    now = time.time()
    secs_ago = int(now - secs)
    if secs_ago < 60 * 60 * 24:
        fmt = "%H:%M:%S"
    else:
        fmt = "%Y-%m-%d %H:%M:%S"
    return datetime.datetime.fromtimestamp(secs).strftime(fmt)
```

#### 今日日期

```
from datetime import date

today = date.today()
print("Today's date:", today)
```

### 多线程

#### async

协程 通过 async/await 语法进行声明，是编写 asyncio 应用的推荐方式

```
import asyncio
import time

async def say_after(delay, what):
await asyncio.sleep(delay)
print(what)

async def main():
print(f"started at {time.strftime('%X')}")

    await say_after(1, 'hello')
    await say_after(2, 'world')

    print(f"finished at {time.strftime('%X')}")

asyncio.run(main())
```

预期的输出:

```
started at 17:13:52
hello
world
finished at 17:13:55
```

asyncio.run 的理解,运行的流程

创建线程运行异步 Method 的方法

```python
    async def monitor_message():
        async with websockets.connect("ws://localhost:6700/") as websocket:
            print("monitor_message")

    def run(self):
        _thread = threading.Thread(target=call_monitor_entry, )
        _thread.start()

    def call_monitor_entry():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(monitor_message())
        loop.close()

run()
```

## 设计模式

### 单例

#### **new**()函数实现

当 python 实例化一个对象时，是先执行类的**new**()方法，当我们没写**new**()方法时， 默认调用基类 object 的**new**()方法，然后再执行类的**init**()方法，对这个对象进行初始化， 所有我们可以基于这个，去实现单例模式，我们通过 hasattr(Singleton,  **"\_instance"** ) （其中 hasattr()的功能是判断一个对象有没有指定的属性）去判断之前有没有实例化过对象，如果有，就直接返回， 没有就新创建一个。

```


# 辅助进行db操作
class DbHelper:
    def __init__(self):
        if not hasattr(DbHelper, "_first_init"):
            print("__init__")
            basedir = os.path.dirname(__file__)
            self.db = plyvel.DB(os.path.join(basedir, "guyu-db"), create_if_missing=True)
            DbHelper._first_init = True

    def __new__(cls):
        print("__new__")
        if not hasattr(DbHelper, "_instance"):
            print(" 创建新实例 ")
            DbHelper._instance = object.__new__(cls)
        return DbHelper._instance

```
