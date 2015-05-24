#coding:UTF-8

"""
空余时间表模块
@author:yubang
时间：2015-05-24
"""

from flask import Blueprint,render_template,g,make_response
import hashlib,time

idleScheduleApp=Blueprint("idleSchedule",__name__)


@idleScheduleApp.route("/")
def index():
    g.x=range(1,9)
    g.y=range(1,7)
    g.token=hashlib.md5(str(time.time())).hexdigest()
    return render_template("idleSchedule/index.html")

@idleScheduleApp.route("/analy")
def analy():
    response=make_response("")
    return response
