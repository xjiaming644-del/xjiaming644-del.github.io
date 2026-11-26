// Gallery-Grade Retro-Futurist 3D CRT-Monitor-Head Engineer (Mainframe® / ARIA Homage)
// Sculpted beveled CRT bezel + curved phosphor glass + tailored wool blazer + folded shirt collar
// Supports: Cursor Tracking (X/Y), Click-Drag 3D Spin, Scroll Choreography & Natural Blinking Eyes
(function () {
  const canvas = document.getElementById("webgl-stage");
  if (!canvas || !window.THREE) return;

  const THREE = window.THREE;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 60);

  // Soft Architectural Studio Lighting (matches matte gallery look in reference)
  const hemi = new THREE.HemisphereLight("#ffffff", "#c4c3bd", 1.55);
  scene.add(hemi);

  const keyLight = new THREE.DirectionalLight("#fffdf9", 1.55);
  keyLight.position.set(2.6, 4.6, 5.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.bias = -0.0005;
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight("#eef0f2", 0.92);
  fillLight.position.set(-4.0, 2.2, 3.8);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight("#ffffff", 0.58);
  rimLight.position.set(0.8, 3.4, -4.4);
  scene.add(rimLight);

  // --- Procedural Textures ---
  function createWoolSuitTexture() {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#8a8981";
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 2) {
      for (let x = 0; x < 256; x += 2) {
        const weave = ((x + y) % 4 === 0 ? 7 : -5) + (Math.random() * 14 - 7);
        const r = Math.min(255, Math.max(0, 136 + weave));
        const g = Math.min(255, Math.max(0, 135 + weave));
        const b = Math.min(255, Math.max(0, 128 + weave));
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function createAbsPlasticTexture() {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#d2d0c8";
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 2) {
      for (let x = 0; x < 256; x += 2) {
        const n = (Math.random() - 0.5) * 8;
        const v = (210 + n) | 0;
        ctx.fillStyle = `rgb(${v},${v - 2},${v - 8})`;
        ctx.fillRect(x, y, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  function createBadgeTexture() {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 72;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#918f87";
    ctx.fillRect(0, 0, 256, 72);
    ctx.strokeStyle = "rgba(55, 55, 50, 0.45)";
    ctx.lineWidth = 4;
    ctx.strokeRect(4, 4, 248, 64);
    ctx.fillStyle = "#dcdad2";
    ctx.font = "600 26px 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JIAMING", 128, 37);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // --- Geometry Helpers ---
  function createRoundedRectShape(w, h, r, clockwise) {
    const shape = new THREE.Shape();
    const hw = w / 2, hh = h / 2;
    if (!clockwise) {
      shape.moveTo(-hw + r, -hh);
      shape.lineTo(hw - r, -hh);
      shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
      shape.lineTo(hw, hh - r);
      shape.quadraticCurveTo(hw, hh, hw - r, hh);
      shape.lineTo(-hw + r, hh);
      shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
      shape.lineTo(-hw, -hh + r);
      shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);
    } else {
      shape.moveTo(-hw + r, -hh);
      shape.quadraticCurveTo(-hw, -hh, -hw, -hh + r);
      shape.lineTo(-hw, hh - r);
      shape.quadraticCurveTo(-hw, hh, -hw + r, hh);
      shape.lineTo(hw - r, hh);
      shape.quadraticCurveTo(hw, hh, hw, hh - r);
      shape.lineTo(hw, -hh + r);
      shape.quadraticCurveTo(hw, -hh, hw - r, -hh);
      shape.lineTo(-hw + r, -hh);
    }
    return shape;
  }

  function createRoundedRectHole(cx, cy, w, h, r) {
    const path = new THREE.Path();
    const hw = w / 2, hh = h / 2;
    path.moveTo(cx - hw + r, cy - hh);
    path.quadraticCurveTo(cx - hw, cy - hh, cx - hw, cy - hh + r);
    path.lineTo(cx - hw, cy + hh - r);
    path.quadraticCurveTo(cx - hw, cy + hh, cx - hw + r, cy + hh);
    path.lineTo(cx + hw - r, cy + hh);
    path.quadraticCurveTo(cx + hw, cy + hh, cx + hw, cy + hh - r);
    path.lineTo(cx + hw, cy - hh + r);
    path.quadraticCurveTo(cx + hw, cy - hh, cx + hw - r, cy - hh);
    path.lineTo(cx - hw + r, cy - hh);
    return path;
  }

  // Smooth lofted rounded-box geometry for tapered CRT rear housing & under-chin
  function createLoftedRoundedBox(slices, cornerRadius, radialPerSide) {
    const ringPts = [];
    const ptsPerRing = radialPerSide * 4;
    for (let s = 0; s < slices.length; s++) {
      const { w, h, z, cy = 0 } = slices[s];
      const hw = w / 2, hh = h / 2;
      const r = Math.min(cornerRadius, hw * 0.45, hh * 0.45);
      const corners = [
        { cx: hw - r, cy: cy + hh - r, a0: 0, a1: Math.PI / 2 },
        { cx: -hw + r, cy: cy + hh - r, a0: Math.PI / 2, a1: Math.PI },
        { cx: -hw + r, cy: cy - hh + r, a0: Math.PI, a1: Math.PI * 1.5 },
        { cx: hw - r, cy: cy - hh + r, a0: Math.PI * 1.5, a1: Math.PI * 2 }
      ];
      const ring = [];
      for (const c of corners) {
        for (let k = 0; k < radialPerSide; k++) {
          const t = radialPerSide === 1 ? 0.5 : k / (radialPerSide - 1);
          const a = c.a0 + (c.a1 - c.a0) * t;
          ring.push([c.cx + Math.cos(a) * r, c.cy + Math.sin(a) * r, z]);
        }
      }
      ringPts.push(ring);
    }

    const positions = [];
    const indices = [];
    for (let s = 0; s < ringPts.length; s++) {
      for (let i = 0; i < ptsPerRing; i++) {
        positions.push(ringPts[s][i][0], ringPts[s][i][1], ringPts[s][i][2]);
      }
    }
    for (let s = 0; s < ringPts.length - 1; s++) {
      const rowA = s * ptsPerRing;
      const rowB = (s + 1) * ptsPerRing;
      for (let i = 0; i < ptsPerRing; i++) {
        const ni = (i + 1) % ptsPerRing;
        const a = rowA + i, b = rowA + ni;
        const c = rowB + i, d = rowB + ni;
        indices.push(a, c, b, b, c, d);
      }
    }
    // Cap front & back
    const frontCenterIdx = positions.length / 3;
    positions.push(0, slices[0].cy || 0, slices[0].z);
    for (let i = 0; i < ptsPerRing; i++) {
      const ni = (i + 1) % ptsPerRing;
      indices.push(frontCenterIdx, i, ni);
    }
    const backIdxOffset = (ringPts.length - 1) * ptsPerRing;
    const backCenterIdx = positions.length / 3;
    const last = slices[slices.length - 1];
    positions.push(0, last.cy || 0, last.z);
    for (let i = 0; i < ptsPerRing; i++) {
      const ni = (i + 1) % ptsPerRing;
      indices.push(backCenterIdx, backIdxOffset + ni, backIdxOffset + i);
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  // Smooth lofted vertical rounded-box geometry (along Y axis) for tapered under-chin
  function createVerticalLoftedRoundedBox(slices, cornerRadius, radialPerSide) {
    const ringPts = [];
    const ptsPerRing = radialPerSide * 4;
    for (let s = 0; s < slices.length; s++) {
      const { w, d, y, cz = 0 } = slices[s];
      const hw = w / 2, hd = d / 2;
      const r = Math.min(cornerRadius, hw * 0.45, hd * 0.45);
      const corners = [
        { cx: hw - r, cz: cz + hd - r, a0: 0, a1: Math.PI / 2 },
        { cx: -hw + r, cz: cz + hd - r, a0: Math.PI / 2, a1: Math.PI },
        { cx: -hw + r, cz: cz - hd + r, a0: Math.PI, a1: Math.PI * 1.5 },
        { cx: hw - r, cz: cz - hd + r, a0: Math.PI * 1.5, a1: Math.PI * 2 }
      ];
      const ring = [];
      for (const c of corners) {
        for (let k = 0; k < radialPerSide; k++) {
          const t = radialPerSide === 1 ? 0.5 : k / (radialPerSide - 1);
          const a = c.a0 + (c.a1 - c.a0) * t;
          ring.push([c.cx + Math.cos(a) * r, y, c.cz + Math.sin(a) * r]);
        }
      }
      ringPts.push(ring);
    }
    const positions = [];
    const indices = [];
    for (let s = 0; s < ringPts.length; s++) {
      for (let i = 0; i < ptsPerRing; i++) {
        positions.push(ringPts[s][i][0], ringPts[s][i][1], ringPts[s][i][2]);
      }
    }
    for (let s = 0; s < ringPts.length - 1; s++) {
      const rowA = s * ptsPerRing;
      const rowB = (s + 1) * ptsPerRing;
      for (let i = 0; i < ptsPerRing; i++) {
        const ni = (i + 1) % ptsPerRing;
        indices.push(rowA + i, rowA + ni, rowB + i, rowA + ni, rowB + ni, rowB + i);
      }
    }
    const topCenterIdx = positions.length / 3;
    positions.push(0, slices[0].y, slices[0].cz || 0);
    for (let i = 0; i < ptsPerRing; i++) {
      const ni = (i + 1) % ptsPerRing;
      indices.push(topCenterIdx, ni, i);
    }
    const botIdxOffset = (ringPts.length - 1) * ptsPerRing;
    const botCenterIdx = positions.length / 3;
    const last = slices[slices.length - 1];
    positions.push(0, last.y, last.cz || 0);
    for (let i = 0; i < ptsPerRing; i++) {
      const ni = (i + 1) % ptsPerRing;
      indices.push(botCenterIdx, botIdxOffset + i, botIdxOffset + ni);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  // Smooth sculpted blazer torso + continuous sloped shoulders & sleeves (zero seam caps!)
  function createSculptedBlazerTorso() {
    const sections = [
      { y: -1.36, rx: 1.26, rz: 0.34, zOff: -0.02 },
      { y: -0.92, rx: 1.23, rz: 0.34, zOff: -0.01 },
      { y: -0.56, rx: 1.18, rz: 0.33, zOff: 0.0 },
      { y: -0.32, rx: 1.02, rz: 0.30, zOff: 0.0 },
      { y: -0.18, rx: 0.68, rz: 0.25, zOff: 0.0 },
      { y: -0.08, rx: 0.35, rz: 0.21, zOff: 0.01 },
      { y: 0.00, rx: 0.23, rz: 0.19, zOff: 0.01 }
    ];
    const segs = 48;
    const positions = [];
    const uvs = [];
    const indices = [];

    for (let s = 0; s < sections.length; s++) {
      const { y, rx, rz, zOff } = sections[s];
      for (let i = 0; i < segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);
        const x = Math.sign(cosT) * Math.pow(Math.abs(cosT), 0.80) * rx;
        let z = Math.sign(sinT) * Math.pow(Math.abs(sinT), 0.88) * rz + zOff;
        // Subtle front V-opening chest indentation for dress shirt
        if (sinT > 0.32 && Math.abs(x) < 0.33 && y > -0.86 && y < -0.04) {
          const tDepth = (1 - Math.abs(x) / 0.33) * ((y + 0.86) / 0.82);
          z -= 0.068 * Math.min(1, tDepth);
        }
        // Subtle tailored armhole crease where upper sleeve drapes beside torso
        if (y < -0.34 && Math.abs(x) > 0.72 && Math.abs(x) < 0.94 && sinT > -0.4) {
          const crease = 1 - Math.abs(Math.abs(x) - 0.83) / 0.11;
          const depthScale = Math.min(1, (-0.34 - y) / 0.45);
          z -= 0.032 * crease * depthScale * Math.sign(sinT || 1);
        }
        positions.push(x, y, z);
        uvs.push(i / segs, s / (sections.length - 1));
      }
    }

    for (let s = 0; s < sections.length - 1; s++) {
      const aRow = s * segs;
      const bRow = (s + 1) * segs;
      for (let i = 0; i < segs; i++) {
        const ni = (i + 1) % segs;
        indices.push(aRow + i, aRow + ni, bRow + i);
        indices.push(aRow + ni, bRow + ni, bRow + i);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  // --- Live 2D Canvas Texture for the Vintage CRT Curved Phosphor Screen ---
  const crtCanvas = document.createElement("canvas");
  crtCanvas.width = 560;
  crtCanvas.height = 384;
  const crtCtx = crtCanvas.getContext("2d");
  const crtTex = new THREE.CanvasTexture(crtCanvas);
  crtTex.colorSpace = THREE.SRGBColorSpace;

  const eyeState = {
    lookX: 0,
    lookY: 0,
    blink: 0,
    nextBlinkAt: 5.2,
    mood: "hero"
  };

  function drawCRTScreen(t) {
    const w = 560, h = 384;
    // Deep matte-charcoal vintage phosphor glass
    const grad = crtCtx.createRadialGradient(w * 0.48, h * 0.48, 25, w * 0.5, h * 0.5, 310);
    grad.addColorStop(0, "#2f3130");
    grad.addColorStop(0.68, "#1c1e1d");
    grad.addColorStop(1, "#0f1010");
    crtCtx.fillStyle = grad;
    crtCtx.fillRect(0, 0, w, h);

    // Soft diffused studio skylight reflection across curved CRT glass (no hard boxy edges)
    const refl = crtCtx.createRadialGradient(w * 0.34, h * 0.24, 15, w * 0.34, h * 0.26, 175);
    refl.addColorStop(0, "rgba(255, 255, 255, 0.08)");
    refl.addColorStop(0.6, "rgba(255, 255, 255, 0.025)");
    refl.addColorStop(1, "rgba(255, 255, 255, 0)");
    crtCtx.fillStyle = refl;
    crtCtx.fillRect(0, 0, w, h);

    // Glowing true-circular eyes (soft warm-white with gentle blush-peach phosphor bloom)
    const exOffset = eyeState.lookX * 36;
    const eyOffset = -eyeState.lookY * 22;
    const leftX = 194 + exOffset;
    const rightX = 366 + exOffset;
    const centerY = 192 + eyOffset;
    const baseR = 52;
    const scaleY = Math.max(0.08, 1 - eyeState.blink);

    [leftX, rightX].forEach((cx) => {
      crtCtx.save();
      crtCtx.translate(cx, centerY);
      crtCtx.scale(1, scaleY);

      const bloom = crtCtx.createRadialGradient(0, 0, baseR * 0.55, 0, 0, baseR * 1.55);
      bloom.addColorStop(0, "rgba(255, 240, 242, 0.96)");
      bloom.addColorStop(0.55, "rgba(255, 218, 224, 0.35)");
      bloom.addColorStop(1, "rgba(255, 218, 224, 0)");
      crtCtx.fillStyle = bloom;
      crtCtx.beginPath();
      crtCtx.arc(0, 0, baseR * 1.55, 0, Math.PI * 2);
      crtCtx.fill();

      crtCtx.fillStyle = "#fff4f5";
      crtCtx.beginPath();
      crtCtx.arc(0, 0, baseR, 0, Math.PI * 2);
      crtCtx.fill();
      crtCtx.restore();
    });

    // Subtle CRT horizontal scanlines
    crtCtx.fillStyle = "rgba(0, 0, 0, 0.11)";
    for (let y = 0; y < h; y += 4) {
      crtCtx.fillRect(0, y, w, 1.3);
    }

    // Inner glass bezel vignette
    const vig = crtCtx.createRadialGradient(w * 0.5, h * 0.5, w * 0.34, w * 0.5, h * 0.5, w * 0.68);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, "rgba(0,0,0,0.48)");
    crtCtx.fillStyle = vig;
    crtCtx.fillRect(0, 0, w, h);

    crtTex.needsUpdate = true;
  }

  // --- Root Character Assembly ---
  const characterRoot = new THREE.Group();
  scene.add(characterRoot);

  function updateCameraFraming() {
    camera.aspect = window.innerWidth / window.innerHeight;
    const isMobile = window.innerWidth < 960;
    camera.position.set(0, 0.22, isMobile ? 5.95 : 4.95);
    camera.lookAt(0, 0.18, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    characterRoot.position.set(isMobile ? 0 : 0.84, isMobile ? 0.04 : -0.18, 0);
    characterRoot.scale.setScalar(isMobile ? 0.88 : 1.0);
  }
  updateCameraFraming();
  window.addEventListener("resize", updateCameraFraming);

  // --- A. Tailored Wool Blazer, Sleeves, Dress Shirt & Folded Collar ---
  const torsoGroup = new THREE.Group();
  characterRoot.add(torsoGroup);

  const woolTex = createWoolSuitTexture();
  const suitMat = new THREE.MeshStandardMaterial({
    map: woolTex,
    bumpMap: woolTex,
    bumpScale: 0.014,
    color: "#999890",
    roughness: 0.90,
    metalness: 0.02
  });
  const lapelMat = new THREE.MeshStandardMaterial({
    map: woolTex,
    bumpMap: woolTex,
    bumpScale: 0.012,
    color: "#8f8e86",
    roughness: 0.88,
    metalness: 0.02
  });
  const shirtMat = new THREE.MeshStandardMaterial({
    color: "#ecebe5",
    roughness: 0.65,
    metalness: 0.01
  });
  const buttonMat = new THREE.MeshStandardMaterial({
    color: "#dcdad0",
    roughness: 0.35,
    metalness: 0.05
  });
  const skinNeckMat = new THREE.MeshStandardMaterial({
    color: "#dec8b4",
    roughness: 0.58,
    metalness: 0.01
  });

  // Sculpted seamless blazer chest, sloped shoulders & natural arm drape
  const blazerChest = new THREE.Mesh(createSculptedBlazerTorso(), suitMat);
  blazerChest.castShadow = true;
  blazerChest.receiveShadow = true;
  torsoGroup.add(blazerChest);

  // Inner Dress Shirt V-Front (tucked flatly inside jacket opening)
  const shirtShape = new THREE.Shape();
  shirtShape.moveTo(0, -0.92);
  shirtShape.lineTo(0.29, -0.10);
  shirtShape.lineTo(0.18, 0.03);
  shirtShape.lineTo(-0.18, 0.03);
  shirtShape.lineTo(-0.29, -0.10);
  shirtShape.closePath();

  const shirtPanel = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shirtShape, { depth: 0.06, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2 }),
    shirtMat
  );
  shirtPanel.position.set(0, 0, 0.215);
  shirtPanel.receiveShadow = true;
  torsoGroup.add(shirtPanel);

  // Shirt center button placket + 2 subtle buttons
  const placket = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.74, 0.015), shirtMat);
  placket.position.set(0, -0.42, 0.285);
  torsoGroup.add(placket);

  [-0.24, -0.46, -0.68].forEach((by) => {
    const btn = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.012, 16), buttonMat);
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0, by, 0.295);
    torsoGroup.add(btn);
  });

  // Tailored Notched Suit Lapels (left & right symmetric ExtrudeGeometry)
  [-1, 1].forEach((side) => {
    const ls = new THREE.Shape();
    ls.moveTo(0, -0.92);
    ls.lineTo(side * 0.27, -0.10);
    ls.lineTo(side * 0.22, 0.01);
    ls.lineTo(side * 0.41, -0.05);
    ls.lineTo(side * 0.34, -0.14);
    ls.lineTo(side * 0.44, -0.19);
    ls.lineTo(side * 0.24, -0.78);
    ls.lineTo(side * 0.08, -0.98);
    ls.closePath();

    const lapel = new THREE.Mesh(
      new THREE.ExtrudeGeometry(ls, { depth: 0.03, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 3 }),
      lapelMat
    );
    lapel.position.set(0, 0, 0.265);
    lapel.rotation.x = -0.07;
    lapel.rotation.y = side * -0.11;
    lapel.castShadow = true;
    lapel.receiveShadow = true;
    torsoGroup.add(lapel);
  });

  // Crisp Shirt Collar Band + Folded Collar Points (clearly visible framing neck)
  const collarBand = new THREE.Mesh(new THREE.CylinderGeometry(0.185, 0.21, 0.14, 28), shirtMat);
  collarBand.position.set(0, -0.01, 0.04);
  collarBand.receiveShadow = true;
  torsoGroup.add(collarBand);

  [-1, 1].forEach((side) => {
    const flapShape = new THREE.Shape();
    flapShape.moveTo(0, 0.055);
    flapShape.lineTo(side * 0.16, 0.015);
    flapShape.lineTo(side * 0.19, -0.13);
    flapShape.lineTo(side * 0.025, -0.045);
    flapShape.closePath();

    const flap = new THREE.Mesh(
      new THREE.ExtrudeGeometry(flapShape, { depth: 0.018, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 2 }),
      shirtMat
    );
    flap.position.set(side * 0.02, -0.01, 0.245);
    flap.rotation.y = side * 0.36;
    flap.rotation.x = -0.14;
    flap.castShadow = true;
    torsoGroup.add(flap);
  });

  // Natural Skin Neck (sits cleanly inside collar up into CRT chin)
  const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.168, 0.24, 28), skinNeckMat);
  neckMesh.position.set(0, 0.06, 0.04);
  neckMesh.receiveShadow = true;
  torsoGroup.add(neckMesh);

  // --- B. Vintage 1984 Compact CRT Monitor Head ---
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.15, 0.03);
  characterRoot.add(headPivot);

  const absTex = createAbsPlasticTexture();
  const absCreamMat = new THREE.MeshStandardMaterial({
    map: absTex,
    color: "#d4d2ca",
    roughness: 0.46,
    metalness: 0.04
  });
  const absDarkerMat = new THREE.MeshStandardMaterial({
    map: absTex,
    color: "#b9b7ae",
    roughness: 0.50,
    metalness: 0.06
  });
  const innerRecessMat = new THREE.MeshStandardMaterial({
    color: "#222423",
    roughness: 0.58,
    metalness: 0.06
  });

  // 1. Beveled Front CRT Bezel Cabinet with Real Recessed Screen Cutout
  const bezelShape = createRoundedRectShape(1.02, 1.03, 0.05, false);
  bezelShape.holes.push(createRoundedRectHole(0, 0.15, 0.84, 0.58, 0.045));

  const frontBezel = new THREE.Mesh(
    new THREE.ExtrudeGeometry(bezelShape, {
      depth: 0.24,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.03,
      bevelSegments: 4
    }),
    absCreamMat
  );
  frontBezel.position.set(0, 0.55, 0.14);
  frontBezel.castShadow = true;
  frontBezel.receiveShadow = true;
  headPivot.add(frontBezel);

  // Inner dark recessed housing behind screen opening
  const screenBackBox = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.62, 0.14), innerRecessMat);
  screenBackBox.position.set(0, 0.70, 0.28);
  headPivot.add(screenBackBox);

  // Subtle curved dark CRT phosphor glass plane
  const screenGeom = new THREE.PlaneGeometry(0.82, 0.56, 22, 16);
  const posAttr = screenGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const nx = x / 0.41;
    const ny = y / 0.28;
    const bulge = 0.042 * Math.max(0, 1 - 0.65 * nx * nx) * Math.max(0, 1 - 0.65 * ny * ny);
    posAttr.setZ(i, bulge);
  }
  screenGeom.computeVertexNormals();

  const screenMesh = new THREE.Mesh(
    screenGeom,
    new THREE.MeshBasicMaterial({ map: crtTex })
  );
  screenMesh.position.set(0, 0.70, 0.345);
  headPivot.add(screenMesh);

  // Glossy clearcoat glass reflection overlay over curved CRT
  const screenGlass = new THREE.Mesh(
    screenGeom,
    new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.08,
      roughness: 0.09,
      metalness: 0.05,
      clearcoat: 1.0
    })
  );
  screenGlass.position.set(0, 0.70, 0.349);
  headPivot.add(screenGlass);

  // 2. Smooth Lofted Tapered Rear CRT Housing (seamless back silhouette from any drag angle!)
  const rearGeom = createLoftedRoundedBox(
    [
      { w: 1.06, h: 1.07, z: 0.16, cy: 0.55 },
      { w: 1.02, h: 1.03, z: -0.02, cy: 0.55 },
      { w: 0.88, h: 0.90, z: -0.24, cy: 0.56 },
      { w: 0.70, h: 0.72, z: -0.46, cy: 0.57 },
      { w: 0.62, h: 0.64, z: -0.52, cy: 0.57 }
    ],
    0.075,
    6
  );
  const rearMesh = new THREE.Mesh(rearGeom, absDarkerMat);
  rearMesh.castShadow = true;
  rearMesh.receiveShadow = true;
  headPivot.add(rearMesh);

  // 3. Classic Tapered Under-Chin Base (lofted along Y directly beneath CRT cabinet)
  const chinGeom = createVerticalLoftedRoundedBox(
    [
      { w: 1.00, d: 0.44, y: 0.025, cz: 0.21 },
      { w: 0.80, d: 0.30, y: -0.065, cz: 0.17 }
    ],
    0.045,
    4
  );
  const chinMesh = new THREE.Mesh(chinGeom, absDarkerMat);
  chinMesh.castShadow = true;
  headPivot.add(chinMesh);

  // 4. Lower Front Panel Moldings (Seam groove, Engraved Brand Plate, Floppy Slot, Power Switch)
  const seamLine = new THREE.Mesh(
    new THREE.BoxGeometry(1.06, 0.008, 0.02),
    new THREE.MeshStandardMaterial({ color: "#8c8a82", roughness: 0.7 })
  );
  seamLine.position.set(0, 0.31, 0.415);
  headPivot.add(seamLine);

  const badgePlate = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 0.072, 0.018),
    new THREE.MeshStandardMaterial({ map: createBadgeTexture(), roughness: 0.42, metalness: 0.14 })
  );
  badgePlate.position.set(0, 0.22, 0.415);
  headPivot.add(badgePlate);

  const floppyFrame = new THREE.Mesh(
    new THREE.BoxGeometry(0.36, 0.032, 0.018),
    new THREE.MeshStandardMaterial({ color: "#3b3b38", roughness: 0.65 })
  );
  floppyFrame.position.set(-0.07, 0.115, 0.412);
  headPivot.add(floppyFrame);

  const powerSwitchHousing = new THREE.Mesh(
    new THREE.BoxGeometry(0.068, 0.068, 0.016),
    absDarkerMat
  );
  powerSwitchHousing.position.set(0.34, 0.115, 0.412);
  headPivot.add(powerSwitchHousing);

  const powerLed = new THREE.Mesh(
    new THREE.SphereGeometry(0.011, 12, 12),
    new THREE.MeshStandardMaterial({ color: "#4d6b56", roughness: 0.4 })
  );
  powerLed.position.set(0.34, 0.115, 0.421);
  headPivot.add(powerLed);

  // Side Ventilation Slots on Left & Right Flanks
  [-1, 1].forEach((side) => {
    for (let i = 0; i < 6; i++) {
      const vent = new THREE.Mesh(
        new THREE.BoxGeometry(0.016, 0.016, 0.24),
        new THREE.MeshStandardMaterial({ color: "#76746d", roughness: 0.7 })
      );
      vent.position.set(side * 0.535, 0.42 + i * 0.05, 0.08);
      headPivot.add(vent);
    }
  });

  // --- C. Interactive Motion State (Cursor Look + Drag Spin + Scroll Stance) ---
  const motion = {
    pointerX: 0,
    pointerY: 0,
    dragYaw: 0,
    dragPitch: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    scrollProgress: 0,
    curHeadYaw: -0.22,
    curHeadPitch: 0.02,
    curBodyYaw: -0.12
  };

  window.addEventListener("pointermove", (e) => {
    motion.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    motion.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);

    if (motion.isDragging) {
      const dx = e.clientX - motion.lastX;
      const dy = e.clientY - motion.lastY;
      motion.lastX = e.clientX;
      motion.lastY = e.clientY;
      motion.dragYaw = Math.max(-1.65, Math.min(1.65, motion.dragYaw + dx * 0.0085));
      motion.dragPitch = Math.max(-0.42, Math.min(0.42, motion.dragPitch + dy * 0.006));
    }
  });

  canvas.addEventListener("pointerdown", (e) => {
    motion.isDragging = true;
    motion.lastX = e.clientX;
    motion.lastY = e.clientY;
  });

  window.addEventListener("pointerup", () => {
    motion.isDragging = false;
  });

  window.addEventListener("scroll", () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    motion.scrollProgress = window.scrollY / maxScroll;
  }, { passive: true });

  window.CRT_CHARACTER = {
    setMood(mood) {
      eyeState.mood = mood;
      eyeState.blink = 0.82;
    },
    nod() {
      motion.dragPitch = 0.14;
    }
  };

  // --- Animation Loop ---
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsedTime();

    if (!motion.isDragging) {
      motion.dragYaw *= 0.962;
      motion.dragPitch *= 0.94;
    }

    // Natural Blinking
    if (t > eyeState.nextBlinkAt) {
      eyeState.blink = 1.0;
      eyeState.nextBlinkAt = t + 2.8 + Math.random() * 2.8;
    }
    if (eyeState.blink > 0) {
      eyeState.blink = Math.max(0, eyeState.blink - dt * 7.8);
    }

    // Cursor tracking inside CRT screen
    eyeState.lookX += (motion.pointerX - eyeState.lookX) * 0.14;
    eyeState.lookY += (motion.pointerY - eyeState.lookY) * 0.14;
    drawCRTScreen(t);

    // Slight natural attentive turn left toward user & text column (like reference!)
    const scrollYawBias = -0.22 + Math.sin(motion.scrollProgress * Math.PI) * -0.14;

    const targetHeadYaw = scrollYawBias + motion.pointerX * 0.42 + motion.dragYaw;
    const targetHeadPitch = -motion.pointerY * 0.18 + motion.dragPitch;
    const targetBodyYaw = scrollYawBias * 0.55 + motion.pointerX * 0.12 + motion.dragYaw * 0.48;

    motion.curHeadYaw += (targetHeadYaw - motion.curHeadYaw) * 0.085;
    motion.curHeadPitch += (targetHeadPitch - motion.curHeadPitch) * 0.085;
    motion.curBodyYaw += (targetBodyYaw - motion.curBodyYaw) * 0.065;

    headPivot.rotation.y = motion.curHeadYaw;
    headPivot.rotation.x = motion.curHeadPitch;
    headPivot.rotation.z = Math.sin(t * 1.1) * 0.012 - motion.pointerX * 0.032;

    torsoGroup.rotation.y = motion.curBodyYaw;
    const baseY = window.innerWidth < 960 ? 0.04 : -0.18;
    characterRoot.position.y = baseY + Math.sin(t * 1.6) * 0.016;

    renderer.render(scene, camera);
  }

  animate();
})();
