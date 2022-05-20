---
title: Python日志使用
nav:
  path: /Python
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /Python
  title: Python
  order: 2
---

[log 文档](https://docs.python.org/3/howto/logging.html#logging-basic-tutorial)

基础使用,小坑

```python
import logging

# filemode='w', 更早的消息消失
logging.basicConfig(filename='example.log', filemode='w', level=logging.DEBUG)
logging.debug('This message should go to the log file')
logging.info('So should this')
logging.warning('And this, too')
logging.error('And non-ASCII stuff, too, like Øresund and Malmö')

logging.warning('%s before you %s', 'Look', 'leap!')

```

```python
import logging
logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %I:%M:%S %p')
logging.warning('is when this event was logged.')
这将显示如下内容：

12/12/2010 11:46:36 AM is when this event was logged.
```
