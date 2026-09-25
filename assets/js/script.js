(function () {
    const body = document.body;
    const themeKey = 'portfolio-theme';
    const savedTheme = localStorage.getItem(themeKey);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navMenu = document.querySelector('[data-nav-menu]');
    const siteHeader = document.querySelector('.site-header');

    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    function syncThemeText() {
        const isDark = body.classList.contains('dark');
        toggles.forEach((button) => {
            const label = button.querySelector('[data-theme-label]');
            const text = isDark ? 'Terang' : 'Gelap';
            if (label) {
                label.textContent = text;
            } else {
                button.textContent = `Mode ${text}`;
            }
            button.setAttribute('aria-label', isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
        });
    }

    function closeMobileMenu() {
        if (!navMenu || !navToggle) {
            return;
        }

        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    function syncHeaderState() {
        if (!siteHeader) {
            return;
        }

        siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
    }

    toggles.forEach((button) => {
        button.addEventListener('click', () => {
            body.classList.toggle('dark');
            localStorage.setItem(themeKey, body.classList.contains('dark') ? 'dark' : 'light');
            syncThemeText();
            closeMobileMenu();
        });
    });

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
        link.addEventListener('click', (event) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });

    window.addEventListener('scroll', syncHeaderState, { passive: true });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });

    document.querySelectorAll('[data-confirm]').forEach((link) => {
        link.addEventListener('click', (event) => {
            if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) {
                event.preventDefault();
            }
        });
    });

    const animatedItems = document.querySelectorAll(
        '.section-heading, .page-hero, .capability-grid article, .hero-metrics div, .skill-card, .project-card, .timeline-item, .profile-summary, .bio-card, .form-card, .contact-info-card, .focus-grid article, .stat-card, .admin-panel'
    );

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        animatedItems.forEach((item, index) => {
            item.classList.add('reveal-on-scroll');
            item.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -12% 0px',
            threshold: 0.12,
        });

        animatedItems.forEach((item) => revealObserver.observe(item));
    } else {
        animatedItems.forEach((item) => item.classList.add('is-visible'));
    }

    const typingTarget = document.querySelector('[data-typing]');
    const intro = document.querySelector('[data-intro]');
    const fullTypingText = typingTarget ? typingTarget.textContent.trim().toUpperCase() : '';
    const INTRO_DURATION = 8000;
    const TYPING_INTERVAL = 150;
    let typingStarted = false;

    function prepareTyping() {
        if (!typingTarget) {
            return;
        }

        if (prefersReducedMotion) {
            typingTarget.textContent = fullTypingText;
            typingStarted = true;
            return;
        }

        typingTarget.textContent = '';
        typingTarget.classList.add('is-typing');
    }

    function startTyping() {
        if (!typingTarget || typingStarted) {
            return;
        }

        typingStarted = true;
        let index = 0;
        const timer = window.setInterval(() => {
            index += 1;
            typingTarget.textContent = fullTypingText.slice(0, index);
            if (index >= fullTypingText.length) {
                window.clearInterval(timer);
                typingTarget.classList.remove('is-typing');
            }
        }, TYPING_INTERVAL);
    }

    function runIntro() {
        if (!intro) {
            prepareTyping();
            startTyping();
            return;
        }

        if (prefersReducedMotion) {
            intro.remove();
            prepareTyping();
            return;
        }

        prepareTyping();
        body.classList.add('intro-open');

        const percentTarget = intro.querySelector('[data-intro-percent]');
        const progressFill = intro.querySelector('.intro-track span');
        const startedAt = Date.now();
        let finished = false;
        let pageLoaded = document.readyState === 'complete';

        if (progressFill) {
            progressFill.style.animation = 'none';
        }

        if (!pageLoaded) {
            window.addEventListener('load', () => {
                pageLoaded = true;
            }, { once: true });
        }

        function finishIntro() {
            if (finished) {
                return;
            }

            finished = true;
            if (percentTarget) {
                percentTarget.textContent = '100%';
            }
            if (progressFill) {
                progressFill.style.width = '100%';
            }
            intro.classList.add('is-done');
            body.classList.remove('intro-open');
            startTyping();
            window.setTimeout(() => {
                if (intro.parentNode) {
                    intro.parentNode.removeChild(intro);
                }
            }, 600);
        }

        function tick() {
            if (finished) {
                return;
            }

            const elapsed = Date.now() - startedAt;
            const progress = Math.min(1, elapsed / INTRO_DURATION);
            const display = progress >= 1 && !pageLoaded ? 0.99 : progress;

            if (percentTarget) {
                percentTarget.textContent = `${Math.round(display * 100)}%`;
            }
            if (progressFill) {
                progressFill.style.width = `${display * 100}%`;
            }

            if (progress >= 1 && pageLoaded) {
                finishIntro();
                return;
            }

            window.requestAnimationFrame(tick);
        }

        window.requestAnimationFrame(tick);
        window.setTimeout(finishIntro, 10000);
    }

    runIntro();

    syncThemeText();
    syncHeaderState();
})();
