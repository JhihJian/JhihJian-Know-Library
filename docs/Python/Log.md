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

### 日志最佳实践

```python
        # 日志基本配置
        log_format = logging.Formatter(fmt='%(asctime)s - %(levelname)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
        logger = logging.getLogger("MainWindow")
        logger.setLevel(logging.DEBUG)
        # 文件日志输出
        fh = logging.FileHandler('example.log')
        fh.setFormatter(log_format)
        # 界面日志输出
        logTextBox = QTextEditLogger(self.LogTextArea)
        logTextBox.setFormatter(log_format)
        logTextBox.setLevel(logging.INFO)
        logger.addHandler(logTextBox)
        # 控制台日志输出
        ch = logging.StreamHandler()
        ch.setFormatter(log_format)
        ch.setLevel(logging.DEBUG)
        logger.addHandler(ch)

        logger.info('程序已启动')

```

[log 文档](https://docs.python.org/3/howto/logging.html#logging-basic-tutorial)

基础使用,

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

如果想同时输出到日志文件和控制台

```python

import logging

ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
# filemode='w', 更早的消息消失
logging.basicConfig(filename='example.log', filemode='w', level=logging.INFO, format='%(asctime)s %(message)s',
                    datefmt='%Y-%m-%d %H:%M:%S')
logger = logging.getLogger('simpleExample')
logger.addHandler(ch)
logger.debug('This message should go to the log file')
logger.info('So should this')
logger.warning('And this, too')
logger.error('And non-ASCII stuff, too, like Øresund and Malmö')
```
