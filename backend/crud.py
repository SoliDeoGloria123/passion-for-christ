from passlib.context import CryptContext
# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_user_by_username(db: Session, username: str):
	return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
	hashed_password = pwd_context.hash(user.password)
	db_user = models.User(username=user.username, hashed_password=hashed_password, role=user.role)
	db.add(db_user)
	db.commit()
	db.refresh(db_user)
	return db_user

def verify_password(plain_password, hashed_password):
	return pwd_context.verify(plain_password, hashed_password)
def get_questions(db: Session, skip: int = 0, limit: int = 10):
	return db.query(models.Question).offset(skip).limit(limit).all()

def get_question(db: Session, question_id: int):
	return db.query(models.Question).filter(models.Question.id == question_id).first()

def create_question(db: Session, question: schemas.QuestionCreate):
	db_question = models.Question(**question.dict())
	db.add(db_question)
	db.commit()
	db.refresh(db_question)
	return db_question
from sqlalchemy.orm import Session
from . import models, schemas

def get_articles(db: Session, skip: int = 0, limit: int = 10):
	return db.query(models.Article).offset(skip).limit(limit).all()

def get_article(db: Session, article_id: int):
	return db.query(models.Article).filter(models.Article.id == article_id).first()

def create_article(db: Session, article: schemas.ArticleCreate):
	db_article = models.Article(**article.dict())
	db.add(db_article)
	db.commit()
	db.refresh(db_article)
	return db_article
