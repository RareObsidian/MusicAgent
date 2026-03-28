﻿<template>
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
    
    <!-- 虚拟钢琴 -->
    <div class="piano-section">
      <h4>虚拟钢琴</h4>
      <p class="piano-hint">绿色表示音阶中的音，橙色表示根音，点击可播放</p>
      <VirtualPiano 
        :key-name="selectedKey" 
        :mode="mode"
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
import VirtualPiano from '../components/VirtualPiano.vue'
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
  background: linear-gradient(145deg, #FAF8F3 0%, #F0EBE0 100%);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(139, 115, 85, 0.15);
  border: 2px solid #D4C5A9;
}

.scale-learning h2 {
  color: #4A4035;
  margin-bottom: 10px;
  font-weight: 600;
}

.scale-learning > p {
  color: #6B5B4F;
  margin-bottom: 20px;
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
  color: #4A4035;
}

.select {
  padding: 10px 15px;
  border: 2px solid #C3B091;
  border-radius: 8px;
  font-size: 16px;
  min-width: 80px;
  background: #FAF8F3;
  color: #4A4035;
}

.select:focus {
  outline: none;
  border-color: #B8860B;
}

.clef-toggle {
  display: flex;
  gap: 5px;
}

.clef-btn {
  padding: 8px 16px;
  border: 2px solid #C3B091;
  background: #FAF8F3;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  color: #6B5B4F;
}

.clef-btn:hover {
  border-color: #B8860B;
  background: #E8DFD0;
}

.clef-btn.active {
  background: #8B7355;
  color: #FAF8F3;
  border-color: #8B7355;
}

.mode-toggle {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.mode-btn {
  padding: 10px 20px;
  border: 2px solid #C3B091;
  background: #FAF8F3;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  color: #6B5B4F;
}

.mode-btn:hover {
  border-color: #B8860B;
  background: #E8DFD0;
}

.mode-btn.active {
  background: #8B7355;
  color: #FAF8F3;
  border-color: #8B7355;
}

.score-section {
  margin-top: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #E8DFD0 0%, #D4C5A9 100%);
  border-radius: 12px;
  border: 1px solid #C3B091;
}

.score-section h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #4A4035;
}

.piano-section {
  margin-top: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #E8E4D8 0%, #D8D0C0 100%);
  border-radius: 12px;
  border: 1px solid #C3B091;
}

.piano-section h4 {
  text-align: center;
  margin-bottom: 10px;
  color: #4A4035;
}

.piano-hint {
  text-align: center;
  color: #6B5B4F;
  font-size: 14px;
  margin-bottom: 15px;
}

.notes-display {
  margin-top: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #F0EBE0 0%, #E0D8C8 100%);
  border-radius: 12px;
  text-align: center;
  border: 1px solid #C3B091;
}

.notes-display h4 {
  margin-bottom: 15px;
  color: #4A4035;
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
  background: #6B7B4C;
  color: #FAF8F3;
  border-radius: 50%;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
  border: 2px solid #5A6A3D;
}

.note:hover {
  background: #5A6A3D;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(107, 123, 76, 0.3);
}

.play-btn {
  margin-top: 15px;
  padding: 12px 30px;
  background: #B8860B;
  color: #FAF8F3;
  border: 2px solid #B8860B;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.play-btn:hover {
  background: #9A7009;
  border-color: #9A7009;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(184, 134, 11, 0.3);
}

.key-info {
  margin-top: 20px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #F5E6D3 0%, #E8D4B8 100%);
  border-radius: 8px;
  border: 1px solid #D4C5A9;
}

.key-info h4 {
  margin-bottom: 10px;
  color: #8B4513;
}

.key-info p {
  color: #6B5B4F;
  margin: 5px 0;
}
</style>
