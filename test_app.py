import pytest
from flask import url_for
from app import app, read_html_file
import os

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    """Test de la page d'accueil"""
    response = client.get('/')
    assert response.status_code == 200
    assert b'KAEL System' in response.data

def test_health_endpoint(client):
    """Test de l'endpoint de santé"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'

def test_api_health_endpoint(client):
    """Test de l'endpoint de santé API"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'
    assert 'timestamp' in data

def test_static_files(client):
    """Test de la lecture de fichiers statiques"""
    # Test d'un fichier HTML existant
    response = client.get('/index.html')
    assert response.status_code == 200
    assert b'KAEL System' in response.data

def test_nonexistent_file(client):
    """Test d'accès à un fichier inexistant"""
    response = client.get('/nonexistent.html')
    assert response.status_code == 404

def test_security_access(client):
    """Test de la sécurité d'accès aux fichiers"""
    # Tentative d'accès à un fichier en dehors du dossier statique
    response = client.get('/../secret.txt')
    assert response.status_code == 403

def test_health_endpoint_detailed(client):
    """Test détaillé de l'endpoint de santé"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert 'status' in data
    assert data['status'] == 'healthy'

def test_404_handling(client):
    """Test de la gestion des erreurs 404"""
    response = client.get('/this-page-does-not-exist')
    assert response.status_code == 404

def test_api_health_structure(client):
    """Test de la structure de l'endpoint de santé API"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert 'status' in data
    assert 'timestamp' in data
    assert data['status'] == 'healthy'

def test_read_html_file_success():
    """Test de la fonction read_html_file avec succès"""
    result = read_html_file('index.html')
    # La fonction peut retourner soit un Response Flask, soit un tuple (erreur)
    # Si c'est un tuple, c'est une erreur
    if isinstance(result, tuple):
        assert len(result) == 2
        assert result[1] == 200
    else:
        # C'est un Response Flask
        assert hasattr(result, 'status_code')
        assert result.status_code == 200

def test_read_html_file_not_found():
    """Test de la fonction read_html_file avec fichier non trouvé"""
    result = read_html_file('nonexistent.html')
    # La fonction peut retourner soit un Response Flask, soit un tuple (erreur)
    # Si c'est un tuple, c'est une erreur
    if isinstance(result, tuple):
        assert len(result) == 2
        assert result[1] == 404
    else:
        # C'est un Response Flask
        assert hasattr(result, 'status_code')
        assert result.status_code == 404

def test_read_html_file_security():
    """Test de la fonction read_html_file avec tentative de sécurité"""
    result = read_html_file('../secret.txt')
    # La fonction peut retourner soit un Response Flask, soit un tuple (erreur)
    # Si c'est un tuple, c'est une erreur
    if isinstance(result, tuple):
        assert len(result) == 2
        assert result[1] == 403
    else:
        # C'est un Response Flask
        assert hasattr(result, 'status_code')
        assert result.status_code == 403