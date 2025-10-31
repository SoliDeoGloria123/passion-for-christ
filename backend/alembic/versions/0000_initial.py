revision = '0000_initial'
down_revision = None
branch_labels = None
depends_on = None
"""
Initial migration: create all tables for Passion For Christ project.
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('username', sa.String(50), unique=True, index=True, nullable=False),
        sa.Column('hashed_password', sa.String(128), nullable=False),
        sa.Column('is_active', sa.Integer, default=1),
        sa.Column('role', sa.String(20), default='editor'),
    )
    op.create_table(
        'questions',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('question', sa.Text, nullable=False),
        sa.Column('answer', sa.Text),
        sa.Column('status', sa.String(20), default='pendiente'),
        sa.Column('created_at', sa.DateTime),
    )
    op.create_table(
        'articles',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('title', sa.String(200), nullable=False),
        sa.Column('summary', sa.String(500)),
        sa.Column('content', sa.Text),
        sa.Column('author', sa.String(100)),
        sa.Column('created_at', sa.DateTime),
        sa.Column('tags', sa.String(200)),
    )
    op.create_table(
        'visits',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('path', sa.String(100)),
        sa.Column('timestamp', sa.DateTime),
    )

def downgrade():
    op.drop_table('visits')
    op.drop_table('articles')
    op.drop_table('questions')
    op.drop_table('users')
