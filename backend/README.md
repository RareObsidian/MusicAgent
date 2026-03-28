# 🎹 钢琴助手后端服务

基于 NestJS + TypeScript 构建的钢琴学习辅助应用后端，支持 MySQL 和 MongoDB 双数据库。

## 🏗️ 技术栈

- **框架**: NestJS 10.x
- **语言**: TypeScript
- **关系数据库**: MySQL 8.0 (用户、练习记录)
- **文档数据库**: MongoDB 6.0 (乐理知识)
- **ORM**: TypeORM (MySQL) + Mongoose (MongoDB)
- **认证**: JWT + Passport
- **API文档**: Swagger/OpenAPI

## 📁 项目结构

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/              # 认证模块
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   ├── strategies/
│   │   │   └── dto/
│   │   ├── user/              # 用户模块 (MySQL)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   ├── practice/          # 练习记录模块 (MySQL)
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── entities/
│   │   │   └── dto/
│   │   └── music/             # 乐理模块 (MongoDB)
│   │       ├── controllers/
│   │       ├── services/
│   │       ├── schemas/
│   │       └── dto/
│   ├── app.module.ts
│   └── main.ts
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接信息
```

### 3. 启动数据库（Docker）

```bash
docker-compose up -d mysql mongodb
```

### 4. 运行开发服务器

```bash
npm run start:dev
```

服务启动后：
- API 地址: http://localhost:3000/api/v1
- 文档地址: http://localhost:3000/api/docs

## 📡 API 接口

### 认证
- `POST /api/v1/auth/register` - 注册
- `POST /api/v1/auth/login` - 登录

### 用户
- `GET /api/v1/users/profile` - 获取当前用户信息
- `PATCH /api/v1/users/:id` - 更新用户信息

### 练习记录
- `POST /api/v1/practice/start` - 开始练习
- `POST /api/v1/practice/:id/pause` - 暂停练习
- `POST /api/v1/practice/:id/resume` - 恢复练习
- `POST /api/v1/practice/:id/end` - 结束练习
- `GET /api/v1/practice` - 获取练习记录列表
- `GET /api/v1/practice/stats` - 获取统计数据

### 乐理知识
- `GET /api/v1/music/scales` - 获取所有音阶
- `GET /api/v1/music/scales/:key?mode=major` - 获取指定音阶
- `POST /api/v1/music/seed` - 初始化音阶数据

## 🐳 Docker 部署

```bash
# 构建并启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f backend

# 停止服务
docker-compose down
```

## 📝 数据库设计

### MySQL (关系型数据)

**users 表**
- id, email, phone, password, nickname, avatar, preferences, created_at

**practice_records 表**
- id, user_id, type, piece_name, start_time, end_time, duration_seconds, status, notes, focus_rating

### MongoDB (文档型数据)

**scales 集合**
- key, mode, notes, intervals, description, keySignature, difficulty

## 🔐 认证说明

使用 JWT Bearer Token 认证：

```
Authorization: Bearer <token>
```

## 🎯 开发计划

- [x] 用户认证模块
- [x] 练习记录 CRUD
- [x] 音阶数据管理
- [ ] 和弦库
- [ ] 乐理文章
- [ ] 音频文件存储
- [ ] 统计报表
- [ ] 社交功能
