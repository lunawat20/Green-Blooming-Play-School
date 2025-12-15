// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Background Music Control
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;

// Check localStorage for music preference
const musicPref = localStorage.getItem('music-playing');
if (musicPref === 'true') {
    // Note: Auto-play might be blocked by browsers until user interaction
    // We'll leave it as false initially to be safe and polite
}

if (musicToggle) {
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
            localStorage.setItem('music-playing', 'false');
        } else {
            bgMusic.play().then(() => {
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                isPlaying = true;
                localStorage.setItem('music-playing', 'true');
            }).catch(e => {
                console.log("Audio play failed (likely needs user interaction first):", e);
            });
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navLinks.classList.remove('active'); // Close mobile menu on click
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current one
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});



// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const body = document.body;

// Create Lightbox Elements
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="close-lightbox">&times;</span>
        <div class="lightbox-img-placeholder"></div>
        <div class="lightbox-caption">Gallery Image</div>
    </div>
`;
body.appendChild(lightbox);

const closeBtn = lightbox.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const color = getComputedStyle(item).backgroundColor;
        const imgPlaceholder = lightbox.querySelector('.lightbox-img-placeholder');

        // Use background color as placeholder since we don't have real images yet
        imgPlaceholder.style.backgroundColor = color;
        imgPlaceholder.style.width = '100%';
        imgPlaceholder.style.height = '100%';

        lightbox.classList.add('active');
        body.style.overflow = 'hidden'; // Disable scroll
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
    body.style.overflow = 'auto'; // Enable scroll
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        body.style.overflow = 'auto';
    }
});

// --- Scroll Animations ---
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-start');
    animatedElements.forEach(el => observer.observe(el));
});

// Hero Carousel
const carouselSlides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

if (carouselSlides.length > 0) {
    setInterval(() => {
        // Remove active from current
        carouselSlides[currentSlide].classList.remove('active');

        // Move to next
        currentSlide = (currentSlide + 1) % carouselSlides.length;

        // Add active to next
        carouselSlides[currentSlide].classList.add('active');
    }, 3000); // Change image every 3 seconds
}
