/* Mobile menu toggle + robust accessibility and pointer support */
document.addEventListener('DOMContentLoaded', function() {
  try {
    const toggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.querySelector('.mobile-close');
    const backdrop = document.querySelector('.mobile-backdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    function openMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      const firstLink = mobileMenu.querySelector('.mobile-nav a');
      if (firstLink) firstLink.focus();
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (toggle) toggle.focus();
      document.body.style.overflow = '';
    }

    if (toggle) {
      toggle.addEventListener('click', function(e){ e.preventDefault(); const expanded = this.getAttribute('aria-expanded') === 'true'; if (expanded) closeMenu(); else openMenu(); });
      toggle.addEventListener('pointerdown', function(e){ e.preventDefault(); });
    }
    if (mobileClose) {
      mobileClose.addEventListener('click', function(e){ e.preventDefault(); closeMenu(); });
    }
    if (backdrop) {
      backdrop.addEventListener('click', function(e){ closeMenu(); });
    }

    // Escape closes menu
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close menu when clicking a mobile link (so it navigates cleanly)
    if (mobileNavLinks && mobileNavLinks.length) {
      mobileNavLinks.forEach(a => {
        a.addEventListener('click', function(ev){
          setTimeout(closeMenu, 120);
        });
      });
    }

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = this.getAttribute('href');
        if (!href || href === '#' || href.indexOf('http') === 0) return;
        var target = document.querySelector(href);
        if (target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          if (mobileMenu && mobileMenu.classList.contains('open')) closeMenu();
        }
      });
    });
  } catch (err) {
    console.error('Menu script error:', err);
  }
});
