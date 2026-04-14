/**
 * Grid overlay sync — two separate concerns:
 *
 * 1. POSITION (load + resize only)
 *    The overlay position never needs to change on scroll — vertical scrolling
 *    does not affect horizontal position. Syncing on scroll caused reflows that
 *    introduced fractional-pixel jumps.
 *
 * 2. COLOUR (scroll)
 *    Toggle .over-dark while the canvas hero is visible in the viewport.
 *    Only reads + toggles a class — never touches position.
 */

function syncGridPosition() {
  const gridLines = document.querySelector('.grid-lines');
  if (!gridLines) return;

  const grid = document.querySelector('.page-grid-anchor') || document.querySelector('.grid');
  if (!grid) return;

  const rect = grid.getBoundingClientRect();
  const style = window.getComputedStyle(grid);
  const paddingLeft = parseFloat(style.paddingLeft) || 0;
  const paddingRight = parseFloat(style.paddingRight) || 0;

  gridLines.style.left = (rect.left + paddingLeft) + 'px';
  gridLines.style.width = (rect.width - paddingLeft - paddingRight) + 'px';
}

function syncGridTheme() {
  const gridLines = document.querySelector('.grid-lines');
  const darkHero = document.querySelector('.has-canvas-hero');
  const visibleHero = document.querySelector('.hero-grid-visible');
  if (!gridLines) return;

  if (darkHero) {
    const darkHeroRect = darkHero.getBoundingClientRect();
    const darkHeroVisible = darkHeroRect.bottom > 0 && darkHeroRect.top < window.innerHeight;
    const darkHeroBg = darkHero.querySelector('.hero-bg-layer');
    const bgOpacity = darkHeroBg ? parseFloat(window.getComputedStyle(darkHeroBg).opacity) : 1;
    const shouldUseDarkLines = darkHeroVisible && (Number.isNaN(bgOpacity) || bgOpacity > 0.55);
    gridLines.classList.toggle('over-dark', shouldUseDarkLines);
  } else {
    gridLines.classList.remove('over-dark');
  }

  if (visibleHero) {
    const visibleHeroRect = visibleHero.getBoundingClientRect();
    const heroInView = visibleHeroRect.bottom > 0 && visibleHeroRect.top < window.innerHeight;
    gridLines.classList.toggle('over-hero', heroInView);
  } else {
    gridLines.classList.remove('over-hero');
  }
}

// Position: initial load + after full load (fonts/images) + resize only
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', syncGridPosition);
} else {
  syncGridPosition();
}
window.addEventListener('load', syncGridPosition);
window.addEventListener('resize', syncGridPosition);

// Theme: initial state + scroll
syncGridTheme();
window.addEventListener('scroll', syncGridTheme, { passive: true });
