<template>
  <div class="app">
    <header class="header">
      <h1>🎹 钢琴助手</h1>
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
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ScaleLearning from './views/ScaleLearning.vue'
import Pomodoro from './views/Pomodoro.vue'
import Statistics from './views/Statistics.vue'

const currentTab = ref('scale')

const tabs = [
  { id: 'scale', name: '音阶学习' },
  { id: 'pomodoro', name: '番茄钟' },
  { id: 'stats', name: '数据统计' }
]
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.header {
  background: #fff;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header h1 {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-btn {
  padding: 10px 20px;
  border: none;
  background: #e0e0e0;
  color: #666;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.nav-btn:hover {
  background: #d0d0d0;
}

.nav-btn.active {
  background: #4CAF50;
  color: white;
}

.main {
  padding: 20px;
}
</style>
