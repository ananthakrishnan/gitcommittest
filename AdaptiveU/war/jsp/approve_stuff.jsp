<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import ="java.util.LinkedHashMap"%>  
<%@page import = "com.google.gson.Gson"%> 
<%@page import = "com.google.gson.GsonBuilder"%> 
<%@page import = "com.acti.jdo.*"
import="java.util.HashMap"
import="org.apache.commons.collections.MultiHashMap"
import="org.apache.commons.collections.MultiMap"
import="java.util.*" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - Approve Stuff</title>

   	<link rel="stylesheet" type="text/css" href="css/reset.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <link rel="stylesheet" type="text/css" href="css/admin.css" />
    <link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" />
    <link rel="stylesheet" type="text/css" href="colortip-1.0/colortip-1.0-jquery.css"/>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>

    <script type="text/javascript" src="js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="js/actions.js"></script>
    <script type="text/javascript" src="../js/commonFunctions.js"></script>
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
    if(session.getAttribute("userProfileDetails")==null){
  	  response.sendRedirect("/");
      }
    
	String userDetailsMap ="{}";
	if(request.getAttribute("userDetailsMap") != null)
		userDetailsMap = (String)request.getAttribute("userDetailsMap");
	
	String userBadgeLogJdoMap ="{}";
	if(request.getAttribute("userBadgeLogJdoMap") != null)
		userBadgeLogJdoMap = (String)request.getAttribute("userBadgeLogJdoMap");
	
	String badgeDetailsMap ="{}";
		badgeDetailsMap = (String)request.getAttribute("badgeDetailsMap");
	
	String pendingReqCount = "{}";
	if(session.getAttribute("pendingReqCount") != null)
		pendingReqCount = (String)session.getAttribute("pendingReqCount");
	 
	 String userStatusDetailsMap="{}";
	 if(request.getAttribute("userStatusDetailsMap") != null)
		 userStatusDetailsMap = (String)request.getAttribute("userStatusDetailsMap");
	 
	 String emailId = "";
	 emailId = (String) session.getAttribute("userEmailid");
		
	String firstName = "";
	firstName = (String) session.getAttribute("userFirstName");
	String lastName = "";
	lastName = (String) session.getAttribute("userLastName"); 
	String profileImage = "";
	profileImage = (String) session.getAttribute("userImage");
	String companyDetails = "{}";
	if(session.getAttribute("companyslist") != null)
	{
		companyDetails=(String)session.getAttribute("companyslist");
	}
	String requestURLFromFeedback 			= (String) request.getRequestURL().toString(); 
		
    %>
    var userBadgeLogJdoMap 	=  <%= userBadgeLogJdoMap%>;
    var userDetailsMap 		=  <%= userDetailsMap%>;
    var badgeDetailsMap  	=  <%= badgeDetailsMap%>; 
    var userstatusdetails	=  <%= userStatusDetailsMap %>;
    var userFirstName 		= '<%=firstName %>';
    var userLastName 		= '<%=lastName %>';
    var pendingReq 			= '<%= pendingReqCount%>';
    var pendingReqObj 		= JSON.parse(pendingReq);	
    var bannerCompanyName 		= '<%= (String)session.getAttribute("companyName") %>';
    var dys = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var userEmail					= '<%= emailId%>';
	var userFirstName				= '<%=firstName %>';
	var userLastName				= '<%=lastName %>';
	var requestURL 					= '<%= requestURLFromFeedback%>';
	
	</script>	
	 <script type="text/javascript" src="../js/feedback.js"></script>	
<script>
    $(document).ready(function() {
//     	$('#company-name').html(bannerCompanyName);
    	if(userFirstName  != null && userFirstName != 'undefined' && userLastName  != null && userLastName != 'undefined')
    		$('.welcome_username').html("Welcome, "+userFirstName+" "+ userLastName);
    	$('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
		$('#pending_req_stuff').html("Approve Stuff Request ("+pendingReqObj.stuffCount+")"); 
    	for(indexStuff in userstatusdetails)
    		{
    		var divUser = "";
    		if(userstatusdetails[indexStuff].status.indexOf("purchased") != -1)
    		{
    			for(indexUser in userDetailsMap)
    				{
    					if(indexUser.indexOf(userstatusdetails[indexStuff].userId) != -1)
    						{
    						var dateAdded = new Date(userstatusdetails[indexStuff].dateAdded);
    						var dateRequested = "";
    						var mins = "";
    							if(parseInt(dateAdded.getMinutes()) < 10)
    								mins = "0"+(dateAdded.getMinutes());
    							else
    								mins = dateAdded.getMinutes();
    						if(dateAdded.getHours() > 12)
    						 	dateRequested = (dateAdded.getDate()) + " "+ months[dateAdded.getMonth()] + " " + dateAdded.getFullYear()+ " "+(parseInt(dateAdded.getHours()) - 12)+":"+mins+" PM";
    						else
    							dateRequested = (dateAdded.getDate()) + " "+ months[dateAdded.getMonth()] + " " + dateAdded.getFullYear()+ " "+(parseInt(dateAdded.getHours())) +":"+mins+ " AM";	
    							divUser = '<li id="'+indexStuff+'"> <div id = "'+userstatusdetails[indexStuff].dateAdded+'" style="float: right; margin: -9px 10px 1px 0px; color: blue;">'+dateRequested+'</div><div id="'+indexUser+'"class="person_name" onmouseover="dispemail(this)" onmouseout="disp2email(this)"><h3><a href="#">'+userDetailsMap[indexUser].firstName +'</a></h3>'+
    							 '<h4 style="opacity:0">'+userDetailsMap[indexUser].firstName+' '+userDetailsMap[indexUser].lastName+'<br>'+
 								'<a href="mailto:'+userDetailsMap[indexUser].userName+'" style="color:#1284c6;text-decoration:none" target="_blank">'+userDetailsMap[indexUser].userName+'</a>'+
    	                        '<h4></h4><code><img width="42px" height="42px" src="'+userDetailsMap[indexUser].profilePicture.replace("/photo.jpg","/s42-c/photo.jpg")+'"></code></div>';
    	                       
    	                        for(indexBadge in badgeDetailsMap)
    	        				{
    	    	    				if(indexBadge.indexOf(userstatusdetails[indexStuff].stuffid) != -1)
    	    						{
    	    	    					divUser +='<div class="cert_cont" ><img title="" alt="" src="'+badgeDetailsMap[indexBadge].badgeLogoPath+'">'+
		    	                    	'<h4>'+badgeDetailsMap[indexBadge].badgeName+'</h4><p>'+badgeDetailsMap[indexBadge].badgeDiscription.value+'</p></div><div id="'+badgeDetailsMap[indexBadge].badgeValue+'_'+indexBadge+'" class="btn_holder" onclick="issueItem(this)">'+
		    	                        '<span class="grn_btn2">Issue Item</span></div>'+
		    	                        '<div id="'+badgeDetailsMap[indexBadge].badgeValue+'_'+indexBadge+'" class="btn_holder" onclick="denyItem1(this)"><span class="grn_btn2">Deny Request</span></div>'+
		    	                        '<div class="points_wrapper"><div class="badges_count"><div class="badges_row"><ul>';
		    	    				}
    	        				}
    	                        
    	                        for(indexBadgeMap in userBadgeLogJdoMap)
    	        				{
    	                        	if(indexBadgeMap.indexOf(indexUser) != -1)
    	    						{
    	                        		
    	                        		var badgeArray = new Array();
    	                        		if(String(userBadgeLogJdoMap[indexBadgeMap].badgeId).indexOf(",") != -1)
    	    	    						badgeArray = String(userBadgeLogJdoMap[indexBadgeMap].badgeId).split(",");
    	                        		else if(String(userBadgeLogJdoMap[indexBadgeMap].badgeId) && String(userBadgeLogJdoMap[indexBadgeMap].badgeId) != 'null')
    	                        			badgeArray.push(String(userBadgeLogJdoMap[indexBadgeMap].badgeId));
    	                        		divUser += '<li class="others_count"><h3>'+badgeArray.length+'</h3></li>';
    	                        		
    	    	    					for(var i=0;i<badgeArray.length;i++)
    	    	    					for(indextotalBadge in badgeDetailsMap)
        	    						{
    	    	    						if(indextotalBadge.indexOf(badgeArray[i]) != -1)
    	    								{
    	    	    							if(badgeDetailsMap[indextotalBadge].badgeType.indexOf("badges")!= -1 || badgeDetailsMap[indextotalBadge].badgeType.indexOf("badge")!= -1)
    	    	    							divUser += '<li><img title="'+badgeDetailsMap[indextotalBadge].badgeName+'" alt="typing-test" src="'+badgeDetailsMap[indextotalBadge].badgeLogoPath+'=s25"></li>'; 
    	    								}
        	    						}
    	    	    					
    	    	    					divUser += '</ul><div class="clear_all"></div></div><div class="badges_row trophy_row"> <ul>'
    	    	    					
    	    	    					
    	    	    					var trophyArray = new Array();
    	    	    					if(String(userBadgeLogJdoMap[indexBadgeMap].badgeId).indexOf(",") != -1)
    	    	    						trophyArray = String(userBadgeLogJdoMap[indexBadgeMap].badgeId).split(",");
    	                        		else if(String(userBadgeLogJdoMap[indexBadgeMap].badgeId) != null)
    	                        			trophyArray.push(String(userBadgeLogJdoMap[indexBadgeMap].badgeId));
    	    	    					
    	    	    					var onlyTrophyArray = new Array();
    	    	    					
    	    	    					for(var i=0;i<trophyArray.length;i++)
        	    	    					for(indextotalBadge in badgeDetailsMap)
            	    						{
        	    	    						if(indextotalBadge.indexOf(trophyArray[i]) != -1)
        	    								{
        	    	    							if(badgeDetailsMap[indextotalBadge].badgeType.indexOf("trophy")!= -1)
        	    	    								onlyTrophyArray.push(trophyArray[i]);
        	    								}
            	    						}
    	    	    					
    	    	    					divUser += '<li class="others_count"><h3>'+onlyTrophyArray.length+'</h3></li>';
    	    	    					
    	    	    					for(var i=0;i<onlyTrophyArray.length;i++)
        	    	    					for(indextotalBadge in badgeDetailsMap)
            	    						{
        	    	    						if(indextotalBadge.indexOf(onlyTrophyArray[i]) != -1)
        	    								{
        	    	    								divUser += '<li><img title="This is a test" alt="typing-test" src="'+badgeDetailsMap[indextotalBadge].badgeLogoPath+'=s25"></li>'; 
        	    								}
            	    						}
    	    	    					
    	    	    					divUser +='</ul><div class="clear_all"></div> </div></div> <div class="total">'+userBadgeLogJdoMap[indexBadgeMap].points+'</div><div class="clear_all"></div>'+
    	    	                        '</div><div class="clear_all"></div></li>';
    	    						}
    	        				}
    						}
    				}
    				}
				$('.person_list').append(divUser)
    		}
    	
    	
    	var companyList = <%= companyDetails %>;
		var companyListli = "";
	    for(index in companyList)
	    {
	     companyListli+='<li style="cursor:pointer;" id="'+index+'" ><a onClick="changeCompany(\''+index+'\');"><span>'+companyList[index]+'<span></a></li>';
	    }
	    if(companyListli != "")
	    	{
	   			 $('#companyslist').append(companyListli);
	    	}
	    else
	    	{
	    		$('#account_menu').removeAttr("id");
	    		
	    	}
	   
	    $('#account_name').html('<%= (String)session.getAttribute("companyName") %>');
	    
	    var elems = $("ul.person_list > li").toArray();
	    elems.sort(function(a, b) 
	    {
	        var adate = $(a).find('div').attr('id');
	        var bdate = $(b).find('div').attr('id');
	        return adate < bdate ? -1 : 1;
	    });
	    $("ul.person_list").html(elems);
    	
    });
    
    function dispemail(userdiv)
	{
 		var changeinval=userdiv.getElementsByTagName("H4")[0];
 		changeinval.setAttribute("style","opacity:1");
	}

 	function disp2email(userdiv)
	{
	     var changeinval=userdiv.getElementsByTagName("H4")[0];
	     changeinval.setAttribute("style","opacity:0");
	}
    
    function changeCompany(keyIndex)
	  {
	   window.location.href="/intermediateCheck?companyKey="+keyIndex;
	  }
    
    function issueItem(selStuff)
    {
     //changes by bharath
     var points       = String(selStuff.id).split("_")[0];
     var stuffid      = String(selStuff.id).split("_")[1];
     var uniqueUserKey    = $(selStuff).parent('li').attr('id');
     var userKey      = $(selStuff).parent('li').find(".person_name").attr("id");
      
       $.ajax({type: 'POST', url: '/approveStuffRequest' ,data:"uniqueUserKey="+uniqueUserKey+"&stuffid="+stuffid+ "&userKey="+userKey, success: function(data)
    	   {
     			$("#voice-box").fadeIn();
    			document.getElementById("statusMessage").innerHTML = "Updated!";
    			document.getElementById("voice-box").setAttribute("status", "saved");
    			setTimeout("hideStatusMessage()", 1750);
    			$('#'+uniqueUserKey).hide();
       		}
       });  
    }
    
    function denyItem(selStuff)
    {
      	$('#popupdiv').show();
      	$('#backgroundPopup').show();
     	var points = String(selStuff.id).split("_")[0];
     	var stuffid = String(selStuff.id).split("_")[1];
     	var uniqueUserKey    = $(selStuff).parent('li').attr('id');
     	var userKey = $(selStuff).parent('li').find(".person_name").attr("id");
      
       $.ajax({type: 'POST', url: '/denyRequestForStuff' ,data:"uniqueUserKey="+uniqueUserKey+"&stuffid="+stuffid+ "&userKey="+userKey+"&points="+points, success: function(data)
    	   {
     			$("#voice-box").fadeIn();
    			document.getElementById("statusMessage").innerHTML = "Item Denied";
    			document.getElementById("voice-box").setAttribute("status", "saved");
    			setTimeout("hideStatusMessage()", 1750);
    			$('#'+uniqueUserKey).hide();
       	   }
       }); 
    }
    
	function hideStatusMessage()
	  {
			if(document.getElementById("voice-box").getAttribute("status") == "saved")
			{
				$("#voice-box").fadeOut(300);
			}
	  }
	function closePopup(){
		$('#popupdiv').hide();
	     $('#backgroundPopup').hide();
	     $('#email_status').attr("checked","checked");
	     $("#badge_discription").removeAttr("disabled"); 
	      $("#badge_discription").css("background-color","white"); 
	}
	var denyitem="";
	function denyItem1(selStuff){
		denyitem=selStuff;
		$('#popupdiv').show();
	     $('#backgroundPopup').show();
	     
	}
	function validate()
	{
		var emailstatusfordeny=$('#email_status').attr("checked")
    	if(emailstatusfordeny==="checked")
    	{
    		var emailcontent=$('#badge_discription').val();
    		if(emailcontent==="" || emailcontent===null || emailcontent==="Reason for Denying the stuff Request"){
    			$("#voice-box").fadeIn();
				document.getElementById("statusMessage").innerHTML = "Please Enter Email Content or uncheck the send email checkbox";
				document.getElementById("voice-box").setAttribute("status", "saved");
				setTimeout("hideStatusMessage()", 1750);
				
    		}
    		else
    		{
    			denyItem(denyitem);
    			closePopup();
    			var type="item";
    			var stuffid = String(denyitem.id).split("_")[1];
    			var userKey = $(denyitem).parent('li').attr('id');
    	    	 userIdtemp=userKey
    	    	 userKey=String(userKey).split("MithraKey")[0];
    			$.ajax({type: 'POST', url: '/sendmailforrequestdenied' ,data:"typeid="+stuffid+ "&userKey="+userKey+"&type="+type+"&mailcontent="+emailcontent, success: function(data){
    			 	$("#voice-box").fadeIn();
    				document.getElementById("statusMessage").innerHTML = "Item Denied";
    				document.getElementById("voice-box").setAttribute("status", "saved");
    				setTimeout("hideStatusMessage()", 1750);
    				$('#'+userIdtemp).hide();
         		}
      	    });
    			
    		}
    	}
    	else{
    		denyItem(denyitem);
			closePopup();
    	}
	}
	 function disabletext(){
		   
		 if($('#email_status').is(':checked')) {
	      $("#badge_discription").removeAttr("disabled"); 
	      $("#badge_discription").css("background-color","white"); 
	     } else {
	       $("#badge_discription").attr("disabled", "disabled"); 
	       $("#badge_discription").css("background-color","#A1ACB8"); 
	     } 
	    }
	 
	
    </script>
    
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
				<ul id="companyslist"></ul>
				</li>
				<li id="account_menu"><a href="#">My Account</a>
				<ul>
				<!-- <li id="my_details" onclick="openwin();"></li> -->
				<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a>
				</li>
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
        	<li><a href="/addNewBadge">Manage Badges</a></li>
        	<li><a href="/addstuff">Manage Store</a></li>
        	<li ><a href="/manageTeam">Manage Teams/Groups</a></li>
        	<li><a href="/admin">Issue Badges</a></li>
        	<li><a id="pending_req_badge" href="/approveBadge">Approve Badge Request</a></li>
        	<li class="selected"><a id="pending_req_stuff" href="/allStuffDetails">Approve Stuff Request</a></li>
        </ul>
    	<div class="admin_right_pannel">
        	<div class="approve_cont full-width approve_stuff">
            	<h2>Approve Stuff Request</h2>
            <ul class="person_list">
                </ul>
            </div><!--user_history_cont -->
        </div>
    </div> <!--content-wrapper -->
    
    
   
    
	 <div id="backgroundPopup">
	</div>    <!-- backgroundPopup -->  
    
     <div style="display:none" class="popup" id="popupdiv">
		<h2>Deny Stuff Confirmation</h2>
		<div class="popup_close" onclick="closePopup()">x</div> 
			<ul class="popup_fields">
				
		
				<li> 
					<input name="cat" id="email_status" type="checkbox" checked="checked" onchange="disabletext()" />
					<label for="badge_cat" class="floating_label">Send Email</label> 
					
				</li>
					<label class="top_label">Mail Content</label>
					<textarea id="badge_discription" class="text" type="text">Reason for Denying the stuff Request</textarea>
				</li>
				<li>
					<input type="button" class="save_btn" value="Deny Request" onclick="validate()"/>
				</li>
			</ul>
		</div>
    
</div> <!-- wrapper -->
 <div id="backgroundPopup" style="z-index:99999"></div>
	<%@ include file="/jsp/feedbackLoopTodo.jsp" %>


<%-- <!-- LoopTodo Feedback Form Code -->
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
<!-- End LoopTodo Feedback Form Code -->  --%>
    
</body>
</html>
