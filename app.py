from flask import Flask, send_from_directory, Response
import os
import logging
import sys
import traceback
import time

# Configurer le logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration pour servir les fichiers statiques
STATIC_FOLDER = 'src'

def read_html_file(filename):
    """Lire un fichier HTML et le renvoyer"""
    try:
        file_path = os.path.join(STATIC_FOLDER, filename)
        # Sécurité : empêcher l'accès à des fichiers en dehors du dossier statique
        abs_path = os.path.abspath(file_path)
        abs_static = os.path.abspath(STATIC_FOLDER)
        
        if not abs_path.startswith(abs_static):
            logger.warning(f"Tentative d'accès à un fichier en dehors du dossier statique: {filename}")
            return "Accès non autorisé", 403
            
        if os.path.exists(file_path) and os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return Response(content, mimetype='text/html')
        else:
            logger.warning(f"Fichier non trouvé: {filename}")
            return "Fichier non trouvé", 404
    except Exception as e:
        logger.error(f"Erreur lors de la lecture du fichier {filename}: {str(e)}")
        logger.debug(traceback.format_exc())
        return "Erreur interne du serveur", 500

@app.route('/')
def home():
    try:
        logger.info("Accès à la page d'accueil")
        return read_html_file('index.html')
    except Exception as e:
        logger.error(f"Erreur lors du rendu de la page d'accueil: {str(e)}")
        logger.debug(traceback.format_exc())
        return "Erreur interne du serveur", 500

@app.route('/<path:filename>')
def serve_static(filename):
    """Servir tous les autres fichiers statiques"""
    try:
        logger.info(f"Accès au fichier: {filename}")
        # Si c'est un fichier HTML, le lire directement
        if filename.endswith('.html'):
            return read_html_file(filename)
        else:
            # Pour les autres types de fichiers, utiliser send_from_directory
            # Vérification de sécurité : ne permettre que les fichiers dans le dossier statique
            safe_path = os.path.normpath(filename)
            if safe_path.startswith('..') or safe_path.startswith('/'):
                logger.warning(f"Tentative d'accès à un fichier avec chemin non sécurisé: {filename}")
                return "Accès non autorisé", 403
                
            # Vérifier que le fichier existe bien dans le dossier statique
            full_path = os.path.join(STATIC_FOLDER, safe_path)
            abs_full_path = os.path.abspath(full_path)
            abs_static = os.path.abspath(STATIC_FOLDER)
            
            if not abs_full_path.startswith(abs_static):
                logger.warning(f"Tentative d'accès à un fichier en dehors du dossier statique: {filename}")
                return "Accès non autorisé", 403
                
            if os.path.exists(full_path) and os.path.isfile(full_path):
                return send_from_directory(STATIC_FOLDER, safe_path)
            else:
                logger.warning(f"Fichier non trouvé: {filename}")
                return "Fichier non trouvé", 404
    except Exception as e:
        logger.error(f"Erreur lors du rendu du fichier {filename}: {str(e)}")
        logger.debug(traceback.format_exc())
        return "Erreur interne du serveur", 500

@app.route('/health')
def health():
    """Endpoint de santé pour les checks de déploiement"""
    try:
        logger.info("Health check effectué")
        # Ajout d'une vérification supplémentaire pour s'assurer que l'application est vraiment opérationnelle
        start_time = time.time()
        # Effectuer une petite opération pour vérifier la stabilité
        _ = str(time.time())
        end_time = time.time()
        
        if end_time - start_time > 1.0:  # Si cela prend plus de 1 seconde, c'est problématique
            logger.warning("Health check trop lent")
            return {"status": "unhealthy", "message": "Application trop lente"}, 500
        
        return {"status": "healthy"}, 200
    except Exception as e:
        logger.error(f"Erreur lors du health check: {str(e)}")
        logger.debug(traceback.format_exc())
        return {"status": "unhealthy", "message": str(e)}, 500

# Gestion des erreurs globales
@app.errorhandler(404)
def not_found(error):
    logger.warning(f"404 - Ressource non trouvée: {request.path}")
    return "Page non trouvée", 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Erreur interne du serveur: {str(error)}")
    logger.debug(traceback.format_exc())
    return "Erreur interne du serveur", 500

# Ajout de la gestion de la requête pour le handler d'erreur 404
from flask import request

if __name__ == '__main__':
    # Utiliser un port spécifique pour éviter les conflits
    port = int(os.environ.get('PORT', 8000))
    logger.info(f"Démarrage du serveur sur le port {port}")
    try:
        app.run(debug=False, host='0.0.0.0', port=port, threaded=True)
    except Exception as e:
        logger.error(f"Erreur critique au démarrage du serveur: {str(e)}")
        logger.debug(traceback.format_exc())
        sys.exit(1)