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

运行`pyinstaller app.py`结果 EXE 报错

_关键词 `pyinstaller Error loading Python DLL`_

```
Error loading Python DLL 'K:\3-WorkSpace\2-Python-Projects\Jhih_Ai_Assistant\build\QtGui\python38.dll'.
LoadLibrary: 找不到指定的模块。
```

自定义模块导入不正确

```
ModuleNotFoundError: No module named 'function'
```

打包命令

```
pyinstaller -w --icon='src\\misc\\icon.png' --add-data='src\\misc;misc' --name='Guyu' src/__init__.pyw --onefile
```

### 寻找资源

#### 处理相对路径

我们使用相对路径来引用我们的数据文件。这些路径是相对于当前工作目录的——而不是脚本所在的文件夹。因此，如果您从其他地方运行脚本，它将无法找到文件。

图标不显示的一个常见原因是在使用项目根目录作为当前工作目录的 IDE 中运行示例

os.path.dirname 用于获取包含**file**当前 Python 文件完整路径的文件夹。然后我们使用它来构建图标的相对路径，使用 os.path.join()

```
basedir = os.path.dirname(__file__)
icon = QIcon(os.path.join(basedir, 'misc', 'window_icon.png'))
tray_icon = QIcon(os.path.join(basedir, 'misc', 'tray_icon.png'))
```

`guyu.spec`文件添加数据目录

```
a = Analysis(
    ['src\\__init__.pyw'],
    pathex=[],
    binaries=[],
    datas=[('src\\misc','misc')],
```

### pyinstaller 生成后报毒

### 在页面打印日志

将日志输出到组件

```

import sys
from PyQt5 import QtWidgets
import logging

# Uncomment below for terminal log messages
# logging.basicConfig(level=logging.DEBUG, format=' %(asctime)s - %(name)s - %(levelname)s - %(message)s')

class QTextEditLogger(logging.Handler):
    def __init__(self, parent):
        super().__init__()
        self.widget = QtWidgets.QPlainTextEdit(parent)
        self.widget.setReadOnly(True)

    def emit(self, record):
        msg = self.format(record)
        self.widget.appendPlainText(msg)


class MyDialog(QtWidgets.QDialog, QtWidgets.QPlainTextEdit):
    def __init__(self, parent=None):
        super().__init__(parent)

        logTextBox = QTextEditLogger(self)
        # You can format what is printed to text box
        logTextBox.setFormatter(logging.Formatter('%(asctime)s - %(levelname)s - %(message)s'))
        logging.getLogger().addHandler(logTextBox)
        # You can control the logging level
        logging.getLogger().setLevel(logging.DEBUG)

        self._button = QtWidgets.QPushButton(self)
        self._button.setText('Test Me')

        layout = QtWidgets.QVBoxLayout()
        # Add the new logging box widget to the layout
        layout.addWidget(logTextBox.widget)
        layout.addWidget(self._button)
        self.setLayout(layout)

        # Connect signal to slot
        self._button.clicked.connect(self.test)

    def test(self):
        logging.debug('damn, a bug')
        logging.info('something to remember')
        logging.warning('that\'s not right')
        logging.error('foobar')

app = QtWidgets.QApplication(sys.argv)
dlg = MyDialog()
dlg.show()
dlg.raise_()
sys.exit(app.exec_())
```

#### 如何在 QT 中将小部件动态添加到小部件的布局中(嵌入来自 Qt Designer 的自定义小部件)

[参考](https://www.pythonguis.com/tutorials/embed-pyqtgraph-custom-widgets-qt-app/)

#### qt 编译报错 The name 'layoutWidget' (QWidget) is already in use

```angular2html
 The name 'layoutWidget' (QWidget) is already in use, defaulting to 'layoutWidget1'
```

文本编辑器打开 ui 文件 ，改重复的名 ， 属于是 qt designer 的 bug
