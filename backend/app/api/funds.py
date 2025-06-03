
from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from app.models import db, Fund
from app.schemas import FundSchema

bp = Blueprint("funds", __name__)
api = Api(bp)
schema = FundSchema()
list_schema = FundSchema(many=True)

_parser = reqparse.RequestParser(bundle_errors=True)
for field in ("name", "ticker", "fund_type"):
    _parser.add_argument(field, required=True, type=str)
_parser.add_argument("share_value", required=True, type=float)

class FundsResource(Resource):
    def get(self):
        """
        Listar fundos
        ---
        tags:
          - Fundos
        responses:
          200:
            description: OK
        """
        funds = Fund.query.all()
        return list_schema.dump(funds), 200


    def post(self):
        """
        Criar um fundo
        ---
        tags:
          - Fundos
        responses:
          201:
            description: Criado com sucesso
        """
        args = _parser.parse_args()
        fund = Fund(**args)
        db.session.add(fund)
        db.session.commit()


class FundDetailResource(Resource):
    def get(self, id):
        """
        Detalhes do fundo
        ---
        tags:
          - Fundos
        responses:
          200:
            description: OK
        """
        fund = Fund.query.get_or_404(id)
        return schema.dump(fund)

    def put(self, id):
        """
        Atualizar um fundo
        ---
        tags:
          - Fundos
        responses:
          200:
            description: Atualizado com sucesso
        """
        fund = Fund.query.get_or_404(id)
        args = _parser.parse_args()
        for k, v in args.items():
            setattr(fund, k, v)
        db.session.commit()
        return schema.dump(fund), 200

    def delete(self, id):
        """
        Deletar um fundo
        ---
        tags:
        - Fundos
        responses:
        204:
            description: Deletado com sucesso
        404:
            description: Fundo não encontrado
        """
        fund = Fund.query.get_or_404(id)
        db.session.delete(fund)
        db.session.commit()


api.add_resource(FundsResource, "/funds")
api.add_resource(FundDetailResource, "/funds/<int:id>")
