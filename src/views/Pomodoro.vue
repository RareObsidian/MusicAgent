<template>
  <div class="pomodoro">
    <h2>番茄钟</h2>
    
    <div class="timer-display">
      <div class="time">{{ formattedTime }}</div>
      <div class="status">{{ statusText }}</div>
    </div>
    
    <div class="controls">
      <button v-if="!isRunning" class="btn btn-primary" @click="start">
        开始
      </button>
      <button v-else class="btn btn-warning" @click="pause">
        暂停
      </button>
      <button class="btn btn-danger" @click="reset">
        重置
      </button>
    </div>
    
    <div class="settings">
      <label>
        专注时长:
        <input v-model.number="focusDuration" type="number" min="1" max="60" />
        分钟
      </label>
    </div>
    
    <div class="stats">
      <p>今日专注次数: {{ todayCount }}</p>
      <p>今日总时长: {{ todayTotal }} 分钟</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const focusDuration = ref(25)
const timeLeft = ref(25 * 60)
const isRunning = ref(false)
const todayCount = ref(0)
const todayTotal = ref(0)
let timer = null

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const statusText = computed(() => isRunning.value ? '专注中...' : '已暂停')

function start() {
  if (!isRunning.value) {
    isRunning.value = true
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--
      } else {
        complete()
      }
    }, 1000)
  }
}

function pause() {
  isRunning.value = false
  clearInterval(timer)
}

function reset() {
  pause()
  timeLeft.value = focusDuration.value * 60
}

function complete() {
  pause()
  todayCount.value++
  todayTotal.value += focusDuration.value
  alert('专注时间结束！')
  reset()
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.pomodoro {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.timer-display {
  margin: 30px 0;
}

.time {
  font-size: 72px;
  font-weight: bold;
  color: #333;
  font-family: monospace;
}

.status {
  margin-top: 10px;
  color: #666;
  font-size: 18px;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 20px 0;
}

.btn {
  padding: 12px 30px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: #4CAF50;
  color: white;
}

.btn-warning {
  background: #ff9800;
  color: white;
}

.btn-danger {
  background: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.settings {
  margin: 20px 0;
}

.settings input {
  width: 60px;
  padding: 5px;
  border: 2px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

.stats {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stats p {
  margin: 5px 0;
  color: #666;
}
</style>
