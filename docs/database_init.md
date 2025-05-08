# 数据库初始化指南

## 数据库配置

### 1. 数据库信息
- 数据库名称：`marine_engineering`
- 默认用户：`postgres`
- 默认密码：`postgres`
- 默认端口：`5432`
- 字符集：`UTF8`
- 排序规则：`Chinese (Simplified)_China.936`

### 2. 系统表结构

#### 主要表
1. `users` - 用户表
   - 用户账号和认证信息
   - 包含角色管理
   - 支持账号状态管理

2. `projects` - 项目表
   - 项目基本信息
   - 项目状态跟踪
   - 项目时间管理

3. `tasks` - 任务表
   - 任务详细信息
   - 任务分配和跟踪
   - 任务优先级管理

4. `documents` - 文档表
   - 文档元数据
   - 文件版本控制
   - 文件类型管理

5. `comments` - 评论表
   - 任务评论
   - 文档评论
   - 评论追踪

#### 辅助表
- `alembic_version` - 数据库版本控制表

### 3. 初始数据

#### 默认用户账号
1. 管理员账号
   ```
   用户名: admin
   邮箱: admin@example.com
   密码: admin123
   角色: admin
   ```

2. 测试用户账号
   ```
   用户名: test_user
   邮箱: test@example.com
   密码: test123
   角色: user
   ```

### 4. 数据库初始化步骤

1. 创建数据库
   ```sql
   CREATE DATABASE marine_engineering
   WITH 
     ENCODING = 'UTF8'
     LC_COLLATE = 'Chinese (Simplified)_China.936'
     LC_CTYPE = 'Chinese (Simplified)_China.936';
   ```

2. 安装必要的扩展
   ```sql
   -- 连接到新创建的数据库
   \c marine_engineering

   -- 创建必要的扩展
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

3. 运行数据库迁移
   ```powershell
   # 激活虚拟环境
   .\venv\Scripts\Activate.ps1

   # 运行迁移
   python -m alembic upgrade head
   ```

4. 初始化基础数据
   ```powershell
   # 运行初始化脚本
   python init_data.py
   ```

### 5. 数据库维护

#### 备份
1. 完整备份
   ```powershell
   pg_dump -U postgres marine_engineering > backup_full.sql
   ```

2. 仅数据备份
   ```powershell
   pg_dump -U postgres --data-only marine_engineering > backup_data.sql
   ```

#### 恢复
1. 完整恢复
   ```powershell
   psql -U postgres marine_engineering < backup_full.sql
   ```

2. 仅数据恢复
   ```powershell
   psql -U postgres marine_engineering < backup_data.sql
   ```

### 6. 常见问题处理

1. 数据库连接问题
   - 检查 PostgreSQL 服务状态
   - 验证连接字符串
   - 确认防火墙设置

2. 迁移失败
   - 检查 alembic 版本历史
   - 验证数据库权限
   - 查看详细错误日志

3. 数据初始化失败
   - 检查数据是否已存在
   - 验证外键约束
   - 确认数据完整性

### 7. 安全建议

1. 密码管理
   - 定期更改数据库密码
   - 使用强密码策略
   - 避免共享账号

2. 访问控制
   - 限制数据库远程访问
   - 实施最小权限原则
   - 定期审计访问日志

3. 数据保护
   - 定期备份数据
   - 加密敏感信息
   - 监控异常访问 