// ==========================================
// 0. PROCEDURAL SOUND ENGINE (Global)
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

    // ==========================================
    // 1. MOBILE MENU
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
    // 2. PROJECT ARCHIVES (Show More Logic)
    // ==========================================
    const projects = [
        {
            id: 'remind',
            title: 'ReMind',
            type: 'Mobile App',
            stack: ['Ionic', 'Angular', 'SQLite', 'Capacitor'],
            shortDesc: 'Privacy-first, offline-enabled relationship manager focused on data sovereignty.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>
                <p class="mb-4">ReMind is a privacy-first, offline-enabled relationship manager designed to help users record, organize, and sustain meaningful friendships without cloud dependency. Built with Ionic + Angular + Capacitor.</p>
                <h4 class="text-white font-bold mb-2">Key Architecture:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Local-First:</strong> Built with SQLite. Data never leaves the device.</li>
                    <li><strong>Data Sovereignty:</strong> Unlike cloud-based CRMs, user owns 100% of the data.</li>
                    <li><strong>Offline Capability:</strong> Full CRUD functionality without internet access.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/ReMind'
        },
        {
            id: 'jiuxi',
            title: 'JiuXi Mindscape',
            type: 'AI Service',
            stack: ['HTML/JS', 'iFLYTEK', 'WebSpeech', 'LLM'],
            shortDesc: 'Voice-enabled AI narrator/concierge for cultural tourism.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>
                <p class="mb-4">An AI narrator/concierge interface designed for rural cultural tourism. It prioritizes a seamless text and voice chat experience with an animated avatar.</p>
                <h4 class="text-white font-bold mb-2">Core Features:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Voice UX:</strong> Integrated ASR (Speech-to-Text) & TTS via iFLYTEK/WebSpeech.</li>
                    <li><strong>RAG Logic:</strong> Retrieval-Augmented Generation using local JSON knowledge bases.</li>
                    <li><strong>Provider Resilience:</strong> Fallback mechanisms for offline voice support.</li>
                </ul>
            `,
            link: '#'
        },
        {
            id: 'hangman',
            title: 'Hangman Game',
            type: 'Game Dev',
            stack: ['C++', 'SFML', 'CMake'],
            shortDesc: 'Console-based Hangman game with multimedia integration.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>
                <p class="mb-4">An Object-Oriented Programming project demonstrating game logic, memory management, and multimedia integration in C++.</p>
                <h4 class="text-white font-bold mb-2">Technical Specs:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Build System:</strong> CMake for cross-platform compilation (Windows/Presets).</li>
                    <li><strong>Audio:</strong> SFML integration for background music playback.</li>
                    <li><strong>Architecture:</strong> Modular design separating Server, Game Logic, and Entry Point.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/Hangman-Game'
        },
        {
            id: 'miu-portfolio',
            title: 'Miu | Architect of Dissociative Recombination',
            type: 'Web Portfolio',
            stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'Three.js', 'WebGL', 'Web Audio API'],
            shortDesc: 'Experimental portfolio SPA exploring Digital Deconstruction through WebGL physics, kinetic typography, and procedural audio.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>

                <p class="mb-4">
                    Miu Portfolio is a high-performance, single-page application that treats the interface as a living computational organism.
                    User input injects energy into the system, triggering controlled visual dissociation and recomposition in real time.
                </p>

                <h4 class="text-white font-bold mb-2">Key Architecture:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>WebGL Core:</strong> Three.js scene with instanced geometry and post-processing for 60 FPS performance.</li>
                    <li><strong>Input-Driven Physics:</strong> Mouse and scroll interactions directly modulate camera, particles, and shaders.</li>
                    <li><strong>Procedural Systems:</strong> Real-time audio synthesis and glitch effects—no pre-rendered assets.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/MinYuOuO.github.io'
        },
        {
            id: 'stellar-echoes',
            title: 'Stellar Echoes',
            type: 'Web / Interactive Memory Archive',
            stack: ['HTML', 'CSS', 'JavaScript', 'Three.js', 'WebGL', 'Web Audio API'],
            shortDesc: 'An immersive 3D memory archive where photographs are preserved as floating data shards inside a cinematic WebGL...',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: MEMORY_RECALL_ACTIVE</h3>

                <p class="mb-4">
                    Stellar Echoes is an experimental WebGL experience that transforms personal memories into navigable, three-dimensional artifacts.
                    Photos are embedded within floating geometric shards, forming a constellation that users can explore through rotation, zoom, and interaction.
                </p>

                <h4 class="text-white font-bold mb-2">Key Architecture:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Boot Sequence Preloader:</strong> Image assets are buffered with a system-style progress log before activation.</li>
                    <li><strong>3D Memory Shards:</strong> Icosahedron-based particles arranged in spherical space using Three.js.</li>
                    <li><strong>Interactive Recall:</strong> Raycasting enables direct selection and modal viewing of memories.</li>
                    <li><strong>Procedural Atmosphere:</strong> Real-time audio cues and bloom post-processing enhance emotional immersion.</li>
                </ul>
            `,
            link: 'stellarEchoes.html'
        },
        {
            id: 'colorella-ticketing',
            title: 'Colorella Ticketing System',
            type: 'Desktop Application',
            stack: ['Python', 'Tkinter', 'Google Sheets API', 'Pandas'],
            shortDesc: 'A lightweight desktop system for syncing registrations, managing ticket tiers, and tracking attendance using Google...',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>

                <p class="mb-4">
                    Colorella Ticketing System is a pragmatic, Python-based desktop tool designed to manage real-world event workflows.
                    It ingests Google Form responses, enforces tier constraints, and provides a responsive UI for payment review and attendance tracking—
                    all while using Google Sheets as a transparent, auditable data source.
                </p>

                <h4 class="text-white font-bold mb-2">Key Architecture:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Google Sheets Backend:</strong> Sheets API used as a shared, live data store.</li>
                    <li><strong>Tiered Ticket Logic:</strong> Early Bird / Mid / Last tiers with caps, waitlists, and position tracking.</li>
                    <li><strong>Deduplication Engine:</strong> Email-based conflict resolution with deterministic tier assignment.</li>
                    <li><strong>Asynchronous UI:</strong> Background threads ensure Tkinter remains fast and non-blocking.</li>
                    <li><strong>Layered OOP Design:</strong> Gateway → repositories → services → UI separation.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/colorella-ticket-system'
        },

        {
            id: 'travel',
            title: 'Travel Calculator',
            type: 'Utility System',
            stack: ['C++', 'Terminal'],
            shortDesc: 'Business trip expense calculator enforcing company policy limits.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>
                <p class="mb-4">A C++ system to calculate allowable expenses for business trips, comparing actual costs against specific company policy limits.</p>
                <h4 class="text-white font-bold mb-2">Policy Logic Gates:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Mileage:</strong> Calculates vehicle allowance at $0.58/km.</li>
                    <li><strong>Lodging:</strong> Checks against $90/night limit.</li>
                    <li><strong>Meal Logic:</strong> Complex time-based rules for breakfast/lunch/dinner eligibility on travel days.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/Travel-Calculator-App'
        },
        {
            id: 'student',
            title: 'Score Manager',
            type: 'CLI Tool',
            stack: ['Python', 'File I/O'],
            shortDesc: 'CRUD system for managing student records and analyzing performance.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>
                <p class="mb-4">A CLI-based management system for teachers to input, manage, and analyze student academic performance in Python.</p>
                <h4 class="text-white font-bold mb-2">Features:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Persistence:</strong> Custom text-based database format (StudentInfo.txt).</li>
                    <li><strong>Data Viz:</strong> Uses 'PrettyTable' library for clean console output.</li>
                    <li><strong>Algorithms:</strong> Sorting functions for subject scores.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/Student-Score-Management'
        },
        {
            id: 'bmi',
            title: 'BMI Calculator',
            type: 'GUI App',
            stack: ['Python', 'Tkinter'],
            shortDesc: 'Graphical interface for real-time body mass index calculation.',
            fullDesc: `
                <h3 class="text-cerenkov font-mono text-lg mb-2">> System Status: DECRYPTED</h3>
                <p class="mb-4">A Software Engineering assignment demonstrating iterative development cycles and UI design patterns.</p>
                <h4 class="text-white font-bold mb-2">Dev Process:</h4>
                <ul class="list-disc list-inside text-gray-400 mb-4 font-mono text-sm">
                    <li><strong>Modularization:</strong> Strict separation of UI and Calculation logic.</li>
                    <li><strong>Validation:</strong> Robust error handling for zero-division/invalid inputs.</li>
                    <li><strong>Workflow:</strong> Managed via Kanban & Git branching.</li>
                </ul>
            `,
            link: 'https://github.com/MinYuOuO/SE-Assignment'
        },
    ];

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

            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <span class="font-mono text-[10px] md:text-xs text-cerenkov border border-cerenkov px-2 py-1 rounded opacity-70 group-hover:opacity-100 transition-opacity">${project.type}</span>
                    <span class="text-gray-600 text-[10px] md:text-xs font-mono">ID: ${project.id}</span>
                </div>
                <h3 class="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cerenkov transition-colors">${project.title}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">${project.shortDesc}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.stack.slice(0, 3).map(tech => `<span class="text-[10px] md:text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">${tech}</span>`).join('')}
                </div>
                <div class="border-t border-white/10 pt-4 flex justify-between items-center mt-auto">
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
        modalBody.innerHTML = project.fullDesc;
        if (modalLink) {
            modalLink.href = project.link;
            modalLink.style.display = (project.link === '#' || !project.link) ? 'none' : 'inline-block';
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
    // 3. THREE.JS SCENE (Optimized + RGB Shift)
    // ==========================================
    const container = document.getElementById('canvas-container');
    if (container) {
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.003);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 40;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        // Optimize: Limit pixel ratio to 2 for High-DPI screens to save battery
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ReinhardToneMapping;
        container.appendChild(renderer.domElement);

        // --- POST PROCESSING SETUP ---
        const renderScene = new THREE.RenderPass(scene, camera);

        // 1. Bloom Pass
        const bloomPass = new THREE.UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            1.5, 0.4, 0.85
        );
        bloomPass.threshold = 0;
        bloomPass.strength = 1.2;
        bloomPass.radius = 0.5;

        // 2. RGB Shift Pass (Chromatic Aberration)
        const rgbShiftPass = new THREE.ShaderPass(THREE.RGBShiftShader);
        rgbShiftPass.uniforms['amount'].value = 0.0015; // Base glitch

        const composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(rgbShiftPass);

        // --- SHARDS ---
        // Optimize: Reduce shard count on mobile
        const isMobile = window.innerWidth < 768;
        const shardCount = isMobile ? 60 : 120;

        const geometry = new THREE.IcosahedronGeometry(0.5, 0);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
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
        scene.add(shards);

        // --- LINES ---
        // Buffer lines optimization
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
        document.addEventListener('scroll', () => { targetScrollY = window.scrollY; });

        const animate = () => {
            requestAnimationFrame(animate);
            scrollY += (targetScrollY - scrollY) * 0.05;
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
});