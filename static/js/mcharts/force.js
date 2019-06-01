var getRandomColor = function() {
    
    return '#' +
        (function(color) {
            return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : arguments.callee(color);
        })('');
}
function initforce(jsondata){
    //alert(jsondata)
	var height = document.getElementById("force").offsetHeight;
	var width = document.getElementById("force").offsetWidth;
		var img_w = 15;
		var img_h = 15;
		
   		var svg = d3.select("#force").append("svg")
								.attr("width",width)
								.attr("height",height);
	
	colorlist=[]
	for(i=0;i<100;i++)
	{
		colorlist.push(getRandomColor());
	}
		
    //alert(jsondata);
    nodes=getNodes(eval(jsondata.nodes));
    edges=getEdges(eval(jsondata.edges));
                //alert(nodes[0].Etype)
    			var force = d3.layout.force()
							.size([width,height])
							.linkDistance(500)
							.charge(-120);
		 force.nodes(nodes).links(edges).start();	
		
		 var text_dx = -20;
		 var text_dy = 20;
		 
		 var nodes_text = svg.selectAll(".nodetextC")
							 .data(nodes)
							 .enter()
							 .append("text")
							 .attr("class","nodetextC")
							 .attr("dx",text_dx)
							 .attr("dy",text_dy)
							 .text(function(d){
								 return d.label;
							 });
			
    			var edges_line = svg.selectAll("line")
								.data(edges)
								.enter()
								.append("line")
                                .attr("stroke", "#AAAAAA")
								.style("stroke-width",0.2);
				
			var edges_text = svg.selectAll(".linetext")
								.data(edges)
								.enter()
								.append("text")
								.attr("class","linetext")
								.text(function(d){
									return d.relation;
								});
			
								
			var nodes_img = svg.selectAll("circle")
								.data(nodes)
								.enter()
								.append("circle")
								.attr("r",img_w)
								.style("fill",function(d,i){
									//alert(i);
									return colorlist[d.Etype];
								})
								.on("mouseover",function(d,i){
									//显示连接线上的文字
									edges_text.style("fill-opacity",function(edge){
										if( edge.source === d || edge.target === d ){
											return 1.0;
										}
									});
									edges_line.style("stroke",function(edge){
										if( edge.source === d || edge.target === d ){
											return "#ff4400";
										}
									});
									edges_line.style("stroke",function(edge){
										if( edge.source !== d && edge.target !== d ){
											return "#10ff4400";
										}
									});
								})
								.on("mouseout",function(d,i){
									//隐去连接线上的文字
									edges_text.style("fill-opacity",function(edge){
										if( edge.source === d || edge.target === d ){
											return 0.0;
										}
									});
									edges_line.style("stroke",function(edge){
										if( edge.source === d || edge.target === d ){
											return "#AAAAAA";
										}
									});
								})
								.call(force.drag);
            nodes_img.on("dblclick",function(d){
	          		//console.log("click node",d);
	          		//alert(d.label)
                Etypeval=d.Etype;
                search_entity(d.label);
              });
    

			
								
			force.on("tick", function(){
				
				//限制结点的边界
				nodes.forEach(function(d,i){
					d.x = d.x - img_w/2 < 0     ? img_w/2 : d.x ;
					d.x = d.x + img_w/2 > width ? width - img_w/2 : d.x ;
					d.y = d.y - img_h/2 < 0      ? img_h/2 : d.y ;
					d.y = d.y + img_h/2 + text_dy > height ? height - img_h/2 - text_dy : d.y ;
				});
			
				//更新连接线的位置
				 edges_line.attr("x1",function(d){ return d.source.x; });
				 edges_line.attr("y1",function(d){ return d.source.y; });
				 edges_line.attr("x2",function(d){ return d.target.x; });
				 edges_line.attr("y2",function(d){ return d.target.y; });
				 
				 //更新连接线上文字的位置
				 edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
				 edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });
				 
				 
				 //更新结点图片和文字
				 nodes_img.attr("cx",function(d){ return d.x ; });
				 nodes_img.attr("cy",function(d){ return d.y ; });
				 
				 nodes_text.attr("x",function(d){ return d.x });
				 nodes_text.attr("y",function(d){ return d.y + img_w/2; });
			});

}

function getNodes(jdata)
{
    nodes=[];
    var i=0;
    for(i=0;i<jdata.length;i++)
        {
            //alert(jdata[i].Etype);
			var item={};
			item.name=jdata[i].name;
            item.Etype=jdata[i].Etype;
			item.label=jdata[i].name;
			
            nodes.push(item);
        }
    //alert(nodes)
    return nodes;
}
function getEdges(jdata)
{
    edges=[];
    var i=0;
    for(i=0;i<jdata.length;i++)
        {
            //alert(jdata[i].relation);
            var item={};
            item.source=parseInt(jdata[i].source);
			item.target=parseInt(jdata[i].target);
			item.relation=jdata[i].relation;
            edges.push(item);
        }
    //alert(edges);
    return edges;
}