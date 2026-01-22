// Mobile menu toggle + basic accessibility
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  const backdrop = document.querySelector('.mobile-backdrop');

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    // focus first link
    const firstLink = mobileMenu.querySelector('.mobile-nav a');
    if (firstLink) firstLink.focus();
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus();
    document.body.style.overflow = ''; // restore
  }

  if (toggle) {
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu(); else openMenu();
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Close with Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close menu when any mobile link is clicked (and navigate)
  document.querySelectorAll('.mobile-nav a').forEach(a=>{
    a.addEventListener('click', function(){
      closeMenu();
    });
  });

  // Smooth scroll for internal anchor links (existing behavior)
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href || href === '#' || href.indexOf('http') === 0) return;
      const target = document.querySelector(href);
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // If mobile, close menu
        if (mobileMenu && mobileMenu.classList.contains('open')) closeMenu();
      }
    });
  });

  // Accessibility: trap focus inside mobile menu when open (simple)
  document.addEventListener('focusin', (e) => {
    if (!mobileMenu || !mobileMenu.classList.contains('open')) return;
    if (!mobileMenu.contains(e.target) && e.target !== toggle) {
      // move focus to menu
      const first = mobileMenu.querySelector('.mobile-nav a');
      if (first) first.focus();
    }
  });
});
