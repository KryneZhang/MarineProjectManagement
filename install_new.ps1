# 设置执行策略
Set-ExecutionPolicy Bypass -Scope Process -Force

Write-Host "开始安装海洋工程项目全生命周期管理系统..." -ForegroundColor Green

# 检查当前目录
$currentDir = Get-Location
Write-Host "当前工作目录: $currentDir" -ForegroundColor Yellow

# 检查 ThirdParty 目录
$thirdPartyDir = Join-Path $currentDir "ThirdParty"
if (-not (Test-Path $thirdPartyDir)) {
    Write-Host "创建 ThirdParty 目录..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $thirdPartyDir | Out-Null
}

# Python 版本配置
$pythonVersion = "3.11.8"
$pythonUrl = "https://www.python.org/ftp/python/$pythonVersion/python-$pythonVersion-amd64.exe"
$pythonMirror = "https://mirrors.huaweicloud.com/python/$pythonVersion/python-$pythonVersion-amd64.exe"

# 设置 Python 安装路径
$defaultPythonPath = "C:\Python\Python311"
Write-Host "请选择 Python 安装路径：" -ForegroundColor Yellow
Write-Host "1. 默认路径 ($defaultPythonPath)" -ForegroundColor Cyan
Write-Host "2. 自定义路径" -ForegroundColor Cyan
$pathChoice = Read-Host "请输入选择 (1/2)"

$pythonInstallPath = if ($pathChoice -eq "2") {
    $customPath = Read-Host "请输入自定义安装路径"
    if (-not $customPath) {
        Write-Host "使用默认路径" -ForegroundColor Yellow
        $defaultPythonPath
    } else {
        $customPath
    }
} else {
    $defaultPythonPath
}

# 添加 Python 路径到系统环境变量
function Add-ToSystemPath {
    param (
        [string]$Path
    )
    
    $currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    if (-not $currentPath.Contains($Path)) {
        [Environment]::SetEnvironmentVariable("Path", $currentPath + ";" + $Path, "Machine")
        Write-Host "已添加路径到系统环境变量: $Path" -ForegroundColor Green
    }
}

# 检查并安装 Python 3.11.8
Write-Host "正在检查 Python $pythonVersion..." -ForegroundColor Yellow
try {
    # 检查 Python 是否已安装
    $pythonInstalled = $false
    $pythonPath = $null
    
    # 方法1：检查 python 命令
    $pythonVersion = python --version 2>&1
    if ($pythonVersion -match "Python 3\.11\.8") {
        $pythonInstalled = $true
        $pythonPath = (Get-Command python).Path
        Write-Host "检测到 Python 3.11.8 已安装: $pythonPath" -ForegroundColor Green
    }
    
    # 方法2：检查默认安装路径
    if (-not $pythonInstalled) {
        $defaultPath = Join-Path $defaultPythonPath "python.exe"
        if (Test-Path $defaultPath) {
            $version = & $defaultPath --version 2>&1
            if ($version -match "Python 3\.11\.8") {
                $pythonInstalled = $true
                $pythonPath = $defaultPath
                Write-Host "检测到 Python 3.11.8 已安装在默认路径: $pythonPath" -ForegroundColor Green
            }
        }
    }
    
    # 如果 Python 已安装，跳过安装步骤
    if ($pythonInstalled) {
        Write-Host "Python 3.11.8 已安装，跳过安装步骤" -ForegroundColor Green
        $env:PYTHON_CMD = $pythonPath
        
        # 确保 Python 路径在系统 PATH 中
        $pythonDir = Split-Path $pythonPath
        Add-ToSystemPath $pythonDir
        
        # 确保 Scripts 目录在系统 PATH 中
        $scriptsDir = Join-Path $pythonDir "Scripts"
        if (Test-Path $scriptsDir) {
            Add-ToSystemPath $scriptsDir
        }
    } else {
        Write-Host "未检测到 Python 3.11.8，开始安装..." -ForegroundColor Yellow
        
        # 检查是否安装了其他版本的 Python
        $otherPythonVersions = Get-Command python -ErrorAction SilentlyContinue | Where-Object { $_.Version -notmatch "3\.11\.8" }
        if ($otherPythonVersions) {
            Write-Host "检测到其他版本的 Python，将同时保留这些版本..." -ForegroundColor Yellow
            Write-Host "已安装的 Python 版本：" -ForegroundColor Yellow
            $otherPythonVersions | ForEach-Object { Write-Host "  - $($_.Version)" -ForegroundColor Yellow }
        }
        
        # 下载官方安装程序
        $installerPath = "$env:TEMP\python-$pythonVersion-amd64.exe"
        
        Write-Host "正在下载 Python $pythonVersion..." -ForegroundColor Yellow
        try {
            Invoke-WebRequest -Uri $pythonUrl -OutFile $installerPath
        }
        catch {
            Write-Host "下载失败，尝试使用备用下载源..." -ForegroundColor Yellow
            Invoke-WebRequest -Uri $pythonMirror -OutFile $installerPath
        }
        
        # 安装 Python，使用自定义安装选项
        Write-Host "正在安装 Python $pythonVersion 到 $pythonInstallPath..." -ForegroundColor Yellow
        Start-Process -FilePath $installerPath -ArgumentList "/quiet", "InstallAllUsers=1", "PrependPath=1", "Include_test=0", "Shortcuts=0", "AssociateFiles=0", "TargetDir=$pythonInstallPath" -Wait
        
        # 清理安装文件
        Remove-Item $installerPath -Force
        
        # 刷新环境变量
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        # 验证安装
        $installedVersion = python --version 2>&1
        if ($installedVersion -notmatch "Python 3\.11\.8") {
            # 检查默认安装路径
            $defaultPath = Join-Path $pythonInstallPath "python.exe"
            if (Test-Path $defaultPath) {
                $version = & $defaultPath --version 2>&1
                if ($version -match "Python 3\.11\.8") {
                    $env:PYTHON_CMD = $defaultPath
                    Write-Host "使用安装路径中的 Python: $defaultPath" -ForegroundColor Green
                    
                    # 确保 Python 路径在系统 PATH 中
                    Add-ToSystemPath $pythonInstallPath
                    
                    # 确保 Scripts 目录在系统 PATH 中
                    $scriptsDir = Join-Path $pythonInstallPath "Scripts"
                    if (Test-Path $scriptsDir) {
                        Add-ToSystemPath $scriptsDir
                    }
                } else {
                    throw "Python 3.11.8 安装验证失败，请手动安装 Python $pythonVersion"
                }
            } else {
                throw "Python 3.11.8 安装验证失败，请手动安装 Python $pythonVersion"
            }
        } else {
            $env:PYTHON_CMD = (Get-Command python).Path
            
            # 确保 Python 路径在系统 PATH 中
            $pythonDir = Split-Path $env:PYTHON_CMD
            Add-ToSystemPath $pythonDir
            
            # 确保 Scripts 目录在系统 PATH 中
            $scriptsDir = Join-Path $pythonDir "Scripts"
            if (Test-Path $scriptsDir) {
                Add-ToSystemPath $scriptsDir
            }
        }
    }
    
    # 刷新环境变量
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    # 安装 pip 工具
    Write-Host "正在安装/更新 pip..." -ForegroundColor Yellow
    try {
        # 下载 get-pip.py
        $pipUrl = "https://bootstrap.pypa.io/get-pip.py"
        $pipScript = "$env:TEMP\get-pip.py"
        Invoke-WebRequest -Uri $pipUrl -OutFile $pipScript
        
        # 使用 Python 安装 pip
        if ($env:PYTHON_CMD) {
            & $env:PYTHON_CMD $pipScript
            if ($LASTEXITCODE -ne 0) {
                throw "pip 安装失败"
            }
            
            # 验证 pip 安装
            $pipPath = Join-Path (Split-Path $env:PYTHON_CMD) "Scripts\pip.exe"
            if (Test-Path $pipPath) {
                Write-Host "pip 安装成功: $pipPath" -ForegroundColor Green
            } else {
                throw "pip 安装验证失败"
            }
        } else {
            throw "Python 命令未找到"
        }
        
        # 清理临时文件
        Remove-Item $pipScript -Force
    }
    catch {
        Write-Host "pip 安装失败: $_" -ForegroundColor Red
        Write-Host "尝试使用 ensurepip 安装..." -ForegroundColor Yellow
        
        # 使用 ensurepip 安装
        if ($env:PYTHON_CMD) {
            & $env:PYTHON_CMD -m ensurepip --upgrade
            if ($LASTEXITCODE -ne 0) {
                throw "ensurepip 安装失败"
            }
            
            # 升级 pip
            & $env:PYTHON_CMD -m pip install --upgrade pip
            if ($LASTEXITCODE -ne 0) {
                throw "pip 升级失败"
            }
        } else {
            throw "Python 命令未找到"
        }
    }
    
    # 最终验证 pip
    $pipVersion = pip --version 2>&1
    if (-not $pipVersion) {
        throw "pip 安装验证失败"
    }
    Write-Host "pip 安装成功: $pipVersion" -ForegroundColor Green
}
catch {
    Write-Host "Python 安装失败: $_" -ForegroundColor Red
    Write-Host "请访问 https://www.python.org/downloads/release/python-3118/ 手动下载并安装 Python $pythonVersion" -ForegroundColor Yellow
    Write-Host "安装时请确保：`n1. 勾选 'Add Python to PATH'`n2. 选择 'Install for all users'" -ForegroundColor Yellow
    Write-Host "3. 安装路径设置为: $pythonInstallPath" -ForegroundColor Yellow
    exit 1
}

# 创建并配置虚拟环境
Write-Host "正在配置虚拟环境..." -ForegroundColor Yellow
try {
    # 检查是否已存在虚拟环境
    if (Test-Path "venv") {
        Write-Host "检测到已存在的虚拟环境，正在删除..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force venv
    }
    
    # 创建新的虚拟环境
    Write-Host "正在创建虚拟环境..." -ForegroundColor Yellow
    if ($env:PYTHON_CMD) {
        & $env:PYTHON_CMD -m venv venv
    } else {
        python -m venv venv
    }
    if ($LASTEXITCODE -ne 0) { throw "虚拟环境创建失败" }
    
    # 激活虚拟环境
    Write-Host "正在激活虚拟环境..." -ForegroundColor Yellow
    .\venv\Scripts\Activate.ps1
    if ($LASTEXITCODE -ne 0) { throw "虚拟环境激活失败" }
    
    # 验证虚拟环境
    $pythonPath = (Get-Command python).Path
    if (-not $pythonPath.Contains("venv")) {
        throw "虚拟环境激活验证失败"
    }
    
    # 升级 pip
    Write-Host "正在升级 pip..." -ForegroundColor Yellow
    python -m pip install --upgrade pip
    if ($LASTEXITCODE -ne 0) { throw "pip 升级失败" }
    
    # 安装虚拟环境工具
    Write-Host "正在安装虚拟环境工具..." -ForegroundColor Yellow
    pip install virtualenv
    if ($LASTEXITCODE -ne 0) { throw "virtualenv 安装失败" }
    
    Write-Host "虚拟环境配置完成" -ForegroundColor Green
}
catch {
    Write-Host "虚拟环境配置失败: $_" -ForegroundColor Red
    exit 1
}

# 检查并安装 Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "正在安装 Node.js..." -ForegroundColor Yellow
    try {
        winget install OpenJS.NodeJS.LTS
        if ($LASTEXITCODE -ne 0) { throw "Node.js 安装失败" }
    }
    catch {
        Write-Host "Node.js 安装失败: $_" -ForegroundColor Red
        exit 1
    }
}

# 安装 PostgreSQL
Write-Host "正在安装 PostgreSQL..." -ForegroundColor Yellow
$postgresInstaller = Join-Path $thirdPartyDir "postgresql-installer.exe"
if (Test-Path $postgresInstaller) {
    Start-Process -FilePath $postgresInstaller -ArgumentList "--unattendedmodeui minimal", "--mode unattended", "--superpassword postgres" -Wait
} else {
    Write-Host "PostgreSQL 安装程序未找到，请确保 postgresql-installer.exe 位于 ThirdParty 目录中" -ForegroundColor Red
    exit 1
}

# 安装 Rust
Write-Host "正在安装 Rust..." -ForegroundColor Yellow
$rustInstaller = Join-Path $thirdPartyDir "rustup-init.exe"
if (Test-Path $rustInstaller) {
    Start-Process -FilePath $rustInstaller -ArgumentList "-y" -Wait
} else {
    Write-Host "Rust 安装程序未找到，请确保 rustup-init.exe 位于 ThirdParty 目录中" -ForegroundColor Red
    exit 1
}

# 安装 Visual Studio Build Tools
Write-Host "正在安装 Visual Studio Build Tools..." -ForegroundColor Yellow
$vsBuildTools = Join-Path $thirdPartyDir "vs_buildtools.exe"
if (Test-Path $vsBuildTools) {
    Start-Process -FilePath $vsBuildTools -ArgumentList "--quiet", "--wait", "--norestart", "--nocache", "--installPath", "C:\BuildTools", "--add", "Microsoft.VisualStudio.Workload.VCTools", "--includeRecommended" -Wait
} else {
    Write-Host "Visual Studio Build Tools 安装程序未找到，请确保 vs_buildtools.exe 位于 ThirdParty 目录中" -ForegroundColor Red
    exit 1
}

# 刷新环境变量
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# 检查 requirements.txt 文件
if (-not (Test-Path "requirements.txt")) {
    Write-Host "错误: 未找到 requirements.txt 文件" -ForegroundColor Red
    exit 1
}

# 安装后端依赖
Write-Host "正在安装后端依赖..." -ForegroundColor Yellow
try {
    # 首先安装基础依赖
    Write-Host "正在安装基础依赖..." -ForegroundColor Yellow
    pip install wheel setuptools
    if ($LASTEXITCODE -ne 0) { throw "基础工具安装失败" }
    
    # 安装所有依赖
    Write-Host "正在安装项目依赖..." -ForegroundColor Yellow
    pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) { throw "项目依赖安装失败" }
    
    # 单独安装 psycopg2-binary
    Write-Host "正在安装 psycopg2-binary..." -ForegroundColor Yellow
    pip install --only-binary :all: psycopg2-binary==2.9.10
    if ($LASTEXITCODE -ne 0) { throw "psycopg2-binary 安装失败" }
    
    # 验证关键依赖
    Write-Host "正在验证依赖安装..." -ForegroundColor Yellow
    $requiredModules = @(
        "typing_extensions",
        "sqlalchemy",
        "alembic",
        "psycopg2",
        "greenlet",
        "mako"
    )
    
    foreach ($module in $requiredModules) {
        python -c "import $module" 2>&1
        if ($LASTEXITCODE -ne 0) {
            throw "模块 $module 安装验证失败"
        }
        Write-Host "模块 $module 验证成功" -ForegroundColor Green
    }
}
catch {
    Write-Host "后端依赖安装失败: $_" -ForegroundColor Red
    exit 1
}

# 检查 frontend 目录
if (-not (Test-Path "frontend")) {
    Write-Host "错误: 未找到 frontend 目录" -ForegroundColor Red
    exit 1
}

# 检查 npm 是否可用
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "错误: npm 命令不可用，请确保 Node.js 已正确安装" -ForegroundColor Red
    exit 1
}

# 安装前端依赖
Write-Host "正在安装前端依赖..." -ForegroundColor Yellow
try {
    # 保存当前目录
    $originalDir = Get-Location
    
    # 进入前端目录
    Set-Location frontend
    
    # 检查 package.json
    if (-not (Test-Path "package.json")) { 
        throw "未找到 package.json 文件" 
    }
    
    # 清除现有的 node_modules
    if (Test-Path "node_modules") {
        Write-Host "清除现有的 node_modules..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force node_modules
    }
    
    # 清除 package-lock.json
    if (Test-Path "package-lock.json") { 
        Remove-Item package-lock.json 
    }
    
    # 安装依赖
    Write-Host "安装 npm 依赖..." -ForegroundColor Yellow
    npm install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { 
        throw "npm install 失败" 
    }
    
    Write-Host "安装 @ant-design/plots..." -ForegroundColor Yellow
    npm install @ant-design/plots --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { 
        throw "@ant-design/plots 安装失败" 
    }
    
    # 返回原始目录
    Set-Location $originalDir
}
catch {
    Write-Host "前端依赖安装失败: $_" -ForegroundColor Red
    if ($originalDir) { 
        Set-Location $originalDir 
    }
    exit 1
}

# 检查 alembic 配置
if (-not (Test-Path "alembic.ini")) {
    Write-Host "错误: 未找到 alembic.ini 文件" -ForegroundColor Red
    exit 1
}

# 初始化数据库
Write-Host "正在初始化数据库..." -ForegroundColor Yellow
try {
    alembic upgrade head
    if ($LASTEXITCODE -ne 0) { 
        throw "数据库初始化失败" 
    }
}
catch {
    Write-Host "数据库初始化失败: $_" -ForegroundColor Red
    exit 1
}

Write-Host "安装完成！" -ForegroundColor Green
Write-Host "
启动说明：
1. 启动后端服务：uvicorn app.main:app --reload --port 8088
2. 启动前端服务：cd frontend && npm start
" -ForegroundColor Cyan 
