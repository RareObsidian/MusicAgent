<template>
  <div class="statistics">
    <h2>ĘýžÝÍłźĆ</h2>
    
    <div class="stats-grid">
      <div class="stat-card">
        <h3>˝ńČŐÁˇĎ°</h3>
        <div class="stat-value">{{ todayMinutes }} ˇÖÖÓ</div>
      </div>
      <div class="stat-card">
        <h3>ąžÖÜŔŰźĆ</h3>
        <div class="stat-value">{{ weekMinutes }} ˇÖÖÓ</div>
      </div>
      <div class="stat-card">
        <h3>ÁŹĐřŃ§Ď°</h3>
        <div class="stat-value">{{ streakDays }} Ěě</div>
      </div>
    </div>
    
    <div class="recent-records">
      <h3>×î˝üźÇÂź</h3>
      <ul>
        <li v-for="(record, index) in recentRecords" :key="index" class="record-item">
          <span>{{ record.date }}</span>
          <span>{{ record.type }}</span>
          <span>{{ record.duration }} ˇÖÖÓ</span>
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
  { date: '2026-03-28', type: 'Ňô˝×ÁˇĎ°', duration: 25 },
  { date: '2026-03-28', type: 'ˇŹÇŃÖÓ', duration: 25 },
  { date: '2026-03-27', type: 'Ňô˝×ÁˇĎ°', duration: 30 },
  { date: '2026-03-26', type: 'ˇŹÇŃÖÓ', duration: 25 },
  { date: '2026-03-25', type: 'Ňô˝×ÁˇĎ°', duration: 20 }
])
</script>

<style scoped>
.statistics {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
}

.stat-card h3 {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
}

.recent-records {
  margin-top: 30px;
}

.recent-records h3 {
  margin-bottom: 15px;
  color: #333;
}

.recent-records ul {
  list-style: none;
}

.record-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  background: #f8f9fa;
  margin-bottom: 8px;
  border-radius: 8px;
  color: #666;
}

.record-item span:first-child {
  color: #333;
  font-weight: 500;
}

.record-item span:last-child {
  color: #4CAF50;
  font-weight: 500;
}
</style>
