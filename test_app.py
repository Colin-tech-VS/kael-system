import pytest
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
    assert response.get_json()['status'] == 'healthy'

def test_static_files(client):
    """Test l'accès aux fichiers statiques"""
    # Test avec un fichier HTML
    response = client.get('/index.html')
    assert response.status_code == 200
    
    # Test avec un fichier CSS
    response = client.get('/css/style.css')
    assert response.status_code == 200