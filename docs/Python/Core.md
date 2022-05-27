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

#### join vs while True

#### 终止运行中的线程

threading 的设计就是轻量级，不可中断，不可终止。如果需要可以使用 Multiprocessing

```angular2html

import multiprocessing
c = CountdownTask(5)
p = multiprocessing.Process(target = c.run)
p.start()
```

如果非要终止 threading 可以考虑 使用函数 PyThreadState_SetAsyncExc()在线程中引发异常。例如，

```angular2html


import threading
import ctypes
import time

class thread_with_exception(threading.Thread):
    def __init__(self, name):
        threading.Thread.__init__(self)
        self.name = name

    def run(self):

        # target function of the thread class
        try:
            while True:
                print('running ' + self.name)
        finally:
            print('ended')

    def get_id(self):

        # returns id of the respective thread
        if hasattr(self, '_thread_id'):
            return self._thread_id
        for id, thread in threading._active.items():
            if thread is self:
                return id

    def raise_exception(self):
        thread_id = self.get_id()
        res = ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id,
              ctypes.py_object(SystemExit))
        if res > 1:
            ctypes.pythonapi.PyThreadState_SetAsyncExc(thread_id, 0)
            print('Exception raise failure')

t1 = thread_with_exception('Thread 1')
t1.start()
time.sleep(2)
t1.raise_exception()
t1.join()
```

或者使用 settrace()

```angular2html

# Python program using
# traces to kill threads

import sys
import trace
import threading
import time
class thread_with_trace(threading.Thread):
  def __init__(self, *args, **keywords):
    threading.Thread.__init__(self, *args, **keywords)
    self.killed = False

  def start(self):
    self.__run_backup = self.run
    self.run = self.__run
    threading.Thread.start(self)

  def __run(self):
    sys.settrace(self.globaltrace)
    self.__run_backup()
    self.run = self.__run_backup

  def globaltrace(self, frame, event, arg):
    if event == 'call':
      return self.localtrace
    else:
      return None

  def localtrace(self, frame, event, arg):
    if self.killed:
      if event == 'line':
        raise SystemExit()
    return self.localtrace

  def kill(self):
    self.killed = True

def func():
  while True:
    print('thread running')

t1 = thread_with_trace(target = func)
t1.start()
time.sleep(2)
t1.kill()
t1.join()
if not t1.isAlive():
  print('thread killed')
```

Multiprocessing Pros Separate memory space Code is usually straightforward Takes advantage of multiple CPUs & cores Avoids GIL limitations for cPython Eliminates most needs for synchronization primitives unless if you use shared memory (instead, it's more of a communication model for IPC) Child processes are interruptible/killable Python multiprocessing module includes useful abstractions with an interface much like threading.Thread A must with cPython for CPU-bound processing Cons IPC a little more complicated with more overhead (communication model vs. shared memory/objects) Larger memory footprint Threading Pros Lightweight - low memory footprint Shared memory - makes access to state from another context easier Allows you to easily make responsive UIs cPython C extension modules that properly release the GIL will run in parallel Great option for I/O-bound applications Cons cPython - subject to the GIL Not interruptible/killable If not following a command queue/message pump model (using the Queue module), then manual use of synchronization primitives become a necessity (decisions are needed for the granularity of locking) Code is usually harder to understand and to get right - the potential for race conditions increases dramatically

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

#### 周期运行某个任务

```

async def print_me():
    while True:
        print("hello")
        await asyncio.sleep(1)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.call_later(5, lambda: task.cancel())
    task = loop.create_task(print_me())
    try:
        loop.run_until_complete(task)
    except asyncio.CancelledError:
        pass
```

#### 周期运行多任务

```
import asyncio
import time
from datetime import datetime

from util.QueryProcess import QueryProcess


class Funtion2:
    def __init__(self, f_loop):
        self.task = None
        self.loop = f_loop

    async def __function2_run__(self):
        while True:
            print("hello funtion2")
            await asyncio.sleep(1)

    def function1_config(self):
        self.task = self.loop.create_task(self.__function2_run__())
        print("function2 config")
        return self.task

    def run(self):
        print("function2 run")
        loop.run_until_complete(self.task)


class Funtion1:
    def __init__(self, f_loop):
        self.task = None
        self.loop = f_loop

    async def __function1_run__(self):
        while True:
            print("hello function1")
            await asyncio.sleep(1)

    def function1_config(self):
        self.task = self.loop.create_task(self.__function1_run__())
        print("function1 config")
        return self.task

    def run(self):
        print("function1 run")
        loop.run_until_complete(self.task)


if __name__ == '__main__':
    pre = datetime.now()
    # asyncio.run(print_me())
    loop = asyncio.get_event_loop()
    f1 = Funtion1(loop)
    f2 = Funtion2(loop)
    task1 = f1.function1_config()
    task2 = f2.function1_config()


    def cancel():
        task1.cancel()
        task2.cancel()


    loop.call_later(5, cancel)
    try:
        f1.run()
        f2.run()
    except asyncio.CancelledError:
        pass
    print(f"main finish,cost:{datetime.now() - pre}")

```

#### 如何在 Python 中将基于回调的库与 asyncio 库结合起来？

将回调结果放到 asyncio 的队列中，await queue.get()

```
def transmit_keys():
    # Start a keyboard listener that transmits keypresses into an
    # asyncio queue, and immediately return the queue to the caller.
    queue = asyncio.Queue()
    loop = asyncio.get_event_loop()
    def on_press(key):
        # this callback is invoked from another thread, so we can't
        # just queue.put_nowait(key.char), we have to go through
        # call_soon_threadsafe
        loop.call_soon_threadsafe(queue.put_nowait, key.char)
    pynput.keyboard.Listener(on_press=on_press).start()
    return queue

async def main():
    key_queue = transmit_keys()
    async with websockets.connect("ws://localhost:8765") as websocket:
        while True:
            key = await key_queue.get()
            await websocket.send(f"key pressed: {key}")

asyncio.run(main())
```

```

async def main(functions):
    tasks = []
    for function in functions:
        task = asyncio.create_task(function.get_async())
        tasks.append(task)
    await asyncio.gather(*tasks)

asyncio.run(main([function1, function2]))
```

#### 最佳实践，使用 async 管理

包括五大功能

1. 不阻塞主线程
2. 能够从主线程 取消 task
3. 能够在运行过程中动态增加任务
4. 程序能完全退出
5. 支持同步任务

```
import logging
import time
from asyncio import futures
from datetime import datetime

from contextlib import suppress
from threading import Thread
import asyncio

from util import AppSetting


class FunctionController(Thread):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.logger = logging.getLogger(AppSetting.APP_LOG_NAME)
        self.loop = None
        self.tasks = []

    def append_async_task(self, function_hook):
        task = asyncio.run_coroutine_threadsafe(function_hook(), self.loop)
        self.tasks.append(task)

        # 完成后删除
        def _on_completion(f):
            if self.loop.is_running():
                self.tasks.remove(f)

        task.add_done_callback(_on_completion)
        print(f"current tasks size {len(self.tasks)}")

        self.logger.info(f"append async task {function_hook} current tasks size {len(self.tasks)}")
        return task

    def append_sync_task(self, function_hook, *args):
        self.logger.info(f"append sync task {function_hook} ")
        task = self.loop.run_in_executor(None, function_hook, *args)
        self.tasks.append(task)
        return task

    # This method will raise a RuntimeError if called more than once on the same thread object.
    def run(self):
        self.loop = asyncio.new_event_loop()
        loop = self.loop

        asyncio.set_event_loop(loop)
        try:
            # run loop:
            loop.run_forever()
            # 关闭异步迭代器
            loop.run_until_complete(loop.shutdown_asyncgens())
            # cancel task:
            for task in self.tasks:
                task.cancel()
            # 调用 cancel 后，会在task的下个循环中，抛出CancelledError ，所以需要以下内容
            # https://stackoverflow.com/questions/40897428/please-explain-task-was-destroyed-but-it-is-pending-after-cancelling-tasks
            # 这里运行即退出 无需多做一次循环内容
            with suppress(asyncio.CancelledError):
                # run_coroutine_threadsafe 返回的是concurrent.futures
                # run_until_complete 类型不匹配报错,类型是concurrent.futures  期望是 An asyncio.Future, a coroutine or an awaitable
                # 不能使用 asyncio.wrap_future 转换，因为会生成新的task ,导致loop中有两个task ?????
                # 使用 asyncio.ensure_future(task) 转换,无法转换 类型不支持
                for task in self.tasks:
                    if not futures.isfuture(task):
                        task = asyncio.wrap_future(task)
                    loop.run_until_complete(task)
        finally:
            self.logger.info(f"function controller close loop {datetime.now()}")
            loop.close()

    def stop(self):
        # 这里调用是异步的，语句结束后，不一定存在任何变化
        self.loop.call_soon_threadsafe(self.loop.stop)


if __name__ == '__main__':
    async def test_print():
        while True:
            await asyncio.sleep(1)
            print(f"{datetime.now()}")


    fc = FunctionController()
    fc.start()
    time.sleep(1)

    fc.append_async_task(test_print)
    time.sleep(2)
    fc.stop()
    print("all to stop")
    fc.join()
    print(f"join finish tasks size:{len(fc.tasks)}")
    time.sleep(5)


```

#### python destroy object

#### int to bytes-like and from bytes-like

```python
# int to bytes
int.from_bytes(score, byteorder='big')
# int from bytes
i.to_bytes(1, byteorder='big')
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

## urllib

### 下载文件

写法一

```angular2html
def downloadFileFromUrl_retrieve(download_url, store_dir):
    file_name = getFileNameFromUrl(download_url)
    file_path = os.path.join(store_dir, file_name)
    urllib.request.urlretrieve(download_url, file_path)
    return file_path
```

写法二

```

def downloadFileFromUrl(download_url, store_dir):
    file_name = getFileNameFromUrl(download_url)
    file_path = os.path.join(store_dir, file_name)
    # TODO 改为使用配置
    # 使用代理
    proxy_support = urllib.request.ProxyHandler({'http': 'localhost:10809',
                                                 'https': 'localhost:10809'})
    opener = urllib.request.build_opener(proxy_support)

    req = urllib.request.Request(url=download_url)

    # proxy_host = 'localhost:10809'
    # req.set_proxy(proxy_host, 'https')
    with opener.open(req) as response:
        # Create a file objec t
        with open(file_path, "wb") as f:
            # Copy the binary content of the response to the file
            shutil.copyfileobj(response, f)

    return file_path
```

#### 启动和关闭其他程序（Windows 平台)

```

import os
import wmi

Listary_Path = "C:\\0-Portable\\ListaryPortable\\Listary.exe"
Listary_Name = "Listary.exe"


def runProgram(program_path):
    os.system(program_path)


def killProgram(program_name):
    # os.system(f"taskkill /F /IM {app_name}")
    # subprocess.Popen(f"taskkill /F /IM {app_name}", shell=True, creationflags=subprocess.CREATE_NEW_CONSOLE)
    # 以上两种方式都会报 ，权限不够的错误

    f = wmi.WMI()
    ti = 0
    for process in f.Win32_Process():
        if process.name == program_name:
            process.Terminate()
            ti += 1

    if ti == 0:
        print("Process not found!!!")


if __name__ == '__main__':
    # killProgram(Listary_Name)
    runProgram(Listary_Path)

```
