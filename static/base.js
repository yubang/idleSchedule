var lock=false;
var number=0;
var t=null;
var r=[]
var results=null;
var nums=0;

function getMessage(){
    
    if(lock){
        return;
    }else{
        $("#m").html("正在努力请求服务器！");
        lock=true;
        t=setTimeout("start()",3000);
    }
    
}

function start(){
    var number=$("#number").val();
    var apiUrl=$("#apiUrl").val();
    var token=$("#token").val();
    $.ajax({
        url:apiUrl,
        type:"post",
        data:{"number":number,"token":token,"r":$.toJSON(r)},
        success:function(data){
            clearTimeout(t);
            result=data;
            results=result['result'];
            nums=result['nums'];
            try{
                showResults();
            }catch(e){}
            t=setTimeout("start()",1500);
        },
        error:function(e1,e2,e3){
            clearTimeout(t);
            t=setTimeout("start()",3000);
            $("#m").html("服务器出错，正在重新连接！");
        }
    });
    
}

function getObjFromXY(x,y){
    return $("#td_"+x+"_"+y);
}

function showResults(){
    if(results==null)return ;
    $("#m").html("现在有"+nums+"人参与分析！");
    for(var i=2;i<=8;i++){
        for(var j=2;j<=6;j++){
            var obj=getObjFromXY(i,j);
            if(r[i][j]==1){
                obj.html("有<br>任<br>务");
                obj.css("background-color","skyblue");
            }else if(results[i][j]>=1){
                obj.html("忙<br>碌");
                obj.css("background-color","red");
            }else{
                obj.html("空<br>闲");
                obj.css("background-color","#53FF53");
            }
        }        
    }
    
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
    
    for(var i=0;i<=8;i++){
        r[i]=[];
        for(var j=0;j<=6;j++){
            r[i][j]=0;
        }
    }
    
    console.log("初始化完成！");
    
}

function selectOneDiv(x,y){
    if(x==1 || y ==1){
        return ;
    }
    
    
    if(r[x][y]==0){
        r[x][y]=1;
        getObjFromXY(x,y).css("background-color","skyblue");
        getObjFromXY(x,y).html("有<br>任<br>务");
    }else{
        r[x][y]=0;
        getObjFromXY(x,y).css("background-color","#53FF53");
        getObjFromXY(x,y).html("空<br>闲");
    }
}

$(document).ready(function(){
    init();
});
