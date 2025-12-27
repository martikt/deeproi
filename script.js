document.addEventListener('DOMContentLoaded', function() {
  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // accessibility for details
  document.querySelectorAll('details summary').forEach(s => {
    s.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        s.parentElement.open = !s.parentElement.open;
      }
    });
  });
});
