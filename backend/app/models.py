from datetime import date
from app.extensions import db

class Fund(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(120), nullable=False)
    ticker      = db.Column(db.String(20), unique=True, nullable=False)
    fund_type   = db.Column(db.String(40), nullable=False)
    share_value = db.Column(db.Float(12, 2), nullable=False)

class Transaction(db.Model):
    id        = db.Column(db.Integer, primary_key=True)
    date      = db.Column(db.Date, default=date.today, nullable=False)
    amount    = db.Column(db.Float(14, 2), nullable=False)
    share_qty = db.Column(db.Numeric(14, 4), nullable=False)
    tx_type   = db.Column(db.Enum('APORTE', 'RESGATE', name='tx_type'), nullable=False)
    fund_id   = db.Column(db.Integer, db.ForeignKey('fund.id'), nullable=False)
    fund      = db.relationship(Fund, backref='transactions')
