# MusicAgent 项目规则

## 1. 文件编码规范

### 1.1 强制要求
- **所有前端文件必须使用 UTF-8 编码（无 BOM）**
- 文件保存时必须保持 UTF-8 编码格式
- 严禁出现乱码字符

### 1.2 适用文件类型
- `.vue` - Vue 单文件组件
- `.js` - JavaScript 文件
- `.ts` - TypeScript 文件
- `.css` - CSS 样式文件
- `.json` - JSON 配置文件
- `.md` - Markdown 文档

### 1.3 编码检查
- VS Code 状态栏应显示 "UTF-8"
- 中文字符必须正常显示，无乱码

---

## 2. 虚拟钢琴键盘组件规范

### 2.1 显示范围
- **白键**: 显示 3 个八度，从 C3 到 C6（共 22 个白键）
- **黑键**: 每个八度 5 个黑键（C#, D#, F#, G#, A#），共 15 个黑键

### 2.2 键盘尺寸比例
```javascript
// 白键宽度计算
const whiteKeyWidth = 100 / 22 // 约 4.545%

// 黑键宽度：约为白键的 70%
const blackKeyWidth = 3.2 // 百分比

// 黑键高度：约为白键的 65%
height: 65%
```

### 2.3 黑键位置规则
**核心原则**: 黑键中心对齐白键缝隙（交界处）

```javascript
// 计算公式
// 白键缝隙位置 = 右边白键索引 × 白键宽度
// 黑键左边缘位置 = 缝隙位置 - (黑键宽度 / 2)

// 示例：C#3 位于 C3(索引0) 和 D3(索引1) 之间
// 缝隙位置 = 1 × 4.545% = 4.545%
// 黑键左边缘 = 4.545% - 1.6% = 2.945%
```

### 2.4 黑键位置表
| 黑键 | 右边白键索引 | 计算公式 | 位置 |
|------|-------------|----------|------|
| C#3 | 1 | (1 × 4.545%) - 1.6% | 2.945% |
| D#3 | 2 | (2 × 4.545%) - 1.6% | 7.49% |
| F#3 | 4 | (4 × 4.545%) - 1.6% | 16.58% |
| G#3 | 5 | (5 × 4.545%) - 1.6% | 21.125% |
| A#3 | 6 | (6 × 4.545%) - 1.6% | 25.67% |
| C#4 | 8 | (8 × 4.545%) - 1.6% | 34.76% |
| D#4 | 9 | (9 × 4.545%) - 1.6% | 39.305% |
| F#4 | 11 | (11 × 4.545%) - 1.6% | 48.395% |
| G#4 | 12 | (12 × 4.545%) - 1.6% | 52.94% |
| A#4 | 13 | (13 × 4.545%) - 1.6% | 57.485% |
| C#5 | 15 | (15 × 4.545%) - 1.6% | 66.575% |
| D#5 | 16 | (16 × 4.545%) - 1.6% | 71.12% |
| F#5 | 18 | (18 × 4.545%) - 1.6% | 80.21% |
| G#5 | 19 | (19 × 4.545%) - 1.6% | 84.755% |
| A#5 | 20 | (20 × 4.545%) - 1.6% | 89.3% |

### 2.5 音阶高亮规则
- **显示范围**: 3 个八度（C3-C6）
- **高亮范围**: 只高亮 1 个八度
  - 高音谱号: 高亮第 4 八度（C4-B4）
  - 低音谱号: 高亮第 3 八度（C3-B3）
- **音阶内音符**: 🟢 绿色高亮
- **根音**: 🟠 橙色高亮

### 2.6 CSS 样式规范
```css
/* 白键 */
.white-key {
  flex: 1;
  background: linear-gradient(to bottom, #fff 0%, #f0f0f0 100%);
  border: 1px solid #ccc;
  border-radius: 0 0 4px 4px;
}

/* 黑键 */
.black-key {
  position: absolute;
  width: 3.2%;  /* 约白键的 70% */
  height: 65%;  /* 比白键短 */
  background: linear-gradient(to bottom, #333 0%, #111 100%);
  border-radius: 0 0 3px 3px;
  z-index: 10;
}

/* 高亮状态 */
.white-key.active {
  background: linear-gradient(to bottom, #a5d6a7 0%, #81c784 100%);
}

.white-key.active.root {
  background: linear-gradient(to bottom, #ffcc80 0%, #ffb74d 100%);
}

.black-key.active {
  background: linear-gradient(to bottom, #388e3c 0%, #2e7d32 100%);
}

.black-key.active.root {
  background: linear-gradient(to bottom, #f57c00 0%, #ef6c00 100%);
}
```

### 2.7 键位标签规范
- **白键标签**: 显示音名 + 八度，如 "C4", "D4"
- **黑键标签**: 显示音名 + 八度，如 "C#4", "Eb4"
- **字体大小**: 白键 10px，黑键 9px

---

## 3. 音频播放规范

### 3.1 频率映射
| 音符 | 频率 (Hz) | 音符 | 频率 (Hz) |
|------|-----------|------|-----------|
| C3 | 130.81 | C4 | 261.63 |
| D3 | 146.83 | D4 | 293.66 |
| E3 | 164.81 | E4 | 329.63 |
| F3 | 174.61 | F4 | 349.23 |
| G3 | 196.00 | G4 | 392.00 |
| A3 | 220.00 | A4 | 440.00 |
| B3 | 246.94 | B4 | 493.88 |
| C4 | 261.63 | C5 | 523.25 |

### 3.2 播放函数
```javascript
// 播放带八度的音符
function playNote(note, duration = 0.5) {
  // note 格式: "C4", "A3", "F#5"
  const frequency = noteFrequencies[note];
  // 使用 Web Audio API 播放
}
```

---

## 4. 文件位置

### 4.1 关键文件
| 文件 | 路径 | 说明 |
|------|------|------|
| VirtualPiano.vue | `frontend/src/components/VirtualPiano.vue` | 虚拟钢琴键盘组件 |
| musicTheory.js | `frontend/src/utils/musicTheory.js` | 音乐理论工具函数 |
| ScaleLearning.vue | `frontend/src/views/ScaleLearning.vue` | 音阶学习页面 |

### 4.2 关键函数
| 函数 | 文件 | 用途 |
|------|------|------|
| `getScaleNotes()` | musicTheory.js | 获取音阶音符列表 |
| `playNote()` | musicTheory.js | 播放指定音符 |
| `isInScale()` | VirtualPiano.vue | 检查音符是否在音阶中 |
| `isRoot()` | VirtualPiano.vue | 检查音符是否为根音 |

---

## 5. 修改记录

| 日期 | 修改内容 | 修改人 |
|------|----------|--------|
| 2026-03-30 | 初始创建钢琴键盘规则 | - |
| 2026-03-30 | 确定黑键宽度为白键的 70% | - |
| 2026-03-30 | 确定黑键中心对齐白键缝隙 | - |
