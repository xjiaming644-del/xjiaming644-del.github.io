// Minimalist Retro-Futurist Bilingual Resume Data (Mainframe® / ARIA Inspired)
window.RESUME_DATA = {
  zh: {
    brand: "夏嘉铭®",
    nav: [
      { id: "sec-work", label: "工作经历" },
      { id: "sec-projects", label: "技术项目" },
      { id: "sec-skills", label: "核心能力" },
      { id: "sec-edu", label: "教育与简历" }
    ],
    langBtn: "EN",
    ctaRight: "下载简历",
    blurLine1: "你好，认识一下夏嘉铭（Jiaming Xia），",
    blurLine2: "统招电气本科 · CET-6 (550) · AI 与智能装备技术交付",
    heroTypewriter: "很高兴你点进来。我把 Linux 多模态 AI 部署、Python 自动化测试门禁，以及 2 年+ 海外精密仪器与 150+ 艘外轮全英文对接结合在一起。想先看哪一部分？",
    pills: [
      { target: "sec-work", label: "工作经历 · 普析仪器 & 150+ 外轮" },
      { target: "sec-projects", label: "AI 部署与自动化评测" },
      { target: "sec-skills", label: "核心能力卡片" },
      { target: "sec-edu", label: "本科与英语六级 550" },
      { target: "sec-edu", label: "下载 PDF 简历" }
    ],
    copyPillPrefix: "联系我：",
    copyValue: "17731475144 | 3314836867@qq.com",
    copyDisplay: "177-3147-5144 · 3314836867@qq.com",
    copiedToast: "已复制电话与邮箱 ✓",
    dragHint: "⇄ 移动鼠标或按住左右/上下拖拽旋转 3D 角色",

    workSection: {
      kicker: "01 / 工作经历",
      title: "横跨海外精密科学仪器、150+ 艘涉外巨轮与上市制造质检的实战履历",
      items: [
        {
          period: "2025.08 — 2026.05",
          company: "北京普析通用仪器有限责任公司",
          role: "海外销售专员",
          bullets: [
            "海外经销商与客户全英文对接：通过英文邮件和电话维护海外经销商及历史客户，沟通实验室分析仪器采购需求与选型配置。",
            "精密科学仪器方案与订单跟进：围绕光谱、色谱等仪器整理客户需求、制作产品报价，持续跟进跨国商务沟通及订单交付进展。"
          ]
        },
        {
          period: "2024.05 — 2025.08",
          company: "太和（天津）船舶工程有限公司",
          role: "涉外机电工程技术协调与联调验收",
          bullets: [
            "全英文技术对接：1 年 4 个月累计跟进超 150 艘次外籍大型船舶项目，约 1/3 工作时间使用英语直连外籍轮机长与船东技术代表，澄清技术规格、测试工况与安全验收标准。",
            "多工种现场统筹：月均独立统筹 10 余艘外轮、10–20 项机电与自动化系统联调检修，单船现场调度约 5 名工程师交叉作业，独立输出中英文工单并完成初验/终验签单闭环。"
          ]
        },
        {
          period: "2023.12 — 2024.03",
          company: "北京合康新能变频技术有限公司（美的集团旗下上市企业）",
          role: "过程质量检验员（IPQC）",
          bullets: [
            "硬件质量 SOP 管控：严格执行新能源储能高压控制盒及电池包过程检验，熟练操作万用表、扭力仪、色差仪实测电气导通/绝缘与装配扭力参数。",
            "异常隔离与复现闭环：发现批次偏差第一时间隔离预警，协同研发与工程团队完成故障复现、根因定位与返修验证。"
          ]
        }
      ]
    },

    projectSection: {
      kicker: "02 / 项目与技术实践",
      title: "独立打通云端 AI 部署、多模型 API 路由与自动化测试门禁",
      period: "2026.06 — 至今",
      name: "多模态 AI 工作台云端部署、API 路由联调与自动化评测门禁",
      role: "个人项目（支持电脑与手机访问并现场演示完整流程）",
      bullets: [
        "Linux 云端部署与 API 路由：独立完成多模态 Web 工作台在 Ubuntu/Linux 云服务器的环境搭建、反向代理、端口映射与移动端适配；打通 OpenAI 兼容 RESTful API 多模型分发、鉴权与参数排障。",
        "Python 自动化评测 CLI：结合工程质量门禁思维，基于 Python（unittest + 子进程调度）构建多 Agent 自动评分回归工具，实现批量用例执行、超时监控、异常日志拦截与结构化评估报告输出。",
        "TypeScript 健康巡检与跨境履约实践：搭建 Node.js/TypeScript（Vitest + SQLite）线上只读健康检查服务与 E2E 测试；另独立完成 Ozon 店铺注册、商品刊登及订单处理（2025.11 启动，通过妙手 ERP 管理刊登流程）。"
      ]
    },

    skillSection: {
      kicker: "03 / 核心能力（可左右拖动滑动）",
      title: "「统招工科 + 2 年+ 涉外英语 + AI 软硬联调」复合即战力",
      swipeHint: "← 左右滑动或拖拽卡片 →",
      cards: [
        {
          num: "01",
          title: "AI 部署与接口联调",
          desc: "Ubuntu/Linux 服务器部署、反向代理、OpenAI 兼容 RESTful API 多模型接入、鉴权参数配置、移动端适配与日志排错。"
        },
        {
          num: "02",
          title: "自动化评测与测试门禁",
          desc: "Python（unittest + 子进程）批量回归评分 CLI；TypeScript/Node.js（Vitest + SQLite）线上只读健康巡检与 E2E 验证。"
        },
        {
          num: "03",
          title: "海外客户与涉外工程英语",
          desc: "CET-6（550分），累计 2 年+ 全英文对接海外科学仪器经销商及 150+ 外轮轮机长；流畅读写英文 API 文档、产品报价与验收报告。"
        },
        {
          num: "04",
          title: "精密仪器与硬件检测排障",
          desc: "电气工程及其自动化科班 + 普析光谱/色谱仪器经验 + 美的合康新能 IPQC；熟练使用万用表、扭力仪、色差仪定位异常。"
        },
        {
          num: "05",
          title: "现场交付与 SOP 验收",
          desc: "150+ 外轮多工种交叉调度（单项目约 5 人）、工作单/派工单整理、质量检查与初验/终验签收闭环。"
        }
      ]
    },

    eduSection: {
      kicker: "04 / 教育背景与正式简历下载",
      title: "华北理工大学 · 电气工程及其自动化",
      degreeLine: "统招全日制本科（工学学士） ｜ 2019.09 — 2023.06",
      honors: "英语六级 CET-6（550分 · 日常工作语言） ｜ GPA 3.3 ｜ 校级奖学金 2 次 ｜ 全国大学生“互联网+”大赛二等奖",
      statusLine: "求职状态：离职 - 随时到岗 ｜ 意向城市：北京 / 杭州 / 上海（可接受出差、驻场）",
      pdfPrompt: "按岗位方向直接下载单页正式版 PDF 简历（带本人证件照，已同步更新普析经历）：",
      pdfs: [
        {
          label: "⬇ AI 应用落地与国际化交付版.pdf",
          href: "resumes/jiaming_xia_ai_global.pdf",
          download: "夏嘉铭_AI应用落地与国际化技术交付工程师.pdf"
        },
        {
          label: "⬇ 机器人与智能装备实施交付版.pdf",
          href: "resumes/jiaming_xia_robotics_delivery.pdf",
          download: "夏嘉铭_机器人与智能装备实施交付工程师.pdf"
        },
        {
          label: "⬇ 机器人整机测试与技术支持版.pdf",
          href: "resumes/jiaming_xia_testing_support.pdf",
          download: "夏嘉铭_机器人整机测试与器械技术支持.pdf"
        }
      ]
    }
  },

  en: {
    brand: "Jiaming Xia®",
    nav: [
      { id: "sec-work", label: "Experience" },
      { id: "sec-projects", label: "Projects" },
      { id: "sec-skills", label: "Capabilities" },
      { id: "sec-edu", label: "Education & CV" }
    ],
    langBtn: "中文",
    ctaRight: "Get CV",
    blurLine1: "Hey there, meet Jiaming Xia,",
    blurLine2: "B.Eng. Electrical · CET-6 (550) · AI & Technical Delivery",
    heroTypewriter: "Glad you stopped in. I bridge Linux multi-modal AI deployment, automated test gates, and 2+ years of overseas analytical instrument & 150+ foreign vessel English alignment. What are we building?",
    pills: [
      { target: "sec-work", label: "Work · Purkinje & 150+ Vessels" },
      { target: "sec-projects", label: "AI & Auto-Eval Projects" },
      { target: "sec-skills", label: "Core Capabilities" },
      { target: "sec-edu", label: "B.Eng. & CET-6 (550)" },
      { target: "sec-edu", label: "Download PDF Resume" }
    ],
    copyPillPrefix: "Reach me: ",
    copyValue: "17731475144 | 3314836867@qq.com",
    copyDisplay: "+86 177-3147-5144 · 3314836867@qq.com",
    copiedToast: "Copied phone & email ✓",
    dragHint: "⇄ Move cursor or drag left/right/up/down to rotate 3D character",

    workSection: {
      kicker: "01 / Work Experience",
      title: "Proven across overseas analytical instruments, 150+ foreign vessels & listed manufacturing QA",
      items: [
        {
          period: "2025.08 — 2026.05",
          company: "Beijing Purkinje General Instrument Co., Ltd.",
          role: "Overseas Sales Specialist",
          bullets: [
            "Global Distributor & Client Alignment: Maintained overseas distributors and historical accounts via English email and phone calls, communicating laboratory instrument procurement needs.",
            "Spectroscopy & Chromatography Solutions: Organized customer requirements around spectrometers and chromatographs, prepared product quotations, and tracked international business communication and order progress."
          ]
        },
        {
          period: "2024.05 — 2025.08",
          company: "Taihe (Tianjin) Marine Engineering Co., Ltd.",
          role: "International Electromechanical Project Coordinator",
          bullets: [
            "Working English Alignment: Coordinated over 150 foreign ocean vessel projects in 16 months, spending ~1/3 of working hours directly in English with foreign Chief Engineers and Owner Reps on technical specs and acceptance standards.",
            "Multi-Crew Commissioning: Orchestrated 10+ vessels and 10–20 electromechanical/automation commissioning tasks monthly, leading ~5 field engineers per vessel through work orders, quality checks, and final sign-off."
          ]
        },
        {
          period: "2023.12 — 2024.03",
          company: "Beijing Hiconics Drive Tech (Midea Group Listed Subsidiary)",
          role: "In-Process Quality Control (IPQC) Inspector",
          bullets: [
            "Hardware SOP Rigor: Inspected HV energy-storage control boxes and battery packs using multimeters, torque tools, and colorimeters for electrical continuity, insulation, and torque compliance.",
            "Defect Closure: Recorded inspection metrics, reported batch anomalies promptly, and partnered with engineering supervisors on root-cause verification."
          ]
        }
      ]
    },

    projectSection: {
      kicker: "02 / Projects & Practical Operations",
      title: "End-to-end Linux AI deployment, multi-model API routing & automated test gates",
      period: "2026.06 — Present",
      name: "Multi-Modal AI Cloud Workbench, API Router & Automated Eval Gateways",
      role: "Independent Project (Desktop & Mobile Live Demo Ready)",
      bullets: [
        "Linux Cloud & API Configuration: Deployed a multi-modal web workbench on Ubuntu/Linux with reverse proxy, port mapping & mobile adaptation; configured multi-model API access, authentication, and interface troubleshooting.",
        "Python Automated Eval CLI: Built a Python (unittest + subprocess) multi-agent automated scoring & regression tool with batch execution, timeout isolation, and structured evaluation reports.",
        "TypeScript Health Check & Cross-Border ERP: Created Node.js/TypeScript (Vitest + SQLite) online read-only Health Check services; independently operated Ozon store registration, listing & fulfillment via Miaoshou ERP (launched 2025.11)."
      ]
    },

    skillSection: {
      kicker: "03 / Capabilities (Swipe Left / Right)",
      title: "B.Eng. Foundation × 2+ Yrs Global English × AI Deployment",
      swipeHint: "← Drag or swipe horizontally →",
      cards: [
        {
          num: "01",
          title: "Linux AI & API Configuration",
          desc: "Ubuntu cloud deployment, reverse proxy, multi-model API integration, auth/parameter tuning, mobile adaptation & troubleshooting."
        },
        {
          num: "02",
          title: "Automated Eval & QA Gates",
          desc: "Python (unittest + subprocess) regression scoring CLI; TypeScript/Vitest + SQLite online read-only Health Check & E2E suites."
        },
        {
          num: "03",
          title: "Global English Communication",
          desc: "CET-6 (550) with 2+ years of English communication across overseas laboratory instrument distributors and 150+ foreign vessels."
        },
        {
          num: "04",
          title: "Analytical Instruments & Hardware QA",
          desc: "B.Eng. Electrical + Purkinje spectroscopy/chromatography familiarity + Midea Hiconics IPQC with multimeters, torque & colorimeter tools."
        },
        {
          num: "05",
          title: "Field Coordination & SOP Delivery",
          desc: "On-site dispatch of ~5-person crews, bilingual work orders, quality inspection & formal client acceptance closure."
        }
      ]
    },

    eduSection: {
      kicker: "04 / Education & One-Page PDF Resumes",
      title: "North China University of Science & Technology",
      degreeLine: "B.Eng. in Electrical Engineering & Automation ｜ 2019.09 — 2023.06",
      honors: "CET-6 (550 · Working Proficiency) ｜ GPA 3.3 ｜ 2× University Scholarship ｜ National 2nd Prize in 'Internet+' Competition",
      statusLine: "Availability: Immediate (Beijing / Hangzhou / Shanghai · Open to Travel & On-Site)",
      pdfPrompt: "Download Formal One-Page PDF Resume (Updated with Purkinje Experience):",
      pdfs: [
        {
          label: "⬇ AI Solutions & Global FDE (PDF)",
          href: "resumes/jiaming_xia_ai_global.pdf",
          download: "夏嘉铭_AI应用落地与国际化技术交付工程师.pdf"
        },
        {
          label: "⬇ Robotics Field Delivery (PDF)",
          href: "resumes/jiaming_xia_robotics_delivery.pdf",
          download: "夏嘉铭_机器人与智能装备实施交付工程师.pdf"
        },
        {
          label: "⬇ System QA & Tech Support (PDF)",
          href: "resumes/jiaming_xia_testing_support.pdf",
          download: "夏嘉铭_机器人整机测试与器械技术支持.pdf"
        }
      ]
    }
  }
};
