from flask import Blueprint
from flask_restful import Api, Resource, reqparse
from flasgger import swag_from
from app.extensions import db
from app.models import Transaction, Fund
from app.schemas import TransactionSchema

bp = Blueprint("transactions", __name__)
api = Api(bp)

schema = TransactionSchema()
list_schema = TransactionSchema(many=True)

from datetime import datetime

def parse_date(value):
    return datetime.strptime(value, "%Y-%m-%d").date()

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument("date", required=True, type=parse_date)
parser.add_argument("amount", required=True, type=float)
parser.add_argument("share_qty", required=True, type=float)
parser.add_argument("tx_type", required=True, choices=("APORTE", "RESGATE"))
parser.add_argument("fund_id", required=True, type=int)


class TransactionsResource(Resource):
    def get(self):
        """
        Listar todas as transações
        ---
        tags:
          - Transações
        responses:
          200:
            description: Listado com sucesso
        """
        txs = Transaction.query.order_by(Transaction.date.desc()).all()
        return list_schema.dump(txs), 200

    def post(self):
      """
          Criar uma transação
          ---
          tags:
            - Transações
          responses:
            200:
              description: Criado com sucesso
      """
      try:
          args = parser.parse_args()

          if args["tx_type"] == "RESGATE":
              fund = Fund.query.get_or_404(args["fund_id"])
              current = db.session.query(
                  db.func.sum(Transaction.share_qty)
              ).filter_by(fund_id=fund.id).scalar() or 0
              if args["share_qty"] > current:
                  return {"error": "Cotas insuficientes"}, 400

          tx = Transaction(**args)
          db.session.add(tx)
          db.session.commit()
          return schema.dump(tx), 201

      except Exception as e:
          import traceback
          traceback.print_exc()
          return {"error": str(e)}, 500


api.add_resource(TransactionsResource, "/transactions")
