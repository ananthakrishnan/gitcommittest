function htmlEncode(value)
{
  return $('<div/>').text(value).html();
}

function htmlDecode(value)
{
  return $('<div/>').html(value).text();
}

function urlencode(str)
{
	str = (str+'').toString();
	encoded=encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
	return encoded;

}


//$(document).ready(function(){
//	
//	$.fn.confirm	= function(confirmDialog,option1,option2){
//		
//	};
//	
//});