// Script principal pour le site Kael System

// Fonction pour gérer le menu mobile
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
    }
}

// Fonction pour gérer le scroll du header
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = '#fff';
        }
    });
}

// Fonction pour gérer les formulaires
function initForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Ici on pourrait ajouter la logique d'envoi du formulaire
            alert('Merci pour votre message ! Nous vous répondrons bientôt.');
            contactForm.reset();
        });
    }
}

// Fonction pour gérer les animations au scroll
function initScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .advantage-item, .testimonial-card, .platform-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Fonction pour gérer le smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fonction pour initialiser tous les composants
function initAll() {
    initMobileMenu();
    handleHeaderScroll();
    initForms();
    initScrollAnimations();
    initSmoothScrolling();
}

// Initialisation lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', initAll);

// Initialisation lorsque la page est complètement chargée
window.addEventListener('load', function() {
    // Peut être utilisé pour des initialisations supplémentaires
});