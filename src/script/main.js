/**
 * main.js — Lightoxy Engineering Portal (minyu.my)
 * Cohesive Scroll-Driven Animation Architecture & WebGL Motif Controller
 * 
 * Hierarchy:
 * 1. CSS/JS Scroll-Driven Animation Core (GSAP ScrollTrigger + ScrollToPlugin)
 * 2. Pin-Aware Waypoint Navigator (Exact trigger coordinates, zero smooth-scroll drift)
 * 3. Selective Pinned Narrative Sequences (Featured Projects & Technical Capabilities)
 * 4. Connected Visual Narrative (Three.js WebGL Evolving Motif, Zero Idle CPU)
 * 5. Performance & Accessibility (0% idle CPU power gating, prefers-reduced-motion)
 * 6. Theme Coordinator & Interactive Inspectors (Bento Skill Matrix, Mobile Drawer)
 */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Active ScrollTrigger references for pin-compensated scroll coordinates
export const sectionTriggers = {};

// ============================================================================
// 1. THEME COORDINATOR
// ============================================================================
let updateOrbColors = null;

export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);

    if (typeof updateOrbColors === 'function') {
      updateOrbColors(newTheme);
    }
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
}

function updateThemeIcons(theme) {
  const sunIcons = document.querySelectorAll('.sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon');

  if (theme === 'light') {
    sunIcons.forEach(icon => icon.classList.add('hidden'));
    moonIcons.forEach(icon => icon.classList.remove('hidden'));
  } else {
    sunIcons.forEach(icon => icon.classList.remove('hidden'));
    moonIcons.forEach(icon => icon.classList.add('hidden'));
  }
}

// ============================================================================
// 2. MOBILE NAVIGATION DRAWER
// ============================================================================
export function initMobileDrawer() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileBtn || !mobileMenu) return;

  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
    });
  });
}

// ============================================================================
// 3. PIN-AWARE WAYPOINT NAVIGATOR & EXACT SCROLL TARGET RESOLVER
// ============================================================================
let isNavigating = false;
let navTween = null;

export function initSectionTriggers() {
  const zoneConfigs = [
    { id: 'hero', start: 'top top' },
    { id: 'about', start: 'top 64px' },
    { id: 'marquee-zone', start: 'top 64px' },
    { id: 'projects', start: 'top top' },
    { id: 'stack', start: 'top top' },
    { id: 'experience', start: 'top 64px' },
    { id: 'contact', start: 'top 64px' },
    { id: 'footer-anchor', start: 'bottom bottom' }
  ];

  zoneConfigs.forEach(({ id, start }) => {
    const el = document.getElementById(id);
    if (el && !sectionTriggers[id]) {
      sectionTriggers[id] = ScrollTrigger.create({
        trigger: el,
        start: start,
        refreshPriority: -1
      });
    }
  });
}

export function getZoneScrollTarget(id) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (id === 'hero') return 0;
  if (id === 'footer-anchor') return maxScroll;

  // If a ScrollTrigger instance exists (pinned or calibrated), its .start is exact and pin-compensated!
  if (sectionTriggers[id] && typeof sectionTriggers[id].start === 'number') {
    return Math.min(Math.max(sectionTriggers[id].start, 0), maxScroll);
  }

  const el = document.getElementById(id);
  if (!el) return 0;

  const headerOffset = 64;
  const currentScroll = window.scrollY || window.pageYOffset;
  const rect = el.getBoundingClientRect();
  const targetY = currentScroll + rect.top - headerOffset;

  return Math.min(Math.max(targetY, 0), maxScroll);
}

export function updateActiveWaypoint() {
  if (isNavigating) return;

  const scrollY = window.scrollY || window.pageYOffset;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  const waypointNodes = document.querySelectorAll('.spine-waypoint-node');
  if (waypointNodes.length === 0) return;

  function setActiveNode(activeId) {
    waypointNodes.forEach(node => {
      const match = node.getAttribute('data-zone-target') === activeId;
      node.classList.toggle('is-active', match);
    });
  }

  // 1. Extreme Bottom: Contact / Footer (within 100px of maxScroll)
  if (scrollY >= maxScroll - 100) {
    setActiveNode('contact');
    return;
  }

  // 2. Extreme Top: Home (within 100px of top)
  if (scrollY <= 100) {
    setActiveNode('hero');
    return;
  }

  // 3. Section Boundaries (Sequential, exact pin-compensated thresholds)
  const contactSt = sectionTriggers['contact'];
  const experienceSt = sectionTriggers['experience'];
  const stackSt = sectionTriggers['stack'];
  const projectsSt = sectionTriggers['projects'];
  const aboutSt = sectionTriggers['about'];

  const contactStart = contactSt?.start ?? (experienceSt?.end ?? maxScroll - 400);
  const experienceStart = experienceSt?.start ?? (stackSt?.end ?? contactStart);
  const stackStart = stackSt?.start ?? (projectsSt?.end ?? experienceStart);
  const projectsStart = projectsSt?.start ?? (aboutSt?.end ?? stackStart);
  const aboutStart = aboutSt?.start ?? 300;

  if (scrollY >= contactStart - 100) {
    setActiveNode('contact');
    return;
  }

  if (scrollY >= experienceStart - 80) {
    setActiveNode('experience');
    return;
  }

  if (scrollY >= stackStart - 60) {
    setActiveNode('stack');
    return;
  }

  if (scrollY >= projectsStart - 60) {
    setActiveNode('projects');
    return;
  }

  if (scrollY >= aboutStart - 80) {
    setActiveNode('about');
    return;
  }

  setActiveNode('hero');
}

export function smoothScrollToZone(id) {
  const targetY = getZoneScrollTarget(id);

  isNavigating = true;

  // Immediate visual feedback on the target waypoint dot
  const waypointNodes = document.querySelectorAll('.spine-waypoint-node');
  waypointNodes.forEach(node => {
    node.classList.toggle('is-active', node.getAttribute('data-zone-target') === id);
  });

  if (navTween) navTween.kill();

  navTween = gsap.to(window, {
    duration: 0.85,
    ease: "power2.inOut",
    scrollTo: {
      y: targetY,
      autoKill: true
    },
    onComplete: () => {
      isNavigating = false;
      navTween = null;
      updateActiveWaypoint();
    },
    onInterrupt: () => {
      isNavigating = false;
      navTween = null;
      updateActiveWaypoint();
    }
  });
}

export function initScrollSpine() {
  const spineProgress = document.getElementById('spine-progress');
  const waypointNodes = document.querySelectorAll('.spine-waypoint-node');

  // Interactive Click-to-Scroll on Waypoint Nodes
  waypointNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = node.getAttribute('data-zone-target');
      if (targetId) {
        smoothScrollToZone(targetId);
      }
    });
  });

  // Bind in-page anchor links (header navigation, drawer links, hero buttons)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash && hash.length > 1) {
        const targetId = hash.slice(1);
        if (document.getElementById(targetId)) {
          e.preventDefault();
          smoothScrollToZone(targetId);
        }
      }
    });
  });

  // Master Document Scroll Progress Tracker
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const p = self.progress;
      document.documentElement.style.setProperty('--scroll-progress', p.toFixed(4));
      if (spineProgress) {
        spineProgress.style.height = `${(p * 100).toFixed(2)}%`;
      }
      updateActiveWaypoint();
    }
  });

  // Recalibrate on ScrollTrigger refresh
  ScrollTrigger.addEventListener('refresh', () => {
    updateActiveWaypoint();
  });

  // Initial calibration
  updateActiveWaypoint();
}

// ============================================================================
// 4. CONNECTED VISUAL NARRATIVE (Three.js WebGL Evolving Motif, Zero Idle CPU)
// ============================================================================
export function initScrollCanvasMotif() {
  const canvas = document.getElementById('scroll-canvas');
  if (!canvas) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    canvas.style.display = 'none';
    return;
  }

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  // Motif Root Group
  const motifGroup = new THREE.Group();
  scene.add(motifGroup);

  // 1. Dual-Mesh Geodesic Wireframe
  const outerGeo = new THREE.IcosahedronGeometry(1.6, 2);
  const outerMat = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: isDark() ? 0.35 : 0.22,
    color: isDark() ? 0x00f0ff : 0x0284c7
  });
  const outerMesh = new THREE.Mesh(outerGeo, outerMat);
  motifGroup.add(outerMesh);

  const innerGeo = new THREE.IcosahedronGeometry(0.85, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: isDark() ? 0.40 : 0.25,
    color: isDark() ? 0x8b2f5a : 0x0369a1
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  motifGroup.add(innerMesh);

  // 2. Coordinate Particle System (216 Vertices across 6 Stages)
  const particleCount = 216;
  const particleGeo = new THREE.BufferGeometry();
  const currentPositions = new Float32Array(particleCount * 3);

  // Pre-calculate target coordinate buffers for each narrative stage
  const posHero = new Float32Array(particleCount * 3);
  const posMeridian = new Float32Array(particleCount * 3);
  const posProjects = new Float32Array(particleCount * 3);
  const posMatrix = new Float32Array(particleCount * 3);
  const posCatalog = new Float32Array(particleCount * 3);
  const posGrounding = new Float32Array(particleCount * 3);

  const isDesktop = () => window.innerWidth >= 768;
  const heroXOffset = isDesktop() ? 1.7 : 0;

  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;

    // Stage 1: Hero (Spherical envelope around 3D Orb)
    const phi = Math.acos(-1 + (2 * i) / particleCount);
    const theta = Math.sqrt(particleCount * Math.PI) * i;
    const r = 1.65 + (i % 5) * 0.08;
    posHero[idx] = heroXOffset + r * Math.sin(phi) * Math.cos(theta);
    posHero[idx + 1] = r * Math.sin(phi) * Math.sin(theta);
    posHero[idx + 2] = r * Math.cos(phi);

    // Stage 2: Meridian (Horizontal datum coordinate belt)
    posMeridian[idx] = -5.5 + (11 * i) / particleCount;
    posMeridian[idx + 1] = 0.25 + Math.sin(i * 0.3) * 0.22;
    posMeridian[idx + 2] = Math.cos(i * 0.4) * 0.5;

    // Stage 3: Projects (Rectangular architectural framing boundary)
    const perimeter = i / particleCount;
    if (perimeter < 0.25) { // Top edge
      posProjects[idx] = -4.0 + (perimeter / 0.25) * 8.0;
      posProjects[idx + 1] = 2.4;
    } else if (perimeter < 0.50) { // Right edge
      posProjects[idx] = 4.0;
      posProjects[idx + 1] = 2.4 - ((perimeter - 0.25) / 0.25) * 4.8;
    } else if (perimeter < 0.75) { // Bottom edge
      posProjects[idx] = 4.0 - ((perimeter - 0.50) / 0.25) * 8.0;
      posProjects[idx + 1] = -2.4;
    } else { // Left edge
      posProjects[idx] = -4.0;
      posProjects[idx + 1] = -2.4 + ((perimeter - 0.75) / 0.25) * 4.8;
    }
    posProjects[idx + 2] = -0.5 + (i % 3) * 0.1;

    // Stage 4: Matrix (3D perspective lattice grid: 18 col x 12 row)
    const col = i % 18;
    const row = Math.floor(i / 18);
    posMatrix[idx] = -4.2 + (8.4 * col) / 17;
    posMatrix[idx + 1] = 2.2 - (4.4 * row) / 11;
    posMatrix[idx + 2] = -0.8 + (row / 11) * 0.9;

    // Stage 5: Catalog (Dispersed ambient coordinate dust)
    posCatalog[idx] = -5.0 + ((i * 19) % 100) / 10;
    posCatalog[idx + 1] = -2.5 + ((i * 23) % 60) / 10;
    posCatalog[idx + 2] = -1.2 + ((i * 31) % 30) / 10;

    // Stage 6: Grounding (Converged tightly at Simone Weil beacon)
    const br = 0.35 + (i % 4) * 0.08;
    const bt = i * 0.25;
    posGrounding[idx] = br * Math.cos(bt);
    posGrounding[idx + 1] = -2.7 + br * Math.sin(bt);
    posGrounding[idx + 2] = (i % 5) * 0.04;

    // Initial position = Stage 1
    currentPositions[idx] = posHero[idx];
    currentPositions[idx + 1] = posHero[idx + 1];
    currentPositions[idx + 2] = posHero[idx + 2];
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.045,
    transparent: true,
    opacity: isDark() ? 0.70 : 0.45,
    color: isDark() ? 0x00f0ff : 0x0284c7
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  updateOrbColors = (theme) => {
    const dark = theme === 'dark';
    outerMat.color.setHex(dark ? 0x00f0ff : 0x0284c7);
    outerMat.opacity = dark ? 0.35 : 0.22;
    innerMat.color.setHex(dark ? 0x8b2f5a : 0x0369a1);
    innerMat.opacity = dark ? 0.40 : 0.25;
    particleMat.color.setHex(dark ? 0x00f0ff : 0x0284c7);
    particleMat.opacity = dark ? 0.70 : 0.45;
    wakeUpRender();
  };

  // Cursor Parallax
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.6;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    wakeUpRender();
  }, { passive: true });

  // Scroll Progress Scrubbing via ScrollTrigger
  let targetScrollProgress = 0;
  let currentScrollProgress = 0;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      targetScrollProgress = self.progress;
      wakeUpRender();
    }
  });

  // Zero-CPU Idle Render Manager
  let isRendering = false;
  let animId = null;

  function wakeUpRender() {
    if (!isRendering) {
      isRendering = true;
      animId = requestAnimationFrame(renderLoop);
    }
  }

  function getBufferPair(p) {
    const stages = [0.0, 0.16, 0.42, 0.68, 0.86, 1.0];
    const buffers = [posHero, posMeridian, posProjects, posMatrix, posCatalog, posGrounding];

    for (let i = 0; i < stages.length - 1; i++) {
      if (p <= stages[i + 1]) {
        const segStart = stages[i];
        const segEnd = stages[i + 1];
        const t = Math.min(Math.max((p - segStart) / (segEnd - segStart), 0), 1);
        return { from: buffers[i], to: buffers[i + 1], t, segIndex: i };
      }
    }
    return { from: buffers[4], to: buffers[5], t: 1, segIndex: 4 };
  }

  function renderLoop() {
    const progressDelta = targetScrollProgress - currentScrollProgress;
    currentScrollProgress += progressDelta * 0.08;

    const mouseDeltaX = targetMouseX - mouseX;
    const mouseDeltaY = targetMouseY - mouseY;
    mouseX += mouseDeltaX * 0.05;
    mouseY += mouseDeltaY * 0.05;

    // Interpolate particle positions
    const { from, to, t, segIndex } = getBufferPair(currentScrollProgress);
    const posAttr = particleGeo.attributes.position;
    const posArr = posAttr.array;

    for (let i = 0; i < particleCount * 3; i++) {
      posArr[i] = from[i] + (to[i] - from[i]) * t;
    }
    posAttr.needsUpdate = true;

    // Evolve 3D Geodesic Orb position, scale, and opacity
    const heroX = isDesktop() ? 1.7 : 0;
    if (segIndex === 0) { // Hero -> Meridian
      motifGroup.position.x = heroX * (1 - t);
      motifGroup.position.y = -t * 0.4;
      motifGroup.position.z = 0;
      motifGroup.scale.setScalar(1.0 - t * 0.3);
      outerMat.opacity = (isDark() ? 0.35 : 0.22) * (1 - t * 0.5);
    } else if (segIndex === 1) { // Meridian -> Projects
      motifGroup.position.x = 0;
      motifGroup.position.y = -0.4 - t * 0.2;
      motifGroup.position.z = -t * 2.0;
      motifGroup.scale.setScalar(0.7 - t * 0.3);
      outerMat.opacity = (isDark() ? 0.35 : 0.22) * 0.5 * (1 - t * 0.4);
    } else if (segIndex >= 2 && segIndex < 4) { // Projects & Matrix
      motifGroup.position.set(0, -0.6, -2.0);
      motifGroup.scale.setScalar(0.4);
      outerMat.opacity = (isDark() ? 0.35 : 0.22) * 0.25;
    } else { // Catalog -> Grounding
      motifGroup.position.x = 0;
      motifGroup.position.y = -0.6 - t * 2.1;
      motifGroup.position.z = -2.0 * (1 - t);
      motifGroup.scale.setScalar(0.4 - t * 0.25);
      outerMat.opacity = (isDark() ? 0.35 : 0.22) * 0.2 * (1 - t * 0.8);
    }

    // Gentle kinetic rotation
    outerMesh.rotation.x += 0.002 + mouseY * 0.02;
    outerMesh.rotation.y += 0.003 + mouseX * 0.02;
    innerMesh.rotation.x -= 0.003;
    innerMesh.rotation.y -= 0.004;

    renderer.render(scene, camera);

    // Sleep check (0% CPU when values have settled)
    if (Math.abs(progressDelta) < 0.0001 && Math.abs(mouseDeltaX) < 0.0005 && Math.abs(mouseDeltaY) < 0.0005) {
      isRendering = false;
      animId = null;
    } else {
      animId = requestAnimationFrame(renderLoop);
    }
  }

  // Initial draw
  wakeUpRender();

  // Resize Handler
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    wakeUpRender();
  });
}

// ============================================================================
// 5. SELECTIVE PINNED NARRATIVE 1: FEATURED PROJECTS SHOWCASE (ZONE 3)
// ============================================================================
export function initPinnedProjects() {
  const section = document.querySelector('.projects-pin-section');
  const deck = document.getElementById('deck-container');
  if (!section || !deck) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const panels = Array.from(deck.querySelectorAll('.accordion-panel'));
  const stepPills = Array.from(document.querySelectorAll('.project-step-pill'));
  const scrubBar = document.getElementById('project-scrub-bar');

  const mm = gsap.matchMedia();

  // Desktop only (>=1024px) for pin & scrub; tablet & mobile (<1024px) use tap-to-expand accordion
  mm.add("(min-width: 1024px)", () => {
    let currentActiveIdx = 0;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=220%",
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Fill scrub bar smoothly from 25% to 100%
        if (scrubBar) {
          const barWidth = 25 + p * 75;
          scrubBar.style.width = `${barWidth}%`;
        }

        // Active project quadrant (0 to 3)
        const targetIdx = Math.min(Math.floor(p * 4), 3);
        if (targetIdx !== currentActiveIdx) {
          currentActiveIdx = targetIdx;

          // Expand active card, collapse siblings
          panels.forEach((panel, i) => {
            panel.classList.toggle('is-active', i === currentActiveIdx);
          });

          // Highlight corresponding step button
          stepPills.forEach((pill, i) => {
            const isActive = i === currentActiveIdx;
            pill.classList.toggle('is-active', isActive);
            if (isActive) {
              pill.classList.add('border-cerenkov', 'bg-cerenkov/15', 'text-cerenkov');
              pill.classList.remove('border-theme-border', 'text-theme-text-muted');
            } else {
              pill.classList.remove('border-cerenkov', 'bg-cerenkov/15', 'text-cerenkov');
              pill.classList.add('border-theme-border', 'text-theme-text-muted');
            }
          });
        }
      }
    });

    sectionTriggers['projects'] = trigger;

    // Step pill click jumps directly to project's scroll coordinate
    stepPills.forEach((pill, idx) => {
      pill.addEventListener('click', () => {
        const targetScroll = trigger.start + (trigger.end - trigger.start) * (idx / 3.2);
        if (navTween) navTween.kill();
        navTween = gsap.to(window, {
          duration: 0.7,
          ease: "power2.inOut",
          scrollTo: { y: targetScroll, autoKill: true }
        });
      });
    });

    return () => {
      delete sectionTriggers['projects'];
      panels.forEach((p, i) => p.classList.toggle('is-active', i === 0));
    };
  });
}

// ============================================================================
// 6. SELECTIVE PINNED NARRATIVE 2: TECHNICAL CAPABILITIES MATRIX (ZONE 4)
// ============================================================================
export function initPinnedMatrix() {
  const section = document.querySelector('.stack-pin-section');
  const grid = document.getElementById('bento-grid');
  if (!section || !grid) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const cards = Array.from(grid.querySelectorAll('.bento-card'));
  const pills = grid.querySelectorAll('.bento-skill-pill');

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 0.6,
        anticipatePin: 1
      }
    });

    sectionTriggers['stack'] = tl.scrollTrigger;

    // Phase 1: 3D perspective assembly into planar matrix
    tl.fromTo(cards,
      { y: 50, opacity: 0.2, rotateX: 12, transformPerspective: 800 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.08, ease: "power2.out", duration: 1 }
    );

    // Phase 2: Category skill pills cascading illumination
    tl.fromTo(pills,
      { scale: 0.94, opacity: 0.65 },
      { scale: 1.0, opacity: 1.0, stagger: 0.02, ease: "power1.out", duration: 0.6 },
      "-=0.4"
    );

    return () => {
      delete sectionTriggers['stack'];
      gsap.set(cards, { clearProps: "all" });
      gsap.set(pills, { clearProps: "all" });
    };
  });
}

// ============================================================================
// 7. CONTINUOUS BIDIRECTIONAL SCRUBBING (HERO, CATALOG, TIMELINE, GROUNDING)
// ============================================================================
export function initScrollDrivenNarrative() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // Hero Text Column Exit Parallax
  const heroText = document.querySelector('.hero-text-col');
  if (heroText) {
    gsap.to(heroText, {
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.5
      },
      y: -50,
      opacity: 0.25,
      scale: 0.96,
      ease: 'none'
    });
  }

  // Milestones Timeline Scrub
  const milestoneItems = document.querySelectorAll('#experience .milestone-item');
  if (milestoneItems.length > 0) {
    gsap.fromTo(milestoneItems,
      { x: -25, opacity: 0.3 },
      {
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: 0.5
        },
        x: 0,
        opacity: 1,
        stagger: 0.15,
        ease: 'power1.out'
      }
    );
  }

  // Contact Cards Perspective Scrub
  const contactCards = document.querySelectorAll('#contact .contact-card');
  if (contactCards.length > 0) {
    gsap.fromTo(contactCards,
      { y: 35, opacity: 0.25 },
      {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 85%',
          end: 'top 45%',
          scrub: 0.6
        },
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  }

  // Simone Weil Grounding Beacon Settle
  const beacon = document.querySelector('#footer-anchor .philosophical-beacon');
  if (beacon) {
    gsap.fromTo(beacon,
      { scale: 0.6, opacity: 0.3 },
      {
        scrollTrigger: {
          trigger: '#footer-anchor',
          start: 'top 95%',
          end: 'bottom bottom',
          scrub: 0.4
        },
        scale: 1.0,
        opacity: 1.0,
        ease: 'power2.out'
      }
    );
  }
}

// ============================================================================
// 8. INTERACTIVE ACCORDION DECK CLICK/HOVER ENGINE (DIRECT INTERACTION)
// ============================================================================
export function initAccordionDeck() {
  const accordionPanels = document.querySelectorAll('.accordion-panel');
  if (accordionPanels.length === 0) return;

  accordionPanels.forEach(panel => {
    // Desktop hover expansion (>=1024px)
    panel.addEventListener('mouseenter', () => {
      if (window.innerWidth >= 1024) {
        accordionPanels.forEach(p => p.classList.remove('is-active'));
        panel.classList.add('is-active');
      }
    });

    // Click handler:
    // In phone/tablet (<1024px): toggle active state to expand/collapse.
    // In desktop (>=1024px): navigate to project if already active, or activate.
    panel.addEventListener('click', (e) => {
      // Don't intercept clicks on specific buttons/links
      if (e.target.closest('a') || e.target.closest('button')) return;

      const isMobileTablet = window.innerWidth < 1024;
      const isAlreadyActive = panel.classList.contains('is-active');

      if (isMobileTablet) {
        if (isAlreadyActive) {
          panel.classList.remove('is-active');
        } else {
          accordionPanels.forEach(p => p.classList.remove('is-active'));
          panel.classList.add('is-active');
        }
      } else {
        if (!isAlreadyActive) {
          accordionPanels.forEach(p => p.classList.remove('is-active'));
          panel.classList.add('is-active');
        } else {
          const primaryLink = panel.querySelector('a.btn-primary, a[href$=".html"]');
          if (primaryLink && primaryLink.href) {
            window.location.href = primaryLink.href;
          }
        }
      }
    });
  });
}

// ============================================================================
// 9. ASYMMETRIC BENTO GRID INTERACTIVE SKILL MATRIX (<16ms, CLS = 0)
// ============================================================================
export const SKILL_DATA = {
  backend: {
    laravel: {
      name: "PRMS (Postgraduate Review System)",
      url: "pages/prms.html"
    },
    postgres: {
      name: "PRMS (Postgraduate Review System)",
      url: "pages/prms.html"
    },
    "docker-be": {
      name: "PRMS & Traces of Senai",
      url: "pages/prms.html"
    },
    rbac: {
      name: "PRMS (Postgraduate Review System)",
      url: "pages/prms.html"
    },
    sqlite: {
      name: "ReMind Mobile Health",
      url: "pages/remind.html"
    }
  },
  devops: {
    k8s: {
      name: "Traces of Senai (寻迹士乃)",
      url: "pages/senai.html"
    },
    docker: {
      name: "PRMS & Traces of Senai",
      url: "pages/prms.html"
    },
    cicd: {
      name: "Lightoxy Engineering Portal",
      url: "#hero"
    }
  },
  ai: {
    deepseek: {
      name: "Traces of Senai (寻迹士乃)",
      url: "pages/senai.html"
    },
    cosyvoice: {
      name: "Traces of Senai & JiuXi",
      url: "pages/senai.html"
    },
    xgboost: {
      name: "Telecom Customer Churn",
      url: "pages/telco-churn.html"
    }
  },
  frontend: {
    threejs: {
      name: "JiuXi Mindscape & Hero Orb",
      url: "pages/jiuxi.html"
    },
    tailwind: {
      name: "Lightoxy Design System",
      url: "#hero"
    },
    spring: {
      name: "Featured Projects Deck",
      url: "#projects"
    },
    vanilla: {
      name: "Lightoxy Portal Core",
      url: "#hero"
    }
  }
};

export function inspectSkill(category, key) {
  const categoryData = SKILL_DATA[category];
  if (!categoryData) return;
  const data = categoryData[key];
  if (!data) return;

  const panel = document.getElementById(`bento-${category}-panel`);
  if (!panel) return;

  const linkEl = panel.querySelector('.bento-project-link');
  if (linkEl) {
    linkEl.href = data.url;
    linkEl.innerHTML = `<span>${data.name}</span> <span aria-hidden="true">→</span>`;
  }

  const buttons = document.querySelectorAll(`[data-bento-cat="${category}"]`);
  buttons.forEach(btn => {
    const isCurrent = btn.getAttribute('data-bento-key') === key;
    btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    if (isCurrent) {
      btn.classList.add('border-cerenkov', 'text-cerenkov', 'bg-cerenkov/10');
      btn.classList.remove('border-theme-border');
    } else {
      btn.classList.remove('border-cerenkov', 'text-cerenkov', 'bg-cerenkov/10');
      btn.classList.add('border-theme-border');
    }
  });
}

export function initBentoSkillMatrix() {
  const buttons = document.querySelectorAll('[data-bento-cat]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-bento-cat');
      const key = btn.getAttribute('data-bento-key');
      inspectSkill(cat, key);
    });
  });
}

// ============================================================================
// BOOTSTRAP
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileDrawer();
  initPinnedProjects();
  initPinnedMatrix();
  initSectionTriggers();
  initScrollSpine();
  initScrollCanvasMotif();
  initScrollDrivenNarrative();
  initAccordionDeck();
  initBentoSkillMatrix();
  ScrollTrigger.refresh();
});
