// Script JavaScript pour le design Jarvis-inspired
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu mobile
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Gestion du scroll pour le header
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
    
    // Animation des éléments au scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .btn, .section-header h2, .section-header p');
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
    
    // Animation des boutons au survol
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.animation = 'pulseBtn 0.5s ease';
        });
    });
    
    // Effet de survol sur les cartes
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Animation de chargement
    const body = document.body;
    body.style.opacity = 0;
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = 1;
    }, 100);
});

// Fonction pour gérer les animations au chargement
function initJarvisAnimations() {
    // Animation des éléments de la page
    const elements = document.querySelectorAll('section, .feature-card, .testimonial-card, .btn');
    let delay = 0;
    
    elements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        }, delay);
        
        delay += 100;
    });
}

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', initJarvisAnimations);

// Gestion des formulaires
function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Afficher un message de succès
    alert('Message envoyé avec succès ! Nous vous répondrons bientôt.');
    form.reset();
}

// Appliquer le gestionnaire aux formulaires
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmission);
    });
});