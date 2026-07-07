(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function(e){ e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:.15});
    els.forEach(function(e){ io.observe(e); });
  }

  var nums = document.querySelectorAll('.num[data-to]');
  nums.forEach(function(el){
    var target = parseInt(el.getAttribute('data-to'), 10);
    if (reduce) { el.textContent = target; return; }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var start = null, dur = 900;
        function step(ts){
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.floor(p * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    }, {threshold:.4});
    obs.observe(el);
  });
})();
