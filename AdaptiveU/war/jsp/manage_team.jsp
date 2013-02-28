<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="java.util.LinkedHashMap"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="com.google.gson.GsonBuilder"%>
<%@page import="com.acti.jdo.UserProfile"
	import="com.acti.jdo.ManageTeamJdo" import="java.util.HashMap"
	import="org.apache.commons.collections.MultiHashMap"
	import="org.apache.commons.collections.MultiMap" import="java.util.*"
	import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
	import="com.google.appengine.api.blobstore.BlobstoreService"%>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<meta name="google" content="notranslate" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - Manage Team</title>

<link rel="stylesheet" type="text/css" href="../css/reset.css" />
<link rel="stylesheet" type="text/css" href="../css/style.css" />
<link rel="stylesheet" type="text/css" href="../css/admin.css" />
<link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" />
<link rel="stylesheet" type="text/css" href="colortip-1.0/colortip-1.0-jquery.css" />
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>

<script type="text/javascript" src="../js/jquery-1.6.2.min.js"></script>
<script type="text/javascript" src="../js/actions.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
<script type="text/javascript" src="../js/commonFunctions.js"></script>
<script type="text/javascript" src="../js/jquery-ui.js"></script>
<script type='text/javascript'>
	if (window.top !== window.self) {window.top.location = window.self.location;}
</script>

<script type="text/javascript">
    function cache()
    {
      <%response.setHeader("Cache-Control", "no-cache");
			response.setHeader("Cache-Control", "no-store");
			response.setDateHeader("Expires", 0);
			response.setHeader("Pragma", "no-cache");%> 
    }
</script>
<script type="text/javascript">
    <%if (session.getAttribute("userProfileDetails") == null) {
				response.sendRedirect("/");
			}
			String teamInfoTeam = "";
			String teamInfo = (String) request.getAttribute("teamMemInfo");
			teamInfoTeam = teamInfo;
			String userInfoTeam = "";
			String userInfo = (String) request.getAttribute("userMap");
			userInfoTeam = userInfo;
			String companyKey = "";
			companyKey = (String) session.getAttribute("companyKey");
			String emailId = "";
			emailId = (String) session.getAttribute("userEmailid");
			String firstName = "";
			firstName = (String) session.getAttribute("userFirstName");
			String lastName = "";
			lastName = (String) session.getAttribute("userLastName"); //userImage
			String profileImage = "";
			profileImage = (String) session.getAttribute("userImage");
			String requestedUsers = "";
			requestedUsers = (String) request.getAttribute("requestedUsers");
			String companyDetails = "{}";
			if (session.getAttribute("companyslist") != null) {
				companyDetails = (String) session.getAttribute("companyslist");
			}
			String pendingReqCount = "{}";
			if (session.getAttribute("pendingReqCount") != null) {
				pendingReqCount = (String) session
						.getAttribute("pendingReqCount");
				System.out.println("pendingReqCount ::" + pendingReqCount);
				
			}
			String requestURLFromFeedback 			= (String) request.getRequestURL().toString(); 
			%>
	var requestedUsers 		= <%=requestedUsers%>;
	var team_Details 		= <%=teamInfoTeam%>;
	var user_Details 		= <%=userInfoTeam%>;
	var companyKey 			= '<%=companyKey%>';
	var userEmail 			= '<%=emailId%>'
	var bannerCompanyName 	= '<%=(String) session.getAttribute("companyName")%>';
	var pendingReq 			= '<%=pendingReqCount%>';
	var pendingReqObj 		= JSON.parse(pendingReq);	
    var stuffCount 			= 0;
    var badgeCount 			= 0;
    var userFirstName		= '<%= firstName%>';
    var userLastName		= '<%= lastName%>';
    var requestURL = '<%= requestURLFromFeedback%>';
	
	$.extend($.expr[':'], {
		'containsi': function (elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
		});
	
	function blank(a) { if(a.value == a.defaultValue) a.value = ""; }
    function unblank(a) { if(a.value == "") a.value = a.defaultValue; }
    
  <%--   var pendingReq = '<%= pendingReqCount%>';
    var pendingReqObj = JSON.parse(pendingReq);	
	 --%>
	 </script>
	 <script type="text/javascript" src="../js/feedback.js"></script>
<script>
	 $(document).ready(function() 
	{
		 var appendTeamInfo = "";
		 var allTeamMemsChild = '';
        
         	$('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
    		$('#pending_req_stuff').html("Approve Stuff Request ("+pendingReqObj.stuffCount+")"); 
		 for(indexTeam in team_Details)
			{
			 if(team_Details[indexTeam].teamName != null && team_Details[indexTeam].teamName != undefined &&  team_Details[indexTeam].teamName != "")
				{
				 console.info("team_Details[indexTeam].companyId ::"+team_Details[indexTeam].companyId+" companyKey ::"+companyKey+"  " + String(team_Details[indexTeam].companyId).indexOf(companyKey));
				 if(String(team_Details[indexTeam].companyId).indexOf(companyKey) != -1)
					 {
						 var teamMemArray = new Array();
						 var teamMems = String(team_Details[indexTeam].teamMembers);
						 if(teamMems.indexOf(",") != -1)
						 	teamMemArray = teamMems.split(",");
						 else if(teamMems != "")
							 teamMemArray.push(teamMems);
						 if(team_Details[indexTeam].teamName.indexOf("AllTeam") != -1)
					 	 	appendTeamInfo += '<li id= "'+team_Details[indexTeam].key+'" class="current allTeam droppable ui-widget-header" name="'+team_Details[indexTeam].teamOrder+'" onclick="showTeamMems(this)">All Team Members<span>'+teamMemArray.length+'</span></li>'
					 	 else
					 		appendTeamInfo += '<li id= "'+team_Details[indexTeam].key+'" class="droppable ui-widget-header" name="'+team_Details[indexTeam].teamOrder+'" onclick="showTeamMems(this)">'+team_Details[indexTeam].teamName+'<span>'+teamMemArray.length+'</span></li>'
					 }
				}
			 for(index in user_Details)
		   		{
				 	if(team_Details[indexTeam].teamName.indexOf("AllTeam") != -1)
				 		{
			   		if(team_Details[indexTeam].teamMembers.indexOf(user_Details[index].key) != -1)
			   		{
			   			var teamCount = 0;
			   			for(indexTeamArray in team_Details)
			   				{
			   					if(team_Details[indexTeamArray].teamMembers.indexOf(user_Details[index].key) != -1)
			   						{
			   						if(team_Details[indexTeamArray].teamName.indexOf("AllTeam") == -1)
			   							teamCount = teamCount + 1;
			   						console.info("******teamCount ::"+teamCount);
			   						}
			   				}
			   		 if(user_Details[index].type.indexOf('user') != -1)
			   			 {
			   			 //console.info('comes to user');
					   		 allTeamMemsChild += '<li class="draggable" class="ui-widget-content"  id='+user_Details[index].key+'><code class="drag_bar"></code>'+user_Details[index].firstName+'&nbsp;&nbsp;' +user_Details[index].lastName+
					   		 '<code> ('+teamCount+') </code><div id="active_staus"><a class="" id="'+user_Details[index].key+'_admin" onclick="changeStatus(this,\'AllTeam\')">Admin</a><a class="user_active_btn" id="'+user_Details[index].key+'_user" onclick="changeStatus(this,\'AllTeam\')">User</a><img id="AllTeam" style="margin-left:10px;margin-top: 4px; cursor:pointer;" onclick="javascript: return deleteTeamMem(this);" src="/images/delete_icon.gif" /></div>'+
					   		 '</li>';   
			   			 }
			   		 else if(user_Details[index].type.indexOf('Admin') != -1 || user_Details[index].type.indexOf('Company') != -1)
			   			 {
			   				if(user_Details[index].type.indexOf("Company")!= -1)
				  			{
			   					allTeamMemsChild += '<li class="draggable" class="ui-widget-content" id='+user_Details[index].key+'><code class="drag_bar"></code>'+user_Details[index].firstName +'&nbsp;&nbsp;' + user_Details[index].lastName +
						   		 '<code> ('+teamCount+') </code><div id="active_staus" style="margin-right:28px;" ><a class="admin_active_btn" id="'+user_Details[index].key+'_admin" > Admin</a><a class="" id="'+user_Details[index].key+'_user" >User</a></div></li>';
				  			}
				  		else
				  			allTeamMemsChild += '<li class="draggable" class="ui-widget-content" id='+user_Details[index].key+'><code class="drag_bar"></code>'+user_Details[index].firstName +'&nbsp;&nbsp;' + user_Details[index].lastName +
					   		 '<code> ('+teamCount+') </code><div id="active_staus" style="margin-right:28px;" ><a class="admin_active_btn" id="'+user_Details[index].key+'_admin" onclick="changeStatus(this,\'AllTeam\')"> Admin</a><a class="" id="'+user_Details[index].key+'_user" onclick="changeStatus(this,\'AllTeam\')">User</a></div></li>';
			   			 }
			   		}
		   		}
		   		}
			}
		 var teamInfo = $('#teamInfo').html();
			$('#teamInfo').html(teamInfo + appendTeamInfo);
		   	$('#allTeamMems').html(allTeamMemsChild);
		 
		 var mylist = $('ul#allTeamMems');
		 var listitems = mylist.children('li.draggable').get();
		 listitems.sort(function(a, b) {
		    var compA = $(a).text().toUpperCase();
		    var compB = $(b).text().toUpperCase();
		    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
		 })
		 $.each(listitems, function(idx, itm) { mylist.append(itm); });
		 
		 $('#userName').html("Welcome , <%=firstName%> <%=lastName%>");
			//console.info("username ::"+$('#userName').html()); 
			
		 var mylist = $('ul#teamInfo');
		 var listitems = mylist.children('li.droppable').get();
		 listitems.sort(function(a, b) {
		    var compA = $(a).text().toUpperCase();
		    var compB = $(b).text().toUpperCase();
		    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
		 })
		 $.each(listitems, function(idx, itm) { mylist.append(itm); });
		 
		 $('ul#teamInfo').children().each(function(){
			 var kid = $(this);
			 console.info("$(this).attr('class') ::"+$(this).attr('class'));
			 console.info("class contains :::"+$(this).hasClass("allTeam"));
			 if($(this).hasClass("allTeam"))
				 {
				 	$(this).prependTo("ul#teamInfo");
				 }
		 });
		 
		  var oldTeam = $('#teamInfo').html();
          
		 $('#teamInfo').html(oldTeam); 
			
		 var requestedMembers 	= "";
		 var invitedMembers		= "";
			for(indexingUserDetails in user_Details)
			{
			    if(user_Details[indexingUserDetails].loginTime == null && String(user_Details[indexingUserDetails].type) != "requested")
			    {
			    	invitedMembers 		+= '<li style="cursor:default;"><span style="margin-left:20px">'+user_Details[indexingUserDetails].userName+'</span><img src="/images/delete_icon.gif" onclick="javascript:return deletePendingRequest(this);" style="margin-top: 4px; cursor:pointer;float:right;" id="'+user_Details[indexingUserDetails].userName+'" /><div id="active_staus" style="margin-right:16px;">Request pending...</div></li>';
			    }
			    else if(String(user_Details[indexingUserDetails].type) === "requested")
			    {
			    	requestedMembers	+= '<div style = "border-bottom:1px solid #CDCDCD;" class="title request_action_admin"><h3 style="font-weight:normal;">'+user_Details[indexingUserDetails].firstName+" "+user_Details[indexingUserDetails].lastName+'</h3><h3>'+user_Details[indexingUserDetails].userName+'</h3><h3 style="float:right;margin-right:42px;margin-top:-2px;" class="request_text">Requested to Join</h3><span id="'+user_Details[indexingUserDetails].key+'" class="request_action" style="display:none;"><span id="accept" class="grn_btn2" style="float:right;margin-right:110px;padding:6px 10px;margin-top:9px;">Accept</span><span class="grn_btn2 gry_btn" id="deny" style="float:right;margin-right:-137px;padding:6px 10px;margin-top:9px;">Deny</span></span></div>';
			    }	
			}
			$('#allTeamMems').append(invitedMembers+requestedMembers);		
			
			
			$(document).ready(function(){
 				var companyList = <%=companyDetails%>;
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
 			   
 			    $('#account_name').html('<%=(String) session.getAttribute("companyName")%>');
 			    
 			   $('#allTeamMems').find(".request_action_admin").hover(
 					   function()
 					   {
 						   	$(this).css("box-shadow","0 0 25px #FFFFFF inset");
 				   			$(this).find(".request_text").hide();
 				   			$(this).find(".request_action").fadeIn("normal");
 				   	   },
 			   		   function()
 			   		   {
 				   			$(this).css("box-shadow","0 0 0");
 				  			$(this).find(".request_text").fadeIn("normal");
				   			$(this).find(".request_action").hide();
 			   		   }
 			   );
 			   
 			  $('.request_action').find("span").live("click",function(){
 				  
 				  var requested_user_key			= $(this).parent("span").attr("id");
 				  var request_action				= $(this).attr("id");
 				  
 				  
 				  $.ajax({
 					  type		:	'POST',
 					  url		:	'/userRequestAction',
 					  data		:	{requested_user_key:requested_user_key,request_action:request_action},
 					  success	:	function()
 					  				{
//  						 				clearConsole();
 						 				
 						 				if(String(request_action) === "accept")
 						 				{
 						 					for(indexingUserDetails in user_Details)
 						 					{
 						 						if(String(user_Details[indexingUserDetails].key) === String(requested_user_key))
 	 						 				    {
 						 							 $('#allTeamMems').find(".request_action_admin").first().before('<li style="cursor:default;"><span style="margin-left:20px">'+user_Details[indexingUserDetails].userName+'</span><img src="/images/delete_icon.gif" onclick="javascript:return deletePendingRequest(this);" style="margin-top: 4px; cursor:pointer;float:right;" id="'+user_Details[indexingUserDetails].userName+'" /><div id="active_staus" style="margin-right:16px;">Request pending...</div></li>');
 	 						 				    }
 						 					}
											
 						 				}	
 					  				},
 					  error		:	function()
 					  				{
//  						 				clearConsole();
 					  				}
 				  });
 				  
 				 $(this).parent("span").parent("div").remove();
 				  
 			  });
 			  
 			  
 		  });
			
			
			$(".select_all").live("click",function(){
				
				$("#contacts_list tr td").each(function(){
					
					$(this).find("input").attr("checked",true).parent().css("color","#679EB5");
					
				});
				
			});
			
			$(".de_select_all").live("click",function(){
				
				$("#contacts_list tr td").each(function(){
					
					$(this).find("input").removeAttr("checked").parent().css("color","#808080");
					
				});
				
			});
			
			$("input:checkbox[name='contactsMailId']").live("change",function(){
				
				if($(this).is(":checked"))
				{
					$(this).parent().css("color","#679EB5");
				}
				else
				{
					$(this).parent().css("color","#808080");
				}	
				
				
				
			});
			
			
			$(".send_user_invites").live("click",function(){
				
				var selectedUsersList			= new Array();
				var userKeyList					= new Array();
				var userEntryKey				= "";
				
				$("input:checkbox[name='contactsMailId']:checked").each(function(){
					
					
					if(String($.trim($(this).attr("id"))) != "" && $.trim($(this).attr("id")))
					{
						jQuery._uuidlet							= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
						userEntryKey 							= jQuery._uuidlet;
						
						var userEntryObject						= new Object();
						var userObject							= new Object();
						
						
						userEntryObject.key						= userEntryKey;
						userEntryObject.userName				= $(this).attr("id");
						
						user_Details[userEntryKey]				= userEntryObject;
						
						userObject[userEntryKey]				= $(this).attr("id");
						
						
						selectedUsersList.push(JSON.stringify(userObject));
						userKeyList.push(userEntryKey);
						
					}	
					
					
					$('#allTeamMems').append('<li id="'+userEntryKey+'" style="cursor:default;"><span style="margin-left:20px">'+$(this).attr("id")+'</span><img src="/images/delete_icon.gif" onclick="javascript:return deletePendingRequest(this);" style="margin-top: 4px; cursor:pointer;float:right;" id="'+$(this).attr("id")+'" /><div id="active_staus" style="margin-right:16px;">Request pending...</div></li>');		
					
				});
				
				
				$('#contacts_list').html("");
				$('#backgroundPopup').fadeOut();
			 	$('.import_contacts').hide();
			 	$('#new_team_member').show();
				$('#li_add_new_user').remove();
				$('#save_new_team_member').hide();
				$('#cancel_new_team_member').hide();
				$('#add_new_team_mem').hide();
				$('#add_new_team_mem').val("");
				$("#allTeamMems").scrollTop(0);
				
				
				$.ajax({
					type		: 	'POST', 
					url			:	'/inviteNewUser' ,
					data		:	{emailId:String(selectedUsersList),userKeyList:String(userKeyList)}, 
					async		: 	false,
					success		: 	function(data)
		     						{
// 										$("#voice-box").fadeIn();
// 										document.getElementById("statusMessage").innerHTML =data;
// 										document.getElementById("voice-box").setAttribute("status", "saved");
// 										setTimeout("hideStatusMessage()", 1750);
		     						}
		     		});
				
			});
			
			
			if(String(userEmail).indexOf("@facebook.com") === -1)
			{
				$(".facebook_invite_button,.remove_facebook_contacts_invite").remove();
				$(".remove_gmail_contacts_invite").removeAttr("class");
			}
			else
			{
				$(".import_contacts").find("h2").html("Contacts from Facebook");
				$(".gmail_invite_button,.remove_gmail_contacts_invite").remove();
				$(".remove_facebook_contacts_invite").removeAttr("class");
			}	
			
			
			$(".close_contacts_invite").live("click",function(){
				
				$('#contacts_list').html("");
				$('#backgroundPopup').fadeOut();
			 	$('.import_contacts').hide();
			 	$('#new_team_member').show();
				$('#li_add_new_user').remove();
				$('#save_new_team_member').hide();
				$('#cancel_new_team_member').hide();
				$('#add_new_team_mem').hide();
				$('#add_new_team_mem').val("");
				$("#allTeamMems").scrollTop(0);
				
			});
		 
	 });
	 
	function deletePendingRequest(pendingUserEntry)
	{
		var confirmAction			= confirm("Do you really wants to delete this invite ?")
		
		if(confirmAction)
		{
			var pendingUserId			= pendingUserEntry.id;
			
			$(pendingUserEntry).parent("li").remove();
			
			$.ajax({
				url		: "/deletePendingRequest",
				type	: "POST",
				data	: {pendingUserId:pendingUserId},
				success	: function(){}
			});
		}	
	}
	 
	 function clearConsole()
	 {
		 var browsername = navigator.userAgent;
		 if (browsername.indexOf("Firefox")!=-1) 
		 {
			 console.clear();
		 }
	 }
	 
	 function changeCompany(keyIndex)
	 {
	 	window.location.href="/intermediateCheck?companyKey="+keyIndex;
	 }
    </script>
<script>
    
    function deleteTeamMem(deleteMem)
    { 
    	 var confirmDelete							= confirm("Do you really wants to delete this user..?")
    	 if(confirmDelete)
    	 {
    		 var deleteMemId 						= $(deleteMem).parent().parent().attr("id");
    		 var teamName							= $(deleteMem).attr("id");
    		 var editteamArrayAfterDeletion			= new Array();
    		 var teamId								= "";
    		 var teamCount							= 0;
    		 
    		 $("#allTeamMems li[id=''"+deleteMemId+"'']").remove();
    		 
    		 for(indexTeam in team_Details)
    		 {
    			editteamArrayAfterDeletion	= [];
    			teamId						= String(team_Details[indexTeam].key);
    			
    			if(String(team_Details[indexTeam].teamMembers).indexOf(",") != -1)
    			{
    				editteamArrayAfterDeletion = String(team_Details[indexTeam].teamMembers).split(",");
    			}	
    			else
    			{
    				editteamArrayAfterDeletion = String(team_Details[indexTeam].teamMembers);
    			}
    			
    			if(String(teamName) === "AllTeam")
    			{
    				if(editteamArrayAfterDeletion.indexOf(deleteMemId) != -1)
    				{
    					editteamArrayAfterDeletion	= $.grep(editteamArrayAfterDeletion , function(element){
    						return element != deleteMemId;
    					});
    					
    					teamCount				= parseInt($("#teamInfo li[id='"+teamId+"'] > span").html());
    					$("#teamInfo li[id='"+teamId+"'] > span").html(teamCount - 1);
    				}
    				
    				for(indexingUserDetails in user_Details)
    				{
    					if( String(user_Details[indexingUserDetails].key) === String(deleteMemId) )
    					{
    						delete user_Details[deleteMemId];
    					}	
    				}	
    			}
    			else if( String(team_Details[indexTeam].teamName) === String(teamName) )
    			{
    				if(editteamArrayAfterDeletion.indexOf(deleteMemId) != -1)
    				{
    					editteamArrayAfterDeletion	= $.grep(editteamArrayAfterDeletion , function(element){
    						return element != deleteMemId;
    					});
    					
    					teamCount				= parseInt($("#teamInfo li[id='"+teamId+"'] > span").html());
    					$("#teamInfo li[id='"+teamId+"'] > span").html(teamCount - 1);
    				}
    			}
    			team_Details[indexTeam].teamMembers  = editteamArrayAfterDeletion;
    		}
    		$.ajax({  
    			 
    			 	type: 'GET', 
    			 	url: '/deleteTeamMem' ,  
    			 	data:"userKey="+deleteMemId+"&teamName="+teamName ,
    			 	async: false, 
    			 	success: function( data )
    				  		{
    							$("#voice-box").fadeIn();
    							document.getElementById("statusMessage").innerHTML = "Deleted !";	
    							document.getElementById("voice-box").setAttribute("status", "saved");
    							setTimeout("hideStatusMessage()", 1750);
    				 		}
    		});
    	 }
    	 else
    	 {
    		 return false;
    	 }	 
		 
		 
	 }
    
    function changeStatus(selectedStatus,teamName)
    {
    	console.info("selectedstatus ::"+$(selectedStatus).html()+" "+teamName);
    	if($(selectedStatus).html().indexOf('Admin') != -1 || $(selectedStatus).html().indexOf('Company') != -1)
    		{
    			var selectedId = selectedStatus.id;
    			console.info("selectedId ::"+selectedId);
    			var selectedType = selectedId.split("_");
    			console.info(selectedType[0]);
    			$(selectedStatus).addClass('admin_active_btn');
    			$("#"+selectedType[0]+"_user").removeClass('user_active_btn');
    			var status = "";
    			if($(selectedStatus).html().indexOf('Admin') != -1)
    				{
    					status = "Admin";
    				}
    			else if($(selectedStatus).html().indexOf('Company') != -1)
    			{
    				status = "Company";
    			}	
    			for(indexingUserDetails in user_Details)
				{
					if( String(user_Details[indexingUserDetails].key) === String(selectedId.split("_")[0]) )
					{
						user_Details[indexingUserDetails].type = status;
					}	
				}
    			
    			$("#allTeamMems li[id='"+selectedId.split("_")[0]+"'] > #active_staus").find("img").remove();
    			$("#allTeamMems li[id='"+selectedId.split("_")[0]+"'] > #active_staus").css("margin-right","28px");
    			
    			$.ajax({  type: 'GET', url: '/changeStatusOfUser' ,  data:"status="+status+"&userKey="+selectedType[0] ,async: false, success: function( data )
   				  {
    				console.log(status);
    				 $("#voice-box").fadeIn();
    				 document.getElementById("statusMessage").innerHTML = "Changed the status to Admin!";	
     				document.getElementById("voice-box").setAttribute("status", "saved");
     				setTimeout("hideStatusMessage()", 1750);
   				  }
    			 });
    		}
    	if($(selectedStatus).html().indexOf('User') != -1)
		{
			var selectedId = selectedStatus.id;
			console.info("selectedId ::"+selectedId);
			var selectedType = selectedId.split("_");
			console.info(selectedType[1]);
			for(indexingUserDetails in user_Details)
			{
				if( String(user_Details[indexingUserDetails].key) === String(selectedId.split("_")[0]) )
				{
					user_Details[indexingUserDetails].type = "user";
				}	
			}
			
			var appendDeleteOption = '<img src="/images/delete_icon.gif" onclick="javascript:return deleteTeamMem(this);" style="margin-left:10px;margin-top: 4px; cursor:pointer;" id="'+teamName+'">';
			$("#allTeamMems li[id= '"+selectedId.split("_")[0]+"'] > #active_staus").css("margin-right","0px").append(appendDeleteOption);
			
			$(selectedStatus).addClass('user_active_btn');
			$("#"+selectedType[0]+"_admin").removeClass('admin_active_btn');
			 $.ajax({  type: 'GET', url: '/changeStatusOfUser' ,  data:"status=user&userKey="+selectedType[0] ,async: false, success: function( data )
  				  {
				 	$("#voice-box").fadeIn();
				 	document.getElementById("statusMessage").innerHTML = "Changed the status User!";
    				document.getElementById("voice-box").setAttribute("status", "saved");
    				setTimeout("hideStatusMessage()", 1750);
  				  }
   			 });
		}
    }
    
	    		 $("#addNewTeam").live("click", function(){ 
	    			 
	    			 $("#teamInfo").append('<li><input type="text" id="teamName" onfocus="blank(this)" onblur="unblank(this)" value="New Team"/><span>0</span><div class="last"><div id="confirmTeamButton" class="addto_list" style="display: none;"><span  id="confirmNewTeam" class="grn_btn2">Save</span><span id="cancelNewTeam" class="grn_btn2 gry_btn">Cancel</span></div></li>');
	    			 $('#newTeamText').show();
	    			 $('#confirmTeamButton').show();
	    			 $('#addNewTeam').hide();
	    			 $('#teamName').focus();
	    			/* var addInputBox = '';//'<input type="text" class="search_input_box" name="addNewTeam" value="Team Name" id="teamName" onfocus="blank(this)" onblur="unblank(this)">';
	    			$("#addNewTeam").hide();
	    			var teamInform = $('#teamInfo').html();
	    			$('#teamInfo').html(teamInform + addInputBox);
	    		$("#confirmNewTeam").show();
	    		console.info("Going to add new team"); */
	    		
	    	}); 
	    		 
	    		 $("#cancelNewTeam").live("click", function(){ 
	    			 
	    			 $(this).parent().parent().parent().remove();
	    			 $('#newTeamText').hide();
	    			 $('#confirmTeamButton').hide();
	    			 $('#addNewTeam').show();
	    		 });
    		
    		//var addToExistingTeam = $('#teamInfo').html();
    		$("#confirmNewTeam").live("click", function(){
    			console.info($('#teamName').val());
    			console.info($("#teamInfo li").length);
    			var teamOrder = $("#teamInfo li").length - 2;
    			var newTeamName = $.trim($('#teamName').val());
    			$(this).parent().parent().parent().remove();
    			  $.ajax({  type: 'GET', url: '/addNewTeamToCompany' ,  data:"teamName="+newTeamName+"&teamOrder="+teamOrder,async: false, success: function( data )
    				  {
    				  if(data != null)
    					  {
    					  	  team_Details[data] = {"key":data,"teamName":$('#teamName').val(),"companyId":companyKey,"date":"","deleteFlag":"false","teamMembers":""};	
    					  	  console.info("teamInfo ::"+team_Details[data].key);
	    					  $('#teamName').hide();
	    					  var existingTeamLength = $('#teamInfo > li.droppable').length;
	    					  console.info("existingTeamLength ::"+existingTeamLength);
	    					  var addToExistingTeam = '<li onclick="showTeamMems(this)" class="droppable ui-widget-header ui-droppable" id="'+data+'">'+newTeamName+'<span>0</span></li>';
	    					  //console.info( $('#teamInfo').html());
	    					  //For adding at the last but first position
	    					  $('#teamInfo li:nth-child('+existingTeamLength+')').after(addToExistingTeam);
	    					 // $('#teamInfo').html(addToExistingTeam);
	    					  $('#addNewTeam').show();
	    					  $('#confirmNewTeam').hide();
	    					  $('#cancelNewTeam').hide();
	    					  $('#newTeamText').hide();
	    					  $("#voice-box").fadeIn();
	    					  document.getElementById("statusMessage").innerHTML = "Added a new team!";
		        				document.getElementById("voice-box").setAttribute("status", "saved");
		        				setTimeout("hideStatusMessage()", 1750);
		        				
		        				//Add now
		        				$(function() {
		        					console.info('Comes inside');
		        				    $( ".draggable" ).draggable({ revert: "invalid" ,
		        				    	revertDuration : 1000,
		        						helper : 'clone'});
		        				
		        				    $( ".droppable" ).droppable({
		        				    	 tolerance: 'pointer',
		        				        activeClass: "ui-state-hover",
		        				        hoverClass: "ui-state-active",
		        				        drop: function( event, ui ) {
		        				            var targetElem = $(this).attr("id");
		        				            /* var count = $(this ).find('span').html();
		        				            count= parseInt(count);
		        				            console.info("span ::"+count); */
		        				            var userIdDragged = ui.draggable[0].id;
		        				            console.info("draggable id ::"+ui.draggable[0].id);
		        				            $( this ).addClass( "ui-state-highlight" );
		        				                console.info(targetElem);
		        				                
		        				                $.ajax({  type: 'GET', url: '/editExistingTeam' ,  data:"userId="+ui.draggable[0].id + "&teamId="+$(this).attr("id") ,async: false, success: function( data )
		        				    				  {
		        				                			if(data.indexOf("Success") != -1)
		        				                				{
		        					                				for(indexUserId in team_Details)
		        						                			{
		        					                					console.info("targetElem ::"+targetElem + " index ::"+indexUserId);
		        						                				if(indexUserId.indexOf(targetElem) != -1)
		        						                					{
		        						                					console.info("comes inside" +(team_Details[indexUserId].teamMembers));
		        						                					var teamMemArray = new Array();
		        						                					if(team_Details[indexUserId].teamMembers != "" && team_Details[indexUserId].teamMembers.indexOf(",") != -1)
		        						                						{
		        						                						//console.info("Before adding to teamArary ::"+teamMemArray.length);
		        					                							teamMemArray = String(team_Details[indexUserId].teamMembers).split(",");
		        					                							//console.info("Ater adding to teamArary ::"+teamMemArray.length);
		        						                						}
		        						                					else if(team_Details[indexUserId].teamMembers != "")
		        						                						{
		        						                							//console.info("Before adding to teamArary ::"+teamMemArray.length);
		        						                							teamMemArray.push(String(team_Details[indexUserId].teamMembers));
		        						                							//console.info("After adding to teamArary ::"+teamMemArray.length);
		        						                						}
		        						                						console.info('Going to check user exists or not. Alredy in team ::'+team_Details[indexUserId].teamMembers+" userIdDragged ::"+userIdDragged + " true or flase "+(team_Details[indexUserId].teamMembers.indexOf(userIdDragged) == -1));
		        						                						if((team_Details[indexUserId].teamMembers.indexOf(userIdDragged) == -1))
		        						                						{
		        						                							console.info("The user is does not exists so adding them");
		        							                						console.info("Before adding ::"+team_Details[indexUserId].teamMembers+" teamMemArray.length::"+teamMemArray.length);
		        							                						teamMemArray.push(userIdDragged);
		        							                						team_Details[indexUserId].teamMembers = teamMemArray;
		        							                						var teamLength = String(team_Details[indexUserId].teamMembers);
		        							                						var temp = teamLength.split(",");
		        							                						console.info("temp ::"+temp);
		        							                						console.info("temp.length ::"+temp.length);
		        							                						console.info("After adding in team ::"+team_Details[indexUserId].teamMembers+" teamMemArray.length ::"+teamMemArray.length);
		        							                						$('#'+targetElem).find('span').html(temp.length);
		        							                						 $("#voice-box").fadeIn();
		        										                				document.getElementById("statusMessage").innerHTML = "Updated!";
		        												        				document.getElementById("voice-box").setAttribute("status", "saved");
		        												        				setTimeout("hideStatusMessage()", 1750);
		        												        				console.info("After showing the status boxs");
		        						                						}
		        						                						else
		        						                							{
		        							                							$("#voice-box").fadeIn();
		        										                				document.getElementById("statusMessage").innerHTML = "User already exists!";
		        												        				document.getElementById("voice-box").setAttribute("status", "saved");
		        												        				setTimeout("hideStatusMessage()", 1750);
		        												        				console.info("After showing the status boxs");
		        						                							}
		        						                					}
		        						                			}
		        					                				
		        				                				}
		        				                				
		        				    				  
		        				    				  }
		        				    				});
		        				        }
		        				});
		        				});
    					  }
    				  
    				  }
    		   			     
    		   	});
    			
    		});
    	
		$(function() {
			console.info('Comes inside');
		    $( ".draggable" ).draggable({ revert: "invalid" ,
		    	revertDuration : 1000,
				helper : 'clone'});
		
		    $( ".droppable" ).droppable({
		    	 tolerance: 'pointer',
		        activeClass: "ui-state-hover",
		        hoverClass: "ui-state-active",
		        drop: function( event, ui ) {
		            var targetElem = $(this).attr("id");
		            /* var count = $(this ).find('span').html();
		            count= parseInt(count);
		            console.info("span ::"+count); */
		            var userIdDragged = ui.draggable[0].id;
		            console.info("draggable id ::"+ui.draggable[0].id);
		            $( this ).addClass( "ui-state-highlight" );
		                console.info(targetElem);
		                
		                var membersTeamCount = String($("#allTeamMems li[id='"+userIdDragged+"'] > code:not(.drag_bar)").html()).replace("(","").replace(")","");
			           	$("#allTeamMems li[id='"+userIdDragged+"'] > code:not(.drag_bar)").html(" ("+(parseInt(membersTeamCount)+1)+")");
		                
		                $.ajax({  type: 'GET', url: '/editExistingTeam' ,  data:"userId="+ui.draggable[0].id + "&teamId="+$(this).attr("id") ,async: false, success: function( data )
		    				  {
		                			if(data.indexOf("Success") != -1)
		                				{
			                				for(indexUserId in team_Details)
				                			{
			                					console.info("targetElem ::"+targetElem + " index ::"+indexUserId);
				                				if(indexUserId.indexOf(targetElem) != -1)
				                					{
				                					console.info("comes inside" +(team_Details[indexUserId].teamMembers));
				                					var teamMemArray = new Array();
				                					if(team_Details[indexUserId].teamMembers != "" && team_Details[indexUserId].teamMembers.indexOf(",") != -1)
				                						{
				                						//console.info("Before adding to teamArary ::"+teamMemArray.length);
			                							teamMemArray = String(team_Details[indexUserId].teamMembers).split(",");
			                							//console.info("Ater adding to teamArary ::"+teamMemArray.length);
				                						}
				                					else if(team_Details[indexUserId].teamMembers != "")
				                						{
				                							//console.info("Before adding to teamArary ::"+teamMemArray.length);
				                							teamMemArray.push(String(team_Details[indexUserId].teamMembers));
				                							//console.info("After adding to teamArary ::"+teamMemArray.length);
				                						}
				                						console.info('Going to check user exists or not. Alredy in team ::'+team_Details[indexUserId].teamMembers+" userIdDragged ::"+userIdDragged + " true or flase "+(team_Details[indexUserId].teamMembers.indexOf(userIdDragged) == -1));
				                						if((team_Details[indexUserId].teamMembers.indexOf(userIdDragged) == -1))
				                						{
				                							console.info("The user is does not exists so adding them");
					                						console.info("Before adding ::"+team_Details[indexUserId].teamMembers+" teamMemArray.length::"+teamMemArray.length);
					                						teamMemArray.push(userIdDragged);
					                						team_Details[indexUserId].teamMembers = teamMemArray;
					                						var teamLength = String(team_Details[indexUserId].teamMembers);
					                						var temp = teamLength.split(",");
					                						console.info("After adding in team ::"+team_Details[indexUserId].teamMembers+" teamMemArray.length ::"+teamMemArray.length);
					                						$('#'+targetElem).find('span').html(temp.length);
					                						 $("#voice-box").fadeIn();
								                				document.getElementById("statusMessage").innerHTML = "Updated!";
										        				document.getElementById("voice-box").setAttribute("status", "saved");
										        				setTimeout("hideStatusMessage()", 1750);
										        				console.info("After showing the status boxs");
				                						}
				                						else
				                							{
					                							$("#voice-box").fadeIn();
								                				document.getElementById("statusMessage").innerHTML = "User already exists!";
										        				document.getElementById("voice-box").setAttribute("status", "saved");
										        				setTimeout("hideStatusMessage()", 1750);
										        				console.info("After showing the status boxs");
				                							}
				                					}
				                			}
			                				
		                				}
		                				
		    				  
		    				  }
		    				});
		        }
		});
		});
		
		function showTeamMems(teamNameSelected)
		{
			var teamInnerName = $(teamNameSelected).html();
			if(teamInnerName.indexOf("<span>") != -1)
				{
					teamInnerName = teamInnerName.split("<span>")[0];
				}
			console.info(teamInnerName);
			$('#team_title').html(teamInnerName);
			$('ul#teamInfo' ).children().each(function(){
				 var kid = $(this);
				 if($(this).hasClass('current'))
					 {
					 	$(this).removeClass('current');
					 }
				 
			 });
			$(teamNameSelected).addClass('current');
			var clickedTeamMembers = '';//'<li class="first">Title of the List</li>';
			for(indexTeam in team_Details)
			{
			 if(indexTeam.indexOf(teamNameSelected.id) != -1)
				{
				 var teamMems = String(team_Details[indexTeam].teamMembers);
				 console.info("teamMems ::"+teamMems);
				 var teamMemArray = new Array();
				 if(teamMems != "" && teamMems.indexOf(",") != -1)
					 {
				  		teamMemArray = teamMems.split(",");
				  		console.info("teamMemArray length ::"+teamMemArray.length);
					 }
				 else if(teamMems != "" && teamMems.length != 0)
					 {
					 	teamMemArray.push(teamMems); 
					 	console.info("teamMemArray length ::"+teamMemArray.length);
					 }
				 console.info("is array "+($.isArray(teamMemArray)))
				 
				  if($.isArray(teamMemArray))
					 { 
						 for(var i=0;i<teamMemArray.length; i++)
							 {
							 for(index in user_Details)
						   		{
								  if(teamMemArray[i].indexOf(index) != -1)
									  {
										  var teamCount = 0;
										  for(indexTeamArray in team_Details)
							   				{
							   					if(team_Details[indexTeamArray].teamMembers.indexOf(user_Details[index].key) != -1)
							   						{
							   						if(team_Details[indexTeamArray].teamName.indexOf("AllTeam") == -1)
								   						teamCount = teamCount + 1;
							   						}
							   				}
									  	console.info("user ::"+index+" teamMemArray::"+teamMemArray[i]);
									  	if(user_Details[index].type.indexOf("user")!= -1)
									  		clickedTeamMembers +=  '<li class="draggable" class="ui-widget-content"  id='+user_Details[index].key+'><code class="drag_bar"></code>'+user_Details[index].firstName+'&nbsp;&nbsp;' +user_Details[index].lastName+
									   		 '<code> ('+teamCount+') </code><div id="active_staus"><a class="" id="'+user_Details[index].key+'_admin" onclick="changeStatus(this,\''+teamInnerName+'\')">Admin</a><a class="user_active_btn" id="'+user_Details[index].key+'_user" onclick="changeStatus(this,\''+teamInnerName+'\')">User</a><img id="'+teamInnerName+'" style="margin-left:10px;margin-top: 4px; cursor:pointer;" onclick="javascript:return deleteTeamMem(this);" src="/images/delete_icon.gif" /></div></li>'; 
									  	else if(user_Details[index].type.indexOf("Admin")!= -1 || user_Details[index].type.indexOf("Company")!= -1)
									  	{
									  		if(user_Details[index].type.indexOf("Company")!= -1)
									  			{
									  			clickedTeamMembers += '<li class="draggable" class="ui-widget-content" id='+user_Details[index].key+'><code class="drag_bar"></code>'+user_Details[index].firstName +'&nbsp;&nbsp;' + user_Details[index].lastName +
										  		'<code> ('+teamCount+') </code><div id="active_staus" style="margin-right:28px;" ><a class="admin_active_btn" id="'+user_Details[index].key+'_admin" > Admin</a><a class="" id="'+user_Details[index].key+'_user" >User</a></div></li>';
									  			}
									  		else
									  		clickedTeamMembers += '<li class="draggable" class="ui-widget-content" id='+user_Details[index].key+'><code class="drag_bar"></code>'+user_Details[index].firstName +'&nbsp;&nbsp;' + user_Details[index].lastName +
									  		'<code> ('+teamCount+') </code><div id="active_staus" style="margin-right:28px;" ><a class="admin_active_btn" id="'+user_Details[index].key+'_admin" onclick="changeStatus(this,\''+teamInnerName+'\')"> Admin</a><a class="" id="'+user_Details[index].key+'_user" onclick="changeStatus(this,\''+teamInnerName+'\')">User</a></div></li>';
									  	}
									  }
						   		}
									
							 }
					  } 
					 
				
				}
			}
			$('#allTeamMems').html(clickedTeamMembers);
			 $( ".draggable" ).draggable({ revert: "invalid" ,
			    	revertDuration : 1000,
					helper : 'clone'});
			
			    $( ".droppable" ).droppable({
			    	 tolerance: 'pointer',
			        activeClass: "ui-state-hover",
			        hoverClass: "ui-state-active",
			        drop: function( event, ui ) {
			        	
			            var targetElem = $(this).attr("id");
			            var count = $(this ).find('span').html();
			            var userIdDragged = ui.draggable[0].id;
			            
			           	var membersTeamCount = String($("#allTeamMems li[id='"+userIdDragged+"'] > code:not(.drag_bar)").html()).replace("(","").replace(")","");
			           	$("#allTeamMems li[id='"+userIdDragged+"'] > code:not(.drag_bar)").html(" ("+(parseInt(membersTeamCount)+1)+")");
			           	
			            count= parseInt(count);
			            console.info("span ::"+count);
			            console.info("draggable id ::"+ui.draggable[0].id);
			            console.info("span ::"+$(this ).find('span').html());
			            $( this ).addClass( "ui-state-highlight" );
			                console.info(targetElem);
			                
			                $.ajax({  type: 'GET', url: '/editExistingTeam' ,  data:"userId="+ui.draggable[0].id + "&teamId="+$(this).attr("id") ,async: false, success: function( data )
			    				  {
			                		
			                	if(data.indexOf("Success") != -1)
                				{
			                		for(indexUserId in team_Details)
		                			{
	                					console.info("targetElem ::"+targetElem + " index ::"+indexUserId);
		                				if(indexUserId.indexOf(targetElem) != -1)
		                					{
		                					console.info("comes inside" +(team_Details[indexUserId].teamMembers));
		                					var teamMemArray = new Array();
		                					if(team_Details[indexUserId].teamMembers != "" && team_Details[indexUserId].teamMembers.indexOf(",") != -1)
		                						{
		                						//console.info("Before adding to teamArary ::"+teamMemArray.length);
	                							teamMemArray = String(team_Details[indexUserId].teamMembers).split(",");
	                							//console.info("Ater adding to teamArary ::"+teamMemArray.length);
		                						}
		                					else if(team_Details[indexUserId].teamMembers != "")
		                						{
		                							//console.info("Before adding to teamArary ::"+teamMemArray.length);
		                							teamMemArray.push(String(team_Details[indexUserId].teamMembers));
		                							//console.info("After adding to teamArary ::"+teamMemArray.length);
		                						}
		                						console.info('Going to check user exists or not. Alredy in team ::'+team_Details[indexUserId].teamMembers+" userIdDragged ::"+userIdDragged + " true or flase "+(team_Details[indexUserId].teamMembers.indexOf(userIdDragged) == -1));
		                						if((team_Details[indexUserId].teamMembers.indexOf(userIdDragged) == -1))
		                						{
		                							console.info("The user is does not exists so adding them");
			                						console.info("Before adding ::"+team_Details[indexUserId].teamMembers+" teamMemArray.length::"+teamMemArray.length);
			                						teamMemArray.push(userIdDragged);
			                						team_Details[indexUserId].teamMembers = teamMemArray;
			                						var teamLength = String(team_Details[indexUserId].teamMembers);
			                						var temp = teamLength.split(",");
			                						console.info("temp ::"+temp);
			                						console.info("temp.length ::"+temp.length);
			                						console.info("After adding in team ::"+team_Details[indexUserId].teamMembers+" teamMemArray.length ::"+teamMemArray.length);
			                						$('#'+targetElem).find('span').html(temp.length);
			                						$("#voice-box").fadeIn();
			    			                		document.getElementById("statusMessage").innerHTML = "Updated!";
			    			        				document.getElementById("voice-box").setAttribute("status", "saved");
			    			        				setTimeout("hideStatusMessage()", 1750);
			    			        				console.info("After showing the status boxs");
		                						}
		                						else
	                							{
		                							$("#voice-box").fadeIn();
					                				document.getElementById("statusMessage").innerHTML = "User already exists!";
							        				document.getElementById("voice-box").setAttribute("status", "saved");
							        				setTimeout("hideStatusMessage()", 1750);
							        				console.info("After showing the status boxs");
	                							}
		                					}
		                			}
			                		
                				}
			                				
			    				  
			    				  }
			    				});
			        }
			});
			    
			    var mylist = $('ul#allTeamMems');
				 var listitems = mylist.children('li.draggable').get();
				 listitems.sort(function(a, b) {
				    var compA = $(a).text().toUpperCase();
				    var compB = $(b).text().toUpperCase();
				    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
				 })
				 $.each(listitems, function(idx, itm) { mylist.append(itm); });
		}
		
		function hideStatusMessage()
		  {
				if(document.getElementById("voice-box").getAttribute("status") == "saved")
				{
					$("#voice-box").fadeOut(300);
				}
		  }
		function searchTeam()
		{
			console.info("Comes inside");
			var searchval = $("#search").val();
			console.info("searchval ::"+searchval);
			$("#teamInfo li.droppable").hide();
			$('#newTeamText').hide();
	    	$("#teamInfo li.droppable:containsi('"+searchval+"')").show();
	    	
		} 
		function searchTeamMems()
		{
			var searchval = $("#search_mem").val();
			console.info("searchval ::"+searchval);
			$("#allTeamMems li").hide();
	    	$("#allTeamMems li:containsi('"+searchval+"')").show();
	    	//$("#newTeamText").hide();
		}
		
		
		var teamNewUser ="";
		$('#new_team_member').live("click",function()
				{
					$('#new_team_member').hide();
					$('#save_new_team_member').show();
					$('#cancel_new_team_member').show();
					teamNewUser = '<li id="li_add_new_user" class="draggable ui-draggable"> <input id="add_new_team_mem" type="text" value="New Team Member" onblur="unblank(this)" onfocus="blank(this)"/>'+
					'<span id="save_new_team_member" class="grn_btn grn_button_manage_team" >Send Request</span>'+
                    '<span id="cancel_new_team_member" class="grn_button_manage_team gry_btn" >Cancel</span></li>';
					$('#allTeamMems').append(teamNewUser);
					$("#allTeamMems").scrollTop($("#allTeamMems")[0].scrollHeight);
					
					$("#add_new_team_mem").focus();
				});

		
		$("#save_new_team_member").live("click",function(){
			
			var entered_emailids 		= String($('#add_new_team_mem').val()).split(",");
			
			var email_verifier 			= /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			
			var invalidEmailIdTest		= false;
			
			for(var i = 0; i < entered_emailids.length; i++ )
			{
				if(email_verifier.test($.trim(entered_emailids[i])))
				{
					invalidEmailIdTest	= true;
				}	
			}	
			
			if(invalidEmailIdTest)
			{
				$(".import_contacts > h2").html("Invite Contacts");
				
				emailIdVerifier(entered_emailids);
			}	
			else
			{
				$("#voice-box").fadeIn();
				document.getElementById("statusMessage").innerHTML="No valid Email Address";
				document.getElementById("voice-box").setAttribute("status", "saved");
				setTimeout("hideStatusMessage()", 1750);
			}	
			
			
			
			
			
			
// 			var email_verifier 			= /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			
// 			var contactsList 			= "";
// 			var tempVariable			= 0;
			
// 			var tempArray				= new Array();
// 			var existingingIdArray		= new Array();
			
// 			for(indexUserDetails in user_Details)
// 			{
// 				existingingIdArray.push(user_Details[indexUserDetails].userName);
// 			}
			
// 			if(entered_emailids.length > 1)
// 			{
// 				for(var i = 0;i<entered_emailids.length;i++)
// 				{
// 					if(tempArray.indexOf(entered_emailids[i]) === -1)
// 					{
// 						if(email_verifier.test(entered_emailids[i]))
// 						{
// 							if(existingingIdArray.indexOf(entered_emailids[i]) === -1 )
// 							{
// 								if(tempVariable === 0)
// 								{
// 									contactsList += '<tr><td class="contacts_data_style"><input type="checkbox" id="'+entered_emailids[i]+'" name="contactsMailId" value="'+entered_emailids[i]+'" /><label for="'+entered_emailids[i]+'">'+entered_emailids[i]+'</label></td>';
// 									tempVariable	= 1;
// 								}
// 								else if(tempVariable === 1)
// 								{
// 									contactsList += '<td class="contacts_data_style"><input type="checkbox" id="'+entered_emailids[i]+'" name="contactsMailId" value="'+entered_emailids[i]+'" /><label for="'+entered_emailids[i]+'">'+entered_emailids[i]+'</label></td></tr>';
// 									tempVariable	= 0;
// 								}	
								
// 							}
// 							else
// 							{
// 								if(tempVariable === 0)
// 								{
// 									contactsList	+= '<tr><td class="contacts_data_style" style="color:#09A5E3;"><img id="'+entered_emailids[i]+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+entered_emailids[i]+'">'+entered_emailids[i]+'</label></td>';
// 									tempVariable	= 1;
// 								}
// 								else if(tempVariable === 1)
// 								{
// 									contactsList	+= '<td class="contacts_data_style" style="color:#09A5E3;"><img id="'+entered_emailids[i]+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon" /><label for="'+entered_emailids[i]+'">'+entered_emailids[i]+'</label></td></tr>';
// 									tempVariable	= 0;
// 								}
// 							}	
// 						}
// 						else
// 						{
// 							if(tempVariable === 0)
// 							{
// 								contactsList	+= '<tr><td class="contacts_data_style" style="color:#F04C1A;"><img id="'+entered_emailids[i]+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+entered_emailids[i]+'">'+entered_emailids[i]+'</label></td>';
// 								tempVariable	= 1;
// 							}
// 							else if(tempVariable === 1)
// 							{
// 								contactsList	+= '<td class="contacts_data_style" style="color:#F04C1A;"><img id="'+entered_emailids[i]+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+entered_emailids[i]+'">'+entered_emailids[i]+'</label></td></tr>';
// 								tempVariable	= 0;
// 							}
// 						}
// 					}	
					
// 					tempArray.push(entered_emailids[i]);
// 				}
				
// 				if(tempVariable === 1)
// 				{
// 					contactsList += "</tr>";
// 				}	
// 			}
// 			else
// 			{
// 				if(email_verifier.test(entered_emailids[0]))
// 				{
// 					if(existingingIdArray.indexOf(entered_emailids[0]) === -1 && tempArray.indexOf(entered_emailids[0]) === -1)
// 					{
// 						contactsList	= '<tr><td class="contacts_data_style"><input type="checkbox" id="'+entered_emailids[0]+'" name="contactsMailId" value="'+entered_emailids[0]+'" /><label for="'+entered_emailids[0]+'">'+entered_emailids[0]+'</label></td></tr>';
// 						tempArray.push(entered_emailids[i]);
// 					}
// 					if(String(contactsList) === "")
// 					{
// 						contactsList	= '<tr><td class="contacts_data_style"  style="color:#09A5E3;"><img src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+entered_emailids[0]+'">'+entered_emailids[0]+'</label></td></tr>';
// 					}	
// 				}
// 				else
// 				{
// 					contactsList	= '<tr><td class="contacts_data_style" style="color:#F04C1A;"><img src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+entered_emailids[0]+'">'+entered_emailids[0]+'</label></td></tr>';
// 				}	
// 			}	
			
				
			
// 			$('#contacts_list').html(contactsList);
			
// 			$('#backgroundPopup').show();
// 		 	$('.import_contacts').show();
			
		});
		
		
		$('#cancel_new_team_member').live("click",function()
				{
					$('#new_team_member').show();
					$('#li_add_new_user').remove();
					$('#save_new_team_member').hide();
					$('#cancel_new_team_member').hide();
					$('#add_new_team_mem').hide();
					$('#add_new_team_mem').val("");
					$("#allTeamMems").scrollTop(0);
		});
		
		function emailIdVerifier(entered_emailids)
		{
			
			var email_verifier 			= /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			
			var contactsList 			= "";
			var tempVariable			= 0;
			
			var tempArray				= new Array();
			var existingingIdArray		= new Array();
			
			var existingIdInImport		= new Array();
			var invalidIdArray			= new Array();
			
			for(indexUserDetails in user_Details)
			{
				existingingIdArray.push(user_Details[indexUserDetails].userName);
			}
			
			if(String(entered_emailids) != "undefined")
			{
				if(entered_emailids.length > 1)
				{
					$('#backgroundPopup').show();
					for(var i = 0;i<entered_emailids.length;i++)
					{
						var emailIdEntered						= $.trim(entered_emailids[i]);
						if(tempArray.indexOf(emailIdEntered) === -1)
						{
							if(email_verifier.test(emailIdEntered))
							{
								if(existingingIdArray.indexOf(emailIdEntered) === -1)
								{
									if(tempVariable === 0)
									{
										contactsList += '<tr><td class="contacts_data_style"><input type="checkbox" id="'+emailIdEntered+'" name="contactsMailId" value="'+emailIdEntered+'" /><label style="position:relative;" for="'+emailIdEntered+'">'+emailIdEntered+'</label></td>';
										tempVariable	= 1;
									}
									else if(tempVariable === 1)
									{
										contactsList += '<td class="contacts_data_style"><input type="checkbox" id="'+emailIdEntered+'" name="contactsMailId" value="'+emailIdEntered+'" /><label style="position:relative;" for="'+emailIdEntered+'">'+emailIdEntered+'</label></td></tr>';
										tempVariable	= 0;
									}	
									
								}
								else if(existingIdInImport.indexOf(emailIdEntered) === -1)
								{
									existingIdInImport.push(emailIdEntered);
//	 								if(tempVariable === 0)
//	 								{
//	 									contactsList	+= '<tr><td class="contacts_data_style" style="color:#09A5E3;"><img id="'+emailIdEntered+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td>';
//	 									tempVariable	= 1;
//	 								}
//	 								else if(tempVariable === 1)
//	 								{
//	 									contactsList	+= '<td class="contacts_data_style" style="color:#09A5E3;"><img id="'+emailIdEntered+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon" /><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td></tr>';
//	 									tempVariable	= 0;
//	 								}
								}	
							}
							else if(invalidIdArray.indexOf(emailIdEntered) === -1)
							{
								invalidIdArray.push(emailIdEntered);
//	 							if(tempVariable === 0)
//	 							{
//	 								contactsList	+= '<tr><td class="contacts_data_style" style="color:#F04C1A;"><img id="'+emailIdEntered+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td>';
//	 								tempVariable	= 1;
//	 							}
//	 							else if(tempVariable === 1)
//	 							{
//	 								contactsList	+= '<td class="contacts_data_style" style="color:#F04C1A;"><img id="'+emailIdEntered+'" src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td></tr>';
//	 								tempVariable	= 0;
//	 							}
							}
						}	
						
						tempArray.push(emailIdEntered);
					}
					
					if(tempVariable === 1)
					{
						contactsList += "</tr>";
					}
					
					$('#contacts_list').html(contactsList);
// 					$('#existing_arrays').html(contactsList);
// 					$('#invalid_arrays').html(contactsList);
					
//		 			$('#backgroundPopup').show();
				 	$('.import_contacts').fadeIn();
				 	$(".select_all").trigger("click");
				}
				else
				{
					var emailIdEntered						= $.trim(entered_emailids[0]);
					
					if(email_verifier.test(emailIdEntered))
					{
						if(existingingIdArray.indexOf(emailIdEntered) === -1)
						{
							var selectedUsersList			= new Array();
							var userKeyList					= new Array();
							var userEntryKey				= "";
							
								
								
								if(String($.trim(emailIdEntered)) != "" && $.trim(emailIdEntered))
								{
									jQuery._uuidlet							= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
									userEntryKey 							= jQuery._uuidlet;
									
									var userEntryObject						= new Object();
									var userObject							= new Object();
									
									
									userEntryObject.key						= userEntryKey;
									userEntryObject.userName				= emailIdEntered;
									
									user_Details[userEntryKey]				= userEntryObject;
									
									userObject[userEntryKey]				= emailIdEntered;
									
									
									selectedUsersList.push(JSON.stringify(userObject));
									userKeyList.push(userEntryKey);
									
								}	
								
								
								$('#allTeamMems').append('<li id="'+userEntryKey+'" style="cursor:default;"><span style="margin-left:20px">'+emailIdEntered+'</span><img src="/images/delete_icon.gif" onclick="javascript:return deletePendingRequest(this);" style="margin-top: 4px; cursor:pointer;float:right;" id="'+emailIdEntered+'" /><div id="active_staus" style="margin-right:16px;">Request pending...</div></li>');		
								
							
							
							$('#contacts_list').html("");
							$('#backgroundPopup').fadeOut();
						 	$('.import_contacts').hide();
						 	$('#new_team_member').show();
							$('#li_add_new_user').remove();
							$('#save_new_team_member').hide();
							$('#cancel_new_team_member').hide();
							$('#add_new_team_mem').hide();
							$('#add_new_team_mem').val("");
							$("#allTeamMems").scrollTop(0);
							
							
							$.ajax({
								type		: 	'POST', 
								url			:	'/inviteNewUser' ,
								data		:	{emailId:String(selectedUsersList),userKeyList:String(userKeyList)}, 
								success		: 	function(data)
					     						{
			 										$("#voice-box").fadeIn();
			 										document.getElementById("statusMessage").innerHTML = "Email sent";
			 										document.getElementById("voice-box").setAttribute("status", "saved");
			 										setTimeout("hideStatusMessage()", 1750);
					     						}
					     		});
						}
						else
						{
							$("#voice-box").fadeIn();
							document.getElementById("statusMessage").innerHTML="Email Address already exists";
							document.getElementById("voice-box").setAttribute("status", "saved");
							setTimeout("hideStatusMessage()", 1750);
						}	
					}
					else
					{
						$("#voice-box").fadeIn();
						document.getElementById("statusMessage").innerHTML="In-valid Email Address";
						document.getElementById("voice-box").setAttribute("status", "saved");
						setTimeout("hideStatusMessage()", 1750);
					}	
					
					
// 					if(email_verifier.test(emailIdEntered))
// 					{
// 						if(existingingIdArray.indexOf(emailIdEntered) === -1 && tempArray.indexOf(emailIdEntered) === -1)
// 						{
// 							contactsList	= '<tr><td class="contacts_data_style"><input type="checkbox" id="'+emailIdEntered+'" name="contactsMailId" value="'+emailIdEntered+'" /><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td></tr>';
// 							tempArray.push(emailIdEntered);
// 						}
// 						if(String(contactsList) === "")
// 						{
// 							contactsList	= '<tr><td class="contacts_data_style"  style="color:#09A5E3;"><img src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td></tr>';
// 						}	
// 					}
// 					else
// 					{
// 						contactsList	= '<tr><td class="contacts_data_style" style="color:#F04C1A;"><img src="../images/cross_icon.png" alt="x" class="not_valid_icon"/><label for="'+emailIdEntered+'">'+emailIdEntered+'</label></td></tr>';
// 					}	
				}
			}	
		}
		
</script>

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
				<li id="userName"></li>
				<li id="account_menu"><a id="account_name" href="#"><%=(String) session.getAttribute("companyName")%></a>
					<ul id="companyslist">
					</ul>    </li>
				<li id="account_menu"><a href="#">My Account</a>
					<ul>
						<!-- <li id="my_details" onclick="openwin();"></li> -->
						<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See
									you soon!</span></a></li>
					</ul></li>
			</ul>
		</div>
		<!-- login_details -->
		<div id="header" class="admin_header">
			<div class="header_holder">
				<span id="company-name" style="cursor: default;"><%= (String)session.getAttribute("companyName") %></span>
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
				<li><a href="/addstuff">Manage Store</a></li>
				<li class="selected"><a href="/manageTeam">Manage Teams / Groups</a></li>
				<li><a href="/admin">Issue Badges</a></li>
				<li><a id="pending_req_badge" href="/approveBadge">Approve
						Badge Request</a></li>
				<li><a id="pending_req_stuff" href="/allStuffDetails">Approve
						Stuff from Store</a></li>


			</ul>
			<div class="admin_right_pannel">
				<div class="manageteam_content">
					<h2>Manage Teams / Groups</h2>
					<div class="left_cont">
						<div class="search_box">
							<code class="search_icon"></code>
							<input type="text" class="search_input_box" name="search"
								value="Search..." id="search" onkeyup="searchTeam()"
								onfocus="blank(this)" onblur="unblank(this)" />

							<div class="loading_list">
								<code></code>
							</div>
							<div class="search_list">
								<!--  <ul id="teamInfo">
                                <li>Kevin Payne</li>
                                <li>Kevin Payne</li>
                                <li>Kevin Payne</li>
    
                            </ul> -->
							</div>
						</div>

						<ul id="teamInfo">

							<!-- <li id= "all_team" class="current droppable ui-widget-header">All Team Members<span>5</span></li>
                    	<li>Adaptavant<span>2</span></li>
                    	<li>AnswerConnect<span>0</span></li> -->


						</ul>
						<!--                     <div id="newTeamText" class="addto_list" style="display:none;"><input type="text" id="teamName" onfocus="blank(this)" onblur="unblank(this)" value="New Team"/><span>0</span></div> -->
						<!--           			<div class="last"><div id="confirmTeamButton" class="addto_list" style="display: none;"><span  id="confirmNewTeam" class="grn_btn2">Save</span> -->
						<!--       	  			<span id="cancelNewTeam" class="grn_btn2 gry_btn">Cancel</span></div> -->
						<span id="addNewTeam" class="grn_btn2 add_team_act"
							style="display: block;">+ New Team</span>
						<div class="clear_all"></div>

						<!-- <div class="clear_all"></div>
                    <span id="addNewTeam" class="grn_btn2">+ New Team</span>
                    
                    <span id="confirmNewTeam" class="grn_btn2 add_team_act"  style="display:none">+ Add Team</span> -->
					</div>
					<!--left_cont -->
					<div class="right_cont">
						<div class="title">
							<h3 id="team_title">All Team Members</h3>
							<div class="search_box">
								<code class="search_icon"></code>
								<input type="text" class="search_input_box" name="search"
									value="Search..." id="search_mem" onkeyup="searchTeamMems()"
									onfocus="blank(this)" onblur="unblank(this)" />
								<div class="loading_list">
									<code></code>
								</div>
								<div class="search_list">
									<ul>
										<!-- <li>Kevin Payne</li>
                                    <li>Kevin Payne</li>
                                    <li>Kevin Payne</li> -->

									</ul>
								</div>
							</div>
						</div>
						<ul id="allTeamMems" class="dragable_list_act drag_list_cont">

							<!-- <li><code class="drag_bar"></code> Kevin <div id="active_staus"><a class="admin_active_btn">Admin</a><a class="">User</a></div></li>
                        <li><code class="drag_bar"></code> Madhavan <div id="active_staus"><a class="">Admin</a><a class="user_active_btn">User</a></div></li>
                        <li><code class="drag_bar"></code> Josh <div id="active_staus"><a class="admin_active_btn">Admin</a><a class="">User</a></div></li>
                        <li><code class="drag_bar"></code> Saranya <div id="active_staus"><a class="">Admin</a><a class="user_active_btn">User</a></div></li>
                        <li><code class="drag_bar"></code> John <div id="active_staus"><a class="admin_active_btn">Admin</a><a class="">User</a></div></li> -->

						</ul>

						<span id="new_team_member" class="grn_btn2">Invite a Team
							Member</span> 
<!-- 							<span  class="grn_btn2 gmail_invite_button">Invite Gmail Friends</span>  -->
							 <span  class="grn_btn2 facebook_invite_button">Invite Facebook Friends</span>
					</div>
				</div>
			</div>
		</div>
		<!--content-wrapper -->


		<div id="backgroundPopup">
			<div class="popup_holder import_contacts" style="overflow: auto;">
				<h2>Contacts From Gmail</h2>
				<span class = "close_contacts_invite">x</span>
				<span style="padding: 6px 8px 6px 8px;font-size: 12px;" class="gry_btn de_select_all">De-select All</span><span class="grn_btn2 select_all" style="padding: 6px 8px 6px 8px;margin-right: 10px;">Select All</span>
				<div class="btn_holder">
				<center>
				<div style="margin-top:60px;overflow: auto;height: 400px;">
					<table id="contacts_list">

					</table>
					
					<div id="existing_arrays"></div>
					<div id="invalid_arrays"></div>
				</div>	
				</center>	
					<div class="clear_all"></div>
					
					<input type='button'class='grn_btn2 send_user_invites' value='Send Request' style="float: right;margin-top: 6%;margin-right:0px;" />
					
				</div>
				<!-- <div style="font-weight: bold;margin-top: 6%;font-size: 12px;padding: 1px;">
					[ <span style="color: #808080;">Valid</span> /
					<span style="color: #09A5E3;">Existing</span> /
					<span style="color: #F04C1A;">Invalid</span> ]
					 Email Address
				</div> -->
				<!-- btn_holder -->
			</div>
		</div>
		<!-- backgroundPopup -->




		<!-- popup -->
		<!-- LoopTodo Feedback Form Code -->
	</div>
	<!-- wrapper -->
	
	
	<div class="remove_gmail_contacts_invite">
	
	 <script type="text/javascript">
	
			$(document).ready(function(){
				
				$(".gmail_invite_button").live("click",function(){
				
				$(".import_contacts > h2").html("Contacts from Gmail");
					
					$('#backgroundPopup').show();
					
					$.ajax({  
						 type		: 'GET', 
						 url		: '/getcontactdetailsfromgmail',
						 async		: true, 
						 success	: function( data )
						 			{
// // 										 var contactsList 		= "";
// // 										 var tempVariable		= 0;

// 										var entered_emailids		= new Array();
										
										
										 
// 										 for(index in data)
// 										 {
// 											 entered_emailids.push(index);
// 											 console.info("inside :: "+String(index))
// // 											if(tempVariable === 0)
// // 											{
// // 												contactsList += '<tr><td class="contacts_data_style"><input type="checkbox" id="'+index+'" name="contactsMailId" value="'+index+'" /><label for="'+index+'">'+index+'</label></td>';
// // 												tempVariable	= 1;
// // 											}
// // 											else if(tempVariable === 1)
// // 											{
// // 												contactsList += '<td class="contacts_data_style"><input type="checkbox" id="'+index+'" name="contactsMailId" value="'+index+'" /><label for="'+index+'">'+index+'</label></td></tr>';
// // 												tempVariable	= 0;
// // 											}	
// 										 }
										 
// 										 emailIdVerifier(entered_emailids);
										 
// // 										 $('#contacts_list').html(contactsList);
						  			}
				
					 	});  
				 
				 
// 				 	$('#backgroundPopup').show();
// 				 	$('.import_contacts').show();
					
				});
				
			});

		</script>
	</div>
	
	
	<div class="remove_facebook_contacts_invite">
	
	<script type="text/javascript">
	
	$(document).ready(function(){
		
		$(".facebook_invite_button").live("click",function(){
			
// 			var contactsList 		= "";

			$('#backgroundPopup').show();

			var tempVariable		= 0;
			var entered_emailids		= new Array();
			
			$.getJSON("https://graph.facebook.com/me/friends?access_token=<%=(String) session.getAttribute("facebookAccessToken")%>&limit=1000",function(facebook){
				
				$.each(facebook.data, function(i,facebookDetails){
					
					$.getJSON("https://graph.facebook.com/"+facebookDetails.id+"/?fields=username&access_token=<%=(String) session.getAttribute("facebookAccessToken")%>",function(user){
						
						
						d.push(user.username+"@facebook.com");
						tempVariable += 1;
						
						if(tempVariable === facebook.data.length)
						{
							emailIdVerifier(entered_emailids);
						}	
						
// 						if(user.username)
// 						{
// 							if(tempVariable === 0)
// 							{
// 								contactsList += '<tr><td class="contacts_data_style"><input type="checkbox" id="'+user_facebook_id+'" name="contactsMailId" value="'+user_facebook_id+'" /><label for="'+user_facebook_id+'">'+user_facebook_id+'</label></td>';
// 								tempVariable	= 1;
// 							}
// 							else if(tempVariable === 1)
// 							{
// 								contactsList += '<td class="contacts_data_style"><input type="checkbox" id="'+user_facebook_id+'" name="contactsMailId" value="'+user_facebook_id+'" /><label for="'+user_facebook_id+'">'+user_facebook_id+'</label></td></tr>';
// 								$('#contacts_list').html(contactsList);
// 								tempVariable	= 0;
// 							} 
// 						}	
					});
				});
			});
			
			
// 			$('#backgroundPopup').show();
// 		 	$('.import_contacts').show();
		 	
		});
		
		
	});

		</script>
	</div>
	
	<div id="backgroundPopup" style="z-index:99999"></div>
	<%@ include file="/jsp/feedbackLoopTodo.jsp" %>
	


</body>
</html>
