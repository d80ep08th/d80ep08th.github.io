// ===================================
// Anime.js Micro Animations
// Modern, Gen Z-style animations
// ===================================

document.addEventListener('DOMContentLoaded', function() {

    // ===================================
    // 1. HERO ENTRANCE ANIMATIONS
    // ===================================
    if (document.querySelector('.hero')) {
        // Animate hero title with slide up effect
        anime({
            targets: '.hero-title',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutExpo',
            delay: 200
        });

        // Animate hero subtitle with stagger
        anime({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 400
        });

        // Animate hero description
        anime({
            targets: '.hero-description',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 600
        });

        // Animate CTA buttons with bounce
        anime({
            targets: '.hero-cta .btn',
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)',
            delay: anime.stagger(150, {start: 800})
        });
    }

    // ===================================
    // 2. NAVIGATION ANIMATIONS
    // ===================================
    // Animate navigation on load
    anime({
        targets: '.nav',
        translateY: [-100, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
    });

    // Animate nav menu items with stagger
    anime({
        targets: '.nav-menu li',
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo',
        delay: anime.stagger(100, {start: 300})
    });

    // ===================================
    // 3. SCROLL-TRIGGERED ANIMATIONS
    // ===================================

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Trigger different animations based on element type
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                } else if (entry.target.classList.contains('section-title')) {
                    animateSectionTitle(entry.target);
                } else if (entry.target.classList.contains('about-section')) {
                    animateSection(entry.target);
                } else if (entry.target.classList.contains('strength-card')) {
                    animateStrengthCard(entry.target);
                } else if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.project-card, .section-title, .about-section, .strength-card, .timeline-item, .skill-category'
    );

    animatableElements.forEach(el => observer.observe(el));

    // ===================================
    // 4. PROJECT CARD ANIMATIONS
    // ===================================
    function animateProjectCard(card) {
        anime({
            targets: card,
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    // ===================================
    // 5. SECTION TITLE ANIMATIONS
    // ===================================
    function animateSectionTitle(title) {
        anime({
            targets: title,
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo'
        });
    }

    // ===================================
    // 6. SECTION ANIMATIONS
    // ===================================
    function animateSection(section) {
        anime({
            targets: section,
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    // ===================================
    // 7. STRENGTH CARD ANIMATIONS
    // ===================================
    function animateStrengthCard(card) {
        const cards = document.querySelectorAll('.strength-card');
        const index = Array.from(cards).indexOf(card);

        anime({
            targets: card,
            translateY: [50, 0],
            opacity: [0, 1],
            scale: [0.95, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: index * 100
        });
    }

    // ===================================
    // 8. TIMELINE ANIMATIONS
    // ===================================
    function animateTimelineItem(item) {
        const items = document.querySelectorAll('.timeline-item');
        const index = Array.from(items).indexOf(item);

        anime({
            targets: item,
            translateX: [-40, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: index * 150
        });
    }

    // ===================================
    // 9. BUTTON HOVER MICRO-INTERACTIONS
    // ===================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // ===================================
    // 10. PROJECT CARD HOVER EFFECTS
    // ===================================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this.querySelector('.project-image img'),
                scale: 1.1,
                duration: 600,
                easing: 'easeOutQuad'
            });

            anime({
                targets: this.querySelector('.project-link'),
                translateX: [0, 5],
                duration: 400,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this.querySelector('.project-image img'),
                scale: 1,
                duration: 600,
                easing: 'easeOutQuad'
            });

            anime({
                targets: this.querySelector('.project-link'),
                translateX: [5, 0],
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });

    // ===================================
    // 11. NAV LINK HOVER ANIMATIONS
    // ===================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -2,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        link.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // ===================================
    // 12. ABOUT HERO ANIMATIONS
    // ===================================
    if (document.querySelector('.about-hero')) {
        anime({
            targets: '.about-hero-image',
            scale: [0.8, 1],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutExpo',
            delay: 200
        });

        anime({
            targets: '.about-hero-text h1',
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 400
        });

        anime({
            targets: '.about-hero-text .lead-text',
            translateX: [-50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 600
        });
    }

    // ===================================
    // 13. SMOOTH SCROLL ENHANCEMENT
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();

                    const targetPosition = target.offsetTop - 80;

                    anime({
                        targets: 'html, body',
                        scrollTop: targetPosition,
                        duration: 1200,
                        easing: 'easeInOutQuart'
                    });
                }
            }
        });
    });

    // ===================================
    // 14. FOOTER ANIMATIONS
    // ===================================
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.footer-text',
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo'
                });

                anime({
                    targets: '.footer-subtext',
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutExpo',
                    delay: 200
                });
            }
        });
    }, observerOptions);

    const footer = document.querySelector('.footer');
    if (footer) footerObserver.observe(footer);

    // ===================================
    // 15. CONTACT SECTION ANIMATIONS
    // ===================================
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.contact .section-title',
                        translateY: [40, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });

                    anime({
                        targets: '.contact-text',
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: 200
                    });

                    anime({
                        targets: '.contact-links .btn',
                        translateY: [40, 0],
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        duration: 800,
                        easing: 'easeOutElastic(1, .6)',
                        delay: anime.stagger(100, {start: 400})
                    });
                }
            });
        }, observerOptions);

        contactObserver.observe(contactSection);
    }

    // ===================================
    // 16. CASE STUDY SPECIFIC ANIMATIONS
    // ===================================
    if (document.querySelector('.case-study-hero')) {
        anime({
            targets: '.case-study-hero h1',
            translateY: [60, 0],
            opacity: [0, 1],
            duration: 1200,
            easing: 'easeOutExpo',
            delay: 200
        });

        anime({
            targets: '.case-study-hero p',
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: anime.stagger(150, {start: 400})
        });
    }

    // Animate back link
    if (document.querySelector('.back-link')) {
        anime({
            targets: '.back-link',
            translateX: [-30, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 300
        });
    }

    // ===================================
    // 17. PARALLAX SCROLL EFFECT
    // ===================================
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Parallax effect for hero section
                const hero = document.querySelector('.hero');
                if (hero) {
                    const heroContent = hero.querySelector('.container');
                    if (heroContent) {
                        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                        heroContent.style.opacity = 1 - (scrolled / 800);
                    }
                }

                ticking = false;
            });

            ticking = true;
        }
    });

    // ===================================
    // 18. LOADING ANIMATION
    // ===================================
    // Fade in body on load
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad'
    });

    // ===================================
    // 19. SKILL CATEGORY ANIMATIONS
    // ===================================
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach((category, index) => {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo',
                        delay: index * 200
                    });

                    // Animate skill groups within category
                    const skillGroups = entry.target.querySelectorAll('.skill-group');
                    anime({
                        targets: skillGroups,
                        translateX: [-30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(100, {start: index * 200 + 300})
                    });
                }
            });
        }, observerOptions);

        skillObserver.observe(category);
    });

    // ===================================
    // 20. QUOTE BOX ANIMATION
    // ===================================
    const quoteBox = document.querySelector('.quote-box');
    if (quoteBox) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        scale: [0.95, 1],
                        opacity: [0, 1],
                        duration: 1200,
                        easing: 'easeOutElastic(1, .6)'
                    });
                }
            });
        }, observerOptions);

        quoteObserver.observe(quoteBox);
    }

    console.log('🎨 Anime.js animations loaded successfully!');
});
