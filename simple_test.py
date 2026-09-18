#!/usr/bin/env python3

import subprocess
import sys
import time

def test_application_startup():
    """Test le démarrage de l'application"""
    try:
        # Tester l'import de l'application
        result = subprocess.run([sys.executable, "-c", "from app import app; print('SUCCESS: App imported')"], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print("✓ Import de l'application : OK")
        else:
            print("✗ Import de l'application : FAILED")
            print(result.stderr)
            return False
            
        # Tester l'endpoint health
        result = subprocess.run([sys.executable, "-c", """
import requests
from app import app
with app.test_client() as client:
    response = client.get('/health')
    print('HEALTH CHECK:', response.status_code, response.get_json())
"""], capture_output=True, text=True, timeout=10)
        
        if result.returncode == 0:
            print("✓ Endpoint health : OK")
        else:
            print("✗ Endpoint health : FAILED")
            print(result.stderr)
            return False
            
        return True
        
    except Exception as e:
        print(f"Erreur lors du test: {e}")
        return False

if __name__ == "__main__":
    print("Test de l'application Kael System...")
    success = test_application_startup()
    if success:
        print("\n✓ Tous les tests passent!")
        sys.exit(0)
    else:
        print("\n✗ Certains tests ont échoué!")
        sys.exit(1)