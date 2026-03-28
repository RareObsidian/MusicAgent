# 钢琴助手 (Piano Assistant)

## 项目简介
这是一个钢琴学习辅助 Web 应用，包含乐理查询、练习计时和统计功能。

## 技术栈
- HTML5
- Tailwind CSS (CDN)
- 原生 JavaScript
- Web Audio API

## 核心功能

### 1. 乐理模块
- 3 种调式：自然大调、自然小调、和声小调
- 虚拟钢琴键盘高亮显示音阶
- 播放按钮播放音阶（Web Audio API）

### 2. 练习计时
- 开始 / 暂停 / 结束
- 练习类型：音阶、曲目、视奏、乐理
- 数据存储：LocalStorage

### 3. 统计面板
- 今日累计时长
- 最近 5 条记录列表

## 文件结构
```
traeWork/
├── index.html      # 单文件完整应用
├── README.md       # 项目简介
├── README-AI.md    # 完整需求文档
└── CLAUDE.md       # 本文件
```

## 开发规范

### 代码风格
- 使用语义化 HTML 标签
- CSS 类名使用 Tailwind 命名规范
- JavaScript 使用 ES6+ 语法

### 音阶数据
```javascript
const scales = {
  major: { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2'] },
  minor: { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'] },
  harmonicMinor: { notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G#', 'A'] }
};
```

### 数据存储格式
```javascript
{
  date: "2026-03-28T10:00:00.000Z",
  duration: 1800,  // 秒
  type: "音阶"
}
```

## 音频频率参考
| 音符 | 频率 (Hz) |
|------|----------|
| C    | 261.6    |
| D    | 293.7    |
| E    | 329.6    |
| F    | 349.2    |
| G    | 392.0    |
| A    | 440.0    |
| B    | 493.9    |
| G#   | 415.3    |

## 开发备忘
- 首次播放音频需要用户交互（点击）
- LocalStorage key: `pianoRecords`
- 移动端需要响应式适配
