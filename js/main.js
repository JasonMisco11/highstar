
document.addEventListener('DOMContentLoaded', function(){
  // nav toggle
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const header = document.getElementById('siteHeader');
  if(btn && nav){
    btn.addEventListener('click', ()=>{
      nav.classList.toggle('show');
      btn.setAttribute('aria-expanded', nav.classList.contains('show'));
    });
    // close on link click (mobile)
    nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{ nav.classList.remove('show'); btn.setAttribute('aria-expanded', 'false'); }));
  }

  // sticky header shrink on scroll (subtle)
  let lastScroll = 0;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    if(y > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');
    lastScroll = y;
  });

  // smooth links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  // tabs
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  tabs.forEach(t=> t.addEventListener('click', ()=>{
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    panels.forEach(p=>p.classList.remove('active'));
    const id = t.getAttribute('data-panel');
    const sel = document.getElementById(id);
    if(sel) sel.classList.add('active');
  }));

  // carousel
  const slides = document.querySelectorAll('.carousel .slide');
  let idx = 0;
  function show(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[i].classList.add('active');
  }
  if(slides.length>0){
    show(0);
    setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, 4500);
  }

  // lightweight scroll reveal (no lib)
  const revealEls = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const h = window.innerHeight;
    revealEls.forEach(el=>{
      const r = el.getBoundingClientRect();
      if(r.top < h - 80) { el.style.opacity = 1; el.style.transform = 'translateY(0)'; }
    });
  };
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
  window.addEventListener('resize', revealOnScroll);

  // demo form handler
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Thanks! This demo form does not currently send data. Replace the handler with Formspree or your backend.');
      form.reset();
    });
  }
});
