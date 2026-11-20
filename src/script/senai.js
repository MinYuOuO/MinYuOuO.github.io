/**
 * senai.js — Traces of Senai (寻迹士乃) Showcase Controller
 * Component-Driven GSAP Scroll Choreography & Interactive Case Study Engine
 *
 * Modules:
 * 1. Synchronous Theme Coordinator (Light / Dark)
 * 2. Reading Spine & 6-Zone Waypoint Navigator
 * 3. Component-Driven GSAP Scroll Choreography (prefers-reduced-motion aware)
 * 4. Interactive Trace Soul (Wong Zi Song) Bilingual AI & Voice Simulator
 * 5. Interactive 7-Stop Panoramic Illustrated Map & Real MP3 Audio Explorer
 * 6. 3-Tab Production Architecture Vector Blueprint Viewer
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ASSET_BASE = '../src/assets/docs/TracesOfSenai';

// Shared HTML5 Audio controller so simulator & map never overlap
let activeAudio = null;
let activeAudioOwner = null;

function stopAllAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
  const prevOwner = activeAudioOwner;
  activeAudioOwner = null;
  if (prevOwner === 'sim' && typeof window.__senaiResetSimAudioUI === 'function') {
    window.__senaiResetSimAudioUI();
  }
  if (prevOwner === 'stop' && typeof window.__senaiResetStopAudioUI === 'function') {
    window.__senaiResetStopAudioUI();
  }
}

// ============================================================================
// 1. THEME COORDINATOR
// ============================================================================
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';

  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcons(next);
    });
  }
}

function updateThemeIcons(theme) {
  const sunIcons = document.querySelectorAll('.sun-icon');
  const moonIcons = document.querySelectorAll('.moon-icon');
  if (theme === 'light') {
    sunIcons.forEach((el) => el.classList.add('hidden'));
    moonIcons.forEach((el) => el.classList.remove('hidden'));
  } else {
    sunIcons.forEach((el) => el.classList.remove('hidden'));
    moonIcons.forEach((el) => el.classList.add('hidden'));
  }
}

// ============================================================================
// 2. READING SPINE & 6-ZONE WAYPOINT NAVIGATOR
// ============================================================================
const SENAI_ZONES = [
  'senai-hero',
  'senai-transformation',
  'senai-ai-guide',
  'senai-trail',
  'senai-architecture',
  'senai-impact',
];

let isNavigating = false;
let navTween = null;

function initReadingSpineAndWaypoints() {
  const spineBar = document.getElementById('spine-progress');
  const waypointNodes = document.querySelectorAll('.spine-waypoint-node');

  function updateSpine() {
    const scrollY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    if (spineBar) {
      spineBar.style.height = `${(progress * 100).toFixed(2)}%`;
    }

    if (isNavigating) return;

    if (scrollY >= maxScroll - 80) {
      setActiveWaypoint('senai-impact');
      return;
    }
    if (scrollY <= 80) {
      setActiveWaypoint('senai-hero');
      return;
    }

    let current = 'senai-hero';
    for (let i = 0; i < SENAI_ZONES.length; i += 1) {
      const el = document.getElementById(SENAI_ZONES[i]);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= 140) {
        current = SENAI_ZONES[i];
      }
    }
    setActiveWaypoint(current);
  }

  function setActiveWaypoint(activeId) {
    waypointNodes.forEach((node) => {
      node.classList.toggle('is-active', node.getAttribute('data-zone-target') === activeId);
    });
  }

  function scrollToSection(targetId) {
    const el = document.getElementById(targetId);
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetY = targetId === 'senai-hero'
      ? 0
      : Math.max((window.scrollY || window.pageYOffset) + el.getBoundingClientRect().top - 72, 0);

    setActiveWaypoint(targetId);

    if (prefersReduced) {
      window.scrollTo(0, targetY);
      return;
    }

    isNavigating = true;
    if (navTween) navTween.kill();
    navTween = gsap.to(window, {
      scrollTo: { y: targetY, autoKill: true },
      duration: 0.85,
      ease: 'power3.out',
      onComplete: () => {
        isNavigating = false;
      },
      onInterrupt: () => {
        isNavigating = false;
      },
    });
  }

  waypointNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const target = node.getAttribute('data-zone-target');
      if (target) scrollToSection(target);
    });
  });

  // Wire smooth jump anchor links inside page
  document.querySelectorAll('a[href^="#senai-"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        scrollToSection(id);
      }
    });
  });

  window.addEventListener('scroll', updateSpine, { passive: true });
  window.addEventListener('resize', updateSpine, { passive: true });
  updateSpine();
}

// ============================================================================
// 3. COMPONENT-DRIVEN GSAP SCROLL CHOREOGRAPHY (CONTINUOUS SCRUBBED MOTION)
// ============================================================================
function initScrollChoreography() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const likertBars = document.querySelectorAll('.senai-likert-fill');

  if (prefersReduced) {
    likertBars.forEach((bar) => {
      bar.style.width = bar.getAttribute('data-target-width') || '100%';
    });
    return;
  }

  const mm = gsap.matchMedia();

  // --------------------------------------------------------------------------
  // 1. Hero Entrance Stagger + 2-Layer Continuous Scroll Parallax Exit
  // --------------------------------------------------------------------------
  const heroStaggers = document.querySelectorAll('#senai-hero .hero-stagger');
  const heroMetrics = document.querySelectorAll('#senai-hero .hero-metric-card');

  if (heroStaggers.length > 0) {
    gsap.fromTo(
      heroStaggers,
      { y: 26, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );
  }

  if (heroMetrics.length > 0) {
    gsap.fromTo(
      heroMetrics,
      { y: 32, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: 0.22,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );
  }

  const heroCopy = document.querySelector('.senai-hero-copy');
  const heroMetricsGrid = document.querySelector('.senai-hero-metrics');

  if (heroCopy) {
    gsap.to(heroCopy, {
      scrollTrigger: {
        trigger: '#senai-hero',
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.6,
      },
      y: -55,
      opacity: 0.25,
      ease: 'none',
    });
  }

  if (heroMetricsGrid) {
    gsap.to(heroMetricsGrid, {
      scrollTrigger: {
        trigger: '#senai-hero',
        start: 'top top',
        end: 'bottom 15%',
        scrub: 0.6,
      },
      y: -22,
      scale: 0.97,
      opacity: 0.35,
      ease: 'none',
    });
  }

  // --------------------------------------------------------------------------
  // 2. Universal Section Header Reveal & Scrubbed Horizontal Datum Line Draw
  // --------------------------------------------------------------------------
  document.querySelectorAll('.senai-section-head').forEach((head) => {
    const divider = head.querySelector('.senai-divider-line');
    const textChildren = Array.from(head.children).filter(
      (el) => !el.classList.contains('senai-divider-line')
    );

    if (textChildren.length > 0) {
      gsap.fromTo(
        textChildren,
        { y: 26, opacity: 0.15 },
        {
          scrollTrigger: {
            trigger: head,
            start: 'top 90%',
            end: 'top 56%',
            scrub: 0.55,
          },
          y: 0,
          opacity: 1,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }

    if (divider) {
      gsap.fromTo(
        divider,
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: head,
            start: 'top 88%',
            end: 'top 50%',
            scrub: 0.6,
          },
          scaleX: 1,
          ease: 'power2.out',
        }
      );
    }
  });

  // --------------------------------------------------------------------------
  // 3. Section 2: Before vs After — Opposing 3D Wing Convergence & Paired Rows
  // --------------------------------------------------------------------------
  const legacyWing = document.querySelector('.senai-wing-legacy');
  const modernWing = document.querySelector('.senai-wing-modern');

  if (legacyWing && modernWing) {
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        legacyWing,
        { x: -64, rotateY: 6, opacity: 0.15, transformPerspective: 1100 },
        {
          scrollTrigger: {
            trigger: '#senai-transformation',
            start: 'top 84%',
            end: 'top 32%',
            scrub: 0.6,
          },
          x: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );

      gsap.fromTo(
        modernWing,
        { x: 64, rotateY: -6, opacity: 0.15, transformPerspective: 1100 },
        {
          scrollTrigger: {
            trigger: '#senai-transformation',
            start: 'top 84%',
            end: 'top 32%',
            scrub: 0.6,
          },
          x: 0,
          rotateY: 0,
          opacity: 1,
          ease: 'power2.out',
        }
      );
    });

    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        [legacyWing, modernWing],
        { y: 40, opacity: 0.2 },
        {
          scrollTrigger: {
            trigger: '#senai-transformation',
            start: 'top 86%',
            end: 'top 35%',
            scrub: 0.55,
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );
    });

    // Paired Row-by-Row Cascade (Before Row N + After Row N enter together)
    const legacyRows = legacyWing.querySelectorAll('.senai-compare-row');
    const modernRows = modernWing.querySelectorAll('.senai-compare-row');
    const pairCount = Math.max(legacyRows.length, modernRows.length);

    for (let i = 0; i < pairCount; i += 1) {
      const pair = [legacyRows[i], modernRows[i]].filter(Boolean);
      if (pair.length === 0) continue;

      gsap.fromTo(
        pair,
        { y: 24, opacity: 0.2, scale: 0.98 },
        {
          scrollTrigger: {
            trigger: pair[0],
            start: 'top 92%',
            end: 'top 64%',
            scrub: 0.5,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.06,
          ease: 'power2.out',
        }
      );
    }
  }

  // --------------------------------------------------------------------------
  // 4. Section 3: Trace Soul AI Simulator — 3D Perspective Tilt-Up & Prompt Cascade
  // --------------------------------------------------------------------------
  const simCard = document.querySelector('.senai-sim-card');
  if (simCard) {
    gsap.fromTo(
      simCard,
      { y: 65, rotateX: 9, scale: 0.96, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: '#senai-ai-guide',
          start: 'top 84%',
          end: 'top 34%',
          scrub: 0.6,
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }
    );
  }

  const simPromptBtns = document.querySelectorAll('#sim-prompt-list button');
  if (simPromptBtns.length > 0) {
    gsap.fromTo(
      simPromptBtns,
      { y: 20, scale: 0.94, opacity: 0.15 },
      {
        scrollTrigger: {
          trigger: '#sim-prompt-list',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 0.5,
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.06,
        ease: 'power2.out',
      }
    );
  }

  // --------------------------------------------------------------------------
  // 5. Section 4: 7-Stop Panoramic Map & Dossier — Perspective Lift & Map Zoom-Settle
  // --------------------------------------------------------------------------
  const mapCard = document.querySelector('.senai-map-card');
  const mapStageImg = document.querySelector('#senai-map-stage img');
  const stopDossier = document.getElementById('senai-stop-dossier');

  if (mapCard) {
    gsap.fromTo(
      mapCard,
      { y: 60, rotateX: 8, scale: 0.95, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: '#senai-trail',
          start: 'top 84%',
          end: 'top 35%',
          scrub: 0.6,
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }
    );
  }

  if (mapStageImg) {
    gsap.fromTo(
      mapStageImg,
      { scale: 1.06 },
      {
        scrollTrigger: {
          trigger: '#senai-trail',
          start: 'top 78%',
          end: 'top 25%',
          scrub: 0.65,
        },
        scale: 1.0,
        ease: 'power2.out',
      }
    );
  }

  if (stopDossier) {
    gsap.fromTo(
      stopDossier,
      { y: 48, rotateX: 6, scale: 0.97, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: stopDossier,
          start: 'top 90%',
          end: 'top 52%',
          scrub: 0.55,
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }
    );
  }

  // --------------------------------------------------------------------------
  // 6. Section 5: Architecture Blueprints — Tab Cascade, Drafting Lift & Zoom-Settle
  // --------------------------------------------------------------------------
  const archTabs = document.querySelectorAll('.arch-tab-btn');
  const archCard = document.querySelector('.senai-arch-card');
  const archStage = document.getElementById('arch-diagram-stage');
  const challengeCards = document.querySelectorAll('.senai-challenge-card');

  if (archTabs.length > 0) {
    gsap.fromTo(
      archTabs,
      { x: -20, opacity: 0.1 },
      {
        scrollTrigger: {
          trigger: '#senai-architecture',
          start: 'top 86%',
          end: 'top 56%',
          scrub: 0.5,
        },
        x: 0,
        opacity: 1,
        stagger: 0.06,
        ease: 'power2.out',
      }
    );
  }

  if (archCard) {
    gsap.fromTo(
      archCard,
      { y: 60, rotateX: 8, scale: 0.95, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: '#senai-architecture',
          start: 'top 82%',
          end: 'top 35%',
          scrub: 0.6,
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }
    );
  }

  if (archStage) {
    gsap.fromTo(
      archStage,
      { scale: 1.05 },
      {
        scrollTrigger: {
          trigger: '#senai-architecture',
          start: 'top 78%',
          end: 'top 25%',
          scrub: 0.65,
        },
        scale: 1.0,
        ease: 'power2.out',
      }
    );
  }

  if (challengeCards.length > 0) {
    gsap.fromTo(
      challengeCards,
      { y: 40, scale: 0.95, opacity: 0.15 },
      {
        scrollTrigger: {
          trigger: challengeCards[0],
          start: 'top 90%',
          end: 'top 56%',
          scrub: 0.55,
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.09,
        ease: 'power2.out',
      }
    );
  }

  // --------------------------------------------------------------------------
  // 7. Section 6: Field Impact — Cohorts, Telemetry Bars, Quotes, Team & Press
  // --------------------------------------------------------------------------
  const impactCards = document.querySelectorAll('.senai-impact-card');
  const cohortCards = Array.from(impactCards).slice(0, 4);
  const telemetryCard = document.getElementById('senai-telemetry-card');
  const teamPanel = document.getElementById('senai-team-card');

  if (cohortCards.length > 0) {
    gsap.fromTo(
      cohortCards,
      { y: 44, scale: 0.95, opacity: 0.15 },
      {
        scrollTrigger: {
          trigger: cohortCards[0],
          start: 'top 88%',
          end: 'top 52%',
          scrub: 0.55,
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }

  if (telemetryCard) {
    gsap.fromTo(
      telemetryCard,
      { y: 50, rotateX: 6, scale: 0.97, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: telemetryCard,
          start: 'top 88%',
          end: 'top 48%',
          scrub: 0.6,
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }
    );
  }

  likertBars.forEach((bar) => {
    const targetWidth = bar.getAttribute('data-target-width') || '85%';
    gsap.fromTo(
      bar,
      { width: '0%' },
      {
        scrollTrigger: {
          trigger: bar,
          start: 'top 92%',
          end: 'top 62%',
          scrub: 0.55,
        },
        width: targetWidth,
        ease: 'power2.out',
      }
    );
  });

  const quoteCards = document.querySelectorAll('.senai-quote-card');
  if (quoteCards.length > 0) {
    gsap.fromTo(
      quoteCards,
      { y: 34, scale: 0.96, opacity: 0.15 },
      {
        scrollTrigger: {
          trigger: quoteCards[0],
          start: 'top 90%',
          end: 'top 54%',
          scrub: 0.55,
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.07,
        ease: 'power2.out',
      }
    );
  }

  if (teamPanel) {
    gsap.fromTo(
      teamPanel,
      { y: 50, rotateX: 6, scale: 0.97, opacity: 0.2, transformPerspective: 1200 },
      {
        scrollTrigger: {
          trigger: teamPanel,
          start: 'top 88%',
          end: 'top 48%',
          scrub: 0.6,
        },
        y: 0,
        rotateX: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
      }
    );
  }

  const pressCards = document.querySelectorAll('.senai-press-card');
  if (pressCards.length > 0) {
    gsap.fromTo(
      pressCards,
      { y: 36, scale: 0.95, opacity: 0.15 },
      {
        scrollTrigger: {
          trigger: pressCards[0],
          start: 'top 92%',
          end: 'top 62%',
          scrub: 0.55,
        },
        y: 0,
        scale: 1,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }

  // Recompute trigger bounds after map/SVG images settle
  window.addEventListener('load', () => ScrollTrigger.refresh());
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

// ============================================================================
// 4. INTERACTIVE TRACE SOUL (WONG ZI SONG) SIMULATOR
// ============================================================================
const AUDIENCE_LABELS = {
  primary: 'Primary School (<12)',
  secondary: 'Secondary School',
  university: 'University / Youth',
  public: 'Public / Elders',
};

const SIM_PROMPTS = [
  {
    id: 'kong-hay-tong',
    stopNum: 2,
    stopName: 'Kong Hay Tong',
    tagEn: 'Historical Boundary · DB_004',
    tagZh: '历史边界守卫 · DB_004',
    questionEn: 'Did you build Kong Hay Tong by yourself when you were young?',
    questionZh: '江夏堂是你年轻时一个人建起来的吗？',
    display: {
      en: {
        primary: 'Haha, not by myself at all! I was already a grandpa of sixty-six in 1947 when more than ten clan uncles and I teamed up to start Kong Hay Tong. One person brought two dollars, another drove a lorry, and others cooked meals—together we built a warm home for newcomers!',
        secondary: 'Not alone—I was already around sixty-six in 1947 when over ten clan elders and I co-founded Kong Hay Tong. Everyone chipped in what they could: money, transport, labour, or meals. Early settlers needed a mutual-aid home to lean on, not just a roof.',
        university: 'Not at all—I was already around sixty-six in 1947 when over ten clan elders and I came together to start Kong Hay Tong. Everyone contributed what they could—two dollars, a lorry, a meal, or carrying a stone. To us, it was never just a building; early newcomers needed a home to lean on and remember their roots.',
        public: 'No, no—never by myself. In 1947 I was already sixty-six when more than ten clan elders and I formally registered Kong Hay Tong, though mutual aid among our kin started years earlier. Some gave two dollars, some drove a lorry, some carried stones—it was built by community spirit.',
      },
      zh: {
        primary: '哈哈，当然不是我一个人啦！1947年成立江夏堂的时候，我都已经六十六岁了，是和十多位宗亲长辈一起凑起来的。有人出两块钱、有人出罗里、有人煮饭搬石头，大家齐心协力，才帮新来的乡亲盖起一个家！',
        secondary: '不是我一个人，也不是年轻时候的事。1947年我已经六十六岁了，当时是和十多位宗亲长辈一起筹组江夏堂。大家有钱出钱、有力出力，只为了让离乡背井的乡亲在士乃有个互相照应的地方。',
        university: '哪里是我一个人建的——1947年正式成立江夏堂时，我已经大约六十六岁了，是和十多位宗亲前辈一起发起的。大家各尽所能，有人出两块钱，有人出罗里，有人煮饭搬石。对我们来说，它从来不只是一栋建筑，而是让早期新客能够互相照应、记住根源的家。',
        public: '不敢当，绝不是我一人之功。1947年正式注册江夏堂时我已六十六岁，其实宗亲互助早就开始了。当年大家有钱出钱、有车出车、有力出力，一砖一瓦凑出来，为的就是让漂泊来士乃的乡亲有个安身立命、守望相助的家。',
      },
    },
    ttsHakka: '唔係𠊎一个人啦！一九四七年𠊎都六十六岁咧，係同十多位宗亲长辈一齐创办江夏堂个。大家有钱出钱、有力出力，让早期来到士乃个乡亲有一个互相照应个家。',
    rag: {
      recordId: 'DB_004 · id=7',
      score: 'MATCH Score: 18.42 (Top #1 / 139)',
      keywords: '[Group 1 ×3.0]: 黄子松, 江夏堂, 1947年, 互助会  |  [Group 2 ×2.5]: 江夏堂成立时间, 黄子松对士乃贡献  |  [Group 3 ×1.5]: 士乃, 宗亲前辈',
      guardrail: 'Do Not Say: Never claim Wong Zi Song built Kong Hay Tong, SJK (C) Senai, or the Chamber of Commerce alone; distinguish formal registration year (1947) from earlier informal mutual aid; always credit fellow elders, women, and villagers.',
    },
  },
  {
    id: 'tong-le-cinema',
    stopNum: 3,
    stopName: 'Tong Le Theatre',
    tagEn: 'WebAR Stop 03 · Memories',
    tagZh: 'WebAR 第3站 · 旧日记忆',
    questionEn: 'What was Tong Le Theatre like in the old days?',
    questionZh: '同乐戏院以前是什么样子的？',
    display: {
      en: {
        primary: 'Oh, it was the most exciting place in town! After dinner, families walked down Senai street to watch colorful Chinese operas and movies at Tong Le Theatre. The whole street glowed with lights and laughter!',
        secondary: 'Back in the 1930s, Tong Le Theatre was Senai’s liveliest gathering spot. After a long day of work, townsfolk met there for Chinese operas, films, and evening chats—filling Main Street with lights and voices.',
        university: 'In its heyday from the 1930s onward, Tong Le Theatre was truly alive. After finishing work and dinner, residents gathered here for Chinese opera, films, and evening conversations—filling Senai’s main street with lights and laughter. Though quiet today, it remains living proof of how vibrant Senai once was.',
        public: 'Ah, Tong Le Theatre used to be full of life. Once the day’s work and dinner were done, neighbors gathered there for opera and cinema, and the whole street echoed with laughter. Even though it sits quiet now, those lively evenings live on in Senai’s collective memory.',
      },
      zh: {
        primary: '以前啊，同乐戏院可是全镇最热闹的地方！吃过晚饭，大人小孩都会走到大街来看大戏、看电影，整条街都是亮晶晶的灯光和笑声！',
        secondary: '1930年代建成的同乐戏院，曾经是士乃最热闹的娱乐中心。大家做完工、吃过饭，就会来这里看戏、看电影、聊天，整条大街充满人声和灯光。',
        university: '以前啊，同乐戏院真的很热闹。大家做完工、吃过饭，就会聚到这里看大戏、看电影，整条大街都是灯光和笑声。现在它安静下来了，但它提醒着我们，士乃曾经有过那么多热闹的声音。',
        public: '以前啊，同乐戏院真是士乃最有人气的地方。做完工、吃过晚饭，街坊邻居聚在一起看大戏、看电影、话家常，整条大街灯火通明。如今戏院虽静了下来，那段热闹岁月依然留在老士乃人的记忆里。',
      },
    },
    ttsHakka: '以前啊，同乐戏院当热闹！大家做完工、食过夜饭，就会聚到这兜看大戏、看电影，整条大街都係灯光同笑声。今下安静落来咧，但係佢提醒𠊎兜，士乃曾经有恁多热闹个声音。',
    rag: {
      recordId: 'STOP_03 · Tong Le Theatre',
      score: 'MATCH Score: 16.95 (Top #1 / 139)',
      keywords: '[Group 1 ×3.0]: 同乐戏院, 士乃大街, 大戏, 电影  |  [Group 2 ×2.5]: 同乐戏院以前是什么样子, 同乐戏院旧址  |  [Group 3 ×1.5]: 1930年代, 社区娱乐',
      guardrail: 'Do Not Say: Do not invent specific movie titles or unverified ticket prices; frame post-closure silence respectfully through community memory and link visitors to the Stop 03 Kivicube WebAR reconstruction.',
    },
  },
  {
    id: 'early-settlers',
    stopNum: 5,
    stopName: 'Senai River',
    tagEn: 'Pioneer Attribution · DB_002',
    tagZh: '先民史实考证 · DB_002',
    questionEn: 'Were you the original founder who opened up Senai?',
    questionZh: '士乃最早是不是你开发出来的？',
    display: {
      en: {
        primary: 'No, no—I always want to be honest about that! Before I arrived as a boy, earlier Teochew and Hainanese pioneers had already paddled up the river and cleared the land. I came later to grow business and help the community.',
        secondary: 'I have to make this clear: Senai was not opened by me. Earlier Teochew and Hainanese settlers cleared the land along Heng Soon Port and the river first. I arrived around 1894 at Upper Street and helped develop the town later.',
        university: 'I must be clear—Senai was not pioneered by me. Those who first cleared the land with machetes were earlier Teochew and Hainanese Kangchu settlers along Heng Soon Port, where up to two hundred Puning Teochew households once traded by river. I settled at Upper Street around 1894 as someone who helped develop the town—not its sole founder.',
        public: 'This must be spoken plainly: I helped develop Senai, I did not open it from jungle. Long before me, Teochew families from Puning and Hainanese pioneers were already farming and trading along Heng Soon Port. When I settled in Upper Street around 1894, Lower Street did not even exist yet—it was built many years later.',
      },
      zh: {
        primary: '不是哦，这个一定要讲清楚！在我十三岁来到士乃之前，更早的潮州人和海南人先辈就已经沿着士乃河来开荒种地了。我是后来才来这里做生意、帮大家建设社区的。',
        secondary: '这个要说清楚：士乃不是我开发的。最早拿刀开荒的是潮州人和海南人先辈，他们沿着恒顺港一带靠河生活。我大约在1894年落脚在上街场，是后来把生意和资源回馈社区的人。',
        university: '士乃不是我开发的，这个要说清楚。开发是拿刀去开荒的人，那是更早的潮州人、海南人先辈——我来之前，恒顺港一带已有最多约两百户普宁潮州家庭靠河生活。我最初落脚在上街场（当时还没有下街场），我是后来发展士乃、把资源用回社区的人。',
        public: '这话必须讲明白：士乃不是我一人开发的。拿刀开荒的是更早沿着恒顺港落脚的潮州人与海南人先贤。我约1894年来到上街场时，根本还没有下街场，下街场是多年后黄炳南先生才建起来的。我只是把生意做起来后，尽力回馈这片土地的人。',
      },
    },
    ttsHakka: '士乃唔係𠊎开发个，这爱讲清楚。最早拿刀开荒个係更早来到恒顺港个潮州人同海南人先辈。𠊎係后来落脚上街场，把生意做起来、把资源用转社区个人。',
    rag: {
      recordId: 'DB_002 · id=5',
      score: 'MATCH Score: 19.10 (Top #1 / 139)',
      keywords: '[Group 1 ×3.0]: 上街场, 恒顺港, 潮州人, 黄炳南, 下街场  |  [Group 2 ×2.5]: 士乃是不是黄子松开发的, 上街场还是下街场  |  [Group 3 ×1.5]: 士乃, 一百二十五年',
      guardrail: 'Do Not Say: Never call Wong Zi Song the sole founder of Senai; never minimize earlier Teochew/Hainanese pioneers; never describe Upper Street and Lower Street as developing simultaneously (Upper Street came first).',
    },
  },
  {
    id: 'senai-railway',
    stopNum: 4,
    stopName: 'Senai Railway',
    tagEn: 'WebAR Stop 04 · 1909 Rail',
    tagZh: 'WebAR 第4站 · 1909 铁路',
    questionEn: 'How did the 1909 railway change Senai?',
    questionZh: '1909年的士乃铁路怎样改变了士乃？',
    display: {
      en: {
        primary: 'In 1909, the big steam train started running north from Johor Bahru—and Senai was the very first stop! Trains carried sweet pineapples and rubber out to the world, and brought lots of new families right here.',
        secondary: 'When the railway opened in 1909 as the first stop north of Johor Bahru, it connected Senai beyond the river. Pineapples, rubber, and goods shipped out by train while new immigrants arrived and decided to call Senai home.',
        university: 'In 1909, the railway ran north from Johor Bahru and made Senai its very first stop. That steel line transformed our local economy—exporting pineapples, rubber, and cargo while carrying waves of early immigrants here. Some only passed through; others stayed and built Senai into their home.',
        public: 'When the tracks opened in 1909, Senai became the first station north of Johor Bahru. Pineapples and cargo left by rail every day, and countless newcomers stepped off the train here for the first time—many of whom stayed and raised generations in Senai.',
      },
      zh: {
        primary: '1909年火车从新山出发往北走，第一站就是士乃！火车把士乃香甜的黄梨和橡胶运出去，也载来了好多新朋友，大家慢慢在这里安家啦！',
        secondary: '1909年通车后，士乃成为新山向北行的第一站。铁路不仅让黄梨、橡胶和货物运销各地，也把大批早期移民带进士乃，彻底带动了市镇成长。',
        university: '1909年，火车从新山开出，向北行的第一站就是士乃。我这一生，黄梨、橡胶和许多货物都是靠这条铁路运出去的；也有无数人像我们一样，沿着铁路第一次踏上这片土地，慢慢把士乃当成自己的家。',
        public: '1909年火车通车，士乃是新山北上的头一站。从此黄梨、树胶与百货得以畅通外运，也迎来一代又一代南来打拼的先民——有人只是过客，更多人留了下来，把士乃建成了家园。',
      },
    },
    ttsHakka: '一九〇九年，火车从新山开出，向北行个第一站就係士乃。黄梨、树胶同货物都靠这条铁路运出去，也有当多先民从这里踏上士乃，慢慢把这兜当成自家个屋家。',
    rag: {
      recordId: 'STOP_04 · Senai Railway (1909)',
      score: 'MATCH Score: 17.64 (Top #1 / 139)',
      keywords: '[Group 1 ×3.0]: 士乃铁路, 1909年, 火车, 黄梨, 橡胶  |  [Group 2 ×2.5]: 士乃铁路历史, 火车第一站  |  [Group 3 ×1.5]: 新山北上, 早期移民',
      guardrail: 'Do Not Say: Do not conflate the 1909 rail opening with Wong Zi Song’s earlier 1894 arrival (DB_001 explicitly forbids fabricating how he traveled to Senai as a 13-year-old).',
    },
  },
];

function initTraceSoulSimulator() {
  const promptListEl = document.getElementById('sim-prompt-list');
  const userMsgEl = document.getElementById('sim-user-msg');
  const displayEl = document.getElementById('sim-display-text');
  const ttsEl = document.getElementById('sim-tts-text');
  const audienceTagEl = document.getElementById('sim-audience-tag');
  const avatarImg = document.getElementById('sim-avatar-img');
  const stateTextEl = document.getElementById('sim-state-text');
  const stateDotEl = document.getElementById('sim-state-dot');
  const audioBtn = document.getElementById('sim-audio-btn');
  const audioLabel = document.getElementById('sim-audio-label');
  const audioMeta = document.getElementById('sim-audio-meta');
  const playIcon = document.getElementById('sim-audio-play-icon');
  const pauseIcon = document.getElementById('sim-audio-pause-icon');
  const waveformEl = document.getElementById('sim-waveform');
  const ragToggle = document.getElementById('sim-rag-toggle');
  const ragPanel = document.getElementById('sim-rag-panel');
  const ragChevron = document.getElementById('sim-rag-chevron');
  const ragIdEl = document.getElementById('sim-rag-id');
  const ragScoreEl = document.getElementById('sim-rag-score');
  const ragKeywordsEl = document.getElementById('sim-rag-keywords');
  const ragGuardrailEl = document.getElementById('sim-rag-guardrail');

  if (!promptListEl || !displayEl) return;

  let currentLang = 'en';
  let currentAudience = 'university';
  let currentPromptIndex = 0;
  let streamTimer = null;
  let idleLoaded = false;

  const AVATAR_SRC = {
    static: `${ASSET_BASE}/avatar-trace-soul.png`,
    idle: `${ASSET_BASE}/anim-idle.webp`,
    thinking: `${ASSET_BASE}/anim-thinking.webp`,
    speaking: `${ASSET_BASE}/anim-speaking.webp`,
  };

  function setAvatarState(state) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const labels = {
      idle: 'STATE: IDLE',
      thinking: 'STATE: THINKING (RAG)',
      speaking: 'STATE: SPEAKING (TTS)',
    };
    const dotColors = {
      idle: 'bg-emerald-500',
      thinking: 'bg-amber-500 animate-pulse',
      speaking: 'bg-cerenkov animate-ping',
    };

    if (stateTextEl) stateTextEl.textContent = labels[state] || 'STATE: IDLE';
    if (stateDotEl) stateDotEl.className = `w-1.5 h-1.5 rounded-full ${dotColors[state] || 'bg-emerald-500'}`;

    document.querySelectorAll('[data-avatar-state-pill]').forEach((pill) => {
      const active = pill.getAttribute('data-avatar-state-pill') === state;
      pill.className = active
        ? 'px-2 py-0.5 rounded bg-cerenkov/15 text-cerenkov border border-cerenkov/30 font-bold'
        : 'px-2 py-0.5 rounded bg-theme-bg card-muted border border-theme-border';
    });

    if (avatarImg && !prefersReduced) {
      const targetSrc = state === 'idle' && !idleLoaded ? AVATAR_SRC.static : AVATAR_SRC[state];
      if (avatarImg.getAttribute('src') !== targetSrc) {
        avatarImg.setAttribute('src', targetSrc);
      }
    }
  }

  // Upgrade static PNG to real idle WebP lazily when simulator enters viewport
  const simSection = document.getElementById('senai-ai-guide');
  if (simSection && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          idleLoaded = true;
          if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setAvatarState('idle');
          }
          obs.disconnect();
        }
      },
      { rootMargin: '150px' }
    );
    obs.observe(simSection);
  }

  function resetSimAudioUI() {
    const prompt = SIM_PROMPTS[currentPromptIndex];
    const langCode = currentLang === 'zh' ? 'ZH' : 'EN';
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (waveformEl) waveformEl.classList.add('senai-wave-paused');
    if (audioLabel) audioLabel.textContent = `Play Real Stop Audio (${langCode})`;
    if (audioMeta) audioMeta.textContent = `Track: ${currentLang}_stop${prompt.stopNum}.mp3 · ${prompt.stopName}`;
    setAvatarState('idle');
  }
  window.__senaiResetSimAudioUI = resetSimAudioUI;

  function renderPromptButtons() {
    promptListEl.innerHTML = '';
    SIM_PROMPTS.forEach((item, idx) => {
      const active = idx === currentPromptIndex;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = active
        ? 'text-left p-3 rounded-xl border border-cerenkov bg-cerenkov/10 transition-all cursor-pointer'
        : 'text-left p-3 rounded-xl border border-theme-border bg-theme-surface/50 hover:border-cerenkov/60 transition-all cursor-pointer';
      btn.innerHTML = `
        <span class="block font-mono text-[10px] ${active ? 'text-cerenkov font-bold' : 'card-muted'} mb-1">
          ${currentLang === 'zh' ? item.tagZh : item.tagEn}
        </span>
        <span class="block text-xs font-semibold text-theme-text leading-snug">
          "${currentLang === 'zh' ? item.questionZh : item.questionEn}"
        </span>
      `;
      btn.addEventListener('click', () => {
        currentPromptIndex = idx;
        stopAllAudio();
        renderPromptButtons();
        runSimulation(true);
      });
      promptListEl.appendChild(btn);
    });
  }

  function runSimulation(animateStream) {
    if (streamTimer) {
      clearInterval(streamTimer);
      streamTimer = null;
    }

    const item = SIM_PROMPTS[currentPromptIndex];
    const fullDisplay = item.display[currentLang][currentAudience];
    const questionText = currentLang === 'zh' ? item.questionZh : item.questionEn;

    if (userMsgEl) userMsgEl.textContent = `"${questionText}"`;
    if (audienceTagEl) audienceTagEl.textContent = `Tone: ${AUDIENCE_LABELS[currentAudience]}`;
    if (ttsEl) ttsEl.textContent = item.ttsHakka;
    if (ragIdEl) ragIdEl.textContent = item.rag.recordId;
    if (ragScoreEl) ragScoreEl.textContent = item.rag.score;
    if (ragKeywordsEl) ragKeywordsEl.textContent = item.rag.keywords;
    if (ragGuardrailEl) ragGuardrailEl.textContent = item.rag.guardrail;

    resetSimAudioUI();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animateStream || prefersReduced) {
      displayEl.textContent = fullDisplay;
      setAvatarState('idle');
      return;
    }

    // Brief thinking phase (RAG query expansion) -> SSE token stream -> idle
    idleLoaded = true;
    setAvatarState('thinking');
    displayEl.textContent = currentLang === 'zh' ? '正在检索 139 条士乃口述历史记忆...' : 'Querying 139 MySQL ngram FULLTEXT records...';

    setTimeout(() => {
      setAvatarState('speaking');
      let pos = 0;
      const step = currentLang === 'zh' ? 3 : 6;
      displayEl.textContent = '';

      streamTimer = setInterval(() => {
        pos += step;
        displayEl.textContent = fullDisplay.slice(0, pos);
        if (pos >= fullDisplay.length) {
          clearInterval(streamTimer);
          streamTimer = null;
          if (activeAudioOwner !== 'sim') {
            setAvatarState('idle');
          }
        }
      }, 22);
    }, 380);
  }

  // Language buttons
  document.querySelectorAll('.sim-lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextLang = btn.getAttribute('data-sim-lang');
      if (nextLang === currentLang) return;
      currentLang = nextLang;
      stopAllAudio();

      document.querySelectorAll('.sim-lang-btn').forEach((b) => {
        const active = b.getAttribute('data-sim-lang') === currentLang;
        b.setAttribute('aria-pressed', String(active));
        b.className = active
          ? 'sim-lang-btn px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border border-cerenkov bg-cerenkov/15 text-cerenkov transition-all cursor-pointer'
          : 'sim-lang-btn px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border border-theme-border card-muted hover:border-cerenkov hover:text-theme-text transition-all cursor-pointer';
      });

      renderPromptButtons();
      runSimulation(true);
    });
  });

  // Audience tone buttons
  document.querySelectorAll('.sim-audience-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextAud = btn.getAttribute('data-sim-audience');
      if (nextAud === currentAudience) return;
      currentAudience = nextAud;

      document.querySelectorAll('.sim-audience-btn').forEach((b) => {
        const active = b.getAttribute('data-sim-audience') === currentAudience;
        b.setAttribute('aria-pressed', String(active));
        b.className = active
          ? 'sim-audience-btn px-2.5 py-1 rounded-lg font-mono text-[11px] border border-cerenkov bg-cerenkov/15 text-cerenkov font-semibold transition-all cursor-pointer'
          : 'sim-audience-btn px-2.5 py-1 rounded-lg font-mono text-[11px] border border-theme-border card-muted hover:border-cerenkov transition-all cursor-pointer';
      });

      runSimulation(true);
    });
  });

  // Real MP3 Audio button
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (activeAudio && activeAudioOwner === 'sim') {
        stopAllAudio();
        return;
      }

      stopAllAudio();
      const item = SIM_PROMPTS[currentPromptIndex];
      const src = `${ASSET_BASE}/stops/${currentLang}_stop${item.stopNum}.mp3`;
      const audio = new Audio(src);

      activeAudio = audio;
      activeAudioOwner = 'sim';
      idleLoaded = true;

      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (waveformEl) waveformEl.classList.remove('senai-wave-paused');
      if (audioLabel) audioLabel.textContent = 'Pause Real Voice Narration';
      setAvatarState('speaking');

      audio.play().catch(() => {
        stopAllAudio();
      });

      audio.addEventListener('ended', () => {
        stopAllAudio();
      });
    });
  }

  // Collapsible RAG Peek
  if (ragToggle && ragPanel) {
    ragToggle.addEventListener('click', () => {
      const isHidden = ragPanel.classList.toggle('hidden');
      ragToggle.setAttribute('aria-expanded', String(!isHidden));
      if (ragChevron) ragChevron.textContent = isHidden ? '+ Expand' : '− Collapse';
    });
  }

  renderPromptButtons();
  runSimulation(false);
}

// ============================================================================
// 5. INTERACTIVE 7-STOP ILLUSTRATED MAP & AUDIO EXPLORER
// ============================================================================
const TRAIL_STOPS = [
  {
    id: 1,
    qr: 'trace-station',
    nameEn: 'Trace Station',
    nameZh: '寻迹总站',
    mapX: 2.2,
    mapY: 30,
    webar: false,
    badgeLabel: 'Physical Starting Hub',
    significance: 'Starting hub where visitors collect their physical Trace Pack & journal and write down their first impression of Senai.',
    scriptEn: "Welcome to the Trace Station. Today, I'll be walking this journey with you through Senai. Many people pass by this place, but only a few stop to take a closer look. Every street and every old building here holds a story waiting to be discovered. Take your time—I'll share stories of the people, their lives, and the memories that shaped this town.",
    scriptZh: '欢迎来到寻迹总站。今天，我陪你一起走一趟士乃。很多人经过这里，却很少停下来看看。这里啊，每一条街、每一栋老建筑，都藏着士乃的故事。等一下，我带你慢慢走，听听那些关于人、关于生活、关于回忆的故事。来，我们一起寻迹。',
  },
  {
    id: 2,
    qr: 'kong-hay-tong',
    nameEn: 'Kong Hay Tong',
    nameZh: '江夏堂',
    mapX: 13.1,
    mapY: 59,
    webar: false,
    badgeLabel: 'Ancestral Clan Hall (Est. 1947)',
    significance: 'Historic Wong Clan Association co-initiated by Wong Zi Song as first president (1947–1974); preserves ancestral hall, courtyard, and old well symbolizing Hakka mutual aid.',
    scriptEn: 'This is Kong Hay Tong. Back then, many of us left our hometowns and came to Senai. What we needed most was a place where we could look after one another. Together with many clan members, we founded Kong Hay Tong—some gave money, others gave time and effort. To me, it has never been just a building; it has always been a home.',
    scriptZh: '这里，就是江夏堂。当年，我们这些离乡背井的人来到士乃，最需要的是有一个地方能够互相照应。所以，我和许多宗亲一起筹组了江夏堂，有钱出钱、有力出力。对我来说，它从来不只是一栋建筑，它更像一个家。',
  },
  {
    id: 3,
    qr: 'tong-le-cinema',
    nameEn: 'Tong Le Theatre (Cinema)',
    nameZh: '同乐戏院',
    mapX: 27.2,
    mapY: 27,
    webar: true,
    badgeLabel: 'Kivicube WebAR · 1930s Reconstruction',
    significance: "Built in the 1930s (~1934); once Senai's liveliest entertainment venue for Chinese opera, films, and evening community gatherings.",
    scriptEn: "This is Tong Le Theatre. After a long day's work and a good meal, people would gather here to watch operas, enjoy films, or simply chat with friends. Senai's main street was filled with lights and laughter. To me, Tong Le Theatre has never been just an old cinema—it is a reminder of when Senai was filled with life.",
    scriptZh: '这里，就是同乐戏院。以前啊，这里真的很热闹。大家做完工、吃过饭，就会来到这里看戏、看电影、聚会聊天。那时候的士乃大街有灯光，也有很多人的笑声。对我来说，同乐戏院是士乃曾经热闹过的证明。',
  },
  {
    id: 4,
    qr: 'senai-railway',
    nameEn: 'Senai Railway',
    nameZh: '士乃铁路',
    mapX: 41.8,
    mapY: 58,
    webar: true,
    badgeLabel: 'Kivicube WebAR · 1909 Railway',
    significance: 'Opened in 1909 as the very first stop north of Johor Bahru; carried early immigrants into Senai and exported pineapples and rubber.',
    scriptEn: 'This is the Senai Railway. In 1909, the railway began running from Johor Bahru, and Senai became the very first stop on its journey north. Throughout my life, pineapples and many other goods were transported from here by train. Some were only passing through; others stayed and made this place their home.',
    scriptZh: '这里，就是士乃铁路。1909年，火车从新山开出，向北行的第一站就是士乃。我这一生，黄梨、货物很多都是靠这条铁路运出去的。有人只是经过，有人却留了下来，慢慢把这里当成了自己的家。',
  },
  {
    id: 5,
    qr: 'senai-river',
    nameEn: 'Senai River',
    nameZh: '士乃河',
    mapX: 56.2,
    mapY: 25,
    webar: true,
    badgeLabel: 'Kivicube WebAR · Historic River Port',
    significance: 'Senai’s earliest transport lifeline linking Hainan Port & Heng Soon Port (gambier/pepper sampans), plus the local underground crossing known as the "Mouse Hole" (老鼠洞).',
    scriptEn: 'This is the Senai River. Before there were roads or railways, this river was the true lifeline of Senai. The early settlers of Hainan Port and Heng Soon Port built their lives here, following this river and gradually making Senai their home. Today it may seem ordinary, but to Senai, this is where the story first began.',
    scriptZh: '这里，就是士乃河。在还没有大路、没有铁路的时候，这条河才是真正的路。海南港、恒顺港那一带，早期的先民就是沿着这条河慢慢落脚、生活下来的。对士乃来说，它是最早的起点。',
  },
  {
    id: 6,
    qr: 'senai-old-street',
    nameEn: 'Senai Old Street',
    nameZh: '士乃老街',
    mapX: 70.2,
    mapY: 60.8,
    webar: true,
    badgeLabel: 'Kivicube WebAR · 1929–1939 Golden Decade',
    significance: 'Historically Senai Main Street (Upper Street first, followed later by Lower Street); flourished during the 1929–1939 "Golden Decade" of pineapple trade.',
    scriptEn: 'This is Senai Old Street. Back then, everyone simply called it Senai Main Street. From 1929 to 1939, shops lined the street, lorries came and went, and truckloads of pineapples were sent out every day. Today it is much quieter, yet those golden years live on in longtime residents’ memories.',
    scriptZh: '这里，就是士乃老街，以前大家都叫它士乃大街。一九二九年到一九三九年那十年，这里商号林立，罗里来来往往，黄梨一车一车运出去。今天它安静了许多，但那段黄金岁月一直留在老士乃人的记忆里。',
  },
  {
    id: 7,
    qr: 'hakka-food',
    nameEn: 'Hakka Flavors & Trace Wall',
    nameZh: '客家味道 · 寻迹墙',
    mapX: 83.9,
    mapY: 19.6,
    webar: false,
    badgeLabel: 'Culinary Finale & Trace Wall',
    significance: 'Hands-on culinary finale with local elders making traditional Hakka Lei Cha (擂茶), Muah Chee (麻糍), and snacks, concluding with visitor reflections on the physical Trace Wall.',
    scriptEn: "We've reached the final stop. Here, we'll make a few of Senai's traditional Hakka favourites together—lei cha, muah chee, and traditional snacks. These are flavours you have to experience with your own hands. Local elders will guide you step by step and share the stories behind them.",
    scriptZh: '来到最后一站了。这一站，我们要一起动手做几样士乃的客家味道——擂茶、麻糍和传统糕点。这些味道得靠手做出来，光听是感受不到的。本地长辈会一步一步教你，也会跟你聊聊这些味道背后的故事。',
  },
];

function formatTime(sec) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function initTrailExplorer() {
  const viewport = document.getElementById('senai-map-viewport');
  const stage = document.getElementById('senai-map-stage');
  const pinsWrap = document.getElementById('senai-map-pins');
  const pillsWrap = document.getElementById('senai-stop-pills');
  const scrollLeftBtn = document.getElementById('map-scroll-left');
  const scrollRightBtn = document.getElementById('map-scroll-right');

  const dossierCard = document.getElementById('senai-stop-dossier');
  const dossierImg = document.getElementById('stop-dossier-img');
  const dossierNum = document.getElementById('stop-dossier-num');
  const dossierAr = document.getElementById('stop-dossier-ar');
  const dossierQr = document.getElementById('stop-dossier-qr');
  const dossierCoords = document.getElementById('stop-dossier-coords');
  const dossierTitle = document.getElementById('stop-dossier-title');
  const dossierSig = document.getElementById('stop-dossier-significance');
  const dossierScript = document.getElementById('stop-dossier-script');

  const audioBtn = document.getElementById('stop-audio-btn');
  const playIcon = document.getElementById('stop-audio-play-icon');
  const pauseIcon = document.getElementById('stop-audio-pause-icon');
  const audioTitle = document.getElementById('stop-audio-title');
  const audioFile = document.getElementById('stop-audio-file');
  const audioTime = document.getElementById('stop-audio-time');

  if (!pinsWrap || !pillsWrap) return;

  let activeStopIndex = 0;
  let stopLang = 'en';

  function resetStopAudioUI() {
    const stop = TRAIL_STOPS[activeStopIndex];
    const code = stopLang === 'zh' ? 'ZH' : 'EN';
    if (playIcon) playIcon.classList.remove('hidden');
    if (pauseIcon) pauseIcon.classList.add('hidden');
    if (audioTitle) audioTitle.textContent = `Listen to Stop 0${stop.id} Narration (${code})`;
    if (audioFile) audioFile.textContent = `Real MP3: ${stopLang}_stop${stop.id}.mp3`;
    if (audioTime) audioTime.textContent = '0:00 / 0:00';
  }
  window.__senaiResetStopAudioUI = resetStopAudioUI;

  function centerStopOnMap(stop) {
    if (!viewport || !stage) return;
    const stageWidth = stage.offsetWidth;
    const targetX = (stop.mapX / 100) * stageWidth - viewport.clientWidth / 2;
    viewport.scrollTo({
      left: Math.max(0, targetX),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }

  function renderMapControls() {
    pinsWrap.innerHTML = '';
    pillsWrap.innerHTML = '';

    TRAIL_STOPS.forEach((stop, idx) => {
      const isActive = idx === activeStopIndex;

      // Map Pin Button
      const pin = document.createElement('button');
      pin.type = 'button';
      pin.style.left = `${stop.mapX}%`;
      pin.style.top = `${stop.mapY}%`;
      pin.setAttribute('aria-label', `Stop 0${stop.id}: ${stop.nameEn}`);
      pin.className = `senai-map-pin absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-mono text-[10px] font-bold shadow-lg cursor-pointer border-2 ${
        isActive
          ? 'is-active bg-cerenkov text-white border-white shadow-cerenkov/40'
          : 'bg-theme-bg/95 text-theme-text border-cerenkov/70 hover:border-cerenkov'
      }`;
      pin.innerHTML = `
        <span>0${stop.id}</span>
        <span class="hidden sm:inline">${stop.nameZh}</span>
        ${stop.webar ? `<span class="px-1 py-0.2 rounded text-[8px] ${isActive ? 'bg-white/25 text-white' : 'bg-cerenkov/15 text-cerenkov'}">AR</span>` : ''}
      `;
      pin.addEventListener('click', () => selectStop(idx, true));
      pinsWrap.appendChild(pin);

      // Quick Selector Pill
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = isActive
        ? 'shrink-0 px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold border border-cerenkov bg-cerenkov/15 text-cerenkov transition-all cursor-pointer'
        : 'shrink-0 px-3 py-1.5 rounded-xl font-mono text-[11px] border border-theme-border card-muted hover:border-cerenkov hover:text-theme-text transition-all cursor-pointer';
      pill.textContent = `0${stop.id} · ${stop.nameEn}${stop.webar ? ' [AR]' : ''}`;
      pill.addEventListener('click', () => selectStop(idx, true));
      pillsWrap.appendChild(pill);
    });
  }

  function updateDossier(animate) {
    const stop = TRAIL_STOPS[activeStopIndex];

    if (dossierImg) {
      dossierImg.setAttribute('src', `${ASSET_BASE}/stops/stop${stop.id}-bg.png`);
      dossierImg.setAttribute('alt', `${stop.nameEn} (${stop.nameZh}) Illustration`);
    }
    if (dossierNum) dossierNum.textContent = `STOP 0${stop.id} / 07`;
    if (dossierAr) {
      dossierAr.textContent = stop.badgeLabel;
      dossierAr.className = stop.webar
        ? 'px-2.5 py-1 rounded-full bg-cerenkov text-white font-mono text-[10px] font-bold shadow-sm'
        : 'px-2.5 py-1 rounded-full bg-theme-bg/90 border border-theme-border text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold backdrop-blur-sm';
    }
    if (dossierQr) dossierQr.textContent = `/scan/${stop.qr}`;
    if (dossierCoords) dossierCoords.textContent = `map_x: ${stop.mapX}% · map_y: ${stop.mapY}%`;
    if (dossierTitle) dossierTitle.textContent = `${stop.nameEn} · ${stop.nameZh}`;
    if (dossierSig) dossierSig.textContent = stop.significance;
    if (dossierScript) dossierScript.textContent = stopLang === 'zh' ? stop.scriptZh : stop.scriptEn;

    resetStopAudioUI();

    if (animate && dossierCard && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        dossierCard,
        { opacity: 0.72, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
  }

  function selectStop(idx, scrollMap) {
    activeStopIndex = idx;
    stopAllAudio();
    renderMapControls();
    updateDossier(true);
    if (scrollMap) {
      centerStopOnMap(TRAIL_STOPS[idx]);
    }
  }

  // Stop narration EN/ZH switcher
  document.querySelectorAll('.stop-lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-stop-lang');
      if (next === stopLang) return;
      stopLang = next;
      stopAllAudio();

      document.querySelectorAll('.stop-lang-btn').forEach((b) => {
        const active = b.getAttribute('data-stop-lang') === stopLang;
        b.setAttribute('aria-pressed', String(active));
        b.className = active
          ? 'stop-lang-btn px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border border-cerenkov bg-cerenkov/15 text-cerenkov cursor-pointer'
          : 'stop-lang-btn px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border border-theme-border card-muted hover:border-cerenkov cursor-pointer';
      });

      updateDossier(false);
    });
  });

  // Real Stop MP3 Player
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (activeAudio && activeAudioOwner === 'stop') {
        stopAllAudio();
        return;
      }

      stopAllAudio();
      const stop = TRAIL_STOPS[activeStopIndex];
      const src = `${ASSET_BASE}/stops/${stopLang}_stop${stop.id}.mp3`;
      const audio = new Audio(src);

      activeAudio = audio;
      activeAudioOwner = 'stop';

      if (playIcon) playIcon.classList.add('hidden');
      if (pauseIcon) pauseIcon.classList.remove('hidden');

      audio.addEventListener('timeupdate', () => {
        if (audioTime) {
          audioTime.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        }
      });

      audio.addEventListener('ended', () => {
        stopAllAudio();
      });

      audio.play().catch(() => {
        stopAllAudio();
      });
    });
  }

  // Panoramic Scroll Buttons
  if (scrollLeftBtn && viewport) {
    scrollLeftBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: -340, behavior: 'smooth' });
    });
  }
  if (scrollRightBtn && viewport) {
    scrollRightBtn.addEventListener('click', () => {
      viewport.scrollBy({ left: 340, behavior: 'smooth' });
    });
  }

  renderMapControls();
  updateDossier(false);
}

// ============================================================================
// 6. 3-TAB PRODUCTION ARCHITECTURE BLUEPRINT VIEWER
// ============================================================================
const ARCH_BLUEPRINTS = {
  rag: {
    title: 'AI Voice-to-Voice & Zero-Vector-DB RAG Pipeline',
    subtitle: 'Native PHP + MySQL 8.4 ngram FULLTEXT · DeepSeek / Qwen Failover · CosyVoice Raw WebSocket',
    badge: '389 ms Avg TTFT · < $0.0015 / user',
    svg: `
      <svg viewBox="0 0 960 320" class="w-full min-w-[44rem] h-auto" role="img" aria-label="AI Voice and MySQL ngram FULLTEXT RAG Architecture">
        <defs>
          <marker id="arrow-senai-1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-cerenkov)" />
          </marker>
        </defs>
        <!-- Node 1: Visitor Input -->
        <rect x="16" y="34" width="165" height="94" rx="14" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="1.6"/>
        <text x="98" y="62" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">01 · CLIENT INPUT</text>
        <text x="98" y="84" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">Blade + Turbo UI</text>
        <text x="98" y="104" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="10">Push-to-Talk / Text</text>
        <text x="98" y="118" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">iOS Safari Unlock</text>

        <!-- Node 2: ASR -->
        <rect x="218" y="34" width="175" height="94" rx="14" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="305" y="62" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">02 · VOICE ASR (STT)</text>
        <text x="305" y="84" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">ffmpeg → Qwen FunASR</text>
        <text x="305" y="104" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="10">16 kHz Mono WAV</text>
        <text x="305" y="118" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">+ Senai / 士乃 Hotwords</text>

        <!-- Node 3: Native MySQL RAG -->
        <rect x="430" y="24" width="245" height="114" rx="14" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="2"/>
        <text x="552" y="50" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">03 · ZERO-VECTOR-DB RAG</text>
        <text x="552" y="72" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">MySQL 8.4 ngram FULLTEXT</text>
        <text x="552" y="92" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="10">LLM 3-Group ZH Query Expansion</text>
        <text x="552" y="108" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">3.0× content · 2.5× variants · 1.5× anchors</text>
        <text x="552" y="124" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="9.5">139 Oral-History Records + Guardrails</text>

        <!-- Node 4: LLM Dual Output -->
        <rect x="712" y="34" width="230" height="94" rx="14" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="827" y="62" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">04 · DUAL-OUTPUT SSE LLM</text>
        <text x="827" y="84" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">DeepSeek → Qwen Failover</text>
        <text x="827" y="104" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="10">6-Msg KV Cache · Strict JSON</text>
        <text x="827" y="118" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">{ display_text, Hakka tts_text }</text>

        <!-- Node 5: Raw PHP WebSocket TTS -->
        <rect x="520" y="190" width="260" height="100" rx="14" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="1.8"/>
        <text x="650" y="216" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">05 · STREAMING TTS ENGINE</text>
        <text x="650" y="238" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">CosyVoice v3-flash (longlaobo_v3)</text>
        <text x="650" y="258" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="10">Raw PHP TLS WebSocket (TCP_NODELAY)</text>
        <text x="650" y="274" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="9.5">389 ms Avg TTFT · 3-Tier TtsService</text>

        <!-- Node 6: Animated Playback -->
        <rect x="130" y="190" width="320" height="100" rx="14" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="290" y="216" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">06 · SYNCHRONIZED BROWSER PLAYBACK</text>
        <text x="290" y="238" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">Chunked audio/mpeg + 5-State WebP</text>
        <text x="290" y="258" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="10">entrance → idle → thinking → speaking</text>
        <text x="290" y="274" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">4 Dynamic Audience Tones (Primary → Elders)</text>

        <!-- Arrows -->
        <line x1="181" y1="81" x2="214" y2="81" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-1)"/>
        <line x1="393" y1="81" x2="426" y2="81" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-1)"/>
        <line x1="675" y1="81" x2="708" y2="81" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-1)"/>
        <path d="M 827 128 L 827 240 L 784 240" fill="none" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-1)"/>
        <line x1="520" y1="240" x2="454" y2="240" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-1)"/>
        <path d="M 130 240 L 98 240 L 98 132" fill="none" stroke="var(--color-cerenkov)" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#arrow-senai-1)"/>
      </svg>
    `,
    specs: [
      {
        label: 'Zero Vector DB Overhead',
        value: 'MySQL 8.4 ngram FULLTEXT',
        desc: 'Eliminates Pinecone/Qdrant hosting costs while delivering precise Chinese + English historical match weights.',
      },
      {
        label: 'Dual-Output JSON Protocol',
        value: 'display_text + Hakka tts_text',
        desc: 'Separates readable EN/ZH transcripts from Hakka vernacular synthesis input (𠊎, 係, 佢) in one SSE stream.',
      },
      {
        label: 'Local vs Cloud TTS Benchmark',
        value: 'CosyVoice vs Piper VITS',
        desc: 'Benchmarked against a 60 MB local Piper VITS model (~300 ms) before standardizing on DashScope Qwen for K3s stability.',
      },
    ],
  },
  k3s: {
    title: 'Zero-Trust Hybrid K3s + Cloudflare Tunnel Topology',
    subtitle: 'Nov 2026 Security Hardening · Outbound-Only Edge Routing · Private Stateful MySQL 8.4',
    badge: '0 Exposed Public Ports · HA Replicas',
    svg: `
      <svg viewBox="0 0 960 320" class="w-full min-w-[44rem] h-auto" role="img" aria-label="Zero-Trust Hybrid K3s and Cloudflare Tunnel Topology">
        <defs>
          <marker id="arrow-senai-2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-cerenkov)" />
          </marker>
        </defs>
        <!-- Zone 1: Edge -->
        <rect x="18" y="42" width="210" height="236" rx="16" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="1.8"/>
        <text x="123" y="72" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">PUBLIC EDGE LAYER</text>
        <text x="123" y="96" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700">Cloudflare Zero Trust</text>
        <rect x="36" y="114" width="174" height="44" rx="10" fill="none" stroke="var(--border-accent)" stroke-width="1.2"/>
        <text x="123" y="133" text-anchor="middle" fill="var(--text-primary)" font-family="JetBrains Mono, monospace" font-size="10">tracesofsenai.site</text>
        <text x="123" y="148" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">Forced HTTPS · HSTS</text>
        <rect x="36" y="170" width="174" height="44" rx="10" fill="none" stroke="var(--border-accent)" stroke-width="1.2"/>
        <text x="123" y="189" text-anchor="middle" fill="var(--text-primary)" font-family="JetBrains Mono, monospace" font-size="10">Strict CSP Policy</text>
        <text x="123" y="204" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">Whitelists kivicube.com</text>
        <text x="123" y="248" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="9.5">Zero Inbound Firewall Ports</text>

        <!-- Zone 2: K3s Cluster Container -->
        <rect x="278" y="22" width="664" height="276" rx="18" fill="none" stroke="var(--color-cerenkov)" stroke-width="1.5" stroke-dasharray="6 4"/>
        <text x="300" y="46" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">SELF-HOSTED K3S CLUSTER (UBUNTU SERVER SSD MASTER + WIREGUARD FLANNEL)</text>

        <!-- Tunnel Pods -->
        <rect x="300" y="72" width="166" height="92" rx="12" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="383" y="98" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">INGRESS TUNNEL</text>
        <text x="383" y="120" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">2× cloudflared Pods</text>
        <text x="383" y="140" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Outbound-Only HA</text>

        <!-- Web Pods -->
        <rect x="506" y="72" width="194" height="92" rx="12" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="1.8"/>
        <text x="603" y="98" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">APPLICATION TIER</text>
        <text x="603" y="120" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">2× Laravel Web Pods</text>
        <text x="603" y="140" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Non-Root · seccompProfile</text>
        <text x="603" y="154" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">PHP 8.3+/8.5 · Blade · Vite 8</text>

        <!-- Private Data Tier -->
        <rect x="740" y="72" width="180" height="196" rx="12" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="830" y="98" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">PRIVATE DATA TIER</text>
        <text x="830" y="124" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">MySQL 8.4 StatefulSet</text>
        <text x="830" y="144" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Local SSD Persistent Vol</text>
        <text x="830" y="160" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">139 RAG Records + Stops</text>
        <line x1="760" y1="180" x2="900" y2="180" stroke="var(--border-accent)" stroke-width="1"/>
        <text x="830" y="206" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">Redis Cache &amp; Queue</text>
        <text x="830" y="226" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Sessions · OTP · Rate Limit</text>
        <text x="830" y="246" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="9">Cluster-Private Only</text>

        <!-- Auth & Optional Worker Strip -->
        <rect x="300" y="190" width="400" height="78" rx="12" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.3"/>
        <text x="500" y="215" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">AUTH &amp; HYBRID BURST MESH</text>
        <text x="500" y="236" text-anchor="middle" fill="var(--text-primary)" font-family="JetBrains Mono, monospace" font-size="10.5">Laravel Socialite (Google / FB) · Email OTP · Guest Login</text>
        <text x="500" y="254" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Optional Cloud VPS Worker joined over encrypted WireGuard Flannel</text>

        <!-- Arrows -->
        <line x1="228" y1="118" x2="296" y2="118" stroke="var(--color-cerenkov)" stroke-width="2" marker-end="url(#arrow-senai-2)"/>
        <line x1="466" y1="118" x2="502" y2="118" stroke="var(--color-cerenkov)" stroke-width="2" marker-end="url(#arrow-senai-2)"/>
        <line x1="700" y1="118" x2="736" y2="118" stroke="var(--color-cerenkov)" stroke-width="2" marker-end="url(#arrow-senai-2)"/>
        <line x1="603" y1="164" x2="603" y2="186" stroke="var(--color-cerenkov)" stroke-width="1.6" marker-end="url(#arrow-senai-2)"/>
      </svg>
    `,
    specs: [
      {
        label: 'Outbound-Only Zero Trust',
        value: '2× HA cloudflared Replicas',
        desc: 'All ingress traverses encrypted Cloudflare Tunnels with zero open SSH/HTTP/MySQL ports on the public internet.',
      },
      {
        label: 'Hardened Container Posture',
        value: 'Non-Root + seccompProfile',
        desc: 'Dual Laravel web pods run stripped of root privileges with HSTS and strict Kivicube-whitelisted CSP headers.',
      },
      {
        label: 'Frictionless Event Onboarding',
        value: 'OAuth + OTP + Guest Mode',
        desc: 'Supports Google/Facebook Socialite, Email OTP, and instant Guest Login so primary students start in under 10 seconds.',
      },
    ],
  },
  webar: {
    title: 'Physical QR Marker → Kivicube WebAR Spatial Flow',
    subtitle: 'Zero App Install · Fullscreen XR Iframe Permissions · Live on Trail Stops 3, 4, 5 & 6',
    badge: '4.12 / 5.00 Survey Rating · 82.9% Positive',
    svg: `
      <svg viewBox="0 0 960 300" class="w-full min-w-[44rem] h-auto" role="img" aria-label="Physical QR to Kivicube WebAR Architecture Flow">
        <defs>
          <marker id="arrow-senai-3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="var(--color-cerenkov)" />
          </marker>
        </defs>
        <!-- Step 1 -->
        <rect x="18" y="46" width="190" height="110" rx="14" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="1.8"/>
        <text x="113" y="74" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">01 · ON-SITE QR SCAN</text>
        <text x="113" y="98" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">/scan/{qr_code_id}</text>
        <text x="113" y="118" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Physical Signboard QR</text>
        <text x="113" y="136" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">No GPS Drift / No App</text>

        <!-- Step 2 -->
        <rect x="246" y="46" width="210" height="110" rx="14" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="351" y="74" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">02 · STOP UNLOCK &amp; AUDIO</text>
        <text x="351" y="98" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">Illustrated Map Progress</text>
        <text x="351" y="118" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Unlocks Hotspot (map_x/y)</text>
        <text x="351" y="136" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">Triggers Stop EN/ZH Audio</text>

        <!-- Step 3 -->
        <rect x="494" y="34" width="244" height="134" rx="14" fill="var(--bg-primary)" stroke="var(--color-cerenkov)" stroke-width="2"/>
        <text x="616" y="62" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">03 · KIVICUBE WEBAR IFRAME</text>
        <text x="616" y="84" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">ar.blade.php Spatial View</text>
        <text x="616" y="106" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">camera · gyroscope · accelerometer</text>
        <text x="616" y="122" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">xr-spatial-tracking · magnetometer</text>
        <text x="616" y="144" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="9.5">DNS Preconnect: Kivicube + Tencent COS</text>

        <!-- Step 4 -->
        <rect x="776" y="46" width="166" height="110" rx="14" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.5"/>
        <text x="859" y="74" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">04 · FALLBACK SAFETY</text>
        <text x="859" y="98" text-anchor="middle" fill="var(--text-primary)" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700">Direct-Open Mode</text>
        <text x="859" y="118" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9.5">Custom Loader Overlay</text>
        <text x="859" y="136" text-anchor="middle" fill="var(--text-secondary)" font-family="JetBrains Mono, monospace" font-size="9">Safari / Chrome Safe</text>

        <!-- Active WebAR Stops Strip -->
        <rect x="18" y="200" width="924" height="72" rx="14" fill="var(--bg-primary)" stroke="var(--border-accent)" stroke-width="1.3"/>
        <text x="480" y="226" text-anchor="middle" fill="var(--color-cerenkov)" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700">4 HISTORIC LANDMARKS RECONSTRUCTED IN LIVE WEBAR (STOPS 3 – 6)</text>
        <text x="480" y="250" text-anchor="middle" fill="var(--text-primary)" font-family="JetBrains Mono, monospace" font-size="11">STOP 03: Tong Le Theatre (1930s)   ·   STOP 04: 1909 Senai Railway   ·   STOP 05: Senai River Life   ·   STOP 06: 1929–1939 Old Street</text>

        <!-- Arrows -->
        <line x1="208" y1="101" x2="242" y2="101" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-3)"/>
        <line x1="456" y1="101" x2="490" y2="101" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-3)"/>
        <line x1="738" y1="101" x2="772" y2="101" stroke="var(--color-cerenkov)" stroke-width="1.8" marker-end="url(#arrow-senai-3)"/>
      </svg>
    `,
    specs: [
      {
        label: 'Explicit XR Feature Policy',
        value: '7 Sensor Permissions',
        desc: 'Iframe declares camera, gyroscope, accelerometer, magnetometer, xr-spatial-tracking, microphone, and fullscreen.',
      },
      {
        label: 'Edge Preconnect Tuning',
        value: 'Kivicube + Tencent COS',
        desc: 'Preconnects DNS/TLS ahead of AR launch and shows a custom branded loader overlay with direct-open fallback.',
      },
      {
        label: 'Why QR Over GPS Geofencing',
        value: '100% Reliable On-Site',
        desc: 'Dense shophouse alleys and shaded awnings disrupt mobile GPS; physical QR markers guarantee instant deterministic unlocks.',
      },
    ],
  },
};

function initArchitectureViewer() {
  const titleEl = document.getElementById('arch-title');
  const subtitleEl = document.getElementById('arch-subtitle');
  const badgeEl = document.getElementById('arch-badge');
  const stageEl = document.getElementById('arch-diagram-stage');
  const specsEl = document.getElementById('arch-specs-grid');
  const tabs = document.querySelectorAll('.arch-tab-btn');

  if (!stageEl || !specsEl) return;

  function renderBlueprint(key, animate) {
    const bp = ARCH_BLUEPRINTS[key];
    if (!bp) return;

    tabs.forEach((tab) => {
      const active = tab.getAttribute('data-arch-tab') === key;
      tab.setAttribute('aria-selected', String(active));
      tab.className = active
        ? 'arch-tab-btn px-4 py-2.5 rounded-xl font-mono text-xs font-semibold border border-cerenkov bg-cerenkov/15 text-cerenkov transition-all cursor-pointer'
        : 'arch-tab-btn px-4 py-2.5 rounded-xl font-mono text-xs font-semibold border border-theme-border card-muted hover:border-cerenkov hover:text-theme-text transition-all cursor-pointer';
    });

    if (titleEl) titleEl.textContent = bp.title;
    if (subtitleEl) subtitleEl.textContent = bp.subtitle;
    if (badgeEl) badgeEl.textContent = bp.badge;
    stageEl.innerHTML = bp.svg;

    specsEl.innerHTML = bp.specs
      .map(
        (s) => `
        <div class="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-theme-border">
          <span class="font-mono text-[10px] uppercase tracking-wider card-muted block mb-1">${s.label}</span>
          <div class="font-mono text-xs font-bold text-cerenkov mb-1.5">${s.value}</div>
          <p class="text-xs card-muted leading-relaxed">${s.desc}</p>
        </div>
      `
      )
      .join('');

    if (animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.fromTo(
        stageEl,
        { opacity: 0.4, scale: 0.985 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'transform,opacity' }
      );
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-arch-tab');
      if (key) renderBlueprint(key, true);
    });
  });

  renderBlueprint('rag', false);
}

// ============================================================================
// BOOTSTRAP
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initReadingSpineAndWaypoints();
  initTraceSoulSimulator();
  initTrailExplorer();
  initArchitectureViewer();
  initScrollChoreography();
});
