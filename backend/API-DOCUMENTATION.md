# 🎹 钢琴助手前端对接文档

## 📋 目录

1. [快速开始](#快速开始)
2. [API 基础信息](#api-基础信息)
3. [认证机制](#认证机制)
4. [接口列表](#接口列表)
5. [前端示例代码](#前端示例代码)
6. [错误处理](#错误处理)
7. [数据类型定义](#数据类型定义)

---

## 快速开始

### 基础配置

```javascript
// api/config.js
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000/api/v1',
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
  }
};

export default API_CONFIG;
```

### 安装依赖

```bash
# 如果使用 axios
npm install axios

# 如果使用原生 fetch，无需安装
```

---

## API 基础信息

| 项目 | 说明 |
|------|------|
| **基础地址** | `http://localhost:3000/api/v1` |
| **协议** | HTTP/REST |
| **数据格式** | JSON |
| **字符编码** | UTF-8 |
| **认证方式** | Bearer Token (JWT) |

---

## 认证机制

### JWT Token 说明

- 登录/注册成功后，服务端返回 `access_token`
- 后续请求需要在 Header 中携带：`Authorization: Bearer <token>`
- Token 有效期：7天

### Token 存储建议

```javascript
// 使用 localStorage 存储
localStorage.setItem('token', response.access_token);

// 获取 Token
const token = localStorage.getItem('token');
```

---

## 接口列表

### 1️⃣ 认证接口

#### 用户注册

```http
POST /auth/register
```

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | 是 | 邮箱地址 |
| password | string | 是 | 密码（至少6位） |
| nickname | string | 否 | 昵称 |

**请求示例：**

```javascript
const response = await fetch('http://localhost:3000/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: '123456',
    nickname: '钢琴爱好者'
  })
});

const data = await response.json();
```

**响应示例：**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "237e92ee-de11-45a2-a7f1-415ad8b3c7a1",
    "email": "user@example.com",
    "nickname": "钢琴爱好者",
    "avatar": null,
    "preferences": {
      "dailyGoalMinutes": 60,
      "theme": "light",
      "notifications": true
    }
  }
}
```

---

#### 用户登录

```http
POST /auth/login
```

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | 是* | 邮箱地址 |
| phone | string | 是* | 手机号 |
| password | string | 是 | 密码 |

> *email 和 phone 二选一

**请求示例：**

```javascript
const response = await fetch('http://localhost:3000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: '123456'
  })
});
```

**响应示例：** 同注册接口

---

### 2️⃣ 用户接口

#### 获取当前用户信息

```http
GET /users/profile
Authorization: Bearer <token>
```

**请求示例：**

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3000/api/v1/users/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const user = await response.json();
```

**响应示例：**

```json
{
  "id": "237e92ee-de11-45a2-a7f1-415ad8b3c7a1",
  "email": "user@example.com",
  "phone": null,
  "nickname": "钢琴爱好者",
  "avatar": null,
  "preferences": {
    "dailyGoalMinutes": 60,
    "theme": "light",
    "notifications": true
  },
  "createdAt": "2026-03-28T07:10:35.000Z"
}
```

---

#### 更新用户信息

```http
PATCH /users/:id
Authorization: Bearer <token>
```

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| nickname | string | 否 | 昵称 |
| avatar | string | 否 | 头像URL |

---

### 3️⃣ 练习记录接口

#### 开始练习

```http
POST /practice/start
Authorization: Bearer <token>
```

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | 练习类型：音阶练习/曲目练习/视奏练习/乐理学习/自由练习 |
| startTime | string | 是 | ISO 8601 格式时间 |
| pieceName | string | 否 | 曲目名称 |
| notes | string | 否 | 备注 |

**请求示例：**

```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3000/api/v1/practice/start', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    type: '音阶练习',
    startTime: new Date().toISOString(),
    notes: '练习C大调音阶'
  })
});

const practice = await response.json();
// 保存 practice.id 用于后续操作
localStorage.setItem('currentPracticeId', practice.id);
```

**响应示例：**

```json
{
  "id": "d9a2c471-11da-4278-b5ca-da2d6a85c189",
  "userId": "237e92ee-de11-45a2-a7f1-415ad8b3c7a1",
  "type": "音阶练习",
  "status": "进行中",
  "startTime": "2026-03-28T07:10:35.000Z",
  "durationSeconds": 0,
  "notes": "练习C大调音阶"
}
```

---

#### 暂停练习

```http
POST /practice/:id/pause
Authorization: Bearer <token>
```

**请求示例：**

```javascript
const practiceId = localStorage.getItem('currentPracticeId');

await fetch(`http://localhost:3000/api/v1/practice/${practiceId}/pause`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

---

#### 恢复练习

```http
POST /practice/:id/resume
Authorization: Bearer <token>
```

---

#### 结束练习

```http
POST /practice/:id/end
Authorization: Bearer <token>
```

**请求参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| focusRating | number | 否 | 专注度评分 1-5 |
| notes | string | 否 | 练习总结 |

**请求示例：**

```javascript
const practiceId = localStorage.getItem('currentPracticeId');

const response = await fetch(`http://localhost:3000/api/v1/practice/${practiceId}/end`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    focusRating: 4,
    notes: '练习完成，手感不错'
  })
});

const result = await response.json();
console.log(`练习时长: ${result.durationSeconds} 秒`);
```

---

#### 获取练习记录列表

```http
GET /practice
Authorization: Bearer <token>
```

**查询参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 否 | 按类型筛选 |
| startDate | string | 否 | 开始日期 (YYYY-MM-DD) |
| endDate | string | 否 | 结束日期 (YYYY-MM-DD) |

**请求示例：**

```javascript
// 获取所有记录
const response = await fetch('http://localhost:3000/api/v1/practice', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 按类型筛选
const response = await fetch('http://localhost:3000/api/v1/practice?type=音阶练习', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 按日期范围筛选
const response = await fetch(
  'http://localhost:3000/api/v1/practice?startDate=2026-03-01&endDate=2026-03-31',
  { headers: { 'Authorization': `Bearer ${token}` } }
);
```

**响应示例：**

```json
[
  {
    "id": "d9a2c471-11da-4278-b5ca-da2d6a85c189",
    "type": "音阶练习",
    "status": "已完成",
    "startTime": "2026-03-28T07:10:35.000Z",
    "endTime": "2026-03-28T07:25:35.000Z",
    "durationSeconds": 900,
    "focusRating": 4,
    "notes": "练习完成"
  }
]
```

---

#### 获取练习统计

```http
GET /practice/stats
Authorization: Bearer <token>
```

**响应示例：**

```json
{
  "todayMinutes": 45,
  "weekMinutes": 180,
  "totalCount": 12,
  "streakDays": 3
}
```

---

### 4️⃣ 乐理接口

#### 获取所有音阶

```http
GET /music/scales
Authorization: Bearer <token>
```

**响应示例：**

```json
[
  {
    "_id": "...",
    "key": "C",
    "mode": "major",
    "notes": ["C", "D", "E", "F", "G", "A", "B", "C"],
    "intervals": [0, 2, 4, 5, 7, 9, 11, 12],
    "description": "C自然大调，无升降号",
    "keySignature": {
      "sharps": 0,
      "flats": 0,
      "accidentals": []
    },
    "difficulty": 1
  }
]
```

---

#### 获取指定音阶

```http
GET /music/scales/:key?mode=major
Authorization: Bearer <token>
```

**查询参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| mode | string | 否 | major/minor/harmonicMinor，默认 major |

**请求示例：**

```javascript
// 获取 C 大调
const response = await fetch('http://localhost:3000/api/v1/music/scales/C?mode=major', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 获取 A 和声小调
const response = await fetch('http://localhost:3000/api/v1/music/scales/A?mode=harmonicMinor', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

**响应示例：**

```json
{
  "_id": "...",
  "key": "C",
  "mode": "major",
  "notes": ["C", "D", "E", "F", "G", "A", "B", "C"],
  "intervals": [0, 2, 4, 5, 7, 9, 11, 12],
  "description": "C自然大调，无升降号",
  "keySignature": {
    "sharps": 0,
    "flats": 0,
    "accidentals": []
  },
  "frequencies": {
    "C": 261.63,
    "D": 293.66,
    "E": 329.63,
    "F": 349.23,
    "G": 392.00,
    "A": 440.00,
    "B": 493.88
  },
  "difficulty": 1
}
```

---

## 前端示例代码

### 完整的 API 封装

```javascript
// api/index.js

const BASE_URL = 'http://localhost:3000/api/v1';

// 获取 Token
const getToken = () => localStorage.getItem('token');

// 通用请求函数
async function request(url, options = {}) {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// 认证相关
export const auth = {
  register: (data) => request('/auth/register', { method: 'POST', body: data }),
  login: (data) => request('/auth/login', { method: 'POST', body: data }),
};

// 用户相关
export const user = {
  getProfile: () => request('/users/profile'),
  update: (id, data) => request(`/users/${id}`, { method: 'PATCH', body: data }),
};

// 练习记录相关
export const practice = {
  start: (data) => request('/practice/start', { method: 'POST', body: data }),
  pause: (id) => request(`/practice/${id}/pause`, { method: 'POST' }),
  resume: (id) => request(`/practice/${id}/resume`, { method: 'POST' }),
  end: (id, data) => request(`/practice/${id}/end`, { method: 'POST', body: data }),
  getList: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/practice${query ? '?' + query : ''}`);
  },
  getStats: () => request('/practice/stats'),
};

// 乐理相关
export const music = {
  getScales: () => request('/music/scales'),
  getScale: (key, mode = 'major') => request(`/music/scales/${key}?mode=${mode}`),
};
```

---

### Vue 3 使用示例

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { auth, user, practice, music } from './api';

// 用户状态
const isLoggedIn = ref(false);
const userInfo = ref(null);
const practiceRecords = ref([]);
const stats = ref({});

// 登录
async function handleLogin(email, password) {
  try {
    const data = await auth.login({ email, password });
    localStorage.setItem('token', data.access_token);
    isLoggedIn.value = true;
    userInfo.value = data.user;
    return true;
  } catch (error) {
    alert(error.message);
    return false;
  }
}

// 获取用户信息
async function loadUserProfile() {
  try {
    userInfo.value = await user.getProfile();
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
}

// 开始练习
async function startPractice(type) {
  try {
    const data = await practice.start({
      type,
      startTime: new Date().toISOString(),
    });
    localStorage.setItem('currentPracticeId', data.id);
    return data;
  } catch (error) {
    alert('开始练习失败: ' + error.message);
  }
}

// 结束练习
async function endPractice(focusRating, notes) {
  const practiceId = localStorage.getItem('currentPracticeId');
  if (!practiceId) return;
  
  try {
    const data = await practice.end(practiceId, { focusRating, notes });
    localStorage.removeItem('currentPracticeId');
    return data;
  } catch (error) {
    alert('结束练习失败: ' + error.message);
  }
}

// 获取练习记录
async function loadPracticeRecords() {
  try {
    practiceRecords.value = await practice.getList();
  } catch (error) {
    console.error('获取练习记录失败:', error);
  }
}

// 获取统计数据
async function loadStats() {
  try {
    stats.value = await practice.getStats();
  } catch (error) {
    console.error('获取统计数据失败:', error);
  }
}

// 获取音阶数据
async function loadScales() {
  try {
    return await music.getScales();
  } catch (error) {
    console.error('获取音阶数据失败:', error);
  }
}

onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true;
    loadUserProfile();
    loadPracticeRecords();
    loadStats();
  }
});
</script>
```

---

## 错误处理

### HTTP 状态码

| 状态码 | 说明 | 处理方式 |
|--------|------|----------|
| 200 | 成功 | 正常处理数据 |
| 201 | 创建成功 | 正常处理数据 |
| 400 | 请求参数错误 | 检查请求参数 |
| 401 | 未授权 | Token 无效或过期，跳转登录 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 资源不存在 | 检查请求路径 |
| 500 | 服务器错误 | 稍后重试或联系管理员 |

### 错误响应格式

```json
{
  "message": "错误描述信息",
  "error": "错误类型",
  "statusCode": 401
}
```

### 前端错误处理示例

```javascript
async function handleRequest(apiCall) {
  try {
    return await apiCall();
  } catch (error) {
    if (error.message.includes('401')) {
      // Token 过期，清除登录状态
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else {
      alert(error.message);
    }
    throw error;
  }
}
```

---

## 数据类型定义

### TypeScript 类型定义

```typescript
// types/api.ts

// 用户
export interface User {
  id: string;
  email: string;
  phone?: string;
  nickname: string;
  avatar?: string;
  preferences: {
    dailyGoalMinutes: number;
    theme: string;
    notifications: boolean;
  };
  createdAt: string;
}

// 练习记录
export interface PracticeRecord {
  id: string;
  userId: string;
  type: '音阶练习' | '曲目练习' | '视奏练习' | '乐理学习' | '自由练习';
  pieceName?: string;
  startTime: string;
  endTime?: string;
  durationSeconds: number;
  status: '进行中' | '已暂停' | '已完成';
  notes?: string;
  focusRating?: number;
  createdAt: string;
}

// 练习统计
export interface PracticeStats {
  todayMinutes: number;
  weekMinutes: number;
  totalCount: number;
  streakDays: number;
}

// 音阶
export interface Scale {
  _id: string;
  key: string;
  mode: 'major' | 'minor' | 'harmonicMinor';
  notes: string[];
  intervals: number[];
  description: string;
  keySignature: {
    sharps: number;
    flats: number;
    accidentals: string[];
  };
  frequencies?: Record<string, number>;
  difficulty: number;
}

// API 响应
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
```

---

## 📚 相关链接

- Swagger 文档：http://localhost:3000/api/docs
- 后端 README：./README.md

---

**文档版本**: v1.0  
**更新日期**: 2026-03-28
