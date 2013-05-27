
var $xml = "";
$('button#taste').click(function(e){
e.preventDefault();
var request = $("button.active").eq(0).html()
var service = $("button.active").eq(1).html()
var version = $("button.active").eq(2).html()
var url= $('input#url').val();

var wmsRequest = "REQUEST="+request+"&SERVICE="+service+"&VERSION="+version

//console.log(wmsRequest)



requestWMS(url+wmsRequest, function(service){
$('.results').toggle();

//console.log(service)
var xmlDoc = $.parseXML(service)
$xml = $(xmlDoc)

if( $xml.find("Layer").children("Layer").size() > 0)
       {
          $xml.find("Layer").each(function(){
          
          var numchildren = $(this).children("Layer").size()
if (numchildren ==0){

	numchildren = "I am the only Layer"
}
else{
 	
	numchildren = "I have <span class='badge badge-info'>"+numchildren+" Layers</span>"
}

          var name =$(this).find("Name").html();
		  $('.results').append("<div><div style='float:left'>"+name+"</div><div style='float:right'>"+numchildren+"</div></div><br>")
          })  
        } else {
          console.log(" I dont have children!")
          
        }



/*$(service).find("Layer").each(function(){




})*/


$('.results').scrollTop();

})
function requestWMS(site, callback){
	if (!site) {
		alert('No site was passed.');
		return false;
	}
	var yql = 'http://query.yahooapis.com/v1/public/yql?q='+ encodeURIComponent('select * from xml where url="'+site+'"')+'&format=xml&callback=?';
		$.getJSON(yql,function(data){
		//console.log(data.query)
		if (data.results[0]){
			data = data.results[0];
		if (typeof callback ==='function'){
			callback(data);	
			}
			}
		else throw new Error("nothing returned");			
		});
}
})

