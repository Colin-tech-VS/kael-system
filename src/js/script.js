// Script JavaScript principal pour les pages non servies
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du site
    initializeSite();
    
    // Gestion du menu mobile
    setupMobileMenu();
    
    // Gestion du scroll
    setupScrollHandling();
    
    // Animation des éléments
    setupAnimations();
});

function initializeSite() {
    console.log('Site initialized');
    
    // Ajout de classes au body pour les animations
    document.body.classList.add('site-loaded');
}

function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

function setupScrollHandling() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

function setupAnimations() {
    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-in, .zoom-in');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser l'animation
    animateOnScroll();
    
    // Écouter le scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Fonction pour gérer les liens internes avec smooth scrolling
function setupSmoothScrolling() {
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

// Fonction pour valider les formulaires
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#334155';
        }
    });
    
    return isValid;
}

// Fonction pour envoyer un formulaire
function submitForm(form) {
    const formData = new FormData(form);
    
    // Ici on pourrait envoyer le formulaire via AJAX
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Afficher un message de succès
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    form.reset();
}

// Initialiser le smooth scrolling
setupSmoothScrolling();

// Exporter les fonctions pour utilisation externe
window.validateForm = validateForm;
window.submitForm = submitForm;