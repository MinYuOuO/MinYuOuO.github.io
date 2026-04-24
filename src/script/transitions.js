/**
 * transitions.js
 * Optimized Symmetrical Shutter with Theme-Aware backgrounds and robust redirection.
 */

(function () {
    // ==========================================
    // 1. IMMEDIATE INJECTION (To prevent content flash)
    // ==========================================
    function injectShutter() {
        if (document.getElementById('page-shutter')) return;

        const shutter = document.createElement('div');
        shutter.id = 'page-shutter';
        // Use var(--bg-primary) to match theme exactly
        shutter.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            z-index: 10000; pointer-events: none; display: flex; flex-direction: column;
            background: transparent;
        `;

        shutter.innerHTML = `
            <div class="shutter-part shutter-top" style="flex: 1; background: color-mix(in srgb, var(--bg-primary), transparent 30%); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); width: 100%; transform: translateY(0%); border-bottom: 1px solid rgba(0, 240, 255, 0.2);"></div>
            <div class="shutter-line" style="height: 2px; background: #00f0ff; width: 100%; position: absolute; top: 50%; left: 0; transform: translateY(-50%) scaleX(1); z-index: 10001; box-shadow: 0 0 15px #00f0ff;"></div>
            <div class="shutter-part shutter-bottom" style="flex: 1; background: color-mix(in srgb, var(--bg-primary), transparent 30%); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); width: 100%; transform: translateY(0%); border-top: 1px solid rgba(0, 240, 255, 0.2);"></div>
        `;

        // Inject immediately to cover content
        if (document.body) {
            document.body.appendChild(shutter);
        } else {
            document.documentElement.appendChild(shutter);
        }
    }

    // ==========================================
    // 2. PAGE ENTRANCE
    // ==========================================
    function pageIn() {
        const shutter = document.getElementById('page-shutter');
        if (!shutter) return;

        const top = shutter.querySelector('.shutter-top');
        const bottom = shutter.querySelector('.shutter-bottom');
        const line = shutter.querySelector('.shutter-line');

        if (typeof gsap === 'undefined') {
            shutter.style.display = 'none';
            return;
        }

        const tl = gsap.timeline({
            delay: 0.05,
            onComplete: () => {
                shutter.style.display = 'none';
            }
        });

        tl.to(top, { translateY: "-100%", duration: 0.4, ease: "power4.inOut" })
            .to(bottom, { translateY: "100%", duration: 0.4, ease: "power4.inOut" }, "<")
            .to(line, { scaleX: 0, duration: 0.3, ease: "power2.in" }, "-=0.3");

        const revealElements = document.querySelectorAll('.page-content-reveal');
        if (revealElements.length > 0) {
            gsap.fromTo(revealElements,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.2 }
            );
        }
    }

    // ==========================================
    // 3. PAGE EXIT (Link Interception)
    // ==========================================
    function pageOut(url) {
        const shutter = document.getElementById('page-shutter');
        const top = shutter.querySelector('.shutter-top');
        const bottom = shutter.querySelector('.shutter-bottom');
        const line = shutter.querySelector('.shutter-line');

        shutter.style.display = 'flex';
        gsap.set(line, { scaleX: 0 });
        gsap.set(top, { translateY: "-100%" });
        gsap.set(bottom, { translateY: "100%" });

        const tl = gsap.timeline({
            onComplete: () => {
                window.location.href = url;
            }
        });

        tl.to(line, { scaleX: 1, duration: 0.2, ease: "expo.out" })
            .to(top, { translateY: "0%", duration: 0.3, ease: "power4.out" }, "-=0.1")
            .to(bottom, { translateY: "0%", duration: 0.3, ease: "power4.out" }, "<");
    }

    // ==========================================
    // 4. BOOTSTRAP
    // ==========================================

    // Inject as early as possible
    injectShutter();

    // Link interception
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link || !link.href || link.target === "_blank" || link.href.includes('javascript:')) return;

        // Ignore meta-clicks
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        const url = new URL(link.href);
        const isInternal = url.hostname === window.location.hostname;

        // Normalize pathnames for comparison (handle trailing slashes and index.html)
        const normalize = p => p.replace(/\/index\.html$/, '/').replace(/\/$/, '');
        const isSamePage = normalize(url.pathname) === normalize(window.location.pathname);
        const isAnchor = !!url.hash;

        if (isInternal) {
            // Only animate if it's NOT a same-page anchor link
            if (!(isSamePage && isAnchor)) {
                e.preventDefault();
                pageOut(link.href);
            }
        }
    });

    // Run Entrance when loaded
    if (document.readyState === 'complete') {
        pageIn();
    } else {
        window.addEventListener('load', pageIn);
    }
})();
