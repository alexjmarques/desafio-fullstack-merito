"""autogenerate migrations

Revision ID: 6a75b66f321f
Revises: a5dfd1cfcc45
Create Date: 2025-06-03 19:10:43.959748

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a75b66f321f'
down_revision = 'a5dfd1cfcc45'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('fund', schema=None) as batch_op:
        batch_op.alter_column('share_value',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=12, asdecimal=2),
               existing_nullable=False)

    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.alter_column('amount',
               existing_type=sa.REAL(),
               type_=sa.Float(precision=14, asdecimal=2),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.alter_column('amount',
               existing_type=sa.Float(precision=14, asdecimal=2),
               type_=sa.REAL(),
               existing_nullable=False)

    with op.batch_alter_table('fund', schema=None) as batch_op:
        batch_op.alter_column('share_value',
               existing_type=sa.Float(precision=12, asdecimal=2),
               type_=sa.REAL(),
               existing_nullable=False)

    # ### end Alembic commands ###
