"""Changed order type

Revision ID: a7a539822f9e
Revises: eb219c1ab270
Create Date: 2022-12-14 11:26:32.088747

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'a7a539822f9e'
down_revision = 'eb219c1ab270'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('questionnaireanswer_ibfk_1', 'questionnaireanswer', type_='foreignkey')
    op.create_foreign_key(None, 'questionnaireanswer', 'questionnairequestion', ['question_id'], ['id'])
    op.alter_column('questionnairequestion', 'order',
               existing_type=mysql.TEXT(),
               type_=sa.Integer(),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('questionnairequestion', 'order',
               existing_type=sa.Integer(),
               type_=mysql.TEXT(),
               existing_nullable=False)
    op.drop_constraint(None, 'questionnaireanswer', type_='foreignkey')
    op.create_foreign_key('questionnaireanswer_ibfk_1', 'questionnaireanswer', 'questionnaireanswer', ['question_id'], ['id'])
    # ### end Alembic commands ###
