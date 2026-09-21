// Script JavaScript pour le site Kael
document.addEventListener('DOMContentLoaded', function() {
    // Générer les étoiles dynamiquement
    generateStars();
    
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
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .btn, .section-header h2, .section-header p, .stat-item, .about-image, .contact-form');
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

// Fonction pour générer les étoiles dynamiquement
function generateStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Position aléatoire
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Taille aléatoire
        const size = Math.random() * 3 + 1;
        
        // Opacité aléatoire
        const opacity = Math.random() * 0.8 + 0.2;
        
        // Durée d'animation aléatoire
        const duration = Math.random() * 5 + 3;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--opacity', opacity);
        star.style.setProperty('--duration', `${duration}s`);
        
        starsContainer.appendChild(star);
    }
}

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