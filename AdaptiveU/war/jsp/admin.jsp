<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import ="java.util.LinkedHashMap"%>  
<%@page import = "com.google.gson.Gson"%> 
<%@page import = "com.google.gson.GsonBuilder"%> 
<%@page import = "com.acti.jdo.UserProfile"
import="java.util.HashMap"
import="org.apache.commons.collections.MultiHashMap"
import="org.apache.commons.collections.MultiMap"
import="java.util.*"
import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
import="com.google.appengine.api.blobstore.BlobstoreService"%> 
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="google" content="notranslate"/>
<title>AdaptiveYou - Issue Badge</title>

   	<link rel="stylesheet" type="text/css" href="css/reset.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <link rel="stylesheet" type="text/css" href="css/admin.css" />
    <link rel="stylesheet" type="text/css" href="css/help_popup.css" />
    <link rel="stylesheet" type="text/css" href="colortip-1.0/colortip-1.0-jquery.css"/>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
    <link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>

    <script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>	
    <script type="text/javascript" src="js/actions.js"></script>
    <script type="text/javascript" src="js/commonFunctions.js"></script>
    <script type="text/javascript" src="/adaptiveYouPages/admin.js"></script>
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
   
    <%
    HttpSession sessionLogin = request.getSession();
    if(session.getAttribute("userProfileDetails") == null)
    {
  	  response.sendRedirect("/");
  	}
	String userProfile="{}"; 
	if(session.getAttribute("userProfileDetails") != null)
		{ 
			userProfile = (String)session.getAttribute("userProfileDetails");
		}
	String userKey  = 	(String)session.getAttribute("userKeyLogin");
	String imageURL =	(String) session.getAttribute("imageURL");
	
	String emailId = "";
		emailId = (String) session.getAttribute("userEmailid");
	String firstName = "";
		firstName = (String) session.getAttribute("userFirstName");
	String lastName = "";
		lastName = (String) session.getAttribute("userLastName"); //userImage
	String profileImage = "";
		profileImage = (String) session.getAttribute("userImage");
	
			String badgesListMap = "{}";
			if(request.getAttribute("badgesListMap") != null)
				{
					badgesListMap = (String)request.getAttribute("badgesListMap");
				}
			String userProfileMap = "{}";
			if(request.getAttribute("userProfileMap") !=null)
			{
				userProfileMap = (String)request.getAttribute("userProfileMap");
			}
			
			String userBadgelogInfo = "{}";
		 	if(request.getAttribute("userBadgelogInfo") !=null)
			{
		 		userBadgelogInfo = (String)request.getAttribute("userBadgelogInfo");
			}
		 	System.out.println("user_badgeDetails ::"+userBadgelogInfo);
			String pendingReqCount = "{}";
			 if(session.getAttribute("pendingReqCount") != null)
			 {
					pendingReqCount = (String)session.getAttribute("pendingReqCount");
			 }
			 
			 String companyDetails = "{}";
				if(session.getAttribute("companyslist") != null)
				 {
				 	companyDetails=(String)session.getAttribute("companyslist");
				 }
			String userStatusDetails = "{}";
			if(request.getAttribute("userStatusDetails") != null)
			{
				userStatusDetails = (String)request.getAttribute("userStatusDetails");
			}
			String requestURLFromFeedback 			= (String) request.getRequestURL().toString(); 
	%>
<script type="text/javascript">
	var userFirstName 		= "";
	var userLastName		= "";
	var userKey 			= "";
	var pendingReq 			= '<%= pendingReqCount%>';
	var pendingReqObj 		= JSON.parse(pendingReq);	
	var userProfile   		= <%= userProfile%>;
   	var badgesListMap 		= <%= badgesListMap%>;
   	var userBadgelogMap 	= <%= userBadgelogInfo%>;
   	var userProfileMap 		= <%= userProfileMap%>;
   	var userStatusDetails	= <%=userStatusDetails%>;
   	var bannerCompanyName 	= '<%= (String)session.getAttribute("companyName") %>';
   	var companyList 		= <%= companyDetails %>;
   	var userEmail			= '<%= emailId%>';
   	var requestURL 			= '<%= requestURLFromFeedback%>';
   	
</script>
<script type="text/javascript" src="../js/feedback.js"></script>
</head>
<body onload="cache()" > <!-- onload="cache()" -->
<div id="voice-box" style="display: none;">
<p><span id="statusMessage">Saving changes...</span></p> 
</div>
<div class="wrapper">
		<div id="login_details">
				<ul class="right_nav_holder">
				<li class="welcome_username"></li>
				<li  onclick="showPopup('helpPopup')"> <a href="#"> Help </a> </li>
				<li id="account_menu"><a id="account_name" href="#"></a>
				<ul id="companyslist"></ul>
				</li>
				<li id="account_menu"><a href="#">My Account</a>
				<ul>
<!-- 				<li id="my_details" onclick="openwin();"><a href="#">My Details &raquo;<span>Username/password</span></a></li> -->
				<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a></li>
				</ul>
				</li>
				</ul>
		</div> <!-- login_details -->
    <div id="header" class="admin_header">
 				<div class="header_holder">
<%--  					<span id="company-name" style="cursor: default;"><%= (String)session.getAttribute("companyName") %></span> --%>
						<span id="company-name"><input type="text" value="<%=(String) session.getAttribute("companyName")%>" id="update_company_name"/></span>
<!--  					<div><input type="text" style="display: none;" class="company_name_style" name="edit_Company_Name" id="edit_Company_Name" /></div> -->
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
        	<li class="selected"><a href="/admin">Issue Badges</a></li>
        	<li><a id="pending_req_badge" href="/approveBadge">Approve Badge Request</a></li>
        	<li><a id="pending_req_stuff"  href="/allStuffDetails">Approve Stuff Request</a></li>
        </ul>
    	<div class="admin_right_pannel">
        	<h2>Issue Badge</h2>
        	<div class="issue_badge_content">
                <div class="content-col">
                    <div class="content-header">
                            <code class="search_icon"></code>
                            <input class="search_field" id="search_cus" type="text" name="" value="Find a person.."  onkeyup="searchCustomer()" onfocus="blank(this)" onblur="unblank(this)"/>
                            <div class="loading_list"><code></code></div>
                            <div class="search_list" >
                                <ul>
                                    <li>Kevin Payne</li>
                                    <li>Kevin Payne</li>
                                    <li>Kevin Payne</li>
        
                                </ul>    
                            </div>                        
                            <div class="clear_all"></div>
                    </div> <!-- content-header -->
                    <ul class="person_list person_list_scrl"  id="user_detailsUL">
                       
                     </ul>
                     <center>
	                    <div class="popup_holder_for_admin_page" id = "userWorking" style="display: none;">
	                    	<h2>People working on  <span id="assigingBadgeName"></span></h2>
		   						<ul id="usersWorkingOn">
		    					</ul>
	    					<div class="popup_close_for_admin_page" onclick="close_WorkingOn_Popup()">x</div>
	    				</div> 
    				</center> 
                <div class="clear_all"></div>    
                </div> <!-- content-col -->
                <div class="clear_mar content_col_scrl">
                    <div class="badges_list admin_badges">
                        <h2>Badges</h2>
                        <ul id="dbBadches" class="btList" style="overflow:auto;height:250px;">
                                 
                        </ul>
                    <div class="clear_all"></div>     
                    </div> <!-- badges_list -->
                    
                    <div class="trophy_list admin_trophies" class="btList">
                        <h2>Trophies</h2>
                        <ul id="dbTrophies" class="btList" style="overflow:auto;height:250px;">
                        
                        </ul>
                        <div class="clear_all">
                    </div> <!-- badges_list -->            
                <div class="clear_all"></div>
                </div> <!-- content-col -->
            </div><!--- issue_badge_cont --->
        </div> <!--- admin_right_pannel --->
    </div> <!--content-wrapper -->
    
     <%@ include file="/jsp/help_popup.jsp" %>
	<div id="backgroundPopup" style="z-index:99999"></div>
	<%@ include file="/jsp/feedbackLoopTodo.jsp" %>
</div> <!-- wrapper -->


<!-- LoopTodo Feedback Form Code  -->   
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
