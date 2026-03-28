<template>
  <div class="score-renderer">
    <div ref="scoreContainer" class="score-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import VexFlow from 'vexflow'
import { getVexFlowNotes, getKeySignature } from '../utils/musicTheory.js'

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
    default: 'treble'
  }
})

const scoreContainer = ref(null)
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = VexFlow.Flow

// 调名映射到 VexFlow 格式
const keySignatureMap = {
  'C': 'C',
  'C#': 'C#',
  'D': 'D',
  'Eb': 'Eb',
  'E': 'E',
  'F': 'F',
  'F#': 'F#',
  'G': 'G',
  'Ab': 'Ab',
  'A': 'A',
  'Bb': 'Bb',
  'B': 'B'
}

function renderScore() {
  if (!scoreContainer.value) return
  
  // 清空容器
  scoreContainer.value.innerHTML = ''
  
  // 获取音阶音符
  const scaleNotes = getVexFlowNotes(props.keyName, props.mode, props.clef === 'treble' ? 4 : 3)
  
  if (scaleNotes.length === 0) return
  
  try {
    // 创建渲染器
    const renderer = new Renderer(scoreContainer.value, Renderer.Backends.SVG)
    
    // 设置画布大小
    const width = 800
    const height = 200
    renderer.resize(width, height)
    
    const context = renderer.getContext()
    
    // 创建谱表
    const staveX = 10
    const staveY = 20
    const staveWidth = width - 20
    
    const stave = new Stave(staveX, staveY, staveWidth)
    
    // 添加谱号
    stave.addClef(props.clef)
    
    // 添加调号
    const vexKey = keySignatureMap[props.keyName] || 'C'
    stave.addKeySignature(vexKey)
    
    stave.setContext(context).draw()
    
    // 创建音符
    const notes = scaleNotes.map((noteData) => {
      const staveNote = new StaveNote({
        clef: props.clef,
        keys: [noteData.vexFlowNote],
        duration: 'q',
        auto_stem: true
      })
      
      // 检查是否需要添加临时升降号
      if (noteData.isSharp || noteData.isFlat) {
        const needsAccidental = !isAccidentalInKeySignature(noteData.note, props.keyName)
        if (needsAccidental) {
          const accidental = noteData.isSharp ? '#' : 'b'
          staveNote.addModifier(new Accidental(accidental), 0)
        }
      }
      
      return staveNote
    })
    
    // 创建声部
    const voice = new Voice({
      num_beats: notes.length,
      beat_value: 4
    })
    
    voice.addTickables(notes)
    
    // 格式化并绘制
    const formatter = new Formatter().joinVoices([voice]).format([voice], staveWidth - 100)
    
    voice.draw(context, stave)
  } catch (error) {
    console.error('Error rendering score:', error)
    scoreContainer.value.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">五线谱渲染出错</p>'
  }
}

// 检查音符的升降号是否在调号中已经存在
function isAccidentalInKeySignature(note, key) {
  const keySig = getKeySignature(key)
  
  // 升号调的顺序: F#, C#, G#, D#, A#, E#, B#
  const sharpOrder = ['F', 'C', 'G', 'D', 'A', 'E', 'B']
  // 降号调的顺序: Bb, Eb, Ab, Db, Gb, Cb, Fb
  const flatOrder = ['B', 'E', 'A', 'D', 'G', 'C', 'F']
  
  const baseNote = note.replace(/[#b]/g, '')
  
  if (keySig.sharps > 0) {
    const sharpNotes = sharpOrder.slice(0, keySig.sharps)
    return sharpNotes.includes(baseNote) && note.includes('#')
  } else if (keySig.flats > 0) {
    const flatNotes = flatOrder.slice(0, keySig.flats)
    return flatNotes.includes(baseNote) && note.includes('b')
  }
  
  return false
}

onMounted(() => {
  nextTick(() => {
    renderScore()
  })
})

watch(() => [props.keyName, props.mode, props.clef], () => {
  nextTick(() => {
    renderScore()
  })
}, { deep: true })
</script>

<style scoped>
.score-renderer {
  width: 100%;
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  padding: 10px;
}

.score-container {
  min-width: 800px;
  min-height: 150px;
}

:deep(svg) {
  display: block;
  margin: 0 auto;
}
</style>
