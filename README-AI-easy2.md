我来更新需求文档，加入 VexFlow 五线谱渲染，同时保持2小时时间预算。

---

钢琴助手 Web 应用 - 精简需求文档

时间预算: 2小时

技术栈: HTML + Tailwind CSS + 原生 JavaScript + VexFlow

---

1. 核心功能

模块	功能点	时间分配	
乐理	3种调式 + VexFlow五线谱 + 虚拟键盘	50min	
计时	开始/暂停/结束 + 本地存储	40min	
统计	今日时长 + 历史列表	20min	
UI	响应式布局	10min	

---

2. 功能规格

2.1 乐理模块
- 固定C调，切换：自然大调 / 自然小调 / 和声小调
- VexFlow渲染五线谱（含升降号）
- 虚拟钢琴键盘高亮
- 播放按钮（Web Audio API）

音阶数据：

```
自然大调: C-D-E-F-G-A-B-C
自然小调: A-B-C-D-E-F-G-A  
和声小调: A-B-C-D-E-F-#G-A
```

2.2 VexFlow实现要点

```javascript
// 初始化
const VF = Vex.Flow;
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
const context = renderer.getContext();

// 绘制五线谱
const stave = new VF.Stave(10, 40, 400);
stave.addClef("treble").addKeySignature("C").setContext(context).draw();

// 绘制音符
const notes = [
  new VF.StaveNote({clef: "treble", keys: ["c/4"], duration: "q" }),
  // ... 其他音符
];
VF.Formatter.FormatAndDraw(context, stave, notes);
```

2.3 练习计时
- 开始/暂停/结束
- 类型选择：音阶/曲目/视奏/乐理
- LocalStorage存储

2.4 统计面板
- 今日累计时长
- 最近5条记录

---

3. 依赖（CDN）

```html
<!-- Tailwind -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- VexFlow -->
<script src="https://unpkg.com/vexflow/releases/vexflow-min.js"></script>
```

---

4. 验收标准

- VexFlow五线谱正确渲染当前音阶
- 和声小调显示升号（#G）
- 三种调式切换流畅
- 计时器功能完整
- 数据本地持久化

---

需要我生成完整可运行的代码吗？