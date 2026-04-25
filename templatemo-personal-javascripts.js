/*

TemplateMo 593 personal shape
UPDATED BY CHATGPT (Services + Fix Animation)

*/

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =============================
// SCROLL ANIMATION SYSTEM
// =============================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Portfolio animation
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

// ========== KORIJE SERVICES OBSERVER LA ==========
const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.service-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
        }
    });
}, { threshold: 0.1 });

// INIT
document.addEventListener('DOMContentLoaded', () => {

    // basic animations
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    // portfolio
    const portfolioSection = document.querySelector('.portfolio-grid');
    if (portfolioSection) {
        portfolioObserver.observe(portfolioSection);
    }

    // ========== KORIJE SERVICES LA ==========
    const servicesSection = document.querySelector('#servicesGrid, .services-grid');
    if (servicesSection) {
        servicesObserver.observe(servicesSection);
    }
});

// Smooth scroll
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

// =============================
// FORM UX
// =============================
const form = document.querySelector('.contact-form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            submitBtn.style.transform = 'scale(1.05)';
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 3000);

        }, 2000);
    });
}

// =============================
// PARALLAX HERO
// =============================
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// =============================
// SKILL HOVER EFFECT
// =============================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
    });
});

// =============================
// ACCESSIBILITY
// =============================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
// ========== TYPED TEXT EFFECT FOR HERO ==========
document.addEventListener('DOMContentLoaded', function() {
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        const texts = [
            'Développeur Full Stack',
            'Créateur d\'applications web',
            'Expert en bases de données',
            'Passionné par la tech'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentText = texts[textIndex];
            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            
            const speed = isDeleting ? 100 : 150;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }
});