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
