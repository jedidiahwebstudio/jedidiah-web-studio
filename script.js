// ==========================================
// 1. FULL-SCREEN NAVIGATION OVERLAY LOGIC
// ==========================================
const menuToggle = document.getElementById('menu-toggle');
const navOverlay = document.getElementById('nav-overlay');
const overlayLinks = document.querySelectorAll('.overlay-links a');

function toggleMenu() {
    menuToggle.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = navOverlay.classList.contains('open') ? 'hidden' : 'auto';
}

menuToggle.addEventListener('click', toggleMenu);

overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// ==========================================
// 2. FORMSPREE EMAIL SUBMISSION ENGINE
// ==========================================
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const button = form.querySelector('.submit-btn');
    
    button.textContent = 'Dispatching Brief...';
    button.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert("Success! Your project brief has been logged. Jedidiah Web Studio will review your requirements and reach out shortly.");
            form.reset();
        } else {
            alert("Oops! There was a problem submitting your form. Please try again.");
        }
    } catch (error) {
        alert("Oops! Connection error occurred. Please try again.");
    } finally {
        button.textContent = 'Dispatch Project Details';
        button.disabled = false;
    }
});

// ==========================================
// 3. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER)
// ==========================================
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => { revealOnScroll.observe(element); });

// ==========================================
// 4. INTERACTIVE 3D PERSPECTIVE CARD TILT ENGINE
// ==========================================
const cards = document.querySelectorAll('.id-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const maxTilt = 15;
        const tiltX = ((centerY - y) / centerY) * maxTilt;
        const tiltY = ((x - centerX) / centerX) * maxTilt;
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// ==========================================
// 5. THEME TOGGLE (LOCAL STORAGE SAVED PREFERENCE)
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// ==========================================
// 6. SCROLL PROGRESS RING / BACK TO TOP
// ==========================================
const progressWrap = document.getElementById('progress-wrap');
const progressPath = document.querySelector('.progress-wrap svg path');
const pathLength = progressPath.getTotalLength();

progressPath.style.transition = progressPath.style.webkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.webkitTransition = 'stroke-dashoffset 10ms linear';

const updateProgress = () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
    
    if (scroll > 150) {
        progressWrap.classList.add('active-progress');
    } else {
        progressWrap.classList.remove('active-progress');
    }
};

window.addEventListener('scroll', updateProgress);
progressWrap.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// 7. INTERACTIVE FAQ ACCORDION LOGIC
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('open');
    });
});

// ==========================================
// 8. TESTIMONIAL CAROUSEL SLIDER ENGINE
// ==========================================
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
const dotsContainer = document.getElementById('slider-dots');
let currentSlide = 0;
let slideInterval;

// Inject navigation indicator dots dynamically
slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSliderStates() {
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
        dots[idx].classList.toggle('active', idx === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSliderStates();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSliderStates();
}

function goToSlide(idx) {
    currentSlide = idx;
    updateSliderStates();
    resetSliderTimer();
}

function startSliderTimer() {
    slideInterval = setInterval(nextSlide, 6000); // Transitions automatically every 6 seconds
}

function resetSliderTimer() {
    clearInterval(slideInterval);
    startSliderTimer();
}

nextBtn.addEventListener('click', () => { nextSlide(); resetSliderTimer(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetSliderTimer(); });

// Initialize automatic playback loop
startSliderTimer();