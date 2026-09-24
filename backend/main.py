from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import Base, engine, get_db
from models import User, Skill, Goal, Practice


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="Cloud Hobby & Skills Tracker",
    version="1.0.0"
)


# Allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Cloud Hobby & Skills Tracker API is running"
    }


# =========================================================
# REGISTER
# =========================================================

@app.post("/register")
def register(
    username: str,
    email: str,
    password: str,
    db: Session = Depends(get_db)
):

    # Check whether username or email already exists
    existing_user = (
        db.query(User)
        .filter(
            (User.username == username) |
            (User.email == email)
        )
        .first()
    )

    if existing_user:
        return {
            "success": False,
            "message": "Username or email already exists"
        }

    # Create new user
    user = User(
        username=username,
        email=email,
        password=password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "User registered successfully",
        "user_id": user.id,
        "username": user.username
    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/login")
def login(
    username: str,
    password: str,
    db: Session = Depends(get_db)
):

    # Find user
    user = (
        db.query(User)
        .filter(User.username == username)
        .first()
    )

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    # Check password
    if user.password != password:
        return {
            "success": False,
            "message": "Incorrect password"
        }

    return {
        "success": True,
        "message": "Login successful",
        "user_id": user.id,
        "username": user.username
    }


# =========================================================
# SKILLS
# =========================================================

@app.post("/skills")
def add_skill(
    name: str,
    level: str,
    description: str = "",
    db: Session = Depends(get_db)
):

    skill = Skill(
        name=name,
        level=level,
        description=description
    )

    db.add(skill)
    db.commit()
    db.refresh(skill)

    return skill


@app.get("/skills")
def get_skills(
    db: Session = Depends(get_db)
):

    return db.query(Skill).all()


# =========================================================
# GOALS
# =========================================================

@app.post("/goals")
def add_goal(
    title: str,
    description: str = "",
    db: Session = Depends(get_db)
):

    goal = Goal(
        title=title,
        description=description,
        status="In Progress"
    )

    db.add(goal)
    db.commit()
    db.refresh(goal)

    return goal


@app.get("/goals")
def get_goals(
    db: Session = Depends(get_db)
):

    return db.query(Goal).all()


# =========================================================
# PRACTICE
# =========================================================

@app.post("/practice")
def add_practice(
    skill: str,
    hours: int,
    notes: str = "",
    db: Session = Depends(get_db)
):

    practice = Practice(
        skill=skill,
        hours=hours,
        notes=notes
    )

    db.add(practice)
    db.commit()
    db.refresh(practice)

    return practice


@app.get("/practice")
def get_practice(
    db: Session = Depends(get_db)
):

    return db.query(Practice).all()