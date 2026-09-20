"""
Tests basiques pour vérifier que la page d'accueil se charge et que le tableau de bord est accessible
"""
import unittest
import os
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestKaelWebsite(unittest.TestCase):
    
    def setUp(self):
        """Configuration initiale des tests"""
        # Configuration pour Chrome headless
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.driver.implicitly_wait(10)
        
    def tearDown(self):
        """Nettoyage après les tests"""
        self.driver.quit()
    
    def test_homepage_loads_successfully(self):
        """Test que la page d'accueil se charge correctement"""
        self.driver.get("http://localhost:8000")
        
        # Vérifier que la page contient le titre attendu
        title = self.driver.title
        self.assertIn("KAEL", title)
        
        # Vérifier que le contenu principal est présent
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "header"))
            )
            self.assertTrue(self.driver.find_element(By.TAG_NAME, "header"))
        except:
            self.fail("La page d'accueil ne charge pas correctement")
    
    def test_dashboard_accessibility(self):
        """Test que le tableau de bord est accessible"""
        self.driver.get("http://localhost:8000/dashboard.html")
        
        # Vérifier que la page du tableau de bord contient le titre attendu
        title = self.driver.title
        self.assertIn("Tableau de Bord", title)
        
        # Vérifier que les éléments principaux sont présents
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "dashboard-card"))
            )
            dashboard_cards = self.driver.find_elements(By.CLASS_NAME, "dashboard-card")
            self.assertGreater(len(dashboard_cards), 0, "Aucune carte de tableau de bord trouvée")
        except:
            self.fail("Le tableau de bord ne se charge pas correctement")
    
    def test_login_page_accessibility(self):
        """Test que la page de connexion est accessible"""
        self.driver.get("http://localhost:8000/login.html")
        
        # Vérifier que la page de connexion contient le titre attendu
        title = self.driver.title
        self.assertIn("Connexion", title)
        
        # Vérifier que le formulaire de connexion est présent
        try:
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, "loginForm"))
            )
            login_form = self.driver.find_element(By.ID, "loginForm")
            self.assertIsNotNone(login_form)
        except:
            self.fail("La page de connexion ne se charge pas correctement")

if __name__ == "__main__":
    # Exécuter les tests
    unittest.main()