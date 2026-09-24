from sqlalchemy import Column, Integer, String, Text

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    level = Column(String(50))
    description = Column(Text)


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(Text)
    status = Column(String(50), default="In Progress")


class Practice(Base):
    __tablename__ = "practice"

    id = Column(Integer, primary_key=True, index=True)
    skill = Column(String(100))
    hours = Column(Integer)
    notes = Column(Text)