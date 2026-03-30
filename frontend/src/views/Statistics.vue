<template>
  <div class="statistics">
    <h2>学习统计</h2>
    
    <div v-if="practiceStore.loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <div v-else class="stats-grid">
      <div class="stat-card">
        <h3>今日学习时长</h3>
        <div class="stat-value">{{ practiceStore.practiceStats.todayMinutes }} 分钟</div>
      </div>
      <div class="stat-card">
        <h3>本周学习时长</h3>
        <div class="stat-value">{{ practiceStore.practiceStats.weekMinutes }} 分钟</div>
      </div>
      <div class="stat-card">
        <h3>连续学习天数</h3>
        <div class="stat-value">{{ practiceStore.practiceStats.streakDays }} 天</div>
      </div>
    </div>
    
    <div class="recent-records">
      <h3>最近学习记录</h3>
      <ul>
        <li v-for="(record, index) in practiceStore.practiceRecords" :key="record.id || index" class="record-item">
          <span>{{ formatDate(record.startTime) }}</span>
          <span>{{ record.type }} ({{ record.status }})</span>
          <span>{{ Math.round(record.durationSeconds / 60) }} 分钟</span>
        </li>
        <li v-if="practiceStore.practiceRecords.length === 0" class="no-records">
          暂无练习记录
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePracticeStore } from '../stores/practice'

const practiceStore = usePracticeStore()

// 格式化日期
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

// 初始化数据
onMounted(async () => {
  await practiceStore.init()
})
</script>

<style scoped>
.statistics {
  background: linear-gradient(145deg, #FAF8F3 0%, #F0EBE0 100%);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
  border: 2px solid #D4C5A9;
}

.statistics h2 {
  color: #4A4035;
  margin-bottom: 20px;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: linear-gradient(135deg, #8B7355 0%, #6B5B4F 100%);
  color: #FAF8F3;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #6B5B4F;
  box-shadow: 0 4px 8px rgba(139, 115, 85, 0.2);
}

.stat-card h3 {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.recent-records {
  margin-top: 30px;
}

.recent-records h3 {
  margin-bottom: 15px;
  color: #4A4035;
}

.recent-records ul {
  list-style: none;
}

.record-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background: linear-gradient(135deg, #E8DFD0 0%, #D4C5A9 100%);
  margin-bottom: 8px;
  border-radius: 8px;
  color: #6B5B4F;
  border: 1px solid #C3B091;
}

.record-item span:first-child {
  color: #4A4035;
  font-weight: 500;
}

.record-item span:last-child {
  color: #6B7B4C;
  font-weight: 600;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #8B7355;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #E8DFD0;
  border-top: 4px solid #8B7355;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-records {
  text-align: center;
  padding: 20px;
  color: #6B5B4F;
  font-style: italic;
  background: linear-gradient(135deg, #E8DFD0 0%, #D4C5A9 100%);
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid #C3B091;
}
</style>
