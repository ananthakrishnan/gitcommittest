//Added for case sensitive search
	$.extend($.expr[':'], {
	'containsi': function (elem, i, match, array) {
	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
	});
	
	//Added for sorting the list
	jQuery.fn.sort = function() {
    return this.pushStack( [].sort.apply( this, arguments ), []);
	}; 
	
 	$(document).ready(function()
 	{
    	$('.user_person_name').html(userFirstName);  
    	$('.welcome_username').html("Welcome, "+userFirstName +" "+userLastName);
//    	$('#company-name').html(bannerCompanyName);
    	
    	for(indexUserProfile in singleUserProfile)
    		{
	    		if(String(singleUserProfile[indexUserProfile].type).indexOf("Admin") != -1 || String(singleUserProfile[indexUserProfile].type).indexOf("Company") != -1)
		    		{
		    			$('.adminpanel').show();
		    		}
	    		else
	    			{
	    				$('.adminpanel').hide();
	    			}
    		}
    	
    		for(indexManageTeam in teamManageUser)
			{
    			if(teamManageUser[indexManageTeam].teamName.indexOf("AllTeam") != -1)
    				$('#teamNameSearch').append('<option id="'+teamManageUser[indexManageTeam].key+'" value="All Team" selected="selected" >All Teams</option>');
    			else
    				$('#teamNameSearch').append('<option id="'+teamManageUser[indexManageTeam].key+'" value="'+teamManageUser[indexManageTeam].teamName+'" >'+teamManageUser[indexManageTeam].teamName+'</option>'); //onclick="displayTeamMembs(this)"
    			
			}

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
		    $('#account_name').html(bannerCompanyName);
		    
		  
		    
		    
		    //Added for new design
		    var buildUserDiv 			= "";
		    var othersProfilePicture	= "";
		    for(indexUserBadgeDetails in userBadgeLogJdoMap)
	    	{
	    		for(indexUserDetails in userProfileMap)
	    			{
	    				if(indexUserDetails.indexOf(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId)) != -1)
	    					{
		    					var onlyBadgeArray = new Array();
					    		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).indexOf(",") != -1)
					    			{
					    				onlyBadgeArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).split(",");
					    			}
					    		else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId))
					    			{
					    				onlyBadgeArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId));
					    			}
					    		
					    		var onlyTrophyArray = new Array();
					    		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).indexOf(",") != -1)
					    			{
					    				onlyTrophyArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).split(",");
					    			}
					    		else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId))
					    			{
					    				onlyTrophyArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId));
					    			}
					    		if(userProfileMap[indexUserDetails].profilePicture && String(userProfileMap[indexUserDetails].profilePicture) != "" && String(userProfileMap[indexUserDetails].profilePicture) != "undefined")
					    		{
					    			othersProfilePicture		= userProfileMap[indexUserDetails].profilePicture;
					    		}
					    		else
					    		{
					    			othersProfilePicture		= "../images/genral-photo.jpg";
					    		}	
	    						buildUserDiv += '<div class="userholder"><div class="userdetail" id="'+indexUserDetails+'">'+
								'<div class="image">'+
									'<img style="display:block;height:40px;width:40px;" src="'+othersProfilePicture+'"></img>'+
								'</div>'+
								'<div class="details">'+
									'<h4><a title="'+userProfileMap[indexUserDetails].firstName+" "+userProfileMap[indexUserDetails].lastName+'" id="'+indexUserDetails+'" class="profileName" onclick="showUserInfo(this)" style="cursor:pointer;color:black;text-transform:capitalize;">'+userProfileMap[indexUserDetails].firstName +'</a></h4>'+
									'<div class="badge" style="margin-top:6px;">'+
									'<span>'+
										'<span class="total" title="Points" style="float: left;min-width: 30px; border: 1px solid #D8D8D8;margin: 5px 0 0 -5px;position: absolute;text-align: center; padding: 8px 6px;cursor:default;">'+userBadgeLogJdoMap[indexUserBadgeDetails].points+'</span>'+
									'</span>'+
									'<span>'+
										'<span class="badge_count" style="float: left; margin: 8px 0 0 50px;padding: 5px 2px;border-radius: 15px 15px 15px 15px;background-color: #E8E8E8 ;position: absolute;text-align: center; width: 18px;cursor:default;border: 2px solid lightgray;" title="Badge">'+onlyBadgeArray.length+'</span>'+
									'</span>'+
									'<span>'+
									'<span class="trophy_count" style="float: left; margin: 8px 0 0 80px;padding: 5px 2px;border-radius: 15px 15px 15px 15px;background-color: #D0D0D0  ;position: absolute;text-align: center; width: 18px;cursor:default;border: 2px solid lightgray;" title="Trophy">'+onlyTrophyArray.length+'</span>'+
								'</div>'+
								'</div>'+
							'</div>'+
								'<div class="userbadge">'+
	    						'<ul id="badgelist">';
	    						
	    						for(var i=0;i<onlyBadgeArray.length; i++)
				    			{
			    							for(indexBadgeDetails in badgeDetails)
					    					{
					    						if(String(indexBadgeDetails).indexOf(onlyBadgeArray[i]) != -1 )
					    							{
					    								buildUserDiv += '<li title="'+badgeDetails[indexBadgeDetails].badgeName+'" id='+indexBadgeDetails+' onclick="displayBadgeDetail(this)"><img style="height:35px;width:35px;cursor:pointer" src="'+badgeDetails[indexBadgeDetails].badgeLogoPath+'"></li>';
					    							}
					    					}
				    			}
	    						buildUserDiv +='</ul>'+
	    					'</div>'+
	    					'<div class="clear"></div>'+
	    					'</div>';
	    						
	    					}
	    			}
	    	}
		    $('.userlist').html(buildUserDiv);
		    //Changes for new design ends here
		    
		    
		    
		    var myPointsList = $('.userlist');
		    var listPointItems = myPointsList.children('div').find('span.total').get();
		    var listPointLi = myPointsList.children('div').get();
		    listPointItems.sort(function(a, b) {
		    		var compA = parseInt($(a).text());
		    		var compB = parseInt($(b).text());
		    	   return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
			    })
		    $.each(listPointItems, function(idx, itm) 
		    	{
			    	myPointsList.append($(itm).parent().parent().parent().parent().parent());
		    	});
		    
		    
		    
		    
			var body_win_height = parseInt(document.body.clientHeight) ;
			var win_height = parseInt(window.innerHeight) ;
			if( body_win_height > win_height) 
			{
				$('#backgroundPopup').height(body_win_height);
			} else {
				$('#backgroundPopup').height(win_height);
			}
			$(".userbadge > ul li,.badge_count,.total,.trophy_count").tipTip({defaultPosition : "bottom"});
			$(".details h4").find("a").tipTip({defaultPosition : "right"});
			$(".userbadge > ul li,img,").live("mouseover",function(){
				$(this).find("span,img").tipTip({defaultPosition : "bottom"});
			});
			$(".details h4").find("a").live("mouseover",function(){
				$(this).tipTip({defaultPosition : "right"});
			});
			
			$(".popup_img,.mem_of_badge").find("img").tipTip({defaultPosition : "bottom"});
			
			$("#total_badges li,#total_stuff li,#total_trophies li,.popup_img,.mem_of_badge").live("mouseover",function(){
				
				$(this).find("img").tipTip({defaultPosition : "bottom"});
			});
			
			$(".badge_count,.total,.trophy_count").live("mouseover",function(){
				
				$(this).tipTip({defaultPosition : "bottom"});
				
			});
			
			
			$("#total_badges li,#total_trophies li").live("click",function(){
				
				displayBadgeDetail(this);
				
			});
			
 	});
 	
 	
 	$("#additionalSeachOptions").live("change",function(){
 		
 		if(String($(this).val()) === "name")
 		{
 			var mylist 				= $('.userlist');
 		    var listitems 			= mylist.children('div').find('a.profileName').get();
 		    listitems.sort(function(a, b) {
 		    	var compA = (String($(a).text()).toLowerCase());
 	    		var compB = (String($(b).text()).toLowerCase());
 	    	    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
 		    });
 		    $.each(listitems, function(idx, itm) { mylist.append($(itm).parent().parent().parent().parent()); });
 		}
 		else if(String($(this).val()) === "points" || String($(this).val()) === "options")
 		{
 			var myPointsList 		= $('.userlist');
 		    var listPointItems 		= myPointsList.children('div').find('span.total').get();
 		    var listPointLi 		= myPointsList.children('div').get();
 		    listPointItems.sort(function(a, b) {
 		    		var compA = parseInt($(a).text());
 		    		var compB = parseInt($(b).text());
 		    	    return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
 			});
 		    $.each(listPointItems, function(idx, itm) 
 		    {
 			    	myPointsList.append($(itm).parent().parent().parent().parent().parent());
 		    });
 		}
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
	
 	//Team Info added for new design
 	function displayTeamMembs(teamId)
 	{
 		$('.userlist').empty();
 		var team_id = $('#'+teamId.id).find("option:selected").attr("id");
 		var userImage		= "";
 		//console.info("team_id ::"+team_id);
 		for(indexManageTeam in teamManageUser)
		{
			if(indexManageTeam.indexOf(team_id) != -1)
				{
				var teamUsers = new Array();
					if(String(teamManageUser[indexManageTeam].teamMembers).indexOf(",") != -1)
				 		 teamUsers = String(teamManageUser[indexManageTeam].teamMembers).split(",");
					else if(teamManageUser[indexManageTeam].teamMembers)
						 teamUsers.push(String(teamManageUser[indexManageTeam].teamMembers));
					var buildUserDiv = "";
				    for(indexUserBadgeDetails in userBadgeLogJdoMap)
			    	{
				    	if(teamUsers.indexOf(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId)) != -1)
				    	{
			    		for(indexUserDetails in userProfileMap)
			    			{
			    				if(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId).indexOf(indexUserDetails) != -1)
			    					{
			    					 if(userProfileMap[indexUserDetails].profilePicture)
								 	 {
								 		userImage	  =  userProfileMap[indexUserDetails].profilePicture;
								 	 }
								 	 else
								 	 {
								 		userImage	  =  "../images/genral-photo.jpg";
								 	 }	    
				    					var onlyBadgeArray = new Array();
							    		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).indexOf(",") != -1)
							    			{
							    				onlyBadgeArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).split(",");
							    			}
							    		else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId))
							    			{
							    				onlyBadgeArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId));
							    			}
							    		
							    		var onlyTrophyArray = new Array();
							    		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).indexOf(",") != -1)
							    			{
							    				onlyTrophyArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).split(",");
							    			}
							    		else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId))
							    			{
							    				onlyTrophyArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId));
							    			}
							    		
			    						buildUserDiv += '<div class="userholder"><div class="userdetail" id="'+indexUserDetails+'">'+
										'<div class="image">'+
											'<img alt="'+userProfileMap[indexUserDetails].firstName+" "+userProfileMap[indexUserDetails].lastName+'" style="display:block;height:40px;width:40px;" src="'+userImage+'"></img>'+
										'</div>'+
										'<div class="details">'+
											'<h4><a title="'+userProfileMap[indexUserDetails].firstName+" "+userProfileMap[indexUserDetails].lastName+'" id="'+indexUserDetails+'" class="profileName" onclick="showUserInfo(this)" style="cursor:pointer;color:black">'+userProfileMap[indexUserDetails].firstName+'</a></h4>'+
											'<div class="badge">'+
												'<span>'+
													'<img style="margin-top:5px;cursor:default;" title="Points" src="images/badge1.png">'+
													'<span class="total" title="Points" style="float: left; margin: 14px 0 0 -33px;position: absolute;text-align: center; width: 33px;cursor:default;">'+userBadgeLogJdoMap[indexUserBadgeDetails].points+'</span>'+
												'</span>'+
												'<span>'+
													'<img src="images/badge-Saranya.png" title="Badge" style="cursor:default;">'+
													'<span class="badge_count" style="float: left; margin: 13px 0 0 -26px;position: absolute;text-align: center; width: 22px;cursor:default;" title="Badges">'+onlyBadgeArray.length+'</span>'+
												'</span>'+
												'<span>'+
													'<img src="images/Trophy-Saranya.png" title="Trophy"  style="cursor:default;">'+
												'<span class="trophy_count" style="float: left; margin: 13px 0 0 -27px;position: absolute;text-align: center; width: 22px;cursor:default;" title="Trophies">'+onlyTrophyArray.length+'</span>'+
											'</div>'+
										'</div>'+
									'</div>'+
										'<div class="userbadge">'+
			    						'<ul>';
			    						
			    						for(var i=0;i<onlyBadgeArray.length; i++)
						    			{
			    							for(indexBadgeDetails in badgeDetails)
					    					{
					    						if(String(indexBadgeDetails).indexOf(onlyBadgeArray[i]) != -1 )
					    							{
					    								buildUserDiv += '<li id='+indexBadgeDetails+' title="'+badgeDetails[indexBadgeDetails].badgeName+'"  onclick="displayBadgeDetail(this)"><img style="height:35px;width:35px;cursor:pointer;" src="'+badgeDetails[indexBadgeDetails].badgeLogoPath+'"></li>';
					    							}
					    					}
						    			}
			    						buildUserDiv +='</ul>'+
			    					'</div>'+
			    					'<div class="clear"></div>'+
			    					'</div>';
			    						
			    					}
			    			}
			    		}
			    	}
				}
		}
 		$('.userlist').html(buildUserDiv);
 	}
 	
 	function showUserInfo(useratag)
 	{
 		var ids = useratag.id;
 		var user = useratag.innerHTML;
 		//console.log("$(useratag).html() ::"+$(useratag).parent().parent().find('span.badge_count').html());
 		$(".badgeDB_total").html($(useratag).parent().parent().find('span.badge_count').html());
 		$(".trophyDB_total").html($(useratag).parent().parent().find('span.trophy_count').html());
 		$("#total").html($('#'+useratag.id).find('span.total').html()); //total
 		$(".user_person_name_badges").html(user+"'s Badges");
 		$(".user_person_name_trophies").html(user+"'s Trophies");
 		$(".user_person_name_stuff").html(user+"'s Stuff");
 		if($(useratag).parent().parent().parent().find('img').attr("src").replace("/s42-c/photo.jpg","/s140-c/photo.jpg"))
 		{
 			$('#profileImage').attr("src",$(useratag).parent().parent().parent().find('img').attr("src").replace("/s42-c/photo.jpg","/s140-c/photo.jpg"));	
 		}
 		else
 		{
 			$('#profileImage').attr("src","../images/genral-photo.jpg");	
 		}	
 		
 		$('.user_person_name').html(user);
 		//console.info("uslbaged ::"+ $('#badges_row'+useratag.id+" > ul").children().length);
 		$("#total_badges").empty();
 		$('#total_stuff').empty();
 		
 	for(indexUserBadgeDetails in userBadgeLogJdoMap)
	   {
 		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId).indexOf(String(useratag.id)) != -1)
 		for(indexUserDetails in userProfileMap)
		{
			if(indexUserDetails.indexOf(String(useratag.id)) != -1)
				{
					var onlyBadgeArray = new Array();
		    		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).indexOf(",") != -1)
		    			{
		    			onlyBadgeArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).split(",");
		    			}
		    		else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId))
		    			{
		    			onlyBadgeArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId));
		    			}
		    		var onlyTrophyArray = new Array();
		    		if(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).indexOf(",") != -1)
		    			{
		    			onlyTrophyArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).split(",");
		    			}
		    		else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId))
		    			{
		    			onlyTrophyArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId));
		    			}
		    		
		    		for(var i=0;i<onlyBadgeArray.length;i++)
	 				{
		 				//$("#total_badges").append('<li style="cursor:pointer">"+onlyBadgeArray[i]+"</li>');
		 				for(indexBadgeDetails in badgeDetails)
						{
							if(String(indexBadgeDetails).indexOf(onlyBadgeArray[i]) != -1 )
								{
									$("#total_badges").append('<li id="'+badgeDetails[indexBadgeDetails].key+'"  style="cursor:pointer;max-height: 110px;"><img title="'+badgeDetails[indexBadgeDetails].badgeName+'" style="cursor:pointer;" src="'+badgeDetails[indexBadgeDetails].badgeLogoPath+'"><div class="badge-name ">'+String(badgeDetails[indexBadgeDetails].badgeName).substring(0,12)+'</div></li>');
								}
						}
	 				}
	 		//console.log($("#total_badges").html());
	 		$("#total_trophies").empty();
	 		for(var i=0;i<onlyTrophyArray.length;i++)
				{
		 			for(indexBadgeDetails in badgeDetails)
					{
						if(String(indexBadgeDetails).indexOf(onlyTrophyArray[i]) != -1 )
							{
								$("#total_trophies").append('<li id="'+badgeDetails[indexBadgeDetails].key+'" style="cursor:pointer;"><img title="'+badgeDetails[indexBadgeDetails].badgeName+'" style="cursor:pointer;" src="'+badgeDetails[indexBadgeDetails].badgeLogoPath+'"><div title="'+badgeDetails[indexBadgeDetails].badgeName+'" class="badge-name ">'+String(badgeDetails[indexBadgeDetails].badgeName).substring(0,12)+'</div></li>');
							}
					}
				}
	 		
	 			var stuffArray = new Array();
	 			if(String(userBadgeLogJdoMap[indexUserBadgeDetails].stuffId).indexOf(",") != -1)
	 				stuffArray = String(userBadgeLogJdoMap[indexUserBadgeDetails].stuffId).split(",");
	 			else if(String(userBadgeLogJdoMap[indexUserBadgeDetails].stuffId))
	 				stuffArray.push(String(userBadgeLogJdoMap[indexUserBadgeDetails].stuffId));
	 			for(var i=0;i<stuffArray.length;i++)
				{
		 			for(indexBadgeDetails in badgeDetails)
					{
						if(String(indexBadgeDetails).indexOf(stuffArray[i]) != -1 )
							{
								$("#total_stuff").append('<li  style="cursor:default;"><img title="'+badgeDetails[indexBadgeDetails].badgeName+'" style="cursor:default;" src="'+badgeDetails[indexBadgeDetails].badgeLogoPath+'"><div title="'+badgeDetails[indexBadgeDetails].badgeName+'" class="badge-name ">'+String(badgeDetails[indexBadgeDetails].badgeName).substring(0,12)+'</div></li>');
							}
					}
				}
			}
	   }
 		
 	
 		//console.log("onlyBadgeArray ::"+onlyBadgeArray);
 		
 		
 		$('#listing').hide();
 		$('#profile_panel').show();
 		$('#backothers').show();
	   }
 	}
 	function showOthers()
 	{
 		$('#listing').show();
 		$('#profile_panel').hide();
 	}
 	function searchCustomer() //Changed for new design
    {
 		var searchId = document.getElementById("search_cus").value;
    	$("div.userholder").hide();
    	$("div.userholder:containsi('"+searchId+"')").show();
    }
 	function blank(blankText)
 	{
		$('#search_cus').val(""); 		
 	}
 	function unblank(blankText)
 	{
		$('#search_cus').val("Find a person..."); 	
		
 	}
 	
	
	function displayBadgeDetail(badge)
	{
		$('body').addClass('noscroll').removeClass('scroll');
		var badgeID = badge.id;
		var badgeidlist=new Array()
		var useridofbadge=new Array();
		var profilepic=new Array(); 
		var fname=new Array(); 
		var lname=new Array(); 
		var iteratorpro= 0;
		var buildProfilePic = '<div style="float: left;clear: none;padding: 0px 0px 40px 20px;margin: 0px;overflow-y: auto;max-height: 150px;" class="mem_of_badge">';
		
		for(uldindex in userBadgeLogJdoMap)
		{
			if(String(userBadgeLogJdoMap[uldindex].badgeId).indexOf(badgeID) != -1)
			{
				for(u_dindex in userProfileMap)
				{
					if(String(userBadgeLogJdoMap[uldindex].userId).indexOf(u_dindex) != -1)
					{
						if(userProfileMap[u_dindex].profilePicture)
							buildProfilePic +='<img src="'+String(userProfileMap[u_dindex].profilePicture).replace("/photo.jpg","/s42-c/photo.jpg")+'" title="'+userProfileMap[u_dindex].firstName+" "+userProfileMap[u_dindex].lastName+'" height="42" width="42" />&nbsp&nbsp';
						else
							buildProfilePic +='<img src="../images/genral-photo.jpg" title="'+userProfileMap[u_dindex].firstName+" "+userProfileMap[u_dindex].lastName+'" height="42" width="42" />&nbsp&nbsp';
					}
				}
			}
		}
		buildProfilePic += '</div>';
		
		for(badge_Index in badgeDetails)
			{
				if(badge_Index.indexOf(badgeID) != -1)
				{
					
					var badgeLogoPath = badgeDetails[badge_Index].badgeLogoPath;
					 $('.briefBadgeImage').attr("src",String(badgeDetails[badge_Index].badgeLogoPath+"=s87"));
					 $('.briefBadgeImage').attr("title",badgeDetails[badge_Index].badgeName);
					 $('.briefBadgeImage').attr("alt",badgeDetails[badge_Index].badgeName);
					 
					$('.briefBadgeImage').attr("id", badgeDetails[badge_Index].key);
					$('#briefBadgeName > h3').html(badgeDetails[badge_Index].badgeName);
					if(badgeDetails[badge_Index].badgeType.indexOf("badge") != -1)
						$('#briefBadgeName > h4').html(badgeDetails[badge_Index].badgeValue + " points for this badge");
					
					else if(badgeDetails[badge_Index].badgeType.indexOf("trophy") != -1)
						$('#briefBadgeName > h4').html(badgeDetails[badge_Index].badgeValue + " points for this trophy");
					$('.badges_list > p').html(htmlDecode(badgeDetails[badge_Index].badgeDiscription.value));
					 var x=0;
					 var buildvideolist="";
					 for(index in videodetails)
					  {	
				
						 for (x=0;x<(badgeDetails[badge_Index].videoid.length);x++)
						 {
							
					     	var  videokey  = videodetails[index].key;
							var badgevideokey=(badgeDetails[badge_Index].videoid[x]);
							if(videokey==badgevideokey)
							{
						 		buildvideolist +='<li style="cursor:default;" class="row_clr odd" id="'+videodetails[index].videoId+'"><code class=""></code><img src="'+videodetails[index].videothumbnail+'" id="test" height="90px" width="120px" class="video_thump video_popup_act"/><p class="heading video_title_heading">'+ videodetails[index].vidtitle+'</p></li>';
							}
						 }
					  }
					
/* changes by pradeep starts here*/
					 
					 $('.add_vlink_cont').html(buildvideolist+//'<div class="badges_list">'+
			                    '<div class="clear_all"></div><input type="button" id="'+badgeDetails[badge_Index].key+'" value="Work on this badge !!" class="grn_btn2 add_vlink add_vlink_act" onclick="confirmToMoveBadge(this);"/>'+
			               
			                    '<input type="button" id="earnbadges" value="Back" class="grn_btn2 add_vlink add_vlink_act" onClick="badge_popup()"/><br><h4 class="simpleTxtStyle">People who earned this '+badgeDetails[badge_Index].badgeType+':</h4><br></br>'+buildProfilePic);
					
					 /* $('.mem_of_badge').html('<h4>People who earned this badge:</h4><br></br>'); */
					 
/* changes by pradeep ends here */
					
					 $('#backgroundPopup').show();
					 $("#badgepopup").show();
					 
					 	
				}
				
				
			}
		
		
		
	}
	function badge_popup()
	{
		$('body').addClass('scroll').removeClass('noscroll');
		$('.mem_of_badge').html('');
		$('#backgroundPopup').hide();
		$('#badgepopup').hide();
	}
	function hideStatusMessage(){
		if(document.getElementById("voice-box").getAttribute("status") == "saved"){
			$("#voice-box").fadeOut(300);
		}
	}
	function sendMailToUser()
	{
		if($('.badge_img').attr("id").indexOf("undefined") == -1 && $('.badge_img').attr("id") != null && $('.badge_img').attr("id") != undefined )
			{
				try{
					 $.ajax({type: 'POST', url: '/getRequestForBadge' ,data:"badgeId="+$('.badge_img').attr("id")+ "&requestText="+$('#badgeRequestContent').val()+ "&UserName="+userFirstName +" "+ userLastName +"&to="+userEmail +"&badgeName="+$('.cert_details > h3').html(), success: function(data)
			     		{ 
						 	$("#voice-box").fadeIn();
							document.getElementById("statusMessage").innerHTML = "Email Sent!";
							document.getElementById("voice-box").setAttribute("status", "saved");
							setTimeout("hideStatusMessage()", 1750);
							$('#backgroundPopup').hide();
							$('#badgepopup').hide();
			     		}
			  	    });
				}catch(e)
				{
					alert(e);
				}
			}
	}
	
	function test(badge)
 	{
 		var badgeID = badge.id;
 		window.location.replace("/persistUser?badgedetail="+badgeID)
 	}
	
	 function confirmToMoveBadge(selbadge)
	{
		 
		jQuery._uuidlet= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
		var userStatusDetailsKey = jQuery._uuidlet;
			
		var badgeID = selbadge.id;
		var badgeType = "";
		for(indexBadgeDetails in badgeDetails)
			{
				if(indexBadgeDetails.indexOf(badgeID) != -1)	
					badgeType = badgeDetails[indexBadgeDetails].badgeType;
			}
		for(index in userBadgeLogJdoMap)
		{	
			if(userBadgeLogJdoMap[index].userId === userKey)
			{
				if(userBadgeLogJdoMap[index].badgesWorkingOn.indexOf(badgeID) === -1)
				{
						var actionToPerform = confirm("Can this badge moved to Working on tab ??");
						if(actionToPerform)
						{
							 $.ajax({type: 'POST', url: '/updatebadgestoworkon' ,data:"userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+badgeID+"&userid="+userKey+"&badgeType="+badgeType, success: function(data)
					     		{ 	
								 	$('#backgroundPopup').hide();
									$('#badgepopup').hide();
								    $("#voice-box").fadeIn();
									document.getElementById("statusMessage").innerHTML = "This badge has been added to your Badges working on list";
									document.getElementById("voice-box").setAttribute("status", "saved");
									setTimeout("hideStatusMessage()", 1750);
									
									/*var src = "http://localhost:8888/workingOnBadgesRemotely?badgeId="+badgeID+"&companyId="+userBadgeLogJdoMap[index].companyId;
									$.modal('<iframe src="' + src + '" height="450" width="830" style="border:0">', {
										closeHTML:"",
										containerCss:{
											backgroundColor:"#fff", 
											borderColor:"#fff", 
											height:450, 
											padding:0, 
											width:830
										},
										overlayClose:true,
										onClose : function()
													{
														$('#backgroundPopup').hide();
														$.modal.close();
													}
									});*/
					     		}
				     		});
							userBadgeLogJdoMap[index].badgesWorkingOn.push(badgeID); 
						}
				}
				else
				{
					 	$("#voice-box").fadeIn();
						document.getElementById("statusMessage").innerHTML = "You are already working on this badge";
						document.getElementById("voice-box").setAttribute("status", "saved");
						setTimeout("hideStatusMessage()", 2250);
				}	
			}
		}
	} 
	
	function hidePopup(elemID) 
	{
		$("#"+elemID).hide();
		$("#backgroundPopup").hide();
	}

	function showPopup(elemID)
	{
		//console.info("comes here");
		$("#"+elemID).show();
		$("#backgroundPopup").show();
	}
	
	