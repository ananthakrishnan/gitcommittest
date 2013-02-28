
var stuffImageUrl										= "";
var auction_edit_id										= "";

function hideStatusMessage()
{
	if(document.getElementById("voice-box").getAttribute("status") == "saved")
	{
		$("#voice-box").fadeOut(300);
	}
}

function changeCompany(keyIndex)
{
	window.location.href="/intermediateCheck?companyKey="+keyIndex;
}

function addBadge(input)
{
	jcrop_api.destroy();
	$('.jcrop-tracker').remove();
	
	if (input.files && input.files[0]) 
	{
    	var reader 					= new FileReader();
    	reader.onload 				= function (e)
    								  {
    										$(".add_stuff_popup").hide();
    										$('#badge_image').attr('src', e.target.result);
    										$("#badge_image_sample").attr('src', e.target.result);
    										$("#badge_image_cropper").show();
    										
    										$('#badge_image_sample').load(function(){
    											
    							        		width			= $("#badge_image_sample").width();
    							          		height			= $("#badge_image_sample").height();
    							          		
    							          		
    							          		/*if(width >= 140 && height >= 140)
    							          		{*/
    							          			if(width > height)
        							          		{
        							          			$("#badge_image_sample").removeAttr("style").attr({'height':"300px",'width':"450px"}).hide();;
        							          			$("#badge_image").removeAttr("style").attr({'height':"300px",'width':"450px"});
        							          			croppingIntializer(300,450);
        							          			croppedWidth	= 450;
        							          			croppedHeight	= 300;
        							          		}
        							          		else if(width < height)
        							          		{
        							          			$("#badge_image_sample").removeAttr("style").attr({'height':"450px",'width':"300px"}).hide();;
        							          			$("#badge_image").removeAttr("style").attr({'height':"450px",'width':"300px"});
        							          			croppingIntializer(450,300);
        							          			croppedWidth	= 300;
        							          			croppedHeight	= 450;
        							          		}	
        							          		else if(width === height)
        							          		{
        							          			$("#badge_image_sample").removeAttr("style").attr({'height':"300px",'width':"300px"}).hide();;
        							          			$("#badge_image").removeAttr("style").attr({'height':"300px",'width':"300px"});
        							          			croppingIntializer(300,300);
        							          			croppedWidth	= 300;
        							          			croppedHeight	= 300;
        							          		}
    							          	/*	}
    							          		else
    							          		{
    							          			x1=0;
    							          			x2=0;
    							          			y1=0;
    							          			y2=0;
    							          			$("#badge_image_sample").removeAttr("style").attr({'height':height+"px",'width':width+"px"});
    							          			$("#badge_image").removeAttr("style").attr({'height':height+"px",'width':width+"px"});
    							          			croppedWidth	= width;
    							          			croppedHeight	= height;
    							          		}*/	
    							        	});
    								  }
    	reader.readAsDataURL(input.files[0]);
		}
}

function croppingIntializer(jcropHeight,jcropWidth)
{
		var left					= (jcropWidth/2)-40;
		var right					= (jcropWidth/2)+40;
		var top						= (jcropHeight/2)-40;
		var bottom					= (jcropHeight/2)+40;
		
		
	 $('#badge_image_sample').Jcrop({
     	onSelect	: getCoordinates,
     	onChange	: getCoordinates,
     	bgColor		: 'black',
        bgOpacity	: .4,
        minSize		: [ 80, 80 ],
        setSelect	: [ left,top,right,bottom ],
        aspectRatio : 1/1
     },
     function()
     {
         var bounds 	= this.getBounds();
         boundx 		= bounds[0];
         boundy 		= bounds[1];
         jcrop_api 		= this;
     });
}
var imageCooridinates;
function getCoordinates(coordinates)
{
	imageCooridinates	= coordinates;
	
	if (parseInt(coordinates.w) > 0)
    {
      	x1=coordinates.x;
    	y1=coordinates.y;
    	x2=coordinates.x2;
    	y2=coordinates.y2;
    }
}

$("#image_crop_close_act").live("click",function(){
	
	x1=0;
	x2=0;
	y1=0;
	y2=0;
	
	$('.jcrop-tracker').remove();
	jcrop_api.destroy();
	
	$('.user_info li > span:not(#checking) > img').css({"marginLeft": '0px ',"marginTop": '0px'}).attr({'width':"80px",'height':'80px'});
	
	$('#badge_image_sample').attr('src',"").removeAttr("style").removeAttr("width").removeAttr("height");
	
	$(".add_stuff_popup").show();
	$("#badge_image_cropper").hide();
	$('#badge_image').show();
	
});

$("#badge_image_cropper_act").live("click",function(){

	var rx = 80 / imageCooridinates.w;
	var ry = 80 / imageCooridinates.h;
	
	/*if(width >= 140 && height >= 140)
		{*/
		$('.user_info li > span:not(#checking) > img').css({
				
				"width"					: Math.round(rx * croppedWidth) + 'px',
				"height"				: Math.round(ry * croppedHeight) + 'px',
				"marginLeft"			: '-' + Math.round(rx * imageCooridinates.x) + 'px ',
				"marginTop"				: '-' + Math.round(ry * imageCooridinates.y) + 'px'
			
		});
		/*}
	else
	{
		$('.user_info li > span:not(#checking) > img').css({"marginLeft": '0px ',"marginTop": '0px'}).attr({'width':"80px",'height':'auto'});
	}*/	
	

	
	$('.jcrop-tracker').remove();
	jcrop_api.destroy();
	$('#badge_image_sample').attr('src',"").removeAttr("style").removeAttr("width").removeAttr("height");
	$(".add_stuff_popup").show();
	$("#badge_image_cropper").hide();
});

function isNumberKey(evt)
{
   var charCode 									= (evt.which) ? evt.which : event.keyCode;
   
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			 return false;

   return true;
}

function libImgDetails(selectedImg)
{
	$('.badge_library').hide();
	$('.add_stuff_popup').show();
	libImageUrlSelected 					= $(selectedImg).find("img").attr("src");
	
	var stuffId								= $(selectedImg).attr("id");
	
	for(indexingBadgesList in badgesListMap)
  	{
  	  	if(String(stuffId) === String(badgesListMap[indexingBadgesList].key))
  	  	{
  	  		stuffImageUrl					= badgesListMap[indexingBadgesList].badgeLogoPath
  	  			
  			$('#'+badgesListMap[indexingBadgesList].badgeType+'_cat').attr('checked',true);
  			$("#badge_image").attr('src',badgesListMap[indexingBadgesList].badgeLogoPath).css({"marginLeft": '0px ',"marginTop": '0px',"width":'80px',"height":'80px'});
  			$("#badge_name").val(badgesListMap[indexingBadgesList].badgeName);
  			$("#badge_points").val(badgesListMap[indexingBadgesList].badgeValue);
  			$('.nicEdit-main').html(badgesListMap[indexingBadgesList].badgeDiscription.value);
  			$('#maximum_quantity').val(badgesListMap[indexingBadgesList].quantity);
  	  	}
  	}
}


function saveBadgeDetails(badgeObject,stuffId)
{
	var buildStuffLi						= "";
	
	$('.add_stuff_popup').hide();
	
	$.ajax({  
    	type	: 'POST', 
    	url		: '/saveBadgeDetails', 
    	data	: {badgeObject:JSON.stringify(badgeObject)},
    	async	: true, 
    	success	: function(data)
      			  {
    					if(String(stuffId) != "" && String(stuffId) != "undefined" && stuffId != undefined)
    					{
    						if(String(badgeObject.badgeType) === "stufflibrary")
    						{
    							$("#add_product > li[id='"+stuffId+"']").remove();
    						}
    						else
    						{
    							$("#add_product > li[id='"+stuffId+"']").find("img").attr({"src":badgeObject.badgeLogoPath});
    		 		   			$("#add_product > li[id='"+stuffId+"']").find("b").html(badgeObject.badgeValue);
    		 		   			$("#add_product > li[id='"+stuffId+"']").find("h4").html(badgeObject.badgeName);
    		 		   			$("#add_product > li[id='"+stuffId+"']").find("p").html(String(badgeObject.badgeDiscription).substring(0,50));
    		 		   			$("#add_product > li[id='"+stuffId+"'] > li").siblings().attr("id",stuffId);
    		 		   			
    		 		   			badgesListMap[stuffId].badgeLogoPath				= badgeObject.badgeLogoPath;
    		 		   			badgesListMap[stuffId].badgeValue					= badgeObject.badgeValue;
    		 		   			badgesListMap[stuffId].badgeName					= badgeObject.badgeName;
    		 		   			badgesListMap[stuffId].badgeDiscription.value		= badgeObject.badgeDiscription;
    		 		   			badgesListMap[stuffId].badgeType					= badgeObject.badgeType;
    		 		   			badgesListMap[stuffId].maximumQuantity				= badgeObject.maximumQuantity;
    						}	
    					}
    					else if(data && String(data) != "[object XMLDocument]")
    					{
    						var badgeKey 											= 	String($.trim(data));
    						
	 		   				if(String(badgeObject.badgeType) === "item")
	 		   				{
				 		   		buildStuffLi 										=  '<li id='+badgeKey+' class="badges_list"><div class="col1"><div class="badge_hldr">'+
																					   '<img src="'+badgeObject.badgeLogoPath+'" width="108" height="108" /></div><b>'+badgeObject.badgeValue+'</b></div>'+
																					   '<div>'+'<h4>'+badgeObject.badgeName+'</h4><p>'+String(badgeObject.badgeDiscription).substring(0,50)+'</p></div><div class="clear_all"></div>'+
																					   '<div class="on_over"><ol>'+
																					   '<li class="edit_product" id='+badgeKey+'></li>'+
																					   '<li class="del_product del_act" id='+badgeKey+'></li>'+
																					   '<li class="show_product show_product_act" id='+badgeKey+'></li>'+
																					   '</ol></div></li>';

	 		   					$("#add_product").append(buildStuffLi);
	 		   				}	
			    		 		
		 		   			
		 		   			badgeObject.key											= 	badgeKey;
		 		   			badgesListMap[badgeKey]									= 	badgeObject;
		 		   			
		 		   			badgesListMap[badgeKey].badgeDiscription				= 	{"value":badgeObject.badgeDiscription};
		 		   			
    					}
    					
    					$(".new_badge_holder").scrollTop($(".new_badge_holder")[0].scrollHeight);
    					
    					stuffImageUrl												= 	"";
    					$('#backgroundPopup').fadeOut();
    					
    					$('#badge_name').val("");
    					$('#badge_points').val("");
    					$("#maximum_quantity").val("");
    					$("#badge_image").attr("src","");
    					$('.nicEdit-main').html("Some Initial Content was in this textarea");
    					$('.add_vlink_cont').empty();
      			  }
	});
	
	$("#voice-box").fadeIn();
	document.getElementById("statusMessage").innerHTML = "Saved...";	
	document.getElementById("voice-box").setAttribute("status", "saved");
	setTimeout("hideStatusMessage()", 1750);
}

function saveAuctionDetails(auctionImageUrl)
{
	var badgeCreatedId     	= document.getElementById("imageLogoPath");
    var badgeAsignee      	= userKey;
    var badgeName     	 	= document.getElementById("badge_name").value;
    var badge_points      	= document.getElementById("badge_points").value;
    var badgeDescription    = $(".nicEdit-main").html();
    var totalHours     		= $("#maximum_quantity").val();
    
    
    var auction_details  	= new Array();
    
    auction_details[0]  	= badgeAsignee;
    auction_details[1]  	= badgeName;
    auction_details[2]  	= badge_points;
    auction_details[3]  	= badgeDescription;
    auction_details[4]  	= totalHours;
    auction_details[5] 		= auctionImageUrl;
    
    
    if(String(auction_edit_id) != "")
    {
    	auction_details[6]		= auction_edit_id;
    }	
    
    $('.add_stuff_popup').hide();
    
    
    $.ajax(
            {  
             type: 'POST', url: '/saveAuctionsDetails', data:{auction_details:auction_details},async: true, success: function( data )
             {
		            $("#voice-box").fadeIn();
		            document.getElementById("statusMessage").innerHTML = "Saved...!"; 
		            document.getElementById("voice-box").setAttribute("status", "saved");
		            setTimeout("hideStatusMessage()", 1750);
		            $('#badge_name').val("");
		               $('#badge_points').val("");
		               $('#maximum_quantity').val("");
		               $('.nicEdit-main').html("Some Initial Content was in this textarea");
		               
		               if(String(auction_edit_id) != "" && auction_edit_id && String(auction_edit_id) != "undefined")
		               {
		            	   	$("#add_product > li[id='"+auction_edit_id+"']").find("img").attr({"src":auctionImageUrl});
		 		   			$("#add_product > li[id='"+auction_edit_id+"']").find("b").html(badge_points);
		 		   			$("#add_product > li[id='"+auction_edit_id+"']").find("h4").html(badgeName);
		 		   			$("#add_product > li[id='"+auction_edit_id+"']").find("p").html(String(badgeDescription).substring(0,50));
		 		   			
		            	   auctionListInfo[auction_edit_id].auctionImgId  = auctionImageUrl;
		            	   auctionListInfo[auction_edit_id].auctionMins   = totalHours;
		            	   auctionListInfo[auction_edit_id].auctionMaxPoints = badge_points;
		            	   auctionListInfo[auction_edit_id].auctionDescription.value = badgeDescription;
		            	   auctionListInfo[auction_edit_id].auctionName = badgeName;
		               }
		               else
		               {
			               $('#add_product').append('<li id="'+data+'" class="badges_list">'
					               +'<div class="col1"><img id="existing_image" width="107" height="108" src="'+auctionImageUrl+'"><b id="badgePoints">'+badge_points+'</b></div>'
					              +'<div class="">'
					              +'<h4 id="badgeName">'+badgeName+'</h4><p id="badgeDesc">'+badgeDescription+'</p>'
					              +'</div><div class="clear_all"></div><div class="on_over"><ol>'
					              +'<li id="'+data+'" class="edit_auction_details edit_product"></li>'
					              +'<li id="'+data+'" class="del_product auction_del_act"></li>'
					              +'<li class="show_product dont_show_product decide_show_auction"></li></ol></div></li>');
					               
					               var updateNewEntryInAuctionList     = new Object();
					               updateNewEntryInAuctionList.companyId    = companyId;
					               updateNewEntryInAuctionList.auctionAssignee  = badgeAsignee;
					               updateNewEntryInAuctionList.key     = data;
					               updateNewEntryInAuctionList.auctionImgId  = auctionImageUrl;
					               updateNewEntryInAuctionList.auctionMins   = totalHours;
					               updateNewEntryInAuctionList.auctionMaxPoints = badge_points;
					               
					               auctionListInfo[data] = updateNewEntryInAuctionList;

		               }	   
		               
		               
		            $('#backgroundPopup').fadeOut();
   					
   					$('#badge_name').val("");
   					$('#badge_points').val("");
   					$("#maximum_quantity").val("");
   					$("#badge_image").attr("src","");
   					$('.nicEdit-main').html("Some Initial Content was in this textarea");
   					$('.add_vlink_cont').empty();
		               
            }
            }
           );
}

$(document).ready(function(){
	
	$('.tooltipB').tipsy({trigger: 'focus', gravity: 'w'});
	$('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
	$('#pending_req_stuff').html("Approve Stuff from Store ("+pendingReqObj.stuffCount+")");
	
	bkLib.onDomLoaded(function() 
	{ 
		new nicEditor({maxHeight : 205}).panelInstance('email_content');
	});
	
	for(indexingUserDetails in userDetailsMap)
	{
		userKey  										= userDetailsMap[indexingUserDetails].key;
		userName 										= userDetailsMap[indexingUserDetails].userName;
		userFirstName 									= userDetailsMap[indexingUserDetails].firstName;
		userLastName	 								= userDetailsMap[indexingUserDetails].lastName;
	}
	$('.user_person_name').html(userFirstName);  
	$('.welcome_username').html("Welcome, "+userFirstName +" "+ userLastName);
//	$('#company-name').html(bannerCompanyName);
	$('#account_name').html(bannerCompanyName);
	
	
	var companyListli 									= "";
	
    for(indexingCompanyList in companyList)
    {
    	companyListli									+= '<li style="cursor:pointer;" id="'+indexingCompanyList+'" ><a onClick="changeCompany(\''+indexingCompanyList+'\');"><span>'+companyList[indexingCompanyList]+'<span></a></li>';
    }
    
    if(companyListli != "")
    {
   		$('#companyslist').append(companyListli);
    }
    else
    {
    	$('#account_menu').removeAttr("id");
    }
 	 
	var badgesInLibrary 								= "";
	 
	for(indexingBadgesList in badgesListMap)
	{
		if(badgesListMap[indexingBadgesList].badgeType.indexOf("stufflibrary") != -1)
		{
			badgesInLibrary 							+= '<li id="'+indexingBadgesList+'" onclick="libImgDetails(this)"><img alt="'+badgesListMap[indexingBadgesList].badgeName+'" src="'+badgesListMap[indexingBadgesList].badgeLogoPath+'"><div title="'+badgesListMap[indexingBadgesList].badgeName+'" class="badge-name toolTip">'+badgesListMap[indexingBadgesList].badgeName+'</div></li>';
		}	
	}
	 
	$('#lib_stuffs').html(badgesInLibrary);

	$(".nicEdit-main ").live("focus",function(){
		
				if( $(".nicEdit-main").html().indexOf("Some Initial Content was in this textarea") != -1)
				{
					$(".nicEdit-main").html("");
				}	
	}); 
	
	var classWhileStuffDisabled							= "badges_list";
	var classWhileStuffEnabled							= "show_product show_product_act";
	var buildStuffLi									= "";
	
	for(values in badgesListMap)
	{
		if(badgesListMap[values].badgeType === "item")
		{
			if(badgesListMap[values].isFlag === "disabled")
			{
				classWhileStuffDisabled					= "badges_list dont_show";
				classWhileStuffEnabled					= "show_product_act dont_show_product";
			}
			else
			{
				classWhileStuffDisabled					= "badges_list";
				classWhileStuffEnabled					= "show_product show_product_act";
			}
			
			
			buildStuffLi 								+= '<li class="'+classWhileStuffDisabled+'" id='+badgesListMap[values].key+'><div class="col1"><div class="badge_hldr">'+
														   '<img src="'+badgesListMap[values].badgeLogoPath+'" width="107" height="108" /></div><b>'+badgesListMap[values].badgeValue+'</b>'+
														   '</div><h4>'+badgesListMap[values].badgeName+'</h4>'+'<p>'+badgesListMap[values].badgeDiscription.value.substring(0,50)+'</p></div><div class="clear_all"></div>'+
														   '<div class="on_over"><ol>'+
														   '<li id="'+badgesListMap[values].key+'edit_stuff" class="edit_product"></li>'+
														   '<li class="del_product del_act" id="'+badgesListMap[values].key+'"></li>'+
														   '<li class="'+classWhileStuffEnabled+'" id="'+badgesListMap[values].key+'"></li>'+
														   '</ol></div></li>';
		}
	}
	
	
	for(indexAuctionListInfo in auctionListInfo)
	  {
		
		buildStuffLi +='<li id="'+indexAuctionListInfo+'" class="badges_list">'
	     +'<div class="col1"><img id="existing_image" width="107" height="108" src="'+(auctionListInfo[indexAuctionListInfo].auctionImgId).trim()+'"><b id="badgePoints">'+auctionListInfo[indexAuctionListInfo].auctionMaxPoints+'</b></div>'
	     +'<div class="">'
	     +'<h4 id="badgeName">'+auctionListInfo[indexAuctionListInfo].auctionName+'</h4><p id="badgeDesc">'+auctionListInfo[indexAuctionListInfo].auctionDescription.value.substring(0,50)+'</p>'
	     +'</div><div class="clear_all"></div><div class="on_over"><ol>'
	     +'<li id="'+indexAuctionListInfo+'" class="edit_product edit_auction_details"></li>'
	     +'<li id="'+indexAuctionListInfo+'" class="del_product auction_del_act"></li>'
	     +'<li class="show_product dont_show_product decide_show_auction"></li></ol></div></li>';
	  }
	 
	$('#add_product').html(buildStuffLi);
	
	
	 $('.edit_product').live("click",function(){
		  
		  var stuffId									= String($(this).attr("id")).replace("edit_stuff","");
		
		  $('#backgroundPopup').show();
		  $('.add_stuff_popup').fadeIn();
		  $('.dont_show_library').hide();
		  $('.add_stuff_popup').find("h2").html("Edit Stuff Details");
    	
		  for(indexingBadgesList in badgesListMap)
		  {
			  if(String(stuffId) === String(badgesListMap[indexingBadgesList].key))
			  {
				  stuffImageUrl							= badgesListMap[indexingBadgesList].badgeLogoPath;
				  $('#'+badgesListMap[indexingBadgesList].badgeType+'_cat').attr('checked',true);
				  $("#badge_image").attr('src',badgesListMap[indexingBadgesList].badgeLogoPath).css({"marginLeft": '0px ',"marginTop": '0px',"width":'80px',"height":'80px'});
				  $("#badge_name").val(badgesListMap[indexingBadgesList].badgeName);
				  $("#badge_points").val(badgesListMap[indexingBadgesList].badgeValue).attr("title","Points");
				  $('.nicEdit-main').html(badgesListMap[indexingBadgesList].badgeDiscription.value);
				  
				  if(String(badgesListMap[indexingBadgesList].quantity) != "-1")
				  {
					  $('#maximum_quantity').val(badgesListMap[indexingBadgesList].quantity).attr("title","Maximum Quantity");
				  }
				  else
				  {
					  $("#maximum_quantity").hide().val("");
					  $("#unlimited_stuff_enable").attr("checked",true);
				  }	  
			  }
		  }
		  
		  $(".addNewStuffButton").removeAttr("disabled").addClass("grn_btn").removeClass("gry_btn").attr("id",stuffId);
	 });
	 
	 $('.edit_auction_details').live("click",function(){
		  
		  var auctionId									= String($(this).attr("id"));
		
		  $('#backgroundPopup').show();
		  $('.add_stuff_popup').fadeIn();
		  $('.dont_show_library').hide();
		  $('.add_stuff_popup').find("h2").html("Edit Stuff Details");
		  
		  stuffImageUrl									= auctionListInfo[auctionId].auctionImgId;
		  
   	
		  $('#auction_cat').attr('checked',true);
		  $("#badge_image").attr('src',auctionListInfo[auctionId].auctionImgId).css({"marginLeft": '0px ',"marginTop": '0px',"width":'80px',"height":'80px'});
		  $("#badge_name").val(auctionListInfo[auctionId].auctionName);
		  $("#badge_points").val(auctionListInfo[auctionId].auctionMaxPoints);
		  $('.nicEdit-main').html(auctionListInfo[auctionId].auctionDescription.value).attr("title","Starting Points");
		  $('#maximum_quantity').val(auctionListInfo[auctionId].auctionMins).attr("title","Auction Duration");
		  
		  $(".addNewStuffButton").removeAttr("disabled").addClass("grn_btn").removeClass("gry_btn").attr("id",auctionId);
	 });
	 
	 $('.add_stuff_act').live("click",function(){
		 
		 $('#backgroundPopup').show();
		 $('.add_stuff_popup').fadeIn();
		 $('.dont_show_library').show();
		 $('.add_stuff_popup').find("h2").html("Add New Stuff");
		 
		 $(".addNewStuffButton").removeAttr("id");
		 $(".addNewStuffButton").removeAttr("disabled").addClass("grn_btn").removeClass("gry_btn");
		 
	 });
	 
	 $('.del_act').live("click",function(){
			
			$(".delete_stuff").attr("id",$(this).attr("id"))
			$('#backgroundPopup').show();
			$('.remove_alert').fadeIn();
		 
	});
	 
	 $('.auction_del_act').live("click",function(){
			
			$(".delete_auction").attr("id",$(this).attr("id"))
			$('#backgroundPopup').show();
			$('.remove_auction').fadeIn();
		 
	});
		
		$('.delete_stuff').live("click",function(){
			
			var deletingBadgeKey						= $(this).attr("id");
			
			$('.remove_alert').hide();
			
			badgesListMap[deletingBadgeKey].badgeType 	= "deleted stuff";
			
			$("#add_product > li[id='"+deletingBadgeKey+"']").remove();
			
			
			$.ajax({
					type: 'POST', 
					url: '/deleteBadgeDetails', 
					data:{deletingBadgeKey : deletingBadgeKey},
					async: true, 
					success: function( data )
					         {
					    		 $('#backgroundPopup').fadeOut();
					    		 
					    		 $("#voice-box").fadeIn();
					    		 document.getElementById("statusMessage").innerHTML = "Deleted.. ";	
					    		 document.getElementById("voice-box").setAttribute("status", "saved");
					    		 setTimeout("hideStatusMessage()", 1750);
					    	 }
			});

		});
		
		$('.delete_auction').live("click",function(){
			
			$('.remove_auction').hide();
			
			var deletingAuctionKey						= $(this).attr("id");
			
			$("#add_product > li[id='"+deletingAuctionKey+"']").remove();
			
			delete auctionListInfo[deletingAuctionKey];
			
			$.ajax({
					type	: 'POST', 
					url		: '/deleteAuctionDetails', 
					data	: {deletingAuctionKey:deletingAuctionKey},
					async	: true, 
					success	: function( data )
					          {
					    		 $('#backgroundPopup').fadeOut();
					    		 $("#voice-box").fadeIn();
					    		 document.getElementById("statusMessage").innerHTML = "Deleted.. ";	
					    		 document.getElementById("voice-box").setAttribute("status", "saved");
					    		 setTimeout("hideStatusMessage()", 1750);
					    	  }
			});

		});
		
		
		$('.cancel_act').live("click",function(){
 			
			stuffId											= 	"";
			stuffImageUrl									= 	"";
			$('#backgroundPopup').fadeOut();
			$('.add_stuff_popup').hide();
			$('.remove_alert,.remove_auction').hide();
			$('#badge_name').val("");
			$('#badge_points').val("");
			$("#badge_image").attr("src","");
			$('.nicEdit-main').html("Some Initial Content was in this textarea");
			$('.add_vlink_cont').empty();
			$("#maximum_quantity").val("");

		});
		
		
		$('.show_product_act').live("click",function(){ 
 			
 			var badgeKey									= $(this).attr("id");
 			var flagStatus									= "";
 			
 			if ($(this).hasClass('show_product')) 
 			{
 				$(this).addClass('dont_show_product');
 				$(this).removeClass('show_product');
 		  		$(this).parent().parent().parent().addClass('dont_show');
 		  		flagStatus									= "disabled";
 		  		badgesListMap[badgeKey].isFlag 				= flagStatus;
 		  	}
 			else 
 			{
 			  	$(this).removeClass('dont_show_product');
 				$(this).addClass('show_product');
 		  		$(this).parent().parent().parent().removeClass('dont_show');
 		  		flagStatus									= "enabled";
 		  		badgesListMap[badgeKey].isFlag 				= flagStatus;
 			}
 			
 			$.ajax({
 				   type: 'POST', 
 				   url: '/showDontshow', 
 				   data:{badgeKey:badgeKey,flagStatus:flagStatus},
 				   async: true, 
 				   success: function( data )
	  			   {
						
	  			   }
	  		});
		});
		
		$(".addNewStuffButton").live("click",function(){
			
			 $('#backgroundPopup').show();
			 $('.add_stuff_popup').fadeIn();
			 					
			 var stuffId					= $(this).attr("id");
			 var badgeAssignee				= userKey;
			 var badgeName					= $.trim($("#badge_name").val());
			 var badgePoints				= $("#badge_points").val();
			 var badgeDescription			= $.trim($(".nicEdit-main").html());
			 var badgeType					= $('input[name=cat]:radio:checked').val();
			 var badgeImageId				= "imageLogoPath";
//			 var maximumQuantity			= $('#maximum_quantity').val();
			 
			 if(String($.trim($(":checkbox#unlimited_stuff_enable").attr("checked"))) === "checked")
			 {
				 maximumQuantity			= "infinite";
			 }	
			 else
			 {
				 maximumQuantity			= $.trim($('#maximum_quantity').val());
			 }
			 
			 if(!stuffId)
			 {
				 for(indexingBadgesListMap in badgesListMap)
			  	 {
					 if(String(badgesListMap[indexingBadgesListMap].badgeType) === "item")
					 {
						 if(String(badgesListMap[indexingBadgesListMap].badgeName) === String(badgeName))
						 {
							 badgeName		= false;
						 }	
					 }	 
				 }
			 }
			 if(String($('#badge_image').attr('src')) === "" || $('#badge_image').attr('src') == undefined || String($('#badge_image').attr('src')) === "undefined")
			 {
				 $("#voice-box").fadeIn();
	             document.getElementById("statusMessage").innerHTML = "please upload stuff image !"; 
	             document.getElementById("voice-box").setAttribute("status", "saved");
	             setTimeout("hideStatusMessage()", 1750);
			 }
			 else if(!badgeName)
			 {
				 if(typeof badgeName === "boolean")
				 {
					 $("#voice-box").fadeIn();
		             document.getElementById("statusMessage").innerHTML = " stuff with same name already exist !"; 
		             document.getElementById("voice-box").setAttribute("status", "saved");
		             setTimeout("hideStatusMessage()", 1750);
				 }
				 else
				 {
					 $("#voice-box").fadeIn();
		             document.getElementById("statusMessage").innerHTML = "please enter stuff name !"; 
		             document.getElementById("voice-box").setAttribute("status", "saved");
		             setTimeout("hideStatusMessage()", 1750);
				 }	 
			 }
			 else if(!badgePoints)
			 {
				 $("#voice-box").fadeIn();
	             document.getElementById("statusMessage").innerHTML = "please enter stuff points !"; 
	             document.getElementById("voice-box").setAttribute("status", "saved");
	             setTimeout("hideStatusMessage()", 1750);
			 }
			 else if(!badgeDescription || String(badgeDescription) === "Some Initial Content was in this textarea" )
			 {
				 $("#voice-box").fadeIn();
	             document.getElementById("statusMessage").innerHTML = "please enter stuff description !"; 
	             document.getElementById("voice-box").setAttribute("status", "saved");
	             setTimeout("hideStatusMessage()", 1750);
			 }
			 else if(!maximumQuantity)
			 {
				 $("#voice-box").fadeIn();
	             document.getElementById("statusMessage").innerHTML = "please enter maximum quantity !"; 
	             document.getElementById("voice-box").setAttribute("status", "saved");
	             setTimeout("hideStatusMessage()", 1750);
			 }	 
			 else
			 {
				 $(".addNewStuffButton").attr("disabled",true).removeClass("grn_btn").addClass("gry_btn");
				 
				 var badgeObject					= new Object();
				 badgeObject.badgeName				= badgeName;
				 badgeObject.badgeValue				= badgePoints;
				 badgeObject.badgeDiscription		= badgeDescription;
				 badgeObject.badgeType				= badgeType;
				 badgeObject.badgeAssignee			= badgeAssignee;
				 badgeObject.maximumQuantity		= maximumQuantity;
				 
				 
				 if(String(stuffId) != "" && String(stuffId) != "undefined" && stuffId != undefined)
	 			 {
					 badgeObject.key				= stuffId;	
				 }
				 
				 $('.add_stuff_popup').hide();
				 
				 if(libImageUrlSelected != null && libImageUrlSelected != "")
				 {
					 badgeObject.badgeLogoPath		= libImageUrlSelected;
					 
					 if(String(badgeType) === "auctionstuff")
					 {
						 auction_edit_id		= "";
						 saveAuctionDetails(libImageUrlSelected);
					 }	 
					 else
					 {
						 saveBadgeDetails(badgeObject,stuffId);
					 }	 
					 
				 }
				 else if(String($("#badge_image").attr("src")).length > 1000)
				 {
					 
					 $.ajaxFileUpload({
									url				: uploadBadgeImageUrl,
									secureuri		: false,
									fileElementId	: badgeImageId,
									data			: {x1:x1,y1:y1,x2:x2,y2:y2,height:croppedHeight,width:croppedWidth},
									success			: function (text , status)
													  {
															$.ajax({  
											   			    		type: 'POST', 
											   			    		url: '/getUploadedBadgeImageUrl',
											   			    		async: false, 
											   			    		success: function( data )
											   			    		{
											   			    			if(data)
																		{
																			badgeObject.badgeLogoPath		= String(data).split("_ah/image.jpg")[0];
																			uploadBadgeImageUrl				= String(data).split("_ah/image.jpg")[1];
																			badgeObject.badgeImageBlobkey	= String(data).split("_ah/image.jpg")[2];
																			
																			if(String(badgeType) === "auctionstuff")
																			{
																				auction_edit_id			= stuffId;
																				saveAuctionDetails(String(data).split("_ah/image.jpg")[0]);
																			}	 
																			else
																			{
																				saveBadgeDetails(badgeObject,stuffId);
																			}
																		}
											   			    		}
											   			     });
													  }
					 });
					 
				 }
				 else
				 {
					 badgeObject.badgeLogoPath		= stuffImageUrl;
					 
					 if(String(badgeType) === "auctionstuff")
					 {
						 auction_edit_id			= stuffId;
						 saveAuctionDetails(stuffImageUrl);	 
					 }	 
					 else
					 {
						 saveBadgeDetails(badgeObject,stuffId);
					 }
				 }	 
			 }	
			 
			 
		});
		
		$('.decide_show_auction').live("click", function()
				 {
				  $('.decide_show_auction').addClass('show_product_act');
				  $('.decide_show_auction').removeClass('dont_show_product');
				    var auctionId = $(this).parent().parent().parent().attr('id');
				    $.ajax(
				            {  
				             type: 'POST', url: '/updateStartTime', data:'auctionId='+auctionId,async: true, success: function( data )
				             {
				                $("#voice-box").fadeIn();
				             document.getElementById("statusMessage").innerHTML = "Saved...!"; 
				             document.getElementById("voice-box").setAttribute("status", "saved");
				             setTimeout("hideStatusMessage()", 1750);
				             
				             for(indexAuctionListInfo in auctionListInfo)
				              {
				               if(String(indexAuctionListInfo).indexOf(String(auctionId)) != -1)
				                {
				                 
				                }
				              }
				            }
				            }
				           );
				 });
		
		$("#unlimited_stuff_enable").live("change",function(){
			
			if(String($.trim($(this).attr("checked"))) === "checked")
			{
				$("#maximum_quantity").hide();
			}
			else
			{
				$("#maximum_quantity").val("").show();
			}	
		});
		
		$('input[name=cat]:radio').live("change",function(){
			
			if(String($.trim($(this).val())) === "auctionstuff")
			{
				$("#maximum_quantity").val("").attr("title","Auction Duration").show();
				$("#unlimited_stuff_enable").parent("label").hide();
			}
			else
			{
				$("#maximum_quantity").val("").attr("title","Maximum Quantity").show();
				$("#unlimited_stuff_enable").attr("checked",false).parent("label").show();
			}	
			
		});
		
});


