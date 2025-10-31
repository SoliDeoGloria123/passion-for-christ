class UserBase(BaseModel):
	username: str
	role: str = "editor"
	is_active: bool = True
	totp_secret: Optional[str] = None

class UserCreate(UserBase):
	password: str

class User(UserBase):
	id: int
	class Config:
		orm_mode = True

class Token(BaseModel):
	access_token: str | None
	token_type: str

class TokenData(BaseModel):
	username: str | None = None
class QuestionBase(BaseModel):
	question: str
	answer: Optional[str] = None
	status: Optional[str] = "pendiente"

class QuestionCreate(QuestionBase):
	pass

class Question(QuestionBase):
	id: int
	created_at: datetime

	class Config:
		orm_mode = True
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ArticleBase(BaseModel):
	title: str
	summary: Optional[str] = None
	content: Optional[str] = None
	author: Optional[str] = None
	tags: Optional[str] = None

class ArticleCreate(ArticleBase):
	pass

class Article(ArticleBase):
	id: int
	created_at: datetime

	class Config:
		orm_mode = True
