<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.LinkedHashMap"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.google.gson.GsonBuilder"%>
<%@page import="com.acti.jdo.*" import="java.util.HashMap"
	import="org.apache.commons.collections.MultiHashMap"
	import="org.apache.commons.collections.MultiMap" import="java.util.*"
	import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
	import="com.google.appengine.api.blobstore.BlobstoreService"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - Add Stuff</title>
<link rel="stylesheet" type="text/css" href="../css/reset.css" />
<link rel="stylesheet" type="text/css" href="../css/style.css" />
<link rel="stylesheet" type="text/css" href="../css/admin.css" />
<link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" />
<link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css"></link>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>


<script type="text/javascript" src="js1/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="js1/actions.js"></script>
<script type="text/javascript" src="../js/ajaxfileupload.js"></script>
<script type="text/javascript" src="js1/nicEdit.js"></script>
<script type="text/javascript" src="js/tooltip.js"></script>
<script type="text/javascript" src="../js/commonFunctions.js"></script>
<script src="js1/jquery.Jcrop.min.js"></script>
<script type="text/javascript" src="../adaptiveYouPages/addnewstuff.js"></script>

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
	    if(session.getAttribute("userProfileDetails") == null)
	    {
	    	  response.sendRedirect("/");
	    }
	  
	    String userProfile								= "{}";
	    if(session.getAttribute("userProfileDetails")!=null)
	    { 
			 userProfile 								= (String)session.getAttribute("userProfileDetails");
	    }
	    
	    String userKey  								= (String)session.getAttribute("userKeyLogin");
	    
	   	String badgeslist 								= "{}";
	  	if(request.getAttribute("badgesListMap") != null)
	  	{
	  		 badgeslist 								= (String)request.getAttribute("badgesListMap");
	  	}
	  	
		String pendingReqCount 							= "{}";
		if(session.getAttribute("pendingReqCount") != null)
		{
			pendingReqCount 							= (String)session.getAttribute("pendingReqCount");
	 	}
		String auctionListInfo 							= "{}";
		if(request.getAttribute("auctionListInfo") != null)
		{
		   auctionListInfo 								= (String)request.getAttribute("auctionListInfo");
		}
		 
	   	BlobstoreService blobstoreService 				= BlobstoreServiceFactory.getBlobstoreService();
	    String emailId 									= (String) session.getAttribute("userEmailid");
		String firstName 								= (String) session.getAttribute("userFirstName");
		String lastName 								= (String) session.getAttribute("userLastName");
		String profileImage 							= (String) session.getAttribute("userImage");
		String companyId 								= (String)session.getAttribute("companyId");
		
		String companyDetails 							= "{}";
		if(session.getAttribute("companyslist") != null)
		{
		 	companyDetails								= (String)session.getAttribute("companyslist");
		}
		String requestURLFromFeedback 					=  request.getRequestURL().toString(); 
	%>
    
     var userFirstName 				= "";
	 var userLastName 				= "";
	 var userName 					= "";
	 var libImageUrlSelected 		= "";
	 
	 var auctionListInfo   			= <%= auctionListInfo%>;
	 var companyId     				= '<%= companyId%>';
	 var badgesListMap				= <%= badgeslist%>;
	 var pendingReq 				= '<%= pendingReqCount%>';
	 var pendingReqObj 				= JSON.parse(pendingReq);	
	 var userDetailsMap  			= <%= userProfile%>;
	 var userKey 					= '<%=userKey%>';
	 var companyList 				= <%= companyDetails %>;
	 var bannerCompanyName 			= '<%= (String)session.getAttribute("companyName") %>';
	 var uploadBadgeImageUrl		= '<%=blobstoreService.createUploadUrl("/uploadBadgeLogo.do?")%>';
	 var requestURL 				= '<%= requestURLFromFeedback%>';
	 
	 var jcrop_api={destroy:function(){}},boundx, boundy,x1=0,x2=0,y1=0,y2=0;
	 var height=0,width=0;
	 var croppedWidth=0,croppedHeight=0;
	 
	</script>
	 <script type="text/javascript" src="../js/feedback.js"></script>	
</head>
<body onload="cache()">
	<div id="voice-box" style="display: none;">
		<p>
			<span id="statusMessage">Saving changes...</span>
		</p>
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
		</div>
		<!-- login_details -->
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
					</div>
					<!-- tab_nav_holder -->
				</div>
				<!-- header_nav_holder -->
			</div>
			<!-- header_holder -->
		</div>
		<!-- header -->

		<div id="admin_panel" class="admin-content-wrapper">
			<ul class="admin_left_panel">
				<li><a href="/displayAllTransactions">User History</a></li>
				<li><a href="/addNewBadge">Manage Badges</a></li>
				<li class="selected"><a href="/addstuff">Manage Store</a></li>
				<li><a href="/manageTeam">Manage Teams / Groups</a></li>
				<li><a href="/admin">Issue Badges</a></li>
				<li><a id="pending_req_badge" href="/approveBadge">Approve
						Badge Request</a></li>
				<li><a id="pending_req_stuff" href="/allStuffDetails">Approve
						Stuff from Store</a></li>
			</ul>
			<div class="admin_right_pannel ">
				<div class="new_badge_holder ">
					<h2>
						Add Stuff to Store <input type="submit" value="Add Stuff"
							class="grn_btn add_stuff_act" />
					</h2>
					<ul class="get_stuff" id="add_product">
						<!--   <li class="badges_list">
                        	<div class="col1"><img src="images/day_off_img.png" width="107" height="108" />
                            <b>500</b>
                            </div>
                            <div class="col2">
                                <h4>Day off</h4>
                                <p>Get a free lunch of your choice on Adaptavant. Pick from KFC, McDonalds, The Copper Whatever or any other eatery that will not give you a stomach ache.</p>
                            </div>col2

                            <div class="clear_all"></div>
                            <div class="on_over">
                            	<ol>
                                	<li class="edit_product add_stuff_act"></li>
                                    <li class="del_product del_act"></li>
                                    <li class="show_product show_product_act"></li>
                                </ol>

                            </div>
                        </li>   -->

					</ul>
					<div class="clear_all"></div>

					<div class="badge_detial_col">
						<div class="popup_holder add_stuff_popup" style="display: none">
							<h2>Add Stuff to Store</h2>
							<div class="popup_close popup_close_act">x</div>
							<ul class="user_info">
								<li>
								  <span style="overflow: hidden;height: 80px;width: 80px;" >
                                    <code class="badge_icon"></code>
                                    <img id="badge_image" src="" height=80px; width=80px;></img>
                                </span>
									<div class="input_holder">
										<div class="upload_profile">
											<span class="file-wrapper"> 
												<input name="badgeLogo" id="imageLogoPath" class="badgeImage" type="file"onchange="addBadge(this)" /> 
												<span id="select_badge" class="button">
												<input id="select_badge" type="radio" checked="checked" />Browse Images</span>
											</span>
										</div>
										<!--upload_profile-->
										<div class="clear_all"></div>
										<div class="dont_show_library">
										<h3>(or)</h3>
										<label class="ppup_stuff_library_act"><input type="radio"
											name="btn" class="radio_chc" />&nbsp;Choose from library</label>
									</div>
									</div>
									<div class="input_holder ml20">
										<input type="text" value="" class="long tooltipB"
											id="badge_name" title="Badge Name" />  
											<input type="text" value="" id="badge_points" class="tooltipB" style="width:32px !important" title="Points" onkeypress="return isNumberKey(event)"/>
											<input type = "text" id="maximum_quantity" class="tooltipB" title="Maximum Quantity" style="width:32px !important" onkeypress="return isNumberKey(event)"/>
											<input type = "text" id="maximum_hours" class="tooltipB" title="Max Hours" style="display:none;width:32px !important" onkeypress="return isNumberKey(event)"/>
										 <label style="margin-left:60%" ><input type="radio"   class="ml20 stuff_act" id="item_cat" name="cat" value="item"  checked="checked" />&nbsp;Stuff</label>
										 <label style="margin-left:68%"><input type="radio"  class="ml20 library_act" id="auction_cat" name="cat" value="auctionstuff"/>&nbsp;Auction Item</label> 
                                    	<label style="margin-left:84%"  class="dont_show_library"><input  type="radio" class="ml20 library_act" id="library_cat" name="cat" value="stufflibrary"/>&nbsp;Library</label>
	                                    
									</div>
<!-- 									<label style="float: right;margin-right:9px;margin-top:14px;"><input type="checkbox" id="unlimited_stuff_enable" name="cat" value="unlimited_this"/>&nbsp;Unlimited Quantity</label> -->
									<div class="clear_all"></div></li>
							</ul>
							<div class="message_holder">
								<textarea id="email_content" title="Some Initial Content"
									class="tooltipB">
                                Some Initial Content was in this textarea
                            </textarea>
                            
								<div class="btn_holder">
									<input type="submit" value="Save" class="grn_btn addNewStuffButton"/> <span>or <u class="popup_cancel_act">Cancel</u>
									</span>
									<div class="clear_all"></div>
								</div>
								<!-- btn_holder -->
								
								<div class="clear_all"></div>
							</div>
							<!-- badges_list -->
							<div class="clear_all"></div>
						</div>
						<!-- badge_detail_col -->
						<div class="clear_all"></div>
					</div>
				</div>
				<!---new_badge_holder--->
			</div>
		</div>
		<!--content-wrapper -->
		<div id="backgroundPopup" style="z-index:99999"></div>
	<%@ include file="/jsp/feedbackLoopTodo.jsp" %>
	</div>
	<!-- wrapper -->
	
	<div id="backgroundPopup" style="z-index:99999"></div>
	<%@ include file="/jsp/feedbackLoopTodo.jsp" %>
	<div class="popup popup_holder badge_library popup_pos">
			<h2>Stuff Library</h2>
			<div class="popup_close add_vlink_cancel_act">x</div>
			<div class="badges_list">
				<ul id="lib_stuffs">
				</ul>
				<div class="clear_all"></div>
			</div>
		</div>
		<!-- popup -->
	<!-- popup_holder -->
	
	
	<div class="popup_holder remove_auction confirm_box">
		<p>Do you really want to remove?</p>
		<div class="btn_holder">
			<input type="submit" value="Yes" class="grn_btn delete_auction" /> <span>or
				<u class="cancel_act">Cancel</u>
			</span>
			<div class="clear_all"></div>
		</div>
		<!-- btn_holder -->
	</div>
	
	<center>
		<div id="badge_image_cropper" class="popup" style="display: none;">
		<div><img src="" id="badge_image_sample"/></div>
		<center><input type="button" class="grn_btn" style="margin-top: 16px;padding: 5px;width: 90px;" id="badge_image_cropper_act" value = "Select" /></center>
		<div id="image_crop_close_act" style="color: #999999;float: right;margin-top: 6px;cursor: pointer;" onmouseover="$(this).css('color','#0079B6');" onmouseout="$(this).css('color','#999999');">click here to skip...</div>
		</div>
	</center>
	
	<!-- <div id="backgroundPopup"></div> -->
	

<%-- <script id="looptodo_loop_embed_code" type="text/javascript" src="http://my.loopto.do/form/js/loop-embed-code.js?loopKey=agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M&domain=my.loopto.do">
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
