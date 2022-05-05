---
title: Tkinter Gui开发
nav:
  path: /PyGui
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /PyGui
  title: PyGui
  order: 2
---

## 使用 tkinter 完成 GUI

### 一个用于编写基于 tkinter 的 GUI 的基本框架 <Badge>Demo</Badge>

```python
import tkinter as tk


class MainApplication(tk.Frame):

    def __init__(self, master):
        self.master = master
        tk.Frame.__init__(self, self.master)
        self.configure_gui()
        self.create_widgets()

    def configure_gui(self):
        self.master.title("Snake game")
        self.master.geometry("500x500")
        self.master.resizable(False, False)

    def create_widgets(self):
        greeting = tk.Label(text="Hello, Tkinter")
        greeting.pack()


if __name__ == '__main__':
    root = tk.Tk()
    main_app = MainApplication(root)
    root.mainloop()

```

_参考:[tkinter-best-practices](https://www.begueradj.com/tkinter-best-practices/)_
