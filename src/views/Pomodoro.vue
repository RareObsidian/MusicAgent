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
      <p>今日完成次数: {{ todayCount }}</p>
      <p>今日专注时长: {{ todayTotal }} 分钟</p>
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

const statusText = computed(() => isRunning.value ? '专注中...' : '准备就绪')

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
  alert('专注时间结束！休息一下吧~')
  reset()
}

onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.pomodoro {
  background: linear-gradient(145deg, #FAF8F3 0%, #F0EBE0 100%);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
  text-align: center;
  border: 2px solid #D4C5A9;
}

.pomodoro h2 {
  color: #4A4035;
  margin-bottom: 20px;
  font-weight: 600;
}

.timer-display {
  margin: 30px 0;
  padding: 20px;
  background: linear-gradient(135deg, #E8DFD0 0%, #D4C5A9 100%);
  border-radius: 12px;
  border: 2px solid #C3B091;
}

.time {
  font-size: 72px;
  font-weight: bold;
  color: #4A4035;
  font-family: 'Courier New', monospace;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
}

.status {
  margin-top: 10px;
  color: #6B5B4F;
  font-size: 18px;
  font-weight: 500;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 20px 0;
}

.btn {
  padding: 12px 30px;
  border: 2px solid;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.btn-primary {
  background: #6B7B4C;
  color: #FAF8F3;
  border-color: #6B7B4C;
}

.btn-primary:hover {
  background: #5A6A3D;
  border-color: #5A6A3D;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(107, 123, 76, 0.3);
}

.btn-warning {
  background: #B8860B;
  color: #FAF8F3;
  border-color: #B8860B;
}

.btn-warning:hover {
  background: #9A7009;
  border-color: #9A7009;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(184, 134, 11, 0.3);
}

.btn-danger {
  background: #8B4513;
  color: #FAF8F3;
  border-color: #8B4513;
}

.btn-danger:hover {
  background: #6B3410;
  border-color: #6B3410;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 69, 19, 0.3);
}

.settings {
  margin: 25px 0;
  padding: 15px;
  background: #F5F1E8;
  border-radius: 8px;
  border: 1px solid #D4C5A9;
}

.settings label {
  color: #4A4035;
  font-weight: 500;
}

.settings input {
  width: 60px;
  padding: 8px;
  border: 2px solid #C3B091;
  border-radius: 6px;
  text-align: center;
  background: #FAF8F3;
  color: #4A4035;
  font-weight: 600;
}

.settings input:focus {
  outline: none;
  border-color: #B8860B;
}

.stats {
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #E8DFD0 0%, #D4C5A9 100%);
  border-radius: 12px;
  border: 1px solid #C3B091;
}

.stats p {
  margin: 8px 0;
  color: #4A4035;
  font-weight: 500;
}
</style>
