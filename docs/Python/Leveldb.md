---
title: LevelDb操作
nav:
  path: /Python
  title: Python
  order: 控制导航顺序，数字越小越靠前，默认以路径长度和字典序排序
group:
  path: /Python
  title: Python
  order: 2
---

### Quick Start <Badge>Demo</Badge>

```Python
# 实现单例
class DbHelper:
    def __init__(self):
        if not hasattr(DbHelper, "_first_init"):
            basedir = os.path.dirname(__file__)
            self.db = plyvel.DB(os.path.join(basedir, "guyu-db"), create_if_missing=True)
            DbHelper._first_init = True

    def __new__(cls):
        if not hasattr(DbHelper, "_instance"):
            DbHelper._instance = object.__new__(cls)
        return DbHelper._instance

    # compare: today = date.today()
    def get_db_day(self):
        data = self.db.get(b'today')
        if data:
            db_date = date.fromisoformat(data.decode())
            return db_date
        else:
            return None

    def update_db_day(self):
        self.db.put(b'today', str(date.today()).encode())
        return True

    def __del__(self):
        self.db.close()

    def test_del(self, key):
        self.db.delete(key)

```
