# 音乐学习应用 - 技术规格文档

## 1. 项目概述

### 1.1 项目目标
开发一个基于 Vue 3 + VexFlow 的音乐学习辅助应用，帮助用户学习自然大小调音阶、管理练习时间并追踪学习进度。

### 1.2 核心功能
- **板块1**: 自然大小调音阶学习（五线谱从 A3 开始计算）
- **板块2**: 番茄钟专注计时
- **板块3**: 学习数据统计与可视化

## 2. 技术架构

### 2.1 技术栈
| 类别 | 技术 | 版本 |
|------|------|------|
| 前端框架 | Vue 3 | ^3.3.0 |
| 构建工具 | Vite | ^4.4.0 |
| 音乐渲染 | VexFlow | ^4.0.0 |
| 图表库 | ECharts | ^5.4.0 |
| 状态管理 | Pinia | ^2.1.0 |
| UI组件 | Element Plus | ^2.3.0 |
| 路由 | Vue Router | ^4.2.0 |

### 2.2 项目结构
```
src/
├── components/           # 公共组件
│   ├── common/          # 通用组件
│   │   ├── VexFlowStaff.vue    # 五线谱组件
│   │   ├── ScaleSelector.vue   # 调性选择器
│   │   └── ModeToggle.vue      # 大小调切换
│   └── layout/          # 布局组件
│       ├── AppHeader.vue       # 顶部导航
│       └── AppLayout.vue       # 页面布局
├── views/               # 页面视图
│   ├── ScaleLearning/   # 板块1: 自然大小调音阶
│   │   ├── ScaleDisplay.vue    # 音阶展示
│   │   ├── ScalePractice.vue   # 练习模式
│   │   └── index.vue           # 主页面
│   ├── Pomodoro/        # 板块2: 番茄钟
│   │   ├── TimerDisplay.vue    # 计时器显示
│   │   ├── TimerControls.vue   # 控制按钮
│   │   └── index.vue           # 主页面
│   └── Statistics/      # 板块3: 数据统计
│       ├── StatsCards.vue      # 统计卡片
│       ├── PracticeChart.vue   # 练习图表
│       └── index.vue           # 主页面
├── stores/              # Pinia状态管理
│   ├── scaleStore.js    # 音阶学习状态
│   ├── pomodoroStore.js # 番茄钟状态
│   └── statsStore.js    # 数据统计状态
├── utils/               # 工具函数
│   ├── musicTheory.js   # 音乐理论相关
│   ├── audioPlayer.js   # 音频播放
│   └── storage.js       # 本地存储封装
├── composables/         # 组合式函数
│   ├── useVexFlow.js    # VexFlow封装
│   └── useAudio.js      # 音频封装
├── assets/              # 静态资源
└── App.vue              # 根组件
```

## 3. 核心功能规格

### 3.1 板块1: 自然大小调音阶

#### 3.1.1 五线谱规格
- **起始音**: A3 (五线谱下加一线的A音)
- **音域范围**: A3 - A5 (覆盖两个八度)
- **谱号**: 高音谱号 (Treble Clef / G Clef)
- **显示音阶**: 一个八度的自然音阶 (8个音符)

#### 3.1.2 音阶数据模型
```javascript
// 音阶定义
const SCALES = {
  major: {
    intervals: [0, 2, 4, 5, 7, 9, 11, 12],  // 全全半全全全半
    pattern: 'W-W-H-W-W-W-H'
  },
  minor: {
    intervals: [0, 2, 3, 5, 7, 8, 10, 12],  // 全半全全半全全
    pattern: 'W-H-W-W-H-W-W'
  }
};

// 12个调性
const KEYS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'F', 'Bb', 'Eb', 'Ab'];

// 音符名称 (从A3开始)
const NOTE_NAMES = ['A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 
                    'A4', 'A#4', 'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5'];
```

#### 3.1.3 VexFlow渲染规格
```javascript
// 五线谱配置
const STAFF_CONFIG = {
  clef: 'treble',           // 高音谱号
  startNote: 'A/3',         // 从A3开始
  width: 500,               // 谱表宽度
  height: 150,              // 谱表高度
  staveX: 10,               // 谱表X位置
  staveY: 40,               // 谱表Y位置
  noteSpacing: 60           // 音符间距
};

// 音符映射 (科学音高记谱法 -> VexFlow格式)
const NOTE_MAPPING = {
  'A3': 'a/3', 'A#3': 'a#/3', 'Bb3': 'bb/3',
  'B3': 'b/3',
  'C4': 'c/4', 'C#4': 'c#/4', 'Db4': 'db/4',
  'D4': 'd/4', 'D#4': 'd#/4', 'Eb4': 'eb/4',
  'E4': 'e/4',
  'F4': 'f/4', 'F#4': 'f#/4', 'Gb4': 'gb/4',
  'G4': 'g/4', 'G#4': 'g#/4', 'Ab4': 'ab/4',
  'A4': 'a/4', 'A#4': 'a#/4', 'Bb4': 'bb/4',
  'B4': 'b/4',
  'C5': 'c/5', 'C#5': 'c#/5', 'Db5': 'db/5',
  'D5': 'd/5', 'D#5': 'd#/5', 'Eb5': 'eb/5',
  'E5': 'e/5',
  'F5': 'f/5', 'F#5': 'f#/5', 'Gb5': 'gb/5',
  'G5': 'g/5', 'G#5': 'g#/5', 'Ab5': 'ab/5',
  'A5': 'a/5'
};
```

#### 3.1.4 功能规格
| 功能 | 描述 | 优先级 |
|------|------|--------|
| 调性选择 | 下拉选择12个调性 | P0 |
| 模式切换 | 大调/小调切换按钮 | P0 |
| 五线谱渲染 | 使用VexFlow渲染音阶 | P0 |
| 音符播放 | 点击音符播放对应音高 | P1 |
| 音阶播放 | 顺序播放整个音阶 | P1 |
| 练习模式 | 随机显示音符让用户识别 | P2 |
| 显示音名 | 切换显示/隐藏音符名称 | P1 |
| 显示唱名 | 切换显示/隐藏唱名(do/re/mi) | P2 |

### 3.2 板块2: 番茄钟

#### 3.2.1 计时器规格
```javascript
// 默认配置
const POMODORO_DEFAULTS = {
  focusDuration: 25,        // 专注时长(分钟)
  breakDuration: 5,         // 休息时长(分钟)
  longBreakDuration: 15,    // 长休息时长(分钟)
  longBreakInterval: 4      // 几个番茄后长休息
};

// 计时器状态
const TIMER_STATES = {
  IDLE: 'idle',             // 空闲
  FOCUSING: 'focusing',     // 专注中
  BREAKING: 'breaking',     // 休息中
  PAUSED: 'paused'          // 暂停
};
```

#### 3.2.2 功能规格
| 功能 | 描述 | 优先级 |
|------|------|--------|
| 圆形进度条 | 显示剩余时间进度 | P0 |
| 时间显示 | 显示剩余分钟和秒 | P0 |
| 开始/暂停 | 控制计时器启停 | P0 |
| 重置 | 重置当前计时 | P0 |
| 时长配置 | 自定义专注/休息时长 | P1 |
| 完成提醒 | 声音+浏览器通知 | P1 |
| 自动切换 | 完成后自动进入下一阶段 | P2 |
| 今日统计 | 显示今日专注次数和时长 | P1 |

### 3.3 板块3: 数据统计

#### 3.3.1 数据模型
```javascript
// 练习记录
const PRACTICE_RECORD = {
  id: String,               // UUID
  date: Date,               // 日期
  scaleKey: String,         // 练习的调性
  mode: String,             // 模式(major/minor)
  duration: Number,         // 练习时长(分钟)
  completed: Boolean        // 是否完成
};

// 番茄钟记录
const POMODORO_RECORD = {
  id: String,
  startTime: Date,
  endTime: Date,
  duration: Number,         // 实际专注时长
  completed: Boolean,
  type: 'focus' | 'break' | 'longBreak'
};

// 统计数据
const STATISTICS = {
  totalPracticeTime: Number,      // 总练习时长
  totalPomodoroSessions: Number,  // 总番茄钟次数
  currentStreak: Number,          // 当前连续天数
  longestStreak: Number,          // 最长连续天数
  scaleProgress: Object,          // 各调性掌握度
  dailyStats: Array               // 每日统计数据
};
```

#### 3.3.2 图表规格
| 图表 | 类型 | 数据 | 优先级 |
|------|------|------|--------|
| 练习时长趋势 | 折线图 | 近7天/30天练习时长 | P0 |
| 音阶掌握度 | 雷达图 | 12个调性的练习次数 | P1 |
| 番茄钟统计 | 柱状图 | 近7天完成次数 | P1 |
| 时间分布 | 饼图 | 各板块时间占比 | P2 |

## 4. 接口规格

### 4.1 音乐理论工具 (musicTheory.js)
```javascript
// 获取音阶音符
function getScaleNotes(key, mode, startOctave = 3) {
  // 返回从指定八度开始的音阶音符数组
  // 例如: getScaleNotes('C', 'major', 3) 
  // 返回: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
}

// 获取调号升降号数量
function getKeySignature(key, mode) {
  // 返回升降号数量和类型(sharp/flat)
}

// 音符转频率
function noteToFrequency(note) {
  // 例如: 'A4' -> 440
}

// 获取音符在VexFlow中的表示
function toVexFlowNote(note) {
  // 例如: 'C4' -> 'c/4'
}
```

### 4.2 VexFlow封装 (useVexFlow.js)
```javascript
// 渲染五线谱
function renderStaff(container, notes, options) {
  // container: DOM元素
  // notes: 音符数组 ['c/4', 'd/4', ...]
  // options: 配置选项
}

// 渲染调号
function renderKeySignature(stave, key, mode) {
  // 在谱表上渲染调号
}

// 渲染音符
function renderNotes(context, stave, notes) {
  // 在谱表上渲染音符
}
```

## 5. 存储规格

### 5.1 LocalStorage键名
```javascript
const STORAGE_KEYS = {
  PRACTICE_RECORDS: 'music_practice_records',    // 练习记录
  POMODORO_RECORDS: 'music_pomodoro_records',    // 番茄钟记录
  SETTINGS: 'music_app_settings',                // 用户设置
  SCALE_PROGRESS: 'music_scale_progress'         // 音阶学习进度
};
```

### 5.2 数据备份与导出
- 支持导出JSON格式的学习数据
- 支持导入备份数据

## 6. 性能规格

### 6.1 渲染性能
- 五线谱渲染时间 < 100ms
- 图表渲染时间 < 200ms
- 页面切换动画流畅(60fps)

### 6.2 存储限制
- 单条记录大小 < 1KB
- 总存储数据 < 5MB (LocalStorage限制)
- 定期清理超过1年的旧数据

## 7. 兼容性规格

### 7.1 浏览器支持
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 7.2 响应式断点
```javascript
const BREAKPOINTS = {
  mobile: 768,      // 手机
  tablet: 1024,     // 平板
  desktop: 1280     // 桌面
};
```

## 8. 更新记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-03-28 | 初始版本，明确五线谱从A3开始计算 |
