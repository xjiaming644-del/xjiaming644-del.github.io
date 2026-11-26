# -*- coding: utf-8 -*-
r"""
生成并同步三版正式单页带白底证件照 PDF 简历（含北京普析通用仪器海外销售专员经历）：
1. 夏嘉铭_AI应用落地与国际化技术交付工程师.pdf
2. 夏嘉铭_机器人与智能装备实施交付工程师.pdf
3. 夏嘉铭_机器人整机测试与器械技术支持.pdf

同步输出目录：
- C:\Users\Administrator\.gemini\antigravity\scratch\resume-3d-site\resumes
- D:\BOSS直聘
- C:\Users\Administrator\.gemini\antigravity\scratch\resume-beijing-2026\final_pdfs
"""
import os
import re
import sys

PYDEPS = r"C:\Users\Administrator\.gemini\antigravity\brain\b1890334-27f1-4c66-a7ea-1657a7449c52\scratch\pydeps"
if os.path.isdir(PYDEPS) and PYDEPS not in sys.path:
    sys.path.insert(0, PYDEPS)

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.graphics.shapes import Drawing, Rect
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, Image as RLImage, Flowable
)
from reportlab.lib.styles import ParagraphStyle

ONLINE_3D_URL = "https://xjiaming644-del.github.io/resume/"


class ClickableQRBadge(Flowable):
    """Vector QR code badge with caption and native PDF clickable URI annotation."""

    def __init__(self, url, width, height):
        super().__init__()
        self.url = url
        self.width = width
        self.height = height

    def wrap(self, availWidth, availHeight):
        return self.width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        # Subtle card border matching ID photo box
        c.setStrokeColor(colors.HexColor("#E5E7EB"))
        c.setFillColor(colors.HexColor("#FFFFFF"))
        c.setLineWidth(0.5)
        c.rect(0, 0, self.width, self.height, stroke=1, fill=1)

        # Crisp vector QR code in upper square area
        qr_box = self.width - 1.6 * mm
        qr_widget = qr.QrCodeWidget(self.url, barLevel="M", barFillColor=colors.HexColor("#111827"), barBorder=1)
        bounds = qr_widget.getBounds()
        bw = bounds[2] - bounds[0]
        bh = bounds[3] - bounds[1]
        d = Drawing(qr_box, qr_box, transform=[qr_box / bw, 0, 0, qr_box / bh, 0, 0])
        d.add(qr_widget)
        qr_x = (self.width - qr_box) / 2.0
        qr_y = self.height - qr_box - 0.7 * mm
        renderPDF.draw(d, c, qr_x, qr_y)

        # Micro-caption underneath QR code
        c.setFillColor(colors.HexColor("#1E3A5F"))
        c.setFont("MSYH-Bold", 6.5)
        c.drawCentredString(self.width / 2.0, 3.65 * mm, "扫码 / 点击直达")
        c.setFillColor(colors.HexColor("#4B5563"))
        c.setFont("MSYH", 6.1)
        c.drawCentredString(self.width / 2.0, 1.25 * mm, "3D 交互在线简历")

        # Make entire QR badge directly clickable in PDF viewers
        c.linkURL(self.url, (0, 0, self.width, self.height), relative=1, thickness=0)
        c.restoreState()

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_REG_PATH = r"C:\Windows\Fonts\msyh.ttc"
FONT_BOLD_PATH = r"C:\Windows\Fonts\msyhbd.ttc"
PHOTO_PATH = os.path.join(HERE, "assets", "real_portrait.jpg")

pdfmetrics.registerFont(TTFont("MSYH", FONT_REG_PATH, subfontIndex=0))
pdfmetrics.registerFont(TTFont("MSYH-Bold", FONT_BOLD_PATH, subfontIndex=0))
registerFontFamily("MSYH", normal="MSYH", bold="MSYH-Bold", italic="MSYH", boldItalic="MSYH-Bold")

OUT_DIRS = [
    os.path.join(HERE, "resumes"),
    r"D:\BOSS直聘",
    r"C:\Users\Administrator\.gemini\antigravity\scratch\resume-beijing-2026\final_pdfs",
]


def build_clean_resume_pdf(out_path, data):
    accent = colors.HexColor("#1E3A5F")
    dark = colors.HexColor("#111827")
    text_col = colors.HexColor("#1F2937")
    muted = colors.HexColor("#374151")
    sub_col = colors.HexColor("#4B5563")
    line_col = colors.HexColor("#D1D5DB")
    photo_border = colors.HexColor("#E5E7EB")

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=12.0 * mm,
        rightMargin=12.0 * mm,
        topMargin=8.8 * mm,
        bottomMargin=8.2 * mm,
        title=os.path.basename(out_path).replace(".pdf", ""),
        author="夏嘉铭",
    )

    avail_w = A4[0] - 24.0 * mm

    st_name = ParagraphStyle(
        "Name", fontName="MSYH-Bold", fontSize=20.8, leading=24.8, textColor=dark
    )
    st_target = ParagraphStyle(
        "Target", fontName="MSYH-Bold", fontSize=10.3, leading=14.2, textColor=accent, spaceBefore=2.0, spaceAfter=3.2
    )
    st_meta = ParagraphStyle(
        "Meta", fontName="MSYH", fontSize=8.7, leading=13.2, textColor=muted
    )
    st_sec = ParagraphStyle(
        "Sec", fontName="MSYH-Bold", fontSize=10.2, leading=13.2, textColor=accent, spaceBefore=4.4, spaceAfter=1.5
    )
    st_body = ParagraphStyle(
        "Body", fontName="MSYH", fontSize=8.7, leading=12.7, textColor=text_col, wordWrap="CJK"
    )
    st_skill_k = ParagraphStyle(
        "SkillK", fontName="MSYH-Bold", fontSize=8.7, leading=12.5, textColor=accent, wordWrap="CJK"
    )
    st_skill_v = ParagraphStyle(
        "SkillV", fontName="MSYH", fontSize=8.65, leading=12.5, textColor=text_col, wordWrap="CJK"
    )
    st_item_l = ParagraphStyle(
        "ItemL", fontName="MSYH-Bold", fontSize=9.15, leading=12.7, textColor=dark, wordWrap="CJK"
    )
    st_item_r = ParagraphStyle(
        "ItemR", fontName="MSYH-Bold", fontSize=8.65, leading=12.7, textColor=muted, alignment=2
    )
    st_sub = ParagraphStyle(
        "Sub", fontName="MSYH", fontSize=8.45, leading=12.2, textColor=sub_col, spaceBefore=0.8, spaceAfter=0.8, wordWrap="CJK"
    )
    st_bullet = ParagraphStyle(
        "Bullet",
        fontName="MSYH",
        fontSize=8.65,
        leading=12.55,
        textColor=text_col,
        leftIndent=9.2,
        bulletIndent=0,
        spaceBefore=0.85,
        wordWrap="CJK",
    )

    story = []

    photo_w = 21.5 * mm
    photo_h = 30.1 * mm
    qr_w = 22.8 * mm
    qr_gap = 2.4 * mm
    right_total_w = qr_w + qr_gap + photo_w + 2.0 * mm

    st_link_line = ParagraphStyle(
        "LinkLine", fontName="MSYH", fontSize=8.45, leading=12.6, textColor=muted, spaceBefore=0.6
    )

    left_head = [
        Paragraph(data["name"], st_name),
        Paragraph(data["target"], st_target),
        Paragraph(data["meta_line1"], st_meta),
        Paragraph(data["meta_line2"], st_meta),
        Paragraph(
            f'<b>3D在线简历：</b><link href="{ONLINE_3D_URL}" color="#1E3A5F"><u>{ONLINE_3D_URL}</u></link>（扫码或点击直接跳转）',
            st_link_line,
        ),
    ]

    qr_badge = ClickableQRBadge(ONLINE_3D_URL, width=qr_w, height=photo_h)

    photo_img = RLImage(PHOTO_PATH, width=photo_w, height=photo_h)
    photo_box = Table([[photo_img]], colWidths=[photo_w], rowHeights=[photo_h])
    photo_box.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.5, photo_border),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("ALIGN", (0, 0), (-1, -1), "RIGHT"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))

    right_pair = Table(
        [[qr_badge, "", photo_box]],
        colWidths=[qr_w, qr_gap, photo_w],
        rowHeights=[photo_h],
    )
    right_pair.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
        ("ALIGN", (0, 0), (-1, -1), "RIGHT"),
    ]))

    ht = Table([[left_head, right_pair]], colWidths=[avail_w - right_total_w, right_total_w])
    ht.setStyle(TableStyle([
        ("VALIGN", (0, 0), (0, 0), "MIDDLE"),
        ("VALIGN", (1, 0), (1, 0), "BOTTOM"),
        ("ALIGN", (1, 0), (1, 0), "RIGHT"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
        ("LINEBELOW", (0, 0), (-1, 0), 1.4, accent),
    ]))
    story.append(ht)
    story.append(Spacer(1, 1.5))

    def add_sec_header(title):
        story.append(Paragraph(title, st_sec))
        story.append(HRFlowable(width="100%", thickness=0.6, color=line_col, spaceBefore=0, spaceAfter=2.4))

    add_sec_header("个人概况")
    story.append(Paragraph(data["summary"], st_body))
    story.append(Spacer(1, 1.2))

    add_sec_header("核心能力")
    skill_rows = [[Paragraph(k, st_skill_k), Paragraph(v, st_skill_v)] for k, v in data["skills"]]
    st_tbl = Table(skill_rows, colWidths=[104, avail_w - 104])
    st_tbl.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 0.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.3),
    ]))
    story.append(st_tbl)
    story.append(Spacer(1, 1.2))

    for sec_title, items in data["sections"]:
        add_sec_header(sec_title)
        for idx, it in enumerate(items):
            row_t = Table(
                [[Paragraph(it["title"], st_item_l), Paragraph(it["date"], st_item_r)]],
                colWidths=[avail_w * 0.78, avail_w * 0.22],
            )
            row_t.setStyle(TableStyle([
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0.6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0.7),
            ]))
            story.append(row_t)
            if it.get("sub"):
                story.append(Paragraph(it["sub"], st_sub))
            for b in it["bullets"]:
                story.append(Paragraph(b, st_bullet, bulletText="•"))
            story.append(Spacer(1, 2.6 if idx < len(items) - 1 else 1.2))

    add_sec_header("教育背景")
    edu_t = Table(
        [[Paragraph(data["edu_title"], st_item_l), Paragraph(data["edu_date"], st_item_r)]],
        colWidths=[avail_w * 0.78, avail_w * 0.22],
    )
    edu_t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0.6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0.8),
    ]))
    story.append(edu_t)
    story.append(Paragraph(data["edu_meta"], st_sub))
    if data.get("edu_courses"):
        story.append(Paragraph(data["edu_courses"], st_sub))

    doc.build(story)
    return out_path


PURKINJE_ITEM = {
    "title": "北京普析通用仪器有限责任公司 ｜ 海外销售专员",
    "date": "2025.08 - 2026.05",
    "bullets": [
        "<b>海外经销商与客户全英文对接</b>：通过英文邮件和电话维护海外经销商及历史客户，沟通实验室分析仪器采购需求与选型配置。",
        "<b>精密科学仪器方案与订单跟进</b>：围绕光谱、色谱等仪器整理客户需求、制作产品报价，跟进跨国商务沟通及订单交付进展。",
    ],
}

COMMON_BASE = {
    "name": "夏嘉铭",
    "meta_line1": "<b>电话：</b>17731475144 ｜ <b>邮箱：</b>3314836867@qq.com ｜ <b>学历：</b>电气工程及其自动化·统招本科",
    "meta_line2": "<b>英语：</b>CET-6（550分） ｜ <b>状态：</b>离职-随时到岗 ｜ <b>意向城市：</b>北京（接受出差）",
    "edu_title": "华北理工大学 ｜ 电气工程及其自动化 ｜ 统招本科（工学学士）",
    "edu_date": "2019.09 - 2023.06",
    "edu_meta": "<b>英语与荣誉：</b>英语六级 CET-6（550分） ｜ GPA 3.3 ｜ 校级奖学金 2 次 ｜ 全国大学生“互联网+”大赛二等奖",
    "edu_courses": "<b>主修课程：</b>电路原理、模拟与数字电子技术、自动控制原理、电机与拖动基础、电气控制技术、传感器与检测技术",
}

# 版本 1：机器人与智能装备实施交付工程师
EDITION_DELIVERY = {
    **COMMON_BASE,
    "target": "求职意向：机器人与智能装备实施交付工程师 / 现场联调工程师",
    "summary": (
        "电气工程及其自动化统招本科，英语六级 CET-6（550分）。"
        "具备海外精密仪器英文客户对接、1 年 4 个月大型涉外机电设备现场安装联调验收、上市制造企业电气部件 IPQC 质检及 Ubuntu/Linux 日志网络排障实践经验："
        "熟悉现场供配电安全与 EHS 规范，熟练使用万用表、扭力仪定位供电、线束及传感器外设故障；"
        "掌握上位机后台参数配置、Linux 运行日志提取与标准化交付 SOP 编制，可随时到岗并适应项目现场出差。"
    ),
    "skills": [
        (
            "现场部署与多方统筹",
            "熟悉大型机电设备现场工勘、接货就位、安装督导、多工种调度（单项目约5人）与EHS安全管控，保障交付节点按期达成",
        ),
        (
            "电气基础与硬件初筛",
            "电气自动化科班出身；熟练使用万用表、扭力仪、色差仪完成供配电通断/绝缘与装配扭力检验，快速定位电源、线束与传感器异常",
        ),
        (
            "Linux与上位机联调",
            "掌握Ubuntu/Linux常用命令查看实时运行日志、进程状态与局域网/端口连通性，熟悉上位机后台参数配置与周边设备联调排错",
        ),
        (
            "SOP文档与验收闭环",
            "擅长制定标准安装调试SOP、派工单、问题销项台账与客户操作培训手册，协同产研与客户推进初验、试运行及终验签收",
        ),
        (
            "英语与涉外项目沟通",
            "CET-6（550分），拥有2年+海外仪器经销商及外籍工程师全英文需求确认、技术对接与验收签单经验，胜任涉外项目交付",
        ),
    ],
    "sections": [
        ("工作经历", [
            PURKINJE_ITEM,
            {
                "title": "太和（天津）船舶工程有限公司 ｜ 涉外机电工程项目实施协调",
                "date": "2024.05 - 2025.08",
                "bullets": [
                    "<b>大型机电现场部署与统筹</b>：1年4个月累计跟进超150艘次外籍大型船舶，月均独立统筹10余艘船、10-20项靠港机电与自动化设备安装检修任务，单项目现场调度约5名技术人员交叉作业与上电联调，严守施工安全规范并保障准点交付。",
                    "<b>英文技术澄清与标准验收</b>：约1/3工作时间使用英语直接对接外籍轮机长与船东技术代表，完成现场工勘、故障范围界定、测试工况确认及安全质量标准核对，独立输出中英文派工单与检验记录。",
                    "<b>异常销项闭环与终验签收</b>：全程把控设备安装精度、试运行稳定性验证与遗留问题整改复测，推动客户初验与终验签单归档，沉淀标准化现场实施交付SOP与常见问题库。",
                ],
            },
            {
                "title": "北京合康新能变频技术有限公司（美的集团旗下上市企业） ｜ 过程质量检验员（IPQC）",
                "date": "2023.12 - 2024.03",
                "bullets": [
                    "<b>高压电气部件SOP质检</b>：严格依据制造业SOP执行新能源储能高压控制盒及电池包装配过程检验，全面核查工装夹具状态、结构装配扭力、电气导通/绝缘参数及线束接插件工艺一致性。",
                    "<b>仪器实测与异常闭环</b>：熟练操作万用表、扭力仪、色差仪规范采集检验数据；发现批次参数偏差第一时间隔离预警，协同工程与质量团队完成故障复现、根因定位与返修验证闭环。",
                ],
            },
        ]),
        ("项目与技术实践", [
            {
                "title": "Ubuntu/Linux系统部署联调、自动化巡检脚本与数字化流程实践 ｜ 个人项目",
                "date": "2026.06 - 至今",
                "bullets": [
                    "<b>Linux环境搭建与网络端口排障</b>：独立完成多模态Web工作台在Ubuntu/Linux服务器的部署上线、后台参数配置、端口映射与跨域网络连通性排错，熟练通过命令行提取实时报错日志定位交互链路异常。",
                    "<b>自动化健康巡检与跨境ERP实操</b>：结合工程SOP思维，使用Python编写服务在线健康巡检脚本及部署前冒烟验证清单；另独立完成跨境电商平台（Ozon + 妙手ERP，2025.11启动）商品刊登与订单履约流程管理。",
                ],
            },
        ]),
    ],
}

# 版本 2：机器人整机测试与器械技术支持
EDITION_TESTING = {
    **COMMON_BASE,
    "target": "求职意向：机器人整机测试工程师 / 精密器械系统测试与技术支持",
    "summary": (
        "电气工程及其自动化统招本科，英语六级 CET-6（550分）。"
        "具备光谱/色谱实验室精密仪器海外客户需求对接、上市制造企业电气部件 IPQC 检测、1 年 4 个月大型机电设备联调验收及 Linux/Python 自动化测试脚本实践经验："
        "熟练运用万用表、扭力仪完成传感器、电源与线束故障初筛；掌握 Ubuntu/Linux 命令行查报错日志、标准用例执行与缺陷复现跟踪，可随时到岗。"
    ),
    "skills": [
        (
            "硬件检测与故障初筛",
            "电气自动化科班基础；熟练使用万用表、扭力仪、色差仪执行电气导通/绝缘与装配工艺检测，擅长底盘、传感器、电源与线束故障初筛",
        ),
        (
            "整机测试与缺陷闭环",
            "熟悉测试方案与标准用例编写执行、整机功能/性能/长稳可靠性验证、外部反馈故障分级复现跟踪，规范输出量化测试与运行分析报告",
        ),
        (
            "Linux日志与测试脚本",
            "掌握Ubuntu/Linux命令行查看运行日志、进程与端口状态，能结合日志与传感器表现区分软硬件边界；善用AI与Python编写自动化测试巡检脚本",
        ),
        (
            "精密仪器与质量SOP",
            "熟悉光谱、色谱等实验室精密仪器选型配置与制造企业IPQC质量管控，擅长编制标准化测试规程、维保SOP文档及常见故障排查清单",
        ),
        (
            "英语与技术文档能力",
            "CET-6（550分），具备2年+全英文对接海外经销商及外籍技术代表经验，可流畅读写中英文技术规格书、产品方案、检验工单与维保手册",
        ),
    ],
    "sections": [
        ("工作经历", [
            PURKINJE_ITEM,
            {
                "title": "太和（天津）船舶工程有限公司 ｜ 涉外机电设备联调测试与验收",
                "date": "2024.05 - 2025.08",
                "bullets": [
                    "<b>大型机电系统联调与测试</b>：1年4个月月均独立跟进10余艘外籍船舶、10-20项大型机电与自动化设备检修调试项目，协调约5名现场工程师完成机械部件与电气系统故障排查、工况联调及长稳试运行验证。",
                    "<b>英文故障界定与标准核验</b>：约1/3工作时间使用英语直接与外籍轮机长、技术代表确认设备异常现象、测试边界工况及验收技术指标，规范编制中英文故障检验单与完工测试报告。",
                    "<b>过程质量复检与问题闭环</b>：严格执行现场安全与质量检验SOP，针对试运行期间偶发异常组织现场复现与参数复核，推动整改复测直至达标签收。",
                ],
            },
            {
                "title": "北京合康新能变频技术有限公司（美的集团旗下上市企业） ｜ 过程质量检验员（IPQC）",
                "date": "2023.12 - 2024.03",
                "bullets": [
                    "<b>电气与装配全流程质检</b>：严格依据制造业SOP对新能源储能高压控制盒及电池包产线开展过程质量检验，覆盖工装治具点检、装配扭力、电气导通/绝缘性能及外观工艺核查。",
                    "<b>测试数据采集与根因协同</b>：熟练运用万用表、扭力仪、色差仪采集实测数据并建立质量台账；发现异常批次立即隔离预警，配合研发与质量工程师完成故障复现、根因复核及改进验证。",
                ],
            },
        ]),
        ("项目与技术实践", [
            {
                "title": "自动化测试验证脚本、Ubuntu/Linux联调排障与流程实践 ｜ 个人项目",
                "date": "2026.06 - 至今",
                "bullets": [
                    "<b>Python自动化测试与回归门禁</b>：结合工程质检SOP思维，使用Python（unittest）构建“批量用例执行—超时监控—异常日志拦截—结构化评估报告”自动化验证脚本，提升重复回归测试与冒烟检查效率。",
                    "<b>Ubuntu/Linux部署与数字化履约实践</b>：独立完成Ubuntu/Linux服务器环境配置、模型API接口联调、网络端口连通性排错与手机端适配；另独立完成Ozon跨境店铺与妙手ERP（2025.11启动）刊登及订单履约管理。",
                ],
            },
        ]),
    ],
}

# 版本 3：AI应用落地与国际化技术交付工程师
EDITION_AI_GLOBAL = {
    **COMMON_BASE,
    "meta_line2": "<b>英语：</b>CET-6（550分·流利工作语言） ｜ <b>状态：</b>离职-随时到岗 ｜ <b>意向城市：</b>北京（接受出差）",
    "target": "求职意向：AI解决方案交付工程师 / 国际化技术支持与系统交付",
    "summary": (
        "电气工程及其自动化统招本科，英语六级 CET-6（550分，可作为日常工作语言）。"
        "具备多模态 AI 系统 Linux 云端部署与 API 联调、Python/TypeScript 自动化评测验证，以及 2 年+ 海外精密仪器客户与涉外工程全英文对接经验："
        "独立完成云端多模态工作台上线、OpenAI 兼容 RESTful API 多模型路由与线上健康巡检闭环（支持现场演示完整链路）；"
        "兼具海外客户需求梳理与上市制造企业 IPQC 质量管控底色，擅长推动 AI 与软硬件系统在业务场景稳定落地。"
    ),
    "skills": [
        (
            "AI系统部署与API联调",
            "熟悉Ubuntu/Linux服务器部署、反向代理、端口映射与跨域排障；掌握OpenAI兼容RESTful API多模型路由、鉴权计费幂等校验与超时日志排错",
        ),
        (
            "自动化评测与测试门禁",
            "掌握基于Python（unittest + 子进程调度）构建多Agent自动评分回归CLI，以及基于Node.js/TypeScript（Vitest + SQLite）搭建健康巡检与E2E测试",
        ),
        (
            "英语与国际化客户协同",
            "CET-6（550分），具备2年+全英文对接海外科学仪器经销商及外籍工程师经验；可流畅阅读英文API/SDK文档并独立输出中英文方案报价与验收报告",
        ),
        (
            "软硬协同与质量管控",
            "电气自动化科班 + 普析精密仪器与美的旗下合康新能IPQC经历；既熟悉云端API链路排障，又掌握物理硬件供配电、万用表检测与现场联调",
        ),
        (
            "项目交付与业务SOP",
            "擅长客户需求澄清、部署实施SOP编制、线上只读健康检查（Health Check）与用户培训终验签收；另具Ozon与妙手ERP跨境全链路实操经验",
        ),
    ],
    "sections": [
        ("项目经历", [
            {
                "title": "多模态AI工作台云端部署、API路由联调与自动化评测门禁 ｜ 个人项目",
                "date": "2026.06 - 至今",
                "bullets": [
                    "<b>多模态AI平台Linux云端部署与API落地</b>：独立完成多模态Web工作台在Ubuntu/Linux服务器环境部署、反向代理、端口映射及移动端适配；打通OpenAI兼容RESTful API多模型路由分发、鉴权计费幂等校验与跨域超时排障（支持电脑与手机访问演示完整流程）。",
                    "<b>Python自动化评测与TypeScript健康巡检</b>：基于Python（unittest + 子进程调度）构建多Agent批量用例回归与评估报告CLI；搭建Node.js/TypeScript（Vitest + SQLite）线上只读健康巡检与E2E测试闭环，另独立完成Ozon与妙手ERP（2025.11启动）跨境刊登履约实践。",
                ],
            },
        ]),
        ("工作经历", [
            PURKINJE_ITEM,
            {
                "title": "太和（天津）船舶工程有限公司 ｜ 涉外工程技术协调与验收",
                "date": "2024.05 - 2025.08",
                "bullets": [
                    "<b>全英文技术规格澄清与涉外协同</b>：1年4个月累计跟进超150艘次外籍大型船舶项目，约1/3工作时间使用英语直接对接外籍轮机长与技术代表，澄清技术规格、联调测试工况与安全验收标准，独立输出中英文工单与完工验收报告。",
                    "<b>多团队统筹调度与准点签收闭环</b>：月均独立统筹10余艘外轮、10-20项机电与自动化系统联调检修任务，单项目现场调度约5名工程师交叉作业，全流程把控试运行验证、异常销项整改及客户初验/终验签单归档。",
                ],
            },
            {
                "title": "北京合康新能变频技术有限公司（美的集团旗下上市企业） ｜ 过程质量检验员（IPQC）",
                "date": "2023.12 - 2024.03",
                "bullets": [
                    "<b>硬件质量SOP管控与缺陷复现</b>：严格依据制造业SOP执行新能源储能高压控制盒及电池包过程检验，熟练运用万用表、扭力仪、色差仪完成电气导通/绝缘与结构参数实测，协同研发与工程团队推进异常隔离、故障复现与根因闭环。",
                ],
            },
        ]),
    ],
    "edu_courses": "<b>技术栈与主修：</b>Ubuntu/Linux、Python（unittest）、TypeScript/Node.js（Vitest）、OpenAI兼容API、SQLite、自动控制原理",
}


if __name__ == "__main__":
    for d in OUT_DIRS:
        os.makedirs(d, exist_ok=True)

    specs = [
        ("夏嘉铭_AI应用落地与国际化技术交付工程师.pdf", "jiaming_xia_ai_global.pdf", EDITION_AI_GLOBAL),
        ("夏嘉铭_机器人与智能装备实施交付工程师.pdf", "jiaming_xia_robotics_delivery.pdf", EDITION_DELIVERY),
        ("夏嘉铭_机器人整机测试与器械技术支持.pdf", "jiaming_xia_testing_support.pdf", EDITION_TESTING),
    ]

    for fname, ascii_name, payload in specs:
        primary_out = os.path.join(OUT_DIRS[0], fname)
        build_clean_resume_pdf(primary_out, payload)
        with open(primary_out, "rb") as rf:
            raw = rf.read()
        pages = len(re.findall(rb"/Type\s*/Page\b", raw))
        links = len(re.findall(rb"/URI\s*\(https://xjiaming644-del\.github\.io/resume/\)", raw))
        print(f"GENERATED: {fname} ({ascii_name}) | {len(raw)//1024}KB | pages={pages} | clickable_links={links}")
        assert pages == 1, f"ERROR: {fname} spilled onto {pages} pages!"
        assert links >= 2, f"ERROR: {fname} missing clickable URI annotations (found {links})!"
        with open(os.path.join(OUT_DIRS[0], ascii_name), "wb") as af:
            af.write(raw)
        for extra_dir in OUT_DIRS[1:]:
            with open(os.path.join(extra_dir, fname), "wb") as wf:
                wf.write(raw)
    print("ALL_SYNCED_OK")
