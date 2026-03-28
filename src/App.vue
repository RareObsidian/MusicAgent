<template>
  <div class="app">
    <header class="header">
      <h1>”9Â3 ¸ÖÇÙÖúÊÖ</h1>
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
  { id: 'scale', name: 'Òô½×Ñ§Ï°' },
  { id: 'pomodoro', name: '·¬ÇÑÖÓ' },
  { id: 'stats', name: 'Êý¾ÝÍ³¼Æ' }
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

.header h1 {
  text-align: center;
  margin-bottom: 15px;
  color: #4A4035;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.3);
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
</style>
