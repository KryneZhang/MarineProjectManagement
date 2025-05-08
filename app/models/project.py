from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    code = Column(String, unique=True, index=True)
    description = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    status = Column(String)  # 规划中、进行中、已完成、已暂停
    budget = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 关联
    tasks = relationship("Task", back_populates="project")
    resources = relationship("Resource", back_populates="project")
    documents = relationship("Document", back_populates="project")

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    name = Column(String)
    wbs_code = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    duration = Column(Integer)  # 以天为单位
    progress = Column(Float)  # 0-100
    status = Column(String)
    parent_task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)

    # 关联
    project = relationship("Project", back_populates="tasks")
    resources = relationship("Resource", back_populates="task")

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    task_id = Column(Integer, ForeignKey("tasks.id"))
    name = Column(String)
    type = Column(String)  # 人力、设备、材料
    quantity = Column(Float)
    unit = Column(String)
    cost = Column(Float)

    # 关联
    project = relationship("Project", back_populates="resources")
    task = relationship("Task", back_populates="resources")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    name = Column(String)
    type = Column(String)  # 技术文档、合同文档、图纸等
    file_path = Column(String)
    version = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # 关联
    project = relationship("Project", back_populates="documents") 