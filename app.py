from flask import Flask, send_from_directory, Response
import os
import logging

# Configurer le logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuration pour servir les fichiers statiques
STATIC_FOLDER = 'src'

def read_html_file(filename):
    """Lire un fichier HTML et le renvoyer"""
    try:
        file_path = os.path.join(STATIC_FOLDER, filename)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return Response(content, mimetype='text/html')
        else:
            return "Fichier non trouvé", 404
    except Exception as e:
        logger.error(f"Erreur lors de la lecture du fichier {filename}: {e}")
        return "Erreur interne du serveur", 500

@app.route('/')
def home():
    try:
        logger.info("Accès à la page d'accueil")
        return read_html_file('index.html')
    except Exception as e:
        logger.error(f"Erreur lors du rendu de la page d'accueil: {e}")
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
            return send_from_directory(STATIC_FOLDER, filename)
    except Exception as e:
        logger.error(f"Erreur lors du rendu du fichier {filename}: {e}")
        return "Erreur interne du serveur", 500

@app.route('/health')
def health():
    """Endpoint de santé pour les checks de déploiement"""
    logger.info("Health check effectué")
    return {"status": "healthy"}, 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    logger.info(f"Démarrage du serveur sur le port {port}")
    app.run(debug=False, host='0.0.0.0', port=port)