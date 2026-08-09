// =============================================
// Mobile Menu Toggle
// =============================================
const mobileToggle = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// =============================================
// Smooth Scroll for Anchor Links
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            if (navLinks) navLinks.classList.remove('active');
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// =============================================
// FAQ Accordion
// =============================================
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
        if (!isActive) faqItem.classList.add('active');
    });
});

// =============================================
// Scroll Animations (IntersectionObserver)
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-start').forEach(el => observer.observe(el));
});

// =============================================
// Hero Carousel
// =============================================
const carouselSlides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

if (carouselSlides.length > 0) {
    setInterval(() => {
        carouselSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        carouselSlides[currentSlide].classList.add('active');
    }, 3000);
}

// =============================================
// Testimonial Carousel
// =============================================
const testimonials = [
    {
        text: "The play-based learning approach works wonders! Anaya loves going to school every day. The communication from teachers is excellent and we always know how she's doing.",
        author: "Rajesh Kumar",
        role: "Parent of Anaya (LKG)",
        stars: 5
    },
    {
        text: "Green Blooming has been a blessing for our family. My son Arjun started here at 2 years old and the transformation in his confidence and communication has been remarkable. Truly caring teachers!",
        author: "Priya Sharma",
        role: "Parent of Arjun (Nursery)",
        stars: 5
    },
    {
        text: "We were nervous about our daughter's first school, but the warm and nurturing environment here put all our worries to rest. She comes home singing new songs every day! Highly recommended to every parent in Nokha.",
        author: "Dinesh Agarwal",
        role: "Parent of Riya (Play Group)",
        stars: 5
    }
];

let currentTestimonial = 0;

function renderTestimonial(index) {
    const t = testimonials[index];
    const textEl = document.querySelector('.testimonial-text');
    const authorEl = document.querySelector('.testimonial-author h4');
    const roleEl = document.querySelector('.testimonial-author span');
    const container = document.querySelector('.testimonial-container');

    if (!textEl) return;

    // Fade out
    container.style.opacity = '0';
    container.style.transform = 'translateY(10px)';

    setTimeout(() => {
        textEl.textContent = `"${t.text}"`;
        authorEl.textContent = t.author;
        roleEl.textContent = t.role;

        // Update dots
        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Fade in
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 300);
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
}

// Attach dot click listeners
document.querySelectorAll('.nav-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentTestimonial = i;
        renderTestimonial(i);
    });
});

// Attach prev/next arrow listeners
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);

// Auto-rotate testimonials every 5 seconds
let testimonialTimer = setInterval(nextTestimonial, 5000);

// Pause on hover
const testimonialContainer = document.querySelector('.testimonial-container');
if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
    testimonialContainer.addEventListener('mouseleave', () => {
        testimonialTimer = setInterval(nextTestimonial, 5000);
    });
    // Init smooth transition style
    testimonialContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// =============================================
// Gallery Lightbox (photo-card based)
// =============================================
const body = document.body;

const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-inner">
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-img" src="" alt="Gallery Image">
        <div class="lightbox-caption"></div>
    </div>
`;
body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    body.style.overflow = 'auto';
    lightboxImg.src = '';
}

document.querySelectorAll('.photo-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const caption = card.querySelector('.photo-caption');
        if (img) {
            openLightbox(img.src, caption ? caption.textContent : '');
        }
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// =============================================
// WhatsApp Floating Button — show after scroll
// =============================================
const waFloat = document.getElementById('whatsapp-float');
if (waFloat) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            waFloat.classList.add('visible');
        } else {
            waFloat.classList.remove('visible');
        }
    });
}

// =============================================
// Gallery Tab Switch (gallery.html)
// =============================================
window.showGallery = function(category) {
    document.querySelectorAll('.gallery-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    const section = document.getElementById(category);
    if (section) section.classList.add('active');
    if (event && event.target) event.target.classList.add('active');
};
