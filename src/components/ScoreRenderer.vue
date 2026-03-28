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

function renderScore() {
  if (!scoreContainer.value) return
  
  // ???????
  scoreContainer.value.innerHTML = ''
  
  // ???????????
  const scaleNotes = getVexFlowNotes(props.keyName, props.mode, props.clef === 'treble' ? 4 : 3)
  
  if (scaleNotes.length === 0) return
  
  try {
    // ?????????
    const renderer = new Renderer(scoreContainer.value, Renderer.Backends.SVG)
    
    // ?????????§³
    const width = 800
    const height = 200
    renderer.resize(width, height)
    
    const context = renderer.getContext()
    
    // ???????
    const staveX = 10
    const staveY = 20
    const staveWidth = width - 20
    
    const stave = new Stave(staveX, staveY, staveWidth)
    
    // ??????????????????
    stave.addClef(props.clef)
    
    stave.setContext(context).draw()
    
    // ??????????
    const keySig = getKeySignature(props.keyName)
    
    // ????????
    const notes = scaleNotes.map((noteData) => {
      const staveNote = new StaveNote({
        clef: props.clef,
        keys: [noteData.vexFlowNote],
        duration: 'q',
        auto_stem: true
      })
      
      // ????????????????????????????????
      if (noteData.isSharp) {
        staveNote.addModifier(new Accidental('#'), 0)
      } else if (noteData.isFlat) {
        staveNote.addModifier(new Accidental('b'), 0)
      }
      
      return staveNote
    })
    
    // ????????
    const voice = new Voice({
      num_beats: notes.length,
      beat_value: 4
    })
    
    voice.addTickables(notes)
    
    // ???????????
    const formatter = new Formatter().joinVoices([voice]).format([voice], staveWidth - 100)
    
    voice.draw(context, stave)
  } catch (error) {
    console.error('Error rendering score:', error)
    scoreContainer.value.innerHTML = '<p style="color: red; text-align: center; padding: 20px;">?????????????</p>'
  }
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
