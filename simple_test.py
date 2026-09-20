#!/usr/bin/env python3
"""
Tests simples pour vérifier que les fichiers nécessaires existent
et que les pages de base sont accessibles
"""

import os
import sys
import unittest

class TestKaelFiles(unittest.TestCase):
    """Tests pour vérifier l'existence des fichiers nécessaires"""
    
    def test_main_files_exist(self):
        """Vérifie que les fichiers principaux existent"""
        # Vérifier que les fichiers principaux existent
        main_files = [
            'index.html',
            'dashboard.html',
            'login.html',
            'assets/css/style.css',
            'assets/js/script.js'
        ]
        
        for file_path in main_files:
            self.assertTrue(os.path.exists(file_path), f"Le fichier {file_path} n'existe pas")
    
    def test_homepage_content(self):
        """Vérifie que la page d'accueil contient le contenu attendu"""
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Vérifier que le contenu principal est présent
        self.assertIn('<title>KAEL - Assistant IA Professionnel</title>', content)
        self.assertIn('class="header"', content)
        self.assertIn('class="hero"', content)
        self.assertIn('class="features-section"', content)
        self.assertIn('class="about-section"', content)
        self.assertIn('class="testimonials-section"', content)
        self.assertIn('class="stats-section"', content)
        self.assertIn('class="contact-section"', content)
        self.assertIn('class="footer"', content)
    
    def test_dashboard_content(self):
        """Vérifie que la page du tableau de bord contient le contenu attendu"""
        with open('dashboard.html', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Vérifier que le contenu du tableau de bord est présent
        self.assertIn('<title>Tableau de Bord - Kael</title>', content)
        self.assertIn('class="header"', content)
        self.assertIn('class="dashboard-section"', content)
        self.assertIn('class="dashboard-card"', content)
        self.assertIn('class="stats-grid"', content)
        self.assertIn('class="activity-list"', content)
        self.assertIn('class="todo-list"', content)
        self.assertIn('class="footer"', content)
    
    def test_login_content(self):
        """Vérifie que la page de connexion contient le contenu attendu"""
        with open('login.html', 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Vérifier que le contenu de la page de connexion est présent
        self.assertIn('<title>Connexion - Kael</title>', content)
        self.assertIn('class="header"', content)
        self.assertIn('class="login-section"', content)
        self.assertIn('class="login-form"', content)
        self.assertIn('class="login-sidebar"', content)
        self.assertIn('class="footer"', content)
    
    def test_css_exists(self):
        """Vérifie que le fichier CSS existe et contient du contenu"""
        css_path = 'assets/css/style.css'
        self.assertTrue(os.path.exists(css_path))
        
        with open(css_path, 'r', encoding='utf-8') as f:
            css_content = f.read()
            
        # Vérifier que le CSS contient des règles de base
        self.assertGreater(len(css_content), 1000, "Le fichier CSS semble trop petit")
        self.assertIn('body {', css_content)
        self.assertIn('.header {', css_content)
        self.assertIn('.btn {', css_content)
        self.assertIn('.feature-card {', css_content)
    
    def test_js_exists(self):
        """Vérifie que le fichier JS existe et contient du contenu"""
        js_path = 'assets/js/script.js'
        self.assertTrue(os.path.exists(js_path))
        
        with open(js_path, 'r', encoding='utf-8') as f:
            js_content = f.read()
            
        # Vérifier que le JS contient des fonctions de base
        self.assertGreater(len(js_content), 100, "Le fichier JS semble trop petit")
        self.assertIn('DOMContentLoaded', js_content)
        self.assertIn('addEventListener', js_content)
        self.assertIn('function initKaelAnimations', js_content)
        
    def test_app_py_exists(self):
        """Vérifie que le fichier app.py existe"""
        self.assertTrue(os.path.exists('app.py'))
        
    def test_requirements_exist(self):
        """Vérifie que les fichiers de dépendances existent"""
        self.assertTrue(os.path.exists('requirements.txt'))
        self.assertTrue(os.path.exists('requirements-dev.txt'))

if __name__ == '__main__':
    # Exécuter les tests
    unittest.main()