window.addEventListener('load', () => {
    if (typeof Tesseract !== 'undefined') new Tesseract();
    if (typeof NavBackground !== 'undefined') new NavBackground();
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav');
    let lastScrollTop = 0;
    const scrollThreshold = 100; // When to trigger the style change

    // Initial check for page load with scroll already happened
    checkScroll();

    // Add scroll event listener
    window.addEventListener('scroll', function () {
        checkScroll();
        updateActiveNavOnScroll();
    });

    function checkScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Change nav style when scrolled past threshold
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
            nav.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            nav.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    }

    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 150; // Add offset to account for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav a').forEach(link => {

                    if (link.getAttribute('href') === `#${sectionId}` ||
                        (link.getAttribute('href') === './index.html' && sectionId === 'container')) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Get the target href
            const targetHref = this.getAttribute('href');

            // Handle regular page links
            if (targetHref.startsWith('./') && !targetHref.includes('#')) {
                // Let the browser handle regular page navigation
                return;
            }

            e.preventDefault(); // Prevent default for hash links

            let targetId;

            // Extract the ID from the href
            if (targetHref.includes('#')) {
                targetId = targetHref.split('#')[1];
            } else if (targetHref === './index.html') {
                targetId = 'container'; // Default section for home page
            } else {
                targetId = targetHref.replace('#', '');
            }

            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Scroll to the element
                    targetElement.scrollIntoView({ behavior: 'smooth' });

                    // Update active state
                    document.querySelectorAll('.nav a').forEach(a => {
                        a.classList.remove('active');
                    });
                    this.classList.add('active');
                } else if (targetHref.startsWith('./')) {
                    window.location.href = targetHref;
                }
            }
        });
    });
});