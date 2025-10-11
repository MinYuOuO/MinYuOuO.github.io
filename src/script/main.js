// Header scroll behavior + active nav + smooth scrolling + filters + before/after
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.nav a');

    const scrollThreshold = 100;

    function checkScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
            nav.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('scrolled');
        }
    }

    // Active nav based on hash/section
    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section.section[id]');
        const y = window.scrollY + 150; // offset for header
        let current = null;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            if (y >= top && y < bottom) current = `#${sec.id}`;
        });

        links.forEach(a => {
            a.classList.remove('active');
            const href = a.getAttribute('href');
            const url = new URL(href, window.location.href);
            if (current && url.hash === current && window.location.pathname.endsWith('index.html')) {
                a.classList.add('active');
            } else if (window.location.pathname.endsWith('project.html') && href.includes('project.html')) {
                a.classList.add('active');
            }
        });
    }

    // Smooth scroll for in-page links
    links.forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            // External or file links: allow default
            if (/^https?:\/\//i.test(href) || href.endsWith('.pdf') || href.includes('project.html')) return;
            const targetHash = href.includes('#') ? href.split('#')[1] : '';
            if (!targetHash) return;
            const el = document.getElementById(targetHash);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
            history.replaceState(null, '', `#${targetHash}`);
        });
    });

    // Project filters (both pages)
    function setupFilters() {
        const buttons = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.project');
        if (!buttons.length || !cards.length) return;

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.filter;
                cards.forEach(card => {
                    const tags = (card.dataset.tags || '').toLowerCase();
                    card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
                });
            });
        });
    }

    // Before/After sliders
    function setupBeforeAfter() {
        document.querySelectorAll('.before-after').forEach(container => {
            const afterImg = container.querySelector('.after');
            const slider = container.querySelector('.ba-slider');
            if (!afterImg || !slider) return;
            const update = val => {
                const pct = Math.min(Math.max(parseInt(val, 10), 0), 100);
                afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
            };
            update(slider.value);
            slider.addEventListener('input', e => update(e.target.value));
        });
    }

    // Initial
    checkScroll();
    updateActiveNavOnScroll();
    setupFilters();
    setupBeforeAfter();

    window.addEventListener('scroll', () => {
        checkScroll();
        updateActiveNavOnScroll();
    }, { passive: true });
});
