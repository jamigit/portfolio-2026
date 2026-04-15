const nav       = document.querySelector('header nav');
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
const menuHamburger = document.querySelector('.menu-hamburger');
const menuX     = document.querySelector('.menu-x');

let open = false;
let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
let isNavVisible = true;

// ── Transparent mode (homepage only) ──────────────────────────────────────────
const isHomepage = document.querySelector('.hero-home') !== null;
if (isHomepage) nav.classList.add('nav-transparent');

// ── Show / hide on scroll ─────────────────────────────────────────────────────
function showNav() {
  nav.classList.remove('nav-hidden');
  isNavVisible = true;
}

function hideNav() {
  if (open) return;
  nav.classList.add('nav-hidden');
  isNavVisible = false;
}

function handleScroll() {
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollY < 0) return;

  // Transparent ↔ opaque on homepage
  if (isHomepage) {
    if (currentScrollY > 80) {
      nav.classList.remove('nav-transparent');
    } else {
      nav.classList.add('nav-transparent');
    }
  }

  // Show when at top
  if (currentScrollY < 10) {
    showNav();
    lastScrollY = currentScrollY;
    return;
  }

  const scrollDelta = Math.abs(currentScrollY - lastScrollY);
  if (scrollDelta > 5) {
    if (currentScrollY > lastScrollY && isNavVisible) {
      hideNav();
    } else if (currentScrollY < lastScrollY && !isNavVisible) {
      showNav();
    }
  }

  lastScrollY = currentScrollY;
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { handleScroll(); ticking = false; });
    ticking = true;
  }
}, { passive: true });

// ── Mobile menu ───────────────────────────────────────────────────────────────
function closeMenu() {
  navLinks && navLinks.classList.remove('expanded');
  hamburger && hamburger.setAttribute('aria-expanded', 'false');
  if (menuHamburger) menuHamburger.style.display = 'block';
  if (menuX) menuX.style.display = 'none';
  document.body.style.overflow = '';
  open = false;
}

function openMenu() {
  navLinks && navLinks.classList.add('expanded');
  hamburger && hamburger.setAttribute('aria-expanded', 'true');
  if (menuHamburger) menuHamburger.style.display = 'none';
  if (menuX) menuX.style.display = 'block';
  document.body.style.overflow = 'hidden';
  showNav();
  open = true;
}

hamburger && hamburger.addEventListener('click', () => {
  open ? closeMenu() : openMenu();
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => { if (open) closeMenu(); });
});

document.addEventListener('click', (e) => {
  if (open &&
      hamburger && !hamburger.contains(e.target) &&
      navLinks   && !navLinks.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && open) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && open) closeMenu();
});

// ── Init ──────────────────────────────────────────────────────────────────────
if (menuHamburger) menuHamburger.style.display = 'block';
if (menuX) menuX.style.display = 'none';
hamburger && hamburger.setAttribute('aria-expanded', 'false');
handleScroll();
