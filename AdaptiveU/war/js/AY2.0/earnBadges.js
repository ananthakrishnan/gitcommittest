	//Added for case sensitive search
	$.extend($.expr[':'], {
	'containsi': function (elem, i, match, array) {
	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
	});
$(document).ready(function() 
{
	var buildEarnBadges = "";
	
	/*for(indexBadgesListMap in badgesListMap)
		{
		if(String(badgesListMap[indexBadgesListMap].badgeType).indexOf("deleted badge") == -1 && String(badgesListMap[indexBadgesListMap].badgeType).indexOf("badge") != -1)
			{
			if(String(userBadgeLogJdoMap[userKey].badgesWorkingOn).indexOf(indexBadgesListMap) != -1)
				{
					for(indexUserStatusDetailsInfo in userstatusdetails)
						{
							if((String(userstatusdetails[indexUserStatusDetailsInfo].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetailsInfo].stuffid).indexOf(indexBadgesListMap) !=-1 && String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("working on") !=-1 ) || (String(userstatusdetails[indexUserStatusDetailsInfo].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetailsInfo].stuffid).indexOf(indexBadgesListMap) !=-1 && String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("requested") !=-1))
								{
									buildEarnBadges += '<div id="'+indexBadgesListMap+'" class="span3 badge-thumb-wrap badgeParentDiv">'+
									   ' <div class="well">'+
									    	'<div class="dropdown badge-menu">'+
									    	  '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button">'+
									    	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
									    	  '</a>'+
									    		  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
									    		   '<li><a id="'+indexBadgesListMap+'" class="all_badge view_details">View Details</a></li>'+
													'<li><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="stop_working_on_badge">Stop working on this badge</a></li></ul></div>'+
									'<div class="badge-img">'+
										'<a ><img id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" style="cursor:pointer" class="all_badge" src="'+badgesListMap[indexBadgesListMap].badgeLogoPath+'"></a>'+
									'</div>'+
									'<h4><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="badgeName all_badge" >'+badgesListMap[indexBadgesListMap].badgeName+'</a></h4>'+
									'<div id="'+indexUserStatusDetailsInfo+'" class="progress">'+
				                   '<div class="bar bar-danger" style="width: 20%;"></div></div>';
				                   
									if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined" && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null") 
										{
											buildEarnBadges += '<small class="badgeDiscription"><p>'+(badgesListMap[indexBadgesListMap].badgeDiscription.value).substring(0,110)+'</p></small>';
										}
									buildEarnBadges +='</div></div>';
								}
							else if((String(userstatusdetails[indexUserStatusDetailsInfo].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetailsInfo].stuffid).indexOf(indexBadgesListMap) !=-1 && String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("approved") !=-1 ))
								{
									buildEarnBadges += '<div id="'+indexBadgesListMap+'" class="span3 badge-thumb-wrap badgeParentDiv">'+
									   ' <div class="well">'+
									    	'<div class="dropdown badge-menu">'+
									    	  '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button">'+
									    	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
									    	  '</a>'+
									    		  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
									    		   '<li><a id="'+indexBadgesListMap+'" class="all_badge view_details">View Details</a></li>';
													if(String(badgesListMap[indexBadgesListMap].canEarnedTwice).indexOf("true") != -1)
														buildEarnBadges +='<li><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="work_on_badge">Work on this badge</a></li>';
										buildEarnBadges +='</ul></div><div class="badge-img">'+
										'<a ><img id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" style="cursor:pointer" class="all_badge" src="'+badgesListMap[indexBadgesListMap].badgeLogoPath+'"></a>'+
									'</div>'+
									'<h4><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="badgeName all_badge" >'+badgesListMap[indexBadgesListMap].badgeName+'</a></h4>'+
									'<div id="'+indexUserStatusDetailsInfo+'" class="progress">'+
				                   '<div class="bar bar-danger" style="width: 20%;"></div></div>';
				                   
									if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined" && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null")
										{
										buildEarnBadges += '<small class="badgeDiscription"><p>'+(badgesListMap[indexBadgesListMap].badgeDiscription.value).substring(0,110)+'</p></small>';
										}
									buildEarnBadges +='</div></div>';
								}
						}
				}
			else
				{
					buildEarnBadges += '<div id="'+indexBadgesListMap+'" class="span3 badge-thumb-wrap badgeParentDiv">'+
					   ' <div class="well">'+
					    	'<div class="dropdown badge-menu">'+
					    	  '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button">'+
					    	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
					    	  '</a>'+
					    		  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
					    		   '<li><a id="'+indexBadgesListMap+'" class="all_badge view_details">View Details</a></li>'+
					  '<li><a id="'+indexBadgesListMap+'"  class="work_on_badge">Work on this Badge</a></li></ul></div>'+
					'<div class="badge-img">'+
						'<a ><img id="'+indexBadgesListMap+'" style="cursor:pointer" class="all_badge" src="'+badgesListMap[indexBadgesListMap].badgeLogoPath+'"></a></div>'+
					'<h4><a id="'+indexBadgesListMap+'" class="badgeName all_badge" >'+badgesListMap[indexBadgesListMap].badgeName+'</a></h4>';
					if(badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined" )
						buildEarnBadges +='<small class="badgeDiscription"><p>'+(badgesListMap[indexBadgesListMap].badgeDiscription.value).substring(0,110)+'</p></small>'+
					buildEarnBadges +='</div></div>';
				}
			}
		}*/
	
	for(indexBadgesListMap in badgesListMap)
	{
		if(String(userBadgeLogJdoMap[userKey].badgesWorkingOn).indexOf(indexBadgesListMap) != -1)
			{
				for(indexUserStatusDetailsInfo in userstatusdetails)
					{
						if((String(userstatusdetails[indexUserStatusDetailsInfo].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetailsInfo].stuffid).indexOf(indexBadgesListMap) !=-1 && String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("working on") !=-1 ) || (String(userstatusdetails[indexUserStatusDetailsInfo].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetailsInfo].stuffid).indexOf(indexBadgesListMap) !=-1 && String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("requested") !=-1))
							{
								buildEarnBadges += '<div id="'+indexBadgesListMap+'" class="span3 badge-thumb-wrap badgeParentDiv">'+
								   ' <div class="well">'+
								    	'<div class="dropdown badge-menu">'+
								    	  '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button">'+
								    	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
								    	  '</a>'+
								    		  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
								    		   '<li><a id="'+indexBadgesListMap+'" class="all_badge view_details">View Details</a></li>'+
												'<li><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="stop_working_on_badge"">Stop working on this badge</a></li></ul></div>'+
								'<div class="badge-img">'+
									'<a ><img id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" style="cursor:pointer" class="all_badge" src="'+badgesListMap[indexBadgesListMap].badgeLogoPath+'"></a>'+
								'</div>'+
								'<h4><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="badgeName all_badge" >'+badgesListMap[indexBadgesListMap].badgeName+'</a></h4>'+
								'<div id="'+indexUserStatusDetailsInfo+'" class="progress">';
								if(String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("working on") !=-1)
									buildEarnBadges +=  '<div class="bar bar-danger" style="width: 20%;"></div></div>';
								else
									buildEarnBadges +=  '<div class="bar bar-warning" style="width: 100%;"></div></div>';
			                   
								if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined" && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null") 
									buildEarnBadges += '<small class="badgeDiscription"><p>'+String(badgesListMap[indexBadgesListMap].badgeDiscription.value).substring(0,110)+'</p></small>'
								buildEarnBadges +='</div></div>';
							}
						else if((String(userstatusdetails[indexUserStatusDetailsInfo].userId).indexOf(userKey) != -1 && (String(userstatusdetails[indexUserStatusDetailsInfo].stuffid).indexOf(indexBadgesListMap) !=-1) && String(userstatusdetails[indexUserStatusDetailsInfo].status).indexOf("approved") !=-1 ))
						{
							buildEarnBadges += '<div id="'+indexBadgesListMap+'" class="span3 badge-thumb-wrap badgeParentDiv">'+
							   ' <div class="well">'+
							    	'<div class="dropdown badge-menu">'+
							    	  '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button">'+
							    	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
							    	  '</a>'+
							    		  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
							    		   '<li><a id="'+indexBadgesListMap+'" class="all_badge view_details">View Details</a></li>';
											if(String(badgesListMap[indexBadgesListMap].canEarnedTwice).indexOf("true") != -1)
												{
													buildEarnBadges +='<li><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="work_on_badge">Work on this badge</a></li>';
												}
								buildEarnBadges +='</ul></div><div class="badge-img">'+
								'<a ><img id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" style="cursor:pointer" class="all_badge" src="'+badgesListMap[indexBadgesListMap].badgeLogoPath+'"></a>'+
							'</div>'+
							'<h4><a id="'+indexBadgesListMap+'_'+indexUserStatusDetailsInfo+'" class="badgeName all_badge" >'+badgesListMap[indexBadgesListMap].badgeName+'</a></h4>'+
							'<div id="'+indexUserStatusDetailsInfo+'" class="progress">'+
		                   '<div class="bar bar-success" style="width: 100%;"></div></div>';
		                   
								if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined" && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null")
								{
									buildEarnBadges += '<small class="badgeDiscription"><p>'+String(badgesListMap[indexBadgesListMap].badgeDiscription.value).substring(0,110)+'</p></small>';
								}
							buildEarnBadges +='</div></div>';
						}
					}
			}
		else
			{
				buildEarnBadges += '<div id="'+indexBadgesListMap+'" class="span3 badge-thumb-wrap badgeParentDiv">'+
				   ' <div class="well">'+
				    	'<div class="dropdown badge-menu">'+
				    	  '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button">'+
				    	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
				    	  '</a>'+
				    		  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
				    		   '<li><a id="'+indexBadgesListMap+'" class="all_badge view_details">View Details</a></li>'
				buildEarnBadges +=    '<li><a id="'+indexBadgesListMap+'"  class="work_on_badge">Work on this Badge</a></li></ul></div>'+
				'<div class="badge-img">'+
					'<a ><img id="'+indexBadgesListMap+'" style="cursor:pointer" class="all_badge" src="'+badgesListMap[indexBadgesListMap].badgeLogoPath+'"></a></div>'+
				'<h4><a id="'+indexBadgesListMap+'" class="badgeName all_badge" >'+badgesListMap[indexBadgesListMap].badgeName+'</a></h4>';
				if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined" && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null")
					buildEarnBadges += '<small class="badgeDiscription"><p>'+badgesListMap[indexBadgesListMap].badgeDiscription.value+'</p></small>';
				buildEarnBadges +='</div></div>';
			}
	}
	
	buildEarnBadges += '<hr class="span9">'+
    '<div class="span9">'+
     ' AdaptiveYou Copyright 2012'+
    '</div>';
	
	$('#populate_badges').html(buildEarnBadges);
	
	//setTimeout( function(){ bindClickEvents(); } , 100 );
	
	bindClickEvents();
	
});

function stopWorkOnThisBadge(badgeInfo)
{
	//$(badgeInfo).hide();
	var badgeId = $(badgeInfo).attr('id').split("_")[0];
	var userStatusKey = $(badgeInfo).attr('id').split("_")[1];
	var companyKey	= singleUserProfile[userKey].companyId;
	
	$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).find('div.well').find('div.progress').remove();
	$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).find('ul.dropdown-menu').html('<li><a  class="view_details all_badge" id="'+badgeId+'">View Details</a></li><li><a id="'+badgeId+'" onclick="startWorkOnThisBadge(this)">Work On the badge</a></li>');
	$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).find('img#'+badgeId+'_'+userStatusKey).attr('id',badgeId);
	$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).find('a.badgeName').attr('id',badgeId); //view_details
	$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).find('a.view_details').attr('id',badgeId);
	$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).attr('id',badgeId);
	//console.log("After appending"+$('#populate_badges').find('div#'+badgeId+'_'+userStatusKey).find('ul.dropdown-menu').html());
	
	var parentDiv = $(badgeInfo).parents()[4];
	$.ajax({
		type	: 'POST', 
		url		: '/stopWorkingOnThisBadge' ,
		async	: true,
		data	: "badgeId="+badgeId+"&userKey="+userKey+"&companyKey="+companyKey+"&userStatusDetailsKey="+userStatusKey, 
		success	: function(data)
				  {
			 		 if(data != null)
			 		 {
			 			 $(parentDiv).find('.progress').remove();
			 			$("#voice-box").fadeIn();
						document.getElementById("statusMessage").innerHTML = "Removed from working on list!";
						document.getElementById("voice-box").setAttribute("status", "saved");
						setTimeout("hideStatusMessage()", 1750);
						
						delete userstatusdetails[userStatusKey];
						
						var workingOnBadgesArray = new Array();
						if(String(userBadgeLogJdoMap[userKey].badgesWorkingOn).indexOf(",") != -1)
							 String(userBadgeLogJdoMap[userKey].badgesWorkingOn).split(",");
						else if(String(userBadgeLogJdoMap[userKey].badgesWorkingOn) && userBadgeLogJdoMap[userKey].badgesWorkingOn != null && String(userBadgeLogJdoMap[userKey].badgesWorkingOn) != "null")
							workingOnBadgesArray.push(String(userBadgeLogJdoMap[userKey].badgesWorkingOn))
							
							var spliceIndex = workingOnBadgesArray.indexOf(badgeId);
							workingOnBadgesArray.splice(spliceIndex, 1);
						userBadgeLogJdoMap[userKey].badgesWorkingOn = String(workingOnBadgesArray);
			 		 }
				  }
	});
}
function startWorkOnThisBadge(badgeInfo)
{
 	jQuery._uuidlet									= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
	var userStatusDetailsKey 						= jQuery._uuidlet;
	var badgeKey									= $(badgeInfo).attr("id");
	
	if(String($(badgeInfo).html()).indexOf("Take the Challenge!") != -1)
	{
		$('#detailed_badges_description').find('div#'+badgeKey).attr("id",badgeKey+"_"+userStatusDetailsKey);
		$(badgeInfo).remove();
		$('#populate_badges').find('div#'+badgeKey).find('a.badgeName').attr("id",badgeKey+"_"+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).find('img.all_badge').attr("id",badgeKey+"_"+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).find('a.all_badge').attr("id",badgeKey+"_"+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).find('div.well').append('<div class="progress" id="'+userStatusDetailsKey+'"><div style="width: 20%;" class="bar bar-danger"></div></div>');
		//$('#populate_badges').find('div#'+badgeKey).find('ul.dropdown-menu').find('li#'+badgeKey).remove();
		$('#populate_badges').find('div#'+badgeKey).find('ul.dropdown-menu').html('<li><a  class="view_details all_badge" id="'+badgeKey+"_"+userStatusDetailsKey+'">View Details</a></li><li><a  onclick="stopWorkOnThisBadge(this)" id="'+badgeKey+"_"+userStatusDetailsKey+'">Stop working on this badge</a>');
		$('#populate_badges').find('div#'+badgeKey).find('img#'+badgeKey).attr('id',badgeKey+'_'+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).find('a.badgeName').attr('id',badgeKey+'_'+userStatusDetailsKey); //view_details
		//$('#populate_badges').find('div#'+badgeKey).find('a.view_details').attr('id',badgeKey+'_'+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).attr("id",badgeKey+"_"+userStatusDetailsKey);
		console.log("After making the dchanges");
	}
	else
	{
		
		$(badgeInfo).attr("id",badgeKey + '_' +userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).find('img#'+badgeKey).attr('id',badgeKey+'_'+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).find('a.badgeName').attr('id',badgeKey+'_'+userStatusDetailsKey); //view_details
		console.log($('#populate_badges').find('div#'+badgeKey).find('ul.dropdown-menu').html());
		 $(badgeInfo).parent().parent().parent().parent().append('<div class="progress" id="'+userStatusDetailsKey+'"><div style="width: 20%;" class="bar bar-danger"></div></div>');
		$('#populate_badges').find('div#'+badgeKey).find('ul.dropdown-menu').html('<li><a  class="view_details all_badge" id="'+badgeKey+"_"+userStatusDetailsKey+'">View Details</a></li><li><a onclick="stopWorkOnThisBadge(this)" id="'+badgeKey+"_"+userStatusDetailsKey+'">Stop working on this badge</a>');
		console.log("After appendin");
		//$('#populate_badges').find('div#'+badgeKey).find('a.view_details').attr('id',badgeKey+'_'+userStatusDetailsKey);
		$('#populate_badges').find('div#'+badgeKey).attr("id",badgeKey+"_"+userStatusDetailsKey);
		console.log("After making the dchanges");
		//Append stop wokring on this badge
		//$(badgeInfo).parent().parent().append('<li><a id="'+badgeKey+'_' +userStatusDetailsKey+'" class="stop_working_on_badge" onclick="stopWorkOnThisBadge(this)">Stop working on this badge</a></li>');
//		 $(".stop_working_on_badge").bind('click',function()
//				 {
//			 		stopWorkOnThisBadge($(this));
//				 });
		 
		 $('.badgeDiscription').hide();
		
		 $(badgeInfo).remove();
	}	
	
	var badgeType									= "";
	for(indexBadge in badgesListMap)
 	{
		if(indexBadge.indexOf(badgeKey) != -1)
		{
			badgeType 									= badgesListMap[indexBadge].badgeType;
		}
	}
	
	$.ajax({
		type		: 'POST', 
		url			: '/updatebadgestoworkon' ,
		data		: "userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+badgeKey+"&userid="+userKey+"&badgeType="+badgeType, 
		success		: function(data)
		{ 
			
			$("#voice-box").fadeIn();
			document.getElementById("statusMessage").innerHTML = "Added to working on list!";
			document.getElementById("voice-box").setAttribute("status", "saved");
			setTimeout("hideStatusMessage()", 1750);
			 for(userBadgeIndex in userBadgeLogJdoMap)
			 {
				if(userBadgeLogJdoMap[userBadgeIndex].userId.indexOf(userKey) != -1 )
				{
					if(badgeType.indexOf('badge') != -1)
					{
						var currentBadges = new Array();
						if(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn)
						if(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn.indexOf(",") != -1)
						{
							currentBadges = userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn.split(",");
						}
						
						else if(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn)
						{
							currentBadges.push(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn);
						}
						
						currentBadges.push(badgeKey);
						userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn = currentBadges;
					}
				    else if(badgeType.indexOf('trophy') != -1)
					{
						var currentBadges = new Array();
						if(userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn.indexOf(",") != -1)
						{
							currentBadges = userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn.split(",");
						}
						
						else if(userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn)
						{
							currentBadges.push(userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn);
						}
						
						currentBadges.push(badgeKey);
						userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn = currentBadges;
					}
				 }
			 }
			 
			//update userStatusDetails
			 var updateUserStatusJsonObject          					= new Object();
		     var addVideoStatusArray         		 					= new Array();
		     
		     for(index in badgesListMap)
		     {
		    	 if(index === badgeKey)
		    	 {
		    		 updateUserStatusJsonObject.key						= userStatusDetailsKey;
			         updateUserStatusJsonObject.stuffid     			= index; 
			         updateUserStatusJsonObject.status     				= "working on";
			         updateUserStatusJsonObject.typeRequested   		= badgesListMap[index].badgeType;
			         updateUserStatusJsonObject.userId     				= userKey;
			         for(var i = 0;i<badgesListMap[index].videoid.length;i++)
			         {
			        	 addVideoStatusArray.push(badgesListMap[index].videoid[i]+":not started");
			         } 
			         updateUserStatusJsonObject.videostatus    			= addVideoStatusArray;
		    	  }
		      } 
		      userstatusdetails[userStatusDetailsKey]      				= updateUserStatusJsonObject;
		      
		      
		}
	});
}
function searchBadges()
{
	var searchId = $("#search_for_badge").val();
	$("div.badgeParentDiv").hide();
	$("#placeholder_text").hide();
	var toShow = $("div#populate_badges").find("a.badgeName:containsi('"+searchId+"')").parents()[2];
	if(toShow && toShow != undefined)
		{
			$("#placeholder_text").hide();
			$(toShow).show();
			$("#placeholder_text").hide();
		}
	else
		{
			$("#placeholder_text").show();
			$("#placeholder_text").html("Sorry,the badge you are searching for doesn't exist :(");
		}
	if(searchId == "")
		{
			$("#placeholder_text").hide();
			$("div.badgeParentDiv").show();
		}
		
}
function blank(blankText)
{
	console.log("blank");
	$('#search_cus').val(""); 	
	
}
function unblank(blankText)
{
	console.log("unblank");
	$("tr.person-listing").show();
	$("#placeholder_text").hide();
	$('#search_cus').val("Find a person..."); 		
}
function buildPeopleWorkingOnThisBadge(badgeId)
{
	var peopleWhoWorkOnThisBadge = "";
	for(indexUserBadgeDetails in userBadgeLogJdoMap)
	{
		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).indexOf(badgeId) != -1 || String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).indexOf(badgeId) != -1)
		{
			for(indexUserProfileDetails in userProfileMap)
			{
				if(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId).indexOf(indexUserProfileDetails) != -1)
				{
					if(userProfileMap[indexUserProfileDetails].profilePicture && userProfileMap[indexUserProfileDetails].profilePicture != "" && userProfileMap[indexUserProfileDetails].profilePicture != "undefined")
						peopleWhoWorkOnThisBadge 					+= '<li class="">'+
			            '<a href="#">'+
			            '<img src="'+String(userProfileMap[indexUserProfileDetails].profilePicture).replace("/photo.jpg","/s42-c/photo.jpg")+'">'+
			            '</a>';
					else
						peopleWhoWorkOnThisBadge 			+= 		'<li class="">'+
			            '<a href="#">'+
			            '<img src="http://placehold.it/40x40&amp;text=Hello world">'+
			            '</a>';
				}
			}
			
		}

	}
	 return peopleWhoWorkOnThisBadge;
}
function bindClickEvents()
{
	$('.all_badge').bind("click",function()
			{
				$('#badge_detail_holder').show();
				$('#populate_badges').hide();
				var badgeId 		= $(this).attr("id").split("_")[0];
				var userStatusId	= "";
				if($(this).hasClass("view_details"))
					{
						var badgeInfo =  $(this).parents()[4];
						 userStatusId	= $(badgeInfo).find('.progress').attr("id");	
					}
				else
					{
						userStatusId	= $(this).attr("id").split("_")[1];
					}
				console.log("badgeId ::"+badgeId);
				console.log("userStatusId ::"+userStatusId);
				var badgeAssignee 	= "";
				var buildDetailedBadgeDes = "";
				
				if(userStatusId && userStatusId != "" && String(userStatusId) != "undefined" && userStatusId != null && userStatusId != "null")
				{
					for(indexUserStatusDetails in userstatusdetails)
					{
						if(indexUserStatusDetails.indexOf(userStatusId) != -1)
							{
								for(indexBadgesList in badgesListMap)
								{
									for(indexUserProfile in userProfileMap)
									{
										if(badgesListMap[indexBadgesList].badgeAssignee.indexOf(indexUserProfile) != -1)
											{
												badgeAssignee = userProfileMap[indexUserProfile].firstName + ' ' + userProfileMap[indexUserProfile].lastName;
											}
									}
									
										if(String(indexBadgesList).indexOf(badgeId) != -1)
											{
												buildDetailedBadgeDes += '<ul class="breadcrumb">'+
											    '<li><a id="back_to_challenges" href="#">Challenges</a> <span class="divider">/</span></li>'+
											    '<li id="detailed_badge_name" class="active">'+badgesListMap[indexBadgesList].badgeName+'</li>'+
											    '<li class="pull-right">'+
											    	'<div  style="display:none" class="dropdown badge-menu">'+
											      '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >'+
											      	'<i class="dropdown-toggle icon-align-justify"></i>'+
											     ' </a>'+
											      '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
											    	 '  <li><a id="'+badgeId+'_'+indexUserStatusDetails+'" class="all_badge view_details" id="'+badgeId+'">View Details</a></li>'+
											    	  ' <li><a id="'+badgeId+'_'+indexUserStatusDetails+'" class="stop_working_on_badge">Stop Working on this Badge</a></li>'+
											    	  ' <li class="divider"></li>'+
											    	  ' <li><a href="#">Share Badge...</a></li>'+
											     ' </ul>'+
											  '  </div></li>'+
											 ' </ul>'+
											 '<div class="well badge-detail" id="'+indexBadgesList+'_'+indexUserStatusDetails+'">       '+       
									              '<div class=" span3 badge-img-wrap">	  '+            	
										          '	<div class="badge-img">'+
											           ' <img src="'+badgesListMap[indexBadgesList].badgeLogoPath+'" />'+
											       ' </div>'+
											        '<div class="progress-wrapper">'+
												       ' <div class="progress">';
												
												if(userstatusdetails[indexUserStatusDetails].status.indexOf('working on') != -1)
													buildDetailedBadgeDes +=
													        '<div class="bar bar-danger" style="width:10%;"></div>';
												else if(userstatusdetails[indexUserStatusDetails].status.indexOf('requested') != -1)
													buildDetailedBadgeDes +=
												        	'<div class="bar bar-danger" style="width: 100%;"></div>';
												else if(userstatusdetails[indexUserStatusDetails].status.indexOf('approved') != -1)
													buildDetailedBadgeDes +=
												        	'<div style="display:none" class="bar bar-danger" style="width: 100%;"></div>';
												
												buildDetailedBadgeDes +=      ' </div></div>';
												buildDetailedBadgeDes += '<ul class="related-peeps"><li class="list-header"><h4>Peeps who\'ve done this</h4></li>'+buildPeopleWorkingOnThisBadge(badgeId)+'</ul> </div>';
												buildDetailedBadgeDes += 	 '<div class="span8">'+
								            	'<h2>'+
								              	''+badgesListMap[indexBadgesList].badgeName+''+
								            	'<span class="pull-right"><i class="coin-med"></i>'+badgesListMap[indexBadgesList].badgeValue+'</span>'+
								            	'</h2>'+
								            	'<p>By <a href="#">'+badgeAssignee+'</a></p>';
								            	if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined"  && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null")
								            		buildDetailedBadgeDes +=  '<p>'+badgesListMap[indexBadgesList].badgeDiscription.value+'</p>';
													
												var videoArray		= new Array();
												if(String(userstatusdetails[indexUserStatusDetails].videostatus).indexOf(",") != -1)
													videoArray		= String(userstatusdetails[indexUserStatusDetails].videostatus).split(",");
												else if(String(userstatusdetails[indexUserStatusDetails].videostatus) && String(userstatusdetails[indexUserStatusDetails].videostatus) != null && String(userstatusdetails[indexUserStatusDetails].videostatus) != undefined && String(userstatusdetails[indexUserStatusDetails].videostatus) != "null"  && String(userstatusdetails[indexUserStatusDetails].videostatus) != "undefined")
													videoArray.push(String(userstatusdetails[indexUserStatusDetails].videostatus));
												var videoId = "";
													buildDetailedBadgeDes +='<div id="'+indexUserStatusDetails+'" class="tabbable" style="margin-bottom: 18px;">'+
								                  '<ul class="nav nav-tabs">'+
								                  '  <li class="active"><a href="#tab1" data-toggle="tab">Exercises</a></li>'+
								                  '  <li><a href="#tab2" data-toggle="tab">Comments</a></li>'+
								                  '  <li><a href="#tab3" data-toggle="tab">Feedback</a></li>'+
								                 ' </ul>'+
								                 ' <div class="tab-content">'+
								                 '   <div class="tab-pane active" id="tab1"> <div class="accordion" id="accordion2">';//here comes the video part
													var indexAccordation = 1;
													//console.log("videoArray ::"+videoArray);
													if(videoArray.length > 0)
														for(var i=0;i<videoArray.length;i++)
															{
//																for(indexVideoDetails in videodetailsMap)
//																	{
//																	if(indexVideoDetails.indexOf(videoArray[i]) != -1)
//																		{
																	
																	videoId		= String(videoArray[i]).split(":")[0];
																	
																		 buildDetailedBadgeDes +=' <div class="accordion-group">'+
																			 '<div class="accordion-heading">'+
																			 ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapse'+indexAccordation+'">'+
																			 ' <h4>'+
																			 ' 	<span class="ex-num">'+indexAccordation+'</span>'+
																			 ' 	<i class="icon-play-circle"></i> '+
																			 '	Watch this video'+
																			 ' </h4>'+
																			 ' </a>'+
																			 '</div>'+
																			 ' <div id="collapse'+indexAccordation+'" class="accordion-body collapse">'+
																			 '<div class="accordion-inner">'+
																			 ' <img class="videoThumbNail" thisUserStatusKey="'+userstatusdetails[indexUserStatusDetails].key+'" thisVideoId = "'+videodetailsMap[videoId].videoId+'" style="cursor:pointer;" id="'+videodetailsMap[videoId].key+'" src="'+videodetailsMap[videoId].videothumbnail+'" />'+
//																			 '  <iframe width="300" height="215" src="'+videodetailsMap[indexVideoDetails].videourl+'" frameborder="0" allowfullscreen></iframe>'+
																			 ' </div>'+
																			 ' </div>'+
																			 '</div>';
																		 indexAccordation = indexAccordation + 1;
//																		}
						
//																	}
															}
													 buildDetailedBadgeDes += 
													'<div class="accordion-group">'+
							                          '<div class="accordion-heading">'+
							                           ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseTwo">'+
							                            '  <h4>'+
							                              '	<span class="ex-num">'+indexAccordation+'</span>'+
							                              '	<i class="icon-pencil"></i>'+
							                              '	Write a quick summary'+
							                             ' </h4>'+
							                           ' </a>'+
							                          '</div>'+
							                          '<div id="collapseTwo" class="accordion-body collapse">'+
							                            '<div class="accordion-inner">'+
							                              '<form>'+
							                               ' <fieldset>'+
							                                '  <label>Write a brief summary about this video</label>';
													 if(userstatusdetails[indexUserStatusDetails].badgeReqContent != null && userstatusdetails[indexUserStatusDetails].badgeReqContent != "" && userstatusdetails[indexUserStatusDetails].badgeReqContent != undefined)
														 {
															 buildDetailedBadgeDes +=
									                                '  <textarea id="badge_request_content" class="summary" >'+userstatusdetails[indexUserStatusDetails].badgeReqContent+'</textarea>'+
									                               ' </fieldset>'+
									                             ' </form>'+
									                           ' </div>'+
									                         ' </div>'+
									                       ' </div>';
														 }
													 else
														 {
															 buildDetailedBadgeDes +=
									                                '  <textarea id="badge_request_content" class="summary" placeholder="Keep it concise and sweet!"></textarea>'+
									                               ' </fieldset>'+
									                             ' </form>'+
									                           ' </div>'+
									                         ' </div>'+
									                       ' </div>';
														 }
							                                
							                       indexAccordation = indexAccordation + 1;
							                       console.log(String(userstatusdetails[indexUserStatusDetails].status));
													 if(String(userstatusdetails[indexUserStatusDetails].status) === "working on")
														 {
															 buildDetailedBadgeDes +='  <div class="accordion-group">'+
															 '    <div class="accordion-heading">'+
															 '      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseFour">'+
															 '        <h4>'+
															 '        	<span class="ex-num">'+indexAccordation+'</span>'+
															 '        	<i  class="icon-hand-right"></i>'+
															 '        	Submit for approval'+
															 '        </h4>	                              '+
															 '      </a>'+
															 '    </div>'+
															 '    <div id="collapseFour" class="accordion-body collapse">'+
															 '      <div class="accordion-inner">'+
															 '        <a id="submit_badge_request"  class="btn btn-large btn-green">Submit for Approval!</a>'+
															 '      </div>'+
															 '    </div>'+
															 '  </div>';
														 }
													 else
														 {
															 buildDetailedBadgeDes +='  <div class="accordion-group">'+
															 '    <div class="accordion-heading">'+
															 '      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseFour">'+
															 '        <h4>'+
															 '        	<span class="ex-num">'+indexAccordation+'</span>'+
															 '        	<i  class="icon-thumbs-up"></i>'+
															 '        	Your request has been sent!'+
															 '        </h4>	                              '+
															 '      </a>'+
															 '    </div>'+
															 '    <div  style="display:none" id="collapseFour" class="accordion-body collapse">'+
															 '      <div class="accordion-inner">'+
															 '        <a id="submit_badge_request"  class="btn btn-large btn-green">Your request has been sent!</a>'+
															 '      </div>'+
															 '    </div>'+
															 '  </div>';
														 }
													 
													// indexAccordation = indexAccordation + 1;
								                   
								                 buildDetailedBadgeDes += '</div></div>'+
													 '<div class="tab-pane" id="tab2">'+
													 '<p>Put the comments here!</p>'+
													 '</div>'+
													 '<div class="tab-pane" id="tab3">'+
													 '<p>Feeeeedback</p>'+
													 '  </div>'+
													 ' </div>'+
													 ' </div>'+
													 ' </div>'+
													 '<div class="clearfix"></div>'+
													 '</div>';	
								                
											}
								}
							}
						
					}
				$('#detailed_badges_description').html(buildDetailedBadgeDes);
			}
				else
					{
					
					for(indexBadgesList in badgesListMap)
					{
						if(String(indexBadgesList).indexOf(badgeId) != -1)
						{
									for(indexUserProfile in userProfileMap)
									{
										if(badgesListMap[indexBadgesList].badgeAssignee.indexOf(indexUserProfile) != -1)
											{
												badgeAssignee = userProfileMap[indexUserProfile].firstName + ' ' + userProfileMap[indexUserProfile].lastName;
											}
									}
									
									buildDetailedBadgeDes += '<ul class="breadcrumb">'+
								    '<li><a id="back_to_challenges" href="#">Challenges</a> <span class="divider">/</span></li>'+
								    '<li id="detailed_badge_name" class="active">'+badgesListMap[indexBadgesList].badgeName+'</li>'+
								    '<li class="pull-right">'+
								    	'<div  class="dropdown badge-menu"  style="display:none">'+
								      '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >'+
								      	'<i class="dropdown-toggle icon-align-justify"></i>'+
								     ' </a>'+
								      '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
								    	 '  <li><a id="'+indexBadgesList+'"class="all_badge view_details">View Details</a></li>'+
								    	  ' <li class="divider"></li>'+
								    	  ' <li><a href="#">Share Badge...</a></li>'+
								     ' </ul>'+
								  '  </div></li>'+
								 ' </ul>'+
								 '<div class="well badge-detail" id="'+indexBadgesList+'">       '+      
						              '<div class=" span3 badge-img-wrap">	  '+            	
							          '	<div class="badge-img">'+
								           ' <img src="'+badgesListMap[indexBadgesList].badgeLogoPath+'" /></div>';
									if(String(userBadgeLogJdoMap[userKey].badgeId).indexOf(indexBadgesList) != -1)
										{
											if(String(badgesListMap[indexBadgesList].canEarnedTwice).indexOf("true") != -1)
												buildDetailedBadgeDes += ' <a id="'+indexBadgesList+'"  class="btn btn-green btn-large" onclick="startWorkOnThisBadge(this)">Take the Challenge!</a>';
										}
									else
										buildDetailedBadgeDes += ' <a id="'+indexBadgesList+'"  class="btn btn-green btn-large" onclick="startWorkOnThisBadge(this)">Take the Challenge!</a>';
								     buildDetailedBadgeDes += '<ul class="related-peeps"><li class="list-header"><h4>Peeps who\'ve done this</h4></li>'+buildPeopleWorkingOnThisBadge(badgeId)+'</ul> </div>';
								        
									buildDetailedBadgeDes +='<div class="span8">'+
					            	'<h2>'+
					              	''+badgesListMap[indexBadgesList].badgeName+''+
					            	'<span class="pull-right"><i class="coin-med"></i>'+badgesListMap[indexBadgesList].badgeValue+'</span>'+
					            	'</h2>'+
					            	'<p>By <a href="#">'+badgeAssignee+'</a></p>';
									
					            	if(badgesListMap[indexBadgesListMap].badgeDiscription && badgesListMap[indexBadgesListMap].badgeDiscription != null && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "undefined"  && String(badgesListMap[indexBadgesListMap].badgeDiscription) != "null")
					            		buildDetailedBadgeDes += '<p>'+badgesListMap[indexBadgesList].badgeDiscription.value+'</p>';
										
										var videoArray = new Array();
										if(badgesListMap[indexBadgesList].videoid && badgesListMap[indexBadgesList] != null && badgesListMap[indexBadgesList] != "null")
											{
												if(badgesListMap[indexBadgesList].videoid.indexOf(",") != -1)
													videoArray = String(badgesListMap[indexBadgesList].videoid).split(",");
												else if(badgesListMap[indexBadgesList].videoid != "" && badgesListMap[indexBadgesList].videoid != "null" && badgesListMap[indexBadgesList].videoid != null )
													videoArray.push(badgesListMap[indexBadgesList].videoid);
													
											}
										buildDetailedBadgeDes +='<div 	 class="tabbable" style="margin-bottom: 18px;">'+
					                  '<ul class="nav nav-tabs">'+
					                  '  <li class="active"><a href="#tab1" data-toggle="tab">Exercises</a></li>'+
					                  '  <li><a href="#tab2" data-toggle="tab">Comments</a></li>'+
					                  '  <li><a href="#tab3" data-toggle="tab">Feedback</a></li>'+
					                 ' </ul>'+
					                 ' <div class="tab-content">'+
					                 '   <div class="tab-pane active" id="tab1"> <div class="accordion" id="accordion2">';//here comes the video part
										var indexAccordation = 1;
										if(videoArray.length > 0)
											for(var indexVideo = 0; indexVideo<videoArray.length;indexVideo++)
								            {
								             for(indexVideoDetails in videodetailsMap)
								              {
								              if(indexVideoDetails.indexOf(videoArray[indexVideo]) != -1)
								               {
								                 buildDetailedBadgeDes +=' <div class="accordion-group">'+
								                  '<div class="accordion-heading">'+
								                  ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseOne">'+
								                  ' <h4>'+
								                  '  <span class="ex-num">'+indexAccordation+'</span>'+
								                  '  <i class="icon-play-circle"></i> '+
								                  ' Watch this video'+
								                  ' </h4>'+
								                  ' </a>'+
								                  '</div>'+
								                  ' <div id="collapseOne" class="accordion-body collapse">'+
								                  '<div class="accordion-inner">'+
								                  '  <iframe width="300" height="215" src="'+videodetailsMap[indexVideoDetails].videourl+'" frameborder="0" allowfullscreen></iframe>'+
								                  ' </div>'+
								                  ' </div>'+
								                  '</div>';
								                 indexAccordation = indexAccordation + 1;
								               }
								   
								              }
								            }
										 buildDetailedBadgeDes += 
										'<div class="accordion-group">'+
				                          '<div class="accordion-heading">'+
				                           ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseTwo">'+
				                            '  <h4>'+
				                              '	<span class="ex-num">'+indexAccordation+'</span>'+
				                              '	<i class="icon-pencil"></i>'+
				                              '	Write a quick summary'+
				                             ' </h4>'+
				                           ' </a>'+
				                          '</div>'+
				                          '<div id="collapseTwo" class="accordion-body collapse">'+
				                            '<div class="accordion-inner">'+
				                              '<form>'+
				                               ' <fieldset>'+
				                                '  <label>Write a brief summary about this video</label>'+
				                                '  <textarea id="badge_request_content" class="summary" placeholder="Keep it concise and sweet!"></textarea>'+
				                               ' </fieldset>'+
				                             ' </form>'+
				                           ' </div>'+
				                         ' </div>'+
				                       ' </div>';
				                       indexAccordation = indexAccordation + 1;
										 
										 buildDetailedBadgeDes +='  <div class="accordion-group">'+
										 '    <div class="accordion-heading">'+
										 '      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseFour">'+
										 '        <h4>'+
										 '        	<span class="ex-num">'+indexAccordation+'</span>'+
										 '        	<i  class="icon-hand-right"></i>'+
										 '        	Submit for approval'+
										 '        </h4>	                              '+
										 '      </a>'+
										 '    </div>'+
										 '    <div id="collapseFour" class="accordion-body collapse">'+
										 '      <div class="accordion-inner">'+
										 '        <a id="submit_badge_request"  class="btn btn-large btn-green">Submit for Approval!</a>'+
										 '      </div>'+
										 '    </div>'+
										 '  </div>';
										 
										// indexAccordation = indexAccordation + 1;
					                   
					                 buildDetailedBadgeDes += '</div></div>'+
										 '<div class="tab-pane" id="tab2">'+
										 '<p>Put the comments here!</p>'+
										 '</div>'+
										 '<div class="tab-pane" id="tab3">'+
										 '<p>Feeeeedback</p>'+
										 '  </div>'+
										 ' </div>'+
										 ' </div>'+
										 ' </div>'+
										 '<div class="clearfix"></div>'+
										 '</div>';	
					                
								}
							
					
					}
					$('#detailed_badges_description').html(buildDetailedBadgeDes);
					}
				
				 $('#submit_badge_request').bind("click",function()
					{
					 var badge_request_content 	= $('#badge_request_content').val();
					 if(badge_request_content != "" && badge_request_content != "null" && badge_request_content != null && badge_request_content != undefined && badge_request_content != "undefined" )
						 {
					 			$(this).parent().hide();
					 			var submitApproval = $('.icon-hand-right').parent().html();
					 			submitApproval = submitApproval.replace("Submit for approval","Your request has been sent");
					 			$('.icon-hand-right').parent().html(submitApproval);
					 			$('.icon-hand-right').toggleClass('icon-hand-right icon-thumbs-up');
					 			
								var userStatusKey 			= $(this).parents('div').find('.badge-detail').attr('id').split("_")[1];
								var badgeKey				= $(this).parents('div').find('.badge-detail').attr('id').split("_")[0];
								
								$.ajax({
									type	: 'POST', 
									url		: '/updateRequestForBadge' ,
									async	: true,
									data	: "userStatusKey="+userStatusKey+"&userId="+userKey+"&badgeReqContent="+badge_request_content, 
									success	: function(data)
											  {
										 		 if(data != null)
										 		 {
										 			$("#voice-box").fadeIn();
													document.getElementById("statusMessage").innerHTML = "Request has been sent!";
													document.getElementById("voice-box").setAttribute("status", "saved");
													setTimeout("hideStatusMessage()", 1750);
										 			for(confirmuser in userstatusdetails)
													{
														if(confirmuser.indexOf(userStatusKey) != -1)
														{
															if(String(userstatusdetails[confirmuser].stuffid).indexOf(badgeKey) != -1 && String(userstatusdetails[confirmuser].status) === "working on")
															{
																userstatusdetails[confirmuser].badgeReqContent 		= badge_request_content;
																userstatusdetails[confirmuser].status 				= "requested";
															}
														}
													}
										 		 }
											  }
								});
						 }
					 else
						 {
						 	alert('Please provide a discription');
						 }
					 });
				 				 
//				 $('.work_on_badge').bind("click",function()
//					{
//					 	startWorkOnThisBadge($(this));
//					}); 
				
				//Binded because we build back_to_working_on it here
				$('#back_to_challenges').bind("click",function()
						{
							$('#badge_detail_holder').hide();
							$('#populate_badges').show();
						});
				$("img.videoThumbNail").on("click",function(event)
				{
					
					var videoId				 	 = $(this).attr("thisVideoId");
					loadedVideoKey			 = $.trim($(this).attr("id"));
					thisUserStatuskey		 = $.trim($(this).attr("thisUserStatusKey"));
					
						
					var videoArray		= String(userstatusdetails[thisUserStatuskey].videostatus).split(",");
					
					if(videoArray.length > 0)
						for(var i=0;i<videoArray.length;i++)
							{
								if(String($.trim(videoArray[i])).indexOf(String($.trim(loadedVideoKey))) != -1)
								{
									previousStatus				= String($.trim(videoArray[i])).split(":")[1];
									
									if(String(previousStatus) === "completed" || String(previousStatus) === "not started")
									{
										startingTime			= 0;
									}
									else
									{
										startingTime			= parseInt(previousStatus);
									}	
								}
							}	
					
					
					$('#video_popup').youTubeEmbed({
								video           : 'http://www.youtube.com/watch?v='+videoId,
							    width           : 800,      
							    progressBar 	: true
					});
					
					$('#video_popup_holder').bPopup().fadeIn();
					
					$(window).trigger("resize");
					
					$(".bModal").on("click",function(){
						
						storingVideoStatus("click");
						
					});
				});
				
			});
	

	 $('.work_on_badge').bind("click",function()
				{
				 	startWorkOnThisBadge(this);
				});
	 
	 $('#earnBadges_page').bind('click',function()
				{
					$('#me_page').removeClass('active');
					$('#others_page').removeClass('active');
					$('#earnBadges_page').addClass('active');
				});
	 
	 $(".stop_working_on_badge").bind('click',function()
			 {
		 		stopWorkOnThisBadge($(this));
			 });
	 $("#earnBadges_page").bind('click',function()
			 {
		 		$('#populate_badges').show();
		 		$('.detailed_badges_description').hide();
			 });

}
