// Script JavaScript pour SaaS Pro
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de SaaS Pro
    console.log('SaaS Pro initialized');
    
    // Configuration des fonctionnalités
    setupFeatures();
    
    // Gestion des formulaires
    setupForms();
    
    // Animation des éléments
    setupAnimations();
});

function setupFeatures() {
    // Activer les fonctionnalités principales
    const features = document.querySelectorAll('.saas-feature');
    features.forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.style.transform = 'translateY(-5px)';
        });
        
        feature.addEventListener('mouseleave', () => {
            feature.style.transform = 'translateY(0)';
        });
    });
}

function setupForms() {
    // Gestion des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleSubmit);
    });
}

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validation basique
    if (!validateForm(form)) {
        return;
    }
    
    // Envoi des données
    submitForm(formData);
}

function validateForm(form) {
    // Validation des champs requis
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#334155';
        }
    });
    
    return isValid;
}

function submitForm(data) {
    // Simulation d'envoi de formulaire
    console.log('Submitting form data:', data);
    
    // Afficher un message de succès
    showMessage('Formulaire envoyé avec succès!', 'success');
}

function setupAnimations() {
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}