"""empty message

Revision ID: bfb5d7cf806d
Revises: 
Create Date: 2022-12-14 21:51:36.132894

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bfb5d7cf806d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=400), nullable=False),
    sa.Column('name', sa.String(length=400), nullable=False),
    sa.Column('last_name', sa.String(length=400), nullable=False),
    sa.Column('city', sa.String(length=400), nullable=False),
    sa.Column('hashed_password', sa.String(length=400), nullable=False),
    sa.Column('salt', sa.String(length=400), nullable=False),
    sa.Column('phone', sa.String(length=400), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('hashed_password'),
    sa.UniqueConstraint('salt')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###