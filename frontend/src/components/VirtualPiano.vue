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
  },
  clef: {
    type: String,
    default: 'treble' // 'treble' 或 'bass'
  }
})

// 判断是否使用降号（根据调号）
const useFlats = computed(() => {
  const keySig = getKeySignature(props.keyName)
  return keySig.flats > 0 || props.keyName === 'F'
})

// 白键配置 (C3 到 C6) - 显示3个八度
const whiteKeys = computed(() => [
  { name: 'C3', label: 'C3' },
  { name: 'D3', label: 'D3' },
  { name: 'E3', label: 'E3' },
  { name: 'F3', label: 'F3' },
  { name: 'G3', label: 'G3' },
  { name: 'A3', label: 'A3' },
  { name: 'B3', label: 'B3' },
  { name: 'C4', label: 'C4' },
  { name: 'D4', label: 'D4' },
  { name: 'E4', label: 'E4' },
  { name: 'F4', label: 'F4' },
  { name: 'G4', label: 'G4' },
  { name: 'A4', label: 'A4' },
  { name: 'B4', label: 'B4' },
  { name: 'C5', label: 'C5' },
  { name: 'D5', label: 'D5' },
  { name: 'E5', label: 'E5' },
  { name: 'F5', label: 'F5' },
  { name: 'G5', label: 'G5' },
  { name: 'A5', label: 'A5' },
  { name: 'B5', label: 'B5' },
  { name: 'C6', label: 'C6' }
])

// 黑键配置 (带位置百分比) - 3个八度
// 参考标准钢琴键盘比例：黑键宽度约为白键的70%
// 22个白键，每个占 100/22 ≈ 4.545%
// 黑键宽度设为 3.2%，位置让黑键中心对齐白键缝隙
const whiteKeyWidth = 100 / 22 // 约 4.545%
const blackKeyWidth = 3.2 // 黑键稍宽

const blackKeys = computed(() => [
  // 第3八度黑键
  // C#3 在 C3(索引0) 和 D3(索引1) 中间
  // 白键缝隙位置 = 1 * 白键宽度，黑键左边缘位置 = 缝隙位置 - 黑键宽度/2
  { name: 'C#3', label: 'C#3', position: (1 * whiteKeyWidth) - (blackKeyWidth / 2) },
  // D#3 在 D3(索引1) 和 E3(索引2) 中间
  { name: 'D#3', label: 'Eb3', position: (2 * whiteKeyWidth) - (blackKeyWidth / 2) },
  // F#3 在 F3(索引3) 和 G3(索引4) 中间
  { name: 'F#3', label: 'F#3', position: (4 * whiteKeyWidth) - (blackKeyWidth / 2) },
  // G#3 在 G3(索引4) 和 A3(索引5) 中间
  { name: 'G#3', label: 'Ab3', position: (5 * whiteKeyWidth) - (blackKeyWidth / 2) },
  // A#3 在 A3(索引5) 和 B3(索引6) 中间
  { name: 'A#3', label: 'Bb3', position: (6 * whiteKeyWidth) - (blackKeyWidth / 2) },
  
  // 第4八度黑键
  { name: 'C#4', label: 'C#4', position: (8 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'D#4', label: 'Eb4', position: (9 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'F#4', label: 'F#4', position: (11 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'G#4', label: 'Ab4', position: (12 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'A#4', label: 'Bb4', position: (13 * whiteKeyWidth) - (blackKeyWidth / 2) },
  
  // 第5八度黑键
  { name: 'C#5', label: 'C#5', position: (15 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'D#5', label: 'Eb5', position: (16 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'F#5', label: 'F#5', position: (18 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'G#5', label: 'Ab5', position: (19 * whiteKeyWidth) - (blackKeyWidth / 2) },
  { name: 'A#5', label: 'Bb5', position: (20 * whiteKeyWidth) - (blackKeyWidth / 2) }
])

// 计算当前音阶的音符（包含八度信息）
// 只高亮一个八度：高音谱号高亮第4八度，低音谱号高亮第3八度
const scaleNotesWithOctave = computed(() => {
  const notes = getScaleNotes(props.keyName, props.mode)
  const result = []
  
  // 根据谱号确定高亮的八度
  // 高音谱号: 第4八度 (C4-B4)
  // 低音谱号: 第3八度 (C3-B3)
  const highlightOctave = props.clef === 'treble' ? 4 : 3
  
  // 为每个音阶音符添加八度信息
  let currentOctave = highlightOctave
  let prevLetterIndex = -1
  
  const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  
  notes.forEach((note, index) => {
    const letter = note.charAt(0)
    const letterIndex = noteLetters.indexOf(letter)
    
    // 如果当前音比前一个音低（字母顺序），说明跨八度了
    if (prevLetterIndex !== -1 && letterIndex <= prevLetterIndex && index > 0) {
      currentOctave++
    }
    prevLetterIndex = letterIndex
    
    result.push({
      note: note,
      octave: currentOctave,
      fullName: note + currentOctave,
      isRoot: index === 0
    })
  })
  
  return result
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

// 检查音符是否在音阶中（只高亮一个八度）
function isInScale(noteName) {
  // noteName 格式: "A4", "C#3" 等
  const noteWithoutOctave = noteName.replace(/\d/g, '')
  const octave = parseInt(noteName.match(/\d+/)?.[0])
  
  return scaleNotesWithOctave.value.some(scaleNote => {
    // 只高亮对应八度的音符
    if (scaleNote.octave !== octave) return false
    
    // 比较音符名称（不考虑八度）
    const scaleNoteBase = normalizeNote(scaleNote.note)
    const inputNoteBase = normalizeNote(noteWithoutOctave)
    
    // 检查是否是同一个音（考虑等音）
    const isSameNote = scaleNoteBase === inputNoteBase ||
      // 等音等价
      (scaleNoteBase === 'C#' && inputNoteBase === 'Db') ||
      (scaleNoteBase === 'Db' && inputNoteBase === 'C#') ||
      (scaleNoteBase === 'D#' && inputNoteBase === 'Eb') ||
      (scaleNoteBase === 'Eb' && inputNoteBase === 'D#') ||
      (scaleNoteBase === 'F#' && inputNoteBase === 'Gb') ||
      (scaleNoteBase === 'Gb' && inputNoteBase === 'F#') ||
      (scaleNoteBase === 'G#' && inputNoteBase === 'Ab') ||
      (scaleNoteBase === 'Ab' && inputNoteBase === 'G#') ||
      (scaleNoteBase === 'A#' && inputNoteBase === 'Bb') ||
      (scaleNoteBase === 'Bb' && inputNoteBase === 'A#')
    
    return isSameNote
  })
}

// 检查音符是否是根音（只在一个八度中高亮根音）
function isRoot(noteName) {
  const noteWithoutOctave = noteName.replace(/\d/g, '')
  const octave = parseInt(noteName.match(/\d+/)?.[0])
  const rootNote = scaleNotesWithOctave.value[0]
  
  if (!rootNote) return false
  
  // 只高亮对应八度的根音
  if (rootNote.octave !== octave) return false
  
  const normalizedInput = normalizeNote(noteWithoutOctave)
  const normalizedRoot = normalizeNote(rootNote.note)
  
  return normalizedInput === normalizedRoot
}

// 播放音符
function playNote(note) {
  // 直接播放带八度的音符
  playNoteAudio(note, 0.5)
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
  width: 3.2%;
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
  font-size: 10px;
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
