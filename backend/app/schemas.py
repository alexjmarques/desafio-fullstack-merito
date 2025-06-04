from app.models import Fund, Transaction
from app.extensions import ma
from marshmallow import fields

class FundSchema(ma.SQLAlchemyAutoSchema):
    share_value = fields.Float()
    
    class Meta:
        model = Fund
        load_instance = True

class TransactionSchema(ma.SQLAlchemyAutoSchema):
    amount = fields.Float()
    share_qty = fields.Float()

    class Meta:
        model = Transaction
        include_fk = True
        load_instance = True
