
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
<title>AdaptiveYou - Others</title>

<link rel="stylesheet" type="text/css" href="css/reset.css" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" href="css/others.css" />
<link rel="stylesheet" type="text/css" href="css/inline_others.css" />
<link rel="stylesheet" type="text/css" href="colortip-1.0/colortip-1.0-jquery.css"/>
<link rel="stylesheet" type="text/css" href="../css/tipTip.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/single.css" /> 


<script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js/commonFunctions.js"></script>
<script type="text/javascript" src="colortip-1.0/colortip-1.0-jquery.js"></script>
<script type="text/javascript" src="/adaptiveYouPages/others.js?1810"></script>

<script type="text/javascript" src="../js/tipTip.js"></script> 
<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>

<script type="text/javascript" >
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
  if(session.getAttribute("userProfileDetails")==null)
  	{
	  response.sendRedirect("/");
    }
	String singleUserProfile="{}"; 
	if(session.getAttribute("userProfileDetails")!=null)
	{ 
		singleUserProfile = (String)session.getAttribute("userProfileDetails");
	}
	
	String userKey  = (String)session.getAttribute("userKeyLogin");
	String imageURL =(String) session.getAttribute("imageURL");
	String emailId = "";
	emailId = (String) session.getAttribute("userEmailid");
	String firstName = "";
	firstName = (String) session.getAttribute("userFirstName");
	String lastName = "";
	lastName = (String) session.getAttribute("userLastName"); //userImage
	String profileImage = "";
	profileImage = (String) session.getAttribute("userImage");
	
	BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
	String userbadges = (String)request.getAttribute("badges_list");
	
	String userProfileMap = "{}";
	if(request.getAttribute("userProfileMap") !=null)
	{ 
		userProfileMap = (String)request.getAttribute("userProfileMap");
	}
			
			String userBadgelogJdoMap = "{}";
		 	if(request.getAttribute("userBadgelogJdoMap") !=null)
			{
		 		userBadgelogJdoMap = (String)request.getAttribute("userBadgelogJdoMap");
			 }
			
		 	String logoDetails = "{}";
		 	if(request.getAttribute("badgesLogo") !=null)
			{
		 		logoDetails = (String)request.getAttribute("badgesLogo");
			}
		 	
		 	String TrophyLogoDetails = "{}";
		 	if(request.getAttribute("trophyLogo") !=null)
			{
		 		TrophyLogoDetails = (String)request.getAttribute("trophyLogo");
			}
		 	String teamManageUsers = "{}";
		 	if(request.getAttribute("teamMemInfoUser") !=null)
			{
		 		teamManageUsers = (String)request.getAttribute("teamMemInfoUser");
			}
		 	
		 	 String vidlist = "{}";
			 if(request.getAttribute("video_list") != null)
			 {
				 vidlist = (String)request.getAttribute("video_list");
			 }
			 
			String companyDetails = "{}";
			if(session.getAttribute("companyslist") != null)
			{
				 companyDetails=(String)session.getAttribute("companyslist");
			}
			String requestURLFromFeedback 			=  request.getRequestURL().toString();  
	%>
	
	
<script type="text/javascript">
var userFirstName 			= 	'<%= firstName%>';
var userLastName 			= 	'<%= lastName%>';

var userEmail 				= 	'<%= emailId%>';
var userKey 				= 	'<%= userKey%>';
var singleUserProfile 		= 	<%= singleUserProfile%>;
var badgeDetails 			= 	<%= userbadges%>;
var userBadgeLogJdoMap 		= 	<%= userBadgelogJdoMap%>;
var userLogoDetails 		= 	<%= logoDetails%>;
var userTrophyLogoDetails 	= 	<%= TrophyLogoDetails%>;
var teamManageUser 			= 	<%= teamManageUsers%>;
var videodetails			=	<%= vidlist %>;
var companyList 			= 	<%= companyDetails %>;
var userProfileMap 			= 	<%= userProfileMap%>;
var bannerCompanyName 		=   '<%= (String)session.getAttribute("companyName") %>';
var requestURL = '<%= requestURLFromFeedback%>';
</script> 	
<script type="text/javascript" src="../js/feedback.js"></script>
</head>
<body onload="cache()">
<div id="voice-box" style="display: none;">
<p><span id="statusMessage">Saving changes...</span></p> 
</div>
<div class="wrapper">
		<div id="login_details">
				<ul class="right_nav_holder">
				<li class="welcome_username"></li>
				<li id="account_menu"><a id="account_name" href="#"></a>
				<ul id="companyslist">
				</ul>
				</li>
				<li id="account_menu"><a href="#">My Account</a>
				<ul>
				<li id="my_details" onclick="openwin();"></li>
				<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a></li>
				</ul></li>
				</ul>
		</div> <!-- login_details -->
    <div id="header" class="admin_header">
 				<div class="header_holder">
 					<div id="company-name"><%= (String)session.getAttribute("companyName") %></div>
 					<div id="header_nav_holder">
                            <div class="tab_nav_holder">
                                <ul class="nav_list" style="right:3px;">
                                   <li class="adminpanel"><a href="/admin">Admin</a></li>
                                    <li class="selected"><a href="#">Others</a></li>
                                    <li><a href="/persistUser">Me</a></li>
                                 </ul>
                             <div class="clear_all"></div>
                            </div> <!-- tab_nav_holder -->  
               </div>  <!-- header_nav_holder -->                           
            </div>  <!-- header_holder -->
    </div> <!-- header -->
    
    <div id="listing" class="content-wrapper">
    	<div class="content-header">
        	<input class="search_field" style="margin-left:8px;" id="search_cus" type="text" name="" value="Find a person..."  onkeyup="searchCustomer()" onfocus="blank(this)" onblur="unblank(this)"/>
        	
        	<select id="teamNameSearch" class="search_team" style="margin-left:45px;" onchange="displayTeamMembs(this)">
  			</select>
<!-- pradeep search scenerio starts here -->
  			<select id="additionalSeachOptions" class="search_team" style="margin:10px 0px 0px 0px" >
  			<option id="SearchOptions" value="options">Sort Options</option>
  			<option id="sortByPoints" value="points" class="search_points" >By Points</option>
  			<option id="sortByName" value="name" class="search_points" >By Name</option>
  			</select>
<!-- pradeep search scenerio ends here -->
        <div class="clear_all"></div>
        </div> <!-- content-header -->
        
    	<!-- <div class="content-col full-width">
              <ul class="person_list" id="user_detailsUL">
            </ul>
        <div class="clear_all"></div>    
        </div> --> <!-- content-col -->
      
<!-- Changes for new design -->
<div class="userlist">
	
</div>
      
      <!-- Changes ends here -->
      
          <div class="clear_all"></div>    
    </div> <!--content-wrapper -->
</div> <!-- wrapper -->
<div class="wrapper" id="profile_panel" style="display:none">
    <div id="profile_panel" class="content-wrapper single-wrapper">
    <span id="backothers" style="display:none" class="header_link" onclick="showOthers()">
    <a  href="#" onclick="showOthers()">Back To Others</a>
    </span>
		<div class="picture">
        	<div class="picture_frame">
            	<img id="profileImage" src="" />
            </div>
        </div>
        <div class="badge_detial_col">
        	<ul class="user_info">
            	<li>
                	<div class="person_name">
                        <h3 class="user_person_name">Kevin</h3>
                    </div>
                    <div class="points_wrapper my_points">
                        <ul class="totals">
                        	<li class="badge_total"><span class="badgeDB_total">0</span> Badges</li>
                        	<li class="trophy_total"><span class="trophyDB_total">0</span> Trophies</li>
                        </ul>	
                        <div id ="total" class="total">
                        	0
                        </div>
                    </div>	
                <div class="clear_all"></div>
                </li>
            </ul>    
            
            <div class="badges_list">
            	<h2 class="user_person_name_badges">Kevin's Badges</h2>
                <ul id="total_badges" >
					 
                </ul>
            <div class="clear_all"></div> 
            
           
            </div> <!-- badges_list -->
            
			<div class="badges_list">
            	<h2 class="user_person_name_trophies">Kevin's Trophies</h2>
                <ul id="total_trophies">
   
                </ul>
            <div class="clear_all"></div>     
            </div> <!-- badges_list --> 
            
            
			<div class="badges_list">
            	<h2 class="user_person_name_stuff">Kevin's Stuff</h2>
                <ul id="total_stuff">
   
                </ul>
            <div class="clear_all"></div>     
            </div> <!-- badges_list --> 
                       
        </div> <!-- badge_detail_col -->
    <div class="clear_all"></div>    
    </div> <!--content-wrapper -->
</div>
<div class="popup_holder popup_pos badge_detail_act" id="badgepopup" style="display:none;position: fixed;">
	 <div class="popup" id="badgepopup">
		<div class="popup_close" onclick="badge_popup()">X</div>
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
                    	<img class="briefBadgeImage" title="" alt="" src="" style="height: 87px; width: 87px;"/>
                        <!--<code class="badge_icon"></code>-->
                    </div>
                	<div class="person_name" id="briefBadgeName">
                        <h3>Setmore Basic Certification</h3>
                        <h4>50 points for this badge</h4>
                    </div>
                    <div class="clear_all"></div>
                </li>
            </ul>    
     <div class="badges_list" style="width:580px;border:1px solid #DFDFDF">
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
                              <div class="mem_of_badge person_name"></div>
              <div class="clear_all"></div>
                </div> <!-- badges_list -->     
            <div class="clear_all"></div>       
        </div>  
        </div> <!-- badge_detail_col -->
       <div class="clear_all"></div> 
</div>
</div>
<div id="backgroundPopup" style="z-index:999"></div>
<%@ include file="/jsp/feedbackLoopTodo.jsp" %>
<!-- LoopTodo Feedback Form Code -->
<!-- LoopTodo Feedback Form Code -->
<%-- <script id="looptodo_loop_embed_code" type="text/javascript" src="http://my.loopto.do/form/js/loop-embed-code.js?loopKey=agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M&domain=my.loopto.do">
</script>
<script type="text/javascript">
var looptodo_load_chain = window.onload;
window.onload = function() {
	looptodo_feedback_btn_init({ name : '<%=(String) session.getAttribute("userFirstName")+" "+(String) session.getAttribute("userLastName")%>', email : '<%=(String) session.getAttribute("userEmailid")%>', allowAnonymous: true, hideNameEmail: false });
    if(looptodo_load_chain) 
        looptodo_load_chain();
};
</script> --%>
<!-- End LoopTodo Feedback Form Code --> 

</body>
</html>
