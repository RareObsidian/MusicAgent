<template>
  <div class="scale-learning">
    <h2>音阶学习</h2>
    <p>选择调性和模式来查看五线谱</p>
    
    <div class="controls">
      <div class="control-group">
        <label>调性：</label>
        <select v-model="selectedKey" class="select">
          <option v-for="key in allKeys" :key="key" :value="key">{{ key }}</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>谱号：</label>
        <div class="clef-toggle">
          <button 
            :class="['clef-btn', { active: clef === 'treble' }]"
            @click="clef = 'treble'"
          >
            高音谱号
          </button>
          <button 
            :class="['clef-btn', { active: clef === 'bass' }]"
            @click="clef = 'bass'"
          >
            低音谱号
          </button>
        </div>
      </div>
      
      <div class="mode-toggle">
        <button 
          v-for="m in modes" 
          :key="m.id"
          :class="['mode-btn', { active: mode === m.id }]"
          @click="mode = m.id"
        >
          {{ m.name }}
        </button>
      </div>
    </div>
    
    <!-- 五线谱渲染区域 -->
    <div class="score-section">
      <h3>{{ selectedKey }} {{ getModeName(mode) }}</h3>
      <ScoreRenderer 
        :key-name="selectedKey" 
        :mode="mode" 
        :clef="clef"
      />
    </div>
    
    <!-- 音符显示 -->
    <div class="notes-display">
      <h4>音阶音符</h4>
      <div class="notes">
        <span 
          v-for="(noteData, index) in scaleNotes" 
          :key="index" 
          class="note"
          @click="playNote(noteData.note)"
        >
          {{ noteData.note }}
        </span>
      </div>
      <button class="play-btn" @click="playScale">
        ▶ 播放音阶
      </button>
    </div>
    
    <!-- 调号信息 -->
    <div class="key-info">
      <h4>调号信息</h4>
      <p v-if="keySignature.sharps > 0">
        升号调：{{ keySignature.sharps }} 个升号 ({{ getSharpOrder(keySignature.sharps) }})
      </p>
      <p v-else-if="keySignature.flats > 0">
        降号调：{{ keySignature.flats }} 个降号 ({{ getFlatOrder(keySignature.flats) }})
      </p>
      <p v-else>
        C大调 / a小调：无升降号
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ScoreRenderer from '../components/ScoreRenderer.vue'
import { 
  allKeys, 
  getVexFlowNotes, 
  getKeySignature, 
  getModeName,
  playNote as playNoteAudio,
  playScale as playScaleAudio
} from '../utils/musicTheory.js'

const selectedKey = ref('C')
const mode = ref('major')
const clef = ref('treble')

const modes = [
  { id: 'major', name: '自然大调' },
  { id: 'minor', name: '自然小调' },
  { id: 'harmonic', name: '和声小调' },
  { id: 'melodic', name: '旋律小调' }
]

const scaleNotes = computed(() => {
  return getVexFlowNotes(selectedKey.value, mode.value, clef.value === 'treble' ? 4 : 3)
})

const keySignature = computed(() => {
  return getKeySignature(selectedKey.value)
})

function playNote(note) {
  playNoteAudio(note, 0.5)
}

function playScale() {
  playScaleAudio(scaleNotes.value, 0.4)
}

function getSharpOrder(count) {
  const order = ['F#', 'C#', 'G#', 'D#', 'A#', 'E#', 'B#']
  return order.slice(0, count).join(', ')
}

function getFlatOrder(count) {
  const order = ['Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Cb', 'Fb']
  return order.slice(0, count).join(', ')
}
</script>

<style scoped>
.scale-learning {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-group label {
  font-weight: 500;
  color: #666;
}

.select {
  padding: 10px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-width: 80px;
}

.clef-toggle {
  display: flex;
  gap: 5px;
}

.clef-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.clef-btn:hover {
  border-color: #4CAF50;
}

.clef-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.mode-toggle {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.mode-btn {
  padding: 10px 20px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.mode-btn:hover {
  border-color: #4CAF50;
}

.mode-btn.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.score-section {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
}

.score-section h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.notes-display {
  margin-top: 30px;
  padding: 20px;
  background: #f0f7f0;
  border-radius: 12px;
  text-align: center;
}

.notes-display h4 {
  margin-bottom: 15px;
  color: #333;
}

.notes {
  display: flex;
  gap: 12px;
  margin: 15px 0;
  justify-content: center;
  flex-wrap: wrap;
}

.note {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
}

.note:hover {
  background: #45a049;
  transform: scale(1.1);
}

.play-btn {
  margin-top: 15px;
  padding: 12px 30px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.play-btn:hover {
  background: #1976D2;
  transform: translateY(-2px);
}

.key-info {
  margin-top: 20px;
  padding: 15px 20px;
  background: #fff3e0;
  border-radius: 8px;
}

.key-info h4 {
  margin-bottom: 10px;
  color: #e65100;
}

.key-info p {
  color: #666;
  margin: 5px 0;
}
</style>
