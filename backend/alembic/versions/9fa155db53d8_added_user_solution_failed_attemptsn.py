"""Added user solution failed attemptsn

Revision ID: 9fa155db53d8
Revises: 943cf797c278
Create Date: 2021-10-11 22:32:46.315055

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fa155db53d8'
down_revision = '943cf797c278'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('usersolution', sa.Column('failed_attempts', sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('usersolution', 'failed_attempts')
    # ### end Alembic commands ###
