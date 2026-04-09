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

  const grid = document.querySelector('.grid');
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
  const hero = document.querySelector('.has-canvas-hero');
  if (!gridLines) return;

  if (hero) {
    gridLines.classList.toggle('over-dark', hero.getBoundingClientRect().bottom > 0);
  } else {
    gridLines.classList.remove('over-dark');
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
