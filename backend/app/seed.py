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
        Fund(name="CSHG Renda Urbana", ticker="HGRU11", fund_type="Fundo Imobiliário", share_value=134.50),
        Fund(name="Santander Papéis Imobiliários", ticker="SADI11", fund_type="Fundo Imobiliário", share_value=99.30),
        Fund(name="Bresco Logística", ticker="BRCO12", fund_type="Fundo Imobiliário", share_value=92.65),
        Fund(name="Fundo ABC", ticker="ABCD11", fund_type="Fundo Imobiliário", share_value=120.00),
        Fund(name="Fundo EFG", ticker="EFGH11", fund_type="Fundo Imobiliário", share_value=130.00),
        Fund(name="Fundo IJK", ticker="IJKL11", fund_type="Fundo Imobiliário", share_value=140.00),
        Fund(name="Fundo MNO", ticker="MNOP11", fund_type="Fundo Imobiliário", share_value=150.00),
        Fund(name="Fundo QRS", ticker="QRST11", fund_type="Fundo Imobiliário", share_value=160.00),
        Fund(name="Fundo UVW", ticker="UVWX11", fund_type="Fundo Imobiliário", share_value=170.00),
        Fund(name="Fundo XYZ", ticker="YZAB11", fund_type="Fundo Imobiliário", share_value=180.00),
        Fund(name="Hedge Top FOFII", ticker="HFOF11", fund_type="Fundo Imobiliário", share_value=89.00),
    ]

    db.session.bulk_save_objects(funds)
    db.session.commit()
    print("» Fundos inseridos com sucesso.")
