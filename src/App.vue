<template>
  <div class="app">
    <header class="header">
      <div class="header-top">
        <h1>🎹 钢琴助手</h1>
        <div class="user-info">
          <span v-if="authStore.isAuthenticated" class="welcome">
            欢迎, {{ authStore.user.username }}
          </span>
          <button v-if="authStore.isAuthenticated" class="btn-logout" @click="handleLogout">
            登出
          </button>
          <button v-else class="btn-login" @click="currentTab = 'auth'">
            登录/注册
          </button>
        </div>
      </div>
      
      <nav class="nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="['nav-btn', { active: currentTab === tab.id }]"
          @click="currentTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </nav>
    </header>
    
    <main class="main">
      <ScaleLearning v-if="currentTab === 'scale'" />
      <Pomodoro v-if="currentTab === 'pomodoro'" />
      <Statistics v-if="currentTab === 'stats'" />
      <Auth v-if="currentTab === 'auth'" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScaleLearning from './views/ScaleLearning.vue'
import Pomodoro from './views/Pomodoro.vue'
import Statistics from './views/Statistics.vue'
import Auth from './views/Auth.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const currentTab = ref('scale')

const tabs = [
  { id: 'scale', name: '音阶学习' },
  { id: 'pomodoro', name: '练习计时' },
  { id: 'stats', name: '数据统计' }
]

function handleLogout() {
  authStore.logout()
  alert('已成功登出')
  currentTab.value = 'scale'
}

// 初始化认证状态
onMounted(async () => {
  await authStore.init()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #F5F1E8;
}

.app {
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #D4C5A9 0%, #C3B091 100%);
  padding: 20px;
  box-shadow: 0 2px 8px rgba(139, 115, 85, 0.2);
  border-bottom: 3px solid #B8860B;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header h1 {
  color: #4A4035;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.3);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.welcome {
  color: #4A4035;
  font-weight: 500;
}

.btn-login, .btn-logout {
  padding: 8px 16px;
  border: 2px solid #8B7355;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-login {
  background: #FAF8F3;
  color: #6B5B4F;
}

.btn-login:hover {
  background: #E8DFD0;
  border-color: #B8860B;
}

.btn-logout {
  background: #8B4513;
  color: #FAF8F3;
  border-color: #8B4513;
}

.btn-logout:hover {
  background: #6B3410;
  border-color: #6B3410;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-btn {
  padding: 10px 20px;
  border: 2px solid #8B7355;
  background: #FAF8F3;
  color: #6B5B4F;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.nav-btn:hover {
  background: #E8DFD0;
  border-color: #B8860B;
}

.nav-btn.active {
  background: #8B7355;
  color: #FAF8F3;
  border-color: #8B7355;
}

.main {
  padding: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }
  
  .nav {
    flex-wrap: wrap;
  }
  
  .nav-btn {
    flex: 1;
    min-width: 120px;
  }
}
</style>
