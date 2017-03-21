var tocData = [];
var getData = function(dataUrl) {
		return $.ajax({
				url: dataUrl,
				type:"GET",
				success:function(data,satus,xhr){
						return data;
					}
		});
};



$(document).ready(function() {
	var x = getData("scripts/toc.json");
	x.then(function(resp) {  //try
		tocData = resp;
		var y=parseData(tocData);
	})
	.catch(function(err){  //catch
		console.log(err);
	})

});

var parseData=function(fetchData){
	$("#main_list li").on('click',function(){
		var text=$(this).text();
		for(var i=0;i<fetchData.length;i++){
					if(text==fetchData[i].label){
							for(var j=0;j<fetchData[i].subitems.length;j++){
								if(!(fetchData[i].subitems[j].label)){
									break;
								}else{
									$(this).append("<ul><li>"+fetchData[i].subitems[j].label+"</li></ul>");
								}		
							}
							
							$('.content').html("<iframe class=ifrm src="+fetchData[i].href+" width=600 height=400></iframe>");
						}	
						parseData(fetchData[i].subitems);	
					}				
	});
	
};





