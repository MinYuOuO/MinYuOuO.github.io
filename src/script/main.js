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

    const savedTheme = localStorage.getItem('theme') || 'dark';
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
        updateThreeJSTheme(newTheme);
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

    function updateThreeJSTheme(theme) {
        if (window.threeJSScene) {
            const bgColor = theme === 'light' ? 0xe8f4ff : 0x000308;
            const fogColor = theme === 'light' ? 0xe8f4ff : 0x000308;

            window.threeJSScene.background.setHex(bgColor);
            window.threeJSScene.fog.color.setHex(fogColor);
            window.threeJSRenderer.setClearColor(bgColor, 1);

            // FIX: Adjust Bloom Strength to prevent "Foggy" look in Light Mode
            if (window.threeJSBloomPass) {
                window.threeJSBloomPass.strength = theme === 'light' ? 0.3 : 1.2;
            }

            // FIX: Reset Star Colors based on theme
            if (window.threeJSStarGeometry) {
                const colors = window.threeJSStarGeometry.attributes.color.array;
                for (let i = 0; i < colors.length; i += 3) {
                    if (theme === 'light') {
                        // Darker blue/grey for light mode visibility
                        colors[i] = 0.2;
                        colors[i + 1] = 0.4;
                        colors[i + 2] = 0.8;
                    } else {
                        // Restore brighter colors for dark mode
                        colors[i] = 0.8;
                        colors[i + 1] = 0.9;
                        colors[i + 2] = 1.0;
                    }
                }
                window.threeJSStarGeometry.attributes.color.needsUpdate = true;
            }

            // FIX: Reset Shard Colors based on theme
            if (window.threeJSShardMaterial) {
                const shardColor = theme === 'light' ? 0x0055cc : 0x00f0ff; // Darker blue vs Neon Cyan
                window.threeJSShardMaterial.color.setHex(shardColor);
            }
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
    const showMoreBtn = document.getElementById('show-more-projects');
    const INITIAL_COUNT = 3;

    function renderProjects(count) {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';

        projects.slice(0, count).forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card p-6 cursor-pointer group flex flex-col h-full opacity-0 translate-y-4 animate-fade-in-up';
            card.style.animationFillMode = 'forwards';
            card.style.animation = `fadeInUp 0.5s ease forwards`;

            card.setAttribute('data-id', project.id);
            card.addEventListener('mouseenter', playHoverSound);
            card.addEventListener('click', () => {
                playClickSound();
                openModal(project);
            });

            // Card HTML structure
            // Note: Colors here are handled by main.css variables (text-primary, etc)
            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="font-mono text-[10px] md:text-xs text-cerenkov border border-cerenkov px-2 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity">${project.type}</span>
                    <span class="text-gray-600 text-[10px] md:text-xs font-mono">ID: ${project.id}</span>
                </div>
                <h3 class="text-lg md:text-xl font-bold mb-2 group-hover:text-cerenkov transition-colors" style="color: var(--text-primary)">${project.title}</h3>
                <p class="text-sm mb-4 line-clamp-2 flex-grow" style="color: var(--text-secondary)">${project.shortDesc}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.stack.slice(0, 3).map(tech => `<span class="text-[10px] md:text-xs text-gray-500 bg-gray-500/10 px-2 py-1 rounded border border-gray-500/20">${tech}</span>`).join('')}
                </div>
                <div class="border-t border-gray-500/20 pt-4 flex justify-between items-center mt-auto">
                    <span class="text-[10px] md:text-xs font-mono text-gray-500 group-hover:text-cerenkov">CLICK_TO_DECRYPT</span>
                    <svg class="w-4 h-4 text-gray-600 group-hover:text-cerenkov transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }

    renderProjects(INITIAL_COUNT);

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            playClickSound();
            renderProjects(projects.length);
            showMoreBtn.style.display = 'none';
        });
    }

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalLink = document.getElementById('modal-link');

    function openModal(project) {
        if (!modal) return;

        // Build Media Section
        let mediaHTML = '';

        if (project.media) {
            switch (project.media.type) {
                case 'youtube':
                    mediaHTML = `
                    <div class="aspect-video w-full mb-8 rounded overflow-hidden border border-cerenkov/30">
                        <iframe 
                            class="w-full h-full" 
                            src="https://www.youtube.com/embed/${project.media.content}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
                    break;

                case 'video':
                    mediaHTML = `
                    <div class="aspect-video w-full mb-8 rounded overflow-hidden border border-cerenkov/30">
                        <video class="w-full h-full" controls>
                            <source src="${project.media.content}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                `;
                    break;

                case 'figma':
                    mediaHTML = `
                    <div class="aspect-video w-full mb-8 rounded overflow-hidden border border-cerenkov/30">
                        <iframe 
                            class="w-full h-full" 
                            src="${project.media.content}" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
                    break;

                case 'images':
                    mediaHTML = `
                    <div class="w-full mb-8 space-y-4">
                        ${project.media.content.map(img => `
                            <div class="rounded overflow-hidden border border-cerenkov/30">
                                <img src="${img}" alt="${project.title} screenshot" class="w-full h-auto">
                            </div>
                        `).join('')}
                    </div>
                `;
                    break;
            }
        }

        // Build Details Content
        const detailsHTML = `
        <div class="modal-content-wrapper">
            ${mediaHTML}
            
            <section class="mb-8 pb-8 border-b border-gray-500/20">
                <h3 class="text-cerenkov font-mono text-sm mb-3 tracking-wider">>> INTRODUCTION</h3>
                <p style="color: var(--text-secondary)" class="leading-relaxed">${project.introduction}</p>
            </section>
            
            ${project.details.overview ? `
                <section class="mb-8 pb-8 border-b border-gray-500/20">
                    <h3 class="text-cerenkov font-mono text-sm mb-3 tracking-wider">>> OVERVIEW</h3>
                    <p style="color: var(--text-secondary)" class="leading-relaxed">${project.details.overview}</p>
                </section>
            ` : ''}
            
            ${project.details.features ? `
                <section class="mb-8 pb-8 border-b border-gray-500/20">
                    <h3 class="text-cerenkov font-mono text-sm mb-3 tracking-wider">>> KEY FEATURES</h3>
                    <ul class="space-y-3">
                        ${project.details.features.map(feature => `
                            <li class="flex items-start gap-3">
                                <span class="text-cerenkov mt-1 text-xs">▹</span>
                                <span style="color: var(--text-tertiary)" class="text-sm leading-relaxed">${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
            
            ${project.details.responsibilities ? `
                <section class="mb-8 pb-8 border-b border-gray-500/20">
                    <h3 class="text-cerenkov font-mono text-sm mb-3 tracking-wider">>> MY RESPONSIBILITIES</h3>
                    <ul class="space-y-3">
                        ${project.details.responsibilities.map(resp => `
                            <li class="flex items-start gap-3">
                                <span class="text-dissociation mt-1 text-xs">●</span>
                                <span style="color: var(--text-tertiary)" class="text-sm leading-relaxed">${resp}</span>
                            </li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
            
            ${project.details.challenges ? `
                <section class="mb-8 pb-8 border-b border-gray-500/20">
                    <h3 class="text-cerenkov font-mono text-sm mb-3 tracking-wider">>> CHALLENGES & SOLUTIONS</h3>
                    <ul class="space-y-3">
                        ${project.details.challenges.map(challenge => `
                            <li class="flex items-start gap-3">
                                <span class="text-alert mt-1 text-xs">⚠</span>
                                <span style="color: var(--text-tertiary)" class="text-sm leading-relaxed">${challenge}</span>
                            </li>
                        `).join('')}
                    </ul>
                </section>
            ` : ''}
            
            ${project.showcase && project.showcase.length > 0 ? `
                <section class="mb-4">
                    <h3 class="text-cerenkov font-mono text-sm mb-4 tracking-wider">>> PROJECT LINKS</h3>
                    <div class="flex flex-wrap gap-3">
                        ${project.showcase.map(item => {
            const labels = {
                'demo': 'LIVE DEMO',
                'github': 'SOURCE CODE',
                'live': 'VIEW LIVE',
                'figma': 'FIGMA DESIGN',
                'info': 'INFORMATION'
            };
            return `
                                <a href="${item.url}" target="_blank" 
                                   class="btn-glitch px-4 py-2 font-mono text-xs text-cerenkov uppercase tracking-widest hover:text-black hover:bg-cerenkov transition-all inline-block"
                                   onclick="playClickSound()">
                                    ${labels[item.type] || item.type.toUpperCase()}
                                </a>
                            `;
        }).join('')}
                    </div>
                </section>
            ` : ''}
        </div>
    `;
        
        modalBody.className = 'modal-content-wrapper';
        modalBody.innerHTML = detailsHTML;

        if (modalLink) {
            modalLink.style.display = 'none';
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });


    // ==========================================
    // THREE.JS SCENE (Optimized + RGB Shift)
    // ==========================================
    const container = document.getElementById('canvas-container');
    if (container) {
        const scene = new THREE.Scene();
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const bgColor = currentTheme === 'light' ? 0xe8f4ff : 0x000308;
        const fogColor = currentTheme === 'light' ? 0xe8f4ff : 0x000308;

        scene.fog = new THREE.FogExp2(fogColor, 0.003);
        scene.background = new THREE.Color(bgColor);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Optimize: Limit pixel ratio to 2 for High-DPI screens to save battery
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.setClearColor(bgColor, 1);
        container.appendChild(renderer.domElement);

        window.threeJSScene = scene;
        window.threeJSRenderer = renderer;

        // --- POST PROCESSING SETUP ---
        const renderScene = new THREE.RenderPass(scene, camera);

        // 1. Bloom Pass
        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 0.85
        );
        bloomPass.threshold = 0;
        // Initial strength set based on theme
        bloomPass.strength = currentTheme === 'light' ? 0.3 : 1.2;
        bloomPass.radius = 0.5;

        // FIX: EXPOSE BLOOM PASS GLOBALLY SO WE CAN UPDATE IT LATER
        window.threeJSBloomPass = bloomPass;

        // 2. RGB Shift Pass (Chromatic Aberration)
        const rgbShiftPass = new THREE.ShaderPass(THREE.RGBShiftShader);
        rgbShiftPass.uniforms['amount'].value = 0.0015; // Base glitch

        const renderTarget = new THREE.WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat
            }
        );
        const composer = new THREE.EffectComposer(renderer, renderTarget);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(rgbShiftPass);

        const isMobile = window.innerWidth < 768;

        function createCircleTexture() {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;

            const ctx = canvas.getContext('2d');
            const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
            gradient.addColorStop(0.4, 'rgba(255,255,255,0.3)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 32, 32);

            const texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;
            return texture;
        }

        // --- STARFIELD ---
        const starCount = isMobile ? 1000 : 2000;
        const starGeometry = new THREE.BufferGeometry();
        // FIX: EXPOSE GEOMETRY GLOBALLY
        window.threeJSStarGeometry = starGeometry;

        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        const starVelocities = [];

        const starColorPalette = [
            { r: 0.0, g: 0.6, b: 1.0 },
            { r: 0.0, g: 0.9, b: 1.0 },
            { r: 1.0, g: 1.0, b: 1.0 },
            { r: 0.6, g: 0.7, b: 1.0 },
            { r: 0.8, g: 0.6, b: 1.0 }
        ];

        for (let i = 0; i < starCount; i++) {
            starPositions[i * 3] = (Math.random() - 0.5) * 200;
            starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
            starPositions[i * 3 + 2] = (Math.random() - 0.5) * 150;

            const colorIndex = Math.floor(Math.random() * starColorPalette.length);
            const color = starColorPalette[colorIndex];

            // Initial color set based on current theme
            if (currentTheme === 'light') {
                starColors[i * 3] = 0.2;
                starColors[i * 3 + 1] = 0.4;
                starColors[i * 3 + 2] = 0.8;
            } else {
                starColors[i * 3] = color.r;
                starColors[i * 3 + 1] = color.g;
                starColors[i * 3 + 2] = color.b;
            }

            starSizes[i] = Math.random() * 1.2 + 0.3;

            starVelocities.push(Math.random() * 0.15 + 0.05);
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
        starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

        const starMaterial = new THREE.PointsMaterial({
            vertexColors: true,
            size: 0.5,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            map: createCircleTexture(),
            depthWrite: false
        });
        window.threeJSStarMaterial = starMaterial;

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // --- SHARDS ---
        const shardCount = isMobile ? 60 : 120;

        const geometry = new THREE.IcosahedronGeometry(0.5, 0);
        const material = new THREE.MeshBasicMaterial({
            color: currentTheme === 'light' ? 0x0055cc : 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const shards = new THREE.InstancedMesh(geometry, material, shardCount);
        const dummy = new THREE.Object3D();
        const positions = [];
        const velocities = [];

        for (let i = 0; i < shardCount; i++) {
            dummy.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 50
            );
            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            dummy.scale.setScalar(Math.random() * 2 + 0.5);
            dummy.updateMatrix();
            shards.setMatrixAt(i, dummy.matrix);

            positions.push(dummy.position.clone());
            velocities.push(new THREE.Vector3(
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.02
            ));
        }

        window.threeJSShardMaterial = material;
        scene.add(shards);

        // --- LINES ---
        const maxLines = isMobile ? 200 : 400;
        const lineGeo = new THREE.BufferGeometry();
        const linePos = new Float32Array(maxLines * 2 * 3);
        const lineColors = new Float32Array(maxLines * 2 * 3);

        lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
        lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const lineMat = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending
        });

        const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(linesMesh);

        // --- ANIMATION STATE ---
        let mouseX = 0, mouseY = 0, scrollY = 0, targetScrollY = 0;
        let lastMouseX = 0, lastMouseY = 0;
        let mouseVelocity = 0;

        // Throttled Event Listeners
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            // Normalize velocity for RGB shift
            mouseVelocity = Math.min(Math.sqrt(dx * dx + dy * dy) / 50, 1.0);

            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
        });
        document.addEventListener('scroll', () => { targetScrollY = lenis.scroll; });

        const animate = (time) => {
            requestAnimationFrame(animate);
            lenis.raf(time);
            scrollY = lenis.scroll;
            targetScrollY = lenis.scroll;

            const starPositions = stars.geometry.attributes.position.array;
            const scrollSpeed = Math.abs(targetScrollY - scrollY) * 0.001;

            const cameraVelocity = Math.abs(mouseX) + Math.abs(mouseY);

            for (let i = 0; i < starCount; i++) {
                starPositions[i * 3 + 2] += starVelocities[i] * (0.5 + scrollSpeed * 8);

                starPositions[i * 3] += mouseX * starVelocities[i] * 0.3;
                starPositions[i * 3 + 1] += mouseY * starVelocities[i] * 0.3;

                if (starPositions[i * 3 + 2] > 75) {
                    starPositions[i * 3 + 2] = -75;
                    starPositions[i * 3] = (Math.random() - 0.5) * 300;
                    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
                }

                if (Math.abs(starPositions[i * 3]) > 150) {
                    starPositions[i * 3] = (Math.random() - 0.5) * 300;
                }
                if (Math.abs(starPositions[i * 3 + 1]) > 150) {
                    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
                }
            }

            starMaterial.opacity = Math.max(0.4, 0.9 - scrollSpeed * 8 - cameraVelocity * 0.2);

            stars.geometry.attributes.position.needsUpdate = true;

            camera.position.y = -scrollY * 0.02;
            camera.rotation.z = scrollY * 0.0005;
            camera.rotation.x = mouseY * 0.05;
            camera.rotation.y = mouseX * 0.05;

            // Decay RGB Shift
            mouseVelocity *= 0.95;
            rgbShiftPass.uniforms['amount'].value = 0.0015 + (mouseVelocity * 0.005);

            const connectionDistance = 15;
            let vertexIndex = 0;
            let colorIndex = 0;

            for (let i = 0; i < shardCount; i++) {
                const pos = positions[i];
                const vel = velocities[i];
                pos.add(vel);

                if (Math.abs(pos.x) > 50) vel.x *= -1;
                if (Math.abs(pos.y) > 50) vel.y *= -1;
                if (Math.abs(pos.z) > 25) vel.z *= -1;

                // Mouse Gravity
                const mouseVec = new THREE.Vector3(mouseX * 30, mouseY * 30 + camera.position.y, 0);
                if (pos.distanceTo(mouseVec) < 20) {
                    vel.add(mouseVec.sub(pos).normalize().multiplyScalar(0.01)).multiplyScalar(0.95);
                } else {
                    vel.clampLength(0, 0.03);
                }

                dummy.position.copy(pos);
                dummy.rotation.x += 0.002;
                dummy.rotation.y += 0.002;
                dummy.updateMatrix();
                shards.setMatrixAt(i, dummy.matrix);

                // Line Logic (Only check subset for performance if needed)
                for (let j = i + 1; j < shardCount; j++) {
                    const dist = pos.distanceTo(positions[j]);

                    if (dist < connectionDistance && vertexIndex < maxLines * 2 * 3) {
                        linePos[vertexIndex++] = pos.x;
                        linePos[vertexIndex++] = pos.y;
                        linePos[vertexIndex++] = pos.z;
                        linePos[vertexIndex++] = positions[j].x;
                        linePos[vertexIndex++] = positions[j].y;
                        linePos[vertexIndex++] = positions[j].z;

                        // Fade Alpha based on distance
                        const alpha = 1.0 - (dist / connectionDistance);
                        const intensity = alpha * alpha;

                        // Blue Color (R,G,B)
                        lineColors[colorIndex++] = 0; lineColors[colorIndex++] = 0.94 * intensity; lineColors[colorIndex++] = 1.0 * intensity;
                        lineColors[colorIndex++] = 0; lineColors[colorIndex++] = 0.94 * intensity; lineColors[colorIndex++] = 1.0 * intensity;
                    }
                }
            }

            // Clear remaining buffer
            for (let k = vertexIndex; k < maxLines * 2 * 3; k++) {
                linePos[k] = 0;
                lineColors[k] = 0;
            }

            shards.instanceMatrix.needsUpdate = true;
            linesMesh.geometry.attributes.position.needsUpdate = true;
            linesMesh.geometry.attributes.color.needsUpdate = true;
            linesMesh.geometry.setDrawRange(0, vertexIndex / 3);

            composer.render();
        };
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        });
    }

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

    
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElem = document.querySelector(targetId);
        
        if (targetElem) {
            lenis.scrollTo(targetElem, {
                offset: 0, 
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
            
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            }
        }
    });
});