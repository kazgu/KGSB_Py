Etypeval='1'
function search_entity(entity)
{
    //更新input的值
    document.getElementById("searchbox").value = entity;
    //清空页面
    d3.select("#force").html("");
    $.ajax
    ({
        type : "GET",
        async : true,//异步执行
        url : "/getData/",
        data : {"entity":entity},//根节点的学者姓名
        dataType : "json",//返回文本数据
        success : function(result)
        {
         
            if(result)
            {
                    //alert(result);
                    initforce(result);
  
            }
        },
        error : function(errorMsg) 
        {
            console.log(errorMsg.responseText);
            alert("数据加载失败,请检查数据格式");
        }
    });
    
   
}
