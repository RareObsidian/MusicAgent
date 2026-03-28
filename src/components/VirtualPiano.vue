<template>
  <div class="virtual-piano">
    <div class="piano-container">
      <div class="white-keys">
        <div
          v-for="note in whiteKeys"
          :key="note.name"
          :class="['white-key', { active: isInScale(note.name), root: isRoot(note.name) }]"
          @click="playNote(note.name)"
        >
          <span class="key-label">{{ note.label }}</span>
        </div>
      </div>
      <div class="black-keys">
        <div
          v-for="note in blackKeys"
          :key="note.name"
          :class="['black-key', { active: isInScale(note.name), root: isRoot(note.name) }]"
          :style="{ left: note.position + '%' }"
          @click="playNote(note.name)"
        >
          <span class="key-label">{{ note.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { playNote as playNoteAudio, getScaleNotes, getKeySignature } from '../utils/musicTheory.js'

const props = defineProps({
  keyName: {
    type: String,
    default: 'C'
  },
  mode: {
    type: String,
    default: 'major'
  }
})

// 判断是否使用降号（根据调号）
const useFlats = computed(() => {
  const keySig = getKeySignature(props.keyName)
  return keySig.flats > 0 || props.keyName === 'F'
})

// 获取音符显示标签（根据调性决定使用升号还是降号）
function getNoteLabel(noteName) {
  const octave = noteName.match(/\d+/)?.[0] || ''
  const baseNote = noteName.replace(/\d/g, '')
  
  // 黑键的等音转换
  const sharpToFlat = {
    'C#': 'Db',
    'D#': 'Eb',
    'F#': 'Gb',
    'G#': 'Ab',
    'A#': 'Bb'
  }
  
  const flatToSharp = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#'
  }
  
  if (useFlats.value && sharpToFlat[baseNote]) {
    return sharpToFlat[baseNote] + octave
  } else if (!useFlats.value && flatToSharp[baseNote]) {
    return flatToSharp[baseNote] + octave
  }
  
  return noteName
}

// 白键配置 (C3 到 C5)
const whiteKeys = computed(() => [
  { name: 'C3', label: 'C' },
  { name: 'D3', label: 'D' },
  { name: 'E3', label: 'E' },
  { name: 'F3', label: 'F' },
  { name: 'G3', label: 'G' },
  { name: 'A3', label: 'A' },
  { name: 'B3', label: 'B' },
  { name: 'C4', label: 'C' },
  { name: 'D4', label: 'D' },
  { name: 'E4', label: 'E' },
  { name: 'F4', label: 'F' },
  { name: 'G4', label: 'G' },
  { name: 'A4', label: 'A' },
  { name: 'B4', label: 'B' },
  { name: 'C5', label: 'C' }
])

// 黑键配置 (带位置百分比，固定使用降号标签)
const blackKeys = computed(() => [
  { name: 'C#3', label: 'C#', position: 3.33 },
  { name: 'D#3', label: 'Eb', position: 10 },
  { name: 'F#3', label: 'F#', position: 23.33 },
  { name: 'G#3', label: 'Ab', position: 30 },
  { name: 'A#3', label: 'Bb', position: 36.66 },
  { name: 'C#4', label: 'C#', position: 50 },
  { name: 'D#4', label: 'Eb', position: 56.66 },
  { name: 'F#4', label: 'F#', position: 70 },
  { name: 'G#4', label: 'Ab', position: 76.66 },
  { name: 'A#4', label: 'Bb', position: 83.33 }
])

// 计算当前音阶的音符
const scaleNotes = computed(() => {
  const notes = getScaleNotes(props.keyName, props.mode)
  return notes
})

// 规范化音符名称，处理特殊情况 E#=F, B#=C 等
function normalizeNote(note) {
  const normalizedMap = {
    'E#': 'F',
    'B#': 'C',
    'Fb': 'E',
    'Cb': 'B'
  }
  return normalizedMap[note] || note
}

// 检查音符是否在音阶中
function isInScale(noteName) {
  // 简化处理，暂时返回 false
  return false
}

// 检查音符是否是根音
function isRoot(noteName) {
  // 简化处理，暂时返回 false
  return false
}

// 播放音符
function playNote(note) {
  const noteWithoutOctave = note.replace(/\d/g, '')
  playNoteAudio(noteWithoutOctave, 0.5)
}
</script>

<style scoped>
.virtual-piano {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
  margin-top: 20px;
}

.piano-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
  height: 180px;
}

.white-keys {
  display: flex;
  height: 100%;
  gap: 1px;
}

.white-key {
  flex: 1;
  background: linear-gradient(to bottom, #fff 0%, #f0f0f0 100%);
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
  cursor: pointer;
  position: relative;
  transition: all 0.1s;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
}

.white-key:hover {
  background: linear-gradient(to bottom, #f0f0f0 0%, #e0e0e0 100%);
}

.white-key.active {
  background: linear-gradient(to bottom, #a5d6a7 0%, #81c784 100%);
  border-color: #4CAF50;
}

.white-key.active.root {
  background: linear-gradient(to bottom, #ffcc80 0%, #ffb74d 100%);
  border-color: #ff9800;
}

.black-keys {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 65%;
  pointer-events: none;
}

.black-key {
  position: absolute;
  width: 6.5%;
  height: 100%;
  background: linear-gradient(to bottom, #333 0%, #111 100%);
  border-radius: 0 0 3px 3px;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.1s;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 8px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.black-key:hover {
  background: linear-gradient(to bottom, #444 0%, #222 100%);
}

.black-key.active {
  background: linear-gradient(to bottom, #388e3c 0%, #2e7d32 100%);
}

.black-key.active.root {
  background: linear-gradient(to bottom, #f57c00 0%, #ef6c00 100%);
}

.key-label {
  font-size: 11px;
  font-weight: bold;
  color: #666;
  user-select: none;
}

.white-key.active .key-label {
  color: #1b5e20;
}

.white-key.active.root .key-label {
  color: #e65100;
}

.black-key .key-label {
  color: #999;
  font-size: 9px;
}

.black-key.active .key-label {
  color: #a5d6a7;
}

.black-key.active.root .key-label {
  color: #ffcc80;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .piano-container {
    height: 140px;
  }
  
  .key-label {
    font-size: 9px;
  }
  
  .black-key .key-label {
    font-size: 8px;
  }
}
</style>
