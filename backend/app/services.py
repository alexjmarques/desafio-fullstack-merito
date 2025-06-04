from app.models import Fund, Transaction
from sqlalchemy import case, func
from app.extensions import db

def wallet_summary():
    result = db.session.query(
        Fund,
        func.sum(
            case(
                (Transaction.tx_type == 'APORTE', Transaction.share_qty),
                else_=0
            )
        ).label("total_contributions"),
        func.sum(
            case(
                (Transaction.tx_type == 'RESGATE', Transaction.share_qty),
                else_=0
            )
        ).label("total_redemptions")
    ).join(Transaction, Transaction.fund_id == Fund.id) \
     .group_by(Fund.id).all()

    total = 0
    total_aporte = 0
    total_resgate = 0
    fundos = []

    for fund, aporte_qty, resgate_qty in result:
        aporte_qty = float(aporte_qty or 0)
        resgate_qty = float(resgate_qty or 0)
        saldo_qty = aporte_qty - resgate_qty
        valor = saldo_qty * float(fund.share_value)

        total += valor
        total_aporte += aporte_qty * float(fund.share_value)
        total_resgate += resgate_qty * float(fund.share_value)

        fundos.append({
            "id": fund.id,
            "name": fund.name,
            "ticker": fund.ticker,
            "share_value": float(fund.share_value),
            "share_qty": saldo_qty
        })

    return {
        "total_balance": round(total, 2),
        "total_contributions": round(total_aporte, 2),
        "total_redemptions": round(total_resgate, 2),
        "funds": fundos
    }
