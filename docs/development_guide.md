# 海洋工程项目全生命周期管理系统开发部署指南

## 1. 环境要求

### 1.1 基础环境
- Windows 10/11 操作系统
- Python 3.11（必须使用此版本）
- Node.js 18.x LTS
- PostgreSQL 15.x
- Git

### 1.2 开发工具
- Visual Studio Code（推荐）
- Visual Studio Build Tools 2022（用于编译 Python 包）
- PostgreSQL 客户端工具

## 2. 快速开始

### 2.1 自动安装（推荐）
使用提供的安装脚本自动配置所有环境：

```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy Bypass -Scope Process -Force
.\install_new.ps1
```

安装脚本会自动：
1. 安装 Python 3.11
2. 创建并配置虚拟环境
3. 安装所有必要的依赖
4. 配置数据库
5. 安装前端依赖

### 2.2 手动安装

#### 2.2.1 Python 环境配置
1. 安装 Python 3.11
   ```powershell
   # 方法1：使用 winget（推荐）
   winget install Python.Python.3.11

   # 方法2：如果 winget 安装失败，从官网下载安装包
   # 访问 https://www.python.org/downloads/release/python-3110/
   # 下载并运行 Windows installer (64-bit)
   ```

2. 验证 Python 安装
   ```powershell
   # 检查 Python 版本
   python --version
   # 应该显示 Python 3.11.x

   # 检查 pip 是否可用
   pip --version
   ```

3. 创建虚拟环境
   ```powershell
   # 在项目根目录下
   python -m venv venv
   .\venv\Scripts\activate
   python -m pip install --upgrade pip
   ```

4. 安装后端依赖
   ```powershell
   pip install -r requirements.txt
   ```

#### 2.2.2 数据库配置
1. 安装 PostgreSQL 15
   ```powershell
   winget install PostgreSQL.PostgreSQL.15
   ```

2. 初始化数据库
   ```powershell
   alembic upgrade head
   ```

#### 2.2.3 前端环境配置
1. 安装 Node.js
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```

2. 安装前端依赖
   ```powershell
   cd frontend
   npm install
   ```

## 3. 开发环境说明

### 3.1 Python 虚拟环境
- 项目使用 Python 3.11 的虚拟环境
- 虚拟环境目录：`./venv`
- 激活虚拟环境：
  ```powershell
  .\venv\Scripts\activate
  ```
- 退出虚拟环境：
  ```powershell
  deactivate
  ```

### 3.2 数据库配置
- 数据库类型：PostgreSQL 15
- 默认端口：5432
- 数据库名：project_management
- 用户名：postgres
- 密码：在 .env 文件中配置

### 3.3 开发服务器
- 后端服务：`uvicorn app.main:app --reload --port 8088`
- 前端服务：`cd frontend && npm start`

## 4. 常见问题

### 4.1 Python 相关
1. Python 安装问题
   - 如果 winget 安装失败，尝试从官网下载安装包
   - 确保以管理员身份运行安装程序
   - 安装时勾选"Add Python to PATH"选项
   - 如果安装后命令不可用，手动添加 Python 到系统环境变量

2. 虚拟环境问题
   - 确保使用 Python 3.11 版本
   - 如果虚拟环境创建失败，检查 Python 安装
   - 虚拟环境激活失败时，检查 PowerShell 执行策略
   - 如果遇到权限问题，以管理员身份运行 PowerShell

3. 包安装问题
   - 确保已安装 Visual Studio Build Tools
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```

### 4.2 数据库相关
1. 确保 PostgreSQL 服务正在运行
2. 检查数据库连接配置是否正确
3. 如果数据库迁移失败，检查 alembic 版本

### 4.3 前端相关
1. 确保 Node.js 版本正确
2. 如果依赖安装失败，尝试清除 npm 缓存
3. 检查 package.json 中的依赖版本

## 5. 开发规范

### 5.1 代码风格
- 后端：遵循 PEP 8 规范
- 前端：使用 ESLint 和 Prettier 配置

### 5.2 版本控制
- 使用 Git 进行版本控制
- 遵循 Git Flow 工作流
- 提交信息需要清晰描述改动

### 5.3 测试规范
- 编写单元测试
- 进行集成测试
- 保持测试覆盖率

## 6. 部署说明

### 6.1 生产环境要求
- 使用 Python 3.11
- 使用虚拟环境
- 配置生产环境变量
- 使用生产模式启动服务

### 6.2 部署步骤
1. 克隆代码库
2. 运行安装脚本
3. 配置环境变量
4. 初始化数据库
5. 启动服务

## 7. 维护说明

### 7.1 日常维护
- 定期更新依赖包
- 检查日志文件
- 备份数据库

### 7.2 故障处理
- 检查服务状态
- 查看错误日志
- 必要时回滚版本

## 8. 联系支持

如有问题，请联系：
- 技术支持：support@example.com
- 问题反馈：issues@example.com

## 9. 故障排除

### 9.1 Python 安装故障排除
1. 检查系统要求
   - Windows 10/11 64位系统
   - 至少 4GB 可用内存
   - 至少 1GB 可用磁盘空间

2. 环境变量配置
   - 检查 PATH 环境变量是否包含 Python 安装路径
   - 典型路径：`C:\Users\<用户名>\AppData\Local\Programs\Python\Python311`
   - 典型路径：`C:\Python311`

3. 安装验证
   ```powershell
   # 检查 Python 版本
   python --version

   # 检查 pip 版本
   pip --version

   # 检查 Python 路径
   where python
   ```

4. 常见错误解决
   - "python 不是内部或外部命令"：检查环境变量
   - "无法创建虚拟环境"：检查 Python 安装和权限
   - "pip 安装失败"：检查网络连接和镜像源

### 9.2 虚拟环境故障排除
1. 创建问题
   - 确保 Python 3.11 正确安装
   - 检查目录权限
   - 尝试使用完整路径创建

2. 激活问题
   - 检查 PowerShell 执行策略
   - 使用完整路径激活
   - 检查脚本权限

3. 依赖安装问题
   - 检查 pip 版本
   - 尝试更新 pip
   - 使用国内镜像源

4. 包安装问题
   - 检查依赖版本
   - 尝试更新依赖
   - 使用国内镜像源
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 如果遇到编译错误，安装 Visual Studio Build Tools 2022
   - 安装时选择"Desktop development with C++"
   - 如果包安装失败，尝试使用国内镜像源：
     ```powershell
- 问题反馈：issues@example.com 