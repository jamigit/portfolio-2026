/**
 * Sync the fixed grid-lines overlay to match the actual grid's horizontal position.
 * Measures the first .grid element and positions grid-lines to align with it.
 */

function syncGridOverlay() {
  const grid = document.querySelector('.grid');
  const gridLines = document.querySelector('.grid-lines');

  if (!grid || !gridLines) return;

  const rect = grid.getBoundingClientRect();
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  // Position grid-lines to match the grid's left edge
  const gridLeftOffset = rect.left + scrollLeft;
  const gridWidth = rect.width;

  gridLines.style.left = gridLeftOffset + 'px';
  gridLines.style.width = gridWidth + 'px';
}

// Sync on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', syncGridOverlay);
} else {
  syncGridOverlay();
}

// Sync on resize
window.addEventListener('resize', syncGridOverlay);

// Sync on scroll (optional, for when viewport changes)
window.addEventListener('scroll', syncGridOverlay, { passive: true });
