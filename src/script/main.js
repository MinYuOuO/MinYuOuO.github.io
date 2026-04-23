// ==========================================
// PROCEDURAL SOUND ENGINE (Global)
// ==========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playHoverSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}

window.playHoverSound = playHoverSound;
window.playClickSound = playClickSound;

document.addEventListener('DOMContentLoaded', () => {
    const lenis = new Lenis({
        duration: 1.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    window.lenis = lenis;

    // ==========================================
    // GSAP SCROLL TRIGGER SETUP
    // ==========================================

    gsap.registerPlugin(ScrollTrigger);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    const fadeElements = document.querySelectorAll('.fade-section, .project-card, section h2, section h3, section p, .cyber-stack, .btn-glitch');
    fadeElements.forEach((element) => {
        gsap.fromTo(element,
            {
                autoAlpha: 0,
                y: 50
            },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "bottom 15%",
                    toggleActions: "play reverse play reverse",
                    markers: false
                }
            }
        );
    });

    // ==========================================
    // THEME TOGGLE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const html = document.documentElement;

    // Default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);

        // Update Three.js components
        if (window.updateHeroOrbTheme) window.updateHeroOrbTheme(newTheme);
        if (window.updateDividerTheme) window.updateDividerTheme(newTheme);
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


    // ==========================================
    // MOBILE MENU
    // ==========================================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
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

    // ==========================================
    // PROJECT ARCHIVES (Show More Logic)
    // ==========================================
    const projects = window.projectsData || [];

    if (projects.length === 0) {
        console.error('Projects data not loaded!');
    }

    const projectGrid = document.getElementById('project-grid');
    const INITIAL_COUNT = window.innerWidth < 768 ? 3 : 6;

    function renderProjects(count) {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';

        const displayedProjects = projects.slice(0, count);

        displayedProjects.forEach((project, index) => {
            const card = document.createElement('a');
            card.href = `project.html?id=${project.id}`;
            card.className = 'project-card p-6 cursor-pointer group flex flex-col h-full opacity-0';
            card.style.textDecoration = 'none';

            card.setAttribute('data-id', project.id);
            card.addEventListener('mouseenter', playHoverSound);
            card.addEventListener('click', () => playClickSound());

            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="font-mono text-[10px] md:text-xs text-cerenkov border border-cerenkov px-2 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity">${project.type}</span>
                    <span class="text-gray-500 text-[10px] md:text-xs font-mono">ID: ${project.id}</span>
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2 group-hover:text-cerenkov transition-colors" style="color: var(--text-primary)">${project.title}</h3>
                <p class="text-sm mb-4 line-clamp-2 grow" style="color: var(--text-secondary)">${project.shortDesc}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.stack.slice(0, 3).map(tech => `<span class="text-[10px] md:text-xs text-gray-400 bg-gray-500/5 px-2 py-1 rounded border border-gray-500/10">${tech}</span>`).join('')}
                </div>
                <div class="border-t border-gray-500/10 pt-4 flex justify-between items-center mt-auto">
                    <span class="text-[10px] md:text-xs font-mono text-gray-500 group-hover:text-cerenkov">VIEW_PROJECT</span>
                    <svg class="w-4 h-4 text-gray-400 group-hover:text-cerenkov transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            `;
            projectGrid.appendChild(card);
        });

        // Entrance animation
        gsap.to(projectGrid.querySelectorAll('.project-card'), {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    }

    renderProjects(INITIAL_COUNT);



    // ==========================================
    // THREE.JS HERO ORB (Local to Hero Section)
    // ==========================================
    function initHeroOrb() {
        const container = document.getElementById('hero-orb-container');
        if (!container) return;

        // Use container dimensions
        const width = container.offsetWidth || 600;
        const height = container.offsetHeight || 600;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const currentTheme = html.getAttribute('data-theme') || 'light';
        const orbColor = currentTheme === 'dark' ? 0x00f0ff : 0x4a3728;

        // Smaller main orb
        const geometry = new THREE.IcosahedronGeometry(1.5, 1);
        const material = new THREE.MeshBasicMaterial({
            color: orbColor,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const orb = new THREE.Mesh(geometry, material);
        scene.add(orb);

        // --- Surrounding floating elements ---
        const floatingGroup = new THREE.Group();
        scene.add(floatingGroup);

        const shapes = [];
        const shapeGeom = new THREE.TetrahedronGeometry(0.2, 0);

        for (let i = 0; i < 8; i++) {
            const shapeMat = new THREE.MeshBasicMaterial({
                color: orbColor,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            const shape = new THREE.Mesh(shapeGeom, shapeMat);

            // Random orbit radius and initial position
            const angle = (i / 8) * Math.PI * 2;
            const radius = 2.5 + Math.random() * 1.5;
            shape.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius,
                (Math.random() - 0.5) * 2
            );

            shape.userData = {
                angle: angle,
                radius: radius,
                speed: 0.005 + Math.random() * 0.01,
                rotSpeed: 0.02 + Math.random() * 0.03
            };

            floatingGroup.add(shape);
            shapes.push(shape);
        }

        // Subtle bloom
        const renderScene = new THREE.RenderPass(scene, camera);
        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.5, 0.4, 0.85
        );
        bloomPass.threshold = 0;
        bloomPass.strength = currentTheme === 'dark' ? 0.8 : 0.2;

        const composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        window.updateHeroOrbTheme = (theme) => {
            const newColor = theme === 'dark' ? 0x00f0ff : 0x4a3728;
            material.color.setHex(newColor);
            shapes.forEach(s => s.material.color.setHex(newColor));
            bloomPass.strength = theme === 'dark' ? 0.8 : 0.2;
        };

        // Mouse tilt effect (throttled)
        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        }, { passive: true });

        function animate() {
            requestAnimationFrame(animate);
            orb.rotation.y += 0.005;
            orb.rotation.x += 0.002;

            // Animate floating shapes
            shapes.forEach(shape => {
                shape.userData.angle += shape.userData.speed;
                shape.position.x = Math.cos(shape.userData.angle) * shape.userData.radius;
                shape.position.y = Math.sin(shape.userData.angle) * shape.userData.radius;
                shape.rotation.x += shape.userData.rotSpeed;
                shape.rotation.y += shape.userData.rotSpeed;
            });

            // Subtle tilt
            orb.rotation.y += mouseX * 0.15;
            orb.rotation.x += mouseY * 0.15;
            floatingGroup.rotation.z += mouseX * 0.05;

            composer.render();
        }

        animate();
        container.style.opacity = '1';

        window.addEventListener('resize', () => {
            const newWidth = container.offsetWidth;
            const newHeight = container.offsetHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            composer.setSize(newWidth, newHeight);
        });
    }

    initHeroOrb();
    // Section Divider Three.js removed as per "only keep in first section" request

    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        if (!progressBar) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / docHeight) * 100;

        progressBar.style.width = scrolled + '%';
    }, { passive: true });

    // ==========================================
    // SMOOTH SCROLL (ANCHORS)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                if (window.lenis) window.lenis.scrollTo(0);
                return;
            }

            try {
                const targetElement = document.querySelector(targetId);

                if (targetElement && window.lenis) {
                    window.lenis.scrollTo(targetElement, {
                        offset: -100,
                        duration: 1.5,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });

                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('flex');
                    }
                }
            } catch (err) {
                console.warn("Invalid selector:", targetId);
            }
        });
    });
});
