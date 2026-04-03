const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const menuHamburger = document.querySelector('.menu-hamburger');
const menuX = document.querySelector('.menu-x');
const nav = document.querySelector('nav');

let open = false;
let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
let isNavVisible = true;

// Initialize proper icon states on load
function initializeIconStates() {
  if (hamburger) {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  
  if (menuHamburger && menuX) {
    menuHamburger.style.display = "block";
    menuX.style.display = "none";
  }
  
  if (navLinks) {
    navLinks.classList.remove('expanded');
  }
  
  // Ensure body scroll is enabled
  document.body.style.overflow = '';
}

// Apply initial styles for scroll behavior
nav.style.position = 'fixed';
nav.style.top = '0';
nav.style.width = '100%';
nav.style.zIndex = '1000';
nav.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease-out';
nav.style.transform = 'translateY(0)';

// Function to show navigation
function showNav() {
  nav.style.transform = 'translateY(0)';
  isNavVisible = true;
}

// Function to hide navigation
function hideNav() {
  // Don't hide nav if mobile menu is open
  if (!open) {
    nav.style.transform = 'translateY(-100%)';
    isNavVisible = false;
  }
}

// Scroll behavior handler with shadow integration
function handleScroll() {
  // Get current scroll position with cross-browser compatibility
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
  
  // Prevent negative scrolling issues on mobile
  if (currentScrollY < 0) return;
  
  // Add/remove shadow based on scroll position
  const scrolled = currentScrollY > 10;
  nav.classList.toggle('scrolled', scrolled);
  
  // Show nav when at top of page
  if (currentScrollY < 10) {
    showNav();
    lastScrollY = currentScrollY;
    return;
  }
  
  // Determine scroll direction
  const scrollingDown = currentScrollY > lastScrollY;
  const scrollDelta = Math.abs(currentScrollY - lastScrollY);
  
  // Only trigger if scroll delta is significant (prevents tiny scroll jitters)
  if (scrollDelta > 5) {
    if (scrollingDown && isNavVisible) {
      hideNav();
    } else if (!scrollingDown && !isNavVisible) {
      showNav();
    }
  }
  
  lastScrollY = currentScrollY;
}

// Enhanced throttle scroll events for better performance
let ticking = false;
function requestTick() {
  if (!ticking) {
    requestAnimationFrame(function() {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
}

// Add scroll event listener
window.addEventListener('scroll', requestTick, { passive: true });

// Function to close the menu
function closeMenu() {
  if (navLinks) navLinks.classList.remove('expanded');
  if (hamburger) {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  open = false;
  
  // Restore body scroll
  document.body.style.overflow = '';
  
  // Handle legacy hamburger/X elements if they exist
  if (menuHamburger && menuX) {
    menuHamburger.style.display = "block";
    menuX.style.display = "none";
  }
}

// Function to open the menu
function openMenu() {
  if (navLinks) navLinks.classList.add('expanded');
  if (hamburger) {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
  }
  open = true;
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = 'hidden';
  
  // Always show nav when menu is opened
  showNav();
  
  // Handle legacy hamburger/X elements if they exist
  if (menuHamburger && menuX) {
    menuHamburger.style.display = "none";
    menuX.style.display = "block";
  }
}

// Toggle menu on hamburger click
if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

// Close menu when clicking on navigation links
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    if (open) {
      closeMenu();
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  // Check if click is outside the menu area
  if (open && 
      hamburger && !hamburger.contains(e.target) && 
      navLinks && !navLinks.contains(e.target)) {
    closeMenu();
  }
});

// Close menu on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && open) {
    closeMenu();
  }
});

// Handle window resize - close mobile menu if switching to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && open) {
    closeMenu();
  }
});

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeIconStates();
  handleScroll();
});

// Also initialize immediately in case DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeIconStates();
    handleScroll();
  });
} else {
  initializeIconStates();
  handleScroll();
}