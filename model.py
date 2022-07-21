from sqlalchemy import Column, Integer, String, Boolean, PickleType
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import create_engine
from passlib.apps import custom_app_context as pwd_security
Base = declarative_base()
 
class User(Base):


    __tablename__ = 'USER'
    Username=Column(String,primary_key=True)
    Name=Column(String)
    password_hash=Column(String)
    

    def hash_password(self,password):
        self.password_hash=pwd_security.encrypt(password)

    def verify_password(self,password):
        return pwd_security.verify(password,self.password_hash)
 
