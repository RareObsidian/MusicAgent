// 音乐理论工具模块

// 音符频率映射（用于播放）- 包含 C3-C6 所有音符
export const noteFrequencies = {
  // 第3八度
  'C3': 130.81, 'C#3': 138.59, 'Db3': 138.59,
  'D3': 146.83, 'D#3': 155.56, 'Eb3': 155.56,
  'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'Gb3': 185.00,
  'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65,
  'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08,
  'B3': 246.94,
  // 第4八度（中央C）
  'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18,
  'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13,
  'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99,
  'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30,
  'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16,
  'B4': 493.88,
  // 第5八度
  'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37,
  'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25,
  'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99,
  'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61,
  'A5': 880.00, 'A#5': 932.33, 'Bb5': 932.33,
  'B5': 987.77,
  // 第6八度
  'C6': 1046.50, 'C#6': 1108.73, 'Db6': 1108.73,
  'D6': 1174.66, 'D#6': 1244.51, 'Eb6': 1244.51,
  'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98, 'Gb6': 1479.98,
  'G6': 1567.98, 'G#6': 1661.22, 'Ab6': 1661.22,
  'A6': 1760.00, 'A#6': 1864.66, 'Bb6': 1864.66,
  'B6': 1975.53,
  // 保持向后兼容的无八度音符（默认C4）
  'C': 261.63, 'C#': 277.18, 'Db': 277.18,
  'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
  'E': 329.63, 'E#': 349.23, 'Fb': 329.63,
  'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
  'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
  'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
  'B': 493.88, 'B#': 523.25, 'Cb': 493.88
}

// 所有调性（按半音顺序排列）
export const allKeys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B']

// 调号升降号数量
export const keySignatures = {
  'C': { sharps: 0, flats: 0 },
  'C#': { sharps: 7, flats: 0 },
  'D': { sharps: 2, flats: 0 },
  'Eb': { sharps: 0, flats: 3 },
  'E': { sharps: 4, flats: 0 },
  'F': { sharps: 0, flats: 1 },
  'F#': { sharps: 6, flats: 0 },
  'G': { sharps: 1, flats: 0 },
  'Ab': { sharps: 0, flats: 4 },
  'A': { sharps: 3, flats: 0 },
  'Bb': { sharps: 0, flats: 2 },
  'B': { sharps: 5, flats: 0 },
  'Db': { sharps: 0, flats: 5 },
  'Gb': { sharps: 0, flats: 6 },
  'Cb': { sharps: 0, flats: 7 }
}

// 音阶音程模式（半音数）
const scalePatterns = {
  major: [0, 2, 4, 5, 7, 9, 11, 12],      // 自然大调: 全全半全全全半
  minor: [0, 2, 3, 5, 7, 8, 10, 12],      // 自然小调: 全半全全半全全
  harmonic: [0, 2, 3, 5, 7, 8, 11, 12],   // 和声小调: 全半全全半增二半
  melodic: [0, 2, 3, 5, 7, 9, 11, 12]     // 旋律小调（上行）: 全半全全全全半
}

// 音名字母序列（用于计算音阶）
const noteLetters = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

// 获取音阶的字母名称（不考虑升降号）
function getScaleLetterNames(rootKey) {
  const rootLetter = rootKey.charAt(0)
  const startIndex = noteLetters.indexOf(rootLetter)
  
  const result = []
  for (let i = 0; i < 8; i++) {
    const letterIndex = (startIndex + i) % 7
    result.push(noteLetters[letterIndex])
  }
  return result
}

// 获取音符的半音位置（C=0, C#/Db=1, ...）
function getSemitone(note) {
  const baseNote = note.charAt(0)
  const baseIndex = noteLetters.indexOf(baseNote) * 2
  
  // 调整音名字母对应的半音位置
  const letterSemitones = [0, 2, 4, 5, 7, 9, 11] // C, D, E, F, G, A, B
  let semitone = letterSemitones[noteLetters.indexOf(baseNote)]
  
  // 处理升降号
  if (note.includes('#')) {
    semitone += 1
  } else if (note.includes('b')) {
    semitone -= 1
  }
  
  return (semitone + 12) % 12
}

// 获取音阶音符（使用正确的升降号）
export function getScaleNotes(key, mode = 'major') {
  const pattern = scalePatterns[mode]
  if (!pattern) return []
  
  // 判断是升号调还是降号调
  const keySig = keySignatures[key]
  const useFlats = keySig.flats > 0 || (key === 'F')
  
  // 获取根音的半音位置
  const rootSemitone = getSemitone(key)
  
  // 获取音阶的字母名称
  const letterNames = getScaleLetterNames(key)
  
  // 构建音阶
  return pattern.map((interval, index) => {
    const targetSemitone = (rootSemitone + interval) % 12
    const letter = letterNames[index]
    
    // 计算该字母的基础半音位置
    const letterIndex = noteLetters.indexOf(letter)
    const letterSemitones = [0, 2, 4, 5, 7, 9, 11]
    const baseSemitone = letterSemitones[letterIndex]
    
    // 计算需要的升降号
    let diff = (targetSemitone - baseSemitone + 12) % 12
    if (diff > 6) diff -= 12
    
    if (diff === 0) {
      return letter
    } else if (diff === 1) {
      return useFlats && letter !== 'B' && letter !== 'E' ? 
        noteLetters[(letterIndex + 1) % 7] + 'b' : letter + '#'
    } else if (diff === -1) {
      return letter + 'b'
    } else if (diff === 2) {
      return letter + '##'
    } else if (diff === -2) {
      return letter + 'bb'
    }
    
    return letter
  })
}

// 获取调号信息
export function getKeySignature(key) {
  return keySignatures[key] || { sharps: 0, flats: 0 }
}

// 获取VexFlow格式的音阶音符（包含八度信息）
export function getVexFlowNotes(key, mode = 'major', octave = 4) {
  const notes = getScaleNotes(key, mode)
  
  // 音名到VexFlow格式的映射
  const vexFlowMap = {
    'C': 'c', 'C#': 'c#', 'Db': 'db',
    'D': 'd', 'D#': 'd#', 'Eb': 'eb',
    'E': 'e', 'E#': 'e#', 'Eb': 'eb', 'Fb': 'e',
    'F': 'f', 'F#': 'f#', 'Gb': 'gb',
    'G': 'g', 'G#': 'g#', 'Ab': 'ab',
    'A': 'a', 'A#': 'a#', 'Bb': 'bb',
    'B': 'b', 'B#': 'b#', 'Cb': 'cb'
  }
  
  let currentOctave = octave
  let prevLetterIndex = -1
  
  return notes.map((note, index) => {
    const letter = note.charAt(0)
    const letterIndex = noteLetters.indexOf(letter)
    
    // 如果当前音比前一个音低（字母顺序），说明跨八度了
    if (prevLetterIndex !== -1 && letterIndex <= prevLetterIndex && index > 0) {
      currentOctave++
    }
    prevLetterIndex = letterIndex
    
    const vexNote = vexFlowMap[note] || note.toLowerCase()
    return {
      note: note,
      vexFlowNote: `${vexNote}/${currentOctave}`,
      octave: currentOctave,
      isSharp: note.includes('#'),
      isFlat: note.includes('b')
    }
  })
}

// 播放音符（使用Web Audio API）
// note: 可以是带八度的音符（如'C4'）或不带八度的音符（如'C'）
// octave: 可选，当note不带八度时指定八度（3, 4, 5）
export function playNote(note, duration = 0.5, octave = null) {
  // 检查note是否已包含八度信息
  const hasOctave = /\d/.test(note)
  let fullNote = note
  
  if (!hasOctave && octave) {
    fullNote = note + octave
  }
  
  // 标准化音符名称用于查找频率
  let normalizedNote = fullNote
  if (fullNote.startsWith('B#')) normalizedNote = fullNote.replace('B#', 'C')
  if (fullNote.startsWith('Cb')) normalizedNote = fullNote.replace('Cb', 'B')
  if (fullNote.startsWith('E#')) normalizedNote = fullNote.replace('E#', 'F')
  if (fullNote.startsWith('Fb')) normalizedNote = fullNote.replace('Fb', 'E')
  
  let frequency = noteFrequencies[normalizedNote]
  
  // 如果没找到带八度的频率，尝试使用默认八度
  if (!frequency && !hasOctave) {
    frequency = noteFrequencies[note]
  }
  
  if (!frequency) {
    console.warn('Unknown note:', fullNote, 'normalized:', normalizedNote)
    return
  }
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = 'sine'
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

// 播放整个音阶
export function playScale(notes, noteDuration = 0.5) {
  notes.forEach((noteData, index) => {
    setTimeout(() => {
      // 使用带八度的完整音符名称播放
      const fullNote = noteData.octave ? `${noteData.note}${noteData.octave}` : noteData.note
      playNote(fullNote, noteDuration)
    }, index * noteDuration * 1000)
  })
}

// 获取模式名称
export function getModeName(mode) {
  const names = {
    major: '自然大调',
    minor: '自然小调',
    harmonic: '和声小调',
    melodic: '旋律小调'
  }
  return names[mode] || mode
}
