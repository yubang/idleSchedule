#coding:UTF-8

"""
空闲时间表
@author:yubang
时间：2015-05-24
"""

from flask import Flask,redirect
from app.app import idleScheduleApp

app=Flask(__name__)
app.register_blueprint(idleScheduleApp,url_prefix="/idleSchedule")

@app.route("/")
def index():
    "主页面"
    return redirect("/idleSchedule")
    
if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0",port=8000)
