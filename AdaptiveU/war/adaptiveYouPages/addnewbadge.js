	var normal_content 							= true ;
	var badgeId									= "";
	var badgeImageUrl							= "";
	var adminCreatedTags 						= new Array();
	var userCreatedTags 						= new Array();
	var videoDuration							= "";
	
	$().ready(function(){
		
		
		$(document).ajaxStart(function(){
			
			$("#voice-box").fadeIn();
			document.getElementById("statusMessage").innerHTML = "Saving... ";
			document.getElementById("voice-box").setAttribute("status","saved");
			
		});
		
		$(document).ajaxStart(function(){
			
			console.info("ddddeeeee")
			
			setTimeout("hideStatusMessage()",1750);
			
		});
		
		
		
			$('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
    		$('#pending_req_stuff').html("Approve Stuff from Store ("+pendingReqObj.stuffCount+")"); 
			
			bkLib.onDomLoaded(function(){
				
				new nicEditor({maxHeight : 205}).panelInstance('email_content');
				
			});
			
			$('#cancel_butt').click(function(){
				
					window.parent.document.getElementById("email_wrapper").style.display="none";	
				 	var removepopup 			= window.parent.document.getElementById("mailIframe");
				 	emovepopup.parentNode.removeChild(removepopup);
				 
			});	        
			
	    	for(index in userDetails)
	    	{
	    		userKey  						= userDetails[index].key;
	    		userName 						= userDetails[index].userName;
	    		userFirstName 					= userDetails[index].firstName;
	    		userLastName 					= userDetails[index].lastName;
	    	} 
	    	
	    	$('.user_person_name').html(userFirstName);  
	    	$('.welcome_username').html("Welcome, "+userFirstName + " " +userLastName); 
	    	
	    	for(indexlib in libMap)
	    	{
	    		if(libMap[indexlib].badgeType.indexOf("library") != -1)
	    		{
	    			liUserLib 					+= '<li id="'+indexlib+'" onclick="libImgDetails(this)"><img alt="'+libMap[indexlib].badgeName+'" src="'+libMap[indexlib].badgeLogoPath+'"><div title="'+libMap[indexlib].badgeName+'" class="badge-name toolTip">'+libMap[indexlib].badgeName+'</div><span style="display:none;" id="'+indexlib+'videoids">'+libMap[indexlib].videoid+'</span></li>';
	    		}
	    			
	    	}
	    	
	    	$('#lib_badges').html(liUserLib);
	    	
			for(index in companyList)
			{
			     companyListli	 				+= '<li style="cursor:pointer;" id="'+index+'" ><a onClick="changeCompany(\''+index+'\');"><span>'+companyList[index]+'<span></a></li>';
			}
			
			if( companyListli != "" )
			{
			   	$('#companyslist').append(companyListli);
			}
			else
			{
			    $('#account_menu').removeAttr("id");
			}
			   
			$('#account_name').html(bannerCompanyName);
//			$('#company-name').html(bannerCompanyName);
			
			$('.tooltipB').tipsy({trigger: 'focus', gravity: 'w'});
			
 		  	
 		  	var classWhileBadgeDisabled			= "badges_list";
 		 	var classWhileBadgeEnabled			= "show_product show_product_act";
 		 	var badgesTagsDetails				= "";
 		 	var badgeOrTrophyIcon				= "";
			var buildBadgesAndTrophiesLi		= "";
 		 	
 		   	for(index in badgeListMap)
 		   	{
		  		if(String(badgeListMap[index].badgeName).indexOf("deleted") === -1 && String(badgeListMap[index].badgeName) != "item")
		  		{
		  			badgeNamesList.push(badgeListMap[index].badgeName);
		  		}	
		  		
 		   		if( badgeListMap[index].badgeType === "badge" || badgeListMap[index].badgeType === "trophy")
 		   		{
 		   			if(String(badgeListMap[index].isFlag) === "disabled")
 		   			{
 		   				classWhileBadgeDisabled	= "badges_list dont_show";
 		   				classWhileBadgeEnabled	= "show_product_act dont_show_product";
	 		   		}
 		   			else
 		   			{
 		   				classWhileBadgeDisabled	= "badges_list";
 		   				classWhileBadgeEnabled	= "show_product show_product_act";
	   				}
 		   			
 		   			if(String(badgeListMap[index].badgeType) === "trophy")
 		   			{
 		   				badgeOrTrophyIcon		= '<code class="trophy_display_icon"></code>';
 		   			}
 		   			else if(String(badgeListMap[index].badgeType) === "badge")
 		   			{
 		   				badgeOrTrophyIcon		= '<code class="badge_display_icon"></code>';
 		   			}	
 		   				
 		   			buildBadgesAndTrophiesLi 	+= '<li title="'+badgeListMap[index].badgeName+'" id='+badgeListMap[index].key+' class="'+classWhileBadgeDisabled+'"><div class="col1"><div class="badge_hldr">'+
												   '<img src="'+badgeListMap[index].badgeLogoPath+'" width="87" height="87" /></div></div>'+
												   '<div>'+'<h4 style="font-size:15px;">'+badgeListMap[index].badgeName+'</h4>'+badgeOrTrophyIcon+'</div><div class="clear_all"></div>'+
												   '<div class="on_over"><ol>'+
												   '<li title="Points"><b>'+badgeListMap[index].badgeValue+'</b></li>'+
												   '<li title="Enable/Disable" class="'+classWhileBadgeEnabled+'" id='+badgeListMap[index].key+ '></li>'+
												   '<li title="Edit Badge" id="'+badgeListMap[index].key+'" class="edit_product add_badge_act"></li>'+
												   '<li title="Delete Badge" class="del_product del_act" id='+badgeListMap[index].key+ '></li>'+
												   '</ol></div></li>';
 		   		}
 		   	}
 		   	
 		    $("#add_product").append(buildBadgesAndTrophiesLi);
 		    
 		    $(".text_content > a").live("click",function(){
 		    	
 		    	var contentType					= String($(this).attr("id"));
 		    	
 		    	if(contentType === "normal_content")
 		    	{
 		    		normal_content				= true;
 		    		$(".text_content > #"+contentType).removeClass("user_active_btn").addClass("admin_active_btn");
 		    		$(".text_content > a:not('#"+contentType+"')").removeClass("user_active_btn");
 		    	}
 		    	else if(contentType === "embedded_content")
 		    	{
 		    		normal_content				= false;
 		    		$(".text_content > #"+contentType).removeClass("admin_active_btn").addClass("user_active_btn");
 		    		$(".text_content > a:not('#"+contentType+"')").removeClass("admin_active_btn");
 		    	}	
 		    	
 		    });
 		    
 		  $('.add_badge_act').live("click",function(){
 			  
	 		    $('#backgroundPopup').show();
	 		    $('.add_stuff_popup').fadeIn();
	 		    $('.dont_show_library').show();
	 		    $(".badge_detail_col").find("code").removeClass("trophy_icon").addClass("badge_icon").show();
	 		    $('#badge_cat').attr('checked',true);
 		    
	 		    badgeId										= $(this).attr("id");
	 		    normal_content								= true;
	 		    $(".text_content > #normal_content").removeClass("user_active_btn").addClass("admin_active_btn");
		    	$(".text_content > a:not('#normal_content')").removeClass("user_active_btn");
 		    
	 		    if(badgeId != null && badgeId != undefined && badgeId != "undefined")
	 		    {
	 		    	$('.dont_show_library').hide();
	 		    	$('.add_stuff_popup').find("h2").html("Edit Badge Details");
 		    	
	 		  	  	for(indexingBadgesList in badgeListMap)
	 		  	  	{
	 		  	  		if(String(badgeId) === String(badgeListMap[indexingBadgesList].key))
	 		  	  		{
	 		  	  			badgeImageUrl					= badgeListMap[indexingBadgesList].badgeLogoPath;
	 		  	  			
	 		  	  			$('#'+badgeListMap[indexingBadgesList].badgeType+'_cat').attr('checked',true);
	 		  	  			$("#badge_image").attr('src',badgeListMap[indexingBadgesList].badgeLogoPath).css({"marginLeft": '0px ',"marginTop": '0px',"width":'80px',"height":'80px'});
	 		  	  			$("#badge_name").val(badgeListMap[indexingBadgesList].badgeName);
	 		  	  			$("#badge_points").val(badgeListMap[indexingBadgesList].badgeValue);
	 		  	  			if(String(badgeListMap[indexingBadgesList].canEarnedTwice).indexOf("true") != -1) 
	 		  	  					$('#earnMoreThanOnce').attr("checked","checked");
	 		  	  			else
	 		  	  					$('#earnMoreThanOnce').removeAttr("checked");
	 		  	  				
	 		  	  			
	 		  	  			if(typeof badgeListMap[indexingBadgesList].badgeDiscription === "string")
	 		  	  			{
	 		  	  				$('.nicEdit-main').html(badgeListMap[indexingBadgesList].badgeDiscription);
	 		  	  			}
	 		  	  			else if(typeof badgeListMap[indexingBadgesList].badgeDiscription === "object")
	 		  	  			{
	 		  	  				$('.nicEdit-main').html(badgeListMap[indexingBadgesList].badgeDiscription.value);
	 		  	  			}	
	 		  	  			
	 		  	  			if(String(badgeListMap[indexingBadgesList].badgeType) === "badge")
	 		  	  			{
	 		  	  				$(".badge_detail_col").find("code").removeClass("trophy_icon").addClass("badge_icon");
	 		  	  			}
	 		  	  			else if(String(badgeListMap[indexingBadgesList].badgeType) === "trophy")
	 		  	  			{
	 		  	  				$(".badge_detail_col").find("code").removeClass("badge_icon").addClass("trophy_icon");
	 		  	  			}
	 		  	  			else
	 		  	  			{
	 		  	  				$(".badge_detail_col").find("code").removeClass("badge_icon trophy_icon");
	 		  	  			}	
	 		  	  			
	 		  	  			
		 	 		  	    if(String(badgeListMap[indexingBadgesList].contentType) === "true")
		 	 		    	{
		 	 		    		normal_content				= true;
		 	 		    		$(".text_content > #normal_content").removeClass("user_active_btn").addClass("admin_active_btn");
		 	 		    		$(".text_content > a:not('#normal_content')").removeClass("user_active_btn");
		 	 		    	}
		 	 		    	else
		 	 		    	{
		 	 		    		normal_content				= false;
		 	 		    		$(".text_content > #embedded_content").removeClass("admin_active_btn").addClass("user_active_btn");
		 	 		    		$(".text_content > a:not('#embedded_content')").removeClass("admin_active_btn");
		 	 		    	}
		 	 		  	    
		 	 		  	    
		 	 		  	if(String(badgeListMap[indexingBadgesList].canEarnedTwice) === "false")
	 	 		    	{
		 	 		  		$("#earnMoreThanOnce").removeAttr("checked");
	 	 		    	}
	  		    
		 	 		  	    var videoKeys					= String(badgeListMap[indexingBadgesList].videoid).split(",");
		 	 		  	    var buildVideoLi				= "";
		 	 		  	    var videoPosition				= "row_clr odd";
		 	 		  	    var buildvideo					= "";
		 	 		  	    var videoDescription			= "";
	 	 		  	    
	 	 		  	    
		  		  	    	for(var i=0;i < videoKeys.length;i++)
		  		  	    	{
		  		  	    		for(indexingVideoDetials in videoDetailsMap)
		  		 		  	    {
		  		  	    			if(String(videoDetailsMap[indexingVideoDetials].key) === String(videoKeys[i]))
		  		  	    			{
			  		  	    			if(typeof videoDetailsMap[indexingVideoDetials].viddesc === "string")
				 		  	  			{
				 		  	  				videoDescription =  String(videoDetailsMap[indexingVideoDetials].viddesc);
				 		  	  			}
				 		  	  			else if(typeof videoDetailsMap[indexingVideoDetials].viddesc === "object")
				 		  	  			{
				 		  	  				videoDescription =  String(videoDetailsMap[indexingVideoDetials].viddesc.value);
				 		  	  			}
				 		  	  			else
				 		  	  			{
				 		  	  				videoDescription =  "";
				 		  	  			}	
			  		  	    			
			 	  	    				buildvideo			+= 	'<li style="margin: 0 15px 20px 0 !important ;" id="'+videoDetailsMap[indexingVideoDetials].videoId+'" class="'+videoPosition+'" onmouseout="removeEditAndRemove(this);" onmouseover="displayEditRemove(this);">'+
			 				    								'<code class="remove" onclick="removevideo(this)" style="display: none;"></code>'+
			 				    								'<code id="'+videoDetailsMap[indexingVideoDetials].videoId+'" class="edit add_vlink_act" onclick="editVideoDetails(this)" style="display: none;"></code>'+
			 				    								'<img id="'+videoKeys[i]+'" class="video_thump" width="108" height="auto" src="'+videoDetailsMap[indexingVideoDetials].videothumbnail+'">'+
			 				    								'<p class="video_title_heading">'+videoDetailsMap[indexingVideoDetials].vidtitle+'</p><span id="'+videoDetailsMap[indexingVideoDetials].videoId+'description" style="display:none;">'+videoDescription+'</span>'+
			 				    								'<span id="'+videoDetailsMap[indexingVideoDetials].videoId+'videoid" style="display:none;">'+videoDetailsMap[indexingVideoDetials].videourl+'</span>'+
			 				    								'<span id="'+videoDetailsMap[indexingVideoDetials].videoId+'duration" style="display:none;">'+videoDetailsMap[indexingVideoDetials].videoDuration+'</span>'+
			 				    								'</li>';
		 	  	    					
		 	  	    					if(videoPosition === "row_clr odd")
		 	  	    					{
		 	  	    						videoPosition 	= "row_clr even";
		 				    			}
		 	  	    					else
		 				    			{
		 				    				videoPosition 	= "row_clr odd";
		 				    			}
		  		  	    			}	
		  		 		  	    }	
		  		  	    	}
		  		  	    	$(".add_vlink_cont").html(buildvideo);
		  		  	    	$("#allTagsCreated").html("");
		  		  	    	
			  		  	    adminCreatedTags				= [];
			  		  	    userCreatedTags					= [];
			  		  	    arrayofTagsCreatedByAdmin		= [];
			  		  	    arrayofTagsCreatedByUser		= [];
			 			   	badgesTagsDetails				= new String(badgeListMap[indexingBadgesList].badgeTagsContents);
			 			  
					  		if(String(badgesTagsDetails).indexOf("nimdasgat") != -1)
					  		{
					  			adminCreatedTags.push(String(badgesTagsDetails).substring(0,String(badgesTagsDetails).indexOf("nimdasgat")-1));
					  		}
					  		if(String(badgesTagsDetails).indexOf("resusgat") != -1)
					  		{
					  			userCreatedTags.push(String(badgesTagsDetails).substring(String(badgesTagsDetails).indexOf("nimdasgat")+9,String(badgesTagsDetails).indexOf("resusgat")-1));
					  		}
				 		  	
				 		  	var tagsCreatedByAdmin 			= String(adminCreatedTags).split(",").sort();
				 		  	var tagsCreatedByUser 			= String(userCreatedTags).split(",").sort();
				 		  	
				 		  	if(tagsCreatedByAdmin.length > 0)
				 		  	{
				 		  		for(var i = 0; i<tagsCreatedByAdmin.length ; i++)
				 		  		{
				 		  			var adminTagFromDetails = String(tagsCreatedByAdmin[i]).split(":")[0];
				 		  			if(String(adminTagFromDetails) != "")
				 		  			{
				 		  				arrayofTagsCreatedByAdmin.push(adminTagFromDetails);
				 		  				$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+adminTagFromDetails+'"><span class="'+adminTagFromDetails+'tagSelector tagSelector"><span id="'+adminTagFromDetails+'">'+adminTagFromDetails+'</span> <span id="'+adminTagFromDetails+'tagdelete" class="tag-delete">x</span></span></span>');
				 		  			}
				 		  			
				 		  		}	
				 		  	}
				 		  	if(tagsCreatedByUser.length > 0)
				 		  	{
				 		  		for(var i = 0; i<tagsCreatedByUser.length ; i++)
				 		  		{
				 		  			var userTagFromDetails 	= String(tagsCreatedByUser[i]).split(":")[0];
				 		  			if(String(userTagFromDetails) != "")
				 		  			{
				 		  				arrayofTagsCreatedByUser.push(userTagFromDetails);
				 		  				$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+userTagFromDetails+'"><span class="'+userTagFromDetails+'tagSelector tagSelector"><span id="'+userTagFromDetails+'">'+userTagFromDetails+'</span> <span id="'+userTagFromDetails+'tagdelete" class="tag-delete"></span></span></span>');
				 		  			}	
				 		  		}	
				 		  	}
	 		  	  		}
	 		  	  	}
	 		    }
	 		    else
	 		    {
	 		  	  	$('.add_stuff_popup').find("h2").html("Add New Badge");
	 		    }
	 		    
		 		tagsOfAllTheBadges 								= [];
	 		  	for(indexingBadgesList in badgeListMap)
	 		  	{
	 		  		var allTagsDetails 							= new String(badgeListMap[indexingBadgesList].badgeTagsContents).split(",");
	 		  		for(var i=0;i<allTagsDetails.length;i++)
	 		  		{
	 		  			if(allTagsDetails[i] != "nimdasgat" && allTagsDetails[i] != "resusgat" && tagsOfAllTheBadges.indexOf(String(allTagsDetails[i]).split(":")[0]) === -1)
	 		  			{
	 		  				tagsOfAllTheBadges.push(String(allTagsDetails[i]).split(":")[0])
	 		  			}	
	 		  		}	
	 		  	}
		 		  	
	 		  	$( "#toAddNewTag" ).autocomplete({
	 		  		
	 		  	    source   : tagsOfAllTheBadges,
	 		  	    appendTo : ".auto-complete-list", 
	 		  	    select 	 : function(event , data)
	 		  	    		   {
	 		  	    				creatingAdminTagArray(String(data.item.value));
	 		  	    		   },
	 		  	    open	 : function()
	 		  	               {
	 		  	    				$(".ui-autocomplete,.ui-menu,.ui-widget,.ui-widget-content,.ui-corner-all").css({
	 		  	    					"list-style" 		: "none",
	 		  	    					"color"		 		: "#8B9BA0",
	 		  	    					"text-decoration" 	: "bold"	
	 		  	    				});
	 		  	               },
	 		  	    close	 : function()
	 		  	    		   {
	 		  	    				$("#toAddNewTag").val("").show();
	 		  	    		   }
	 		  	               
	 		  	});
	 		  	
	 		  	$("#addNewBadgeButton").removeAttr("disabled").addClass("grn_btn").removeClass("gry_btn");

 		  });
 		  
 		$('.del_act').live("click",function(){
 			
 			$(".delete_badge").attr("id",$(this).attr("id"))
 			$('#backgroundPopup').show();
 			$('.remove_alert').fadeIn();
 		 
 		});
 		
 		$('.delete_badge').live("click",function(){
 			
 			var deletingBadgeKey							= $(this).attr("id");
 			
 			badgeListMap[deletingBadgeKey].badgeType 		= "deleted badge";
 			
 			$('.remove_alert').hide();
 			
 			$("#add_product > li[id='"+deletingBadgeKey+"']").remove();
 			
 			
 			$.ajax({
 					type: 'POST', 
 					url: '/deleteBadgeDetails', 
 					data:{deletingBadgeKey : deletingBadgeKey},
 					async: true, 
 					success: function( data )
 					         {
 					    		 $('#backgroundPopup').fadeOut();
 					    		 
 					    		 $("#voice-box").fadeIn();
 					    		 document.getElementById("statusMessage").innerHTML = "Deleted.. !";	
 					    		 document.getElementById("voice-box").setAttribute("status", "saved");
 					    		 setTimeout("hideStatusMessage()", 1750);
 					    	 }
 			});

 		});
 		
 		$('.show_product_act').live("click",function(){ 
 			
 			var badgeKey									= $(this).attr("id");
 			var flagStatus									= "";
 			
 			if ($(this).hasClass('show_product')) 
 			{
 				$(this).addClass('dont_show_product');
 				$(this).removeClass('show_product');
 		  		$(this).parent().parent().parent().addClass('dont_show');
 		  		flagStatus									= "disabled";
 		  		badgeListMap[badgeKey].isFlag 				= flagStatus;
 		  	}
 			else 
 			{
 			  	$(this).removeClass('dont_show_product');
 				$(this).addClass('show_product');
 		  		$(this).parent().parent().parent().removeClass('dont_show');
 		  		flagStatus									= "enabled";
 		  		badgeListMap[badgeKey].isFlag 				= flagStatus;
 			}
 			
 			$.ajax({
 				   type: 'POST', 
 				   url: '/showDontshow', 
 				   data:{badgeKey:badgeKey,flagStatus:flagStatus},
 				   async: true, 
 				   success: function( data )
	  			   {
						
	  			   }
	  		});
 		});
 		
 		$('.cancel_act').live("click",function(){
 			
 			var confirm_closing									= confirm("You have changes to be Saved.Do you wish to close it ?");
 			
 			if(confirm_closing)
 			{
 				badgeId											= 	"";
				badgeImageUrl									= 	"";
				normal_content									= 	true;
				$('#backgroundPopup').fadeOut();
				$('.add_stuff_popup').hide();
				$('.remove_alert').hide();
				$('#badge_name').val("");
				$('#badge_points').val("");
				$("#badge_image").attr("src","");
				$('.nicEdit-main').html("Some Initial Content was in this textarea");
				$('.add_vlink_cont').empty();
				
 			}	
		 			
 		});
 		    
	});
	
	function libImgDetails(selectedImg)
	{
		$('.badge_library').hide();
		$('.add_stuff_popup').show();
		libImageUrlSelected 					= $(selectedImg).find("img").attr("src");
		
		badgeId									= $(selectedImg).attr("id");
		
		for(indexingBadgesList in badgeListMap)
	  	{
	  	  	if(String(badgeId) === String(badgeListMap[indexingBadgesList].key))
	  	  	{
	  	  		badgeImageUrl					= badgeListMap[indexingBadgesList].badgeLogoPath
	  	  			
  	  			$('#'+badgeListMap[indexingBadgesList].badgeType+'_cat').attr('checked',true);
  	  			$("#badge_image").attr('src',badgeListMap[indexingBadgesList].badgeLogoPath).css({"marginLeft": '0px ',"marginTop": '0px',"width":'80px',"height":'80px'});
  	  			$("#badge_name").val(badgeListMap[indexingBadgesList].badgeName);
  	  			$("#badge_points").val(badgeListMap[indexingBadgesList].badgeValue);
  	  			
  	  			if(typeof badgeListMap[indexingBadgesList].badgeDiscription === "string")
  	  			{
  	  				$('.nicEdit-main').html(badgeListMap[indexingBadgesList].badgeDiscription);
  	  			}
  	  			else if(typeof badgeListMap[indexingBadgesList].badgeDiscription === "object")
  	  			{
  	  				$('.nicEdit-main').html(badgeListMap[indexingBadgesList].badgeDiscription.value);
  	  			}	
  	  			
  	  			if(String(badgeListMap[indexingBadgesList].badgeType) === "trophy")
	   			{
  	  				$(".badge_detail_col").find("code").removeClass('badge_icon').addClass('trophy_icon');
	   			}
	   			else if(String(badgeListMap[indexingBadgesList].badgeType) === "badge")
	   			{
	   				$(".badge_detail_col").find("code").removeClass('trophy_icon').addClass('badge_icon');
	   			}
	  	  			
 		  	    if(badgeListMap[indexingBadgesList].contentType === "true")
 		    	{
 		    		normal_content				= true;
 		    		$(".text_content > #normal_content").removeClass("user_active_btn").addClass("admin_active_btn");
 		    		$(".text_content > a:not('#normal_content')").removeClass("user_active_btn");
 		    	}
 		    	else
 		    	{
 		    		normal_content				= false;
 		    		$(".text_content > #embedded_content").removeClass("admin_active_btn").addClass("user_active_btn");
 		    		$(".text_content > a:not('#embedded_content')").removeClass("admin_active_btn");
 		    	}
    
 		  	    var videoKeys					= String(badgeListMap[indexingBadgesList].videoid).split(",");
 		  	    var buildVideoLi				= "";
 		  	    var videoPosition				= "row_clr odd";
 		  	    var buildvideo					= "";
 		  	    var videoDescription			= "";
	  	    
		  	    
	  	    	for(var i=0;i < videoKeys.length;i++)
	  	    	{
	  	    		for(indexingVideoDetials in videoDetailsMap)
	 		  	    {
	  	    			if(String(videoDetailsMap[indexingVideoDetials].key) === String(videoKeys[i]))
	  	    			{
	  	    			if(typeof videoDetailsMap[indexingVideoDetials].viddesc === "string")
 		  	  			{
 		  	  				videoDescription =  String(videoDetailsMap[indexingVideoDetials].viddesc);
 		  	  			}
 		  	  			else if(typeof videoDetailsMap[indexingVideoDetials].viddesc === "object")
 		  	  			{
 		  	  				videoDescription =  String(videoDetailsMap[indexingVideoDetials].viddesc.value);
 		  	  			}
 		  	  			else
 		  	  			{
 		  	  				videoDescription =  "";
 		  	  			}	
	  	    			
	  	    			buildvideo			+= 	'<li style="margin: 0 15px 20px 0 !important ;" id="'+videoDetailsMap[indexingVideoDetials].videoId+'" class="'+videoPosition+'" onmouseout="removeEditAndRemove(this);" onmouseover="displayEditRemove(this);">'+
												'<code class="remove" onclick="removevideo(this)" style="display: none;"></code>'+
												'<code id="'+videoDetailsMap[indexingVideoDetials].videoId+'" class="edit add_vlink_act" onclick="editVideoDetails(this)" style="display: none;"></code>'+
												'<img id="'+videoKeys[i]+'" class="video_thump" width="108" height="auto" src="'+videoDetailsMap[indexingVideoDetials].videothumbnail+'">'+
												'<p class="video_title_heading">'+videoDetailsMap[indexingVideoDetials].vidtitle+'</p><span id="'+videoDetailsMap[indexingVideoDetials].videoId+'description" style="display:none;">'+videoDescription+'</span>'+
												'<span id="'+videoDetailsMap[indexingVideoDetials].videoId+'videoid" style="display:none;">'+videoDetailsMap[indexingVideoDetials].videourl+'</span>'+
												'</li>';
  	    					
  	    					if(videoPosition === "row_clr odd")
  	    					{
  	    						videoPosition 	= "row_clr even";
			    			}
  	    					else
			    			{
			    				videoPosition 	= "row_clr odd";
			    			}
	  	    			}	
	 		  	    }	
	  	    	}
	  	    	$(".add_vlink_cont").html(buildvideo);
	  	    	$("#allTagsCreated").html("");
		  	    	
  		  	    adminCreatedTags				= [];
  		  	    userCreatedTags					= [];
  		  	    arrayofTagsCreatedByAdmin		= [];
  		  	    arrayofTagsCreatedByUser		= [];
 			   	badgesTagsDetails				= new String(badgeListMap[indexingBadgesList].badgeTagsContents);
 			  
		  		if(String(badgesTagsDetails).indexOf("nimdasgat") != -1)
		  		{
		  			adminCreatedTags.push(String(badgesTagsDetails).substring(0,String(badgesTagsDetails).indexOf("nimdasgat")-1));
		  		}
		  		if(String(badgesTagsDetails).indexOf("resusgat") != -1)
		  		{
		  			userCreatedTags.push(String(badgesTagsDetails).substring(String(badgesTagsDetails).indexOf("nimdasgat")+9,String(badgesTagsDetails).indexOf("resusgat")-1));
		  		}
	 		  	
	 		  	var tagsCreatedByAdmin 			= String(adminCreatedTags).split(",").sort();
	 		  	var tagsCreatedByUser 			= String(userCreatedTags).split(",").sort();
	 		  	
	 		  	if(tagsCreatedByAdmin.length > 0)
	 		  	{
	 		  		for(var i = 0; i<tagsCreatedByAdmin.length ; i++)
	 		  		{
	 		  			var adminTagFromDetails = String(tagsCreatedByAdmin[i]).split(":")[0];
	 		  			if(String(adminTagFromDetails) != "")
	 		  			{
	 		  				arrayofTagsCreatedByAdmin.push(adminTagFromDetails);
	 		  				$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+adminTagFromDetails+'"><span class="'+adminTagFromDetails+'tagSelector tagSelector"><span id="'+adminTagFromDetails+'">'+adminTagFromDetails+'</span> <span id="'+adminTagFromDetails+'tagdelete" class="tag-delete">x</span></span></span>');
	 		  			}
	 		  			
	 		  		}	
	 		  	}
	 		  	if(tagsCreatedByUser.length > 0)
	 		  	{
	 		  		for(var i = 0; i<tagsCreatedByUser.length ; i++)
	 		  		{
	 		  			var userTagFromDetails 	= String(tagsCreatedByUser[i]).split(":")[0];
	 		  			if(String(userTagFromDetails) != "")
	 		  			{
	 		  				arrayofTagsCreatedByUser.push(userTagFromDetails);
	 		  				$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+userTagFromDetails+'"><span class="'+userTagFromDetails+'tagSelector tagSelector"><span id="'+userTagFromDetails+'">'+userTagFromDetails+'</span> <span id="'+userTagFromDetails+'tagdelete" class="tag-delete"></span></span></span>');
	 		  			}	
	 		  		}	
	 		  	}
	  	  	}
	  	}
	}
	
	
	function addBadge(input)
	{
		jcrop_api.destroy();
		$('.jcrop-tracker').remove();
		
		if (input.files && input.files[0]) 
		{
        	var reader 					= new FileReader();
        	reader.onload 				= function (e)
        								  {
        										$(".add_stuff_popup").hide();
        										$('#badge_image').attr('src', e.target.result);
        										$("#badge_image_sample").attr('src', e.target.result);
        										$("#badge_image_cropper").show();
        										
        										$('#badge_image_sample').load(function(){
        											
        							        		width			= $("#badge_image_sample").width();
        							          		height			= $("#badge_image_sample").height();
        							          		
        							          		
        							          		/*if(width >= 140 && height >= 140)
        							          		{*/
        							          			if(width > height)
            							          		{
            							          			$("#badge_image_sample").removeAttr("style").attr({'height':"300px",'width':"450px"}).hide();;
            							          			$("#badge_image").removeAttr("style").attr({'height':"300px",'width':"450px"});
            							          			croppingIntializer(300,450);
            							          			croppedWidth	= 450;
            							          			croppedHeight	= 300;
            							          		}
            							          		else if(width < height)
            							          		{
            							          			$("#badge_image_sample").removeAttr("style").attr({'height':"450px",'width':"300px"}).hide();;
            							          			$("#badge_image").removeAttr("style").attr({'height':"450px",'width':"300px"});
            							          			croppingIntializer(450,300);
            							          			croppedWidth	= 300;
            							          			croppedHeight	= 450;
            							          		}	
            							          		else if(width === height)
            							          		{
            							          			$("#badge_image_sample").removeAttr("style").attr({'height':"300px",'width':"300px"}).hide();;
            							          			$("#badge_image").removeAttr("style").attr({'height':"300px",'width':"300px"});
            							          			croppingIntializer(300,300);
            							          			croppedWidth	= 300;
            							          			croppedHeight	= 300;
            							          		}
        							          	/*	}
        							          		else
        							          		{
        							          			x1=0;
        							          			x2=0;
        							          			y1=0;
        							          			y2=0;
        							          			$("#badge_image_sample").removeAttr("style").attr({'height':height+"px",'width':width+"px"});
        							          			$("#badge_image").removeAttr("style").attr({'height':height+"px",'width':width+"px"});
        							          			croppedWidth	= width;
        							          			croppedHeight	= height;
        							          		}*/	
        							        	});
        								  }
        	reader.readAsDataURL(input.files[0]);
   		}
	}
	
	function croppingIntializer(jcropHeight,jcropWidth)
	{
			var left					= (jcropWidth/2)-40;
			var right					= (jcropWidth/2)+40;
			var top						= (jcropHeight/2)-40;
			var bottom					= (jcropHeight/2)+40;
			
			
		 $('#badge_image_sample').Jcrop({
	     	onSelect	: getCoordinates,
	     	onChange	: getCoordinates,
	     	bgColor		: 'black',
	        bgOpacity	: .4,
	        minSize		: [ 80, 80 ],
	        setSelect	: [ left,top,right,bottom ],
	        aspectRatio : 1/1
	     },
	     function()
	     {
	         var bounds 	= this.getBounds();
	         boundx 		= bounds[0];
	         boundy 		= bounds[1];
	         jcrop_api 		= this;
	     });
	}
	var imageCooridinates;
	function getCoordinates(coordinates)
	{
		imageCooridinates	= coordinates;
		
		if (parseInt(coordinates.w) > 0)
	    {
	      	x1=coordinates.x;
	    	y1=coordinates.y;
	    	x2=coordinates.x2;
	    	y2=coordinates.y2;
	    }
	}
	
	$("#image_crop_close_act").live("click",function(){
		
		x1=0;
		x2=0;
		y1=0;
		y2=0;
		
		$('.jcrop-tracker').remove();
		jcrop_api.destroy();
		
		$('.user_info li > span:not(#checking) > img').css({"marginLeft": '0px ',"marginTop": '0px'}).attr({'width':"80px",'height':'80px'});
		
		$('#badge_image_sample').attr('src',"").removeAttr("style").removeAttr("width").removeAttr("height");
		
		$(".add_stuff_popup").show();
		$("#badge_image_cropper").hide();
		$('#badge_image').show();
		
	});
	
	$("#badge_image_cropper_act").live("click",function(){

		var rx = 80 / imageCooridinates.w;
		var ry = 80 / imageCooridinates.h;
		
		/*if(width >= 140 && height >= 140)
  		{*/
			$('.user_info li > span:not(#checking) > img').css({
					
					"width"					: Math.round(rx * croppedWidth) + 'px',
					"height"				: Math.round(ry * croppedHeight) + 'px',
					"marginLeft"			: '-' + Math.round(rx * imageCooridinates.x) + 'px ',
					"marginTop"				: '-' + Math.round(ry * imageCooridinates.y) + 'px'
				
			});
  		/*}
		else
		{
			$('.user_info li > span:not(#checking) > img').css({"marginLeft": '0px ',"marginTop": '0px'}).attr({'width':"80px",'height':'auto'});
		}*/	
		
	
		
		$('.jcrop-tracker').remove();
		jcrop_api.destroy();
		$('#badge_image_sample').attr('src',"").removeAttr("style").removeAttr("width").removeAttr("height");
		$(".add_stuff_popup").show();
		$("#badge_image_cropper").hide();
	});
	
	$("#addNewBadgeButton").live("click",function(){
		
		 $('#backgroundPopup').show();
		 $('.add_stuff_popup').fadeIn();
		 
		 var badgeAssignee				= userKey;
		 var badgeName					= $.trim($("#badge_name").val());
		 var badgePoints				= $("#badge_points").val();
		 var badgeDescription			= $.trim($(".nicEdit-main").html());
		 var badgeType					= $('input[name=cat]:radio:checked').val();
		 var badgeImageId				= "imageLogoPath";
		 
		 if(!badgeId)
		 {
			 for(indexingBadgesListMap in badgeListMap)
		  	 {
				 if(String(badgeListMap[indexingBadgesListMap].badgeType) === "trophy" || String(badgeListMap[indexingBadgesListMap].badgeType) === "badge")
				 {
					 if(String(badgeListMap[indexingBadgesListMap].badgeName).split(" ").join("") === String(badgeName).split(" ").join(""))
					 {
						 badgeName		= false;
					 }	
				 }	 
			 }
		 }
		 
		 if(String($('#badge_image').attr('src')) === "" || $('#badge_image').attr('src') == undefined || String($('#badge_image').attr('src')) === "undefined")
		 {
			 $("#voice-box").fadeIn();
             document.getElementById("statusMessage").innerHTML = "please upload badge image !"; 
             document.getElementById("voice-box").setAttribute("status", "saved");
             setTimeout("hideStatusMessage()", 1750);
		 }
		 else if(!badgeName)
		 {
			 if(typeof badgeName === "boolean")
			 {
				 $("#voice-box").fadeIn();
	             document.getElementById("statusMessage").innerHTML = " badge with same name already exist !"; 
	             document.getElementById("voice-box").setAttribute("status", "saved");
	             setTimeout("hideStatusMessage()", 1750);
			 }
			 else
			 {
				 $("#voice-box").fadeIn();
	             document.getElementById("statusMessage").innerHTML = "please enter badge name !"; 
	             document.getElementById("voice-box").setAttribute("status", "saved");
	             setTimeout("hideStatusMessage()", 1750);
			 }	 
		 }
		 else if(!badgePoints)
		 {
			 $("#voice-box").fadeIn();
             document.getElementById("statusMessage").innerHTML = "please enter badge points !"; 
             document.getElementById("voice-box").setAttribute("status", "saved");
             setTimeout("hideStatusMessage()", 1750);
		 }
		 else if(!badgeDescription || String(badgeDescription) === "Some Initial Content was in this textarea" )
		 {
			 $("#voice-box").fadeIn();
             document.getElementById("statusMessage").innerHTML = "please enter badge description !"; 
             document.getElementById("voice-box").setAttribute("status", "saved");
             setTimeout("hideStatusMessage()", 1750);
		 }
		 else
		 {
			 $("#addNewBadgeButton").attr("disabled",true).removeClass("grn_btn").addClass("gry_btn");
			 
			 var canEarnMoreThanOnce			= false;
			 
			 if($("#earnMoreThanOnce").attr("checked") === "checked")
			 {
				 canEarnMoreThanOnce			= true;
			 }	 
			 
			 console.info("canEarnMoreThanOnce ::"+canEarnMoreThanOnce);
			 
			 var badgeObject					= new Object();
			 
			 badgeObject.badgeName				= badgeName;
			 badgeObject.canEarnedTwice			= canEarnMoreThanOnce;
			 badgeObject.badgeValue				= badgePoints;
			 badgeObject.badgeDiscription		= badgeDescription;
			 badgeObject.badgeType				= badgeType;
			 badgeObject.badgeAssignee			= badgeAssignee;
			 badgeObject.contentType			= normal_content;
			
			 
			 if(String(badgeId) != "" && String(badgeId) != "undefined" && badgeId != undefined)
 			 {
				 badgeObject.key				= badgeId;	
			 }
			 
			 $('.add_stuff_popup').hide();
			 
			 if(libImageUrlSelected != null && libImageUrlSelected != "")
			 {
				 badgeObject.badgeLogoPath		= libImageUrlSelected;
				 saveBadgeDetails(badgeObject);
			 }
			 else if(String($("#badge_image").attr("src")).length > 1000)
			 {
				 
				 $.ajaxFileUpload({
								url				: uploadBadgeImageUrl,
								secureuri		: false,
								fileElementId	: badgeImageId,
								data			: {x1:x1,y1:y1,x2:x2,y2:y2,height:croppedHeight,width:croppedWidth},
								success			: function (text , status)
												  {
														$.ajax({  
										   			    		type: 'POST', 
										   			    		url: '/getUploadedBadgeImageUrl',
										   			    		async: false, 
										   			    		success: function( data )
										   			    		{
										   			    			if(data)
																	{
																		badgeObject.badgeLogoPath		= String(data).split("_ah/image.jpg")[0];
																		uploadBadgeImageUrl				= String(data).split("_ah/image.jpg")[1];
																		badgeObject.badgeImageBlobkey	= String(data).split("_ah/image.jpg")[2];
																		saveBadgeDetails(badgeObject);
																	}
										   			    		}
										   			     });
												  }
				 });
				 
			 }
			 else
			 {
				 badgeObject.badgeLogoPath		= badgeImageUrl;
				 saveBadgeDetails(badgeObject);
			 }	 
		 }	 
		 
	});
	
	function saveBadgeDetails(badgeObject)
	{
		var videoListObject						= new Object();
		var videoId								= "";
		var buildBadgesAndTrophiesLi			= "";
		var badgeOrTrophyIcon					= "";
		var videoKeysList						= new Array();
		
		$('.add_vlink_cont li').each(function(){
			
			var videoObject						= new Object();
			
			videoId								= $(this).attr('id');
			
			videoObject.videothumbnail			= $(".add_vlink_cont li[id="+videoId+"]").find("img").attr("src");
			videoObject.vidtitle				= $(".add_vlink_cont li[id="+videoId+"]").find("p").html();
			videoObject.Videourl				= $(".add_vlink_cont li[id="+videoId+"] > #"+videoId+"videoid").html();
			videoObject.viddesc					= $(".add_vlink_cont li[id="+videoId+"] > #"+videoId+"description").html();
			videoObject.videoId					= videoId;
			videoObject.videoDuration			= $(".add_vlink_cont li[id="+videoId+"] > #"+videoId+"duration").html();
			
			if(String($(this).find("img").attr("id")) === "undefined")
			{
				jQuery._uuidlet= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
				
				videoObject.key 									= jQuery._uuidlet;
				
				videoDetailsMap[jQuery._uuidlet]					= videoObject;
				
				videoObject.videoType								= "newVideo";
				videoKeysList.push(jQuery._uuidlet);
			}
			else
			{
				videoObject.key										= String($(this).find("img").attr("id"));
				
				videoDetailsMap[$(this).find("img").attr("id")] 	= videoObject;
				
				
				videoKeysList.push($(this).find("img").attr("id"));
			}	
			
			videoListObject[videoId]								= videoObject;
		
		});
		
		if(String($.trim($("#toAddNewTag").val())) != "")
		{
			arrayofTagsCreatedByAdmin.push($.trim($("#toAddNewTag").val()));
		}
		
		$('.add_stuff_popup').hide();
		
		$.ajax({  
		    	type	: 'POST', 
		    	url		: '/saveBadgeDetails', 
		    	data	: {badgeObject:JSON.stringify(badgeObject),videoListObject:JSON.stringify(videoListObject),arrayofTagsCreatedByAdmin:arrayofTagsCreatedByAdmin,arrayofTagsCreatedByUser:arrayofTagsCreatedByUser},
		    	async	: true, 
		    	success	: function(data)
		      			  {
		    					if(String(badgeId) != "" && String(badgeId) != "undefined" && badgeId != undefined)
		    					{
		    						if(String(badgeObject.badgeType) === "badgelibrary")
		    						{
		    							$("#add_product > li[id='"+badgeId+"']").remove();
		    						}
		    						else
		    						{
		    							$("#add_product > li[id='"+badgeId+"']").find("img").attr({"src":badgeObject.badgeLogoPath});
		    		 		   			$("#add_product > li[id='"+badgeId+"']").find("b").html(badgeObject.badgeValue);
		    		 		   			$("#add_product > li[id='"+badgeId+"']").find("h4").html(badgeObject.badgeName);
//		    		 		   			$("#add_product > li[id='"+badgeId+"']").find("p").html(String(badgeObject.badgeDiscription).substring(0,50));
		    		 		   			$("#add_product > li[id='"+badgeId+"'] > li").siblings().attr("id",badgeId);
		    		 		   			
		    		 		   			var oldImageUrl									= badgeListMap[badgeId].badgeLogoPath;
		    		 		   			var newImageUrl									= badgeObject.badgeLogoPath;
		    		 		   			
		    		 		   			badgeListMap[badgeId].badgeLogoPath				= badgeObject.badgeLogoPath;
		    		 		   			badgeListMap[badgeId].badgeValue				= badgeObject.badgeValue;
		    		 		   			badgeListMap[badgeId].badgeName					= badgeObject.badgeName;
		    		 		   			badgeListMap[badgeId].badgeDiscription.value	= badgeObject.badgeDiscription;
		    		 		   			badgeListMap[badgeId].badgeType					= badgeObject.badgeType;
		    		 		   			badgeListMap[badgeId].contentType				= String(badgeObject.contentType);
		    		 		   			badgeListMap[badgeId].videoid					= videoKeysList;
		    		 		   			badgeListMap[badgeId].canEarnedTwice			= badgeObject.canEarnedTwice;
		    		 		   			
		    		 		   			badgeListMap[badgeId].badgeTagsContents			= [String(arrayofTagsCreatedByAdmin),"nimdasgat",String(arrayofTagsCreatedByUser,"resusgat")];
		    		 		   			
			    		 		   		if(String(badgeObject.badgeType) === "trophy")
			    	 		   			{
				    		 		   		$("#add_product > li[id='"+badgeId+"']").find(".trophy_icon").css({		'display'				: 'inline',
				    		 		   																				'background-position'	: '1px -59px',
				    		 		   																				'left'					: '330px',
				    		 		   																				'top'					: '-69px'
				    		 		   		});
			    	 		   			}
			    	 		   			else if(String(badgeObject.badgeType) === "badge")
			    	 		   			{
				    	 		   			$("#add_product > li[id='"+badgeId+"']").find(".badge_icon").addClass("trophy_icon").css({		'display'				: 'inline',
																																			'background-position'	: '1px 0px',
																																			'left'					: '330px',
																																			'top'					: '-69px'
											});
			    	 		   			}
		    						}	
		    					}
		    					else if(data && String(data) != "[object XMLDocument]")
		    					{
		    						var badgeKey 								= 	String($.trim(data));
		    						
		    						if(String(badgeObject.badgeType) === "trophy")
		    	 		   			{
		    	 		   				badgeOrTrophyIcon						= '<code class="trophy_display_icon"></code>';
		    	 		   			}
		    	 		   			else if(String(badgeObject.badgeType) === "badge")
		    	 		   			{
		    	 		   				badgeOrTrophyIcon						= '<code class="badge_display_icon"></code>';
		    	 		   			}	
		    						
    		 		   				if(badgeObject.badgeType === "trophy" || badgeObject.badgeType === "badge")
    		 		   				{
    		 		   					buildBadgesAndTrophiesLi 				=  '<li title="'+badgeObject.badgeName+'" id='+badgeKey+' class="badges_list"><div class="col1"><div class="badge_hldr">'+
																				   '<img src="'+badgeObject.badgeLogoPath+'" width="87" height="87" /></div></div>'+
																				   '<div>'+'<h4 style="font-size:15px;">'+badgeObject.badgeName+'</h4>'+badgeOrTrophyIcon+'</div><div class="clear_all"></div>'+
																				   '<div class="on_over"><ol>'+
																				   '<li title="Points"><b>'+badgeObject.badgeValue+'</b></li>'+
																				   '<li title="Enable / Disable" class="show_product show_product_act" id='+badgeKey+'></li>'+
																				   '<li title="Edit Badge" id='+badgeKey+' class="edit_product add_badge_act"></li>'+
																				   '<li title="Delete Badge" class="del_product del_act" id='+badgeKey+'></li>'+
																				   '</ol></div></li>';

    		 		   					$("#add_product").append(buildBadgesAndTrophiesLi);
    		 		   				}	
					    		 		
	    		 		   			
	    		 		   			badgeObject.badgeTagsContents				= 	[String(arrayofTagsCreatedByAdmin),String(arrayofTagsCreatedByUser)]
	    		 		   			badgeObject.videoid							=	videoKeysList
	    		 		   			badgeObject.key								= 	badgeKey;
	    		 		   			badgeListMap[badgeKey]						= 	badgeObject;
	    		 		   			
	    		 		   			
	    		 		   			$(".new_badge_holder").scrollTop($(".new_badge_holder")[0].scrollHeight);
		    					}
		    					
		    					
		    					
		    					badgeId											= 	"";
		    					badgeImageUrl									= 	"";
		    					normal_content									= 	true;
		    					$('#backgroundPopup').fadeOut();
		    					
		    					$('#badge_name').val("");
		    					$('#badge_points').val("");
		    					$("#badge_image").attr("src","");
		    					$('.nicEdit-main').html("Some Initial Content was in this textarea");
		    					$('.add_vlink_cont').empty();
		      			  }
	    });
		
		$("#voice-box").fadeIn();
		document.getElementById("statusMessage").innerHTML = "Saved...";	
		document.getElementById("voice-box").setAttribute("status", "saved");
		setTimeout("hideStatusMessage()", 1750);
	}
	


	var i					= 0;
 	var videotitle			= new Array();
  	var videourl			= new Array();
  	var videodescription	= new Array();
 	var videoids			= new Array();
 	var videothumbnails		= new Array();
 
	function videodetails()
  	{
	  	var existingUlVideo = "";
		var msg 			= '';
		
		   	msg 			+= "\n Video# : " + $('#textbox1').val();
		   	msg 			+= "\n Video# : " + $('#textbox2').val();
		   	msg 			+= "\n Video# : " + $('#textbox3').val();
		   	
		 	videotitle1		= $('#textbox1').val();
		   	videourl1		= $('#textbox2').val();
		    var imgUrl_small= $('#imagethumbnail').attr("src");
		    
			i++;
		 	var row_clrodd	= "row_clr even";

			if( row_clrodd === "row_clr even" )
			{
				row_clrodd	= "row_clr odd";
			}
			else
			{
				row_clrodd	= "row_clr even"
			} 
	
			var videoName 	= $('#textbox1').val().substr(0,20);
			var videoDes 	= $('#textbox3').val();
					
					
			existingUlVideo	+= '<li style="margin: 0 15px 20px 0 !important ;" id="'+videoid+'" class="'+row_clrodd+'" onmouseout="removeEditAndRemove(this);" onmouseover="displayEditRemove(this);">'+
				    		   '<code class="remove" onclick="removevideo(this)" style="display: none;"></code>'+
						       '<code id="'+videoid+'" class="edit add_vlink_act" onclick="editVideoDetails(this)" style="display: none;"></code>'+
							   '<img class="video_thump" width="108" height="auto" src="'+imgUrl_small+'">'+
						       '<p class="video_title_heading">'+videotitle1+'</p><span id="'+videoid+'description" style="display:none;">'+videoDes+'</span><span id="'+videoid+'videoid" style="display:none;">'+videourl1+'</span><span id="'+videoid+'duration" style="display:none;">'+videoDuration+'</span>'+
						       '</li>';
						       
			var allLi 		= $('.add_vlink_cont').html();
			
			$('.add_vlink_cont').html(allLi + existingUlVideo);			
			$('.add_stuff_popup').show();
			$('#videopopup').hide();
  	}                                
	
	 var indexofvid;
		function displayEditRemove(selVideo)
		{
			var sel = $(selVideo).attr("id");
			// console.info("sel ::"+sel);
			$("#"+sel + "> code").show();
			// $(selVideo + " > code.edit").show();
		}
		function removeEditAndRemove(selVideo)
		{
			var sel = $(selVideo).attr("id");
			$("#"+sel + "> code").hide();
		}
		var templiid="";
		var isEditFlag="";
		function editVideoDetails(selVideo)
		{
			isEditFlag="yes";
			
			var tempids=$(selVideo).attr("id");
			templiid=tempids;
			
			$('#backgroundPopup').show();
			$('.popup_holder').hide();
			$('#editvideopopup').fadeIn();
			
			 $('#title').val($(".add_vlink_cont li[id="+tempids+"]").find("p").html());
			 $('#url').val($(".add_vlink_cont li[id="+tempids+"] > #"+tempids+"videoid").html());
			var imgurlsrc=$(".add_vlink_cont li[id="+tempids+"]").find("img").attr("src");
			 $('#imagethumbnail1').attr('src',imgurlsrc);
			  $('#desc').val($(".add_vlink_cont li[id="+tempids+"] > #"+tempids+"description").html());
			  
		   	 
		}
		function editvideodetails(){
			
			 var title= $('#title').val();
			 var url= $('#url').val();
			 var desc=  $('#desc').val();
			
			 var imgUrl_small =$('#imagethumbnail1').attr("src");
			  $(".add_vlink_cont li[id="+templiid+"]").find("p").html(title);
			  $(".add_vlink_cont li[id="+templiid+"]").find("img").attr('src',imgUrl_small);
			  $(".add_vlink_cont li[id="+templiid+"] > #"+templiid+"videoid").html(url);
			  $(".add_vlink_cont li[id="+templiid+"] > #"+templiid+"description").html(desc);
			 
		
			  $('#editvideopopup').hide(); 
			  $('.add_stuff_popup').show(); 
		}
		
		 var indexofvid1;
		 function removevideo(selVideo1){
			 var liSelVideo1 = $(selVideo1).parent("li");
			    indexofvid1=videothumbnails.indexOf($(liSelVideo1).find("img").attr("src"));
			    videotitle.splice(indexofvid1,1);
			    videourl.splice(indexofvid1,1);
			    videodescription.splice(indexofvid1,1);
			    videoids.splice(indexofvid1,1);
			    videothumbnails.splice(indexofvid1,1);
			    
			    var toRemoveLi = $(selVideo1).parent("li").attr("id");
			    $('#'+toRemoveLi).remove();
		        
			  // return false;
		 } 
		function isNumberKey(evt)
		{
		   var charCode = (evt.which) ? evt.which : 

		event.keyCode
		   if (charCode > 31 && (charCode < 48 || charCode > 57))
		      return false;

		   return true;
		}
		
		/* method for retrieving thumbnail from videourl */
		function getScreen( url, size )
		{
		 if(url === null){ return ""; }
		
		 size = (size === null) ? "big" : size;
		 var vid;
		 var results;
		
		 results = url.match("[\\?&]v=([^&#]*)");
		
		 vid = ( results === null ) ? url : results[1];
		
		 if(size == "small"){
		   return "http://img.youtube.com/vi/"+vid+"/2.jpg";
		 }else {
		   return "http://img.youtube.com/vi/"+vid+"/0.jpg";
		 }
		}
	/* method for retrieving videoid from videourl */
		
		function youtube_parser(url){
			var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
			var match = url.match(regExp);
			if (match&&match[7].length==11){
			    return match[7];
			}else{
			    $("#voice-box").fadeIn();
				document.getElementById("statusMessage").innerHTML = "URL is Incorrect!";	
				document.getElementById("voice-box").setAttribute("status", "saved");
				setTimeout("hideStatusMessage()", 1750);
			}
		}
		
		
		
		 	var videoid = '';
		    function youtubeFetchData( )
		    {
		    	$('#imagethumbnail1').attr('src',"");
		   	  $('#imagethumbnail').attr('src',"");
		    	
		    	  
		      var tempvar = $('#textbox2' ).attr('value');
		      
		      if ( /^https?\:\/\/.+/i.test( tempvar ) )
		      {
		        tempvar = /[\?\&]v=([^\?\&]+)/.exec( tempvar );
		        if ( ! tempvar )
		        {
		        	
		           $("#voice-box").fadeIn();
								document.getElementById("statusMessage").innerHTML = "YouTube video URL has a problem!";	
								document.getElementById("voice-box").setAttribute("status", "saved");
								setTimeout("hideStatusMessage()", 1750);
								 $('#add_link').hide();
		         
		         wrongurl();
		          return;
		        }
		       
		        videoid = tempvar[ 1 ];
		      }
		      else
		      {
		        if ( /^[A-Za-z0-9_\-]{8,32}$/.test( tempvar ) == false )
		        {
		        	wrongurl();
		           $("#voice-box").fadeIn();
								document.getElementById("statusMessage").innerHTML = "YouTube video ID has a problem!";	
								document.getElementById("voice-box").setAttribute("status", "saved");
								setTimeout("hideStatusMessage()", 1750);
								 $('#add_link').hide();
		          return;
		        }
		      
		        videoid = tempvar;
		      }
		      $('#add_link').show();
		    $.ajaxSetup({ cache: true });
		      $.getScript( 'http://gdata.youtube.com/feeds/api/videos/' + encodeURIComponent( videoid ) + '?v=2&alt=json-in-script&callback=youtubeFetchDataCallback' );
		     $.ajaxSetup({ cache: false });
		    }
		    function youtubeFetchDataCallback( data )
		    {
		      var s = '';
		      s += '<img src="' + data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].url + '" width="' + data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].width + '" height="' + data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].height + '" alt="Default Thumbnail" align="right"/>';
		      s += '<b>Title:</b> ' + data.entry[ "title" ].$t + '<br/>';
		      s += '<b>Author:</b> ' + data.entry[ "author" ][ 0 ].name.$t + '<br/>';
		      s += '<b>Published:</b> ' + new Date( data.entry[ "published" ].$t.substr( 0, 4 ), data.entry[ "published" ].$t.substr( 5, 2 ) - 1, data.entry[ "published" ].$t.substr( 8, 2 ) ).toLocaleDateString( ) + '<br/>';
		      s += '<b>Duration:</b> ' + Math.floor( data.entry[ "media$group" ][ "yt$duration" ].seconds / 60 ) + ':' + ( data.entry[ "media$group" ][ "yt$duration" ].seconds % 60 ) + ' (' + data.entry[ "media$group" ][ "yt$duration" ].seconds + ' seconds)<br/>';
		      
		      if(data.entry[ "yt$statistics" ] != null)
		      {
		          s += '<b>Statistics:</b> ' + data.entry[ "yt$statistics" ].favoriteCount + ' favorite(s); ' + data.entry[ "yt$statistics" ].viewCount + ' view(s)' + '<br/>';
		            
		      }
//		      s += '<b>Statistics:</b> ' + data.entry[ "yt$statistics" ].favoriteCount + ' favorite(s); ' + data.entry[ "yt$statistics" ].viewCount + ' view(s)' + '<br/>';
		      s += '<br/>' + data.entry[ "media$group" ][ "media$description" ].$t.replace( /\n/g, '<br/>' ) + '<br/>';
			  
		      s += '<br/><a href="' + data.entry[ "media$group" ][ "media$player" ].url + '" target="_blank">Watch on YouTube</a>';
			 
			  var desc=data.entry[ "media$group" ][ "media$description" ].$t;
			  var url=data.entry[ "media$group" ][ "media$thumbnail" ][ 0 ].url;
			  var title=data.entry[ "title" ].$t ;
				 $('#imagethumbnail').attr('src',url); 
			   $('#textbox1').val(title);
			  $('#textbox1').show();
			  $('#textbox3').val(desc);
			  $('#textbox3').show();
			  // }
			 
			  $("#add_link").removeAttr("disabled");
			  
			  videoDuration				= Math.floor( data.entry[ "media$group" ][ "yt$duration" ].seconds / 60 ) + ':' + ( data.entry[ "media$group" ][ "yt$duration" ].seconds % 60 );
			  
			  
		      return false;
		      $( '#youtubeDataFetcherOutput' ).html( s );
			  
			 
		    }
		    function wrongurl(){
		    	  $('#textbox1').val("check the url");
		    	  $('#textbox1').show();
		    	  $('#textbox3').val("check the url");
		    	  $('#textbox3').show();
		    	  $("#add_link").removeAttr("disabled");
		    }
		    function blank(blankText)
		 	{
				$('#search_cus').val(""); 		
		 	}
		 	function unblank(blankText)
		 	{
				$('#search_cus').val("Find a person..."); 		
		 	}
		 	
		 	$(".nicEdit-main").live("focus",function()
		 		   {
		 				if( $(".nicEdit-main").html().indexOf("Some Initial Content was in this textarea") != -1)
		 		    		$(".nicEdit-main").html("");
		 		   });  
		 		  
		 		  function checkvideos(){
		 			  	var count=0;
		  	 	          var check=$('#textbox2').val(); 
		 			 
		 		    	$('.add_vlink_cont li').each(function(){
		 		    		var newid=$(this).attr('id');
		 		    		
		 		    		var newurl=$("#"+newid+"videoid").html();
		 		    		newurl=newurl.replace("&amp;","&");
		 		    			if(newurl===check){
		 		     	   			count=count+1;
		 		    		}
		 		    	});
		 		     		
		 		     	   	if(count>0){
		 		     	  	$("#voice-box").fadeIn();
							document.getElementById("statusMessage").innerHTML = "Video Already Exist!";	
							document.getElementById("voice-box").setAttribute("status", "saved");
							setTimeout("hideStatusMessage()", 1750);
		 		     	   	count=0;
		 		     	   	}else{
		 		     	   	videodetails();
		 		     	   	
		 		     	   }
		 		  }
		 		  
		 		  