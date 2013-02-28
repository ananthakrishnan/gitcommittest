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
<%@page import="com.acti.jdo.UserProfile" 
		import="java.util.HashMap"
		import="com.acti.jdo.*"%>
<!DOCTYPE html>
<html>
  <head>
    <title>AdaptiveYou - CHALLENGES</title>
    <!-- Bootstrap -->
   <link href="/css/AY2.0/bootstrap.css" rel="stylesheet" media="screen">
    <link href="/css/AY2.0/style.css" rel="stylesheet" media="screen">
    <link href="/css/AY2.0/font-awesome.min.css" rel="stylesheet" media="screen">
    <script src="http://code.jquery.com/jquery-latest.js"></script>	
   	<script src="/js/AY2.0/popup.js"></script>
    <script type="text/javascript" src="/js/AY2.0/yt_embed.js"></script> 
   	<script src="/js/AY2.0/swfObject.js"></script>
	<script type="text/javascript" src="/js/AY2.0/player_and_events.js"></script> 
	
	<link rel="stylesheet" type="text/css" href="../css/AY2.0/yt_embed.css"></link>
	<style type="text/css">
    
    #video_popup_holder 
    {
	     border-radius: 10px 10px 10px 10px;
	    box-shadow: 0 0 10px 0 #303A4B;
	    color: #111111;
	    display: none;
	    min-width: 450px;
	    padding: 25px;
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
  String userProfile = (String)request.getAttribute("userProfileDetails");
  
	String badgesListMap = "{}";
	if(request.getAttribute("badgesListMap") != null)
	{
		badgesListMap = (String)request.getAttribute("badgesListMap");
	}
	
	String userBadgeLogJdoMap = "{}";
	if(request.getAttribute("userBadgelogJdoMap") != null)
	{
		userBadgeLogJdoMap = (String)request.getAttribute("userBadgelogJdoMap");
	}
	
	 String userStatusDetailsMap="{}";
	 if(request.getAttribute("userStatusDetails") != null)
	 {
		  userStatusDetailsMap = (String)request.getAttribute("userStatusDetails");
	 }
	 String singleUserProfile="{}"; 
		if(session.getAttribute("userProfileDetails")!=null)
		{ 
			singleUserProfile = (String)session.getAttribute("userProfileDetails");
		}
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
%>
<script type="text/javascript">
var userFirstName 			= '<%= firstName%>';
var userLastName 			= '<%= lastName%>';
var profilePicture			= "";
var oauthImage				= '<%= profileImage %>';
var userDetails   			= <%= userProfile%>;
var badgesListMap 			= <%= badgesListMap%>
var userBadgeLogJdoMap 		= <%= userBadgeLogJdoMap%>;
var userstatusdetails		= <%= userStatusDetailsMap %>;
var userProfileMap			= <%= userProfileMap%>;
var videodetailsMap			= <%= videoDetailsMap %>;
var bannerCompanyName 		= '<%= (String)session.getAttribute("companyName") %>';
var companyList 			= <%= companyDetails %>;
var userKey 				= '<%= (String)session.getAttribute("userKeyLogin") %>';
var singleUserProfile		= <%=singleUserProfile%>;
</script>
  </head>
  <body>
  
<%@ include file="/jsp/AY2.0/headerV2.jsp" %>           

    <div class="container main-content">
    <div class="row">
      <div class="span4 affix">
        <div class="sidebar-nav">
        
          <ul class="nav nav-pills nav-stacked">
            <h3>
              <i class="icon-certificate"></i> Challenges
            </h3>
            <li class="clearfix search-li">
            	<form class="navbar-search pull-left">
            	  <input id="search_for_badge" type="text" class="search-query" placeholder="Find a challenge ..." onkeyup="searchBadges()" onfocus="blank(this)" onblur="unblank(this)" >
            	</form>
            </li>
            
            <!-- <li class="active">
              <a href="#">
                Category Name
                <span class="pull-right label-default">12</span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Category Name
                  <span class="pull-right label-default">6</span>
                </span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Category Name
                  <span class="pull-right label-default">6</span>
                </span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Category Name
                  <span class="pull-right label-default">6</span>
                </span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Category Name
                  <span class="pull-right label-default">6</span>
                </span>
              </a>
            </li> -->
           </ul>

           
        </div>
        
      </div>
      
      <div class="span12 offset4">
        <h1>
          Active Category
        <p id="placeholder_text" style="display:none">test</p>
        <div style= "display:none"class="btn-group pull-right">
          <a class="btn active " href="#">
            <i class="icon-th"></i> Grid
          </a>
          <a class="btn" href="#">
            <i class="icon-list"></i> List
          </a>
        </div>
        </h1>
        </div>
        
        <div class="span12 offset4 badge-wrapper">
        <!-- <div id="populate_badges" class="row"> -->
         <div class="row" id="populate_badges"></div>
          <span id="badge_detail_holder" style="display:none">
        	<%@ include file="/jsp/AY2.0/me-badge-detail.jsp" %>
        </span> 
      </div>
    </div>
  </div>    
    
    <!-- Modal -->
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
        <h3 id="myModalLabel">My Account</h3>
      </div>
      <div class="modal-body">
		<form class="form-horizontal" action='' method="POST">
		  <fieldset>
		    <div id="legend">
		      <legend class="">Username</legend>
		    </div>
		    <div class="control-group">
		      <!-- Username -->
		      <label class="control-label"  for="username">Username</label>
		      <div class="controls">
		        <input type="text" disabled="disabled" id="username" name="username" placeholder="" class="input-xlarge" value="josh@fullcreative.com">
		      </div>
		    </div>
			 <div id="legend">
			   <legend class="">Reset Password</legend>
			 </div>
		    <div class="control-group">
		      <!-- Password-->
		      <label class="control-label" for="password">Password</label>
		      <div class="controls">
		        <input type="password" id="password" name="password" placeholder="" class="input-xlarge">
		      </div>
		    </div>
		    <div class="control-group">
		      <!-- Password-->
		      <label class="control-label" for="confirm-password">Confirm Password</label>
		      <div class="controls">
		        <input type="password" id="confirm-password" name="confirm-password" placeholder="" class="input-xlarge">
		      </div>
		    </div>
		    
		 
		  </fieldset>
		</form>      

		</div>
		<div id="video_popup_holder" class="video_popup_class">
             <div id="video_popup" >
<!--                  You need to install Flash player and enable JavaScript to view this video. -->
             </div>
         </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
    
    
    <script src="/js/AY2.0/bootstrap.min.js"></script>
    <script src="/js/AY2.0/earnBadges.js"></script>
    
  </body>
</html>