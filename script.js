/* ─── CHAPA CALIANDRA — script.js ─── */

// ── Cursor Personalizado ──
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .eixo-block, .membro-card, .doc-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'var(--verde)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.borderColor = 'var(--verde)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'var(--rosa)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.borderColor = 'var(--rosa)';
        });
    });
}

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ── Mobile menu toggle ──
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em um link
navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Active link no scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(a => {
                a.style.color = '';
                if (a.getAttribute('href') === `#${id}`) {
                    a.style.color = 'var(--rosa)';
                }
            });
        }
    });
}, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(s => observer.observe(s));

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
    '.caena-card, .eixo-block, .membro-card, .cargo-item, .doc-card, .contato-card, .cargos-section, .nucleo-section'
);

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 0.04}s`;
            entry.target.classList.add('reveal', 'visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Adiciona classe reveal e observa
revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── Smooth scroll para links internos ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Paralax leve nas pétalas do hero ──
const petals = document.querySelectorAll('.petal');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    petals.forEach((petal, i) => {
        const speed = 0.1 + i * 0.05;
        petal.style.transform = `translateY(${y * speed}px) rotate(${y * 0.02}deg)`;
    });
});