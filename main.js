// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animated Counter
const counts = document.querySelectorAll('.count');
const speed = 200;

const startCount = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target + '+';
        }
    };
    updateCount();
};

// Intersection Observer for Counter
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counts.forEach(count => {
    counterObserver.observe(count);
});

// Smooth scroll for nav links (Standard behavior is fine but let's add refinement if needed)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Hero Slider Functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[n].classList.add('active');
    dots[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Auto transition
let sliderId = setInterval(nextSlide, slideInterval);

// Click on dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(sliderId);
        currentSlide = index;
        showSlide(currentSlide);
        sliderId = setInterval(nextSlide, slideInterval);
    });
});
// Initialize Services Swiper
document.addEventListener('DOMContentLoaded', function () {
    var servicesSwiper = new Swiper(".servicesSwiper", {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: false,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3.2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4.5,
                spaceBetween: 30,
            },
        },
    });

    // Initialize Testimonials Swiper
    var testimonialsSwiper = new Swiper(".testimonialsSwiper", {
        slidesPerView: 1,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".glass-next",
            prevEl: ".glass-prev",
        },
        on: {
            init: function () {
                updateProgress(this);
            },
            slideChange: function () {
                updateProgress(this);
            }
        }
    });

    function updateProgress(swiper) {
        const currentSlide = document.querySelector('.current-slide');
        const progressFill = document.querySelector('.progress-fill');
        if (!currentSlide || !progressFill) return;

        // Swiper loop index handling
        let index = swiper.realIndex + 1;
        let total = swiper.slides.length;
        if (swiper.params.loop) {
            total = document.querySelectorAll('.testimonialsSwiper .swiper-slide:not(.swiper-slide-duplicate)').length;
        }

        currentSlide.textContent = index < 10 ? '0' + index : index;
        progressFill.style.width = (index / total) * 100 + '%';
    }

    // Project Filtering
    const filterLinks = document.querySelectorAll('.filter-link');
    const projectItems = document.querySelectorAll('.project-item');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Handle Active Class
            filterLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const filter = link.getAttribute('data-filter');

            // Filter Items
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Custom Morphing Solid Inverter Logic (Moved & Refined for Stability)
document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    // Only run on desktop
    if (window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            // Dot follows fast
            dotX += (mouseX - dotX) * 0.4;
            dotY += (mouseY - dotY) * 0.4;

            // Outline follows with heavy inertia
            outlineX += (mouseX - outlineX) * 0.2;
            outlineY += (mouseY - outlineY) * 0.2;

            if (cursorDot) cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            if (cursorOutline) cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Morphing Hover Effects
        const updateHoverListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, .btn, .dot, .swiper-button-next, .swiper-button-prev, .social-links a, .filter-link');

            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorOutline.classList.add('cursor-hover');
                    cursorDot.style.opacity = '0';
                });
                el.addEventListener('mouseleave', () => {
                    cursorOutline.classList.remove('cursor-hover');
                    cursorDot.style.opacity = '1';
                });
            });
        };

        updateHoverListeners();

        // Re-run for dynamic content (like Swiper sliders)
        setTimeout(updateHoverListeners, 1000);
    }
});

// Scroll to Top Logic
// Handled by the general anchor-link listener (lines 46-57)

