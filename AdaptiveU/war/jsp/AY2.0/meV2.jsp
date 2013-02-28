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
</head>
<body>
  
<%@ include file="/jsp/AY2.0/headerV2.jsp" %> 

<!--  Start main content wrapper -->    
  <div class="container main-content">
    <div class="row">	
    
<!--  Start sidebar holder -->    
      <div class="span4 affix">
        <div class="sidebar-nav">
        	<div class="well">
        		<img src="https://lh5.googleusercontent.com/-zzq3EWBItj0/AAAAAAAAAAI/AAAAAAAAADY/SURmNBq6JHk/photo.jpg" class="user-photo"/>
	         	 <ul id="me_side_bar" class="nav nav-pills nav-stacked">
		            <li class="active side_bar_profile side_bar ">
		              <a href="#">
		                <i class="icon-user"></i> 
		                My Profile
		              </a>
		            </li>
		            <li class="side_bar_notification side_bar ">
		              <a href="#">
		                <span class="">
		                  <i class="icon-bell-alt"></i> Notifications
		                  <span style="display:none" class="badge badge-important pull-right">6</span>
		                </span>
		              </a>
		            </li>
		            <li style="display:none" class="side_bar ">
		              <a href="#">
		                <span>
		                	<i class="icon-lightbulb "></i>
		                 	 My Creations
		                  <span class="pull-right label-default">6</span>
		                </span>
		              </a>
		            </li>
		            <li class="settings side_bar ">
		              <a>
		                <span>
		                	<i class="icon-cog "></i>
		                 	 Settings
		                </span>
		              </a>
		            </li>
	              </ul>
        	  </div><!-- End well --> 
           </div><!-- End sidebar-nav --> 
        </div><!-- End span4 affix --> 
<!--  End sidebar holder -->          
      
<!--  Start main content area -->        
		<div class="span12 offset4">
	        <h1 id="user_name">
	           Joshua Iwata
	           <span class="pull-right">
	           	<i class="coin-large"></i>12,400
	           </span>
	        </h1>
        </div>  
        <hr class="span12 offset4">  
        
<!--  Start badge thumbs wrapper  -->          
        <div class="span12 offset4 badge-wrapper me-bw">
         <div class="row" id="build_workingon_badges"></div>
        <span id="badge_detail_holder" style="display:none">
        <%@ include file="/jsp/AY2.0/me-badge-detail.jsp" %>
        </span> 
        <span id="settings_holder" style="display:none">
        <%@ include file="/jsp/AY2.0/me-settings.jsp" %>
        </span> 
       <span id="notifications_holder" style="display:none">
        <%@ include file="/jsp/AY2.0/notifications.jsp" %>
        </span>
        
<!--  Start sub head and toggle "working/completed" buttons   
        	<div class="span12 challanges_div" >
        		<h3 class="no-top-mar"> Challenges 
        		
        			<div class="btn-group pull-right" id="switch_workingon_completed">
        				<button id="working_on_badges" class="btn active"><i class="icon-refresh"></i> Working On</button>
        				<button id="completed_badges" class="btn"><i class="icon-ok"></i> Completed</button>
        			</div>
        		</h3>
        		<span class="divider">&nbsp;</span>
        	</div>
 <!--  End sub head and toggle "working/completed" buttons  -->     
           
<!--  Start badge thumb 
           <div class="span3 badge-thumb-wrap">
              <div class="well">
                Badge menu
              	<div class="dropdown badge-menu"> 
              	  <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >
              	  	<i class="dropdown-toggle icon-align-justify"></i>
              	  </a>
              	  <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
	              	   <li><a href="me-badge-detail.jsp">View Details</a></li>
	              	   <li><a href="#">Stop Working on this Badge</a></li>
	              	   <li class="divider"></li>
	              	   <li><a href="#">Share Badge...</a></li>
              	  </ul>
              	</div>End badge menu 
              	
              	Badge image, title and progress bar
              	<div class="badge-img">
	              	<a href="#" role="button">
	  	            	<img src="http://lh5.ggpht.com/LR_rwmbUxke92D6-18jNU6283So3xT0q7Q_g5cXwydY42H0WQiOqPIbl1UXghcIItyJFlhNDd1qMQUm15-_pxU4K6E-tG4vczA" />
	  	            </a>
  	            </div>
                <h4>
                  Google Plus
                </h4>
                <div class="progress">
                  <div class="bar bar-danger" style="width: 10%;"></div>
                </div>
                
              </div>End well
            </div>End badge thumb

 Start badge thumb 
          <div class="span3 badge-thumb-wrap">
             <div class="well">
             	<div class="dropdown badge-menu">
             	  <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >
             	  	<i class="dropdown-toggle icon-align-justify"></i>
             	  </a>
             	  <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                 	   <li><a href="#">View Details</a></li>
                 	   <li><a href="#">Stop Working on this Badge</a></li>
                 	   <li class="divider"></li>
                 	   <li><a href="#">Share Badge...</a></li>
             	  </ul>
             	</div>
             	<div class="badge-img">
                 	<a href="#" role="button">
                     	<img src="http://lh5.ggpht.com/rqSHAgaZ2fGTGMQJPzClGONenUjAWs1sbGOJRFLvqQRgM_fuKX7Ha1MjTjnNSiEL-uypBN9-IdB19bYnNwDbSVBrhFD0Q4Q7Sw" />
                     </a>
                 </div>
               	 <h4>
                 		AnswerConnect
           		 </h4>
                 <div class="progress">
             		<div class="bar bar-success" style="width: 90%;"></div>
            	 </div>
              </div>End well
             </div>End badge thumb

 Start badge thumb 
              <div class="span3 badge-thumb-wrap">
                 <div class="well">
                 <div class="dropdown badge-menu">
                   <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >
                   	<i class="dropdown-toggle icon-align-justify"></i>
                   </a>
              	  <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                 	   <li><a href="#">View Details</a></li>
                 	   <li><a href="#">Stop Working on this Badge</a></li>
                   </ul>
                 </div>
             		<div class="badge-img">
                 		<img src="http://lh5.ggpht.com/wIYPaTjUUKAD3be-zoBnwGeaFTRupcyNne083IaakkGNtZBLmwlLtMpf1V1ZkpPdSl8vzmTEmDxnq6dT1crF11Isbisu0LFW2g" />
                 </div>
                   <h4>
                     Eco Friendly Ideas
                   </h4>
             			<div class="progress">
             			  <div class="bar bar-warning" style="width: 60%;"></div>
             			</div>
             			
              		</div>End well
            	</div>End badge thumb

 Start badge thumb 
               <div class="span3 badge-thumb-wrap">
                   <div class="well">
                   <div class="dropdown badge-menu">
                     <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >
                     	<i class="dropdown-toggle icon-align-justify"></i>
                     </a>
              	 	 <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                   	   <li><a href="#">View Details</a></li>
                   	   <li><a href="#">Stop Working on this Badge</a></li>
                     </ul>
                   </div>
               		<div class="badge-img">
                   		<img src="http://lh6.ggpht.com/mPRO1orECmXF8KUorC89_jtznbcF81AZjfiImgPeGZzqYvpBUUo7jnGJ_y9ll1X1C8sUNWkSJbqB2-epU97dDfoQHlH6B30_RQ" />
                   </div>
                     <h4>
                       Firefox
                     </h4>
               			<div class="progress">
               			  <div class="bar bar-warning" style="width: 60%;"></div>
               			</div>
              		</div>End well
            	</div>End badge thumb

 Start badge thumb 
                 <div class="span3 badge-thumb-wrap">
                     <div class="well">
                     <div class="dropdown badge-menu">
                       <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >
                       	<i class="dropdown-toggle icon-align-justify"></i>
                       </a>
              	 		<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                     	   <li><a href="#">View Details</a></li>
                     	   <li><a href="#">Stop Working on this Badge</a></li>
                       </ul>
                     </div>
                 		<div class="badge-img">
                     		<img src="img/SetMore-Badge.png" />
                     </div>
                       <h4>
                         Badge Name
                       </h4>
                 			<div class="progress">
                 			  <div class="bar bar-success" style="width: 90%;"></div>
                 			</div>
                     </div>
                   </div>
                   <div class="span3 badge-thumb-wrap">
                       <div class="well">
                       <div class="dropdown badge-menu">
                         <a class="btn btn-default" data-toggle="dropdown" href="#" type="button" >
                         	<i class="dropdown-toggle icon-align-justify"></i>
                         </a>
              	  		 <ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dLabel">
                       	   <li><a href="#">View Details</a></li>
                       	   <li><a href="#">Stop Working on this Badge</a></li>
                         </ul>
                       </div>
                   		<div class="badge-img">
                       		<img src="img/SetMore-Badge.png" />
                       </div>
                         <h4>
                           Badge Name
                         </h4>
                   			<div class="progress">
                   			  <div class="bar bar-warning" style="width: 60%;"></div>
                   			</div>
             	 		</div>End well
            		</div>End badge thumb -->
	
<!--  End badge thumb wrapper  
                                                              
        <hr class="span12">
        <div class="span12">
          AdaptiveYou Copyright 2012
        </div>
      </div>
      
    </div>
  </div>    
    
<!-- My Account Modal -->

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
	        <input type="text" disabled="disabled" id="username" name="username" placeholder="" class="input-xlarge" value="">
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
    <button class="btn btn-green">Save changes</button>
  </div>
</div>
    
    
    <!-- <script id="billTemplate" type="text/template">

	</script> -->
    
    
    
    <script src="/js/AY2.0/bootstrap.min.js"></script>
    <!-- <script src="/js/AY2.0/less-1.3.3.min.js"></script> -->
    <script src="/js/AY2.0/meV2.js"></script>
    
  </body>
</html>