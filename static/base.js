var lock=false;
var number=0;
var t=null;
var r=[]

function getMessage(){
    
    if(lock){
        return;
    }else{
        lock=true;
        t=setTimeout("start()",3000);
    }
    
}

function start(){
    
    clearTimeout(t);
    t=setTimeout("start()",3000);
}

function getObjFromXY(x,y){
    return $("#td_"+x+"_"+y);
}

function init(){
    getObjFromXY(1,1).html("");
    getObjFromXY(2,1).html("一");
    getObjFromXY(3,1).html("二");
    getObjFromXY(4,1).html("三");
    getObjFromXY(5,1).html("四");
    getObjFromXY(6,1).html("五");
    getObjFromXY(7,1).html("六");
    getObjFromXY(8,1).html("日");
    
    getObjFromXY(1,2).html("1<br>,<br>2<br>节");
    getObjFromXY(1,3).html("3<br>,<br>4<br>节");
    getObjFromXY(1,4).html("7<br>,<br>8<br>节");
    getObjFromXY(1,5).html("9<br>,<br>10<br>节");
    getObjFromXY(1,6).html("11<br>,<br>12<br>节");
}

$(document).ready(function(){
    init();
});
