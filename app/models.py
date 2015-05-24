#coding:UTF-8

"""
数据库模型
"""


from sqlalchemy import create_engine,MetaData,Column,Table
from sqlalchemy.sql.sqltypes import String,Integer,TIMESTAMP
from sqlalchemy.orm import mapper,sessionmaker
import config,time

db=create_engine("mysql://%s:%s@%s:%d/%s?charset=UTF8"%(config.MYSQL_USER,config.MYSQL_PASSWORD,config.MYSQL_HOST,config.MYSQL_PORT,config.MYSQL_DB))


class Message(object):
    def __init__(self,token,number,message):
        self.token=token
        self.number=number
        self.message=message
        

messageTable=Table("idleSchedule_message",MetaData(db),
    Column("id",Integer,primary_key=True),
    Column("token",String(32)),
    Column("number",String(32)),
    Column("message",String(255)),
    Column("updateTime",TIMESTAMP),
)

#关联
mapper(Message,messageTable)


Session = sessionmaker(bind=db)
