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
    """Test l'endpoint health"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'

def test_api_health_endpoint(client):
    """Test l'endpoint health API"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'

def test_not_found_page(client):
    """Test une page qui n'existe pas"""
    response = client.get('/this-page-does-not-exist')
    assert response.status_code == 404