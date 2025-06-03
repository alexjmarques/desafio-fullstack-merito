from sqlalchemy import func
from app.models import db, Fund, Transaction

def wallet_summary():
    sub = db.session.query(
        Transaction.fund_id,
        func.sum(Transaction.amount).label('money'),
        func.sum(Transaction.share_qty).label('shares')
    ).group_by(Transaction.fund_id).subquery()

    rows = db.session.query(Fund, sub.c.money, sub.c.shares) \
                     .outerjoin(sub, Fund.id == sub.c.fund_id).all()

    total = sum(r.money or 0 for _, r.money, _ in rows)
    return {
        "total_balance": float(total),
        "funds": [
            {
                "ticker": f.ticker,
                "shares": float(sh or 0),
                "market_value": float((sh or 0) * f.share_value)
            } for f, _, sh in rows
        ]
    }
