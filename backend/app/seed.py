from app.extensions import db
from app.models import Fund

def seed_data():
    if Fund.query.first():
        print("» Fundos já existem. Seed ignorado.")
        return

    print("» Inserindo fundos de exemplo...")

    funds = [
        Fund(name="XP Malls", ticker="XPML11", fund_type="Fundo Imobiliário", share_value=109.80),
        Fund(name="Vinci Shopping Centers", ticker="VISC11", fund_type="Fundo Imobiliário", share_value=126.88),
        Fund(name="BTG Pactual Corporate Office", ticker="BRCO11", fund_type="Fundo Imobiliário", share_value=89.75),
        Fund(name="BTG Pactual Logística", ticker="BTLG11", fund_type="Fundo Imobiliário", share_value=117.00),
    ]

    db.session.bulk_save_objects(funds)
    db.session.commit()
    print("» Fundos inseridos com sucesso.")
