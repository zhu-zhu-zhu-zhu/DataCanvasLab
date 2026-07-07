# DataCanvasLab

> **如意数据大屏** — 一个面向零基础学习者的数据可视化大屏开源项目，帮助大家从 0 到 1 自己动手打造数据可视化大屏。

---

## 项目简介

**DataCanvasLab（如意数据大屏）** 是一个公开的教学型数据大屏项目。我们希望通过循序渐进的方式，带领学习者了解并完成一个完整的数据可视化大屏，包括：

- 大屏布局与设计思路
- 图表组件的接入与配置
- 数据模拟与动态刷新
- 响应式适配与视觉优化
- 从本地开发到部署上线的完整流程

本项目将持续维护与更新，欢迎 Star、Fork 与参与贡献。

---

## 适合谁学

- 想从零了解 **数据可视化大屏** 开发的初学者
- 需要带学生做 **0→1 实战项目** 的老师
- 希望自己动手做一个可展示、可扩展大屏的开发者

---

## 当前状态

✅ **MVP 已上线** — 智慧城市运营监控大屏（Vue 3 + ECharts + Mock 数据）

---

## 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装与运行

```bash
git clone https://github.com/zhu-zhu-zhu-zhu/DataCanvasLab.git
cd DataCanvasLab
npm install
npm run dev
```

浏览器访问：**http://localhost:5173**

### 其他命令

```bash
npm run build    # 生产构建
npm run test     # 单元测试
npm run lint     # 代码检查
npm run preview  # 预览构建结果
```

### Mock / API 切换

在 `.env.development` 中：

```env
VITE_USE_MOCK=true   # 使用 Mock 数据（默认）
VITE_USE_MOCK=false  # 切换为 HttpAdapter 真实 API
```

---

## 项目结构

```
src/
├── api/           # Axios + Adapter（Mock / HTTP 切换）
├── charts/        # ECharts 图表封装
├── components/    # 通用 UI 组件
├── composables/   # 轮询、大屏缩放
├── core/logger/   # 分级日志 + MemoryTransport
├── layouts/       # 大屏布局
├── modules/       # 业务模块（overview / traffic / ranking / alert）
├── mock/          # Mock 数据
├── services/      # 业务服务层
├── stores/        # Pinia 状态
├── styles/        # 全局 SCSS
└── views/         # 页面组装
```

---

## 参与贡献

欢迎通过 Issue 和 Pull Request 参与项目共建。在提交代码前，请先阅读本仓库的 [MIT License](#license)。

---

## License

Copyright (c) 2026 zhu-zhu-zhu-zhu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
