我来为您压缩这份需求文档，聚焦核心功能，确保2小时内可完成开发。

---

钢琴助手 Web 应用 - 精简需求文档

时间预算: 2小时

技术栈: HTML + Tailwind CSS + 原生 JavaScript

---

1. 核心功能（MVP）

模块	功能点	时间分配	
乐理	3种调式查询（C调固定）	40min	
计时	开始/暂停/结束 + 本地存储	50min	
统计	今日时长 + 历史列表	20min	
UI	响应式布局 + 虚拟键盘	10min	

---

2. 功能规格

2.1 乐理模块
- 固定C调，支持切换：自然大调 / 自然小调 / 和声小调
- 虚拟钢琴键盘高亮显示当前音阶
- 点击播放按钮播放音阶（Web Audio API）

音阶数据：

```
自然大调: C-D-E-F-G-A-B-C
自然小调: A-B-C-D-E-F-G-A  
和声小调: A-B-C-D-E-F-#G-A
```

2.2 练习计时
- 开始/暂停/结束按钮
- 练习类型选择：音阶/曲目/视奏/乐理
- 数据存 LocalStorage，格式：

```json
{
  "date": "2026-03-28",
  "duration": 1800,
  "type": "音阶"
}
```

2.3 统计面板
- 今日累计时长（自动计算）
- 最近5条记录列表

---

3. 页面结构（单页应用）

```
┌─────────────────────────────┐
│      🎹 钢琴助手             │
├─────────────────────────────┤
│  [乐理]  [练习]  [统计]      │  ← Tab切换
├─────────────────────────────┤
│                             │
│      内容区域               │
│                             │
└─────────────────────────────┘
```

---

4. 关键代码片段

4.1 音频播放（简化版）

```javascript
const ctx = new AudioContext();
const notes = {'C':261.6,'D':293.7,'E':329.6,'F':349.2,'G':392.0,'A':440,'B':493.9,'#G':830.6};

function playTone(freq, duration = 0.5) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}
```

4.2 计时器核心

```javascript
let startTime, elapsed = 0, timerId;

function start() {
  startTime = Date.now() - elapsed;
  timerId = setInterval(() => {
    elapsed = Date.now() - startTime;
    display(elapsed);
  }, 1000);
}

function pause() {
  clearInterval(timerId);
}

function save() {
  const records = JSON.parse(localStorage.getItem('records') || '[]');
  records.push({date: new Date().toISOString(), duration: elapsed, type: currentType});
  localStorage.setItem('records', JSON.stringify(records));
}
```

---

5. 文件结构

```
piano-assistant/
├── index.html      # 单文件完整应用
├── style.css       # Tailwind CDN + 自定义样式
└── app.js          # 所有逻辑
```

---

6. 验收标准（2小时截止线）

- 三种调式可切换，键盘高亮正确
- 计时器能正常开始/暂停/保存
- 数据刷新不丢失
- 手机端可正常使用

明确不做（保时间）：
- 五线谱渲染
- 云端同步
- 图表统计
- PWA配置
- 多调号支持

---

需要我直接生成可运行的单文件代码吗？