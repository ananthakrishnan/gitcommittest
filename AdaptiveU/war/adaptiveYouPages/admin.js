$.extend($.expr[':'], {
		'containsi': function (elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
		});

$(document).ready(function() 
	{
    $('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
	$('#pending_req_stuff').html("Approve Stuff Request ("+pendingReqObj.stuffCount+")"); 
   	
	var buildUserLi 		= "";
	var userImage	  		= "";
	for(indexUserBadgeDetails in userBadgelogMap)
		{
			for(indexUserDetails in userProfileMap)
				{
					if(indexUserBadgeDetails.indexOf(indexUserDetails) != -1)
						{
						 var badgesArray = new Array();
						 if(String(userBadgelogMap[indexUserBadgeDetails].badgeId).indexOf(",") != -1)
							 badgesArray = String(userBadgelogMap[indexUserBadgeDetails].badgeId).split(",");
						 else if(String(userBadgelogMap[indexUserBadgeDetails].badgeId) && String(userBadgelogMap[indexUserBadgeDetails].badgeId) !="")
							 badgesArray.push(String(userBadgelogMap[indexUserBadgeDetails].badgeId));
						 
						 var trophiesArray = new Array();
						 if(String(userBadgelogMap[indexUserBadgeDetails].trophyId).indexOf(",") != -1)
							 trophiesArray = String(userBadgelogMap[indexUserBadgeDetails].trophyId).split(",");
						 else if(String(userBadgelogMap[indexUserBadgeDetails].trophyId) && String(userBadgelogMap[indexUserBadgeDetails].trophyId) != "")
							 trophiesArray.push(String(userBadgelogMap[indexUserBadgeDetails].trophyId));

						 	 if(userProfileMap[indexUserDetails].profilePicture)
						 	 {
						 		userImage	  =  userProfileMap[indexUserDetails].profilePicture;
						 	 }
						 	 else
						 	 {
						 		userImage	  =  "../images/genral-photo.jpg";
						 	 }	 
						 	 
						 
							 buildUserLi  += '<li class="admin">'+
											 '<div class="person_name" onmouseover="dispemail(this)" onmouseout="disp2email(this)">'+
											 '<h3><a>'+userProfileMap[indexUserDetails].firstName+'</a><div id="tp_'+indexUserBadgeDetails+'" class="replaced_points">'+userBadgelogMap[indexUserBadgeDetails].points+'</div></h3>'+
											 '<h4 style="opacity:0">'+userProfileMap[indexUserDetails].firstName+' '+userProfileMap[indexUserDetails].lastName+'<br>'+
											 '<a href="mailto:'+userProfileMap[indexUserDetails].userName+'" style="color:#1284c6;text-decoration:none" target="_blank">'+userProfileMap[indexUserDetails].userName+'</a>'+
											 '</h4>'+
											 '<code><img height="42px" width="42px" src="'+userImage+'"></code>'+
											 '</div>'+
											 '<div class="points_wrapper" id="'+indexUserDetails+'">'+
											 '<div class="badges_count ui-droppable">'+
											 '<div class="badges_row" id="badges_row'+indexUserDetails+'">'+
											 '<span id="spnbg_'+indexUserDetails+'">'+badgesArray.length+'<code style="margin:0" class="badge_icon"></code></span>'+
											 '<ul id="userBadges" class="userBadgeTrophyClass">';
													for(indexUserStatusDetails in userStatusDetails)
													 	{
													 		if(String(userStatusDetails[indexUserStatusDetails].userId).indexOf(indexUserDetails) != -1 && String(badgesArray).indexOf(String(userStatusDetails[indexUserStatusDetails].stuffid)) != -1 && String(userStatusDetails[indexUserStatusDetails].status).indexOf('disapproved') == -1 && String(userStatusDetails[indexUserStatusDetails].status).indexOf('approved') != -1)
													 			  {
													 			  	 for(indexBadgeDetails in badgesListMap)
																	 {
													 			  		 if(indexBadgeDetails.indexOf(String(userStatusDetails[indexUserStatusDetails].stuffid)) != -1)
																	 			  	buildUserLi  += '<li id="'+indexUserStatusDetails+'_'+indexUserDetails+'" style="position: relative; " class="ui-draggable"><img src="'+badgesListMap[indexBadgeDetails].badgeLogoPath+'" id="'+indexBadgeDetails+'">'+
																	 			  	'<div class="badge-name toolTip" title="'+badgesListMap[indexBadgeDetails].badgeName+'">'+badgesListMap[indexBadgeDetails].badgeName+'</div></li>';
																	 }
													 		}
													 }
											 buildUserLi  += '</ul><div class="clear_all"></div></div>';
											 buildUserLi  += '<div class="badges_row" id="trophies_row'+indexUserDetails+'">'+
											 '<span id="spntr_'+indexUserDetails+'">'+trophiesArray.length+'<code style="margin:0" class="trophy_icon"></code></span>'+
											 '<ul id="userTrophies" class="userBadgeTrophyClass">';
											 for(indexUserStatusDetails in userStatusDetails)
											 	{
											 		if(String(userStatusDetails[indexUserStatusDetails].userId).indexOf(indexUserDetails) != -1 && String(trophiesArray).indexOf(String(userStatusDetails[indexUserStatusDetails].stuffid)) != -1 && String(userStatusDetails[indexUserStatusDetails].status).indexOf('disapproved') === -1 &&  String(userStatusDetails[indexUserStatusDetails].status).indexOf('approved') != -1)
											 			  {
															 for(indexTrophyBadgeDetails in badgesListMap)
															 {
															 	if(badgesArray.indexOf(indexTrophyBadgeDetails) != -1 || trophiesArray.indexOf(indexTrophyBadgeDetails) != -1 && String(badgesListMap[indexTrophyBadgeDetails].badgeType).indexOf('trophy') != -1)
															 	{
														 			if(indexTrophyBadgeDetails.indexOf(String(userStatusDetails[indexUserStatusDetails].stuffid)) != -1)
																 			buildUserLi  += '<li id="'+indexUserStatusDetails+'_'+indexUserDetails+'" style="position: relative; " class="ui-draggable"><img src="'+badgesListMap[indexTrophyBadgeDetails].badgeLogoPath+'" id="'+indexTrophyBadgeDetails+'">'+
																 			'<div class="badge-name toolTip" title="'+badgesListMap[indexTrophyBadgeDetails].badgeName+'">'+badgesListMap[indexTrophyBadgeDetails].badgeName+'</div></li>';
															 	}
															 }
											 			  }
											 	}
											 buildUserLi  += '</ul><div class="clear_all"></div></div></div>';
											 buildUserLi  += '<div class="clear_all"></div></div></li>';
						}
				}
		}
	
	
   $('#user_detailsUL').html(buildUserLi);
   
   $("#userBadges > li").draggable({
		
	 	revert : true, 
		start : function()
	 	{    		 	
	 		$( ".badges_list").css("border" , "dashed 1px #999999");
		}, 
		drag : function()
		{
			$( ".badges_list").css("border" , "dashed 1px #999999");
			$( ".person_list").scrollLeft(0);
			$( ".person_list").css("overflow-x","hidden");
		},
		stop : function()
		{
			$( ".badges_list").css("border" , "dashed 0px #999999");
		}
		

	});
   
   $( "#userTrophies > li").draggable({
	 	revert : true, 
	 	start : function()
	 	{

	 		$( ".trophy_list").css("border" , "dashed 1px #999999");
		},
		drag : function()
		{
			$( ".trophy_list").css("border" , "dashed 1px #999999");
			$( ".person_list").scrollLeft(0);
			$( ".person_list").css("overflow-x","hidden");
		},
		stop : function()
		{
			$( ".trophy_list").css("border" , "0px");
		}
		
	}); 
   	
   	
   	
   	 var userName = "";
   	
   	 for(index in userProfile)
   	  {
   		 userKey  = userProfile[index].key;
   		 userName = userProfile[index].userName;
   		 userFirstName = userProfile[index].firstName;
   		 userLastName = userProfile[index].lastName;
   	  } 
   	$('.welcome_username').html("Welcome, "+userFirstName +" "+ userLastName);  
   	var buildTotalBadgeLi = "";
   	for(indexBadgeDetails in badgesListMap)
   		{
   		if(String(badgesListMap[indexBadgeDetails].badgeType).indexOf("badge") != -1 && String(badgesListMap[indexBadgeDetails].badgeType).indexOf("deleted badge") == -1)
   			{
		   		buildTotalBadgeLi += '<li id="'+indexBadgeDetails+'" class="bg ui-draggable" onclick="displayUsersWorkingOnThis(\''+indexBadgeDetails+'\')">'+
	   			'<img src="'+badgesListMap[indexBadgeDetails].badgeLogoPath+'">'+
	   			'<div class="badge-name toolTip" title="'+badgesListMap[indexBadgeDetails].badgeName+'">'+badgesListMap[indexBadgeDetails].badgeName+'</div>'+
	   			'</li>'
   			}
   		}
   	$('#dbBadches').html(buildTotalBadgeLi);
   	var buildTotalTrophyLi = "";
	for(indexBadgeDetails in badgesListMap)
		{
		if(String(badgesListMap[indexBadgeDetails].badgeType).indexOf("trophy") != -1)
			{
			buildTotalTrophyLi += '<li id="'+indexBadgeDetails+'" class="tr ui-draggable" onclick="displayUsersWorkingOnThis(\''+indexBadgeDetails+'\')">'+
   			'<img src="'+badgesListMap[indexBadgeDetails].badgeLogoPath+'">'+
   			'<div class="badge-name toolTip" title="'+badgesListMap[indexBadgeDetails].badgeName+'">'+badgesListMap[indexBadgeDetails].badgeName+'</div>'+
   			'</li>'
			}
		}
	$('#dbTrophies').html(buildTotalTrophyLi);
   	
   	 $( "#dbBadches > li").draggable({
				revert : true,
				revertDuration : 2,
				helper : 'clone'
				
		 });
   	 
   	$( ".badges_list").droppable({
		    accept: "#userBadges > li",
		    drop : function(event, ui)	
		     {
		    	var badgeVal;
		    	var badgeType;
		    	var particularUser 			=	ui.draggable[0].id.split("_")[1];
		    	var userStatusDetailsKey	=	ui.draggable[0].id.split("_")[0];
		    	var droppedElementID 		= 	ui.draggable.find('img').attr("id");console.log(ui);
		    	for(index in badgesListMap)
			      	{
				       if(index.indexOf(droppedElementID) != -1)
				        {
				         badgeVal = badgesListMap[index].badgeValue;
				         badgeType = badgesListMap[index].badgeType;
				        }
			      	}
			     	ui.draggable.remove();
			     	$( ".badges_list").css("border" , "none");
			     	console.log("particularUser ::"+ui.draggable[0].id);
			     	 $.ajax({type: 'GET', url: "/deleteBadgeLogJDO?userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+droppedElementID+"&userId="+particularUser+"&badgeVal="+badgeVal+"&badgeType="+badgeType, success: function(result)
				 			{ 
				 		//Changes made now
		    		  	if(badgeType.indexOf("badge") != -1)
		    		  		{
		    		  			var badgesCount = parseInt($('#spnbg_'+userKey).html());
		    		  			badgesCount = badgesCount - 1;
		    		  			$('#spnbg_'+userKey).html(badgesCount+  '<code class="badge_icon" style="margin:0"></code>');
		    		  		}
		    		  		
		    		  	else if(badgeType.indexOf("trophy") != -1)
		    		  		{
			    		  		var trophiesCount 	= parseInt($('#spntr_'+userKey).html());
			    		  		trophiesCount 		= trophiesCount - 1;
		    		  			$('#spntr_'+particularUser).html(trophiesCount+  '<code class="trophy_icon" style="margin:0"></code>');
		    		  		}
		    		  		
				        var spanTotal = parseInt($("#tp_"+particularUser).html());
				        spanTotal = spanTotal - badgeVal;
				        $("#tp_"+particularUser).html(spanTotal);
				 			}
			     }); 	
		     }
		    
		   }); 
   		 
		 
   	 $( "#dbTrophies > li").draggable({
				revert : true,
				revertDuration : 2,
				helper : 'clone'
				
		 });
   	 $( ".trophy_list").droppable({
		    accept: "#userTrophies > li",
		    drop : function(event, ui)
		     {
		    	var particularUser = ui.draggable[0].id;
		    	var userKey = String(ui.draggable[0].id).split("_")[1];
		    	var userStatusDetailsKey = String(ui.draggable[0].id).split("_")[0];
		    	var droppedElementID =ui.draggable.find('img').attr("id");
		     	ui.draggable.remove();
		     	for(indexBadgeDetails in badgesListMap)
			      {
			       if(indexBadgeDetails.indexOf(droppedElementID) != -1)
			        {
			         badgeVal = badgesListMap[indexBadgeDetails].badgeValue;
			         badgeType = badgesListMap[indexBadgeDetails].badgeType;
			        }
			      }
			     $( ".badges_list").css("border" , "none");
			     console.log('delete ::'+particularUser);
			     $.ajax({type: 'GET', url: "/deleteBadgeLogJDO?userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+droppedElementID+"&userId="+userKey+"&badgeVal="+badgeVal+"&badgeType="+badgeType, success: function(result)
			    			 { 
			    		  //Changes made now
			    		  	if(badgeType.indexOf("badge") != -1)
			    		  		{
			    		  			var badgesCount = parseInt($('#spnbg_'+userKey).html());
			    		  			badgesCount = badgesCount - 1;
			    		  			$('#spnbg_'+userKey).html(badgesCount+  '<code class="badge_icon" style="margin:0"></code>');
			    		  		}
			    		  		
			    		  	else if(badgeType.indexOf("trophy") != -1)
			    		  		{
				    		  		var trophiesCount 	= parseInt($('#spntr_'+userKey).html());
				    		  		trophiesCount 		= trophiesCount - 1;
			    		  			$('#spntr_'+userKey).html(trophiesCount+  '<code class="trophy_icon" style="margin:0"></code>');
			    		  		}
			    		  		
					        var spanTotal = parseInt($("#tp_"+userKey).html());
					        spanTotal = spanTotal - badgeVal;
					        $("#tp_"+userKey).html(spanTotal);
			    			 }
			    			 });
		     },
		     stop : function(event, ui)
			    {
			    	$( ".trophy_list").css("border" , "0px");
			    }
		   });
   	
   	 
		 $(".badges_count").droppable({
			 accept: ".btList > li",
			 drop : function(event, ui)
			 {
						 var particularUser 		= 	$(this).parent().attr("id");
						 var droppedElementID		=	ui.draggable[0].id;
						 var droppedElementClass	=	ui.draggable[0].className;
						 var badgeVal 				= 	"";
						 var badgeType 				= 	"";
						 
						 for(index in badgesListMap)
							 {
							 	if(index.indexOf(droppedElementID) != -1)
							 		{
							 			badgeVal = badgesListMap[index].badgeValue;
							 			badgeType = badgesListMap[index].badgeType;
							 		}
							 }
						 $.ajax({type: 'GET', url: "/updateUserStatusDetailsFromAdmin?badgeId="+droppedElementID+"&userKey="+particularUser+"&badgeVal="+badgeVal+"&badgeType="+badgeType, success: function(result)
							{
									 if(droppedElementClass.indexOf("bg")!=-1)
									 {
									 	$('#badges_row'+particularUser).find('ul#userBadges').append('<li id=\"'+result+'_'+particularUser+'\"> <img id='+droppedElementID+' src='+ui.draggable.find("img").attr("src").replace("=s70","=s25")+'></img><div class=\"badge-name toolTip\">'+ui.draggable.find("div").html()+'</div></li>');
									 }
									 else if(droppedElementClass.indexOf("tr")!=-1)
									 {
										 $('#trophies_row'+particularUser).find('ul#userTrophies').append('<li id="'+result+'_'+particularUser+'"> <img id='+droppedElementID+' src='+ui.draggable.find("img").attr("src").replace("=s70","=s25")+'></img><div class=\"badge-name toolTip\">'+ui.draggable.find("div").html()+'</div></li>');
									 }
									 if(badgeType.indexOf('badge') != -1)
										 {
											 var badgeTotal = parseInt($('#spnbg_'+particularUser).html());
											 badgeTotal = badgeTotal + 1;
											 $('#spnbg_'+particularUser).html(badgeTotal+  '<code class="badge_icon" style="margin:0"></code>');
										 }
									 if(badgeType.indexOf('trophy') != -1)
									 {
										 var trophyTotal = parseInt($('#spntr_'+particularUser).html());
										 trophyTotal = trophyTotal + 1;
										 $('#spntr_'+particularUser).html(trophyTotal+  '<code class="trophy_icon" style="margin:0"></code>');
									 }
									 var spanTpInner = parseInt($("#tp_"+particularUser).html());
									 $("#tp_"+particularUser).html(spanTpInner + badgeVal) ;
									 
									 bindUserBadgesDraggable();
									 bindUserTrophiesDraggable();
							}
						 });
						//These functions are called to invoke the draggable feature for the created trophies
						 bindUserBadgesDraggable();
						 bindUserTrophiesDraggable();
						 
						 $.ajax({type: 'POST', url: '/sendMailToUser' ,data:"badgeId="+droppedElementID+"&userId="+particularUser+"&badgeAssigneId="+userKey, success: function(data)
								{
									$("#voice-box").fadeIn();
									document.getElementById("statusMessage").innerHTML = "Email Sent!";
									document.getElementById("voice-box").setAttribute("status", "saved");
									setTimeout("hideStatusMessage()", 1750);
									$('#backgroundPopup').hide();
								}
							 }); 
			 }
		 });
		 
//		 $('#header').hover(
//				 
//	   				function()
//	   				{
//			  			$("#company-name").hide();
//			  			$('#edit_Company_Name').show().attr("style",'margin-left:-1px;').val(bannerCompanyName);
//	   				},
//	   				function()
//	   				{
//	   					$("#company-name").show();
//			  			$('#edit_Company_Name').hide();
//		  			
//						var editedCompanyName			= $.trim($('#edit_Company_Name').val());
//						var oldCompanyName				= $.trim($('#company-name').html());
//						
//						if(String(editedCompanyName) != String(oldCompanyName) && String(editedCompanyName) != "")
//						{
//							
//							bannerCompanyName 		= editedCompanyName;
//							$('#edit_Company_Name').val(editedCompanyName);
//							$('#account_name').html(editedCompanyName);
//							$('#company-name').html(editedCompanyName);
//							
//							$.ajax({
//						   			type: "POST",
//						   			url: "/editCompanyName",
//						   			data: {editCompanyName: editedCompanyName},
//									success: function(){}
//						   	});
//						}	
//					   	
//	   				}
//	   	 ); 
		 
		 
		 $("#update_company_name").live("blur",function(){
			 
//			 	$(this).css("border","0px")	 
			  
				 var company_name_to_update			= $.trim($(this).val());
				 
				 if(String(company_name_to_update) != "" && String(company_name_to_update) != String($.trim($("#account_name").html())))
				 {
					 $('#account_name').html(company_name_to_update);
					 
					 $.ajax({
						
						 type		: "POST",
						 url		: "/companyNameChanger",
						 data		: {newCompanyName:company_name_to_update},
						 success	: function()
						 			  {
							 				
						 			  }
					 });
				 }	 
				 
			  });
		 
		 	$("#update_company_name").live("focus",function(){
			  
		 		
			 
		 	});
		 	
//		 	$(".admin_header").hover(
//		 		function(){
//		 			$("#update_company_name").css({"border":"1px dashed #6B7E84","margin-left":"0px"});
//		 		},
//		 		function(){
//		 			$("#update_company_name").css({"border":"0px","margin-left":"-10px"});
//		 		}
//		 	);
		 
		 
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
     	
	function searchCustomer()
    {
    	var searchId = $("#search_cus").val();
   		console.log("searchId ::"+searchId);
    	$("#user_detailsUL li.admin").hide();
    	$("#user_detailsUL li:containsi('"+searchId+"')").show();
    }
    function hideStatusMessage(){
		if(document.getElementById("voice-box").getAttribute("status") == "saved"){
			$("#voice-box").fadeOut(300);
		}
	}
    
    //This function is called after dropping a badge in to user's profile
    function bindUserBadgesDraggable()
    {
    	 $("#userBadges > li").draggable({
    			
    		 	revert : true, 
    			start : function()
    		 	{    		 	
    		 		$( ".badges_list").css("border" , "dashed 1px #999999");
    			}, 
    			drag : function()
    			{
    				$( ".badges_list").css("border" , "dashed 1px #999999");
    				$( ".person_list").scrollLeft(0);
    				$( ".person_list").css("overflow-x","hidden");
    			},
    			stop : function()
    			{
    				$( ".badges_list").css("border" , "dashed 0px #999999");
    			}
    			

    		});
    }
    
    //This function is called after dropping a trophy in to user's profile
    function bindUserTrophiesDraggable()
    {
    	$( "#userTrophies > li").draggable({
    	 	revert : true, 
    	 	start : function()
    	 	{

    	 		$( ".trophy_list").css("border" , "dashed 1px #999999");
    		},
    		drag : function()
    		{
    			$( ".trophy_list").css("border" , "dashed 1px #999999");
    			$( ".person_list").scrollLeft(0);
    			$( ".person_list").css("overflow-x","hidden");
    		},
    		stop : function()
    		{
    			$( ".trophy_list").css("border" , "dashed 0px #999999");
    		}
    		
    	}); 
    }
    
    function hidePopup(elemID) {
    	$("#"+elemID).hide();
    	$("#backgroundPopup").hide();
    }

    function showPopup(elemID)
    {
    	$("#"+elemID).show();
    	$("#backgroundPopup").show();
    }
    
    function showContent(elemID)
    {
    	if(!($(elemID).next().is(":visible")))
    			{
			    	$(elemID).parent().addClass('toggle');
			    	$(elemID).next().show();
    			}
    	else
    		{
    			$(elemID).parent().removeClass('toggle');
    			$(elemID).next().hide();
    		}
    }
    	function closePopup(popup)
    	{
    		$(popup).parent().hide();
    		$('#backgroundPopup').hide();
    	}
    	
    	  $(document).ready(function()
    		{
				var companyListli = "";
			    for(index in companyList)
			    {
			     companyListli+='<li style="cursor:pointer;"  id="'+index+'" ><a onClick="changeCompany(\''+index+'\');"><span>'+companyList[index]+'<span></a></li>';
			    }
			    if(companyListli != "")
			    	{
			   			 $('#companyslist').append(companyListli);
			    	}
			    else
			    	{
			    		$('#account_menu').removeAttr("id");
			    	}
			   
			    $('#account_name').html(bannerCompanyName);
//			    $('#company-name').html(bannerCompanyName);
		  });
    
    	  function changeCompany(keyIndex)
    	  {
    	   window.location.href="/intermediateCheck?companyKey="+keyIndex;
    	  }


    	  function displayUsersWorkingOnThis(idOfTheElement,badgeName)
        {
        	var buildUsersWorkingOn = '<div>';
        	var userPresentOrNot = false;
        	var typeNameandType = "";
        	for(index in userStatusDetails)
        	{
        		if(String(userStatusDetails[index].stuffid).indexOf(idOfTheElement) != -1 && userStatusDetails[index].status.indexOf("working on") != -1)
        		{ 
        			for(indexuserDetails in userProfileMap)
                	{
        				if(indexuserDetails.indexOf(String(userStatusDetails[index].userId)) != -1)
        				{
        					for(indexBadgeDetails in badgesListMap)
        					{	
        						if(indexBadgeDetails.indexOf(idOfTheElement) != -1)
        						{
        							if(userProfileMap[indexuserDetails].profilePicture && String(userProfileMap[indexuserDetails].profilePicture) != "")
    	        					{
    	        						buildUsersWorkingOn += '<p class="imageNameWrapper"><img height="87px;" width="87px;" src ="'+userProfileMap[indexuserDetails].profilePicture+'" style="border: 1px solid lightgrey;border-radius: 4px 4px 4px 4px;"/><br><span style="display:block;margin-top:6px;">'+userProfileMap[indexuserDetails].firstName+'</span></p>';	
    	        					}
    	        						
    	        					else
    	        					{
    	        						buildUsersWorkingOn += '<p class="imageNameWrapper"><img height="87px;" width="87px;" style="border: 1px solid lightgrey;border-radius: 4px 4px 4px 4px;" src ="/images/genral-photo.jpg"/><br><span style="display:block;margin-top:6px;">'+userProfileMap[indexuserDetails].firstName+'</span></p>';
    	        					}
    	        					typeNameandType = badgesListMap[indexBadgeDetails].badgeName+" "+badgesListMap[indexBadgeDetails].badgeType;	
        						}
        					}
        					userPresentOrNot = true;
        				}
                	}
        		} 
        	}
        	
        		buildUsersWorkingOn += '</div>';
            		
        		if(userPresentOrNot)
        		{
        			$("#usersWorkingOn").html(buildUsersWorkingOn);
        			$('#assigingBadgeName').html(typeNameandType)
            		$("#backgroundPopup").show();
            		$("#userWorking").fadeIn();	
        		}
        		else
        		{
        			$("#voice-box").fadeIn();
    				document.getElementById("statusMessage").innerHTML = "Currently no users were working on this!";
    				document.getElementById("voice-box").setAttribute("status", "saved");
    				setTimeout("hideStatusMessage()", 1750);
        		}
        	}
      	
      	function close_WorkingOn_Popup()
      	{
      		$("#usersWorkingOn").html("");
      		$("#backgroundPopup").fadeOut();
      		$("#userWorking").hide();
      	}
      	
      	function blank(a) { if(a.value == a.defaultValue) a.value = ""; }
        function unblank(a) { if(a.value == "") a.value = a.defaultValue; }