<template>
  <div class="statistics">
    <h2>学习统计</h2>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>今日学习时长</h3>
        <div class="stat-value">{{ todayMinutes }} 分钟</div>
      </div>
      <div class="stat-card">
        <h3>本周学习时长</h3>
        <div class="stat-value">{{ weekMinutes }} 分钟</div>
      </div>
      <div class="stat-card">
        <h3>连续学习天数</h3>
        <div class="stat-value">{{ streakDays }} 天</div>
      </div>
    </div>
    
    <div class="recent-records">
      <h3>最近学习记录</h3>
      <ul>
        <li v-for="(record, index) in recentRecords" :key="index" class="record-item">
          <span>{{ record.date }}</span>
          <span>{{ record.type }}</span>
          <span>{{ record.duration }} 分钟</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const todayMinutes = ref(45)
const weekMinutes = ref(180)
const streakDays = ref(3)

const recentRecords = ref([
  { date: '2026-03-28', type: '音阶练习', duration: 25 },
  { date: '2026-03-28', type: '和弦练习', duration: 25 },
  { date: '2026-03-27', type: '音阶练习', duration: 30 },
  { date: '2026-03-26', type: '和弦练习', duration: 25 },
  { date: '2026-03-25', type: '音阶练习', duration: 20 }
])
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
</style>
