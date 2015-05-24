#coding:UTF-8

"""
空余时间表模块
@author:yubang
时间：2015-05-24
"""

from flask import Blueprint,render_template,g,make_response,url_for,request
from models import Session,Message
import hashlib,time,json,datetime

idleScheduleApp=Blueprint("idleSchedule",__name__)


@idleScheduleApp.route("/")
def index():
    g.x=range(1,9)
    g.y=range(1,7)
    g.token=hashlib.md5(str(time.time())).hexdigest()
    g.apiUrl=url_for('idleSchedule.analy')
    return render_template("idleSchedule/index.html")


@idleScheduleApp.route("/analy",methods=['post'])
def analy():
    
    token=request.form.get("token",None)
    number=request.form.get("number",None)    
    r=request.form.get("r",None)
    
    result=[]
    for t1 in range(1,15):
        obj=[]
        for t2 in range(1,15):
            obj.append(0)
        result.append(obj)
    
    #插入数据
    session=Session();
    try:
        obj=Message(token,number,r)
        session.add(obj)
        session.flush()
        session.commit()
    except Exception:
        session.rollback()
        session.query(Message).filter_by(token=token,number=number).update({"message":r,"updateTime":time.strftime("%Y-%m-%d %H:%M:%S")})
        session.flush()    
    
    #删除无效数据
    t=datetime.datetime.now()-datetime.timedelta(seconds=20)
    session.query(Message).filter(Message.updateTime < t).delete()
    session.commit()
    
    objs=session.query(Message).filter(number==number)
    nums=0
    for obj in objs:
        temp=json.loads(obj.message)
        for index1,t1 in enumerate(temp):
            for index2,t2 in enumerate(t1):
                if t2 == 1:
                    result[index1][index2]+=1
        nums+=1                
    response=make_response(json.dumps({"result":result,'nums':nums}))
    response.headers['Content-Type']="application/json"
    return response
