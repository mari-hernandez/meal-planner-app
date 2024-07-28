from dotenv import load_dotenv
import os

load_dotenv()  # Cargar variables de entorno desde .env

# Configuración de Flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['PREFERRED_URL_SCHEME'] = 'http'  # Needed to set STRICT_SLASHES
    app.config['STRICT_SLASHES'] = False  # Disable redirect for now

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Configurar CORS manualmente
    @app.after_request
    def add_cors_headers(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        return response

    # Registro de Blueprints y otras configuraciones
    from .views.auth import auth_bp
    from .views.recipes import recipes_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(recipes_bp, url_prefix='/recipe')

    return app
