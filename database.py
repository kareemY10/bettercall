from model import *

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///Userss.db?check_same_thread=False')
Base.metadata.create_all(engine)
DBSession = sessionmaker(bind=engine)
session = DBSession()
 
def add_user(username,password,name):
    user=User(Username=username,password_hash=password)
    user.hash_password(password)
    user.Name=name
    session.add(user)
    session.commit()

 

def check_username(username):

    return session.query(User).filter_by(Username=username).first()