// Mobile-friendly reveal animations for specified sections
(function () {
  var mobileBreakpoint = 768;
  var revealClass = 'in-view';
  var observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  function applyObserver() {
    var targets = [];
    var heroTitle = document.querySelector('.hero-title-box');
    var heroSub = document.querySelector('.hero-subtext');
    var heroImg = document.querySelector('.hero-image img');
    var whyText = document.querySelector('.why-text');
    var whyImg = document.querySelector('.why-image img');
    var success = document.querySelector('.success');
    var successItems = success ? success.querySelectorAll('h1, .testimonials p') : [];
    var faq = document.querySelector('.faq');
    var faqItems = faq ? faq.querySelectorAll('h1, ul') : [];

    [heroTitle, heroSub, heroImg, whyText, whyImg].forEach(function(el){
      if(el) targets.push(el);
    });
    if(success) successItems.forEach(function(el){ targets.push(el); });
    if(faq) faqItems.forEach(function(el){ targets.push(el); });

    var observer = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if(entry.isIntersecting) {
          entry.target.classList.add(revealClass);
          // trigger once: unobserve after reveal
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    targets.forEach(function(t){
      // add initial class for CSS handling
      if (t) {
        t.classList.add('reveal');
        observer.observe(t);
      }
    });
  }

  function init() {
    if (window.innerWidth <= mobileBreakpoint) {
      applyObserver();
    } else {
      // on desktop do not add reveal classes (preserve current look)
    }
  }

  window.addEventListener('load', init);
  window.addEventListener('resize', function(){
    // if switched to mobile, ensure observer applied once
    if (window.innerWidth <= mobileBreakpoint) {
      init();
    }
  });
})();
