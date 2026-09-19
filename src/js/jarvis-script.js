// Script JavaScript pour Jarvis
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de Jarvis
    console.log('Jarvis initialized');
    
    // Gestion des événements
    setupEventListeners();
    
    // Animation au chargement
    animateOnLoad();
});

function setupEventListeners() {
    // Gestion des clics sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
        element.addEventListener('click', handleInteraction);
    });
}

function handleInteraction(event) {
    const target = event.target;
    console.log('Interaction with:', target);
    
    // Animation de feedback
    target.classList.add('active');
    setTimeout(() => {
        target.classList.remove('active');
    }, 300);
}

function animateOnLoad() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Fonction pour charger dynamiquement du contenu
async function loadContent(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error loading content:', error);
        return null;
    }
}

// Fonction pour afficher un message
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}