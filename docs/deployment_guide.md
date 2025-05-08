# 海洋工程项目全生命周期管理系统部署指南

## 系统要求

- Windows 10/11 操作系统
- PowerShell 5.1 或更高版本
- 管理员权限
- 至少 4GB 可用内存
- 至少 10GB 可用磁盘空间
- 稳定的网络连接

## 前置条件

1. 确保系统已安装以下软件：
   - Git（用于版本控制）
   - Visual Studio Code 或其他代码编辑器
   - PostgreSQL 15（数据库）

2. 确保系统防火墙允许以下端口：
   - 8088（后端服务）
   - 3000（前端服务）
   - 5432（PostgreSQL）

## 安装步骤

### 1. 获取代码

```powershell
# 克隆项目仓库
git clone [项目仓库URL]
cd [项目目录]
```

### 2. 运行安装脚本

```powershell
# 以管理员身份运行 PowerShell
# 执行安装脚本
.\install_new.ps1
```

安装脚本会自动执行以下操作：
- 安装 Python 3.11.8
- 配置 Python 环境变量
- 安装 pip 工具
- 创建虚拟环境
- 安装项目依赖
- 安装 Node.js
- 安装 PostgreSQL（如果未安装）
- 安装 Rust（用于某些依赖的编译）

### 3. 配置数据库

1. 确保 PostgreSQL 服务已启动
2. 创建数据库：
   ```sql
   CREATE DATABASE marine_engineering;
   ```
3. 配置数据库连接：
   - 复制 `.env.example` 为 `.env`
   - 修改数据库连接信息

### 4. 启动服务

1. 启动后端服务：
   ```powershell
   # 激活虚拟环境
   .\venv\Scripts\Activate.ps1
   
   # 启动后端服务
   uvicorn app.main:app --reload --port 8088
   ```

2. 启动前端服务：
   ```powershell
   # 进入前端目录
   cd frontend
   
   # 安装依赖（如果尚未安装）
   npm install
   
   # 启动开发服务器
   npm start
   ```

### 5. 验证安装

1. 访问后端 API 文档：
   - 打开浏览器访问 `http://localhost:8088/docs`
   - 确认 Swagger UI 界面正常显示

2. 访问前端应用：
   - 打开浏览器访问 `http://localhost:3000`
   - 确认登录界面正常显示

## 常见问题

### 1. Python 安装失败

如果 Python 安装失败，请：
1. 手动下载 Python 3.11.8 安装程序
2. 运行安装程序，确保：
   - 勾选 "Add Python to PATH"
   - 选择 "Install for all users"
   - 使用默认安装路径

### 2. 依赖安装失败

如果依赖安装失败，请：
1. 确保网络连接正常
2. 尝试使用国内镜像源：
   ```powershell
   pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
   ```

### 3. 数据库连接失败

如果数据库连接失败，请：
1. 确认 PostgreSQL 服务正在运行
2. 验证数据库连接信息是否正确
3. 检查防火墙设置

### 4. 端口占用

如果端口被占用，请：
1. 查找占用端口的进程：
   ```powershell
   netstat -ano | findstr :8088
   netstat -ano | findstr :3000
   ```
2. 终止相关进程或修改服务端口

## 维护说明

### 1. 更新依赖

```powershell
# 更新 Python 依赖
pip install -r requirements.txt --upgrade

# 更新前端依赖
cd frontend
npm update
```

### 2. 备份数据

1. 备份数据库：
   ```powershell
   pg_dump -U postgres marine_engineering > backup.sql
   ```

2. 备份配置文件：
   - 保存 `.env` 文件
   - 保存数据库迁移文件

### 3. 日志管理

1. 后端日志：
   - 位置：`logs/backend.log`
   - 定期清理或归档

2. 前端日志：
   - 位置：`frontend/logs/`
   - 定期清理或归档

## 安全建议

1. 定期更新系统和依赖
2. 使用强密码
3. 限制数据库访问
4. 配置防火墙规则
5. 启用 HTTPS
6. 定期备份数据

## 联系支持

如遇到问题，请：
1. 查看项目文档
2. 提交 Issue
3. 联系技术支持团队 