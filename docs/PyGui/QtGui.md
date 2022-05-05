---
title: PyQt6 Gui开发
nav:
  path: /PyGui
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /PyGui
  title: PyGui
order: 2
---

### 安装 PyQt6

`pip install PyQt6`

### Qt Designer 进行 Ui 设计 导入显示 <Badge>Demo</Badge>

```python
from PyQt6 import uic
from PyQt6.QtWidgets import QApplication

Form, Window = uic.loadUiType("dialog.ui")

app = QApplication([])
window = Window()
form = Form()
form.setupUi(window)
window.show()
app.exec()
```

### PyQt6 vs TkinterGui
