---
title: PyQt6 Gui开发
nav:
  path: /Python
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /Python
  title: Python
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

### 最小化到托盘 <Badge>Demo</Badge>

```python
from PyQt6.QtGui import *
from PyQt6.QtWidgets import *

app = QApplication([])
app.setQuitOnLastWindowClosed(False)

# Create the icon
icon = QIcon("icon.png")

# Create the tray
tray = QSystemTrayIcon()
tray.setIcon(icon)
tray.setVisible(True)

# Create the menu
menu = QMenu()
action = QAction("A menu item")
menu.addAction(action)

# Add a Quit option to the menu.
quit = QAction("Quit")
quit.triggered.connect(app.quit)
menu.addAction(quit)

# Add the menu to the tray
tray.setContextMenu(menu)

app.exec_()
```

参考: [System tray & Mac menu bar applications](https://www.pythonguis.com/tutorials/pyqt6-system-tray-mac-menu-bar-applications/)

### 创建界面 label 并更新 text

```python

class MainWindow(QMainWindow):
    def __init__(self):
        super(MainWindow, self).__init__()

        self.setWindowTitle("Guyu Assistant")
        self.__create_lable_widget()
        self.__create_tray_menu()

    def __create_lable_widget(self):
        self.lable_widget = QLabel("Hello")
        font = self.lable_widget.font()
        font.setPointSize(30)
        self.lable_widget.setFont(font)
        self.lable_widget.setAlignment(Qt.AlignmentFlag.AlignHCenter | Qt.AlignmentFlag.AlignVCenter)
        self.setCentralWidget(self.lable_widget)

    def update_text(self, text):
        if not self.isActiveWindow():
            keyboard.write(text)
        self.lable_widget.setText(text)

```

### 打包

### PyQt6 vs TkinterGui
