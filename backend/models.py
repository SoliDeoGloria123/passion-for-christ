from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from backend.database import Base
import datetime

# Modelo simple para visitas (puede ser extendido para más métricas)
class Visit(Base):
	__tablename__ = "visits"
	id = Column(Integer, primary_key=True, index=True)
	path = Column(String(100))
	timestamp = Column(DateTime, default=datetime.datetime.utcnow)

# Modelo de usuario para autenticación y roles
class User(Base):
	__tablename__ = "users"
	id = Column(Integer, primary_key=True, index=True)
	username = Column(String(50), unique=True, index=True, nullable=False)
	hashed_password = Column(String(128), nullable=False)
	is_active = Column(Integer, default=1)
	role = Column(String(20), default="editor")  # admin/editor
	totp_secret = Column(String(32), nullable=True)  # Secreto TOTP para 2FA

class Question(Base):
	__tablename__ = "questions"
	id = Column(Integer, primary_key=True, index=True)
	question = Column(Text, nullable=False)
	answer = Column(Text)
	status = Column(String(20), default="pendiente")
	created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Article(Base):
	__tablename__ = "articles"
	id = Column(Integer, primary_key=True, index=True)
	title = Column(String(200), nullable=False)
	summary = Column(String(500))
	content = Column(Text)
	author = Column(String(100))
	created_at = Column(DateTime, default=datetime.datetime.utcnow)
	tags = Column(String(200))
