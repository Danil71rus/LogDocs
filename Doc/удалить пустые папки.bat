goto start
:fn1
for /d %%i in ("%~1\*") do (call :fn1 "%%i" & rd /q "%%i")
exit /b
:start
call :fn1 "C:\OSPanel\domains\LogDocs.ru\Doc"