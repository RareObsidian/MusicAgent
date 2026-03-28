/**
 * 练习记录状态管理
 */
import { defineStore } from 'pinia';
import { practice } from '../services/api';

export const usePracticeStore = defineStore('practice', {
  state: () => ({
    currentPractice: null,
    practiceRecords: [],
    practiceStats: {
      todayMinutes: 0,
      weekMinutes: 0,
      totalCount: 0,
      streakDays: 0
    },
    loading: false,
    error: null
  }),

  getters: {
    getCurrentPractice: (state) => state.currentPractice,
    getPracticeRecords: (state) => state.practiceRecords,
    getPracticeStats: (state) => state.practiceStats,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    // 开始练习
    async startPractice(practiceData) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await practice.start(practiceData);
        this.currentPractice = response;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 暂停练习
    async pausePractice(practiceId) {
      this.loading = true;
      
      try {
        const response = await practice.pause(practiceId);
        if (this.currentPractice && this.currentPractice.id === practiceId) {
          this.currentPractice = response;
        }
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 恢复练习
    async resumePractice(practiceId) {
      this.loading = true;
      
      try {
        const response = await practice.resume(practiceId);
        if (this.currentPractice && this.currentPractice.id === practiceId) {
          this.currentPractice = response;
        }
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 结束练习
    async endPractice(practiceId, endData) {
      this.loading = true;
      
      try {
        const response = await practice.end(practiceId, endData);
        if (this.currentPractice && this.currentPractice.id === practiceId) {
          this.currentPractice = null;
        }
        // 重新获取练习记录和统计数据
        await this.fetchPracticeRecords();
        await this.fetchPracticeStats();
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 获取练习记录列表
    async fetchPracticeRecords(params = {}) {
      this.loading = true;
      
      try {
        const records = await practice.getList(params);
        this.practiceRecords = records;
        return records;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 获取练习统计数据
    async fetchPracticeStats() {
      this.loading = true;
      
      try {
        const stats = await practice.getStats();
        this.practiceStats = stats;
        return stats;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // 初始化练习数据
    async init() {
      try {
        await Promise.all([
          this.fetchPracticeRecords(),
          this.fetchPracticeStats()
        ]);
      } catch (error) {
        console.error('初始化练习数据失败:', error);
      }
    }
  }
});
