<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import ="java.util.LinkedHashMap"%>  
<%@page import = "com.google.gson.Gson"%> 
<%@page import = "com.google.gson.GsonBuilder"%> 
<%@page import = "com.acti.jdo.*"
import="java.util.HashMap"
import="org.apache.commons.collections.MultiHashMap"
import="org.apache.commons.collections.MultiMap"
import="java.util.*"
import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
	import="com.google.appengine.api.blobstore.BlobstoreService"%> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Adaptive You - Add New Badge</title>

   	<link rel="stylesheet" type="text/css" href="../css/reset.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <link rel="stylesheet" type="text/css" href="../css/admin.css" />
     <!-- 	<link rel="stylesheet" type="text/css" href="../css1/reset.css" />
    <link rel="stylesheet" type="text/css" href="../css1/style.css" />
    <link rel="stylesheet" type="text/css" href="../css1/admin.css" /> -->
    <link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" />
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="css/jquery.Jcrop.css" type="text/css"></link>
     <link rel="stylesheet" type="text/css" href="../css/tipTip.css" ></link>

    <script type="text/javascript" src="../js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="../js/ajaxfileupload.js"></script>
    <script type="text/javascript" src="../js/actions.js"></script>
    <script type="text/javascript" src="../js/commonFunctions.js"></script>
    <script type="text/javascript" src="../js1/nicEdit.js"></script>
	<script type="text/javascript" src="../js1/actions1.js"></script>
	<script type="text/javascript" src="../js/jquery-ui.js"></script>
	<script type="text/javascript" src="../js/tooltip.js"></script> 
	<script src="js1/jquery.Jcrop.min.js"></script>
	<script type="text/javascript" src="../adaptiveYouPages/addnewbadge.js"></script>
	<script type="text/javascript" src="../js/tipTip.js"></script>
	<script type="text/javascript" src="../js/tagging.js"></script>

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
    
		String userProfile					= "{}";
		if(session.getAttribute("userProfileDetails") != null)
		{ 
			userProfile  					= (String) session.getAttribute("userProfileDetails");
	    }
	
    	String userKey  					= (String) session.getAttribute("userKeyLogin");
		String imageURL 					= (String) session.getAttribute("imageURL");
		
		
		String pendingReqCount 				= "{}";
		if(session.getAttribute("pendingReqCount") != null)
	 	{
			pendingReqCount 				= (String)session.getAttribute("pendingReqCount");
	 	}
	
		BlobstoreService blobstoreService 	= BlobstoreServiceFactory.getBlobstoreService();
		
		String emailId 						= "";
		emailId 							= (String) session.getAttribute("userEmailid");
		
		String firstName 					= "";
		firstName 							= (String) session.getAttribute("userFirstName");
		
		String lastName 					= "";
		lastName 							= (String) session.getAttribute("userLastName"); 
		
		String profileImage 				= "";
		profileImage 						= (String) session.getAttribute("userImage");
		
	
		String badgeListMap 				= "{}";
		if(request.getAttribute("badgeListMap") != null)
		{
			badgeListMap 					= (String) request.getAttribute("badgeListMap");
		}
		
		String videoDetailsMap 				= "{}";
		if(request.getAttribute("videoDetailsMap") != null)
		{
			videoDetailsMap 				= (String) request.getAttribute("videoDetailsMap");
		}
		
		String libMap 						= "{}";
		if(request.getAttribute("badgeListMap") != null)
		{
			libMap 							= (String) request.getAttribute("badgeListMap"); 
		}
	  
	  	String companyDetails 				= "{}";
		if(session.getAttribute("companyslist") != null)
		{
		 	companyDetails					= (String) session.getAttribute("companyslist");
		}
		String requestURLFromFeedback 		=  request.getRequestURL().toString(); 
    %>
    
    	var userFirstName 					= "";
	 	var userLastName 					= "";
	 	var libMap 							= <%= libMap%>; 
	 	var badgeListMap 					= <%= badgeListMap %>; 
	 	var videoDetailsMap					= <%= videoDetailsMap %>;
	 	var libImageUrlSelected 			= "";
	 	var pendingReq 						= '<%= pendingReqCount%>';
	    var pendingReqObj 					= JSON.parse(pendingReq);	
	    var stuffCount 						= 0;
	    var badgeCount 						= 0;
	    var bannerCompanyName 				= '<%= (String)session.getAttribute("companyName") %>';
	    var userKey 						= "";
	    var userName 						= "";
		var liUserLib 						= "";
		var userDetails   					= <%= userProfile %>;
		var companyList		 				= <%= companyDetails %>;
		var companyListli	 				= "";
		var badgeNamesList					= new Array();
		var uploadBadgeImageUrl				= '<%=blobstoreService.createUploadUrl("/uploadBadgeLogo.do?")%>';
		var requestURL 						= '<%= requestURLFromFeedback%>';
		
		function changeCompany(keyIndex)
		{
		   	window.location.href 			= "/intermediateCheck?companyKey="+keyIndex;
		}
		
		function hideStatusMessage()
		{
			if(document.getElementById("voice-box").getAttribute("status") == "saved")
			{
				$("#voice-box").fadeOut(300);
			}
		}
		
		var jcrop_api={destroy:function(){}},boundx, boundy,x1=0,x2=0,y1=0,y2=0;
		var height=0,width=0;
		var croppedWidth=0,croppedHeight=0;
		
    </script>

</head>
<body onload="cache(); generateli(); ">
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
        	<li class="selected"><a href="/addNewBadge">Manage Badges</a></li>
        	<li><a href="/addstuff">Manage Store</a></li>
        	<li><a href="/manageTeam">Manage Teams / Groups</a></li>
        	<li><a href="/admin">Issue Badges</a></li>
        	<li><a id="pending_req_badge" href="/approveBadge">Approve Badge Request</a></li>
        	<li><a id="pending_req_stuff" href="/allStuffDetails">Approve Stuff from Store</a></li>
        </ul>
    	<div class="admin_right_pannel">
            <div class="new_badge_holder" >
            <h2>Add New Badge <input type="submit" value="Add Badge" class="grn_btn add_badge_act" /></h2>
            <ul id="add_product" class="get_stuff get_badge">
                    	<!-- <li class="badges_list">
                        	<div class="col1">
                        	<div class="badge_hldr"><img  src="images/badge-green.png" width="87" height="87" /></div>
                            <b>500</b>
                            </div>
                            <div class="col2">
                                <h4>Work</h4>
                                <p>Get a free lunch of your choice on Adaptavant. Pick from KFC, McDonalds, The Copper Whatever or any other eatery that will not give you a stomach ache.</p>
                            </div>

                            <div class="clear_all"></div>
                            <div class="on_over">
                            	<ol>
                                	<li class="edit_product add_badge_act"></li>
                                    <li class="del_product del_act"></li>
                                    <li class="show_product show_product_act"></li>
                                </ol>

                            </div>
                        </li>
                        
                        <li class="badges_list dont_show">
                        	<div class="col1"><div class="badge_hldr"><img src="images/badge-robot.png" width="87" height="87" /></div>
                            <b>500</b>
                            </div>
                            <div class="col2">
                                <h4>Work Machine</h4>
                                <p>Get a free lunch of your choice on Adaptavant. Pick from KFC, McDonalds, The Copper Whatever or any other eatery that will not give you a stomach ache.</p>
                            </div>

                            <div class="clear_all"></div>
                             <div class="on_over">
                            	<ol>
                                	<li class="edit_product add_badge_act"></li>
                                    <li class="del_product del_act"></li>
                                    <li class="dont_show_product show_product_act"></li>
                                </ol>

                            </div>
                        </li>
                        <li class="badges_list dont_show">
                        	<div class="col1"><div class="badge_hldr"><img src="images/badge-typing.png" width="87" height="87" /></div>
                            <b>500</b>
                            </div>
                            <div class="col2">
                                <h4>Typing Test</h4>
                                <p>Get a free lunch of your choice on Adaptavant. Pick from KFC, McDonalds, The Copper Whatever or any other eatery that will not give you a stomach ache.</p>
                            </div>

                            <div class="clear_all"></div>
                             <div class="on_over">
                            	<ol>
                                	<li class="edit_product add_badge_act"></li>
                                    <li class="del_product del_act"></li>
                                    <li class="dont_show_product show_product_act"></li>
                                </ol>

                            </div>
                        </li>
                        <li class="badges_list dont_show">
                        	<div class="col1"><div class="badge_hldr"><img src="images/trophy.png" width="87" height="87" /></div>
                            <b>500</b>
                            </div>
                            <div class="col2">
                                <h4>Trophy</h4>
                                <p>Get a free lunch of your choice on Adaptavant. Pick from KFC, McDonalds, The Copper Whatever or any other eatery that will not give you a stomach ache.</p>
                            </div>

                            <div class="clear_all"></div>
                             <div class="on_over">
                            	<ol>
                                	<li class="edit_product add_badge_act"></li>
                                    <li class="del_product del_act"></li>
                                    <li class="dont_show_product show_product_act"></li>
                                </ol>

                            </div>
                        </li> --->
   				</ul>
            	
            		<div class="badge_detail_col">
                    <div class="popup_holder add_stuff_popup" style="display: none;">
                        <h2>Add New Badge</h2>
                        <div class="popup_close cancel_act">x</div>
                        <ul class="user_info">
                            <li>
                            <span style="display: none;" id="checking"></span>
                                <span style="overflow: hidden;height: 80px;width: 80px;" >
                                    <code class=""></code>
                                    <img id="badge_image" src="" height=80px; width=80px;></img>
                                </span>
                                <div class="input_holder">
                                    <div class="upload_profile">
                                        <span class="file-wrapper" >
                                              <input type="file" name="badgeLogo" id="imageLogoPath" class="badgeImage" onchange="addBadge(this)" />
                                              <span id="select_badge" class="button"><input id="select_badge" type="radio" />Browse Image</span>
                                        </span>
                                    </div><!--upload_profile-->
                                    <div class="clear_all"></div>
                                    <div class="dont_show_library">
                                    <h3>(or)</h3>
                                    <label class="ppup_badge_library_act"><input type="radio" name="btn" class="radio_chc" />&nbsp;Badges from library</label>
                                </div>
                                </div>
                                <div class="input_holder ml20">
                                    <input type="text" value="" id = "badge_name" class="long tooltipB" title="Badge Name"/>
                                    <input type="text" id="badge_points"  name="badge_points" value="" class="tooltipB" title="Points" onkeypress="return isNumberKey(event)"/>
                                    <font>points for</font>
                                    <label><input type="radio" class="ml20 badge_act" id="badge_cat" name="cat" value="badge" checked="checked"/>&nbsp;Badges</label>
                                    <label><input type="radio" class="ml20 trophy_act" id="trophy_cat" name="cat" value="trophy" />&nbsp;Trophy</label>
                                    <label class=" dont_show_library"><input type="radio" class="ml20 library_cat" id="library_cat" name="cat" value="badgelibrary" />&nbsp;Library</label>
                                    
                                </div>
                                <div class="clear_all"></div>
                            </li>
                            <li><div style="margin:0px 0px 10px 4px;"><input style=" margin:1px 10px 0px 0px ;" type="checkbox" id="earnMoreThanOnce" checked="checked"/><label for="earnMoreThanOnce">Earn more than one</label></div></li>
                        </ul> 
                        <div id="active_staus" class="text_content" style="margin-right:4px;">
                        <a class="admin_active_btn" id="normal_content" style="width: 110px;height: auto;">Normal Content</a>
                        <a class="" id="embedded_content" style="width: 110px;height: auto;">Embedded Content</a>
                        </div>   
                         <div class="message_holder">
                            <textarea id="email_content" title="Some Initial Content" class="tooltipB">
                                Some Initial Content was in this textarea
                            </textarea>
                            <ul class="add_vlink_cont" id="loc">
                            	<!--  <li class="row_clr odd">
                                	<code class="remove"></code>
                             		<code class="edit add_vlink_act"></code>
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump"/>
                                    <span class="heading"> Video heading</span> 
                                    <p>sample text sample text sample text sample text</p>                             
                                </li>
                                <li class="row_clr even">
                                	<code class="remove"></code>
                             		<code class="edit add_vlink_act"></code>
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump"/>
                                    <span class="heading"> Video heading</span>
                                    <p>sample text sample text sample text sample text</p>
									
                                </li>
                                <li class="row_clr odd">
                                	<code class="remove"></code>
                             		<code class="edit add_vlink_act"></code>
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump"/>
                                    <span class="heading"> Video heading</span>
                                    <p>sample text sample text sample text sample text</p>
									
                                </li>
                                <li class="row_clr even">
                                	<code class="remove"></code>
                             		<code class="edit add_vlink_act"></code>
                                    <img src="images/video_thump1.png" height="59" width="106" class="video_thump"/>
                                    <span class="heading"> Video heading</span>
                                    <p>sample text sample text sample text sample text</p>
									
                                </li>
                                
                            	<li>
                                	<h4>Sample Title</h4>
                                    <code class="remove"></code>
                             		<code class="edit add_vlink_act"></code>
                                </li> --> 
                              </ul>
                              <div class="clear_all"></div>
                              <span class="grn_btn2 add_vlink add_vlink_act">Add Video Link</span>
                            <div class="clear_all"></div>                            
                            <div class="tagItStyle">
                            <span id="allTagsCreated"></span>
                            <span><img id="adminAddNewTag" src="images/icons.png"/></span>
                           	<input style="margin: 0 0 0 12px !important;" type="text" value="" id="toAddNewTag" class="addNewTagInput"/> 
                            </div>
                            
                            <ul class="auto-complete-list">
                            </ul>
                            
                            <div class="btn_holder">
                                <input name="submitDbBadges" id="addNewBadgeButton" type="submit" value="Save" class="grn_btn "/>
                                <span>or
                                    <u class="cancel_act">Cancel</u>
                                </span>
                                 <div class="clear_all"></div>
                            </div><!-- btn_holder -->     
                            </div>
                             </div><!--- popup holder --->
                        <!-- badges_list -->     
                    <div class="clear_all"></div>     
                    </div>  
                     <!-- badge_detail_col -->

               <div class="clear_all"></div> 
            </div><!---new_badge_holder--->
        </div>
    </div> <!--content-wrapper -->
</div> <!-- wrapper -->


<div class="popup_holder add_vid_link" id='videopopup'>
        <h2>Add Video Link</h2>
        <div class="popup_close add_vlink_cancel_act">x</div> 
      
        <div class="video_link">
            <input type="text" value="Post Title..." id='textbox1' style = "display:none"/>
            <input type="text" value="Add Video Link..."  class="addvideolink" id='textbox2' onkeyup= "youtubeFetchData();"/>
             <img id="imagethumbnail"src="" class="time" height="40" width="75"/>
            <textarea name="description" id='textbox3' onfocus="blank(this)" onblur="unblank(this)" style = "display:none">Video information will appear here.</textarea>
            <div class="clear_all"></div>
            <div class="btn_holder">
                <input type="submit" id="add_link" value="Add" class="grn_btn2" onclick="checkvideos()"/>
                <span>or
                    <u class="add_vlink_cancel_act">Cancel</u>
                </span>
                 <div class="clear_all"></div>
            </div><!-- btn_holder -->  
        </div>
</div>

<!-- Added for badgeLibrary -->

    <div class="popup popup_holder badge_library popup_pos">
        <h2>Badge Library</h2>
        <div class="popup_close add_vlink_cancel_act">x</div> 
            <div class="badges_list">
                <ul id="lib_badges">
                  <!--   <li>
                        <img alt="typing-test" src="images/badge-robot.png"/>
                        <div title="Test" class="badge-name toolTip">Work Machine</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-green.png" />
                        <div title="Test" class="badge-name toolTip">Work</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-typing.png" />
                        <div title="Test" class="badge-name toolTip">Work Machine</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-robot.png" />
                        <div class="badge-name">Work Machine</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-green.png"/>
                        <div class="badge-name">Hippie</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-typing.png"/>
                        <div class="badge-name">Typing Test</div>
                    </li>       
                    <li>
                        <img alt="typing-test" src="images/badge-robot.png"/>
                        <div title="Test" class="badge-name toolTip">Work Machine</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-green.png"/>
                        <div title="Test" class="badge-name toolTip">Work</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-typing.png"/>
                        <div title="Test" class="badge-name toolTip">Work Machine</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-robot.png"/>
                        <div class="badge-name">Work Machine</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-green.png"/>
                        <div class="badge-name">Hippie</div>
                    </li> 
                    <li>
                        <img alt="typing-test" src="images/badge-typing.png"/>
                        <div class="badge-name">Typing Test</div>
                    </li>               -->    
                </ul>
             <div class="clear_all"></div>     
         </div>	
    </div> <!-- popup -->  
<!-- popup_holder -->  

<!-- popup_holder edit -->  
  
    <div class="popup popup_holder add_vid_link1" id='editvideopopup'>
        <h2>Edit Video Link</h2>
        <div class="popup_close add_vlink_cancel_act">x</div> 
        <div class="video_link">
            <input type="text" value="Post Title..."  id='title' />
          <input type="text" value="Add Video Link..." readonly="readonly"  class="addvideolink" id='url' /> 
          <img id="imagethumbnail1"src="" class="time" height="40" width="75"/>
          <!--   <input type="text" value="Add Video Link..."  class="addvideolink" id='urltextbox' onkeyup= "youtubeFetchData();"/> -->
          <!--   <input type="submit" value="get details" class="grn_btn2" onclick="youtubeFetchData( );"/> -->
             
            <textarea name="description"  id='desc'></textarea>
            <div class="clear_all"></div>
            <div class="btn_holder">
                <input type="submit" style="width: 80px !important; margin-top: -5px !important;" value="EDIT" class="grn_btn2" id="add_link" onclick="editvideodetails()"/>
                <span>or
                    <u class="add_vlink_cancel_act">Cancel</u>
                </span>
                 <div class="clear_all"></div>
              
            </div>
        </div>
	</div>

  <!-- popup_holder edit-->  
<div class="popup_holder remove_alert" >
	<p>Do you really want to remove?</p>
    <div class="btn_holder">
        <input type="submit"  value="Yes" class="grn_btn delete_badge" />
        <span>or
            <u class="cancel_act">Cancel</u>
        </span>
         <div class="clear_all"></div>
    </div><!-- btn_holder -->     
</div>

	<center>
		<div id="badge_image_cropper" class="popup" style="display: none;">
		<div><img src="" id="badge_image_sample"/></div>
		<center><input type="button" class="grn_btn" style="margin-top: 16px;padding: 5px;width: 90px;" id="badge_image_cropper_act" value = "Select" /></center>
		<div id="image_crop_close_act" style="color: #999999;float: right;margin-top: 6px;cursor: pointer;" onmouseover="$(this).css('color','#0079B6');" onmouseout="$(this).css('color','#999999');">click here to skip...</div>
		</div>
	</center>
						
<div id="backgroundPopup"></div>   <!-- backgroundPopup -->  

<!-- LoopTodo Feedback Form Code -->
<script type="text/javascript" id="looptodo_loop_embed_code"  src="http://my.loopto.do/form/js/loop-embed-code.js?loopKey=agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M&domain=my.loopto.do">
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
