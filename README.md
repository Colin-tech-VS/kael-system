# Kael System

Site vitrine qui présente KAEL

## Architecture du projet

Ce projet suit une architecture moderne avec une séparation claire entre le frontend et le backend :

### Structure du projet :
- **backend/** : Code Python Flask pour le serveur
- **frontend/** : Code React/Vite pour l'interface utilisateur
- **src/** : Fichiers HTML/CSS/JS pour les pages statiques
- **templates/** : Templates Jinja2 pour les pages dynamiques
- **static/** : Fichiers statiques (images, CSS, JS)

## Application Flask
Cette application est un serveur minimal basé sur Flask qui expose une route principale `/` retournant le message "KAEL System is up".