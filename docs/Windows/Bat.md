#### 等待进程结束

```cmd

:LOOP
tasklist | find /i "Guyu" >nul 2>&1
IF ERRORLEVEL 1 (
  GOTO CONTINUE
) ELSE (
  ECHO Guyu is still running
  Timeout /T 5 /Nobreak
  GOTO LOOP
)

:CONTINUE
```

#### 删除自身

```angular2html

(goto) 2>nul & del "%~f0"
```

#### 当前目录

`echo %~dp0`

#### 删除文件夹

`rmdir dist`

#### 解压 zip

`powershell Expand-Archive guyu-v*.*.*-windows-amd64.zip -DestinationPath .`

#### 等待

方法 1 `Timeout /T 3` 方法 2 `waitfor SomethingThatIsNeverHappening /t 5 >NUL`
