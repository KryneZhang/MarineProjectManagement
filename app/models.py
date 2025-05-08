from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Date, ForeignKey, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    role = Column(String(20), nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)

    # 关系
    created_projects = relationship("Project", back_populates="creator")
    created_tasks = relationship("Task", foreign_keys="Task.created_by", back_populates="creator")
    assigned_tasks = relationship("Task", foreign_keys="Task.assigned_to", back_populates="assignee")
    created_documents = relationship("Document", back_populates="creator")
    created_comments = relationship("Comment", back_populates="creator")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    status = Column(String(20), nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    # 关系
    creator = relationship("User", back_populates="created_projects")
    tasks = relationship("Task", back_populates="project")
    documents = relationship("Document", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    status = Column(String(20), nullable=False)
    priority = Column(String(20), nullable=False)
    due_date = Column(Date)
    assigned_to = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    # 关系
    project = relationship("Project", back_populates="tasks")
    creator = relationship("User", foreign_keys=[created_by], back_populates="created_tasks")
    assignee = relationship("User", foreign_keys=[assigned_to], back_populates="assigned_tasks")
    comments = relationship("Comment", back_populates="task")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    title = Column(String(200), nullable=False)
    file_path = Column(String(500), nullable=False)
    file_type = Column(String(50), nullable=False)
    version = Column(String(20), nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    # 关系
    project = relationship("Project", back_populates="documents")
    creator = relationship("User", back_populates="created_documents")
    comments = relationship("Comment", back_populates="document")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    task_id = Column(Integer, ForeignKey("tasks.id"))
    document_id = Column(Integer, ForeignKey("documents.id"))
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    created_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    # 关系
    task = relationship("Task", back_populates="comments")
    document = relationship("Document", back_populates="comments")
    creator = relationship("User", back_populates="created_comments")

    # 确保评论要么关联到任务，要么关联到文档，但不能同时关联到两者
    __table_args__ = (
        CheckConstraint(
            '(task_id IS NOT NULL AND document_id IS NULL) OR (task_id IS NULL AND document_id IS NOT NULL)',
            name='check_comment_reference'
        ),
    ) 