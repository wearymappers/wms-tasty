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


$(service).find("Layer").each(function(){

var name =$(this).find("Name").html();
$('.results').append("<div>"+name+"</div>");


})


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

