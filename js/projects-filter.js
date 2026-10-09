/**
 * Vidya Vahini Solar Agency - Interactive Projects Category Filter
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');

        // Update active button state
        filterBtns.forEach(b => {
          b.classList.remove('active', 'bg-amber-500', 'text-slate-950', 'shadow-lg');
          b.classList.add('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');
        });

        btn.classList.add('active', 'bg-amber-500', 'text-slate-950', 'shadow-lg');
        btn.classList.remove('bg-slate-800', 'text-slate-300', 'hover:bg-slate-700');

        // Filter cards
        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.3s ease-in-out';
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }
});
