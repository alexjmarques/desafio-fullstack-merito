from flask import Flask
from app.extensions import db, ma, migrate
from app.api.funds import bp as funds_bp
from app.api.transactions import bp as tx_bp
from app.api.wallet import bp as wallet_bp
from flasgger import Swagger

def create_app(config_name: str = "dev") -> Flask:
    app = Flask(__name__)
    app.config.from_object(f"app.config.{config_name.capitalize()}Config")

    # extensões …
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)

    # blueprints …
    app.register_blueprint(funds_bp)
    app.register_blueprint(tx_bp)
    app.register_blueprint(wallet_bp)

    # ---------- Swagger ----------
    swagger_template = {
        "info": {
            "title": "Dashboard de Investimento API",
            "version": "1.0.0",
            "description": "Endpoints para fundos, movimentações e saldo."
        },
        "servers": [
            {"url": "http://localhost:8000", "description": "Local"}
        ]
    }


    swagger_config = Swagger.DEFAULT_CONFIG.copy()
    swagger_config.update({"specs_route": "/docs/"})

    Swagger(
        app,
        template=swagger_template,
        config=swagger_config,
        parse=True
    )
    return app
