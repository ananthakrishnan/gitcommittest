<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import ="java.util.LinkedHashMap"%>  
<%@page import = "com.google.gson.Gson"%> 
<%@page import = "com.google.gson.GsonBuilder"
import="org.codehaus.jackson.map.ObjectMapper"
	import="org.codehaus.jackson.JsonGenerator"
	import="org.codehaus.jackson.JsonParser"
	import="org.codehaus.jackson.map.DeserializationConfig"
    import="org.codehaus.jackson.map.SerializationConfig"
    import="org.codehaus.jackson.map.annotate.JsonSerialize"
%> 
<%@page import = "com.acti.jdo.*"
import="java.util.HashMap"
import="org.apache.commons.collections.MultiHashMap"
import="org.apache.commons.collections.MultiMap"
import="java.util.*" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - Approve Badge</title>

   	<link rel="stylesheet" type="text/css" href="../css/reset.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <link rel="stylesheet" type="text/css" href="../css/admin.css" />
    <link rel="stylesheet" type="text/css" href="../css/badgepopup.css" />
    <link rel="stylesheet" type="text/css" href="../css/single.css" />
    <link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" />
    <link rel="stylesheet" type="text/css" href="colortip-1.0/colortip-1.0-jquery.css"/>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>
	

    <script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="js/actions.js"></script>
    <script type="text/javascript" src="../js/commonFunctions.js"></script>
     <script type="text/javascript">
    function cache()
    {
      <%   
       response.setHeader("Cache-Control","no-cache");   
       response.setHeader("Cache-Control","no-store");   
       response.setDateHeader("Expires", 0);   
       response.setHeader("Pragma","no-cache");
       %> 
    }
    </script>
    <script type="text/javascript">
     <%
    if(session.getAttribute("userProfileDetails")	==	null){
    	  response.sendRedirect("/");
    }
	String userProfileMap 	= "{}";
	if(request.getAttribute("userDetailsMap") != null)
		 userProfileMap 	= (String)request.getAttribute("userDetailsMap");
	String badgesListMap 	= "{}";
	if(request.getAttribute("badgesListMap") != null)
		badgesListMap 		= (String)request.getAttribute("badgesListMap");
	String videoDetailsMap 			= "{}";
	if(request.getAttribute("videoDetailsMap") != null)
		videoDetailsMap 			= (String)request.getAttribute("videoDetailsMap");
	String userStatusDetailsMap	=	"{}";
	if(request.getAttribute("userStatusDetailsMap") != null)
		 userStatusDetailsMap 	= (String)request.getAttribute("userStatusDetailsMap");
	String pendingReqCount 		= "{}";
	if(session.getAttribute("pendingReqCount") != null)
			pendingReqCount 	= (String)session.getAttribute("pendingReqCount");
	String userBadgeLogJdoMap 		= "{}";
	if(request.getAttribute("userBadgeLogJdoMap") != null)
		userBadgeLogJdoMap = (String)request.getAttribute("userBadgeLogJdoMap");
	
	    String emailId = "";
		emailId = (String) session.getAttribute("userEmailid");
		String firstName = "";
		firstName = (String) session.getAttribute("userFirstName");
		String lastName = "";
		lastName = (String) session.getAttribute("userLastName"); //userImage
		String profileImage = "";
		profileImage = (String) session.getAttribute("userImage");
		String companyDetails = "{}";
		if(session.getAttribute("companyslist") != null)
			 {
			 	companyDetails=(String)session.getAttribute("companyslist");
			 }
		String requestURLFromFeedback 			= (String) request.getRequestURL().toString(); 
    %>
    
    var userProfile	 		= <%= userProfileMap%>;
    var badgesListMap  		= <%= badgesListMap%>; 
    var userstatusdetails	= <%= userStatusDetailsMap %>;
    var videoDetailsMap		= <%= videoDetailsMap %>;
    var userFirstName 		= '<%=firstName %>';
    var userLastName 		= '<%=lastName %>';
    var pendingReq 			= '<%= pendingReqCount%>';
    var userBadgeLogJdoMap 	= <%= userBadgeLogJdoMap %>;
    var pendingReqObj 		= JSON.parse(pendingReq);	
    var stuffCount 			= 0;
    var badgeCount 			= 0;
    var uniquebadgeid		= 0;
    var uniqueProfileKey	= '<%= (String)session.getAttribute("userKeyLogin") %>';
    var bannerCompanyName 	= '<%= (String)session.getAttribute("companyName") %>';
    var dys 				= new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	var months 				= new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var userEmail			= '<%= emailId%>';
	var userFirstName		= '<%=firstName %>';
	var userLastName		= '<%=lastName %>';
	var profilePicture		= "";
	var requestURL 			= '<%= requestURLFromFeedback%>';
	
	</script>	
	 <script type="text/javascript" src="../js/feedback.js"></script>	
<script>
    $().ready(function() 
    	{
//     		$('#company-name').html(bannerCompanyName);
    		stuffCount = pendingReqObj.stuffCount;
    		badgeCount = pendingReqObj.badgeCount;
    		$('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
    		$('#pending_req_stuff').html("Approve Stuff Request ("+pendingReqObj.stuffCount+")"); 
    		if(userFirstName  != null && userFirstName != 'undefined' && userLastName  != null && userLastName != 'undefined')
    			$('.welcome_username').html("Welcome, "+userFirstName+" "+ userLastName);
    	  
    		for(indexUserStatusDetails in userstatusdetails)
    		{
    		var divUser = "";
    		if(String(userstatusdetails[indexUserStatusDetails].status).indexOf("requested") != -1)
    		{
    			var user_stuff = userstatusdetails[indexUserStatusDetails].userId+"_"+userstatusdetails[indexUserStatusDetails].stuffid;
    				for(indexUser in userProfile)
    					{
    					if(indexUser.indexOf(userstatusdetails[indexUserStatusDetails].userId) != -1)
    						{
    	                        for(indexBadge in badgesListMap)
    	        				{
    	    	    				if(indexBadge.indexOf(userstatusdetails[indexUserStatusDetails].stuffid) != -1)
    	    						{	
    	    	    					var dateAdded = new Date(userstatusdetails[indexUserStatusDetails].dateRequested);
    	        						var dateRequested = "";
    	        						var mins = "";
    	        							if(parseInt(dateAdded.getMinutes()) < 10)
    	        								mins = "0"+(dateAdded.getMinutes());
    	        							else
    	        								mins = dateAdded.getMinutes();
    	        						if(dateAdded.getHours() > 12)
    	        						 	dateRequested = (dateAdded.getDate()) + " "+ months[dateAdded.getMonth()] + " " + dateAdded.getFullYear()+ " "+(parseInt(dateAdded.getHours()) - 12)+":"+mins+" PM";
    	        						else
    	        							dateRequested = (dateAdded.getDate()) + " "+ months[dateAdded.getMonth()] + " " + dateAdded.getFullYear()+ " "+(parseInt(dateAdded.getHours())) +":"+mins+ " AM";
    	        							
    	        							
    	        							if(userProfile[indexUser].profilePicture && String(userProfile[indexUser].profilePicture) != "" && String(userProfile[indexUser].profilePicture) != "undefined")
    	    					    		{
    	    					    			profilePicture		= userProfile[indexUser].profilePicture;
    	    					    		}
    	    					    		else
    	    					    		{
    	    					    			profilePicture		= "../images/genral-photo.jpg";
    	    					    		}	
    	        							
										divUser = 
									   '<li id="'+indexUserStatusDetails+'_'+indexUser+'_'+indexBadge+'">'
									    +'<div id = "'+userstatusdetails[indexUserStatusDetails].dateAdded+'" style="float: right; margin: -9px 10px 1px 0px; color: blue;">'+dateRequested+'</div>'
										+'<div class="person_name" onmouseover="dispemail(this)" onmouseout="disp2email(this)"><div class="name"><h3><a href="#">'
										+ userProfile[indexUser].firstName
										+ '</a></h3>'
										+'<h4 style="opacity:0">'+userProfile[indexUser].firstName+' '+userProfile[indexUser].lastName+'<br>'
		 								+'<a href="mailto:'+userProfile[indexUser].userName+'" style="color:#1284c6;text-decoration:none" target="_blank">'+userProfile[indexUser].userName+'</a>'
										+'<h4></h4></div>'
										+'<img width="auto" height="70px" style="margin:-64px 11px 6px 6px;" src='+profilePicture+' />'
										+ '</code></div><div class="cert_cont" ><img src="'+badgesListMap[indexBadge].badgeLogoPath+'" />'
										+ '<h4>'+ badgesListMap[indexBadge].badgeName+ '</h4><p></p></div><div id="'+badgesListMap[indexBadge].badgeValue+'_'+indexBadge+'" class="btn_holder" >'
										+ '<span class="grn_btn2 gry_btn" onclick="review(this)">Review Work</span> <span class="grn_btn2" onclick="approve(this)">Approve it NOW!</span><span class="grn_btn2" onclick="denyBadge(this)">Deny Request</span></div>'
										+ '<div class="points_wrapper"><div class="badges_count"><div class="badges_row"><ul>';
									}
								}
						for (indexBadgeMap in userBadgeLogJdoMap) 
						{
							if (String(userBadgeLogJdoMap[indexBadgeMap].userId).indexOf(String(indexUser)) != -1) 
							{
								
								var badgeArray = new Array();
								if (userBadgeLogJdoMap[indexBadgeMap].badgeId.indexOf(",") != -1)
									badgeArray = String(userBadgeLogJdoMap[indexBadgeMap].badgeId).split(",");
								else if (userBadgeLogJdoMap[indexBadgeMap].badgeId && userBadgeLogJdoMap[indexBadgeMap].badgeId != "")
									badgeArray.push(String(userBadgeLogJdoMap[indexBadgeMap].badgeId));
								
								var trophyArray = new Array();
								if (userBadgeLogJdoMap[indexBadgeMap].trophyId.indexOf(",") != -1)
										trophyArray = String(userBadgeLogJdoMap[indexBadgeMap].trophyId).split(",");
								else if (userBadgeLogJdoMap[indexBadgeMap].trophyId && userBadgeLogJdoMap[indexBadgeMap].trophyId != "")
										trophyArray.push(String(userBadgeLogJdoMap[indexBadgeMap].trophyId));
								
								divUser += '<li class="others_count"><h3>'+ badgeArray.toString().split(",").length+ '</h3></li>';
								for ( var i = 0; i < badgeArray.length; i++)
									{
										for (indextotalBadge in badgesListMap) 
										{
											if (badgeArray[i].indexOf(indextotalBadge) != -1) //badgeArray[i] indextotalBadge
												{
														divUser += '<li><img style="cursor:default;" title="" alt="" src="'+badgesListMap[indextotalBadge].badgeLogoPath+'=s25"/></li>';
												}
										}
									}
									
									divUser += '</ul><div class="clear_all"></div></div><div class="badges_row trophy_row"> <ul>'
									divUser += '<li class="others_count"><h3>'+ trophyArray.length+ '</h3></li>';
									
									for ( var i = 0; i < trophyArray.length; i++)
										for (indextotalBadge in badgesListMap) 
										{
											if (trophyArray[i].indexOf(indextotalBadge) != -1) //indextotalBadge
												{
															divUser += '<li><img style="cursor:default" title="" alt="" src="'+badgesListMap[indextotalBadge].badgeLogoPath+'=s25"></li>';
												}
										}
									divUser += '</ul><div class="clear_all"></div></div> </div> <div class="total">'+ userBadgeLogJdoMap[indexBadgeMap].points+ '</div><div class="clear_all"></div>';
								}
							}

														}
													}
												divUser += '</div></div><div class="clear_all"></div></li>';
					}
					$('.person_list').append(divUser)
				}
			});

					function review(selBadge) 
					{
						var userStatusDetailsKey = String($(selBadge).parent().parent().attr("id")).split("_")[0];
						var userId				 = String($(selBadge).parent().parent().attr("id")).split("_")[1];
						var badgeId 			 = String($(selBadge).parent().parent().attr("id")).split("_")[2];
						
						var buildUserLi = '<ul class="user_info" id="review_user_info">';
						for (indexUser in userProfile) 
						{
							if (indexUser.indexOf(userId) != -1) 
							{
								for (indexBadge in badgesListMap) 
								{
									if (indexBadge.indexOf(badgeId) != -1) 
									{
										buildUserLi += '<li id="'+userStatusDetailsKey+"_"+userId+"_"+badgeId+"_"+badgesListMap[indexBadge].badgeValue+'"><div class="picture_frame"> <img src="'
												+ userProfile[indexUser].profilePicture.replace("/photo.jpg","/s140-c/photo.jpg")+ '"/>'+ '</div><div class="person_name">';
												buildUserLi += '<h3 class="badge_id" id="'+indexBadge+'"> Working on '+ badgesListMap[indexBadge].badgeName+ '</h3>'
												+ '<h4>'+ badgesListMap[indexBadge].badgeValue+ ' points for this badge</h4></div><div class="clear_all"></div>';
									}
								}
							}
						}

						for (index in badgesListMap) 
						{
							if (index.indexOf(userId) != -1) 
							{
								buildUserLi += '<div class="badges_count"><div class="badges_row">'
										+ '<ul><li class="others_count"><h3 id="review_badge_count">'
										+ badgeArray.length
										+ '</h3></li>';
								var badgesArray = new Array(); //badgesListMap[index].badgeId;
								if (badgesListMap[index].badgeId.indexOf(",") != -1) {
									badgesArray = badgesListMap[index].badgeId.split(",");
								} else if (badgesListMap[index].badgeId != "") {
									badgesArray.push(badgesListMap[index].badgeId);
								}
								for ( var i = 0; i < badgesArray.length; i++) {
									for (indexBad in badgesListMap) {
										if (badgesArray[i].indexOf(indexBad) != -1 && badgesListMap[indexBad].badgeType.indexOf("badge") != -1) 
										{
											buildUserLi += '<li><img style="cursor:default" src="'+badgesListMap[indexBad].badgeLogoPath+'=s25" /></li>';
										}
									}
								}
								buildUserLi += '</ul><div class="clear_all"></div></div>';
								buildUserLi += '<div class="badges_row trophy_row"><ul><li class="others_count"><h3>'+ badgesListMap[index].trophiesCount+ '</h3></li>';

								var trophiesArray = new Array();
								if (badgesListMap[index].badgeId.indexOf(",") != -1) 
								{
									trophiesArray = badgesListMap[index].badgeId.split(",");
								} else if (badgesListMap[index].badgeId != "") {
									trophiesArray.push(badgesListMap[index].badgeId);
								}

								for ( var i = 0; i < trophiesArray.length; i++) {
									for (indexBad in badgesListMap) {
										if (badgesArray[i].indexOf(indexBad) != -1 && badgesListMap[indexBad].badgeType.indexOf("trophy") != -1) {
											buildUserLi += '<li><img style="cursor:default" src="'+badgesListMap[indexBad].badgeLogoPath+'" /></li>';
										}
									}
								}
								buildUserLi += '</ul> <div class="clear_all"></div></div><div class="clear_all"></div> </div> </li>';
							}

						}

						buildUserLi += '<div class="badges_list" style="width:580px;" id="req_content">';
						for (indexUserStatusDetails in userstatusdetails) {
							if (userstatusdetails[indexUserStatusDetails].key.indexOf(userStatusDetailsKey) != -1) {
								buildUserLi += userstatusdetails[indexUserStatusDetails].badgeReqContent;
							}
						}
						buildUserLi += '</div><br><div style="display:none" id="direct_email_status"><input  type="checkbox" id="direct_disapprove_email_status" onchange="disabletext()" checked="checked"/>Send Email<br></div>'
								+ '<textarea onfocus="blank(this)" type="text" id="direct_deny_discription" style="display:none" class="text">Reason for Denying the Badge Request</textarea>';

						buildUserLi += '<ul id="ul_videolist" class="add_vlink_cont">';
						for (indexBadge in badgesListMap) 
						{
							for (index in videoDetailsMap) 
							{
								for (x = 0; x < (badgesListMap[indexBadge].videoid.length); x++) 
								{
									var videokey = videoDetailsMap[index].key;
									var started = "started";
									var notstarted = "not started";
									var completed = "completed";
									var badgevideokey = String(badgesListMap[indexBadge].videoid[x]);
									if (String(videoDetailsMap[index].key).indexOf(badgevideokey) != -1) 
									{
										for (userstatusindex in userstatusdetails) 
										{
											if (userstatusdetails[userstatusindex].stuffid === badgeId && userstatusdetails[userstatusindex].userId === userId) {
												var videostatusarray = new Array();
												videostatusarray = userstatusdetails[userstatusindex].videostatus;
												for ( var j = 0; j < videostatusarray.length; j++) {
													if (videostatusarray[j].indexOf(videokey+ ":"+ "completed") != -1) 
													{
														buildUserLi += '<li class="row_clr odd"  style="cursor:auto;width:269px;" id="'+videoDetailsMap[index].videoId+'"><code class="watched"></code><img style="height:90px;width:120px;" src="'+videoDetailsMap[index].videothumbnail+'" id="test" class="video_thump video_popup_act" /><p class="heading video_title_heading">'
																+ videoDetailsMap[index].vidtitle
																+ '</p></li>';
													}
													if (videostatusarray[j].indexOf(videokey+ ":"+ "started") != -1) 
													{
														buildUserLi += '<li class="row_clr odd" style="cursor:auto;width:269px;" id="'+videoDetailsMap[index].videoId+'"><code class="unwatched"></code><img style="height:90px;width:120px;" src="'+videoDetailsMap[index].videothumbnail+'" id="test"  class="video_thump video_popup_act"  /><p class="heading video_title_heading">'
																+ videoDetailsMap[index].vidtitle
																+ '</p></li>';
													}
													if (videostatusarray[j].indexOf(videokey+ ":"+ "not started") != -1) {
														buildUserLi += '<li class="row_clr odd" style="cursor:auto;width:269px;" id="'+videoDetailsMap[index].videoId+'"><code></code><img style="height:90px;width:120px;" src="'+videoDetailsMap[index].videothumbnail+'" id="test"  class="video_thump video_popup_act"  /><p class="heading video_title_heading">'
																+ videoDetailsMap[index].vidtitle
																+ '</p></li>';
													}
												}
											}
										}

									}
								}
							}
						}
						buildUserLi += '<div class="clear_all"></div></ul><div class="clear_all"></div><span class="grn_btn2 add_vlink add_vlink_act directApproveButton" onclick="directApprove(this)">Approve</span><span  id="to_show_disapprove" class="grn_btn2 add_vlink add_vlink_act" onclick="disapproveShow()">Disapprove</span><span style ="display:none" id="direct_disapprove_button" class="grn_btn2 add_vlink add_vlink_act" onclick="directDisapprove(this)">Disapprove</span><div class="clear_all"></div>'

						$('.badge_detial_col').html(buildUserLi);
						$('#backgroundPopup').show();
						$('#review_work').show();

					}

					$('#popup_close').live("click", function() {
						$('.badge_popup_content').hide();
						$('#backgroundPopup').hide();
					});

					function directApprove(selBadge) 
					{
						var userStatusDetailsKey = $(selBadge).parent().attr('id').split("_")[0];
						var userId 				 = $(selBadge).parent().attr('id').split("_")[1];
						var badgeId 			 = $(selBadge).parent().attr('id').split("_")[2];
						var badgeval 			 = $(selBadge).parent().attr('id').split("_")[3];
						var badgeType 			 = "";
						
						for (indexBadge in badgesListMap) {
							if (indexBadge.indexOf(badgeId) != -1) {
								badgeType = badgesListMap[indexBadge].badgeType;
							}
						}

						$.ajax({
							type : "GET",url :"/updateBadgeLogFromApproveBadgePage", data :"userKey="+ userId	+"&badgeId="+ badgeId+ "&userStatusDetailsKey="+ userStatusDetailsKey+ "&badgeVal="+ badgeval + "&badgeType=" + badgeType,
								success : function(result) 
								{
									var pendingReqCount = $('#pending_req_badge').html();
												pendingReqCount = pendingReqCount.split("(")[1];
												pendingReqCount = pendingReqCount.split(")")[0];
												pendingReqCount = parseInt(pendingReqCount) - 1;
												$(selBadge).parent().parent().hide();
												$("#voice-box").fadeIn();
												document.getElementById("statusMessage").innerHTML = "badge approved";
												document.getElementById("voice-box").setAttribute("status","saved");
												setTimeout("hideStatusMessage()",1750);
								}
							});

						$.ajax({
									type : 'POST',url : '/sendMailToUser',data : "badgeId=" + badgeId+ "&userId=" + userId+"&badgeAssigneId="+uniqueProfileKey,
									success : function(data) 
									{
										$("#voice-box").fadeIn();
										document.getElementById("statusMessage").innerHTML = "Email Sent!";
										document.getElementById("voice-box").setAttribute("status", "saved");
										setTimeout("hideStatusMessage()", 1750);
									}
								}); 

						$('#review_work').hide();
						$('#backgroundPopup').hide();
						$('#'+ userStatusDetailsKey+"_" + userId + "_" + badgeId).remove();
					}

					function disapproveShow() {
						$('#to_show_disapprove').hide();
						$('#direct_disapprove_button').show();
						$('#direct_email_status').show();
						$('#direct_deny_discription').show();
						$(".directApproveButton").hide();
					}

					function directDisapprove(selBadge) 
					{
						var userStatusDetailsKey = $(selBadge).parent().attr('id').split("_")[0];
						var userId 				 = $(selBadge).parent().attr('id').split("_")[1];
						var badgeId 			 = $(selBadge).parent().attr('id').split("_")[2];
						var badgeval 			 = $(selBadge).parent().attr('id').split("_")[3];
						var badgeType 			 = "";
						
						var badgeRequestId		 = userStatusDetailsKey+"_"+userId+"_"+badgeId;						
						$('.person_list li[id="'+badgeRequestId+'"]').remove();

						for (indexBadge in badgesListMap)
						{
							if (indexBadge.indexOf(badgeId) != -1) 
							{
								badgeType = badgesListMap[indexBadge].badgeType;
							}
						}
						var emailstatusfordeny = $('#direct_disapprove_email_status').attr("checked");
						if (String(emailstatusfordeny) === "checked") 
						{
							var emailcontent = $('#direct_deny_discription').val();
							if (emailcontent === ""	|| emailcontent === null || emailcontent === "Reason for Denying the Badge Request") 
							{
								$("#voice-box").fadeIn();
								document.getElementById("statusMessage").innerHTML = "Please enter EmailContent or uncheck the send email checkbox";
								document.getElementById("voice-box").setAttribute("status", "saved");
								setTimeout("hideStatusMessage()", 1750);
							} 
							else 
							{
								 $.ajax({type : 'POST',url : '/sendmailforrequestdenied',data : "typeid=" + badgeId+ "&userKey=" + userId+ "&type=" + badgeType+ "&mailcontent="+ emailcontent +"&adminKey="+uniqueProfileKey+"&userStatusDetailsKey="+userStatusDetailsKey,
											success : function(data) 
											{
												$("#voice-box").fadeIn();
												document.getElementById("statusMessage").innerHTML = "Item Denied";
												document.getElementById("voice-box").setAttribute("status","saved");
												setTimeout("hideStatusMessage()",1750);
											}
										}); 
							}
							
							return false;
						}
						

						$.ajax({type : 'GET',url : '/denyBadgeRequest1',data :"userStatusDetailsKey=" + userStatusDetailsKey +  "&badgeId=" + badgeId + "&userId="+ userId,success : function(data) 
							{
										$(selBadge).parent().remove();
										$('#review_work').hide();
										$('#backgroundPopup').hide();
										var pendingReqCount = $('#pending_req_badge').html();
										pendingReqCount = pendingReqCount.split("(")[1];
										pendingReqCount = pendingReqCount.split(")")[0];
										pendingReqCount = parseInt(pendingReqCount) - 1;
										$('#pending_req_badge').html("Approve Badge Request ("+ pendingReqCount+ ")");
										$("#voice-box").fadeIn();
										document.getElementById("statusMessage").innerHTML = "Badge Request Denied";
										document.getElementById("voice-box").setAttribute("status", "saved");
										setTimeout("hideStatusMessage()", 1750);
									}
								});

					}

					function approve(selBadge) 
					{
						var badgeId 				= $(selBadge).parent().attr("id").split("_")[1];
						var badgeVal				= $(selBadge).parent().attr("id").split("_")[0];
						var userStatusDetailsKey 	= $(selBadge).parent().parent().attr("id").split("_")[0];
						var userKey					= $(selBadge).parent().parent().attr("id").split("_")[1];
						var badgeType = "";
						for (indexBadge in badgesListMap) 
						{
							if (indexBadge.indexOf(badgeId) != -1) {
								badgeType = badgesListMap[indexBadge].badgeType;
							}
						}
						$.ajax({
							type : "GET",url :"/updateBadgeLogFromApproveBadgePage", data :"userKey="+ userKey+"&badgeId="+ badgeId+ "&userStatusDetailsKey="+ userStatusDetailsKey+ "&badgeVal="+ badgeVal + "&badgeType=" + badgeType,
								success : function(result) 
								{
									var pendingReqCount = $('#pending_req_badge').html();
												pendingReqCount = pendingReqCount.split("(")[1];
												pendingReqCount = pendingReqCount.split(")")[0];
												pendingReqCount = parseInt(pendingReqCount) - 1;
												$(selBadge).parent().parent().hide();
												$("#voice-box").fadeIn();
												document.getElementById("statusMessage").innerHTML = "badge approved";
												document.getElementById("voice-box").setAttribute("status","saved");
												setTimeout("hideStatusMessage()",1750);
								}
							});

						 $.ajax({
									type : 'POST',
									url : '/sendMailToUser',
									data : "badgeId=" + badgeId + "&userId=" + userKey+"&badgeAssigneId="+uniqueProfileKey,
									success : function(data) 
									{
										$("#voice-box").fadeIn();
										document.getElementById("statusMessage").innerHTML = "Email Sent!";
										document.getElementById("voice-box").setAttribute("status", "saved");
										setTimeout("hideStatusMessage()", 1750);
									}
								}); 

					}

					function blank(selId) {
						$(selId).val("");
					}
					function unblank(selId) {
						$(selId).val("Reason for Denying the Badge Request");
					}

					function hideStatusMessage() {
						if (document.getElementById("voice-box").getAttribute("status") == "saved") {
							$("#voice-box").fadeOut(300);
						}
					}

					var denyitem = "";
					var selBadgeId = "";
					var selUserId = "";
					function denyBadge(selStuff) 
					{
						$('#backgroundPopup').show();
						selBadgeId = $(selStuff).parent().attr("id");
						//console.info('selBadgeId ::'+selBadgeId);
						selUserId = $(selStuff).parent().parent().attr("id");
						//console.info('selUserId ::'+selUserId);
						var buildDenyEmailDiv = '<h2>Deny Badge Confirmation</h2>'
								+ '<div class="popup_close" onclick="closePopup()">x</div>'
								+ '<ul>'
								+ '<li> '
								+ '<input  id="email_status" type="checkbox"  onchange="disabletext()" checked="checked" />'
								+ '<label for="badge_cat" class="floating_label" >Send Email</label> '
								+ '</li>'
								+ '<label class="top_label">Mail Content</label>'
								+ '<textarea id="deny_discription"  style="width: 445px; height: 72px;" class="text" type="text"  onfocus="blank(this)">Reason for Denying the Badge Request</textarea>'
								+ '</li>'
								+ '<li>'
								+ '<input type="button" class="save_btn" style="margin-top:10px;" value="Deny Request" onclick="validate()"/>'
								+ '</li>' + '</ul>';
						$('#popupdiv1').html(buildDenyEmailDiv);
						$('#popupdiv1').show();

					}
					function validate() 
					{
						var emailstatusfordeny = $('#email_status').attr("checked");
						if (emailstatusfordeny === "checked") 
						{
							var emailcontent = $.trim($('#deny_discription').val());
							if (emailcontent === "" || emailcontent === null || emailcontent === "Reason for Denying the Badge Request") 
							{
								$("#voice-box").fadeIn();
								document.getElementById("statusMessage").innerHTML = "Please enter EmailContent or uncheck the send email checkbox";
								document.getElementById("voice-box").setAttribute("status", "saved");
								setTimeout("hideStatusMessage()", 1750);
							}
							else 
							{
								closePopup();
								var userStatusDetailsKey = selUserId.split("_")[0];
								var badgeId              = selBadgeId.split("_")[1];
								var userId				 = selUserId.split("_")[1];
								$.ajax({type : 'GET',url : '/denyBadgeRequest1',data : "userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+ badgeId+ "&userId="+ userId,success : function(data) 
									{
												$('#' + selUserId).remove();
												var pendingReqCount = $('#pending_req_badge').html();
												pendingReqCount = pendingReqCount.split("(")[1];
												pendingReqCount = pendingReqCount.split(")")[0];
												pendingReqCount = parseInt(pendingReqCount) - 1;
												$('#pending_req_badge').html("Approve Badge Request ("+ pendingReqCount+ ")");
												$("#voice-box").fadeIn();
												document.getElementById("statusMessage").innerHTML = "Badge Request Denied";
												document.getElementById("voice-box").setAttribute("status","saved");
												setTimeout("hideStatusMessage()",1750);
											}
										});
								$.ajax({type : 'POST',url : '/sendmailforrequestdenied',data : "typeid="+ selBadgeId.split("_")[1]+ "&userKey="+ selUserId.split("_")[1]+ "&type=badge&mailcontent="+ emailcontent+"&adminKey="+uniqueProfileKey+"&userStatusDetailsKey="+userStatusDetailsKey,
								success : function(data) 
								{
												$("#voice-box").fadeIn();
												document.getElementById("statusMessage").innerHTML = "Item Denied";
												document.getElementById("voice-box").setAttribute("status","saved");
												setTimeout("hideStatusMessage()",1750);
											}
								}); 
							}

						}
						else
							{
								closePopup();
								var userStatusDetailsKey = selUserId.split("_")[0];
								var badgeId              = selBadgeId.split("_")[1];
								var userId				 = selUserId.split("_")[1];
								$.ajax({type : 'GET',url : '/denyBadgeRequest1',data : "userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+ badgeId+ "&userId="+ userId,success : function(data) 
									{
												$('#' + selUserId).remove();
												var pendingReqCount = $('#pending_req_badge').html();
												pendingReqCount = pendingReqCount.split("(")[1];
												pendingReqCount = pendingReqCount.split(")")[0];
												pendingReqCount = parseInt(pendingReqCount) - 1;
												$('#pending_req_badge').html("Approve Badge Request ("+ pendingReqCount+ ")");
												$("#voice-box").fadeIn();
												document.getElementById("statusMessage").innerHTML = "Badge Request Denied";
												document.getElementById("voice-box").setAttribute("status","saved");
												setTimeout("hideStatusMessage()",1750);
											}
										});
							}
					}
					function closePopup() {
						$('#popupdiv1').hide();
						$('#backgroundPopup').hide();
						$('#email_status').attr("checked", "checked");
						$("#badge_discription").removeAttr("disabled");
						$("#badge_discription")
								.css("background-color", "white");
					}
					function disabletext() {

						if ($('#email_status').is(':checked')) {
							$("#badge_discription").removeAttr("disabled");
							$("#badge_discription").css("background-color",
									"white");
						} else {
							$("#badge_discription")
									.attr("disabled", "disabled");
							$("#badge_discription").css("background-color",
									"#A1ACB8");
						}
					}

					$(document).ready(function() 
					{
						var companyList =<%= companyDetails %>;
						var companyListli = "";
		   				for(index in companyList)
		    			{
		     				companyListli+='<li style="cursor:pointer;" id="'+index+'" ><a onClick="changeCompany(\''+index+'\');"><span>'+companyList[index]+'<span></a></li>';
		    			}
					    if(companyListli != "")
					    	{
					   			 $('#companyslist').append(companyListli);
					    	}
					    else
					    	{
					    		$('#account_menu').removeAttr("id");
					    	}
		    			$('#account_name').html('<%= (String)session.getAttribute("companyName") %>');
	  				});
	  
	  function changeCompany(keyIndex)
	  {
	   window.location.href="/intermediateCheck?companyKey="+keyIndex;
	  }
	  
	  function dispemail(userdiv)
		{
	 		var changeinval=userdiv.getElementsByTagName("H4")[0];
	 		changeinval.setAttribute("style","opacity:1");
		}

	 	function disp2email(userdiv)
		{
		     var changeinval=userdiv.getElementsByTagName("H4")[0];
		     changeinval.setAttribute("style","opacity:0");
		}
    </script>
</head>
<body onload="cache()">
<div id="voice-box" style="display: none;">
<p><span id="statusMessage">Saving changes...</span></p> 
</div>
<div class="wrapper">
		<div id="login_details">
				<ul class="right_nav_holder">
				<li class="welcome_username"></li>
				<li id="account_menu"><a id="account_name" href="#"><%= (String)session.getAttribute("companyName") %></a>
				<ul id="companyslist">
				</ul>
				</li>
				<li id="account_menu"><a href="#">My Account</a>
				<ul>
				<!-- <li id="my_details" onclick="openwin();"></li> -->
				<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a></li>
				</ul></li>
				</ul>
		</div> <!-- login_details -->
    <div id="header" class="admin_header">
 				<div class="header_holder">
 					<span id="company-name"><%= (String)session.getAttribute("companyName") %></span>
 					<div id="header_nav_holder">
                            <div class="tab_nav_holder">
                                <ul class="nav_list">
                                    <li class="selected"><a href="#">Admin</a></li>
                                    <li><a href="/others">Others</a></li>
                                    <li><a href="/persistUser">Me</a></li>
                                 </ul>
                             <div class="clear_all"></div>
                            </div> <!-- tab_nav_holder -->  
               </div>  <!-- header_nav_holder -->                           
            </div>  <!-- header_holder -->
    </div> <!-- header -->
    
    <div id="admin_panel" class="admin-content-wrapper">
    	<ul class="admin_left_panel">
        	<li><a href="/displayAllTransactions">User History</a></li>
        	<li><a href="/addNewBadge">Manage Badges</a></li>
        	<li><a href="/addstuff">Manage Store</a></li>
        	<li><a href="/manageTeam">Manage Teams/Groups</a></li>
        	<li><a href="/admin">Issue Badges</a></li>
        	<li class="selected"><a id="pending_req_badge" href="/approveBadge">Approve Badge Request</a></li>
        	<li><a id="pending_req_stuff" href="/allStuffDetails">Approve Stuff Request</a></li>
        </ul>
         <!-- This is for badge holder -->
     
    	<div class="admin_right_pannel">	
    	<div id="badge_holder" style = "display:none">
        	 <ul class="user_info">
            	<li>
                	<div class="popup_img">
                    	<img class="briefBadgeImage" src="" style="height: auto; width: 95px;"/>
                        <code class="badge_icon"></code>
                    </div>
                	<div class="person_name" id="briefBadgeName">
                        <h3>Setmore Basic Certification</h3>
                        <h4>50 points for this badge</h4>
                    </div>
                    <div class="clear_all"></div>
                </li>
                
            </ul>    
    <!--  <div class="badges_list">
            	<p>
                	The Setmore Basic Certifiation is for a user that has set up their own account and can answer basic question on Setmore
                </p>
              
            <div class="clear_all"></div>     
            </div> badges_list -->
      		<ul class="add_vlink_cont">
                            	<li class="row_clr odd">
                                    <code class="watched"></code>
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/>
                                    <span class="heading"> Video heading</span> 
                                    <p>sample text sample text sample text sample text</p>                             
                                </li>
                                <li class="row_clr even">
                                     <code class="unwatched"></code>
                                     <img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/>
                                    <span class="heading"> Video heading</span>
                                    <p>sample text sample text sample text sample text</p>
									
                                </li>
                                <li class="row_clr odd">
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/>
                                    <span class="heading"> Video heading</span>
                                    <p>sample text sample text sample text sample text</p>
									
                                </li>
                                <li class="row_clr even"> 
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/>
                                    <span class="heading"> Video heading</span>
                                    <p>sample text sample text sample text sample text</p>
									
                                </li>
                                
                            	<!--<li>
                                	<h4>Sample Title</h4>
                                    <code class="remove"></code>
                             		<code class="edit add_vlink_act"></code>
                                </li> -->
                              </ul>
            
           <!--  <div class="badges_list">
                    <h3>Make your badge request</h3>
                    <textarea></textarea> 
                    <input type="button" value="Work on this badge !!" class="grn_btn2" onclick="confirmToMoveBadge();"/>
                    <input type="button" id="back" value="Back" class="grn_btn2"/> -->
                <div class="clear_all"></div>     
                </div> 
        	<div class="approve_cont full-width">
            	<h2>Approve Badge Request</h2>
            <ul class="person_list">
                </ul>
                
            </div><!--user_history_cont -->
        </div>
     </div> <!--content-wrapper -->
     
     <!-- For review work popup -->
     <div id="backgroundPopup"></div>
     <div id="review_work" class="popup_holder popup_pos badge_detail_act badge_popup_content" style="display:none">
	<div id="popup_close" class="popup_close">X</div>
  <div id="badge_holder">
    <div class="badge_detial_col">
      <ul id="review_user_info" class="user_info">
        
      </ul>
      <div id="req_content" class="badges_list">
        <!-- <p> The Setmore Basic Certifiation is for a user that has set up their own account and can answer basic question on Setmore </p>
        <ul>
          <li>
            <p>To get this certification please go to goo.gl/vMtCN.</p>
          </li>
          <li>
            <p>You will find a list of activities you are to complete. Once you have completed them then please submit request.</p>
          </li>
          <li>
            <p class="last">On request notes please include your username and password for setmore</p>
          </li>
        </ul> 
        <div class="clear_all"></div>-->
      </div><!-- badges_list -->
      
      
      <ul class="add_vlink_cont" id="ul_videolist">
       <!--  <li class="row_clr odd"> <code class="watched"></code> 
        	<img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/> <span class="heading"> Video heading</span>
          <p>sample text sample text sample text sample text</p>
        </li>
        <li class="row_clr even"> 
        	<code class="unwatched"></code> 
        	<img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/> 
            <span class="heading"> Video heading</span>
          <p>sample text sample text sample text sample text</p>
        </li>
        <li class="row_clr odd"> 
        	<img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/> 
            <span class="heading"> Video heading</span>
          	<p>sample text sample text sample text sample text</p>
        </li>
        <li class="row_clr even"> 
        	<img src="images/video_thump1.png" height="59" width="106" class="video_thump video_popup_act"/> 
            <span class="heading"> Video heading</span>
          	<p>sample text sample text sample text sample text</p>
        </li> -->
        <div class="clear_all"></div>
      </ul>
      <div class="clear_all"></div>
      <span id="approve_second_screen" class="grn_btn2 add_vlink add_vlink_act directApproveButton">Approve</span>
      <div class="clear_all"></div>
    </div><!--- badge holder --->
    <div class="clear_all"></div>
  </div><!--- badge_list_col --->  
  <div class="clear_all"></div>
</div>
<!--  Review work ends here -->
   
   
	
	   <!--  <div style="" class="popup">
	    <h2>Create a new badge or trophy</h2>
	    <div class="popup_close" onclick="closePopup()">x</div> 
	    	<div class="badge_image">
	    		<img src="images/trophy.png" alt="typing-test">
	    	</div>
	    	<ul class="popup_fields">
	    		<li>
	    			<label class="top_label">Badge Name</label>
	    			<input id="badge_name" class="text" type="text" value="Reward Name">
	    		</li>
	    		<li id="upload_li">
	    			<input type="file" class="upload_btn" value="Browse…" />
	    		</li>
	    		
	    		<li> 
	    			<input name="cat" id="badge_cat" type="radio"><label for="badge_cat" class="floating_label">Badge</label> 
	    			<input name="cat" id="trophy_cat" type="radio"><label for="trophy_cat" class="floating_label"> Trophy</label> 
	    			 <input name="cat" id="invisible_cat" type="radio"><label for="invisible_cat" class="floating_label"> Invisible Badge</label> 
	    		</li>
	    		
	    		<li>
	    			<label class="top_label">Badge Points</label>
	    			<input id="badge_value" class="text" name="badge_value" type="text" value="0"><label for="badge_value">Points</label>
	    		</li>
	    		
	    		<li> 
	    			<label class="top_label">Badge Discription</label>
	    			<textarea id="badge_discription" class="text" type="text">What's it for? How do you get it?</textarea>
	    		</li>
	    		<li>
	    			<input type="button" class="save_btn" value="Save my sweet creation!" />
	    		</li>
	    	</ul>
	    </div> -->
	  <!-- backgroundPopup -->  
    
    	
	   <div style="display:none" class="popup" id="popupdiv1">
			<!-- <h2>Deny Badge Confirmation</h2>
				<div class="popup_close" onclick="closePopup()">x</div> 
				<ul class="popup_fields">
					<li> 
						<input  id="email_status" type="checkbox"  onchange="disabletext()" checked="checked" />
						<label for="badge_cat" class="floating_label" >Send Email</label> 
					</li>
						<textarea id="badge_discription" class="text" type="text">Reason for Denying the Badge Request</textarea>
						<label class="top_label">Mail Content</label>
					</li>
					<li>
						<input type="button" class="save_btn" value="Deny Request" onclick="validate()"/>
					</li>
				</ul> -->
	</div>
	
    
</div> <!-- wrapper -->
<div id="backgroundPopup" style="z-index:99999"></div>
	<%@ include file="/jsp/feedbackLoopTodo.jsp" %>

<%-- <!-- LoopTodo Feedback Form Code -->
<script id="looptodo_loop_embed_code" type="text/javascript" src="http://my.loopto.do/form/js/loop-embed-code.js?loopKey=agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M&domain=my.loopto.do">
</script>
<script type="text/javascript">
var looptodo_load_chain = window.onload;
window.onload = function() {
	looptodo_feedback_btn_init({ name : '<%=(String) session.getAttribute("userFirstName")+" "+(String) session.getAttribute("userLastName")%>', email : '<%=(String) session.getAttribute("userEmailid")%>', allowAnonymous: true, hideNameEmail: false });
    if(looptodo_load_chain) 
        looptodo_load_chain();
};
</script>
<!-- End LoopTodo Feedback Form Code -->  --%>
</body>
</html>
