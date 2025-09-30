document.addEventListener('DOMContentLoaded', function() {
    // nav toggle
    const btn = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('siteHeader');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('show');
            btn.setAttribute('aria-expanded', nav.classList.contains('show'));
        });
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            nav.classList.remove('show');
            btn.setAttribute('aria-expanded', 'false');
        }));
    }

    // sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

    // smooth links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // tabs
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');
    tabs.forEach(t => t.addEventListener('click', () => {
        tabs.forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        panels.forEach(p => p.classList.remove('active'));
        const id = t.getAttribute('data-panel');
        const sel = document.getElementById(id);
        if (sel) sel.classList.add('active');
    }));

    // reusable slider function
    function initSlider(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const track = slider.querySelector(".gallery-track");
        const items = slider.querySelectorAll(".gallery-item");
        const dotsContainer = slider.querySelector(".gallery-dots");
        const prevBtn = slider.querySelector(".gallery-prev");
        const nextBtn = slider.querySelector(".gallery-next");
        let index = 0;

        dotsContainer.innerHTML = "";
        items.forEach((_, i) => {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll("span");

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle("active", i === index);
            });
        }

        function goToSlide(i) {
            index = i;
            track.style.transform = `translateX(-${index * 100}%)`;
            updateDots();
        }

        function moveSlide(step) {
            index = (index + step + items.length) % items.length;
            goToSlide(index);
        }

        prevBtn.addEventListener("click", () => moveSlide(-1));
        nextBtn.addEventListener("click", () => moveSlide(1));

        // auto-slide
        setInterval(() => moveSlide(1), 4000);

        // lightbox (per slider)
        const lightbox = document.getElementById("galleryLightbox");
        if (lightbox) {
            const lightboxImg = lightbox.querySelector(".gallery-lightbox-img");
            const closeBtn = lightbox.querySelector(".gallery-close");
            const lbPrev = lightbox.querySelector(".gallery-lightbox-prev");
            const lbNext = lightbox.querySelector(".gallery-lightbox-next");
            let lbIndex = 0;

            items.forEach((item, i) => {
                item.querySelector("img").addEventListener("click", () => {
                    lbIndex = i;
                    openLightbox();
                });
            });

            function openLightbox() {
                lightbox.style.display = "flex";
                updateLightbox();
            }

            function updateLightbox() {
                lightboxImg.src = items[lbIndex].querySelector("img").src;
            }

            function moveLightbox(step) {
                lbIndex = (lbIndex + step + items.length) % items.length;
                updateLightbox();
            }

            closeBtn.addEventListener("click", () => lightbox.style.display = "none");
            lbPrev.addEventListener("click", () => moveLightbox(-1));
            lbNext.addEventListener("click", () => moveLightbox(1));
        }

        goToSlide(0);
    }

    // init both sliders
    initSlider("carsSlider");
    initSlider("buildingsSlider");

    // carousel
    const slides = document.querySelectorAll('.carousel .slide');
    let idx = 0;

    function show(i) {
        slides.forEach(s => s.classList.remove('active'));
        slides[i].classList.add('active');
    }
    if (slides.length > 0) {
        show(0);
        setInterval(() => {
            idx = (idx + 1) % slides.length;
            show(idx);
        }, 4500);
    }

    // scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const h = window.innerHeight;
        revealEls.forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.top < h - 80) {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }
        });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);

    // demo form handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thanks! This demo form does not currently send data. Replace with Formspree or your backend.');
            form.reset();
        });
    }
});