"""autogenerate migrations

Revision ID: 5eacac4b7ea5
Revises: db6e2cc505ed
Create Date: 2025-06-03 18:59:08.374153

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5eacac4b7ea5'
down_revision = 'db6e2cc505ed'
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
