from datetime import datetime, date
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from app.models import Base, User, Project, Task, Document, Comment

# 数据库连接
DATABASE_URL = "postgresql://postgres:postgres@localhost/marine_engineering"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 密码加密
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_db():
    db = SessionLocal()
    try:
        # 创建管理员用户
        admin_user = User(
            username="admin",
            email="admin@example.com",
            hashed_password=pwd_context.hash("admin123"),
            is_active=True,
            role="admin",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.add(admin_user)
        db.flush()  # 获取admin_user的ID

        # 创建测试用户
        test_user = User(
            username="test_user",
            email="test@example.com",
            hashed_password=pwd_context.hash("test123"),
            is_active=True,
            role="user",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        db.add(test_user)
        db.flush()

        # 创建测试项目
        test_project = Project(
            name="船舶设计项目",
            description="这是一个测试项目，用于系统功能验证",
            start_date=date.today(),
            status="进行中",
            created_at=datetime.now(),
            updated_at=datetime.now(),
            created_by=admin_user.id
        )
        db.add(test_project)
        db.flush()

        # 创建测试任务
        test_task = Task(
            project_id=test_project.id,
            title="完成系统测试",
            description="测试所有系统功能，确保正常运行",
            status="待处理",
            priority="高",
            due_date=date.today(),
            assigned_to=test_user.id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
            created_by=admin_user.id
        )
        db.add(test_task)
        db.flush()

        # 创建测试文档
        test_document = Document(
            project_id=test_project.id,
            title="系统测试报告",
            file_path="/documents/test_report.pdf",
            file_type="pdf",
            version="1.0",
            created_at=datetime.now(),
            updated_at=datetime.now(),
            created_by=admin_user.id
        )
        db.add(test_document)
        db.flush()

        # 创建测试评论
        test_comment = Comment(
            content="系统运行正常，可以进行下一步测试",
            task_id=test_task.id,
            document_id=None,  # 确保只关联到任务
            created_at=datetime.now(),
            updated_at=datetime.now(),
            created_by=test_user.id
        )
        db.add(test_comment)

        db.commit()
        print("初始数据创建成功！")
        print("\n管理员账号信息：")
        print("用户名: admin")
        print("密码: admin123")
        print("\n测试用户账号信息：")
        print("用户名: test_user")
        print("密码: test123")

    except Exception as e:
        db.rollback()
        print(f"初始化数据失败: {str(e)}")
    finally:
        db.close()

if __name__ == "__main__":
    init_db() 