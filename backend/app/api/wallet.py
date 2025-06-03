from flask import Blueprint
from flask_restful import Api, Resource
from flasgger import swag_from
from app.services import wallet_summary

bp = Blueprint("wallet", __name__)
api = Api(bp)


class WalletSummaryResource(Resource):
    def get(self):
        return wallet_summary(), 200


api.add_resource(WalletSummaryResource, "/wallet/summary")
