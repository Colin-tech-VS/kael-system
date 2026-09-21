from app import app
import pytest

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    """Test de la page d'accueil"""
    response = client.get('/')
    assert response.status_code == 200
    # Vérifier le nouveau titre (sans accents pour éviter les erreurs de parsing)
    assert b'K.A.E.L. - Une intelligence. Un' in response.data

def test_health_endpoint(client):
    """Test de l'endpoint de santé"""
    response = client.get('/health')
    assert response.status_code == 200
    assert response.get_json()['status'] == 'healthy'

def test_api_health_endpoint(client):
    """Test de l'endpoint de santé API"""
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.get_json()['status'] == 'healthy'
    # L'endpoint API health retourne un timestamp
    assert 'timestamp' in response.get_json()

def test_static_files(client):
    """Test de la lecture de fichiers statiques"""
    # Test d'un fichier HTML existant
    response = client.get('/index.html')
    assert response.status_code == 200
    # Vérifier le nouveau titre (sans accents pour éviter les erreurs de parsing)
    assert b'K.A.E.L. - Une intelligence. Un' in response.data

def test_nonexistent_file(client):
    """Test d'un fichier inexistant"""
    response = client.get('/nonexistent.html')
    assert response.status_code == 404

def test_security_access(client):
    """Test de la sécurité d'accès"""
    response = client.get('/../etc/passwd')
    assert response.status_code == 403

def test_health_endpoint_detailed(client):
    """Test détaillé de l'endpoint de santé"""
    response = client.get('/health')
    data = response.get_json()
    assert data['status'] == 'healthy'
    # L'endpoint /health ne retourne pas de timestamp, donc on ne teste pas cette clé

def test_404_handling(client):
    """Test de la gestion des 404"""
    response = client.get('/this-page-does-not-exist')
    assert response.status_code == 404

def test_api_health_structure(client):
    """Test de la structure de l'endpoint API health"""
    response = client.get('/api/health')
    data = response.get_json()
    assert 'status' in data
    assert 'timestamp' in data

def test_read_html_file_success(client):
    """Test de lecture réussie d'un fichier HTML"""
    response = client.get('/index.html')
    assert response.status_code == 200
    assert b'<!DOCTYPE html>' in response.data

def test_read_html_file_not_found(client):
    """Test de lecture d'un fichier HTML inexistant"""
    response = client.get('/nonexistent.html')
    assert response.status_code == 404

def test_read_html_file_security(client):
    """Test de sécurité de lecture de fichier"""
    response = client.get('/../app.py')
    assert response.status_code == 403

def test_dashboard_access(client):
    """Test d'accès au tableau de bord"""
    response = client.get('/dashboard')
    assert response.status_code == 200

def test_login_access(client):
    """Test d'accès à la page de connexion"""
    response = client.get('/login')
    assert response.status_code == 200