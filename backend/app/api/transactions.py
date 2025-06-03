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

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument("date", required=True, type=str)
parser.add_argument("amount", required=True, type=float)
parser.add_argument("share_qty", required=True, type=float)
parser.add_argument("tx_type", required=True, choices=("APORTE", "RESGATE"))
parser.add_argument("fund_id", required=True, type=int)

class TransactionsResource(Resource):
    def get(self):
        txs = Transaction.query.order_by(Transaction.date.desc()).all()
        return list_schema.dump(txs), 200

    def post(self):
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

api.add_resource(TransactionsResource, "/transactions")
