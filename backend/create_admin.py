import os
import sys
import bcrypt
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from database import SessionLocal
from models import User

def create_admin():
    db = SessionLocal()
    username = "admin"
    email = "admin@pfc.org"
    password = "admin123"
    hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(username=username, hashed_password=hashed, role="admin", is_active=1)
    db.add(user)
    db.commit()
    print(f"Usuario admin creado: {username} / {password}")

if __name__ == "__main__":
    create_admin()