import pytest
import os
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    """Test la page d'accueil"""
    response = client.get('/')
    assert response.status_code == 200

def test_health_endpoint(client):
    """Test l'endpoint de santé"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'

def test_api_health_endpoint(client):
    """Test l'endpoint de santé API"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'timestamp' in data

def test_static_files(client):
    """Test l'accès aux fichiers statiques"""
    # Test avec un fichier HTML
    response = client.get('/index.html')
    assert response.status_code == 200
    
    # Test avec un fichier CSS
    response = client.get('/css/style.css')
    assert response.status_code == 200

def test_nonexistent_file(client):
    """Test l'accès à un fichier inexistant"""
    response = client.get('/nonexistent.html')
    assert response.status_code == 404

def test_security_access(client):
    """Test la sécurité d'accès aux fichiers"""
    # Tentative d'accès à un fichier en dehors du dossier statique
    response = client.get('/../etc/passwd')
    assert response.status_code == 403

def test_health_endpoint_detailed(client):
    """Test détaillé de l'endpoint de santé"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert 'status' in data
    assert data['status'] == 'healthy'
    
    # Vérifier que l'application répond rapidement
    import time
    start = time.time()
    response = client.get('/health')
    end = time.time()
    assert end - start < 1.0  # Doit répondre en moins de 1 seconde

def test_404_handling(client):
    """Test la gestion des erreurs 404"""
    response = client.get('/this-page-does-not-exist')
    assert response.status_code == 404

def test_api_health_structure(client):
    """Test la structure de l'endpoint API health"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert 'status' in data
    assert 'timestamp' in data
    assert data['status'] == 'healthy'