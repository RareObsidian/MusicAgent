/**
 * 认证状态管理
 */
import { defineStore } from 'pinia';
import { auth, user } from '../services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    // 注册
    async register(userData) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await auth.register(userData);
        localStorage.setItem('token', response.access_token);
        this.user = response.user;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 登录
    async login(credentials) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await auth.login(credentials);
        localStorage.setItem('token', response.access_token);
        this.user = response.user;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 登出
    logout() {
      localStorage.removeItem('token');
      this.user = null;
      this.isAuthenticated = false;
    },

    // 获取用户信息
    async fetchUser() {
      if (!localStorage.getItem('token')) {
        this.isAuthenticated = false;
        return;
      }

      this.loading = true;
      
      try {
        const userData = await user.getProfile();
        this.user = userData;
        this.isAuthenticated = true;
      } catch (error) {
        // Token 无效，清除登录状态
        this.logout();
      } finally {
        this.loading = false;
      }
    },

    // 初始化认证状态
    async init() {
      if (localStorage.getItem('token')) {
        await this.fetchUser();
      }
    }
  }
});
