# DataCanvasLab 一键构建提示词

> 将下方「提示词正文」整段复制给 AI（Agent 模式），AI 将按计划从零搭建项目并打开浏览器展示大屏。

---

## 提示词正文（复制以下内容）

```markdown
# 角色定义

你是一位资深**数据可视化大屏架构师**兼**前端工程专家**，精通 Vue 3、TypeScript、ECharts、模块化架构、Mock 数据层设计、日志系统与前端测试。你正在为一个开源教学项目 **DataCanvasLab（如意数据大屏）** 进行从 0 到 1 的完整搭建。

你的目标是：**自主完成全部开发工作**，最终在浏览器中呈现一个**漂亮、可运行、架构规范**的数据可视化大屏页面，并自动打开浏览器供用户验收。

---

# 项目背景

- **英文名：** DataCanvasLab
- **中文名：** 如意数据大屏
- **仓库路径：** `f:\Production_Internship\DataCanvasLab`（若不存在则创建；若已有 README/LICENSE 则保留并在此基础上扩展）
- **定位：** 公开教学项目，帮助学习者从 0 到 1 理解数据可视化大屏的实现方式
- **当前阶段：** 纯前端实现，数据使用 Mock，但架构必须支持后期无缝切换真实 API

---

# 硬性要求（必须全部满足）

1. **纯前端**：不依赖后端服务，Mock 数据本地运行
2. **Mock → API 可切换**：使用 Adapter / Repository 模式，组件层不得直接调用 axios
3. **模块化**：严禁把所有代码堆在一个文件；按职责分层、分模块
4. **日志系统**：实现分级日志（debug/info/warn/error），开发环境控制台输出 + 大屏内「系统日志」面板展示
5. **测试**：至少包含 Logger、Adapter、核心 utils 的单元测试（Vitest）
6. **代码质量**：ESLint + Prettier + TypeScript strict，配置 Husky + lint-staged（可选但推荐）
7. **最终验收**：开发完成后启动 dev server，**自动打开浏览器**，展示完整大屏页面
8. **只做必要范围**：不过度设计，但架构要可扩展；不写与本次无关的功能

---

# 技术栈（固定采用方案一）

| 类别 | 选型 |
|------|------|
| 框架 | Vue 3 + Composition API + `<script setup>` |
| 构建 | Vite |
| 语言 | TypeScript（strict 模式） |
| 图表 | ECharts 5 + vue-echarts |
| 状态 | Pinia |
| 样式 | SCSS + CSS 变量（支持主题色） |
| 请求封装 | Axios（仅出现在 api 层） |
| Mock | MSW 或 vite-plugin-mock（二选一，推荐 MSW） |
| 测试 | Vitest |
| 质量 | ESLint + Prettier |

---

# 目标大屏内容（第一版 MVP）

实现一个 **「智慧城市运营监控大屏」** 主题，包含以下区块（数据全部 Mock，带合理波动与定时刷新）：

## 布局（1920×1080 设计稿，响应式缩放适配）

```
┌──────────────────────────────────────────────────────────────┐
│  顶部：项目标题「如意数据大屏 DataCanvasLab」+ 实时时钟 + 天气 │
├────────────┬─────────────────────────────┬───────────────────┤
│  左侧面板   │         中央主视觉区           │    右侧面板        │
│  · KPI 卡片 │    · 地图/区域热力 或 核心趋势大图  │  · 排行榜 Top5    │
│  · 饼图     │                             │  · 折线图          │
│  · 柱状图   │                             │  · 告警列表        │
├────────────┴─────────────────────────────┴───────────────────┤
│  底部：实时数据滚动条 + 系统日志面板（展示 logger 输出）        │
└──────────────────────────────────────────────────────────────┘
```

## 至少包含的图表/组件（每个独立文件）

- `KpiCard` — 数字翻牌 / 渐变高亮 KPI
- `LineChart` — 折线趋势图（24 小时数据）
- `BarChart` — 柱状对比图
- `PieChart` — 占比饼图
- `RankList` — Top5 排行榜
- `AlertList` — 告警滚动列表
- `LogPanel` — 系统日志面板（订阅 logger）
- `ScreenHeader` — 大屏顶部标题栏
- `ScreenLayout` — 整体栅格布局容器

## 视觉风格要求（必须「漂亮」）

- **深色科技风**：背景 `#0a1628` ~ `#0d1f3c` 渐变，带微弱网格或粒子感
- **主色：** 青色 `#00d4ff` + 蓝色 `#3b82f6` + 点缀金 `#fbbf24`
- **面板：** 半透明玻璃态（backdrop-filter）、细边框发光、圆角 8px
- **字体：** 数字用等宽/科技感字体（可用 Google Fonts: Orbitron / Rajdhani）
- **动效：** 卡片 hover 微光、图表加载动画、告警列表无缝滚动
- **禁止：** 纯白背景、默认 Bootstrap 风格、图表使用 ECharts 默认配色不改

---

# 目录结构（必须遵守）

在 `DataCanvasLab/` 下创建如下结构（可根据实际需要微调，但分层原则不可破坏）：

```
DataCanvasLab/
├── public/
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── app/
│   │   └── router.ts              # 如仅单页可简化
│   ├── layouts/
│   │   └── ScreenLayout.vue       # 大屏整体布局
│   ├── views/
│   │   └── DashboardView.vue      # 大屏主页面（只做组装，不写业务逻辑）
│   ├── modules/
│   │   ├── overview/              # 概览 KPI 模块
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   ├── traffic/               # 流量/趋势模块
│   │   ├── ranking/               # 排行榜模块
│   │   └── alert/                 # 告警模块
│   ├── components/                # 通用 UI（PanelBox、SectionTitle）
│   ├── charts/                    # ECharts 封装（每个图表一个文件）
│   │   ├── BaseChart.vue
│   │   ├── LineChart.vue
│   │   ├── BarChart.vue
│   │   └── PieChart.vue
│   ├── services/                  # 业务服务（调用 adapter，供 store/composable 使用）
│   ├── api/
│   │   ├── client.ts              # Axios 实例 + 拦截器（含日志）
│   │   ├── adapters/
│   │   │   ├── types.ts           # Adapter 接口定义
│   │   │   ├── mock.adapter.ts    # Mock 实现
│   │   │   └── http.adapter.ts    # 真实 API 实现（可先留 stub）
│   │   └── index.ts               # createAdapter 工厂
│   ├── mock/
│   │   ├── data/                  # Mock 静态数据
│   │   └── handlers.ts            # MSW handlers（若用 MSW）
│   ├── stores/
│   │   └── dashboard.store.ts
│   ├── composables/
│   │   ├── usePolling.ts          # 定时刷新
│   │   └── useScreenScale.ts      # 大屏缩放适配
│   ├── core/
│   │   ├── logger/
│   │   │   ├── index.ts           # Logger 主类
│   │   │   ├── types.ts
│   │   │   ├── transports/
│   │   │   │   ├── console.transport.ts
│   │   │   │   └── memory.transport.ts  # 供 LogPanel 读取
│   │   │   └── index.test.ts
│   │   └── config/
│   │       └── env.ts             # VITE_USE_MOCK 等
│   ├── styles/
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   └── global.scss
│   └── utils/
├── tests/
├── .env.development               # VITE_USE_MOCK=true
├── .env.production                # VITE_USE_MOCK=false
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── vitest.config.ts
├── package.json
└── README.md                      # 更新：补充本地运行说明
```

---

# 核心架构实现要求

## 1. Adapter 模式（Mock → API）

```typescript
// 示例：src/api/adapters/types.ts
export interface DashboardAdapter {
  getKpiOverview(): Promise<KpiOverview>;
  getTrafficTrend(): Promise<TrendPoint[]>;
  getCategoryDistribution(): Promise<CategoryItem[]>;
  getRanking(): Promise<RankItem[]>;
  getAlerts(): Promise<AlertItem[]>;
}

// src/api/index.ts
export function createDashboardAdapter(): DashboardAdapter {
  return import.meta.env.VITE_USE_MOCK === 'true'
    ? new MockDashboardAdapter()
    new HttpDashboardAdapter();
}
```

- `MockDashboardAdapter`：返回 mock/data 中的数据，模拟 200~400ms 延迟
- `HttpDashboardAdapter`：预留真实 API 路径，方法内可先 `throw new Error('API not configured')` 或返回空
- **View / Component 层禁止 import axios**

## 2. 日志系统

```typescript
// 使用方式
import { logger } from '@/core/logger';

logger.info('Dashboard mounted', { module: 'overview' });
logger.warn('Data refresh slow', { duration: 1200 });
logger.error('Fetch KPI failed', { error: err.message });
```

要求：
- 支持 level 过滤（dev 全量，prod 仅 warn/error）
- `MemoryTransport` 保存最近 100 条日志
- `LogPanel` 组件订阅 MemoryTransport，实时展示
- Axios 拦截器自动 log 请求/响应/错误

## 3. 数据刷新

- 使用 `usePolling` composable，默认每 30 秒刷新 KPI 与告警
- 刷新时 logger.info 记录，LogPanel 可见

## 4. 大屏缩放

- 使用 `useScreenScale` 或 CSS transform scale，基准 1920×1080
- 窗口 resize 时自动适配，图表调用 `resize()`

---

# Mock 数据要求

在 `src/mock/data/` 提供真实感数据：

- KPI：今日访问量、在线用户、订单量、转化率（带千分位格式）
- 趋势：24 个点，模拟白天高夜间低
- 分类占比：4~6 个类目
- 排行榜：Top5 城市/业务线
- 告警：10 条，含 level（info/warn/error）、时间、描述

数据命名使用中文业务语义，便于教学。

---

# 测试要求（Vitest）

至少编写并通过以下测试：

1. `core/logger/index.test.ts` — 日志分级、MemoryTransport 存储
2. `api/adapters/mock.adapter.test.ts` — MockAdapter 返回结构正确
3. `utils/format.test.ts` — 数字千分位等工具函数（如有）

运行 `npm run test` 必须通过。

---

# 代码质量要求

- TypeScript `strict: true`，禁止滥用 `any`
- ESLint 无 error
- 每个 Vue 组件 `<script setup lang="ts">`
- 每个图表组件接收 props 类型定义，不硬编码业务数据
- 单文件不超过 300 行（超出则拆分）

---

# 执行步骤（按顺序自主完成，无需询问用户）

## Phase 1：项目初始化
1. 在 `f:\Production_Internship\DataCanvasLab` 使用 Vite 创建 Vue3+TS 项目（若已有内容则合并）
2. 安装依赖：vue-echarts、echarts、pinia、axios、sass、msw、vitest、eslint、prettier 等
3. 配置路径别名 `@/` → `src/`
4. 配置 `.env.development` / `.env.production`

## Phase 2：基础设施
5. 实现 `core/logger` 完整模块
6. 实现 `api/client.ts` + Adapter 接口 + MockAdapter + HttpAdapter stub
7. 编写 mock 数据与 MSW handlers（或 vite-plugin-mock）
8. 实现 `usePolling`、`useScreenScale` composables
9. 编写 logger 与 adapter 单元测试

## Phase 3：UI 与图表
10. 编写全局 SCSS 变量与面板样式（玻璃态、发光边框）
11. 实现 `charts/` 下各图表封装组件（统一深色主题配置）
12. 实现 `components/` 通用 PanelBox、SectionTitle、KpiCard 等
13. 实现 `LogPanel`、`ScreenHeader`

## Phase 4：业务模块
14. 按 modules 拆分：overview / traffic / ranking / alert
15. 每个 module 含 services + components，DashboardView 只做布局组装
16. 接入 Pinia store 统一管理 dashboard 数据

## Phase 5：大屏组装
17. 实现 `ScreenLayout.vue` + `DashboardView.vue`
18. 完成 1920×1080 响应式布局与所有区块数据绑定
19. 启动定时刷新，确保 LogPanel 有日志输出

## Phase 6：质量与文档
20. 运行 `npm run lint` 和 `npm run test`，修复所有问题
21. 更新 README.md：添加安装、运行、目录说明、Mock/API 切换方式
22. 如有 git 仓库，提交代码（commit message 规范，不 push 除非用户要求）

## Phase 7：验收
23. 运行 `npm run dev` 启动开发服务器
24. **自动打开浏览器**访问本地地址（如 http://localhost:5173）
25. 截图或确认页面包含：标题栏、至少 4 种图表、KPI 卡片、排行榜、告警列表、日志面板
26. 向用户汇报：项目结构、如何运行、验收结果、GitHub 仓库路径（如有）

---

# 验收标准（全部通过才算完成）

- [ ] 浏览器自动打开，大屏页面完整渲染，无控制台 error
- [ ] 视觉为深色科技风，非默认丑样式
- [ ] 至少 4 种 ECharts 图表正常显示
- [ ] KPI 数字、排行榜、告警列表有 Mock 数据
- [ ] 底部 LogPanel 可见 logger 输出的系统日志
- [ ] 窗口缩放后布局不错乱，图表自适应
- [ ] `npm run test` 通过
- [ ] 代码按 modules/services/api/charts 分层，无单文件堆全部逻辑
- [ ] 切换 `VITE_USE_MOCK=false` 时走 HttpAdapter（可不通真实 API，但架构正确）

---

# 禁止事项

- ❌ 把所有逻辑写进一个 Vue 文件或一个 ts 文件
- ❌ 在组件里直接写 fetch/axios
- ❌ 使用浅色默认 ECharts 主题不定制
- ❌ 跳过测试和 logger 模块
- ❌ 完成后不打开浏览器就宣告结束
- ❌ 未经用户要求 force push 或修改 git config
- ❌ 安装不必要的重型依赖（如 Element Plus 全量、Three.js 等）

---

# 汇报格式（完成后按此结构回复用户）

1. **完成情况摘要**（2~3 句）
2. **本地运行方式**（命令 + 地址）
3. **项目结构说明**（树状简图）
4. **架构亮点**（Adapter、Logger、模块化）
5. **后续扩展建议**（接 API、加模块、部署）
6. **浏览器已打开** — 确认用户可直接看到大屏

---

请立即开始执行，全程自主推进，遇到问题自行解决，最终交付一个可在浏览器中看到的漂亮数据可视化大屏。
```

---

## 使用说明

1. 切换到 **Agent 模式**
2. 复制上方「提示词正文」中 `markdown` 代码块内的全部内容
3. 粘贴发送给 AI
4. 等待 AI 完成构建并自动打开浏览器

## 可选补充（粘贴时可追加）

```
补充要求：
- 大屏主题改为「智慧校园数据监控」/「电商双11战报」/「工业设备运维」（任选一个）
- 完成后 git commit 并 push 到 https://github.com/zhu-zhu-zhu-zhu/DataCanvasLab
- 启用 GitHub Pages 部署在线预览
```

---

## 预期产出

| 项目 | 说明 |
|------|------|
| 运行命令 | `npm install` → `npm run dev` |
| 访问地址 | http://localhost:5173 |
| 测试命令 | `npm run test` |
| 视觉效果 | 深色科技风 1920×1080 智慧城市大屏 |
| 架构 | Vue3 + TS + ECharts + Adapter + Logger + Vitest |
