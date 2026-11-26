# 夏嘉铭 · Jiaming Xia — 3D 交互个人简历网站

基于 **Three.js 实时 WebGL** 构建的极简复古未来风（Retro-Futurist）3D 交互个人简历网站，支持中英双语瞬切、实时 3D 角色眼神追踪与拖拽旋转、横向能力卡片滑动及三版单页正式 PDF 简历按需下载。

- **在线公开访问地址**：https://xjiaming644-del.github.io/resume/

## 目录结构

```text
resume/
├── index.html          # 主页面入口（零外链 CDN 依赖）
├── css/
│   └── styles.css      # 画廊留白排版、毛玻璃顶栏与响应式样式
├── js/
│   ├── resume-data.js  # 中英双语完整履历数据（含北京普析、太和船舶、美的合康新能及 AI 项目）
│   ├── scene3d.js      # Three.js 复古 CRT 显示器头西装工程师实时 3D 建模与动作交互
│   └── app.js          # 打字机导语、双语切换、一键复制与横向拖拽卡片控制
├── vendor/
│   └── three.min.js    # 本地内置 Three.js r160 引擎
├── resumes/            # 三版单页正式带证件照 PDF 简历（可直接点击下载）
│   ├── 夏嘉铭_AI应用落地与国际化技术交付工程师.pdf
│   ├── 夏嘉铭_机器人与智能装备实施交付工程师.pdf
│   └── 夏嘉铭_机器人整机测试与器械技术支持.pdf
├── assets/
│   └── real_portrait.jpg
└── build_resumes.py    # ReportLab 三版单页 PDF 简历一键编译脚本
```

## 本地运行

```bash
python -m http.server 8788 --bind 127.0.0.1
```
随后在浏览器访问 `http://127.0.0.1:8788`。
