<%@page import="java.util.LinkedHashMap"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.google.gson.GsonBuilder"
	import="org.codehaus.jackson.map.ObjectMapper"
	import="org.codehaus.jackson.JsonGenerator"
	import="org.codehaus.jackson.JsonParser"
	import="org.codehaus.jackson.map.DeserializationConfig"
	import="org.codehaus.jackson.map.SerializationConfig"
	import="org.codehaus.jackson.map.annotate.JsonSerialize"%>
<%@page import="java.net.URLDecoder"%>
<%@page import="java.net.URLEncoder"%>
<%@page import="com.acti.jdo.UserProfile" import="java.util.HashMap"
	import="com.acti.jdo.*"
	import="org.apache.commons.collections.MultiHashMap"
	import="org.apache.commons.collections.MultiMap"
	import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
	import="com.google.appengine.api.blobstore.BlobstoreService"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></meta>
<title>AdaptiveYou - My page</title>

<link rel="stylesheet" type="text/css" href="../css/reset.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/style.css" ></link>
<link rel="stylesheet" type="text/css" href="../css1/single.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/admin.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/me.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/tipTip.css" ></link>
<!-- <link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" ></link> -->

<link rel="stylesheet" type="text/css" href="../colortip-1.0/colortip-1.0-jquery.css"></link>
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css"></link>
 
<script src="js1/jquery-1.6.2.min.js"></script>
<script src="js1/jquery.Jcrop.min.js"></script>
<script src="js1/ajaxfileupload.js"></script>
<script type="text/javascript" src="/adaptiveYouPages/me.js"></script> 
<script type="text/javascript" src="js/imageCropper.js"></script> 
<script type="text/javascript" src="../js/commonFunctions.js"></script>
<link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css"></link>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2/swfobject.js"></script>
<script type="text/javascript" src="../js/tooltip.js"></script> 
<script type="text/javascript" src="../js/taggingForMePage.js"></script>	
<script type="text/javascript" src="../js/tipTip.js"></script>
<script type="text/javascript" src="../js/jquery-ui.js"></script>
<script type="text/javascript" src="../js/feedback.js"></script>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>
<script src='/_ah/channel/jsapi'></script>

<style type="text/css">
#content_wrapper { 
	width:765px;
	overflow:hidden;
	margin:0px auto;

}

ul li div.gp_badges { width:100%; height:110px; color:#000; text-align:center; }
.group div.gp_badges badges { 
	display:block;
	width:34px;	height:39px;
	float:left;
	margin:4px;
	background:#fff;

}
bg_tit {width:318px; display:block; }
ul li div.all_badges { display:none; }
ul li.large div.gp_badges { display:none !important; }

ul li.large div.all_badges { display:block; }
ul li div.all_badges{ width:320px; height:230px; padding:5px; position:relative;  }
.group div.all_badges badges { 
	display:block;
	width:98px;	height:106px;
	float:left;
	margin:4px;
	background:#fff;
    text-align:center;
    
}
.group div.all_badges badges .badge-name{ 
    margin:5px 0 0 0;
    }
.earnBadgeUL li .gp_badges badges img{ 
    width:33px!important; 
    height:33px!important;
    }
.earnBadgeUL li .all_badges badges img{ 
    width:70px!important; 
    height:70px!important;
    }
bg_tit{ 
    color: #8B9BA0;
    font-size: 18px;
    font-weight: bold;
    }



.isotope,
.isotope .isotope-item {
  -webkit-transition-duration: 0.8s;
     -moz-transition-duration: 0.8s;
      -ms-transition-duration: 0.8s;
       -o-transition-duration: 0.8s;
          transition-duration: 0.8s;
}

.isotope {
  -webkit-transition-property: height, width;
     -moz-transition-property: height, width;
      -ms-transition-property: height, width;
       -o-transition-property: height, width;
          transition-property: height, width;
}

.isotope .isotope-item {
  -webkit-transition-property: -webkit-transform, opacity;
     -moz-transition-property:    -moz-transform, opacity;
      -ms-transition-property:     -ms-transform, opacity;
       -o-transition-property:      -o-transform, opacity;
          transition-property:         transform, opacity;
}


.isotope.no-transition,
.isotope.no-transition .isotope-item,
.isotope .isotope-item.no-transition {
  -webkit-transition-duration: 0s;
     -moz-transition-duration: 0s;
      -ms-transition-duration: 0s;
       -o-transition-duration: 0s;
          transition-duration: 0s;
}

.isotope.infinite-scrolling {
  -webkit-transition: none;
     -moz-transition: none;
      -ms-transition: none;
       -o-transition: none;
          transition: none;
}

.element {
  width: 110px;
  height: 110px;
  margin: 5px;
  float: left;
  overflow: hidden;
  position: absolute;
  
  color: #222;
  -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
          border-radius: 5px;
}



.element.large {
  width: 328px!important;
  height: 251px!important;
  z-index: 100!important;
}

</style>
















<script type="text/javascript">//bh1 fr video start
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
<%
//     if(session.getAttribute("userProfileDetails")==null){
//     	  response.sendRedirect("/");
//     } 
  String userProfile = (String)request.getAttribute("userProfileDetails");
  
	String badgesListMap = "{}";
	if(request.getAttribute("badgesListMap") != null)
	{
		badgesListMap = (String)request.getAttribute("badgesListMap");
	}
	
	String userBadgeLogJdoMap = "{}";
	if(request.getAttribute("userBadgeLogJdoMap") != null)
	{
		userBadgeLogJdoMap = (String)request.getAttribute("userBadgeLogJdoMap");
	}
	
	 String userStatusDetailsMap="{}";
	 if(request.getAttribute("userStatusDetailsMap") != null)
	 {
		  userStatusDetailsMap = (String)request.getAttribute("userStatusDetailsMap");
	 }
	BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
	
	String firstName = "";
	firstName = (String) session.getAttribute("userFirstName");
	String lastName = "";
	lastName = (String) session.getAttribute("userLastName"); //userImage
	String profileImage = "";
	profileImage = (String) session.getAttribute("userImage");
	String emailId = "";
	emailId = (String) session.getAttribute("userEmailid");
	
		 String videoDetailsMap = "{}";
		 if(request.getAttribute("videoDetailsMap") != null)
		 {
			 videoDetailsMap = (String)request.getAttribute("videoDetailsMap");
		 }
		 String companyDetails = "{}";
		if(session.getAttribute("companyslist") != null)
		 {
		 	companyDetails=(String)session.getAttribute("companyslist");
		 }
	 	String userProfileMap = "{}";
	 	if(request.getAttribute("userProfileMap") != null)
	 	{
	 		userProfileMap = (String)request.getAttribute("userProfileMap");
	 		 System.out.println("userProfileMap ::"+userProfileMap);
	 	}
		String auctionListMap = "{}";
		if(request.getAttribute("auctionListMap") != null)
		{
			auctionListMap = (String)request.getAttribute("auctionListMap");
		}
		System.out.println("auctionListMap ::"+auctionListMap);
		String requestURLFromFeedback 			=  request.getRequestURL().toString(); 
	%>

<script type="text/javascript">
	var oauthFirstName 			= '<%= firstName %>';
	var oauthLastName 			= '<%= lastName %>';
	var userFirstName 			= '<%= firstName%>';
	var userLastName 			= '<%= lastName%>';
	var profilePicture			= "";
	var oauthImage				= '<%= profileImage %>';
	var userDetails   			= <%= userProfile%>;
	var badgesListMap 			= <%= badgesListMap%>
	var userBadgeLogJdoMap 		= <%= userBadgeLogJdoMap%>;
	var userstatusdetails		= <%= userStatusDetailsMap %>;
	var userProfileMap			= <%= userProfileMap%>;
	var userFirstName 			= "";
	var userLastName 			= "";
	var userEmail 				= "";
	var userKey 				= "";
	var userType 				= "";
	var userName 				= "";
	var companylist				= "";
	var videodetailsMap			= <%= videoDetailsMap %>;
	var bannerCompanyName 		= '<%= (String)session.getAttribute("companyName") %>';
	var companyList 			= <%= companyDetails %>;
	var auctionListMap			= <%= auctionListMap%>;
	var requestURL 				= '<%= requestURLFromFeedback%>';
	
	  var uploadSessionURL="";
	    
	  $("#saveCroppedPicture").live("click",function(){
		  
		  	$("#saveCroppedPicture").attr("disabled",true).removeClass("grn_btn").addClass("gry_btn");
		  
			if(uploadSessionURL == "")
			{
				uploadSessionURL= '<%= blobstoreService.createUploadUrl("/displayCroppedImage")%>';
			}
			
			$.ajaxFileUpload({
								url:uploadSessionURL,
								secureuri:false,
								data:{x1:x1,y1:y1,x2:x2,y2:y2,height:croppedHeight,width:croppedWidth},
								fileElementId:pictureElement.id,
								success: function (text, status)
								{
							 		$.ajax({  
						   			    	type: 'POST', 
						   			    	url: '/getCroppedImageUrl',
						   			    	async: true, 
						   			    	success: function( data )
						   			    	{
						   			    		$('#profileImage').attr("src", data.toString().split(",")[0]);
											 	$('#beingCroppedPicture').attr('src', "");
											 	$('.jcrop-tracker').remove();
											 	jcrop_api.destroy();
											 	$("#backgroundPopup").fadeOut();
											 	$("#editPictureHolder").hide();
									    	    $('#beingCroppedPicture').hide();
									    		$('#saveCroppedPicture').hide();
									    		$('#cancelOption').hide();
									    		$('#selectNewPicture').hide();
									    		$("#updatePictureCheck").removeAttr("checked");
									    		$('#selectPicture').show();
						   			    		uploadSessionURL=data.toString().split(",")[1];
						   			    		document.getElementById("statusMessage").innerHTML = "Saved Changes...";
											 	$("#voice-box").fadeIn();
											 	$("#voice-box").fadeOut(1750);
											}
						   			     });
								}
			
							});
			
					
		    		
			});
	  
			
		var uploadURL	=	'<%=blobstoreService.createUploadUrl("/uploadBadgeLogo.do?")%>';
		var newImageURL = "";	
		var imageData = "";
		
		function uploadBadgeLogo(companyLogElement){			
			
			if(companyLogElement.value.toLowerCase().indexOf(".png") == -1 && companyLogElement.value.toLowerCase().indexOf(".jpeg") == -1 && companyLogElement.value.toLowerCase().indexOf(".bmp") == -1 && companyLogElement.value.toLowerCase().indexOf(".jpg") == -1){
				return;
			}	
			 
			$.ajaxFileUpload({
				url:'<%=blobstoreService.createUploadUrl("/uploadBadgeLogo.do?")%>',
				secureuri:false,
				fileElementId:companyLogElement.id,
				success: function (data, status)
				{
					window.location.reload();
				}
			});
		}
		window.onload = function() {
			$(window).bind('hashchange',function(e)
					{
				conosole.log("comes here on load");
						if(String(e.originalEvent.newURL).indexOf("earnbadgeslink") != -1)
						{
						console.log("earnbadges");
						}
					});
			
		};
</script>


</head>
<body onload="cache();">
	<div id="voice-box" style="display: none;">
		<p>
			<span id="statusMessage">Saving changes...</span>
		</p>
	</div>
	<div class="wrapper">
		<div id="login_details">
		<ul class="right_nav_holder">
		<li class="welcome_username"></li>
		<li id="account_menu"><a id="account_name" href="#"></a>
		<ul id="companyslist"></ul>
		</li>
		<li id="account_menu"><a href="#">My Account</a>
		<ul>
		<!-- <li id="my_details" onclick="openwin();"></li> -->
		<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a></li>
		</ul></li>
		</ul>
		</div>
		<!-- login_details -->
		<div id="header" class="admin_header">
			<div class="header_holder">
				<div id="company-name"><%= (String)session.getAttribute("companyName") %></div>
				<div id="header_nav_holder">
					<div class="tab_nav_holder" >
						<ul class="nav_list" style="right:3px;">
							<li class="adminpanel"><a href="/admin">Admin</a></li>
							<li><a href="/others">Others</a></li>
							<li class="selected"><a href="/persistUser">Me</a></li>
						</ul>
						<div class="clear_all"></div>
					</div>
					<!-- tab_nav_holder -->
				</div>
				<!-- header_nav_holder -->
			</div>
			<!-- header_holder -->
		</div>
		<!-- header -->

		<div id="profile_panel" class="content-wrapper single-wrapper">
			<div class="picture">
				<div class="picture_frame">
				<img id="profileImage"  alt="Broken Profile Image"/>
				</div>
			</div>
			<ul class="side_nav">
				<li class="active" id="myprofile">My Profile</li>
				<li class="earnbadges" id="earnbadges">Earn Badges / Trophies</li>
				<li id="getStuffWithBadge">Get Stuff</li>
				<li id="settingsbutton">Settings</li>
				<!-- <li id="badgestowork">Badges to work on</li> -->
				<li id="todays_auction">Today's Auction</li>
			</ul>

			<div class="badge_detial_col" id="myBadgesTrophies">
				<ul class="user_info">
					<li>
						<div class="person_name">
							<h3 class="user_person_name"></h3>
						</div>
						<div class="points_wrapper my_points">
							<ul class="totals">
								<li class="badge_total"><span class="badgeDB_total">0</span>
									Badges</li>
								<li class="trophy_total"><span class="trophyDB_total">0</span>
									Trophies</li>
							</ul>
							<div class="total">0</div>
						</div>
						<div class="clear_all"></div>
					</li>
				</ul>

				<div class="badges_list">
					<h2 class="user_person_name_badges">My Badges</h2>
					<ul id="total_badges" class="">
					</ul>
					<div class="clear_all"></div>


				</div>
				<!-- badges_list -->

				<div class="badges_list">
					<h2 class="user_person_name_trophies">My Trophies</h2>
					<ul id="total_trophies">

					</ul>
					<div class="clear_all"></div>
				</div>
				
				<!-- badges_list -->
				<div class="badges_list">
             <h2 class="user_person_name_stuffs">My Stuff</h2>
                <ul id="stuffs_total">
                </ul>
            <div class="clear_all"></div>     
            </div>
			</div>
			<!-- badge_detail_col -->
			
					<span class="filtertags" title="Filter Badges by Tags"></span>
					<div class="tagfilterlist"><h3>TAGS</h3><span class="hide_filterTags" >Hide</span><ul id="list_of_tags"></ul></div>
					<span class="lineseperator"></span>
					
				 	<div class="badges_tag_holder" style="display:none;">
				 			    	
				 	
					
				  <span style= "color:#6B7E84;margin-bottom: 20px;margin-left:-6px;float: left;font-size: 22px;font-weight: bold;margin-top: 02px !important;">Badges Tagged With :</span><span id="tagName"></span>
			      <div class="clear_all">
			      </div>
			      <ul id="badgesLinkedToThisTag">
			      </ul>
			      <div class="clear_all"></div>
			      </div>
	    			
					
					
					
			<!-- For Earn badges -->
			<div class="badge_detial_col" id="earn_badge" style="display: none">
				<div class="points_wrapper my_points">
					<ul class="totals">
						<li class="badge_total"><span class="badgeDB_total">0</span>
							Badges</li>
						<li class="trophy_total"><span class="trophyDB_total">0</span>
							Trophies</li>
					</ul>
					<div class="total">0</div>
				</div>
				
					
					
				<div class="clear_all"></div>

				<div class="badges_list">
				
<!-- 				Changing Earn Badges To Company Badges -->
     <h2 class="BadgesTab">All Badges</h2>
     <div style="  float: right; margin: -46px 0 0 -39px;">
								<code style='margin-top: 7px; background: url("../images/total_icons.png") no-repeat scroll 0 -152px transparent;; margin: 5px 0 0 5px; position: absolute; width: 20px;height:20px'></code>
								<input type="text" onblur='unblank(this,"Search Badges...")' onfocus="blank(this)" onkeyup="searchBadges()" id="search_mem" value="Search Badges..." name="search" style="border: 1px solid #DDDCDC;height: 29px;padding: 6px 12px 4px 30px !important;"/>
							</div>
     
<!--      <div id="content_wrapper"> -->
<!--     <ul class="earnBadgeUL"> -->
<!--         <li class="element"> -->
<!--             <span class="unwatched"></span>	 -->
<!--             <img alt="tick" src="http://127.0.0.1:8888/_ah/img/_Ask2uGiAdt0XIvRZPu21Q"> -->
<!--             <div class="badge-name toolTip">tick</div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!--             <img  alt="gae" src="http://127.0.0.1:8888/_ah/img/Ww_aFP278bVa-Q3B1FYVhg"> -->
<!--             <div class="badge-name toolTip">gae</div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!--             <img alt="UX" src="http://127.0.0.1:8888/_ah/img/eiHIYIAllK2K4UgiuBD8ew"> -->
<!--             <div class="badge-name toolTip">UX</div> -->
<!--         </li> -->
         
<!--         <li class="element"> -->
<!--             <img alt="Time management" src="http://127.0.0.1:8888/_ah/img/JFa7G-xzeielw0rErP8mbg"> -->
<!--             <div class="badge-name toolTip">Time managem</div> -->
<!--         </li> -->
<!--         <li class="element group"> -->
<!--             <div class="gp_badges"> -->
<!--             	<badges> -->
<!--             	   <img alt="typing" src="http://127.0.0.1:8888/_ah/img/7ZFy49jPjAO22TaHxJCxnA"> -->
<!--             	</badges> -->
<!--                 <badges> -->
<!--                    <img alt="Code Academy" src="http://127.0.0.1:8888/_ah/img/_hhsVFZja_s4mTwPiKMSgg"> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="android school" src="http://127.0.0.1:8888/_ah/img/l1pBkeYwhRrGUnySL5YfPA"> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="planning" src="http://127.0.0.1:8888/_ah/img/dTO-1aYfK7DYyIvKtLTkrA"> -->
<!--                 </badges> -->
<!--                 <div class="badge-name toolTip">Cloudd</div> -->
<!--             </div> -->
<!--             <div class="all_badges"> -->
<!--             	<bg_tit>Cloudd</bg_tit> -->
            	
<!--             	<badges> -->
<!--             	   <img alt="typing" src="http://127.0.0.1:8888/_ah/img/7ZFy49jPjAO22TaHxJCxnA"> -->
<!--             	   <div class="badge-name toolTip">typing</div> -->
<!--             	</badges> -->
<!--                 <badges> -->
<!--                    <img alt="Code Academy" src="http://127.0.0.1:8888/_ah/img/_hhsVFZja_s4mTwPiKMSgg"> -->
<!--                    <div class="badge-name toolTip">Code Academy</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="android school" src="http://127.0.0.1:8888/_ah/img/l1pBkeYwhRrGUnySL5YfPA"> -->
<!--                    <div class="badge-name toolTip">android scho</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="planning" src="http://127.0.0.1:8888/_ah/img/dTO-1aYfK7DYyIvKtLTkrA"> -->
<!--                    <div class="badge-name toolTip">planning</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="Google google" src="http://127.0.0.1:8888/_ah/img/Nwjcms9qVEDou-mDGKcnLA"> -->
<!--                    <div class="badge-name toolTip">Google googl</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="Your Page" src="http://127.0.0.1:8888/_ah/img/GF0_hp1ZgiLpVDWql-i-_Q"> -->
<!--                    <div class="badge-name toolTip">Your Page</div> -->
<!--                 </badges> -->
<!--             </div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!--             <img alt="Geek News" src="http://127.0.0.1:8888/_ah/img/ZAQO6qZP4eNyRN4e7wnNrA"> -->
<!--             <div class="badge-name toolTip">Geek News</div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!--             <img alt="Eclipse" src="http://127.0.0.1:8888/_ah/img/Y-Rhd5HR3Sb5eY_oqG22vg"> -->
<!--             <div class="badge-name toolTip">Eclipse</div> -->
<!--         </li> -->
<!--         <li class="element group"> -->
<!--             <div class="gp_badges"> -->
<!--             	<badges> -->
<!--             	   <img alt="DS" src="http://127.0.0.1:8888/_ah/img/vIZVixdYhUM9VPJMMIvLaQ"> -->
<!--             	</badges> -->
<!--                 <badges> -->
<!--                    <img alt="Movies" src="http://127.0.0.1:8888/_ah/img/50p0UM6sG00576tkGEgxAw"> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="Polish" src="http://127.0.0.1:8888/_ah/img/amBjapsZ0KxlNSxVaXycUQ"> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="iPhone" src="http://127.0.0.1:8888/_ah/img/13PBHh3NwJdH1dtRlu_GwQ"> -->
<!--                 </badges> -->
<!--                 <div class="badge-name toolTip">Build</div> -->
<!--             </div> -->
<!--             <div class="all_badges"> -->
<!--             <bg_tit>Build</bg_tit> -->
            
<!--             	<badges> -->
<!--             	   <img alt="DS" src="http://127.0.0.1:8888/_ah/img/vIZVixdYhUM9VPJMMIvLaQ"> -->
<!--             	   <div class="badge-name toolTip">DS</div> -->
<!--             	</badges> -->
<!--                 <badges> -->
<!--                    <img alt="Movies" src="http://127.0.0.1:8888/_ah/img/50p0UM6sG00576tkGEgxAw"> -->
<!--                    <div class="badge-name toolTip">Movies</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="Polish" src="http://127.0.0.1:8888/_ah/img/amBjapsZ0KxlNSxVaXycUQ"> -->
<!--                    <div class="badge-name toolTip">Polish</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="iPhone" src="http://127.0.0.1:8888/_ah/img/13PBHh3NwJdH1dtRlu_GwQ"> -->
<!--                    <div class="badge-name toolTip">iPhone</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="Springer" src="http://127.0.0.1:8888/_ah/img/-QG2Lo4AhlHo5hVL4lwhzA"> -->
<!--                    <div class="badge-name toolTip">Springer</div> -->
<!--                 </badges> -->
<!--                 <badges> -->
<!--                    <img alt="Naming conversion" src="http://127.0.0.1:8888/_ah/img/EZrZ3ujTUwJZovAyuqe0SA"> -->
<!--                    <div class="badge-name toolTip">Naming conve</div> -->
<!--                 </badges> -->
<!--             </div> -->
<!--         </li> -->
<!--         <li class="element">  -->
<!--             <img alt="Java" src="http://127.0.0.1:8888/_ah/img/-xvVF2k_2v6dkXjnenwmxQ"> -->
<!--             <div class="badge-name toolTip">Java</div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!-- 	         <img alt="typing" src="http://127.0.0.1:8888/_ah/img/7ZFy49jPjAO22TaHxJCxnA"> -->
<!-- 	         <div class="badge-name toolTip">typing</div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!--             <img alt="Polish" src="http://127.0.0.1:8888/_ah/img/amBjapsZ0KxlNSxVaXycUQ"> -->
<!--             <div class="badge-name toolTip">Polish</div> -->
<!--         </li> -->
<!--         <li class="element"> -->
<!--             <img id="5c34e76e-c358-45c4-8598-a80d047a644f" alt="DS" src="http://127.0.0.1:8888/_ah/img/vIZVixdYhUM9VPJMMIvLaQ"> -->
<!--             <div class="badge-name toolTip">DS</div> -->
<!--         </li> -->
        
<!--     </ul> -->
<!-- </div> -->
     
     
     
     
     
     
     
     
     
     
     
     <ul id="earnBadgeUL">
     </ul>
     <div class="clear_all"></div>
    </div>
    
    <div class="badges_list">
    
<!--     Changing Earn Trophies To Company Trophies -->
     <h2 class="TrophiesTab">All Trophies</h2>
     <ul id="earnTrophiesUL">

     </ul>
     <div class="clear_all"></div>
    </div>

			</div>

			<!-- For my stuff -->
			<div class="badge_detial_col" id="getstuff" style="display: none">

				<div class="points_wrapper my_points">
					<ul class="totals">
						<li class="badge_total"><span class="badgeDB_total">0</span>
							Badges</li>
						<li class="trophy_total"><span class="trophyDB_total">0</span>
							Trophies</li>
					</ul>
					<div class="total">0</div>
				</div>
				<div class="clear_all"></div>

				<div class="get_stuff_col">
					<h3>Get Stuff</h3>
					<ul class="get_stuff">
					</ul>
					<!-- get_stuff -->
				</div>
				<!-- get_stuff_col -->

			</div>

			<!-- bh1 For  Settings start -->
			<div class="badge_detial_col" id="Settings" style="display: none">

				<div class="points_wrapper my_points">
					<ul class="totals">
						<li class="badge_total"><span class="badgeDB_total">0</span>
							Badges</li>
						<li class="trophy_total"><span class="trophyDB_total">0</span>
							Trophies</li>
					</ul>
					<div class="total">0</div>
				</div>
				<div class="clear_all"></div>

				<div class="get_stuff_col">
 					<input type="checkbox" id="updatePictureCheck" checked="checked" /><span style="margin-right: 10px;" id = "domainChangeImage" > Google's Profile Image</span>
					<input type="checkbox" id="updateNameCheck" checked="checked" /><span id = "domainChangeName"> Google's Profile Name</span><br><br><br>
				
					<input type="button" id="selectPicture" class="grn_btn" value="Change Picture" style="display: none; padding: 4px 11px;"/>
						<center>
							<div id="editPictureHolder" class="popup" style="display: none;">
							<div class="popup_close popup_close_act" onclick="javascript:closeEditPicturePopup();">x</div><br><br>
							<label><input type="button" id="saveCroppedPicture" class="grn_btn" value="Save Picture" style="display: none; margin-bottom: 10px; margin-right: 10px;"/></label>
							<label><input type="button" id="selectNewPicture" class="grn_btn" value="Choose New Picture" /></label>
							<img src="" id="beingCroppedPicture" style="display: none;"/><br>
							<input type="file" name="chooseNewPicture" id="choosePicture" style="display: none;" onchange="javascript:displaySelectedImage(this);"/>
							</div>
						</center>
					<br>
					
					<div id="updateUserName" >
						<br><br>
						<input type="text" value="" id="firstName"  style="margin-right: 15px;"/>
						<input type="text" value="" id="lastName" />
						<br>
						<input type="button" value = "Save" id="updateFullName" class="gry_btn" style="padding: 4px 48px;margin-top: 15px;"/>
						
					</div>
				</div> 
			</div>
			<!-- For Badge Information -->

			<div class="badge_detial_col" id="badgeInformation"
				style="display: none">
				<ul class="user_info">
					<li>

						<div class="clear_all"></div>
					</li>
				</ul>
				
				<div id="badge_holder">
					<ul class="user_info">
						<li>
							<div class="popup_img">
								<img class="briefBadgeImage" alt="" src="" style="height: 87px; width: 87px;"></img>
								<!--<code class="badge_icon"></code>-->
							</div>
							<div class="person_name" id="briefBadgeName">
								<h3>Setmore Basic Certification</h3>
								<h4>50 points for this badge</h4>
							</div>
							
							<div style="float:right;display: none;" class="badge_navigator">
								<span class="previousbadge"><img src="../images/dive_previous.png"></span>
								<span class="nextbadge"><img src="../images/dive_next.png"></span>
							</div>
							
							<div class="clear_all"></div>
						</li>
					</ul>
					<div class="badges_list">
						<p class="description_details">The Setmore Basic Certifiation is for a user that has set
							up their own account and can answer basic question on Setmore</p>
						<div class="clear_all"></div>
					</div>
					<!-- badges_list -->
					
					<div class="tagItStyle">
	              	<span id="allTagsCreated" style="display: none;"></span>
	              	<span><img id="adminAddNewTag" src="images/icons.png" /></span>
	              	<input type="text" value="" id="toAddNewTag" class="addNewTagInput" />
	              	</div>
	              	
	              	 <ul class="auto-complete-list">
                     </ul>
	              	
					<ul class="add_vlink_cont">
					</ul>
					
					
					<div class="clear_all"></div>
				<!-- badges_list -->
				<div class="clear_all"></div>
			</div>
			<div id="persisting_user" style="display: inline-block;"></div>
			<!-- badge_holder -->
			<div class="clear_all"></div>

		</div>
		<!-- badge_detail_col -->
		<!-- For Badge Information ends here -->
		<div class="auction_holder" style="diplay:none">
        
        
        <div class="productlist"  style= "display:none">
            	<ul class="auction_menu">
                	<li id="live_auction" class="selected">Live Auction</li>
                    <li id="future_auction" >Future Auction</li>
                    <li id="closed_auction" >Closed Auction</li>
                </ul><!--auction_menu-->
                
                 <div class="clear_all"></div> 
                 
                 
                   
                <ul class="live_auction_holder">
                
                	<li id="auctiondetail_act" class="product_list">
                    		<img src="">
                            <h3>iPad</h3>
                            <div class="left_time">
                            	<h1>10:00:00</h1>
                                <h2>Left to end Bid</h2>
                            </div>
                    </li>
                    
                    <li>
                    		<img src="">
                            <h3>iPad</h3>
                            <div class="left_time">
                            	<h1>10:00:00</h1>
                                <h2>Left to end Bid</h2>
                            </div>
                    </li>
                    <li class="last">
                    		<img src="">
                            <h3>iPad</h3>
                            <div class="left_time">
                            	<h1>10:00:00</h1>
                                <h2>Left to end Bid</h2>
                            </div>
                    </li>
                </ul><!--live_auction_holder-->
                <div class="clear_all"></div>
                
          </div>      
                
                   
                <div class="auction_detail_holder">
                	<div class="live_auction_detail">
                		<img src="">
                        <span class="auction_desc">
                        	<h2>iPad</h2>
                            <p>Product Bid start with 200pt, <br>
									you should have 200pt to make<br>
								a bid
                           </p>
                        </span>
                        <span>
                        	<h1>08:00:00</h1>
                            <h3>Left to end bid</h3>
                        </span>
                        <h5>insufficient points</h5>
                        <!-- <span id="bidnow_act" class="bidnow">Bid Now</span> -->
                        <span class="bidtext bidtext_act" style="margin-left: 77%;"><form><input type="text"><input type="submit" class="bidnow_button"/>BID</form></span>
                        <div class="clear_all"></div>
                </div><!--live_auction_detail-->
                <div class="points_holder" style="display:block">
                  <div class="current_points"> Your Points :<span>600pt</span></div>
                  <div class="balance_points">Your Balance Points :<span>300pt</span></div>
                  <div class="clear_all"></div>
                </div><!--Points_holder-->
                <div class="bid_points" style="display:block">
                		<span>Your Bidding Points :</span>
                        <ul id="previous_points">
                        	
                        </ul>
                        <div class="clear_all"></div>
                </div>
                <h4 style="display:none">The Bid History</h4>
                <table id="all_transactions" width="639px" cellspacing="0" cellpadding="0" border="1">
                    <tbody>
                     <tr class="highlite">
                    </tr> 
                    
                    <tr>
                    	<td  align="center" colspan="4">
                        		<table id="least_transactions"  width="600px" cellspacing="0" cellpadding="0" border="1" class="sub_table_auction">
                                <tbody >
                                </tbody>
                                </table>
                        </td>
                    </tr>
                     
                </tbody></table>
                </div><!--live_auction_detail_holder-->
                
                
        </div>
		<div class="clear_all"></div>
	</div>
	<!--content-wrapper -->
	</div>
	<!-- wrapper -->




	<div class=" video_play popup_pos" id="videopopup"
		style="display: none;">
		<div class="popup" id="videopopup">
			<h2 id="video_heading">Video Heading</h2>
			<div class="popup_close popup_close_act" onclick="badge_popup1()">x</div>
			<div class="video_link video_object_positioner">
				<!--  <object width="560" height="315">
                <param name="movie" value="http://www.youtube.com/v/sgdZuyx8B6k?version=3&amp;hl=en_US&amp;rel=0"></param>
                <param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>
                <param name="autoplay" value="true">
                <embed src="http://www.youtube.com/v/sgdZuyx8B6k?version=3&amp;hl=en_US&amp;rel=0" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed>
            
            </object>    -->

				<div id="videoDiv">Loading...</div>

			</div>
			<div id="video_description_holder">
			<p></p>
			</div>
		</div>
	</div>
	 
    <div id="auction_winner" class="popup_holder popup_pos" style="display:none;z-index: 999999;">
    
    	<h3 style="font-weight: bold;font-size: 25px;margin: 20px 0 0 130px;text-align: center;position: relative;top: 30px;"></h3>
   		<div class="picture_frame" style="height: 112px;width: 112px;margin-top: -30px;"><img src="" alt="" style="height: 87px;width: 87px;"/></div>
     	<span id="auction_winner_close" style="padding: 4px 15px;float: right;" class="grn_btn2">OK</span>
     
  	<div class="clear_all"></div>
  
	</div>
   
    
	
	<div id="backgroundPopup" style="display: none"></div>
	<!--  //bhadri videopopup ends  -->

	<div class="popup_holder popup_pos" style="display: none"
		id="new_badge_list">
		<div class="popup_close badge_popup_close" onclick="badge_popup()">X</div>
		<h3>New badges list</h3>
		<div class="new_badge_list">

			<ul>
				<li>
					<img src="images/badge-robot.png" alt="typing-test" title="This is a test"></img>
					<div class="badge-name toolTip"
						title="This badge was earned through tree hugging earth love power mixed with not bathing for more than a weeks time">Work
						Machine
					</div>
				</li>
				<li>
					<img src="images/badge-green.png" alt="typing-test" ></img>
					<div class="badge-name toolTip" title="Not much to say here">Hippie</div>
				</li>
				<li>
					<img src="images/badge-typing.png" alt="typing-test" ></img>
					<div class="badge-name toolTip" title="Not much to say here">TypingTest</div>
				</li>
				<li>
					<img src="images/badge-robot.png" alt="typing-test" ></img>
					<div class="badge-name toolTip" title="Not much to say here">Work Machine</div></li>
				<li>
					<img src="images/badge-green.png" alt="typing-test" ></img>
					<div class="badge-name toolTip" title="Not much to say here">Hippie</div>
				</li>
				<li>
					<img src="images/badge-typing.png" alt="typing-test" ></img>
					<div class="badge-name toolTip" title="Not much to say here">Typing Test</div>
				</li>
			</ul>
			<div class="clear_all"></div>
		</div>
		<!-- badges_list -->

		<div class="clear_all"></div>
	</div>

<!-- LoopTodo Feedback Form Code -->
<!-- <script id="looptodo_loop_embed_code" type="text/javascript" src="http://my.loopto.do/form/js/loop-embed-code.js?loopKey=agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M&domain=my.loopto.do">
</script>
<script type="text/javascript">
var looptodo_load_chain = window.onload;
window.onload = function() {
    looptodo_feedback_btn_init({ name : '<%=(String) session.getAttribute("userFirstName")+" "+(String) session.getAttribute("userLastName")%>', email : '<%=(String) session.getAttribute("userEmailid")%>', allowAnonymous: true, hideNameEmail: false });
    if(looptodo_load_chain) 
        looptodo_load_chain();
};
</script>  -->
<!-- End LoopTodo Feedback Form Code -->
<%@ include file="/jsp/feedbackLoopTodo.jsp" %>
		<script type="text/javascript">
		var googlePicture = '<%=(String)session.getAttribute("profileImageFirst")%>';
		</script>
		
		
		
		
		
		
		
<script src="../js/jquery.isotope.min.js"></script>
 <script>
  $(function(){
    
    var $container = $('#content_wrapper');
    
    
      // add randomish size classes
      $container.find('.element').each(function(){
        var $this = $(this),
            number = parseInt( $this.find('.number').text(), 10 );
        if ( number % 7 % 2 === 1 ) {
          $this.addClass('width2');
        }
        if ( number % 3 === 0 ) {
          $this.addClass('height2');
        }
      });
    
    $container.isotope({
      itemSelector : '.element',
      masonry : {
        columnWidth : 120
      },
      masonryHorizontal : {
        rowHeight: 120
      },
      cellsByRow : {
        columnWidth : 240,
        rowHeight : 240
      },
      cellsByColumn : {
        columnWidth : 240,
        rowHeight : 240
      }
    });
    
      // change size of clicked element
      $container.delegate( '.group', 'click', function(){
        $(this).toggleClass('large');
		$(this).siblings().removeClass('large');
        $container.isotope('reLayout');
      });

     


  });
</script>
</body>
</html>
