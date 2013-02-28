
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="com.acti.jdo.badgeLogJDO"%>
<%@page import ="java.util.LinkedHashMap"%>  
<%@page import = "com.google.gson.Gson"%> 
<%@page import = "com.google.gson.GsonBuilder"%> 
<%@page import = "com.acti.jdo.*"
import = "com.acti.controller.OthersController"
import = "com.acti.controller.ManageGroups"
import="java.util.HashMap"
import="org.apache.commons.collections.MultiHashMap"
import="org.apache.commons.collections.MultiMap"
import="java.util.*"
import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
	import="com.google.appengine.api.blobstore.BlobstoreService"%> 
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<meta name="google" content="notranslate"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - <%=session.getAttribute("remoteBadgeName") %></title>

<link rel="stylesheet" type="text/css" href="/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/css/style.css" />
<link rel="stylesheet" type="text/css" href="/css/inline_others.css" />
<link rel="stylesheet" type="text/css" href="/css/single.css" /> 
<link rel="stylesheet" type="text/css" href="/colortip-1.0/colortip-1.0-jquery.css"/>

<script type="text/javascript" src="/js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="/js/commonFunctions.js"></script>
<script type="text/javascript" src="/colortip-1.0/colortip-1.0-jquery.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2/swfobject.js"></script>

<%
String videoDetailsMap = "{}";
if(request.getAttribute("videoDetailsMapByCompany") !=null)
{ 
	videoDetailsMap = (String)request.getAttribute("videoDetailsMapByCompany");
}
String badgesInfo = "{}";
if(request.getAttribute("badgesMapByCompany") !=null)
{ 
	badgesInfo = (String)request.getAttribute("badgesMapByCompany");
}

String userStatusDetailsInfo = "{}";
if(request.getAttribute("userStatusDetailsMapByCompany") !=null)
{ 
	userStatusDetailsInfo = (String)request.getAttribute("userStatusDetailsMapByCompany");
}

String userProfileInfo = "{}";
if(request.getAttribute("userProfileMapByCompany") !=null)
{ 
	userProfileInfo = (String)request.getAttribute("userProfileMapByCompany");
}
%>
	
	
<script type="text/javascript">

	var userProfileInfo 			= <%=userProfileInfo%>
	var userStatusDetailsInfo 		= <%=userStatusDetailsInfo%>
	var videoDetailsMap				= <%=videoDetailsMap%>
	var badgesInfo					= <%=badgesInfo%>
	
	var videoIdLists				= new Array();
	var addVideosArray				= new Array();
	var videoStatusList 			= new Array();
	var buildVideoList				= "";
	var videostatus					= "";
	var videoPostioning				= "odd";
	var badgeId						= "";
	var userStatusKey				= "";
	var videoStartingSeconds		= 0;
	

</script> 

<script type="text/javascript">

	$(document).ready(function(){
		for(indexingBadgesList in badgesInfo)
		{
			var isVideo			= false;
			var videoStartTimeSeconds = 0;
			var buildVideoList  = "";
			badgeId				= badgesInfo[indexingBadgesList].key;
			$(".briefBadgeImage").attr("src",badgesInfo[indexingBadgesList].badgeLogoPath);
			$("#briefBadgeName").find("h3").html(badgesInfo[indexingBadgesList].badgeName);
			$("#briefBadgeName").find("h4").html(badgesInfo[indexingBadgesList].badgeValue+" points for this "+badgesInfo[indexingBadgesList].badgeType);
			
			if(String(badgesInfo[indexingBadgesList].contentType) === "true")
			{
				$('.badges_list').find("p").html(badgesInfo[indexingBadgesList].badgeDiscription.value);
			}
			else
			{
				$('.badges_list').find("p").html(htmlDecode(badgesInfo[indexingBadgesList].badgeDiscription.value));
			}	
			
			
			//$(".badges_list").find("p").html(badgesInfo[indexingBadgesList].badgeDiscription.value);
			videoIdLists			= String(badgesInfo[indexingBadgesList].videoid).split(",");
			if(videoIdLists.length > 0)
			{
				for(indexingUserStatusMap in userStatusDetailsInfo)
				{
					if(userStatusDetailsInfo[indexingUserStatusMap].stuffid === badgeId)
					{
						videoStatusList		= String(userStatusDetailsInfo[indexingUserStatusMap].videostatus).split(",");
						userStatusKey		= userStatusDetailsInfo[indexingUserStatusMap].key;
						for(var i = 0 ; i < videoStatusList.length ; i++)
						{
							for(indexingVideoDetialsMap in videoDetailsMap)
							{
								if(String(videoStatusList[i]).split(":")[0] === videoDetailsMap[indexingVideoDetialsMap].key && addVideosArray.indexOf(videoStatusList[i]) === -1)
								{
									isVideo = true;
									if(String(videoStatusList[i]).split(":")[1] != "not started" && String(videoStatusList[i]).split(":")[1] != "completed")
									{
										videostatus = "unwatched";
										videoStartTimeSeconds	= parseInt(String(videoStatusList[i]).split(":")[1]);
										addVideosArray.push(videoStatusList[i]);
									}	
									else if(String(videoStatusList[i]).split(":")[1] === "completed")
									{
										videostatus = "watched";
										videoStartTimeSeconds	= 0;
										addVideosArray.push(videoStatusList[i]);
									}
									else if(String(videoStatusList[i]).split(":")[1] === "not started")
									{
										videostatus = "";
										videoStartTimeSeconds	= 0;
										addVideosArray.push(videoStatusList[i]);
									}	
									 buildVideoList  += 	 '<li id="'+videoDetailsMap[indexingVideoDetialsMap].videoId+'" class="row_clr '+videoPostioning+'" onclick=_run("'+videoDetailsMap[indexingVideoDetialsMap].videoId+'","'+videoStartTimeSeconds+'"),run("'+videoDetailsMap[indexingVideoDetialsMap].key+'","'+userStatusDetailsInfo[indexingUserStatusMap].key+'","'+badgesInfo[indexingBadgesList].key+'","'+videoDetailsMap[indexingVideoDetialsMap].videoId+'");>'+
									 '<code class="'+videostatus+'"></code>'+
									 '<img src="'+videoDetailsMap[indexingVideoDetialsMap].videothumbnail+'" height="90" width="120" class="video_thump video_popup_act"/>'+
									 '<p class="heading video_title_heading">'+videoDetailsMap[indexingVideoDetialsMap].vidtitle+'</p>'+ 
									 '</li>';
									
									if(videoPostioning === "odd")
									{
										videoPostioning	= "even";
									}
									else
									{
										videoPostioning	= "odd";
									}
								}	
								
							}
						}
					}	
				}
			}
			if(isVideo)
			{
				 
				 $('.add_vlink_cont').html(buildVideoList+'<div class="clear_all"></div><div class="badges_list" style="width: 570px;" id="makeBadgeReq">'+
							 '<h3>Please make your badge request after watching all videos</h3><textarea id="textAreaBadgeReq" style="display:none;width:565px;"></textarea>'+
			                    '<input type="button" id="showRequest" value="Make your badge request" style="padding: 6px; margin-top: 20px;" class="grn_btn2"/><input style = "display:none;padding: 6px; margin-top: 20px;" type="button" id="makerequest" value="Make your badge request" class="grn_btn2 add_vlink add_vlink_act" onclick="requestForTheBadge()"/></div>'); 
			}
			else
			{
				 $('.add_vlink_cont').html(buildVideoList+'<div class="clear_all"></div><div class="badges_list" style="width: 570px;" id="makeBadgeReq">'+
						 '<h3>Please make a request to get this badge !</h3><textarea id="textAreaBadgeReq" style="width:565px;"></textarea>'+
		                    '<input type="button" value="Make your badge request" style = "padding: 6px; margin-top: 20px;" class="grn_btn2" onclick="requestForTheBadge()"/></div>'); 
			}
		}
		
		$('#showRequest').live("click",function() {
			var statusToMakeRequest = "true";
			$('.add_vlink_cont').children().each(function(){
				 var kid = $(this);
				 if($(this).attr("class").indexOf("row_clr") != -1)
					 {
						 if($(this).find('code').attr("class") == "undefined"   || $(this).find('code').attr("class") == undefined)
							 {
							 	statusToMakeRequest = "false";
							 }
						 
						 else if($(this).find('code').attr("class").indexOf("unwatched") != -1 ||  String($.trim($(this).find('code').attr("class"))) === "")
							 {
							 	statusToMakeRequest = "false";
							 }
					 }
				 
			});
			if(statusToMakeRequest.indexOf("true") != -1)
				{
					$('#showRequest').hide();
					$('.badgestowork').hide();
					$('#makerequest').show();
					$('#textAreaBadgeReq').show();
				}
			else
				{
					alert("Please complete watching all video's !")
				}
		});
			
	});	
	
	function hideStatusMessage()
	{
		if(document.getElementById("voice-box").getAttribute("status") == "saved")
		{
			$("#voice-box").fadeOut(300);
		}
	}
		
</script>

<script>

	var c=0;
	var t;
	var timer_is_on=0;
	
	function timedCount()
	{
		c=c+1;
		t=setTimeout("timedCount()",1000);
	}
	
	function doTimer()
	{
		if (!timer_is_on)
		  {
			  timer_is_on=1;
			  timedCount();
		  }
	}
	
	function stopCount()
	{
		clearTimeout(t);
		timer_is_on=0;
	}
	
	var duration;
	var ytplayer;
	
	function updateHTML(elmId, value) 
	{
		document.getElementById(elmId).innerHTML = value;
	}
	
	function loadVideo(vid) 
	{
		videoID = vid;
		if(ytplayer) 
		{ 	
			ytplayer.loadVideoById(vid,videoStartingSeconds);
		}
	}
	
	function onPlayerError(errorCode) 
	{
	}
	function updatePlayerInfo() 
	{
		if(ytplayer && ytplayer.getDuration) 
		{
			updateHTML("videoDuration", ytplayer.getDuration());
			updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
			updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());  
			updateHTML("startBytes", ytplayer.getVideoStartBytes());
			updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
		}  
	}
	var videoID="muLIPWjks_M"; 
	
	function onytplayerStateChange()
	{
		if(ytplayer.getPlayerState()=== 0) 
		{
			stopCount();
			showalert();
		}
		if(ytplayer.getPlayerState()=== 1)
		{
			doTimer();
		}
		if(ytplayer.getPlayerState()=== 2)
		{
			stopCount();
		}
		if(ytplayer.getPlayerState()=== 3)
		{
			stopCount();
		}
		if(ytplayer.getPlayerState()=== -1)
		{
// 			c=0;
			stopCount();
		}
	}
	
	function loadPlayer(dynamicVideoURL) 
	{
		videoID = dynamicVideoURL;
		var params = { allowScriptAccess: "always" };
		var atts = { id: "ytPlayer" };
		swfobject.embedSWF("http://www.youtube.com/v/" + videoID +  "?&enablejsapi=1&rel=0&fs=1&version=3", 
	                   "videoDiv", "480", "295", "9", null, null, {  allowScriptAccess: 'always',
	                       allowFullScreen: 'true'
	                     }, atts);
	}
	
	 function _run(dynamicVideoURL,startSeconds) 
     {
   	  videoStartingSeconds		= parseInt(startSeconds);
		for(index in videoDetailsMap)
		{
			if(videoDetailsMap[index].videoId.indexOf(dynamicVideoURL) != -1)
			{
				$('#video_heading').html(videoDetailsMap[index].vidtitle);
			}
		}
		$("#badgepopup").hide();
		$('#backgroundPopup').show();
		$('#videopopup').fadeIn();
		$('body').addClass('noscroll');
		$('body').removeClass('scroll');
		var browsername = navigator.userAgent;
		if(browsername.indexOf("Chrome") != -1)
		 {
			 loadPlayer(dynamicVideoURL);
		 }
		 else if (browsername.indexOf("Firefox")!=-1) 
		 {
			 loadPlayer(dynamicVideoURL);
			 loadVideo(dynamicVideoURL);
		 }
		 else
		 {
			 loadPlayer(dynamicVideoURL);
		 }
	}
	
	
	var player="false"; 
	function onYouTubePlayerReady(playerId) 
	{
		player="true"; 
		ytplayer = document.getElementById("ytPlayer");
		ytplayer.addEventListener("onError", "onPlayerError");
		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
		loadVideo(videoID); 
	}
	
	var videokey1="";
	var badgekey1="";
	var userDetailsKeyForVideo = "";
	var runvideoId = "";
	
	function run(test1,userDetailsKey,test2,runvideoIdPassed)
	{
	   videokey1=test1;
	   userDetailsKeyForVideo = userDetailsKey;
	   badgekey1=test2;
	   runvideoId = runvideoIdPassed;
	}
	
	function badge_popup1()
	{
		$('body').removeClass('noscroll');
		$('body').addClass('scroll');
		ytplayer.stopVideo();
		if(ytplayer.getPlayerState() === -1)
		{
			  $('#backgroundPopup').hide();
			  $('#videopopup').hide();
			  $("#badgepopup").fadeIn();
			  $("#voice-box").fadeIn();
			  document.getElementById("statusMessage").innerHTML = "Didn't start watching the video!";
			  document.getElementById("voice-box").setAttribute("status", "saved");
			  setTimeout("hideStatusMessage()", 1750);
		}
		else
		 {
			 stopCount();
			 $('#backgroundPopup').hide();
			 $("#badgepopup").fadeIn();
			 showalert();
			 $('#videopopup').hide();
		 }
	}
	
	  var videostatus="";
	  function showalert()
	  {
		  if(c>=Math.floor(ytplayer.getDuration() - videoStartingSeconds) && ytplayer.getDuration() != 0 && c!= 0 && ytplayer.getCurrentTime() === ytplayer.getDuration())
		  {
			  videostatus="completed";
			  videoStartingSeconds	= 0;
			   try{
					if(videokey1 != "")
						{
					 $.ajax({type: 'POST', url: '/storevideopercentage1' ,data:"userDetailsKey="+userDetailsKeyForVideo+"&status="+videostatus+"&videokey="+videokey1, success: function(data)
						 { 
						  	 if(userStatusDetailsInfo[userDetailsKeyForVideo])
						  		 {
						  		 	var previousVideoStatus = new Array();
						  		 	if(String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus).indexOf(",") != -1)
						  		 		previousVideoStatus = String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus).split(",");
						  		 	else if(String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus))
						  		 		{
						  		 			previousVideoStatus.push(String(userstatusdetails[userDetailsKeyForVideo].videostatus));
						  		 		}
						  		 	for(var i=0;i<previousVideoStatus.length;i++)
						  		 		{
						  		 			if(previousVideoStatus[i].indexOf(videokey1) != -1)
						  		 				previousVideoStatus[i] = videokey1+":"+videostatus;
						  		 		}
						  		 	
						  		 	userStatusDetailsInfo[userDetailsKeyForVideo].videostatus			= previousVideoStatus;
						  		 	
						  		 	$(".add_vlink_cont li[id='"+videoID+"']").attr("onclick",'_run("'+videoID+'","0")');
						  		 }
							 $('.add_vlink_cont').find('#'+runvideoId).find('code').attr("class","watched");
							 videokey1 = "";
							 $("#voice-box").fadeIn();
							 document.getElementById("statusMessage").innerHTML = "completely watched!";
							 document.getElementById("voice-box").setAttribute("status", "saved");
							 setTimeout("hideStatusMessage()", 1750);
						 } 
					 	}); 
						}
			   }
			   catch(e)
				{
				}
		  }
		 else
		 {
			 if(videoStartingSeconds < ytplayer.getCurrentTime() && c >= Math.floor(ytplayer.getCurrentTime() - videoStartingSeconds))
			 {
				 videostatus	=	ytplayer.getCurrentTime();
			 }
			 else
			 {
				 videostatus	=	videoStartingSeconds;
			 }	 
			 
			 videoStartingSeconds	= videostatus;
			 
			 try{
				 if(videokey1 != "" && ytplayer.getCurrentTime() < ytplayer.getDuration())
				 {
						 $.ajax({type: 'POST', url: '/storevideopercentage1' ,data:"userDetailsKey="+userDetailsKeyForVideo+"&status="+videostatus+"&videokey="+videokey1, success: function(data)
							 { 
							 	var currentclasscode					= $('.add_vlink_cont').find('#'+runvideoId).find('code').attr("class");
							 	
								   if(currentclasscode != "watched" )
								   {
									   $('.add_vlink_cont').find('#'+runvideoId).find('code').attr("class","unwatched");
									   $("#voice-box").fadeIn();
									   document.getElementById("statusMessage").innerHTML = "partially watched!";
									   document.getElementById("voice-box").setAttribute("status", "saved");
									   setTimeout("hideStatusMessage()", 1750);
									   
									   if(userStatusDetailsInfo[userDetailsKeyForVideo])
								  	   {
								  		 	var previousVideoStatus 	= new Array();
								  		 	
								  		 	if(String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus).indexOf(",") != -1)
								  		 	{
								  		 		previousVideoStatus = String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus).split(",");
								  		 	}	
								  		 	else if(String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus))
								  		 	{
							  		 			previousVideoStatus.push(String(userStatusDetailsInfo[userDetailsKeyForVideo].videostatus));
							  		 		}
								  		 	
								  		 	for(var i=0;i<previousVideoStatus.length;i++)
								  		 	{
							  		 			if(String(previousVideoStatus[i]).indexOf(videokey1) != -1)
							  		 			{
							  		 				previousVideoStatus[i] = videokey1+":"+videostatus;
							  		 			}	
								  		 	}
								  		 	userStatusDetailsInfo[userDetailsKeyForVideo].videostatus			= previousVideoStatus;
								  		 	
								  		 	$(".add_vlink_cont li[id='"+videoID+"']").attr("onclick",'_run("'+videoID+'","'+videostatus+'"),run("'+videokey1+'","'+userDetailsKeyForVideo+'","'+userStatusDetailsInfo[userDetailsKeyForVideo].stuffid+'","'+videoID+'")');
								  		}
								   }
								   videokey1 = "";
							  } 
							 
						 }); 
					 }
			   }
			   catch(e)
				{
				}
		   }
	  }
	
	
	function requestForTheBadge()
	{
		if($('#textAreaBadgeReq').val())
		if($('#textAreaBadgeReq').val().trim() != "")
		{	
			if($('#textAreaBadgeReq').val()){
				var badgeReqContent = $('#textAreaBadgeReq').val();
			}
			
			var badgeId = $('.briefBadgeImage').attr("id");
			var badgeType = "";
			for(indexBadge in badgesInfo)
			{
				if(indexBadge.indexOf(badgeId) != -1)
				{
					badgeType = badgesInfo[indexBadge].badgeType;
				}
			}
			$.ajax({type: 'POST', url: '/updateRequestForBadge' ,data:"userStatusKey="+userStatusKey+"&badgeReqContent="+badgeReqContent, success: function(data){
		 		if(data != null)
		 			{
			 			$("#voice-box").fadeIn();
						document.getElementById("statusMessage").innerHTML = "Request has been sent!";
						document.getElementById("voice-box").setAttribute("status", "saved");
						setTimeout("hideStatusMessage()", 1750);
						$('#makeBadgeReq').hide();
		 			}
     		}
	 });
	     }
			else
				{
					$("#voice-box").fadeIn();
				 	document.getElementById("statusMessage").innerHTML = "Please enter the description to make a request!";
				  	document.getElementById("voice-box").setAttribute("status", "saved");
				  	setTimeout("hideStatusMessage()", 1750);
				}
		
	}

</script>

</head>
<body>
<div id="voice-box" style="display: none;">
<p><span id="statusMessage">Saving changes...</span></p> 
</div>

<div class="popup_holder popup_pos badge_detail_act"  style="display:block;margin-top: 35px;">
	 <div class="popup" id="badgepopup">
        <div class="badge_detial_col">
        	   <div class="badge_detial_col" id="badgeInformation">
        	<ul class="user_info">
            	<li>
                	
                <div class="clear_all"></div>
                </li>
            </ul>   
            <div id="badge_holder">
        	<ul class="user_info">
            	<li>
                	<div class="popup_img">
                    	<img class="briefBadgeImage" title="This is a test" alt="typing-test" src="" style="height: auto; width: 95px;"/>
                        <!--<code class="badge_icon"></code>-->
                    </div>
                	<div class="person_name" id="briefBadgeName">
                        <h3>Setmore Basic Certification</h3>
                        <h4>50 points for this badge</h4>
                    </div>
                    <div class="clear_all"></div>
                </li>
            </ul>    
     <div class="badges_list" style="width: 570px;">
            	<p>
                	The Setmore Basic Certifiation is for a user that has set up their own account and can answer basic question on Setmore
                </p>
               <!--  <ul>
					<li>
                    	<p>To get this certification please go to goo.gl/vMtCN.</p>
                	</li> 
                	<li>
                    	<p>You will find a list of activities you are to complete. Once you have completed them then please submit request.</p>
                	</li> 
                    <li>
                    	<p class="last">On request notes please include your username and password for setmore</p>
                    </li>
                </ul> -->
            <div class="clear_all"></div>     
            </div> <!-- badges_list -->
      		<ul class="add_vlink_cont">
             </ul>
                              <div class="mem_of_badge person_name"></div>
              <div class="clear_all"></div>
                </div> <!-- badges_list --> 
                <div class="clear_all"></div>
                
                <!-- <div class="badges_list" id="makeBadgeReq">
				<h3>Please make your badge request after watching all the videos</h3>
				<textarea id="textAreaBadgeReq" style="display:none"></textarea>
				<input type="button" id="makerequest" style = "display:none;padding: 6px; margin-top: 20px;" value="Make your badge request" class="grn_btn2 add_vlink add_vlink_act" onclick="requestForTheBadge()"/>
                <input type ="button" id="showRequest" class = "grn_btn2" style="padding: 6px; margin-top: 20px;" value = "Make your badge request" />   
                </div>  -->
            <div class="clear_all"></div>       
        </div>  
        </div> <!-- badge_detail_col -->
       <div class="clear_all"></div> 
</div>
</div>
<center>
<div class=" popup_holder popup_pos badge_detail_act" id="videopopup" style="display: none; margin-top: 35px;">
		<div class="popup" id="videopopup">
		  <div class="badge_detial_col">
		  <div class="popup_close popup_close_act" style="margin: 0 14px 0 0;"onclick="badge_popup1()">x</div>
			<h3 style="border-bottom: 1px solid #CCCCCC;color: #000000;font-size: 20px;margin-top:15px;margin-bottom: 30px;padding-bottom: 15px;" id="video_heading">Video Heading</h3>
				
					<div class="video_link" style="padding-bottom: 20px;">
						<div id="videoDiv">Loading...</div>
					</div>
			</div>
		</div>
</div>
</center>
<div id="backgroundPopup" ></div>

<!-- LoopTodo Feedback Form Code -->
<!-- LoopTodo Feedback Form Code -->
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
<!-- End LoopTodo Feedback Form Code --> 
</body>
</html>
