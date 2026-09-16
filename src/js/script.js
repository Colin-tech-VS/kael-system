// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        header.style.background = 'rgba(20, 20, 20, 0.95)';
        header.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.2)';
    } else {
        header.classList.remove('scrolled');
        header.style.background = 'rgba(20, 20, 255, 0.9)';
        header.style.boxShadow = 'none';
    }
});

// Form Submission Handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // In a real application, this would submit the form data
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
        contactForm.reset();
    });
}

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .advantage-item, .testimonial-card, .integration-card, .category-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.feature-card, .advantage-item, .testimonial-card, .integration-card, .category-card').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Initial check
animateOnScroll();

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Feature Detail Toggle (for features page)
const featureDetails = document.querySelectorAll('.feature-detail');
featureDetails.forEach(detail => {
    detail.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
            detail.classList.toggle('expanded');
        }
    });
});

// Initialize tooltips or other interactive elements if needed
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Kael System website loaded successfully');
    
    // Add animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = 0;
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = 1;
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});