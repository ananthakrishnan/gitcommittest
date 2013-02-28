$(document).ready(function() 
{
	//To display the userName and  points
	var userPoints 		= "";
	var userImage		= "";
	var userEmailId		= "";
	
	for(indexUserBadgeLogJdoMap in userBadgeLogJdoMap)
		{
			for(indexUserDetails in userDetails)
				{
					if(userBadgeLogJdoMap[indexUserBadgeLogJdoMap].userId.indexOf(indexUserDetails) != -1)
						{
							userPoints = userBadgeLogJdoMap[indexUserBadgeLogJdoMap].points;
							userImage  = userDetails[indexUserDetails].profilePicture;
							userKey	   = indexUserDetails;
							userEmailId= userDetails[indexUserDetails].userName;
						}
				}
		}
	$('.user_email_id').html(userEmailId);
	$('#user_name').html(userFirstName + " "+ userLastName+'<span class="pull-right"><i class="coin-large"></i>'+userPoints+'</span>');
	$('.user-photo').attr('src',userImage);
	
	//Build the working on badges
	var badgesWorkingOn	= '<div class="span12 challanges_div">'+
        		'<h3  class="no-top-mar"><span id="challenges_count"></span> '+
        			'<span id="achievements_count" style="display:none"></span>'+
        			'<span id="pending_count" style="display:none"></span>'+
        			'<div class="btn-group pull-right" id="switch_workingon_completed">'+
        				'<button id="working_on_badges" class="btn active"><i class="icon-refresh"></i> Working On</button>'+
        				'<button id="pending_badges" class="btn"><i class="icon-time"></i> Pending</button>'+
        				'<button id="completed_badges" class="btn"><i class="icon-ok"></i> Completed</button>'+
        			'</div>'+
        		'</h3>'+
        		'<span class="divider">&nbsp;</span>'+
        	'</div>';
	
	var workingOnBadgesArray = new Array();
	var completedBadgesArray = new Array();
	var pendingBadgesArray	 = new Array();
	for(indexUserStatusDetails in userstatusdetails)
	{ 
		//console.log(indexUserStatusDetails);
	if(String(userstatusdetails[indexUserStatusDetails].userId).indexOf(userKey) != -1 )
		{
		//console.log("status ::"+userstatusdetails[indexUserStatusDetails].status);
		for(indexBadgeList in badgesListMap)
			{
			
				if(String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(indexBadgeList) != -1 && String(userstatusdetails[indexUserStatusDetails].status).indexOf("working on") != -1)
					{
					
						workingOnBadgesArray.push(indexBadgeList);
						badgesWorkingOn +=   
						'<div id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="workingon span3 badge-thumb-wrap">'+
			             ' <div class="well">'+
			               ' <!-- Badge menu -->'+
			              	'<div class="dropdown badge-menu"> '+
			              	'  <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >'+
			              	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
			              	  '</a>'+
			              	  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
				              	  ' <li><a id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="all_badge" >View Details</a></li>'+
				              	  ' <li><a id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="stop_work_on_badge">Stop Working on this Badge</a></li>'+
				              	  ' <li class="divider"></li>'+
				              	  ' <li><a href="#">Share Badge...</a></li>'+
			              	  '</ul>'+
			              	'</div><!-- End badge menu --> '+
			              	
			              	'<div class="badge-img">'+
				              	'<a href="#" role="button">'+
				  	            	'<img id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="all_badge" style="cursor:pointer" src="'+badgesListMap[indexBadgeList].badgeLogoPath+'" />'+
				  	           ' </a>'+
			  	            '</div>'+
			                '<h4 id="'+indexBadgeList+'_'+indexUserStatusDetails+'" style="cursor:pointer" class="workingon all_badge" >'+
			                ''+badgesListMap[indexBadgeList].badgeName+''+
			                '</h4>'+
			                '<div class="progress">'+
			                 ' <div class="bar bar-danger" style="width: 10%;"></div>'+
			                '</div>'+
			                
			              '</div><!-- End well -->'+
			           ' </div>';
					}
				else if(String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(indexBadgeList) != -1 && String(userstatusdetails[indexUserStatusDetails].status).indexOf("approved") != -1)
					{
						completedBadgesArray.push(indexBadgeList);
					
						badgesWorkingOn +=   
							'<div id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="completed span3 badge-thumb-wrap" style="display:none">'+
				             ' <div class="well">'+
				               ' <!-- Badge menu -->'+
				              	'<div class="dropdown badge-menu"> '+
				              	'  <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >'+
				              	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
				              	  '</a>'+
				              	  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
					              	  ' <li><a id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class=" all_badge">View Details</a></li>'+
					              	  ' <li style="display:none"><a id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="stop_work_on_badge">Stop Working on this Badge</a></li>'+
					              	  ' <li class="divider"></li>'+
					              	  ' <li><a href="#">Share Badge...</a></li>'+
				              	  '</ul>'+
				              	'</div><!-- End badge menu --> '+
				              	
				              	'<div class="badge-img">'+
					              	'<a href="#" role="button">'+
					  	            	'<img id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="all_badge" style="cursor:pointer"  src="'+badgesListMap[indexBadgeList].badgeLogoPath+'" />'+
					  	           ' </a>'+
				  	            '</div>'+
				                '<h4 id="'+indexBadgeList+'_'+indexUserStatusDetails+'" style="cursor:pointer" class="completed all_badge">'+
				                ''+badgesListMap[indexBadgeList].badgeName+''+
				                '</h4>'+
				                '<div class="progress" style="display:none">'+
				                 ' <div class="bar bar-success" style="width: 100%;"></div>'+
				                '</div>'+
				                
				              '</div><!-- End well -->'+
				           ' </div>';
					}
				else if(String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(indexBadgeList) != -1 && String(userstatusdetails[indexUserStatusDetails].status).indexOf("requested") != -1)
					{
					pendingBadgesArray.push(indexBadgeList);
						badgesWorkingOn +=   
							'<div id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="requested span3 badge-thumb-wrap" style="display:none">'+
				             ' <div class="well">'+
				               ' <!-- Badge menu -->'+
				              	'<div class="dropdown badge-menu"> '+
				              	'  <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >'+
				              	  	'<i class="dropdown-toggle icon-align-justify"></i>'+
				              	  '</a>'+
				              	  '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">'+
					              	  ' <li><a id="'+indexBadgeList+'" style="cursor:pointer" class = " all_badge">View Details</a></li>'+
					              	  ' <li><a style="display:none">Stop Working on this Badge</a></li>'+
					              	  ' <li class="divider"></li>'+
					              	  ' <li><a href="#">Share Badge...</a></li>'+
				              	  '</ul>'+
				              	'</div><!-- End badge menu --> '+
				              	
				              	'<div class="badge-img">'+
					              	'<a href="#" role="button">'+
					  	            	'<img id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class = "all_badge" src="'+badgesListMap[indexBadgeList].badgeLogoPath+'" />'+
					  	           ' </a>'+
				  	            '</div>'+
				                '<h4 id="'+indexBadgeList+'_'+indexUserStatusDetails+'" style="cursor:pointer" class="requested all_badge">'+
				                ''+badgesListMap[indexBadgeList].badgeName+''+
				                '</h4>'+
				                '<div class="progress">'+
				                ' <div class="bar bar-success" style="width: 100%;"></div>'+
				                '</div>'+
				                
				              '</div><!-- End well -->'+
				           ' </div>';
					}
			}
		}
	}
	
	badgesWorkingOn +=    '<hr class="span12">'+
     '<div class="span12">'+
       'AdaptiveYou Copyright 2012'+
     '</div>';
	$('#build_workingon_badges').html(badgesWorkingOn);
	$('#build_workingon_badges').show();
	
	$('#challenges_count').html(workingOnBadgesArray.length+" Challenges");
	$('#achievements_count').html(completedBadgesArray.length+" Achievements");
	$('#pending_count').html(pendingBadgesArray.length+ " Pending Request");
	
	
	
	
	
	var buildNotifications = '<div class="span8 notifications-body offset0">'+
	'<h3>All Activity</h3>';
	for(notificationindexUserStatusDetails in userstatusdetails)
		{	
			if(userKey === userstatusdetails[notificationindexUserStatusDetails].userId && userstatusdetails[notificationindexUserStatusDetails].status === "approved")
				{
					buildNotifications += '<div class="media new">'+
		              '<a class="pull-left" href="#">'+
		                '<div class="badge-img">'+
		                '<img class="media-object all_badge notifications_badgeName" id="'+userstatusdetails[notificationindexUserStatusDetails].stuffid+'_'+notificationindexUserStatusDetails+'" data-src="holder.js/64x64" alt="64x64" style="width: 75px; height: 75px;" src="'+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeLogoPath+'">'+
		                '</div></a>'+
		              '<div class="media-body">'+
		                '<h4 class="media-heading">'+
		                	'<i class="icon-thumbs-up"></i> Approved! '+
		                	'<span class="pull-right time-stamp">'+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getDate()+"-"+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getMonth()+"-"+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getFullYear()+'</span>'+
		                '</h4>'+
		                '<p>Nice work! Youve won the <a class="all_badge notifications_badgeName" style="cursor:pointer" id="'+userstatusdetails[notificationindexUserStatusDetails].stuffid+'_'+notificationindexUserStatusDetails+'">'+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeName+'</a> challenge and collected '+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeValue+' points.</p> ';
						if(userstatusdetails[notificationindexUserStatusDetails].badgeReqContent && userstatusdetails[notificationindexUserStatusDetails].badgeReqContent != null && String(userstatusdetails[notificationindexUserStatusDetails].badgeReqContent) != "null" )
							buildNotifications +=	'<p>'+userstatusdetails[notificationindexUserStatusDetails].badgeReqContent+'</p> ';
						buildNotifications +='</div>'+
		            '</div>';
				}
			 if((userKey === String(userstatusdetails[notificationindexUserStatusDetails].userId) && String(userstatusdetails[notificationindexUserStatusDetails].status) === "requested"))
			{
				buildNotifications += '<div class="media new">'+
	              '<a class="pull-left" href="#">'+
	                '<div class="badge-img">'+
	                '<img class="media-object all_badge notifications_badgeName" id="'+userstatusdetails[notificationindexUserStatusDetails].stuffid+'_'+notificationindexUserStatusDetails+'" data-src="holder.js/64x64" alt="64x64" style="width: 75px; height: 75px;" src="'+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeLogoPath+'">'+
	                '</div></a>'+
	              '<div class="media-body">'+
	                '<h4 class="media-heading">'+
	                	'<i class="icon-thumbs-up"></i> Requested! '+
	                	'<span class="pull-right time-stamp">'+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getDate()+"-"+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getMonth()+"-"+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getFullYear()+'</span>'+
	                '</h4>'+
	                '<p>Youve requested for <a class="all_badge notifications_badgeName" style="cursor:pointer" id="'+userstatusdetails[notificationindexUserStatusDetails].stuffid+'_'+notificationindexUserStatusDetails+'">'+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeName+'</a> challenge!</p> ';
	                if(userstatusdetails[notificationindexUserStatusDetails].badgeReqContent && userstatusdetails[notificationindexUserStatusDetails].badgeReqContent != null && String(userstatusdetails[notificationindexUserStatusDetails].badgeReqContent) != "null" )
						buildNotifications +=	'<p>'+userstatusdetails[notificationindexUserStatusDetails].badgeReqContent+'</p> ';
					buildNotifications +='</div>'+
	            '</div>';
			} 
			 if((userKey === String(userstatusdetails[notificationindexUserStatusDetails].userId) && String(userstatusdetails[notificationindexUserStatusDetails].status) === "declined"))
				{
					buildNotifications += '<div class="media new">'+
		              '<a class="pull-left" href="#">'+
		                '<div class="badge-img">'+
		                '<img class="media-object all_badge notifications_badgeName" id="'+userstatusdetails[notificationindexUserStatusDetails].stuffid+'_'+notificationindexUserStatusDetails+'" data-src="holder.js/64x64" alt="64x64" style="width: 75px; height: 75px;" src="'+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeLogoPath+'">'+
		                '</div></a>'+
		              '<div class="media-body">'+
		                '<h4 class="media-heading">'+
		                	'<i class="icon-thumbs-down"></i> Declined :( '+
		                	'<span class="pull-right time-stamp">'+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getDate()+"-"+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getMonth()+"-"+(new Date(userstatusdetails[notificationindexUserStatusDetails].dateApproved)).getFullYear()+'</span>'+
		                '</h4>'+
		                '<p>Your request for <a class="all_badge notifications_badgeName" style="cursor:pointer" id="'+userstatusdetails[notificationindexUserStatusDetails].stuffid+'_'+notificationindexUserStatusDetails+'">'+badgesListMap[userstatusdetails[notificationindexUserStatusDetails].stuffid].badgeName+'</a> has been declined by '+userProfileMap[userstatusdetails[notificationindexUserStatusDetails].badgeAssignee].firstName+' '+userProfileMap[userstatusdetails[notificationindexUserStatusDetails].badgeAssignee].lastName+'</p> ';
		                if(userstatusdetails[notificationindexUserStatusDetails].badgeReqContent && userstatusdetails[notificationindexUserStatusDetails].badgeReqContent != null && String(userstatusdetails[notificationindexUserStatusDetails].badgeReqContent) != "null" )
							buildNotifications +=	'<p>'+userstatusdetails[notificationindexUserStatusDetails].badgeReqContent+'</p> ';
						buildNotifications +='</div>'+
		            '</div>';
				}
		}
	buildNotifications += "</div>";
	$('#all_notifications').html(buildNotifications);
	
	bindClickEvents();
});
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
					if(userProfileMap[indexUserProfileDetails].profilePicture)
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
	
	$('#working_on_badges').bind("click",function()
			{
				$('#working_on_badges').addClass('active');
				$('#completed_badges').removeClass('active');
				$('#pending_badges').removeClass('active');
				$('.completed').hide();
				$('.requested').hide();
				$('.workingon').show();
				$('#achievements_count').hide();
				$('#challenges_count').show();
				$('#pending_count').hide();
			});
	$('#completed_badges').bind("click",function()
			{
				$('#completed_badges').addClass('active');
				$('#working_on_badges').removeClass('active');
				$('#pending_badges').removeClass('active');
				$('.workingon').hide();
				$('.completed').show();
				$('.requested').hide();
				$('#achievements_count').show();
				$('#challenges_count').hide();
				$('#pending_count').hide();
			});
	$('#pending_badges').bind("click",function()
			{
				$('#completed_badges').removeClass('active');
				$('#working_on_badges').removeClass('active');
				$('#pending_badges').addClass('active');
				$('.workingon').hide();
				$('.completed').hide();
				$('.requested').show();
				$('#achievements_count').hide();
				$('#challenges_count').hide();
				$('#pending_count').show();
			});
		
	$('.all_badge').bind("click",function()
			{
				$('#badge_detail_holder').show();
				$('#build_workingon_badges').hide();
				$('.challanges_div').hide();
				$('#notifications_holder').hide();
				
				var badgeId 		= $(this).attr('id').split("_")[0];
				var userStatusId	= $(this).attr('id').split("_")[1];
				var badgeAssignee 	= "";
				var buildDetailedBadgeDes = "";
				
					for(indexUserStatusDetails in userstatusdetails)
					{
					////console.log("BAdgeKey ::"+indexBadgesList);
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
										if(String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(badgeId) != -1 && indexBadgesList.indexOf(badgeId) != -1)
											{
												buildDetailedBadgeDes += '<ul class="breadcrumb">';
												if($(this).hasClass('notifications_badgeName'))
													buildDetailedBadgeDes += '<li><a id="back_to_notifications" href="#">Notifications</a> <span class="divider">/</span></li>';
												else if(userstatusdetails[indexUserStatusDetails].status.indexOf('working on') != -1)
													buildDetailedBadgeDes += '<li><a id="back_to_working_on" href="#">Working On</a> <span class="divider">/</span></li>';
												else if(userstatusdetails[indexUserStatusDetails].status.indexOf('requested') != -1)
													buildDetailedBadgeDes += '<li><a id="back_to_working_on" href="#">Pending Request</a> <span class="divider">/</span></li>';
												else if(userstatusdetails[indexUserStatusDetails].status.indexOf('approved') != -1)
													buildDetailedBadgeDes += '<li><a id="back_to_working_on" href="#">Completed</a> <span class="divider">/</span></li>';
												buildDetailedBadgeDes += '<li id="detailed_badge_name" class="active">'+badgesListMap[indexBadgesList].badgeName+'</li>'+
											    '<li class="pull-right">'+
											    	'<div class="dropdown badge-menu">'+
											      '<a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >'+
											      	'<i class="dropdown-toggle icon-align-justify"></i>'+
											     ' </a>'+
											      '<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">';
											      if(userstatusdetails[indexUserStatusDetails].status.indexOf('working on') != -1)
											    	  buildDetailedBadgeDes +=  ' <li><a id="'+indexBadgeList+'_'+indexUserStatusDetails+'" class="stop_work_on_badge">Stop Working on this Badge</a></li> <li class="divider"></li>';
											      buildDetailedBadgeDes +=    ' <li><a href="#">Share Badge...</a></li>'+
											     ' </ul>'+
											  '  </div></li>'+
											 ' </ul>'+
											 '<div class="well badge-detail">       '+       
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
												        	'<div class="bar bar-success" style="width: 100%;"></div>';
												else if(userstatusdetails[indexUserStatusDetails].status.indexOf('approved') != -1)
													buildDetailedBadgeDes +=
												        	'<div style="display:none" class="bar bar-danger" style="width: 100%;"></div>';
												
												buildDetailedBadgeDes +=      ' </div>'+
													'</div>    ';
												buildDetailedBadgeDes += '<ul class="related-peeps"><li class="list-header"><h4>Peeps who\'ve done this</h4></li>'+buildPeopleWorkingOnThisBadge(indexBadgesList)+'</ul> </div>';//;;
												
												buildDetailedBadgeDes +=  '<div class="span8">'+
								            	'<h2>'+
								              	''+badgesListMap[indexBadgesList].badgeName+''+
								            	'<span class="pull-right"><i class="coin-med"></i>'+badgesListMap[indexBadgesList].badgeValue+'</span>'+
								            	'</h2>'+
								            	'<p>By <a href="#">'+badgeAssignee+'</a></p>'+
								            	'<p>'+badgesListMap[indexBadgesList].badgeDiscription.value+'</p>';
													
//													var videoArray = new Array();
//													if(badgesListMap[indexBadgesList].videoid && badgesListMap[indexBadgesList] != null && badgesListMap[indexBadgesList] != "null")
//														{
//															if(String(badgesListMap[indexBadgesList].videoid).indexOf(",") != -1)
//																videoArray = String(badgesListMap[indexBadgesList].videoid).split(",");
//															else if(badgesListMap[indexBadgesList].videoid != "" && badgesListMap[indexBadgesList].videoid != "null" && badgesListMap[indexBadgesList].videoid != null )
//																videoArray.push(badgesListMap[indexBadgesList].videoid);
//																
//														}
													buildDetailedBadgeDes +='<div id="'+indexUserStatusDetails+'" class="tabbable" style="margin-bottom: 18px;">'+
								                  '<ul class="nav nav-tabs">'+
								                  '  <li class="active"><a href="#tab1" data-toggle="tab">Exercises</a></li>'+
								                  '  <li><a href="#tab2" data-toggle="tab">Comments</a></li>'+
								                  '  <li><a href="#tab3" data-toggle="tab">Feedback</a></li>'+
								                 ' </ul>'+
								                 ' <div class="tab-content">'+
								                 '   <div class="tab-pane active" id="tab1"> <div class="accordion" id="accordion2">';//here comes the video part
													var indexAccordation = 1;
													
													var videoArray		= new Array();
													if(String(userstatusdetails[indexUserStatusDetails].videostatus).indexOf(",") != -1)
														videoArray		= String(userstatusdetails[indexUserStatusDetails].videostatus).split(",");
													else if(String(userstatusdetails[indexUserStatusDetails].videostatus) && String(userstatusdetails[indexUserStatusDetails].videostatus) != null && String(userstatusdetails[indexUserStatusDetails].videostatus) != undefined && String(userstatusdetails[indexUserStatusDetails].videostatus) != "null"  && String(userstatusdetails[indexUserStatusDetails].videostatus) != "undefined")
														videoArray.push(String(userstatusdetails[indexUserStatusDetails].videostatus));
													var videoId			= "";
													
													//console.log("videoArray ::"+videoArray.length);
													if(videoArray.length > 0)
														for(var i=0;i<videoArray.length;i++)
															{
//																for(indexVideoDetails in videodetailsMap)
//																	{
//																	if(indexVideoDetails.indexOf(videoArray[i]) != -1)
//																		{
															
																	videoId		= String(videoArray[i]).split(":")[0];
																	timeElapsed	= String(videoArray[i]).split(":")[1];
															
															
															
																		 buildDetailedBadgeDes +=' <div class="accordion-group">'+
																			 '<div class="accordion-heading">'+
																			 ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapse'+indexAccordation+'">'+
																			 ' <h4>'+
																			 ' 	<span class="ex-num">'+indexAccordation+'</span>'+
																			 ' 	<i class="icon-play-circle"></i> '+
																			 '	Watch this video'+
																			 ' </h4>'+
																			 ' </a>'+
																			 ' </div>'+
																			 ' <div id="collapse'+indexAccordation+'" class="accordion-body collapse">'+
																			 ' <div class="accordion-inner">'+
//																			 ' <iframe width="300" height="215" src="'+videodetailsMap[videoArray[i]].videourl+'" frameborder="0" allowfullscreen></iframe>'+
																			 ' <img class="videoThumbNail" thisUserStatusKey="'+userstatusdetails[indexUserStatusDetails].key+'" thisVideoId = "'+videodetailsMap[videoId].videoId+'" style="cursor:pointer;" id="'+videodetailsMap[videoId].key+'" src="'+videodetailsMap[videoId].videothumbnail+'" />'+
																			 ' </div>'+
																			 ' </div>'+
																			 '</div>';
																		 indexAccordation = indexAccordation + 1;
																		//}
						
																	//}
															}
													 if(userstatusdetails[indexUserStatusDetails].status.indexOf('working on') != -1)
							                        	{
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
							                        	}
													 else if(userstatusdetails[indexUserStatusDetails].status.indexOf('requested') != -1 || userstatusdetails[indexUserStatusDetails].status.indexOf('approved') != -1)
							                        	{
															 buildDetailedBadgeDes += 
																	'<div class="accordion-group">'+
											                          '<div class="accordion-heading">'+
											                           ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion'+indexAccordation+'" href="#collapseTwo">'+
											                            '  <h4>'+
											                              '	<span class="ex-num">'+indexAccordation+'</span>'+
											                              '	<i class="icon-pencil"></i>'+
											                              '	Your summary'+
											                             ' </h4>'+
											                           ' </a>'+
											                          '</div>'+
											                          '<div id="collapseTwo" class="accordion-body collapse">'+
											                            '<div class="accordion-inner">'+
											                              '<form>'+
											                               ' <fieldset>'+
											                                '  <label>Your brief summary about this video</label>';
															 if(userstatusdetails[indexUserStatusDetails].badgeReqContent && userstatusdetails[indexUserStatusDetails].badgeReqContent != null && String(userstatusdetails[indexUserStatusDetails].badgeReqContent) != "undefined"){
																 buildDetailedBadgeDes += 
											                                '  <textarea readonly id="badge_request_content" class="summary" val="'+userstatusdetails[indexUserStatusDetails].badgeReqContent+'"></textarea>';
															 }
															 else
																 {
																 buildDetailedBadgeDes += 
										                                '  <textarea readonly id="badge_request_content" class="summary" val=""></textarea>';
															 }
											                                buildDetailedBadgeDes += 
											                               ' </fieldset>'+
											                             ' </form>'+
											                           ' </div>'+
											                         ' </div>'+
											                       ' </div>';
							                        	}
							                       indexAccordation = indexAccordation + 1;
							                        if(userstatusdetails[indexUserStatusDetails].status.indexOf('working on') != -1)
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
															 '        <a id="'+indexBadgesList+'_'+indexUserStatusDetails+'"  class="btn btn-large btn-green submit_badge_request">Submit for Approval!</a>'+
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
				
				 $('.submit_badge_request').bind("click",function()
							{
					 			$(this).hide();
								var userStatusKey 			= $(this).attr('id').split("_")[1];
								var badgeId					= $(this).attr('id').split("_")[0];
								var badge_request_content 	= $('#badge_request_content').val();
								
								var submitApproval = $('.icon-hand-right').parent().html();
					 			submitApproval = submitApproval.replace("Submit for approval","Your request has been sent");
					 			$('.icon-hand-right').parent().html(submitApproval);
					 			$('.icon-hand-right').toggleClass('icon-hand-right icon-thumbs-up');
					 			
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
																userstatusdetails[confirmuser].badgeReqContent 		= badge_request_content;
																userstatusdetails[confirmuser].status 				= "requested";
														}
													}
										 		 }
											  }
								});
							});
				
				//Binded because we build back_to_working_on it here
				$('#back_to_working_on').bind("click",function()
						{
							$('#badge_detail_holder').hide();
							$('#build_workingon_badges').show();
							$('.challanges_div').show();
						});
				$('#back_to_notifications').bind("click",function()
						{
							$('#badge_detail_holder').hide();
							$('#notifications_holder').show();
						});
				

				$("img.videoThumbNail").on("click",function(event){
				
				
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
				
				$('.settings').bind("click",function()
			{
		//alert("comes here"+singleUserProfile[userKey].firstName + " "+singleUserProfile[userKey].lastName);
				$('#google_profile_image').attr("src",singleUserProfile[userKey].profilePicture);
				$('#google_name').html('<input  checked="checked" name="group" type="radio" value="'+singleUserProfile[userKey].firstName + " "+singleUserProfile[userKey].lastName+'">'+singleUserProfile[userKey].firstName + " "+singleUserProfile[userKey].lastName);
				
				var currentlyEnrolled = "";
				for(indexUserProfileMap in userProfileMap)
					{
						if(indexUserProfileMap === userKey)
							{
							currentlyEnrolled += '<li>'+
	                          	'<div class="btn-group">'+
	                          	  '<button class="btn">'+userProfileMap[indexUserProfileMap].companyName+'</button>'+
	                          	  '<button data-toggle="dropdown" class="btn dropdown-toggle">'+
	                          	    '<span class="caret"></span>'+
	                          	 ' </button>'+
	                          	  '<ul class="dropdown-menu">'+
	                          	    '<li><a id="hide_from_others">Hide my profile in this U</a></li>'+
	                          	    '<li class="divider"></li>'+
	                          	    '<li><a href="remove_user_profile">Dropout of this U</a></li>'+
	                          	  '</ul>'+
	                          	'</div>'+
	                          '</li>';
							}
					}
				$('#company_enrolled').html(currentlyEnrolled);
			});
	$('#hide_from_others').bind("click",function(){
		
	});
	$('#remove_user_profile').bind("click",function(){
		
	});
	
	});
	
	
	
	$('.side_bar').bind('click',function()
			{
				$('#build_workingon_badges').hide();
				$('#badge_detail_holder').hide();
				$('#notifications_holder').show();
				$('#me_side_bar').children().each(function(){
					 var kid = $(this);
					 if($(this).hasClass('active'))
						 $(this).removeClass('active');
				});
				$(this).addClass('active');
			});
	$('.side_bar_profile').bind('click',function()
	{
		$('#build_workingon_badges').show();
		$('.challanges_div').show();
		$('#settings_holder').hide();
		$('#notifications_holder').hide();
	});
	
	$('.stop_work_on_badge').bind('click',function()
	{
		var badgeId = $(this).attr('id').split("_")[0];
		var userStatusKey = $(this).attr('id').split("_")[1];
		var companyKey	= singleUserProfile[userKey].companyId;
		
		var hideDiv = $(this).parents()[5];
		
		$.ajax({
			type	: 'POST', 
			url		: '/stopWorkingOnThisBadge' ,
			async	: true,
			data	: "badgeId="+badgeId+"&userKey="+userKey+"&companyKey="+companyKey+"&userStatusDetailsKey="+userStatusKey, 
			success	: function(data)
					  {
				 		 if(data != null)
				 		 {
				 			//$(hideDiv).hide();
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
		
	});
	
	$('#me_page').bind('click',function()
			{
				$('#build_workingon_badges').show();
				$('.challanges_div').show();
				$('#badge_detail_holder','#settings_holder','#notifications_holder').hide();
				$('#settings_holder').hide();
				$('#notifications_holder').hide();
				$('#me_side_bar').children().each(function(){
					 var kid = $(this);
					 if($(this).hasClass('active'))
						 $(this).removeClass('active');
				});
				$('.side_bar_profile').addClass('active');
				
			});
	
	
}