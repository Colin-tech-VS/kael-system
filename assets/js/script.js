// Script JavaScript pour le site Kael
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
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .btn, .section-header h2, .section-header p, .advantage-item, .stat-item, .about-image, .contact-form, .dashboard-card, .activity-item, .todo-item');
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
            this.style.transform = 'translateY(-8px)';
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
    
    // Smooth scrolling pour les liens internes
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
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici on pourrait ajouter l'envoi du formulaire via AJAX
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            contactForm.reset();
        });
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validation basique
            if (email && password) {
                // Ici on pourrait envoyer les données au serveur
                alert('Connexion réussie ! Redirection vers le tableau de bord...');
                // Redirection vers le tableau de bord après connexion
                window.location.href = 'dashboard.html';
            } else {
                alert('Veuillez remplir tous les champs.');
            }
        });
    }
});

// Fonction pour gérer les animations au chargement
function initKaelAnimations() {
    // Animation des éléments de la page
    const elements = document.querySelectorAll('section, .feature-card, .testimonial-card, .btn, .advantage-item, .stat-item, .about-image, .contact-form, .dashboard-card, .activity-item, .todo-item');
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
document.addEventListener('DOMContentLoaded', initKaelAnimations);

// Animation personnalisée pour les boutons
const style = document.createElement('style');
style.textContent = `
    @keyframes pulseBtn {
        0% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
        100% { transform: translateY(0); }
    }
`;
document.head.appendChild(style);