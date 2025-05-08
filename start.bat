@echo off
echo 正在启动海洋工程项目全生命周期管理系统...

:: 启动后端服务
start cmd /k "title 后端服务 && uvicorn app.main:app --reload --port 8088"

:: 等待2秒确保后端启动
timeout /t 2 /nobreak > nul

:: 启动前端服务
start cmd /k "title 前端服务 && cd frontend && npm start"

echo 服务启动完成！
echo 后端服务运行在: http://localhost:8088
echo 前端服务运行在: http://localhost:3000 