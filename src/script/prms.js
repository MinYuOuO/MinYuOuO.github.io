/**
 * prms.js â€” PRMS Architecture Showcase Controller
 * Component-Driven Scroll Choreography & Interactive Case Study Engine
 *
 * Features:
 * 1. Synchronous Theme Coordinator (Light/Dark mode)
 * 2. Pin-Aware Waypoint Reading Spine (6 PRMS Section Coordinates)
 * 3. Component-Driven Scroll Choreography (Hero Parallax, Opposing Wing Convergence,
 *    Datum Line Draws, Perspective Card Elevations, Blueprint Drafting Reveal)
 * 4. Pinned Scroll Narrative: 4-Stage Supervision & Audit Lifecycle (Directional Scrub)
 * 5. Live Interactive Cryptographic Signature & SHA-256 State Seal Canvas
 * 6. Interactive 3-Role Cybernetic Portal Hub Switcher (Staggered Role Transitions)
 * 7. Technical Blueprint Matrix Switcher + Fullscreen Zoom/Pan Modal
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Active ScrollTrigger references for pin-compensated coordinates
export const prmsSectionTriggers = {};

let isNavigating = false;
let navTween = null;

// ============================================================================
// 1. THEME COORDINATOR
// ============================================================================
export function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
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

    // Redraw signature canvas with theme-aware stroke if available
    if (typeof window.prmsRedrawSignature === 'function') {
      window.prmsRedrawSignature();
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
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
// 2. PIN-AWARE WAYPOINT NAVIGATOR & READING SPINE
// ============================================================================
const PRMS_ZONES = [
  { id: 'prms-hero', start: 'top top' },
  { id: 'prms-transformation', start: 'top 64px' },
  { id: 'prms-portals', start: 'top 64px' },
  { id: 'prms-lifecycle', start: 'top top' },
  { id: 'prms-blueprints', start: 'top 64px' },
  { id: 'prms-defense', start: 'top 64px' }
];

export function initSectionTriggers() {
  PRMS_ZONES.forEach(({ id, start }) => {
    if (id === 'prms-lifecycle') return;
    const el = document.getElementById(id);
    if (el && !prmsSectionTriggers[id]) {
      prmsSectionTriggers[id] = ScrollTrigger.create({
        trigger: el,
        start: start,
        refreshPriority: -1
      });
    }
  });
}

export function getZoneScrollTarget(id) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (id === 'prms-hero') return 0;

  if (prmsSectionTriggers[id] && typeof prmsSectionTriggers[id].start === 'number') {
    return Math.min(Math.max(prmsSectionTriggers[id].start, 0), maxScroll);
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

  if (scrollY >= maxScroll - 80) {
    setActiveNode('prms-defense');
    return;
  }

  if (scrollY <= 80) {
    setActiveNode('prms-hero');
    return;
  }

  // Check section boundaries in reverse chronological order
  for (let i = PRMS_ZONES.length - 1; i >= 0; i--) {
    const zone = PRMS_ZONES[i];
    const st = prmsSectionTriggers[zone.id];
    const threshold = (st && typeof st.start === 'number') ? st.start - 80 : 0;
    if (scrollY >= threshold) {
      setActiveNode(zone.id);
      return;
    }
  }

  setActiveNode('prms-hero');
}

export function smoothScrollToZone(id) {
  const targetY = getZoneScrollTarget(id);

  isNavigating = true;

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

  waypointNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = node.getAttribute('data-zone-target');
      if (targetId) {
        smoothScrollToZone(targetId);
      }
    });
  });

  document.querySelectorAll('a[href^="#prms-"], a[href^="#blueprints"], a[href^="#presentation"]').forEach(link => {
    link.addEventListener('click', (e) => {
      let hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        let targetId = hash.slice(1);
        if (targetId === 'blueprints') targetId = 'prms-blueprints';
        if (targetId === 'presentation') targetId = 'prms-defense';
        if (document.getElementById(targetId)) {
          e.preventDefault();
          smoothScrollToZone(targetId);
        }
      }
    });
  });

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

  ScrollTrigger.addEventListener('refresh', () => {
    updateActiveWaypoint();
  });

  updateActiveWaypoint();
}

// ============================================================================
// 3. COMPONENT-DRIVEN SCROLL CHOREOGRAPHY
// ============================================================================
export function initScrollScrubbing() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  // --------------------------------------------------------------------------
  // 1. Hero Entrance Choreography + Multi-Layer Scroll Parallax
  // --------------------------------------------------------------------------
  const heroStaggers = document.querySelectorAll('.hero-stagger');
  const heroMetrics = document.querySelectorAll('.hero-metric-card');

  if (heroStaggers.length > 0) {
    gsap.fromTo(heroStaggers,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform'
      }
    );
  }

  if (heroMetrics.length > 0) {
    gsap.fromTo(heroMetrics,
      { y: 30, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: 0.25,
        stagger: 0.075,
        ease: 'power3.out',
        clearProps: 'transform'
      }
    );
  }

  const heroCopy = document.querySelector('.prms-hero-copy');
  const heroMetricsGrid = document.querySelector('.prms-hero-metrics');

  if (heroCopy) {
    gsap.to(heroCopy, {
      scrollTrigger: {
        trigger: '#prms-hero',
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.6
      },
      y: -55,
      opacity: 0.25,
      ease: 'none'
    });
  }

  if (heroMetricsGrid) {
    gsap.to(heroMetricsGrid, {
      scrollTrigger: {
        trigger: '#prms-hero',
        start: 'top top',
        end: 'bottom 15%',
        scrub: 0.6
      },
      y: -22,
      scale: 0.97,
      opacity: 0.35,
      ease: 'none'
    });
  }

  // --------------------------------------------------------------------------
  // 2. Universal Section Header Reveal & Architectural Datum Line Draw
  // --------------------------------------------------------------------------
  document.querySelectorAll('.prms-section-head').forEach(head => {
    const divider = head.querySelector('.prms-divider-line');
    const textChildren = Array.from(head.children).filter(el => !el.classList.contains('prms-divider-line'));

    if (textChildren.length > 0) {
      gsap.fromTo(textChildren,
        { y: 24, opacity: 0.15 },
        {
          scrollTrigger: {
            trigger: head,
            start: 'top 90%',
            end: 'top 58%',
            scrub: 0.55
          },
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out'
        }
      );
    }

    if (divider) {
      gsap.fromTo(divider,
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: head,
            start: 'top 88%',
            end: 'top 50%',
            scrub: 0.6
          },
          scaleX: 1,
          ease: 'power2.out'
        }
      );
    }
  });

  // --------------------------------------------------------------------------
  // 3. Section 2: Before vs After â€” Opposing Wing Convergence & Paired Rows
  // --------------------------------------------------------------------------
  const matrixContainer = document.getElementById('transformation-matrix');
  const legacyWing = document.querySelector('.transform-wing-legacy');
  const prmsWing = document.querySelector('.transform-wing-prms');

  if (matrixContainer && legacyWing && prmsWing) {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(legacyWing,
        { x: -64, rotateY: 6, opacity: 0.15, transformPerspective: 1100 },
        {
          scrollTrigger: {
            trigger: '#prms-transformation',
            start: 'top 84%',
            end: 'top 32%',
            scrub: 0.6
          },
          x: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'power2.out'
        }
      );

      gsap.fromTo(prmsWing,
        { x: 64, rotateY: -6, opacity: 0.15, transformPerspective: 1100 },
        {
          scrollTrigger: {
            trigger: '#prms-transformation',
            start: 'top 84%',
            end: 'top 32%',
            scrub: 0.6
          },
          x: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'power2.out'
        }
      );
    });

    mm.add('(max-width: 767px)', () => {
      gsap.fromTo([legacyWing, prmsWing],
        { y: 40, opacity: 0.2 },
        {
          scrollTrigger: {
            trigger: '#prms-transformation',
            start: 'top 86%',
            end: 'top 35%',
            scrub: 0.55
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power2.out'
        }
      );
    });

    // Paired Row-by-Row Cascade (Legacy Row N + PRMS Row N enter together)
    const legacyRows = legacyWing.querySelectorAll('.p-4.rounded-xl');
    const prmsRows = prmsWing.querySelectorAll('.p-4.rounded-xl');
    const pairCount = Math.max(legacyRows.length, prmsRows.length);

    for (let i = 0; i < pairCount; i++) {
      const pair = [legacyRows[i], prmsRows[i]].filter(Boolean);
      if (pair.length === 0) continue;

      gsap.fromTo(pair,
        { y: 24, opacity: 0.2, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: pair[0],
            start: 'top 92%',
            end: 'top 64%',
            scrub: 0.5
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          ease: 'power2.out'
        }
      );
    }
  }

  // --------------------------------------------------------------------------
  // 4. Section 3: Interactive 3-Role Portal Hub â€” Tilt-Up & Tab Cascade
  // --------------------------------------------------------------------------
  const portalCard = document.querySelector('.prms-portal-card');
  const portalTabs = document.querySelectorAll('.portal-tab-btn');

  if (portalTabs.length > 0) {
    gsap.fromTo(portalTabs,
      { y: 20, scale: 0.92, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#prms-portals',
          start: 'top 86%',
          end: 'top 56%',
          scrub: 0.5
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out'
      }
    );
  }

  if (portalCard) {
    gsap.fromTo(portalCard,
      { y: 65, rotateX: 9, scale: 0.96, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: '#prms-portals',
          start: 'top 82%',
          end: 'top 34%',
          scrub: 0.6
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out'
      }
    );
  }

  // --------------------------------------------------------------------------
  // 5. Section 5: Technical Blueprint Matrix â€” Drafting Frame & Diagram Zoom
  // --------------------------------------------------------------------------
  const blueprintCard = document.querySelector('.prms-blueprint-card');
  const blueprintTabs = document.querySelectorAll('.prms-tab-btn');
  const diagramImg = document.getElementById('active-diagram-img');

  if (blueprintTabs.length > 0) {
    gsap.fromTo(blueprintTabs,
      { x: -18, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '#prms-blueprints',
          start: 'top 86%',
          end: 'top 56%',
          scrub: 0.5
        },
        x: 0,
        opacity: 1,
        stagger: 0.05,
        ease: 'power2.out'
      }
    );
  }

  if (blueprintCard) {
    gsap.fromTo(blueprintCard,
      { y: 60, rotateX: 8, scale: 0.95, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: '#prms-blueprints',
          start: 'top 82%',
          end: 'top 35%',
          scrub: 0.6
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out'
      }
    );
  }

  if (diagramImg) {
    gsap.fromTo(diagramImg,
      { scale: 1.07 },
      {
        scrollTrigger: {
          trigger: '#prms-blueprints',
          start: 'top 78%',
          end: 'top 25%',
          scrub: 0.65
        },
        scale: 1.0,
        ease: 'power2.out'
      }
    );
  }

  // --------------------------------------------------------------------------
  // 6. Section 6: Academic Defense â€” Stage Elevation & Outcome Pillar Cascade
  // --------------------------------------------------------------------------
  const defenseCard = document.querySelector('.prms-defense-card');
  const defenseOutcomes = document.querySelectorAll('.prms-outcome-card');

  if (defenseCard) {
    gsap.fromTo(defenseCard,
      { y: 60, rotateX: 7, scale: 0.96, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: '#prms-defense',
          start: 'top 82%',
          end: 'top 36%',
          scrub: 0.6
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out'
      }
    );
  }

  if (defenseOutcomes.length > 0) {
    gsap.fromTo(defenseOutcomes,
      { y: 45, scale: 0.93, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.prms-outcomes-grid',
          start: 'top 90%',
          end: 'top 58%',
          scrub: 0.55
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.12,
        ease: 'power2.out'
      }
    );
  }
}

// ============================================================================
// 4. PINNED SCROLL NARRATIVE: 4-STAGE SUPERVISION & AUDIT LIFECYCLE
// ============================================================================
export function initPinnedLifecycle() {
  const section = document.getElementById('prms-lifecycle');
  if (!section) return;

  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stagePills = document.querySelectorAll('.lifecycle-step-pill');
  const stageCards = document.querySelectorAll('.lifecycle-stage-card');
  const scrubBar = document.getElementById('lifecycle-scrub-bar');
  const stageTelemetry = document.getElementById('lifecycle-telemetry');
  const prevBtn = document.getElementById('lifecycle-prev-btn');
  const nextBtn = document.getElementById('lifecycle-next-btn');
  const indicatorLabel = document.getElementById('lifecycle-indicator-label');

  let activeIndex = 0;

  const stageTelemetryTexts = [
    "STATE 01: DRAFT_SUBMITTED Â· EVENT_DISPATCHED Â· QUEUED",
    "STATE 02: SUPERVISOR_REVIEW Â· VECTOR_SIGNATURE_CAPTURED",
    "STATE 03: SERIALIZED_PAYLOAD Â· SHA256_LOCKED Â· WRITE_ONCE",
    "STATE 04: AUDIT_INGESTED Â· GOT_RISK_CLEARED Â· COMPLIANT"
  ];

  const stageLabels = [
    "Stage 1 of 4 Â· Draft & Dispatch",
    "Stage 2 of 4 Â· Verification & Canvas Signing",
    "Stage 3 of 4 Â· Cryptographic State Seal",
    "Stage 4 of 4 Â· Audit Ingestion & Clearance"
  ];

  function setActiveStage(index) {
    const prevIndex = activeIndex;
    activeIndex = Math.max(0, Math.min(index, stageCards.length - 1));
    const dir = activeIndex >= prevIndex ? 1 : -1;

    stagePills.forEach((pill, i) => {
      const match = i === activeIndex;
      pill.classList.toggle('is-active', match);
      if (match) {
        pill.classList.add('border-cerenkov', 'bg-cerenkov/15', 'text-cerenkov', 'font-bold');
        pill.classList.remove('border-theme-border', 'card-muted');
      } else {
        pill.classList.remove('border-cerenkov', 'bg-cerenkov/15', 'text-cerenkov', 'font-bold');
        pill.classList.add('border-theme-border', 'card-muted');
      }
    });

    stageCards.forEach((card, i) => {
      const match = i === activeIndex;
      const wasActive = card.classList.contains('is-active');
      card.classList.toggle('is-active', match);
      if (match) {
        card.style.display = 'block';
        if (!wasActive && !isReducedMotion) {
          gsap.fromTo(card,
            { opacity: 0, x: dir * 24, y: 6 },
            { opacity: 1, x: 0, y: 0, duration: 0.36, ease: 'power3.out', clearProps: 'transform' }
          );
          const cols = card.querySelectorAll('.grid > div');
          if (cols.length > 1) {
            gsap.fromTo(cols,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.34, stagger: 0.08, ease: 'power2.out', clearProps: 'transform' }
            );
          }
        }
      } else {
        card.style.display = 'none';
      }
    });

    if (scrubBar && window.innerWidth < 768) {
      scrubBar.style.width = `${((activeIndex + 1) / 4) * 100}%`;
    }

    if (stageTelemetry && stageTelemetryTexts[activeIndex]) {
      stageTelemetry.textContent = stageTelemetryTexts[activeIndex];
    }

    if (indicatorLabel && stageLabels[activeIndex]) {
      indicatorLabel.textContent = stageLabels[activeIndex];
    }

    if (prevBtn) {
      prevBtn.disabled = activeIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = activeIndex === stageCards.length - 1;
    }

    // When entering Stage 02, ensure the signature canvas adjusts to dimensions
    if (activeIndex === 1 && typeof window.prmsResizeSignature === 'function') {
      setTimeout(window.prmsResizeSignature, 60);
    }
  }

  window.prmsSetStage = (idx) => {
    if (prmsSectionTriggers['prms-lifecycle'] && window.innerWidth >= 768 && !isReducedMotion) {
      const trigger = prmsSectionTriggers['prms-lifecycle'];
      const targetScroll = trigger.start + (trigger.end - trigger.start) * (idx / 3.2);
      isNavigating = true;
      if (navTween) navTween.kill();
      navTween = gsap.to(window, {
        duration: 0.6,
        ease: "power2.inOut",
        scrollTo: { y: targetScroll, autoKill: true },
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
    } else {
      setActiveStage(idx);
    }
  };

  // Click handlers on stage pills
  stagePills.forEach((pill, idx) => {
    pill.addEventListener('click', () => {
      window.prmsSetStage(idx);
    });
  });

  // Prev / Next button handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (activeIndex > 0) window.prmsSetStage(activeIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (activeIndex < stageCards.length - 1) window.prmsSetStage(activeIndex + 1);
    });
  }

  if (isReducedMotion) {
    setActiveStage(0);
    return;
  }

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=180%",
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        window.prmsLifecycleProgress = p;

        // Continuous scrub bar progress from 25% to 100%
        if (scrubBar) {
          const barWidth = 25 + p * 75;
          scrubBar.style.width = `${barWidth}%`;
        }

        let activeIdx = 0;
        if (p < 0.28) activeIdx = 0;
        else if (p < 0.56) activeIdx = 1;
        else if (p < 0.82) activeIdx = 2;
        else activeIdx = 3;

        if (activeIdx !== activeIndex) {
          setActiveStage(activeIdx);
        }
      }
    });

    prmsSectionTriggers['prms-lifecycle'] = trigger;

    return () => {
      delete prmsSectionTriggers['prms-lifecycle'];
      setActiveStage(0);
    };
  });

  mm.add("(max-width: 767px)", () => {
    setActiveStage(0);
    const el = document.getElementById('prms-lifecycle');
    if (el) {
      const trig = ScrollTrigger.create({
        trigger: el,
        start: 'top 64px',
        end: 'bottom 64px',
        refreshPriority: -1,
        onUpdate: (self) => {
          window.prmsLifecycleProgress = self.progress;
          const activeIdx = Math.min(3, Math.floor(self.progress * 3.99));
          if (activeIdx !== activeIndex) {
            setActiveStage(activeIdx);
          }
        }
      });
      prmsSectionTriggers['prms-lifecycle'] = trig;
      return () => {
        trig.kill();
        delete prmsSectionTriggers['prms-lifecycle'];
      };
    }
  });
}

// ============================================================================
// 5. LIVE INTERACTIVE SIGNATURE & CRYPTOGRAPHIC SHA-256 STATE SEAL
// ============================================================================
async function computeSha256Hex(str) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const buffer = await window.crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fall through to deterministic digest
    }
  }
  // Deterministic 64-character hex digest simulation for insecure/legacy test environments
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57, h3 = 0x12345678, h4 = 0x87654321;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
    h3 = Math.imul(h3 ^ ch, 974263411);
    h4 = Math.imul(h4 ^ ch, 2147483647);
  }
  const part1 = (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
  const part2 = (h3 >>> 0).toString(16).padStart(8, '0') + (h4 >>> 0).toString(16).padStart(8, '0');
  const part3 = (Math.imul(h1, h3) >>> 0).toString(16).padStart(8, '0') + (Math.imul(h2, h4) >>> 0).toString(16).padStart(8, '0');
  const part4 = ((h1 ^ h2 ^ h3 ^ h4) >>> 0).toString(16).padStart(8, '0') + ((h1 + h2 + h3 + h4) >>> 0).toString(16).padStart(8, '0');
  return (part1 + part2 + part3 + part4).slice(0, 64);
}

export function initSignatureCanvas() {
  const canvas = document.getElementById('signature-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const clearBtn = document.getElementById('clear-signature-btn');
  const sealBtn = document.getElementById('seal-signature-btn');
  const resetBtn = document.getElementById('reset-signature-btn');
  const hashDisplay = document.getElementById('signature-hash-output');
  const statusBadge = document.getElementById('signature-status-badge');
  const statusPill = document.getElementById('canvas-status-pill');
  const timestampDisplay = document.getElementById('signature-timestamp');
  const canvasWrapper = document.getElementById('signature-canvas-wrapper');

  let strokes = [];
  let currentStroke = null;
  let isDrawing = false;
  let isLocked = false;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    redraw();
  }

  window.prmsResizeSignature = resizeCanvas;

  function getStrokeColor() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark ? '#00f0ff' : '#0284c7';
  }

  function redraw() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    ctx.clearRect(0, 0, rect.width, rect.height);

    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = getStrokeColor();

    const drawSingleStroke = (stroke) => {
      if (!stroke || stroke.length === 0) return;
      if (stroke.length === 1) {
        ctx.fillStyle = getStrokeColor();
        ctx.beginPath();
        ctx.arc(stroke[0].x, stroke[0].y, 2, 0, Math.PI * 2);
        ctx.fill();
        return;
      }
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    };

    strokes.forEach(drawSingleStroke);
    if (currentStroke) drawSingleStroke(currentStroke);
  }

  window.prmsRedrawSignature = redraw;

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function startDrawing(e) {
    if (isLocked) return;
    isDrawing = true;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}
    const pt = getCanvasCoords(e);
    currentStroke = [pt];
    redraw();
  }

  function draw(e) {
    if (!isDrawing || isLocked) return;
    const pt = getCanvasCoords(e);
    currentStroke.push(pt);
    redraw();
  }

  function stopDrawing(e) {
    if (!isDrawing || isLocked) return;
    isDrawing = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {}
    if (currentStroke && currentStroke.length > 0) {
      strokes.push(currentStroke);
      currentStroke = null;
      redraw();
      if (statusPill) {
        statusPill.textContent = `${strokes.length} Vector Stroke${strokes.length > 1 ? 's' : ''}`;
        statusPill.className = "text-[10px] text-cerenkov font-bold";
      }
    }
  }

  canvas.addEventListener('pointerdown', startDrawing);
  canvas.addEventListener('pointermove', draw);
  canvas.addEventListener('pointerup', stopDrawing);
  canvas.addEventListener('pointercancel', stopDrawing);

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);

  // Clear Button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (isLocked) return;
      strokes = [];
      currentStroke = null;
      redraw();
      if (statusPill) {
        statusPill.textContent = "Awaiting Strokes";
        statusPill.className = "text-[10px] text-theme-text-muted";
      }
    });
  }

  // Cryptographic Seal (SHA-256) Button
  if (sealBtn) {
    sealBtn.addEventListener('click', async () => {
      if (isLocked) return;
      if (strokes.length === 0) {
        if (statusPill) {
          statusPill.textContent = "Draw signature before sealing!";
          statusPill.className = "text-[10px] text-red-400 font-bold";
          setTimeout(() => {
            statusPill.textContent = "Awaiting Strokes";
            statusPill.className = "text-[10px] text-theme-text-muted";
          }, 2000);
        }
        return;
      }

      isLocked = true;
      canvas.classList.add('cursor-not-allowed', 'opacity-75');
      if (canvasWrapper) {
        canvasWrapper.classList.add('border-cerenkov', 'shadow-[0_0_15px_rgba(2,132,199,0.3)]');
      }

      const totalPoints = strokes.reduce((acc, s) => acc + s.length, 0);
      const payloadObj = {
        action: "SupervisionReviewEndorsement",
        candidateId: "RU-PHD-2026-0842",
        supervisorId: "FAC-DR-CHEAH",
        timestamp: new Date().toISOString(),
        strokeCount: strokes.length,
        pointCount: totalPoints,
        vectorSample: strokes[0].slice(0, 5)
      };

      const payloadString = JSON.stringify(payloadObj);
      const hashHex = await computeSha256Hex(payloadString);

      if (hashDisplay) {
        hashDisplay.textContent = `SHA256: ${hashHex}`;
      }

      if (timestampDisplay) {
        timestampDisplay.textContent = `TIMESTAMP: ${new Date().toISOString()} Â· (${totalPoints} Vector Points Stamped)`;
      }

      if (statusBadge) {
        statusBadge.textContent = "SHA-256 SEALED & VERIFIED";
        statusBadge.className = "font-mono text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30";
      }

      if (statusPill) {
        statusPill.textContent = "Sealed & Locked";
        statusPill.className = "text-[10px] text-emerald-500 font-bold";
      }

      // Tactile cryptographic lock pulse on the deck card
      const deckCard = document.getElementById('lifecycle-deck-card');
      if (deckCard) {
        gsap.fromTo(deckCard,
          { scale: 0.985, borderColor: 'rgba(16, 185, 129, 0.8)' },
          { scale: 1, borderColor: '', duration: 0.55, ease: 'elastic.out(1, 0.5)', clearProps: 'transform,borderColor' }
        );
      }

      // Automatically advance to Stage 03 to reveal the sealed cryptographic digest
      if (typeof window.prmsSetStage === 'function') {
        window.prmsSetStage(2);
      }
    });
  }

  // Reset / Unlock Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      isLocked = false;
      strokes = [];
      currentStroke = null;
      redraw();

      canvas.classList.remove('cursor-not-allowed', 'opacity-75');
      if (canvasWrapper) {
        canvasWrapper.classList.remove('border-cerenkov', 'shadow-[0_0_15px_rgba(2,132,199,0.3)]');
      }

      if (statusPill) {
        statusPill.textContent = "Awaiting Strokes";
        statusPill.className = "text-[10px] text-theme-text-muted";
      }

      if (hashDisplay) {
        hashDisplay.textContent = "SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069";
      }

      if (timestampDisplay) {
        timestampDisplay.textContent = "TIMESTAMP: 2026-08-14T09:42:18.104Z (UTC+8) Â· Microsecond Stamped";
      }

      if (statusBadge) {
        statusBadge.textContent = "SHA-256 SEALED";
        statusBadge.className = "font-mono text-[10px] text-cerenkov font-bold bg-cerenkov/10 px-2 py-0.5 rounded border border-cerenkov/30";
      }

      // Return to Stage 02
      if (typeof window.prmsSetStage === 'function') {
        window.prmsSetStage(1);
      }
    });
  }
}

// ============================================================================
// 6. INTERACTIVE 3-ROLE CYBERNETIC PORTAL HUB
// ============================================================================
const PORTAL_DATA = {
  candidate: {
    roleTag: "ROLE_CANDIDATE Â· READ / SUBMIT SCOPED",
    title: "Postgraduate Candidate Portal",
    subtitle: "Personal Research Milestones & Supervision Log Submission Hub",
    badgeColor: "text-cerenkov",
    stepperHtml: `
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        <div class="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center">
          <span class="block text-[9px] font-mono text-emerald-500 font-bold uppercase">Stage 01</span>
          <span class="text-xs font-bold text-theme-text">Proposal Defense</span>
          <span class="inline-flex items-center justify-center gap-1 text-[10px] text-emerald-500 mt-0.5"><svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>Cleared</span>
        </div>
        <div class="p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center">
          <span class="block text-[9px] font-mono text-emerald-500 font-bold uppercase">Stage 02</span>
          <span class="text-xs font-bold text-theme-text">RUREC Ethics</span>
          <span class="inline-flex items-center justify-center gap-1 text-[10px] text-emerald-500 mt-0.5"><svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>Cleared</span>
        </div>
        <div class="p-2.5 rounded-xl border border-cerenkov bg-cerenkov/15 text-center shadow-[0_0_12px_rgba(2,132,199,0.25)]">
          <span class="block text-[9px] font-mono text-cerenkov font-bold uppercase">Stage 03</span>
          <span class="text-xs font-bold text-theme-text">Data Collection</span>
          <span class="inline-flex items-center justify-center gap-1.5 text-[10px] text-cerenkov mt-0.5 font-bold"><span class="w-1.5 h-1.5 rounded-full bg-cerenkov animate-pulse"></span>Active 68%</span>
        </div>
        <div class="p-2.5 rounded-xl border border-theme-border bg-theme-bg/60 text-center">
          <span class="block text-[9px] font-mono card-muted uppercase">Stage 04</span>
          <span class="text-xs font-bold text-theme-text">Biannual Review</span>
          <span class="inline-flex items-center justify-center gap-1 text-[10px] card-muted mt-0.5"><svg class="w-3 h-3 shrink-0 text-amber-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Due Month 18</span>
        </div>
        <div class="p-2.5 rounded-xl border border-theme-border bg-theme-bg/60 text-center col-span-2 sm:col-span-1">
          <span class="block text-[9px] font-mono card-muted uppercase">Stage 05</span>
          <span class="text-xs font-bold text-theme-text">Viva Voce</span>
          <span class="inline-flex items-center justify-center gap-1 text-[10px] card-muted mt-0.5"><svg class="w-3 h-3 shrink-0 text-theme-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>Prerequisite Gate</span>
        </div>
      </div>
    `,
    features: [
      {
        icon: '<svg class="w-4 h-4 text-cerenkov" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
        title: "Monthly Supervision Log Dispatch",
        desc: "Records structured meeting discussion minutes, agreed research deliverables, and uploads draft thesis chapters. Automatically queues review notifications to assigned supervisors."
      },
      {
        icon: '<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>',
        title: "RUREC Research Ethics Clearance",
        desc: "Institutional ethics workflow management for human/animal subject clearance with document upload and committee feedback tracking."
      },
      {
        icon: '<svg class="w-4 h-4 text-cerenkov" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>',
        title: "Scholarly Publication Registry",
        desc: "Submit Scopus / Web of Science indexed journal papers, conference proceedings, or patent filings required for institutional graduation clearance."
      },
      {
        icon: '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
        title: "Tenure Countdown Telemetry",
        desc: "Live visual tracking of elapsed candidature months versus university maximum program tenure, preventing Graduate-on-Time (GoT) lapses."
      }
    ]
  },
  supervisor: {
    roleTag: "ROLE_SUPERVISOR Â· REBAC_POLICY_SCOPED",
    title: "Academic Supervisor Portal",
    subtitle: "Advisee Progress Governance & Biometric Canvas Evaluation Terminal",
    badgeColor: "text-amber-500",
    stepperHtml: `
      <div class="p-4 rounded-xl border border-theme-border bg-theme-bg/80 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span class="font-mono text-xs font-bold text-theme-text">Active Advisee Roster (ReBAC Scoped: 6 Candidates)</span>
          </div>
          <p class="text-xs card-muted">Zero cross-lab data leakage. Query restricted to <code class="font-mono text-cerenkov">candidate_supervisors</code> pivot.</p>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="font-mono text-[10px] px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-500 font-bold">
            1 Review Pending Signature
          </span>
        </div>
      </div>
    `,
    features: [
      {
        icon: '<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>',
        title: "ReBAC Advisee Scoping Engine",
        desc: "Strict relationship-based access control (ReBAC) ensures supervisors only view records of students explicitly assigned to themâ€”guaranteeing academic confidentiality."
      },
      {
        icon: '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
        title: "11-Point Rubric Evaluation",
        desc: "Standardized institutional grading engine for biannual progress reports assessing research methodology, literature review breadth, and milestone velocity."
      },
      {
        icon: '<svg class="w-4 h-4 text-cerenkov" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>',
        title: "Biometric HTML5 Canvas Signing",
        desc: "Direct stylus and mouse signature stamping with microsecond timestamping and IP capture. Automatically triggers the cryptographic state seal."
      },
      {
        icon: '<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>',
        title: "Early Warning Inactivity Scanner",
        desc: "Instant red-flag notification when an advisee exceeds 30 calendar days without logging an endorsed supervision meeting."
      }
    ]
  },
  dean: {
    roleTag: "ROLE_DEAN_ADMIN Â· ROOT_GOVERNANCE_ACCESS",
    title: "Dean & IPSRE Administration Hub",
    subtitle: "Macro Institutional Oversight, Risk Intervention & Compliance Stream",
    badgeColor: "text-purple-400",
    stepperHtml: `
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
        <div class="p-3 rounded-xl border border-theme-border bg-theme-bg/80">
          <span class="block text-[9px] card-muted uppercase">Faculty GoT Rate</span>
          <span class="text-xl font-bold text-emerald-500">84.2%</span>
          <span class="block text-[9px] card-muted mt-1">+12% vs Manual Era</span>
        </div>
        <div class="p-3 rounded-xl border border-theme-border bg-theme-bg/80">
          <span class="block text-[9px] card-muted uppercase">At-Risk Interventions</span>
          <span class="text-xl font-bold text-amber-500">4 Flagged</span>
          <span class="block text-[9px] card-muted mt-1">Nightly Cron Scanner</span>
        </div>
        <div class="p-3 rounded-xl border border-theme-border bg-theme-bg/80">
          <span class="block text-[9px] card-muted uppercase">Total Postgraduates</span>
          <span class="text-xl font-bold text-cerenkov">128 Active</span>
          <span class="block text-[9px] card-muted mt-1">Masters & PhD Candidates</span>
        </div>
        <div class="p-3 rounded-xl border border-theme-border bg-theme-bg/80">
          <span class="block text-[9px] card-muted uppercase">Audit Log Stream</span>
          <span class="text-xl font-bold text-theme-text">100% Sealed</span>
          <span class="block text-[9px] card-muted mt-1">Immutable Hash Chain</span>
        </div>
      </div>
    `,
    features: [
      {
        icon: '<svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>',
        title: "Macro Faculty Analytics & GoT Rates",
        desc: "Real-time cross-departmental dashboards tracking Graduate-on-Time completion velocities, candidature tenures, and supervisory load distribution."
      },
      {
        icon: '<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>',
        title: "At-Risk Candidate Intervention Queue",
        desc: "Prioritized triage queue highlighting candidates flagged by nightly cron scans for missed biannual deadlines or prolonged supervision gaps."
      },
      {
        icon: '<svg class="w-4 h-4 text-cerenkov" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
        title: "Centralized User & Project Registry",
        desc: "Complete administrative control over student-supervisor pairings, co-supervisor allocations, and tenure extension authorizations."
      },
      {
        icon: '<svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',
        title: "Immutable JSON Audit Trail Inspector",
        desc: "Searchable compliance log capturing actor identity, IP address, timestamp, and state delta for every milestone endorsement and grade submission."
      }
    ]
  }
};

export function initPortalSwitcher() {
  const tabButtons = document.querySelectorAll('.portal-tab-btn');
  const roleTagEl = document.getElementById('portal-role-tag');
  const titleEl = document.getElementById('portal-title');
  const subtitleEl = document.getElementById('portal-subtitle');
  const stepperContainer = document.getElementById('portal-stepper-container');
  const featuresContainer = document.getElementById('portal-features-grid');
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!tabButtons.length || !titleEl) return;

  function renderPortal(portalKey, animate = false) {
    const data = PORTAL_DATA[portalKey];
    if (!data) return;

    tabButtons.forEach(btn => {
      const isCurrent = btn.getAttribute('data-portal') === portalKey;
      btn.classList.toggle('is-active', isCurrent);
      if (isCurrent) {
        btn.className = "portal-tab-btn px-4 py-2 font-mono text-xs rounded-xl bg-cerenkov text-white font-bold transition-all shadow-[0_0_12px_rgba(2,132,199,0.3)] cursor-pointer";
      } else {
        btn.className = "portal-tab-btn px-4 py-2 font-mono text-xs rounded-xl border border-theme-border card-muted hover:border-cerenkov transition-all cursor-pointer";
      }
    });

    if (roleTagEl) {
      roleTagEl.textContent = `// ${data.roleTag}`;
    }

    if (titleEl) {
      titleEl.textContent = data.title;
    }

    if (subtitleEl) {
      subtitleEl.textContent = data.subtitle;
    }

    if (stepperContainer) {
      stepperContainer.innerHTML = data.stepperHtml;
    }

    if (featuresContainer) {
      featuresContainer.innerHTML = data.features.map(f => `
        <div class="portal-feature-item p-4 rounded-xl border border-theme-border bg-theme-bg/60 hover:border-cerenkov/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-5 h-5 shrink-0 flex items-center justify-center">${f.icon}</span>
              <h4 class="font-bold text-sm text-theme-text">${f.title}</h4>
            </div>
            <p class="text-xs card-muted leading-relaxed">${f.desc}</p>
          </div>
        </div>
      `).join('');
    }

    if (animate && !isReducedMotion) {
      if (stepperContainer) {
        gsap.fromTo(stepperContainer,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out', clearProps: 'transform' }
        );
      }
      if (featuresContainer) {
        const items = featuresContainer.querySelectorAll('.portal-feature-item');
        gsap.fromTo(items,
          { opacity: 0, y: 16, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.36, stagger: 0.05, ease: 'power3.out', clearProps: 'transform' }
        );
      }
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const portalKey = btn.getAttribute('data-portal');
      renderPortal(portalKey, true);
    });
  });

  renderPortal('candidate', false);
}

// ============================================================================
// 7. TECHNICAL BLUEPRINT MATRIX & FULLSCREEN MODAL VIEWER
// ============================================================================
const PRMS_DIAGRAMS = [
  {
    title: "PRMS Multi-Tier System Architecture",
    url: "/src/assets/docs/FinalYearProject/PRMS System Architecture Diagram.png",
    desc: "Service-oriented multi-tier architecture illustrating Candidate/Supervisor/Dean portals, API controllers, automated background queue worker, and MySQL 8 storage."
  },
  {
    title: "Entity Relationship Diagram (ERD)",
    url: "/src/assets/docs/FinalYearProject/ERD.png",
    desc: "Complete relational database schema enforcing foreign-key cascade integrity, audit logging tables, evaluation rubrics, and candidate progress milestone models."
  },
  {
    title: "Audit Logging Architecture Overview",
    url: "/src/assets/docs/FinalYearProject/Audit Logging Architecture Overview.png",
    desc: "Immutable append-only audit event logging stream, capturing timestamp, IP fingerprint, actor credentials, and state delta for every milestone endorsement."
  },
  {
    title: "Data Integration and Workflow Model",
    url: "/src/assets/docs/FinalYearProject/Data Integration and Workflow Model.png",
    desc: "Semester-by-semester state transition diagram illustrating candidate submission, supervisor feedback loop, revision tracking, and final dean clearance."
  },
  {
    title: "Scholarly Publication Registry & Clearance Workflow",
    url: "/src/assets/docs/FinalYearProject/Scholarly Publication Registry and Graduation Clearance Workflow.png",
    desc: "Verification workflow for Scopus/WoS indexed research papers, patent filings, and conference proceedings required before viva voce defense authorization."
  },
  {
    title: "Use Case Diagram",
    url: "/src/assets/docs/FinalYearProject/use case diagram.png",
    desc: "Permission boundaries and behavioral interactions across the three authenticated actor roles: Postgraduate Candidate, Academic Supervisor, and IPSRE Dean."
  }
];

export function initBlueprintMatrix() {
  const tabButtons = document.querySelectorAll('.prms-tab-btn');
  const img = document.getElementById('active-diagram-img');
  const title = document.getElementById('diagram-title');
  const desc = document.getElementById('diagram-desc');
  const fullLink = document.getElementById('diagram-fullscreen');
  const modalOpenBtn = document.getElementById('diagram-modal-open');

  // Modal elements
  const modal = document.getElementById('blueprint-modal');
  const modalViewport = document.getElementById('modal-viewport');
  const modalImg = document.getElementById('modal-blueprint-img');
  const modalTitle = document.getElementById('modal-blueprint-title');
  const modalClose = document.getElementById('modal-blueprint-close');
  const zoomInBtn = document.getElementById('modal-zoom-in');
  const zoomOutBtn = document.getElementById('modal-zoom-out');
  const zoomResetBtn = document.getElementById('modal-zoom-reset');
  const zoomLevelEl = document.getElementById('modal-zoom-level');
  const modalFullLink = document.getElementById('modal-full-link');

  let activeIndex = 0;
  let currentZoom = 1.0;

  function updateZoom(newZoom) {
    currentZoom = Math.min(Math.max(newZoom, 1.0), 3.0);
    if (modalImg) {
      modalImg.style.transform = `scale(${currentZoom})`;
    }
    if (zoomLevelEl) {
      zoomLevelEl.textContent = `${Math.round(currentZoom * 100)}%`;
    }
    if (modalViewport) {
      modalViewport.classList.toggle('cursor-grab', currentZoom > 1.0);
      modalViewport.classList.toggle('cursor-default', currentZoom === 1.0);
    }
  }

  function switchTab(index) {
    const diag = PRMS_DIAGRAMS[index];
    if (!diag) return;
    activeIndex = index;

    if (img) {
      gsap.to(img, {
        opacity: 0,
        scale: 0.985,
        duration: 0.16,
        ease: 'power2.in',
        onComplete: () => {
          img.src = diag.url;
          img.alt = diag.title;
          if (title) title.textContent = diag.title;
          if (desc) desc.textContent = diag.desc;
          if (fullLink) fullLink.href = diag.url;
          gsap.fromTo(img,
            { opacity: 0, scale: 1.02 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out', clearProps: 'transform' }
          );
        }
      });
    }

    tabButtons.forEach((b, i) => {
      if (i === index) {
        b.className = "prms-tab-btn px-3.5 py-1.5 font-mono text-xs rounded-lg bg-cerenkov text-white font-bold transition-all shadow-[0_0_10px_rgba(2,132,199,0.3)] cursor-pointer";
      } else {
        b.className = "prms-tab-btn px-3.5 py-1.5 font-mono text-xs rounded-lg border border-theme-border card-muted hover:border-cerenkov transition-all cursor-pointer";
      }
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'), 10);
      switchTab(index);
    });
  });

  // Modal Functions
  function openModal() {
    if (!modal) return;
    const diag = PRMS_DIAGRAMS[activeIndex];
    if (!diag) return;

    updateZoom(1.0);
    if (modalImg) {
      modalImg.src = diag.url;
      modalImg.alt = diag.title;
    }
    if (modalTitle) modalTitle.textContent = diag.title;
    if (modalFullLink) modalFullLink.href = diag.url;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (modalOpenBtn) modalOpenBtn.addEventListener('click', openModal);
  if (img) img.addEventListener('click', openModal);
  if (modalClose) modalClose.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      updateZoom(currentZoom + 0.5);
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      updateZoom(currentZoom - 0.5);
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', () => {
      updateZoom(1.0);
    });
  }

  // Panning when zoomed
  let isPanning = false;
  let startX = 0, startY = 0;
  let scrollLeft = 0, scrollTop = 0;

  if (modalViewport) {
    modalViewport.addEventListener('mousedown', (e) => {
      if (currentZoom <= 1.0) return;
      isPanning = true;
      startX = e.pageX - modalViewport.offsetLeft;
      startY = e.pageY - modalViewport.offsetTop;
      scrollLeft = modalViewport.scrollLeft;
      scrollTop = modalViewport.scrollTop;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isPanning || !modalViewport) return;
      e.preventDefault();
      const x = e.pageX - modalViewport.offsetLeft;
      const y = e.pageY - modalViewport.offsetTop;
      modalViewport.scrollLeft = scrollLeft - (x - startX);
      modalViewport.scrollTop = scrollTop - (y - startY);
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
    });
  }
}

// ============================================================================
// BOOTSTRAP
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSectionTriggers();
  initScrollSpine();
  initScrollScrubbing();
  initPinnedLifecycle();
  initSignatureCanvas();
  initPortalSwitcher();
  initBlueprintMatrix();
  ScrollTrigger.refresh();
});
