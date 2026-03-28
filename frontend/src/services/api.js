/**
 * API 服务层
 * 处理与后端的所有通信
 */

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

export default {
  auth,
  user,
  practice,
  music
};
