// ===========================
// Premium Portfolio Enhancements
// ===========================

const enablePremiumMotion = false;

// ===========================
// Navigation & Scroll Handling
// ===========================

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active')
            ? 'rotate(45deg) translateY(8px)'
            : 'none';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active')
            ? 'rotate(-45deg) translateY(-8px)'
            : 'none';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// Enhanced navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
            ticking = false;
        });
        ticking = true;
    }
});

// ===========================
// Active Navigation Link
// ===========================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===========================
// Smooth Scroll with Easing
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Enhanced Intersection Observer
// ===========================

// Advanced section reveal with stagger
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Add stagger effect for child elements
            const children = entry.target.querySelectorAll('.info-item, .cert-badge, .training-item, .community-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

// ===========================
// Premium Skill Bar Animations
// ===========================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                const width = bar.style.width;
                bar.style.width = '0';

                setTimeout(() => {
                    bar.style.width = width;
                }, index * 150);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skills-grid').forEach(grid => {
    skillObserver.observe(grid);
});

// ===========================
// Enhanced Timeline Animation
// ===========================

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ===========================
// Premium Project Card Animations
// ===========================

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(40px) scale(0.95)';

                setTimeout(() => {
                    card.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 120);
            });
            projectObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.projects-grid').forEach(grid => {
    projectObserver.observe(grid);
});

// ===========================
// Premium Card Hover Effects
// ===========================

// Add 3D tilt effect to cards
function addTiltEffect(selector) {
    const cards = document.querySelectorAll(selector);

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.1s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = '';
        });
    });
}

// Apply tilt effect to various cards
if (enablePremiumMotion) {
    addTiltEffect('.project-card');
    addTiltEffect('.skill-category');
    addTiltEffect('.contact-item');
}

// ===========================
// Modern Scroll Progress Indicator
// ===========================

const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 4px;
        background: linear-gradient(90deg, #b88442, #0f2a4a);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 16px rgba(11, 23, 36, 0.35);
    `;
    document.body.appendChild(progressBar);

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.pageYOffset / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
                ticking = false;
            });
            ticking = true;
        }
    });
};

createScrollProgress();

// ===========================
// Modern Back to Top Button
// ===========================

const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Back to top');
    button.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 58px;
        height: 58px;
        background: linear-gradient(135deg, #0f2a4a, #1f3b63);
        color: white;
        border: 1px solid rgba(15, 42, 74, 0.2);
        border-radius: 14px;
        font-size: 1.25rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        box-shadow: 0 8px 24px rgba(11, 23, 36, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-6px) scale(1.08)';
        button.style.boxShadow = '0 12px 32px rgba(11, 23, 36, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
        button.style.boxShadow = '0 8px 24px rgba(11, 23, 36, 0.3)';
    });

    button.addEventListener('click', () => {
        button.style.transform = 'translateY(-6px) scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'translateY(-6px) scale(1.08)';
        }, 150);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    // Show/hide button with smooth transition
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (window.pageYOffset > 400) {
                    button.style.opacity = '1';
                    button.style.visibility = 'visible';
                } else {
                    button.style.opacity = '0';
                    button.style.visibility = 'hidden';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
};

createBackToTopButton();

// ===========================
// Modern Hero Particle Effect
// ===========================

function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: 0.8;
    `;
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;

    const particles = [];
    const particleCount = 60;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.8;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.speedY = Math.random() * 0.8 - 0.4;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.hue = Math.random() * 60 + 220; // Blue-purple range
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Add glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(${this.hue}, 80%, 70%, ${this.opacity * 0.5})`;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let animationId;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections with gradient
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                    gradient.addColorStop(0, `hsla(${a.hue}, 80%, 70%, ${0.1 * (1 - distance / 150)})`);
                    gradient.addColorStop(1, `hsla(${b.hue}, 80%, 70%, ${0.1 * (1 - distance / 150)})`);

                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Resize handler with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }, 250);
    });

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// Initialize particle effect after a short delay
if (enablePremiumMotion) {
    setTimeout(createParticleEffect, 500);
}

// ===========================
// Cursor Trail Effect (Optional Premium Touch)
// ===========================

function createCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['#0f2a4a', '#1f3b63', '#b88442'];

    for (let i = 0; i < 12; i++) {
        const circle = document.createElement('div');
        circle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${colors[i % colors.length]};
            pointer-events: none;
            z-index: 9998;
            opacity: ${1 - i * 0.08};
            transition: transform 0.3s ease;
        `;
        circles.push(circle);
        document.body.appendChild(circle);
    }

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 4 + 'px';
            circle.style.top = y - 4 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            const nextCircle = circles[index + 1] || circles[0];
            x += (parseInt(nextCircle.style.left) || coords.x - 4 - x) * 0.3;
            y += (parseInt(nextCircle.style.top) || coords.y - 4 - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// Uncomment to enable cursor trail effect
// createCursorTrail();

// ===========================
// Enhanced Magnetic Button Effect
// ===========================

function addMagneticEffect(selector) {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach(button => {
        let rafId = null;

        button.addEventListener('mouseenter', () => {
            button.style.transition = 'none';
        });

        button.addEventListener('mousemove', (e) => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const strength = 0.15;
                button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });
        });

        button.addEventListener('mouseleave', () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            button.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            button.style.transform = '';
        });
    });
}

if (enablePremiumMotion) {
    addMagneticEffect('.btn');
    addMagneticEffect('.social-links a');
    addMagneticEffect('.project-icon');
    addMagneticEffect('.contact-icon');
}

// ===========================
// Text Animation on Scroll
// ===========================

function animateTextOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                entry.target.textContent = '';
                entry.target.style.opacity = '1';

                text.split('').forEach((char, index) => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.display = 'inline-block';
                    span.style.animation = `fadeInChar 0.5s ease forwards ${index * 0.03}s`;
                    entry.target.appendChild(span);
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInChar {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Apply to section titles (optional - can be performance intensive)
    // document.querySelectorAll('.section-title').forEach(title => observer.observe(title));
}

// ===========================
// Dynamic Year in Footer
// ===========================

const footerText = document.querySelector('.footer p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = footerText.innerHTML.replace('2026', currentYear);
}

// ===========================
// External Links Handler
// ===========================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.hostname.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    }
});

// ===========================
// Lazy Loading Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Accessibility Enhancements
// ===========================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// Focus visibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===========================
// Performance Monitoring
// ===========================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;

    console.log('%c⚡ Performance Metrics', 'font-size: 14px; font-weight: bold; color: #0f2a4a;');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Server Response: ${connectTime}ms`);
            console.log(`DOM Render: ${renderTime}ms`);
        }, 0);
    });
}

// ===========================
// Console Branding
// ===========================

console.log('%c👋 Welcome to Emanuele\'s Portfolio!', 'font-size: 24px; font-weight: bold; color: #0f2a4a;');
console.log('%c🚀 Built with modern design & focused interactions', 'font-size: 14px; color: #2f3e4d;');
console.log('%c💼 Check out my work on GitHub:', 'font-size: 14px; color: #475569;');
console.log('%chttps://github.com/emanuelecannizzaro', 'font-size: 14px; color: #0f2a4a; font-weight: bold;');
console.log('%c✈️ Aerospace Engineer | Software Developer | Data Analyst', 'font-size: 12px; color: #566575;');

// ===========================
// Easter Egg - Konami Code
// ===========================

let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiPattern.join(',')) {
        console.log('%c🎮 KONAMI CODE ACTIVATED!', 'font-size: 20px; font-weight: bold; color: #b88442;');
        console.log('%c🎊 You found the secret! Thanks for exploring!', 'font-size: 14px; color: #0f2a4a;');

        // Add fun animation
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0%, 100% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ===========================
// Modern Loading Screen
// ===========================

function createLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        inset: 0;
        background: linear-gradient(135deg, #0b1724 0%, #0f2a4a 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.6s ease, visibility 0.6s ease;
    `;

    const spinner = document.createElement('div');
    spinner.style.cssText = `
        width: 60px;
        height: 60px;
        border: 4px solid rgba(15, 42, 74, 0.2);
        border-top-color: #0f2a4a;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    loader.appendChild(spinner);
    document.body.appendChild(loader);

    return loader;
}

// ===========================
// Initialize Everything
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    const loader = createLoadingScreen();

    console.log('%c✅ Portfolio initialized successfully', 'color: #10b981; font-weight: bold;');
    highlightNavigation();

    // Hide loader after content is ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.remove();
            }, 600);
        }, 500);
    });
});

// ===========================
// Ultra-Modern Premium Interactions
// ===========================

// Sophisticated parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let rafId = null;
    window.addEventListener('scroll', () => {
        if (rafId) cancelAnimationFrame(rafId);

        rafId = requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.7;
            }
        });
    });
}

// Enhanced intersection observer with stagger animation
function initEnhancedRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Add stagger effect to child elements
                const children = entry.target.querySelectorAll('.skill-item, .project-tag, .tag');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 50);
                });
            }
        });
    }, observerOptions);

    // Observe all sections and major elements
    document.querySelectorAll('section, .timeline-item, .education-card').forEach(el => {
        observer.observe(el);
    });
}

// Premium cursor trail effect (desktop only)
function initPremiumCursorEffect() {
    if (window.innerWidth < 1024) return; // Skip on mobile/tablet

    const coords = { x: 0, y: 0 };
    const circles = [];
    const colors = ['#0f2a4a', '#1f3b63', '#b88442'];

    for (let i = 0; i < 12; i++) {
        const circle = document.createElement('div');
        circle.style.cssText = `
            position: fixed;
            top: -10px;
            left: -10px;
            width: ${6 - i * 0.3}px;
            height: ${6 - i * 0.3}px;
            border-radius: 50%;
            background: ${colors[i % 3]};
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i * 0.07};
            transition: opacity 0.3s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(circle);
        circles.push(circle);
    }

    let mouseMoving = false;
    let hideTimeout;

    document.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
        mouseMoving = true;

        clearTimeout(hideTimeout);
        circles.forEach(c => c.style.opacity = c.style.opacity.replace('0', ''));

        hideTimeout = setTimeout(() => {
            mouseMoving = false;
            circles.forEach(c => c.style.opacity = '0');
        }, 200);
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - (6 - index * 0.3) / 2 + 'px';
            circle.style.top = y - (6 - index * 0.3) / 2 + 'px';

            const nextCircle = circles[index + 1] || circles[0];
            x += (parseInt(nextCircle.style.left) - x) * 0.3;
            y += (parseInt(nextCircle.style.top) - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}

// Sophisticated image/icon hover effect with tilt
function initAdvancedTiltEffect() {
    const elements = document.querySelectorAll('.project-icon, .contact-icon, .education-icon');

    elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'none';
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 4;
            const rotateY = (centerX - x) / 4;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = '';
        });
    });
}

// Dynamic gradient animation for hero background
function initDynamicGradient() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    let hue = 220;

    setInterval(() => {
        hue = (hue + 0.5) % 360;
        const before = document.querySelector('.hero::before');
        // This will work through CSS animations instead
    }, 50);
}

// Smooth count-up animation for numbers
function animateNumbers() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-value') || target.textContent);
                if (!isNaN(value)) {
                    animateValue(target, 0, value, 2000);
                    observer.unobserve(target);
                }
            }
        });
    });

    document.querySelectorAll('[data-animate-number]').forEach(el => observer.observe(el));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Premium ripple effect on buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .badge, .tag');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;

            const rippleStyle = document.createElement('style');
            if (!document.querySelector('#ripple-style')) {
                rippleStyle.id = 'ripple-style';
                rippleStyle.textContent = `
                    @keyframes ripple-animation {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(rippleStyle);
            }

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Initialize all premium interactions
window.addEventListener('load', () => {
    // Only init parallax on larger screens
    if (window.innerWidth > 768 && enablePremiumMotion) {
        initParallaxEffect();
        initPremiumCursorEffect();
    }

    initEnhancedRevealAnimations();
    if (enablePremiumMotion) {
        initAdvancedTiltEffect();
        initRippleEffect();
    }
    animateNumbers();

    console.log('%c✨ Focused interactions loaded', 'color: #0f2a4a; font-weight: bold; font-size: 12px;');
});

// ===========================
// Service Worker (PWA Support)
// ===========================

if ('serviceWorker' in navigator) {
    // Uncomment to enable PWA
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('✅ Service Worker registered'))
    //         .catch(err => console.log('❌ Service Worker registration failed:', err));
    // });
}
