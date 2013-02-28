<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
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
    <title>AdaptiveYou - ME</title>
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
  String userProfile = (String)session.getAttribute("userProfileDetails");
  
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
	//BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
	
	String firstName = "";
	firstName = (String) session.getAttribute("userFirstName");
	String lastName = "";
	lastName = (String) session.getAttribute("userLastName"); //userImage
	String profileImage = "";
	profileImage = (String) session.getAttribute("userImage");
	String emailId = "";
	emailId = (String) session.getAttribute("userEmailid");
	String userKey = "";
	userKey = (String) session.getAttribute("userKeyLogin");
	
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
		//String requestURLFromFeedback 			=  request.getRequestURL().toString(); 
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
var singleUserProfile		= <%= userProfile%>;
var videodetailsMap			= <%= videoDetailsMap %>;
var bannerCompanyName 		= '<%= (String)session.getAttribute("companyName") %>';
var companyList 			= <%= companyDetails %>;
var auctionListMap			= <%= auctionListMap%>;
var userKey 				= '<%=userKey%>';

<%-- var requestURL 				= '<%= requestURLFromFeedback%>'; --%>
</script>
  <body>
  <div id="voice-box" style="display: none;">
		<p>
			<span id="statusMessage">Saving changes...</span>
		</p>
	</div>
  <%@ include file="/jsp/AY2.0/headerV2.jsp" %>        
<!--  End fixed navbar -->          <div class="container main-content">
    <div class="row">
      <div class="span4 affix">
        <div class="sidebar-nav">
        
          <ul class="nav nav-pills nav-stacked">
            <h3>
              <i class="icon-shopping-cart"></i> Store
            </h3>
            <li class="clearfix search-li">
            	<form class="navbar-search pull-left">
            	  <input type="text" class="search-query" placeholder="Find an item ...">
            	</form>
            </li>
            
            <li class="active">
              <a href="#">
                All
                <span class="label-default" style="margin-left:200px" id="itemscount">12</span>
              </a>
            </li>
           
                      </ul>

           
        </div>
        
      </div>
      
      <div class="span12 offset4">
        <h1>
          All Stuff        
	        <span class="pull-right" id="userspoints" >
	        	<i class="coin-large" ></i>12,400
	        </span>
        </h1>
        </div>
        
        <div class="span12 offset4">
        <div class="row">
                
           
            <div class="span12">
            	<table class="table everyone-table">
            	  <tbody id="storeItemsList">
            	    <tr class="person-listing">
            	      <td width="20%">
            	      	<img src="images/badge-android.png" class="store-photo" />
            	      </td>
            	      <td width="50%">
            	      	<h3>Adaptive You Mug</h3>
            	      	<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. </p>
            	      </td>
            	      <td width="30%" class="price-col">
            	      	<div class="price-well">
            	      	<h3 style="text-align: center;">
            	      		<i class="coin-small"></i> 100
            	      	</h3>
            	      	<a href="" style="text-align: center;" class="btn btn-green btn-large block">Buy It!</a>
            	      	<div class="clearfix"></div>
            	      	</div>
            	      </td>
            	    </tr>
            	    
            	    <tr class="person-listing">
            	      <td width="20%">
            	      	<img src="images/badge-android.png" class="store-photo" />
            	      </td>
            	      <td width="50%">
            	      	<h3>Adaptive You Mug</h3>
            	      	<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. </p>
            	      </td>
            	      <td width="30%" class="price-col">
            	      	<div class="price-well">
            	      	<h3 style="text-align: center;">
            	      		<i class="coin-small"></i> 2,000
            	      	</h3>
            	      	<a href="" style="text-align: center;" class="btn btn-green btn-large block">Buy It!</a>
            	      	<div class="clearfix"></div>
            	      	</div>
            	      </td>
            	    </tr>
            	    <tr class="person-listing">
            	      <td width="20%">
            	      	<img src="images/badge-android.png" class="store-photo" />
            	      </td>
            	      <td width="50%">
            	      	<h3>Adaptive You Mug</h3>
            	      	<p>Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. </p>
            	      </td>
            	      <td width="30%" class="price-col">
            	      	<div class="price-well">
            	      	<h3 style="text-align: center;">
            	      		<i class="coin-small"></i> 500
            	      	</h3>
            	      	<a href="" style="text-align: center;" class="btn btn-green btn-large block">Buy It!</a>
            	      	<div class="clearfix"></div>
            	      	</div>
            	      </td>
            	    </tr>
            	                	                  
            	  </tbody>
            	</table>  
            	
            
            </div>
            
          
                        
        <hr class="span12">
        <div class="span12">
          AdaptiveYou Copyright 2012
        </div>
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
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-primary">Save changes</button>
      </div>
    </div>
    
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="/js/AY2.0/bootstrap.min.js"></script>
     <script src="/js/AY2.0/aystore.js"></script>
  </body>
</html>