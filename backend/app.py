
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, crud, auth
from .database import SessionLocal, engine
import pyotp

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Passion For Christ API", version="1.0.0")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def update_user(user_id: int, user: schemas.UserCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Solo administradores")
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    db_user.username = user.username
    db_user.hashed_password = crud.pwd_context.hash(user.password)
    db_user.role = user.role
    db.commit()
    db.refresh(db_user)
    return db_user
@app.post("/api/v1/metrics/visit", status_code=201, tags=["metrics"])
def register_visit(path: str, db: Session = Depends(get_db)):
    from .models import Visit
    v = Visit(path=path)
    db.add(v)
    db.commit()
    return {"ok": True}

@app.get("/api/v1/metrics/basic", tags=["metrics"])
def get_basic_metrics(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    from .models import Visit
    visits = db.query(Visit).count()
    articles = db.query(models.Article).count()
    questions = db.query(models.Question).count()
    return {"visits": visits, "articles": articles, "questions": questions}
@app.get("/api/v1/private/questions", response_model=list[schemas.Question], tags=["questions"])
def list_all_questions(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.get_questions(db, skip=0, limit=1000)

@app.put("/api/v1/questions/{question_id}/answer", response_model=schemas.Question, tags=["questions"])
def answer_question(question_id: int, answer: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    q = crud.get_question(db, question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")
    q.answer = answer
    q.status = "respondida"
    db.commit()
    db.refresh(q)
    return q

@app.delete("/api/v1/questions/{question_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["questions"])
def delete_question(question_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    q = crud.get_question(db, question_id)
    if not q:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")
    db.delete(q)
    db.commit()
    return
from fastapi import status
@app.post("/api/v1/questions", response_model=schemas.Question, status_code=status.HTTP_201_CREATED, tags=["questions"])
def create_question(question: schemas.QuestionCreate, db: Session = Depends(get_db)):
    return crud.create_question(db, question)
from backend import models, schemas, crud, auth
from fastapi.security import OAuth2PasswordRequestForm

@app.post("/api/v1/login", response_model=schemas.Token, tags=["auth"])
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    # Si el usuario tiene 2FA, requiere el código
    if user.totp_secret:
        return {"access_token": None, "token_type": "2fa-required"}
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Endpoint para login con 2FA
@app.post("/api/v1/login-2fa", response_model=schemas.Token, tags=["auth"])
def login_2fa(form_data: OAuth2PasswordRequestForm = Depends(), code: str = "", db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user or not user.totp_secret:
        raise HTTPException(status_code=400, detail="Credenciales o 2FA incorrectos")
    totp = pyotp.TOTP(user.totp_secret)
    if not totp.verify(code):
        raise HTTPException(status_code=400, detail="Código 2FA inválido")
    access_token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

# Ejemplo de endpoint protegido:
@app.get("/api/v1/me", response_model=schemas.User, tags=["auth"])
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user
@app.get("/api/v1/questions", response_model=list[schemas.Question], tags=["questions"])
def list_questions(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_questions(db, skip=skip, limit=limit)

@app.get("/api/v1/questions/{question_id}", response_model=schemas.Question, tags=["questions"])
def get_question(question_id: int, db: Session = Depends(get_db)):
    question = crud.get_question(db, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")
    return question
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from backend import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Passion For Christ API", version="1.0.0")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", tags=["root"])
def read_root():
    return {"message": "API Passion For Christ"}


@app.get("/api/v1/articles", response_model=list[schemas.Article], tags=["articles"])
def list_articles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_articles(db, skip=skip, limit=limit)

@app.post("/api/v1/articles", response_model=schemas.Article, status_code=status.HTTP_201_CREATED, tags=["articles"])
def create_article(article: schemas.ArticleCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    return crud.create_article(db, article)

@app.put("/api/v1/articles/{article_id}", response_model=schemas.Article, tags=["articles"])
def update_article(article_id: int, article: schemas.ArticleCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_article = crud.get_article(db, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    for key, value in article.dict().items():
        setattr(db_article, key, value)
    db.commit()
    db.refresh(db_article)
    return db_article

@app.delete("/api/v1/articles/{article_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["articles"])
def delete_article(article_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_article = crud.get_article(db, article_id)
    if not db_article:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    db.delete(db_article)
    db.commit()
    return

@app.get("/api/v1/articles/{article_id}", response_model=schemas.Article, tags=["articles"])
def get_article(article_id: int, db: Session = Depends(get_db)):
    article = crud.get_article(db, article_id)
    if not article:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return article
