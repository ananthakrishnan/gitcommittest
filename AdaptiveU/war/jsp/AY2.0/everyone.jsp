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
	
<html>
  <head>
    <title>AdaptiveYou - OTHERS</title>
    <!-- Bootstrap -->
    <link href="/css/AY2.0/bootstrap.css" rel="stylesheet" media="screen"></link>
    <link href="/css/AY2.0/style.css" rel="stylesheet" media="screen"></link>
    <link href="/css/AY2.0/font-awesome.min.css" rel="stylesheet" media="screen"></link>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
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
var requestURL 				= '<%= requestURLFromFeedback%>';
var singleUserProfile		=  <%= singleUserProfile%>;
</script> 		
  </head>
  <body>
  <%@ include file="/jsp/AY2.0/headerV2.jsp"%> 
          <div class="container main-content">
    <div class="row">
      <div class="span4 affix">
        <div id="groups" class="sidebar-nav">
        
          <ul class="nav nav-pills nav-stacked">
            <li class="list-header">
            	<h3>
              		<i class="icon-group"></i> Everyone
            	</h3>
            </li>
            <li class="clearfix search-li">
            	<form class="navbar-search pull-left">
            	  <input type="text" class="search-query" placeholder="Find a person ...">
            	</form>
            </li>
            <li class="active">
              <a href="#">
                All Groups
                <span class="pull-right label-default">212</span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Group Name
                  <span class="pull-right label-default">24</span>
                </span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Group Name
                  <span class="pull-right label-default">16</span>
                </span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                   Group Name
                  <span class="pull-right label-default">32</span>
                </span>
              </a>
            </li>
            <li class="">
              <a href="#">
                <span>
                  Group Name
                  <span class="pull-right label-default">50</span>
                </span>
              </a>
            </li>

            
           </ul>

           
        </div>
        
      </div>
      
      <div class="span12 offset4">
        <h1>
          All Groups    
	        <div class="btn-group pull-right">
	          <a class="btn dropdown-toggle" data-toggle="dropdown" >
	            Sort by: Points
	            <span class="caret"></span>
	          </a>
	          <ul class="dropdown-menu">
	            <li>
	            	<a id="sort_by_points">Points: High to Low</a>
	            	<a id="sort_by_name">Name: First, Last</a>
	            </li>
	          </ul>
	        </div>
        </h1>
        </div>
        
        <div class="span12 offset4">
        <div class="row">
        
        	
        
                
           <div class="span12">
  	            <table class="table everyone-table">
  	              <tbody id="others_list">
  	                <tr class="person-listing">
  	                  <td width="15%">
  	                  	<img src="https://lh5.googleusercontent.com/-zzq3EWBItj0/AAAAAAAAAAI/AAAAAAAAADY/SURmNBq6JHk/photo.jpg" class="user-photo" />
  	                  </td>
  	                  <td width="46%">
  	                  	<h3><a href="me.html">Joshua Iwata</a></h3>
  	                  	<ul class="user-stats">
  	                  		<li><i class="coin-small"></i> 12,000</li>
  	                  		<li><i class="icon-certificate"></i> 64 Badges</li>
  	                  	</ul>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/odQuNrnA2kL4x8QUjI-Dziu_TJM5pdska_49dnUcG63Af8R80AvI9bbBTcezP5_PrRqa_dRBX8NNBxEkRHLZoII0g3F3N4tHIrs" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/6I9KGl4Y46PQOyFGO-fCwumoripG8Q46y-0mg-af0X1-pNlIUGRQjWPcvlcQ70Xw2uZH_IsAbnRiZ3MCwff4CruwwK_epdOgHOQ" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh3.ggpht.com/RiyCeJMBEVmWSgTqcz8-aPtTIjI-fhTB-2_273AwkjBqSR-jACkioShyeReOKrJV1PTctQeb-v4G4mHSStAF5wyaSF3l6A7lZw" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                </tr>
  	                <tr class="person-listing">
  	                  <td width="15%">
  	                  	<img src="https://lh5.googleusercontent.com/-zzq3EWBItj0/AAAAAAAAAAI/AAAAAAAAADY/SURmNBq6JHk/photo.jpg" class="user-photo" />
  	                  </td>
  	                  <td width="46%">
  	                  	<h3><a href="me.html">Suganandan Speigel</a></h3>
  	                  	<ul class="user-stats">
  	                  		<li><i class="coin-small"></i> 12,000</li>
  	                  		<li><i class="icon-certificate"></i> 64 Badges</li>
  	                  	</ul>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/odQuNrnA2kL4x8QUjI-Dziu_TJM5pdska_49dnUcG63Af8R80AvI9bbBTcezP5_PrRqa_dRBX8NNBxEkRHLZoII0g3F3N4tHIrs" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/6I9KGl4Y46PQOyFGO-fCwumoripG8Q46y-0mg-af0X1-pNlIUGRQjWPcvlcQ70Xw2uZH_IsAbnRiZ3MCwff4CruwwK_epdOgHOQ" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh3.ggpht.com/RiyCeJMBEVmWSgTqcz8-aPtTIjI-fhTB-2_273AwkjBqSR-jACkioShyeReOKrJV1PTctQeb-v4G4mHSStAF5wyaSF3l6A7lZw" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                </tr>
  	                <tr class="person-listing">
  	                  <td width="15%">
  	                  	<img src="https://lh5.googleusercontent.com/-zzq3EWBItj0/AAAAAAAAAAI/AAAAAAAAADY/SURmNBq6JHk/photo.jpg" class="user-photo" />
  	                  </td>
  	                  <td width="46%">
  	                  	<h3><a href="me.html">Suganandan Speigel</a></h3>
  	                  	<ul class="user-stats">
  	                  		<li><i class="coin-small"></i> 12,000</li>
  	                  		<li><i class="icon-certificate"></i> 64 Badges</li>
  	                  	</ul>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/odQuNrnA2kL4x8QUjI-Dziu_TJM5pdska_49dnUcG63Af8R80AvI9bbBTcezP5_PrRqa_dRBX8NNBxEkRHLZoII0g3F3N4tHIrs" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/6I9KGl4Y46PQOyFGO-fCwumoripG8Q46y-0mg-af0X1-pNlIUGRQjWPcvlcQ70Xw2uZH_IsAbnRiZ3MCwff4CruwwK_epdOgHOQ" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh3.ggpht.com/RiyCeJMBEVmWSgTqcz8-aPtTIjI-fhTB-2_273AwkjBqSR-jACkioShyeReOKrJV1PTctQeb-v4G4mHSStAF5wyaSF3l6A7lZw" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                </tr>
  	                <tr class="person-listing">
  	                  <td width="15%">
  	                  	<img src="https://lh5.googleusercontent.com/-zzq3EWBItj0/AAAAAAAAAAI/AAAAAAAAADY/SURmNBq6JHk/photo.jpg" class="user-photo" />
  	                  </td>
  	                  <td width="46%">
  	                  	<h3><a href="me.html">Suganandan Speigel</a></h3>
  	                  	<ul class="user-stats">
  	                  		<li><i class="coin-small"></i> 12,000</li>
  	                  		<li><i class="icon-certificate"></i> 64 Badges</li>
  	                  	</ul>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/odQuNrnA2kL4x8QUjI-Dziu_TJM5pdska_49dnUcG63Af8R80AvI9bbBTcezP5_PrRqa_dRBX8NNBxEkRHLZoII0g3F3N4tHIrs" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh5.ggpht.com/6I9KGl4Y46PQOyFGO-fCwumoripG8Q46y-0mg-af0X1-pNlIUGRQjWPcvlcQ70Xw2uZH_IsAbnRiZ3MCwff4CruwwK_epdOgHOQ" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                  <td width="12%">
  	                  	<img src="http://lh3.ggpht.com/RiyCeJMBEVmWSgTqcz8-aPtTIjI-fhTB-2_273AwkjBqSR-jACkioShyeReOKrJV1PTctQeb-v4G4mHSStAF5wyaSF3l6A7lZw" class="pull-left" />
  	                  	<div class="label label-plain">Badge Name</div>
  	                  </td>
  	                </tr>
  	                
  	              </tbody>
  	            </table>  
                        
        <hr class="span9">
        <div class="span9">
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
		<form class="form-horizontal" action='' method="post">
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
    
    
    <script src="/js/AY2.0/bootstrap.min.js"></script>
    <script src="/js/AY2.0/othersV2.js"></script>
  </body>
</html>