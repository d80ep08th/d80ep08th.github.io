/**
 * Portfolio Animations using Anime.js
 * Smooth, modern micro-animations for GenZ aesthetic
 */

// ============================================
// Utility Functions
// ============================================

const observeElements = (selector, callback) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
};

// ============================================
// Page Load Animations
// ============================================

const initPageLoadAnimations = () => {
    // Fade in navigation
    anime({
        targets: '.nav',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
        easing: 'easeOutCubic'
    });

    // Hero section animations
    if (document.querySelector('.hero')) {
        // Animate hero title with letter reveal
        anime({
            targets: '.hero-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            delay: 300,
            easing: 'easeOutCubic'
        });

        // Animate subtitle
        anime({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: 500,
            easing: 'easeOutCubic'
        });

        // Animate description
        anime({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            delay: 700,
            easing: 'easeOutCubic'
        });

        // Animate CTA buttons
        anime({
            targets: '.hero-cta .btn',
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            duration: 600,
            delay: anime.stagger(100, {start: 900}),
            easing: 'easeOutCubic'
        });
    }

    // Case study hero animations
    if (document.querySelector('.case-study-hero')) {
        anime({
            targets: '.case-study-hero img',
            opacity: [0, 1],
            scale: [1.1, 1],
            duration: 1200,
            easing: 'easeOutCubic'
        });
    }

    // About page hero animations
    if (document.querySelector('.about-hero')) {
        anime({
            targets: '.placeholder-avatar',
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [180, 0],
            duration: 1000,
            delay: 300,
            easing: 'easeOutElastic(1, .6)'
        });

        anime({
            targets: '.about-hero-text h1',
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 800,
            delay: 500,
            easing: 'easeOutCubic'
        });

        anime({
            targets: '.lead-text',
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 800,
            delay: 700,
            easing: 'easeOutCubic'
        });
    }
};

// ============================================
// Floating Background Elements
// ============================================

const createFloatingElements = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create floating circles
    const colors = ['#4a90e2', '#e8f4fd', '#f0f0f0'];
    const sizes = [40, 60, 80, 100];

    for (let i = 0; i < 6; i++) {
        const circle = document.createElement('div');
        circle.className = 'floating-element';
        circle.style.cssText = `
            position: absolute;
            width: ${sizes[Math.floor(Math.random() * sizes.length)]}px;
            height: ${sizes[Math.floor(Math.random() * sizes.length)]}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            opacity: 0.15;
            pointer-events: none;
            z-index: 0;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
        `;
        hero.appendChild(circle);

        // Animate floating
        anime({
            targets: circle,
            translateX: [0, Math.random() * 100 - 50],
            translateY: [0, Math.random() * 100 - 50],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            duration: 8000 + Math.random() * 4000,
            easing: 'easeInOutSine',
            loop: true,
            direction: 'alternate'
        });
    }

    // Ensure hero content is above floating elements
    const heroContent = hero.querySelector('.container');
    if (heroContent) {
        heroContent.style.position = 'relative';
        heroContent.style.zIndex = '1';
    }
};

// ============================================
// Project Card Animations
// ============================================

const initProjectCardAnimations = () => {
    // Scroll-triggered entrance
    observeElements('.project-card', (card) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            duration: 800,
            easing: 'easeOutCubic'
        });
    });

    // Enhanced hover effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });

            anime({
                targets: this.querySelector('.project-image img'),
                scale: 1.1,
                duration: 600,
                easing: 'easeOutCubic'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });

            anime({
                targets: this.querySelector('.project-image img'),
                scale: 1,
                duration: 600,
                easing: 'easeOutCubic'
            });
        });
    });
};

// ============================================
// Section Animations (Scroll-triggered)
// ============================================

const initSectionAnimations = () => {
    // Animate section titles
    observeElements('.section-title', (title) => {
        anime({
            targets: title,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
    });

    // Animate about preview
    observeElements('.about-preview', (section) => {
        anime({
            targets: section.querySelectorAll('.about-text'),
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: anime.stagger(100),
            easing: 'easeOutCubic'
        });
    });

    // Animate contact section
    observeElements('.contact', (section) => {
        anime({
            targets: section.querySelector('.contact-text'),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });

        anime({
            targets: section.querySelectorAll('.btn'),
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.9, 1],
            duration: 600,
            delay: anime.stagger(100, {start: 300}),
            easing: 'easeOutCubic'
        });
    });
};

// ============================================
// Case Study Animations
// ============================================

const initCaseStudyAnimations = () => {
    // Animate case study header
    observeElements('.case-study-header', (header) => {
        anime({
            targets: header.querySelector('h1'),
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            easing: 'easeOutCubic'
        });

        anime({
            targets: header.querySelector('.case-study-subtitle'),
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 200,
            easing: 'easeOutCubic'
        });

        anime({
            targets: header.querySelectorAll('.meta-item'),
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: anime.stagger(80, {start: 400}),
            easing: 'easeOutCubic'
        });
    });

    // Animate insight cards
    observeElements('.insight-card', (card) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateX: [-40, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
    });

    // Animate stats
    observeElements('.stat-box', (stat) => {
        anime({
            targets: stat,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 600,
            easing: 'easeOutCubic'
        });

        // Animate the number counting up
        const numberEl = stat.querySelector('.stat-number');
        if (numberEl) {
            const text = numberEl.textContent;
            const number = parseInt(text);

            if (!isNaN(number)) {
                anime({
                    targets: {value: 0},
                    value: number,
                    duration: 1500,
                    delay: 300,
                    easing: 'easeOutCubic',
                    update: function(anim) {
                        numberEl.textContent = Math.round(anim.animations[0].currentValue) + text.replace(/\d+/g, '');
                    }
                });
            }
        }
    });

    // Animate features
    observeElements('.feature', (feature) => {
        anime({
            targets: feature,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
    });
};

// ============================================
// About Page Animations
// ============================================

const initAboutPageAnimations = () => {
    // Timeline animations
    observeElements('.timeline-item', (item) => {
        anime({
            targets: item,
            opacity: [0, 1],
            translateX: [-40, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });

        // Pulse the marker
        anime({
            targets: item.querySelector('.timeline-marker'),
            scale: [0, 1],
            duration: 600,
            delay: 200,
            easing: 'easeOutElastic(1, .6)'
        });
    });

    // Strength cards
    observeElements('.strength-card', (card) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            duration: 800,
            easing: 'easeOutCubic'
        });

        // Bounce the icon
        anime({
            targets: card.querySelector('.strength-icon'),
            scale: [0, 1],
            rotate: [180, 0],
            duration: 800,
            delay: 200,
            easing: 'easeOutElastic(1, .5)'
        });
    });

    // Skill categories
    observeElements('.skill-category', (category) => {
        anime({
            targets: category,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            easing: 'easeOutCubic'
        });
    });
};

// ============================================
// Button Hover Animations
// ============================================

const initButtonAnimations = () => {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        btn.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
};

// ============================================
// Smooth Scroll
// ============================================

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                anime({
                    targets: 'html, body',
                    scrollTop: target.offsetTop - 80,
                    duration: 1000,
                    easing: 'easeInOutCubic'
                });
            }
        });
    });
};

// ============================================
// Cursor Follow Effect (Optional - Comment out if too much)
// ============================================

const initCursorEffect = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #4a90e2;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '0.5';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Smooth cursor follow
    const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Scale on hover over interactive elements
    document.querySelectorAll('a, button, .btn, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            anime({
                targets: cursor,
                scale: 1.5,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });

        el.addEventListener('mouseleave', () => {
            anime({
                targets: cursor,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
};

// ============================================
// Navigation Scroll Effect
// ============================================

const initNavScrollEffect = () => {
    let lastScroll = 0;
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
};

// ============================================
// Initialize All Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Core animations
    initPageLoadAnimations();
    initSectionAnimations();
    initProjectCardAnimations();
    initButtonAnimations();
    initSmoothScroll();
    initNavScrollEffect();

    // Page-specific animations
    if (document.querySelector('.case-study')) {
        initCaseStudyAnimations();
    }

    if (document.querySelector('.about-content')) {
        initAboutPageAnimations();
    }

    // Cool effects (comment out if too much)
    createFloatingElements();
    // initCursorEffect(); // Uncomment for custom cursor
});

// ============================================
// Page Transition Effect
// ============================================

// Create transition overlay
const createTransitionOverlay = () => {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4a90e2 0%, #1a1a1a 100%);
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
    `;
    document.body.appendChild(overlay);
    return overlay;
};

// Animate page transitions on link clicks
document.addEventListener('DOMContentLoaded', () => {
    const overlay = createTransitionOverlay();

    // Fade out on load
    anime({
        targets: overlay,
        opacity: [1, 0],
        duration: 600,
        easing: 'easeOutCubic'
    });

    // Intercept internal links for smooth transitions
    document.querySelectorAll('a[href^="/"], a[href$=".html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                e.preventDefault();

                anime({
                    targets: overlay,
                    opacity: [0, 1],
                    duration: 400,
                    easing: 'easeInCubic',
                    complete: () => {
                        window.location.href = href;
                    }
                });
            }
        });
    });
});

// Export for use in other scripts if needed
window.portfolioAnimations = {
    initPageLoadAnimations,
    createFloatingElements,
    initProjectCardAnimations,
    initSectionAnimations
};
