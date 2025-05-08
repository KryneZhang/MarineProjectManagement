from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import projects, tasks

app = FastAPI(
    title="海洋工程项目管理系统",
    description="基于Primavera架构的海洋工程项目全生命周期管理系统",
    version="1.0.0"
)

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(projects.router)
app.include_router(tasks.router)

@app.get("/")
async def root():
    return {"message": "欢迎使用海洋工程项目管理系统"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8088) 