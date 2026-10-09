/**
 * Vidya Vahini Solar Agency & Risaenergy Pvt Ltd - Core UI & Animation Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle with Silky Slide Animation
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');

  function openMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove('hidden');
      // Trigger reflow for CSS transition
      void mobileMenuDrawer.offsetWidth;
      mobileMenuDrawer.classList.add('active-drawer');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileMenuDrawer) {
      mobileMenuDrawer.classList.remove('active-drawer');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!mobileMenuDrawer.classList.contains('active-drawer')) {
          mobileMenuDrawer.classList.add('hidden');
        }
      }, 320);
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileMenu();
    });
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuDrawer) {
    // Close on clicking backdrop
    mobileMenuDrawer.addEventListener('click', (e) => {
      if (e.target === mobileMenuDrawer) {
        closeMobileMenu();
      }
    });

    // Close on clicking any navigation link inside mobile drawer
    const drawerLinks = mobileMenuDrawer.querySelectorAll('a, button');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeQuoteModal();
    }
  });

  // 2. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach(i => i.classList.remove('active'));
        // Toggle current
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Quick Quote Modal Trigger with Smooth Scale Transition
  const quoteModal = document.getElementById('quote-modal');
  const quoteModalTriggers = document.querySelectorAll('.trigger-quote-modal');
  const closeQuoteModalBtn = document.getElementById('close-quote-modal');

  function openQuoteModal() {
    if (quoteModal) {
      quoteModal.classList.remove('hidden');
      void quoteModal.offsetWidth;
      quoteModal.classList.add('active-modal');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeQuoteModal() {
    if (quoteModal) {
      quoteModal.classList.remove('active-modal');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (!quoteModal.classList.contains('active-modal')) {
          quoteModal.classList.add('hidden');
        }
      }, 260);
    }
  }

  if (quoteModal) {
    quoteModalTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openQuoteModal();
      });
    });

    if (closeQuoteModalBtn) {
      closeQuoteModalBtn.addEventListener('click', closeQuoteModal);
    }

    // Click outside to close
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeQuoteModal();
      }
    });
  }

  // 4. Form Submission Simulation with Feedback
  const quoteForms = document.querySelectorAll('form.lead-form');
  quoteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing Request...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `✓ Request Received! Our Engineer Will Call You`;
          submitBtn.classList.remove('bg-amber-500', 'hover:bg-amber-600');
          submitBtn.classList.add('bg-emerald-600');
        }

        // Show thank you notification
        alert('Thank you for contacting Vidya Vahini Solar Agency! Our solar engineering team in Prayagraj will reach out to you within 2 hours to confirm your site assessment.');

        // Reset form
        form.reset();

        // Close modal if open
        if (quoteModal && !quoteModal.classList.contains('hidden')) {
          setTimeout(() => {
            closeQuoteModal();
            if (submitBtn) submitBtn.innerHTML = originalText;
          }, 1500);
        }
      }, 1000);
    });
  });

  // 5. Solution Tabs (Home Page & Services Page)
  const tabButtons = document.querySelectorAll('.solution-tab-btn');
  const tabPanels = document.querySelectorAll('.solution-tab-panel');

  if (tabButtons.length > 0 && tabPanels.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        
        tabButtons.forEach(b => {
          b.classList.remove('active', 'border-amber-500', 'text-amber-400', 'bg-slate-800');
          b.classList.add('border-transparent', 'text-slate-400');
        });
        
        btn.classList.add('active', 'border-amber-500', 'text-amber-400', 'bg-slate-800');
        btn.classList.remove('border-transparent', 'text-slate-400');

        tabPanels.forEach(p => {
          if (p.id === targetId) {
            p.classList.remove('hidden');
            // Re-trigger scroll reveal inside newly visible tab panel
            const panelReveals = p.querySelectorAll('.reveal-init, .reveal-scale');
            panelReveals.forEach(el => el.classList.add('revealed'));
          } else {
            p.classList.add('hidden');
          }
        });
      });
    });
  }

  // 6. High-Performance Intersection Observer Scroll Reveal System
  const revealElements = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale');
  
  if (revealElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      });

      revealElements.forEach(el => {
        // Immediate check for elements already above the fold or in viewport
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Slight delay for smooth initial entrance
          setTimeout(() => el.classList.add('revealed'), 50);
        } else {
          revealObserver.observe(el);
        }
      });
    } else {
      // Graceful fallback for non-supporting browsers
      revealElements.forEach(el => el.classList.add('revealed'));
    }

    // Safety timeout: Ensure no content stays hidden under slow network or low-power modes
    setTimeout(() => {
      revealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
          el.classList.add('revealed');
        }
      });
    }, 2500);
  }

  // 7. Animated Metric Roll-Up Numbers
  const counterElements = document.querySelectorAll('[data-counter]');
  if (counterElements.length > 0) {
    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      counterElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setTimeout(() => animateCounter(el), 120);
        } else {
          counterObserver.observe(el);
        }
      });
    } else {
      counterElements.forEach(el => animateCounter(el));
    }
  }

  function animateCounter(el) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';

    const target = parseFloat(el.getAttribute('data-counter'));
    if (isNaN(target)) return;

    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const isCurrency = el.getAttribute('data-currency') === 'true';
    const isDecimal = String(target).includes('.');
    const duration = 1600; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;

      let formatted;
      if (isCurrency) {
        formatted = Math.floor(current).toLocaleString('en-IN');
      } else if (isDecimal) {
        formatted = current.toFixed(1);
      } else {
        formatted = Math.floor(current);
      }

      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (isCurrency) {
          el.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
        } else if (isDecimal) {
          el.textContent = `${prefix}${target.toFixed(1)}${suffix}`;
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }
    }

    requestAnimationFrame(update);
  }
});
