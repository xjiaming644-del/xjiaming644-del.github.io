// Minimalist Editorial Controller: Typewriter, Bilingual Toggle, Horizontal Drag-Swipe & Section Tracking
(function () {
  const DATA = window.RESUME_DATA;
  if (!DATA) return;

  let lang = "zh";
  let twTimer = null;

  const elBrandText = document.getElementById("brand-text");
  const elAsterisk = document.getElementById("brand-asterisk");
  const elTopNav = document.querySelector(".top-nav");
  const elNavCenter = document.getElementById("nav-center");
  const elLangSwitch = document.getElementById("lang-switch");
  const elCtaRight = document.getElementById("cta-right");
  const elDragHint = document.getElementById("drag-hint");

  const elBlurIntro = document.getElementById("blurred-intro");
  const elTypewriter = document.getElementById("typewriter-line");
  const elPillCluster = document.getElementById("pill-cluster");

  const elSecWork = document.getElementById("sec-work");
  const elSecProjects = document.getElementById("sec-projects");
  const elSecSkills = document.getElementById("sec-skills");
  const elSecEdu = document.getElementById("sec-edu");

  function runTypewriter(fullText) {
    if (twTimer) clearInterval(twTimer);
    let i = 0;
    elTypewriter.innerHTML = `<span class="tw-text"></span><span class="tw-cursor"></span>`;
    const spanText = elTypewriter.querySelector(".tw-text");
    const spanCur = elTypewriter.querySelector(".tw-cursor");

    twTimer = setInterval(() => {
      i += 1;
      spanText.textContent = fullText.slice(0, i);
      if (i >= fullText.length) {
        clearInterval(twTimer);
        twTimer = null;
        setTimeout(() => {
          if (spanCur) spanCur.style.display = "none";
        }, 1200);
      }
    }, 32);
  }

  function renderPage() {
    const d = DATA[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    // Top Navbar
    elBrandText.textContent = d.brand;
    elLangSwitch.textContent = d.langBtn;
    elCtaRight.textContent = d.ctaRight;
    elDragHint.textContent = d.dragHint;

    elNavCenter.innerHTML = d.nav.map((item, idx) => {
      const comma = idx < d.nav.length - 1 ? `<span class="nav-comma">,</span>` : "";
      return `<a class="nav-link" href="#${item.id}">${item.label}</a>${comma}`;
    }).join("");

    // Hero Blurred Intro + Typewriter
    elBlurIntro.innerHTML = `${d.blurLine1}<br />${d.blurLine2}`;
    runTypewriter(d.heroTypewriter);

    // Hero Pills (4-5 White Action Pills + 1 Outline Copy Pill)
    const pillsHtml = d.pills.map((p) =>
      `<a class="action-pill" href="#${p.target}">${p.label}</a>`
    ).join("");

    const copySvg = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
    const copyPillHtml = `
      <button id="copy-contact-pill" class="outline-copy-pill" type="button">
        <span>${d.copyPillPrefix}<span class="copy-underline">${d.copyDisplay}</span></span>
        ${copySvg}
      </button>
    `;
    elPillCluster.innerHTML = pillsHtml + copyPillHtml;

    elPillCluster.querySelectorAll(".action-pill").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.CRT_CHARACTER) window.CRT_CHARACTER.nod();
      });
    });

    const copyBtn = document.getElementById("copy-contact-pill");
    const origHtml = copyBtn.innerHTML;
    let toastTimer = null;
    copyBtn.addEventListener("click", () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(d.copyValue).catch(() => fallbackCopy(d.copyValue));
      } else {
        fallbackCopy(d.copyValue);
      }
      copyBtn.textContent = d.copiedToast;
      if (window.CRT_CHARACTER) window.CRT_CHARACTER.nod();
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        copyBtn.innerHTML = origHtml;
      }, 1800);
    });

    // 01 / Work Section
    elSecWork.innerHTML = `
      <div class="sec-kicker">${d.workSection.kicker}</div>
      <h2 class="sec-heading">${d.workSection.title}</h2>
      ${d.workSection.items.map((it) => `
        <article class="entry-block">
          <div class="entry-meta">${it.period}</div>
          <h3 class="entry-org">${it.company}</h3>
          <div class="entry-role">${it.role}</div>
          <ul class="entry-bullets">
            ${it.bullets.map((b) => `<li>${b}</li>`).join("")}
          </ul>
        </article>
      `).join("")}
    `;

    // 02 / Projects Section
    const p = d.projectSection;
    elSecProjects.innerHTML = `
      <div class="sec-kicker">${p.kicker}</div>
      <h2 class="sec-heading">${p.title}</h2>
      <article class="entry-block">
        <div class="entry-meta">${p.period}</div>
        <h3 class="entry-org">${p.name}</h3>
        <div class="entry-role">${p.role}</div>
        <ul class="entry-bullets">
          ${p.bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </article>
    `;

    // 03 / Horizontal Swipeable Skills Section
    const s = d.skillSection;
    elSecSkills.innerHTML = `
      <div class="sec-kicker">${s.kicker}</div>
      <div class="swipe-header-row">
        <h2 class="sec-heading" style="margin-bottom:0;">${s.title}</h2>
      </div>
      <div class="swipe-controls">
        <div class="swipe-hint">${s.swipeHint}</div>
        <div class="swipe-arrows">
          <button id="skills-prev" class="swipe-arrow-btn" type="button" aria-label="Previous skill card">←</button>
          <button id="skills-next" class="swipe-arrow-btn" type="button" aria-label="Next skill card">→</button>
        </div>
      </div>
      <div id="skills-carousel" class="skills-carousel">
        ${s.cards.map((c) => `
          <div class="skill-card">
            <div class="skill-num">${c.num}</div>
            <div class="skill-title">${c.title}</div>
            <p class="skill-desc">${c.desc}</p>
          </div>
        `).join("")}
      </div>
    `;
    bindHorizontalDragScroll(
      document.getElementById("skills-carousel"),
      document.getElementById("skills-prev"),
      document.getElementById("skills-next")
    );

    // 04 / Education & PDF Resume Download Section
    const ed = d.eduSection;
    elSecEdu.innerHTML = `
      <div class="sec-kicker">${ed.kicker}</div>
      <h2 class="sec-heading">${ed.title}</h2>
      <p class="edu-detail"><strong>${ed.degreeLine}</strong></p>
      <p class="edu-detail">${ed.honors}</p>
      <p class="edu-detail">${ed.statusLine}</p>
      <div class="pdf-prompt">${ed.pdfPrompt}</div>
      <div class="pdf-pill-list">
        ${ed.pdfs.map((pdf) => `<a class="action-pill" href="${pdf.href}" download="${pdf.download || ''}">${pdf.label}</a>`).join("")}
      </div>
    `;
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (_) {}
    document.body.removeChild(ta);
  }

  function bindHorizontalDragScroll(scroller, prevBtn, nextBtn) {
    if (!scroller) return;
    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const endDrag = () => {
      if (!isDown) return;
      isDown = false;
      scroller.classList.remove("is-dragging");
    };

    scroller.addEventListener("pointerdown", (e) => {
      isDown = true;
      scroller.classList.add("is-dragging");
      startX = e.clientX;
      startScrollLeft = scroller.scrollLeft;
    });
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    scroller.addEventListener("pointermove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const dx = e.clientX - startX;
      scroller.scrollLeft = startScrollLeft - dx * 1.35;
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        scroller.scrollBy({ left: -264, behavior: "smooth" });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        scroller.scrollBy({ left: 264, behavior: "smooth" });
      });
    }
  }

  // Language Switch
  elLangSwitch.addEventListener("click", () => {
    lang = lang === "zh" ? "en" : "zh";
    renderPage();
  });

  // Rotate asterisk subtly & sync CRT character mood on scroll
  const moodSections = [
    { id: "sec-hero", mood: "hero" },
    { id: "sec-work", mood: "work" },
    { id: "sec-projects", mood: "projects" },
    { id: "sec-skills", mood: "skills" },
    { id: "sec-edu", mood: "edu" }
  ];

  let activeMood = "hero";
  window.addEventListener("scroll", () => {
    if (elTopNav) {
      elTopNav.classList.toggle("is-scrolled", window.scrollY > 28);
    }
    elAsterisk.style.transform = `rotate(${(window.scrollY * 0.18).toFixed(1)}deg)`;
    const mid = window.innerHeight * 0.45;
    for (const item of moodSections) {
      const dom = document.getElementById(item.id);
      if (!dom) continue;
      const rect = dom.getBoundingClientRect();
      if (rect.top <= mid && rect.bottom >= mid * 0.4) {
        if (activeMood !== item.mood) {
          activeMood = item.mood;
          if (window.CRT_CHARACTER) window.CRT_CHARACTER.setMood(activeMood);
        }
        break;
      }
    }
  }, { passive: true });

  renderPage();
})();
