from flask import Blueprint
from flask_restful import Api, Resource
from flasgger import swag_from
from app.services import wallet_summary

bp = Blueprint("wallet", __name__)
api = Api(bp)


class WalletSummaryResource(Resource):
    def get(self):
        """
        Resumo do saldo da carteira
        ---
        tags:
          - Carteira
        responses:
          200:
            description: Resumo do saldo da carteira
        """
        return wallet_summary(), 200


api.add_resource(WalletSummaryResource, "/wallet/summary")
