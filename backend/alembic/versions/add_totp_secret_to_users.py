revision = '0001_add_totp_secret'
down_revision = '0000_initial'
branch_labels = None
depends_on = None
"""
Revision script to add totp_secret column to users table for 2FA support.
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('users', sa.Column('totp_secret', sa.String(32), nullable=True))

def downgrade():
    op.drop_column('users', 'totp_secret')
