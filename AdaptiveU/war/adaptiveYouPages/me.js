				var c=0;
				var t;
				var timer_is_on=0;
				
				function timedCount()
				{
					c=c+1;
					t=setTimeout("timedCount()",1000);
				}
				
				function doTimer()
				{
					if (!timer_is_on)
					  {
						  timer_is_on=1;
						  timedCount();
					  }
				}
				
				function stopCount()
				{
					clearTimeout(t);
					timer_is_on=0;
				}
    var duration;
    var ytplayer;
    function updateHTML(elmId, value) 
    {
        document.getElementById(elmId).innerHTML = value;
    }
     
      
      // Loads the selected video into the player.
      function loadVideo(vid) 
      {
        videoID = vid;
        if(ytplayer) 
        { 	
          ytplayer.loadVideoById(vid,videoStartingSeconds);
        }
      }
  
     
    
      // This function is called when an error is thrown by the player
      function onPlayerError(errorCode) 
      {
        //alert("An error occured of type:" + errorCode);
      }
      function updatePlayerInfo() 
      {
          // Also check that at least one function exists since when IE unloads the
          // page, it will destroy the SWF before clearing the interval.
          if(ytplayer && ytplayer.getDuration) 
          {
            updateHTML("videoDuration", ytplayer.getDuration());
            updateHTML("videoCurrentTime", ytplayer.getCurrentTime());
            updateHTML("bytesTotal", ytplayer.getVideoBytesTotal());  
            updateHTML("startBytes", ytplayer.getVideoStartBytes());
            updateHTML("bytesLoaded", ytplayer.getVideoBytesLoaded());
            }  
        }
      var videoID="muLIPWjks_M"; //ninja
   
     
      // This function is automatically called by the player once it loads
     
   function onytplayerStateChange()
   {
    	 
	   if(ytplayer.getPlayerState()=== 0) //Completed acc to bhadri
	   {
		   stopCount();
		   showalert();
	   }
	   if(ytplayer.getPlayerState()=== 1)
	   {
		   doTimer();
	   }
	   if(ytplayer.getPlayerState()=== 2)
	   {
		   stopCount();
	   }
	   if(ytplayer.getPlayerState()=== 3)
	   {
		   stopCount();
	   }
	   if(ytplayer.getPlayerState()=== -1)
	   {
//		 c=0;
		 stopCount();
	   }
   }
      // The "main method" of this sample. Called when someone clicks "Run".

      function loadPlayer(dynamicVideoURL) 
      {
      	videoID = dynamicVideoURL;
        // Lets Flash from another domain call JavaScript
        var params = { allowScriptAccess: "always" };
        // The element id of the Flash embed
        var atts = { id: "ytPlayer" ,style:"margin-left:35px"};
        // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
       swfobject.embedSWF("http://www.youtube.com/v/" + videoID +  "?&enablejsapi=1&rel=0&fs=1&version=3", 
                                   "videoDiv", "480", "295", "9", null, null, {  allowScriptAccess: 'always',
                                       allowFullScreen: 'true'
                                     }, atts);
      }
      function _run(dynamicVideoURL,startSeconds) 
      {
    	  videoStartingSeconds		= parseInt(startSeconds);
		    for(index in videodetailsMap)
			  {
		    	if(videodetailsMap[index].videoId.indexOf(dynamicVideoURL) != -1)
		    		{
		    			$('#video_heading').html(videodetailsMap[index].vidtitle);
		    			$("#video_description_holder > p").html(videodetailsMap[index].viddesc.value);
		    		}
			  }
		    
		     $('#backgroundPopup').show();
			 $('#videopopup').show();
			  $('body').addClass('noscroll');
	 		  $('body').removeClass('scroll');
	 	 	var browsername = navigator.userAgent;
			 if(browsername.indexOf("Chrome") != -1)
			 {
				 loadPlayer(dynamicVideoURL);
			 }
			 else if (browsername.indexOf("Firefox")!=-1) 
			 {
				 loadPlayer(dynamicVideoURL);
				 loadVideo(dynamicVideoURL);
			 }
			 else
			 {
				 loadPlayer(dynamicVideoURL);
			 }	 
      }
      
     
   var player="false"; 
   function onYouTubePlayerReady(playerId) 
   {
	   	player="true"; 
        ytplayer = document.getElementById("ytPlayer");
        ytplayer.addEventListener("onError", "onPlayerError");
        ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
        loadVideo(videoID); 
   }

   $.extend($.expr[':'], {
		'containsi': function (elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
		});
	
   
   var isTodaysAuctionClicked 			= "0";
 	var clientDateAccToSettingsTimeZone = "";
 	var serverTime			   			= "";
$(document).ready(function() 
{
	
	
	$(window).bind('hashchange',function(e)
	{
		console.log("comes here"+String(e.originalEvent.newURL));
		if(String(e.originalEvent.newURL).indexOf("myprofile") != -1)
			{
				console.log("hashchanges ::"+ e.originalEvent.newURL);
				window.location.hash = "myprofile";
				$('#myprofile').addClass('active');
				$('#getStuffWithBadge').removeClass('active');
				$('#earnbadges').removeClass('active');
				$('#badgestowork').removeClass('active');
				$('#settingsbutton,#todays_auction').removeClass('active');
				$('#badgeInformation').hide();
				$('#badges_to_work').hide();
				$('#getstuff').hide();
				$('#earn_badge').hide();
				$('#Settings').hide();
				$('#badgeInformation').hide();
				$('#myBadgesTrophies,#myBadgesTrophies > .badges_list').show();
				$('.auction_holder').hide();
				$(".badges_tag_holder").hide();
				$(".filtertags").hide();
				$(".lineseperator").hide();
				$(".tagfilterlist").hide();
			}
		else if(String(e.originalEvent.newURL).indexOf("earnbadgeslink") != -1)
			{
			console.log("earnbadges");
			$('#earn_badge').show();
			$('#badgeInformation').hide();
			
			 $('#badge_holder,#earn_badge > .points_wrapper,.badges_list').show();
			    $('#todays_auction').removeClass('active');
			    $('.auction_holder').hide();
				$('#myBadgesTrophies').hide();
				$('#getstuff').hide();
				$('#earn_badge').show();
				$('#badgeInformation').hide();
				$('#Settings').hide();
				$('#badgestowork').removeClass('active');
				$('#badges_to_work').hide();
				$('#myprofile').removeClass('active');
				$('#getStuffWithBadge').removeClass('active');
				$('#settingsbutton').removeClass('active');
				$('#earnbadges').addClass('active');
				 
				 var buildEarnedbadgeLi 		= "";
				 var buildWorkingbadgeLi 		= "";
				 var buildNotStartedbadgeLi 	= "";
				 var badgeStatus	  			= "";
				 var statusTitle				= "";
				 
				 for(index in badgesListMap) 
			     {
			    	 console.log(badgesListMap[index].canEarnedTwice);
//			    	 if(String(badgesListMap[index].canEarnedTwice).indexOf("true") != -1)
//			    		 {
			    		
					    	 for(indexingUserStatus in userstatusdetails)
					    	 {
					    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[index].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
					    		 {
					    			 if(badgeStatus != "unwatched")
					    			 {
					    				 if( String(userstatusdetails[indexingUserStatus].status) === "working on" )
						    			 {
						    				 badgeStatus	= "unwatched";
						    				 statusTitle	= "Currently Working-On";
						    			 }
					    				 else if(String(userstatusdetails[indexingUserStatus].status) === "requested")
						    			 {
						    				 badgeStatus	= "unwatched";
						    				 statusTitle	= "Requested";
						    			 }
						    			 else if( String(userstatusdetails[indexingUserStatus].status) === "approved")
						    			 {
						    				 badgeStatus	= "watched";
						    				 statusTitle	= "Already Possessing";
						    			 }
						    			 else
						    			 {
						    				 badgeStatus	= "";
						    				 statusTitle	= "";
						    			 }
					    			 }	 
					    		 }
					    	 }	 
					    	 
						     if(String(badgesListMap[index].badgeType) === "badge" && String(badgesListMap[index].isFlag) != "disabled")
						     {
						    	 if(String(badgeStatus) === "unwatched")
						    	 {
						    		 buildWorkingbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
						    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>'; 
						    	 }
						    	 else if(String(badgeStatus) === "watched")
						    	 {
						    		 buildEarnedbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
						    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
						    	 }
						    	 else if(String(badgeStatus) === "")
						    	 {
						    		 buildNotStartedbadgeLi 	+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
						    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
						    	 }	 
						    	 
						     }	 
						    	 
						     badgeStatus = "";
						     statusTitle = "";
//			    		 }
/*			    	 else
//			    	 {
			    		 	for(indexUserBadgeLogJdo in userBadgeLogJdoMap)
			    		 		{
			    		 			if(String(userBadgeLogJdoMap[indexUserBadgeLogJdo].userId) === String(userKey) && userBadgeLogJdoMap[indexUserBadgeLogJdo].badgeId.indexOf(String(badgesListMap[index].key)) == -1)
			    		 			{
			    		 				for(indexingUserStatus in userstatusdetails)
								    	 {
								    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[index].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
								    		 {
								    			 if(badgeStatus != "unwatched")
								    			 {
								    				 if( String(userstatusdetails[indexingUserStatus].status) === "working on" )
									    			 {
									    				 badgeStatus	= "unwatched";
									    				 statusTitle	= "Currently Working-On";
									    			 }
								    				 else if(String(userstatusdetails[indexingUserStatus].status) === "requested")
									    			 {
									    				 badgeStatus	= "unwatched";
									    				 statusTitle	= "Requested";
									    			 }
									    			 else if( String(userstatusdetails[indexingUserStatus].status) === "approved")
									    			 {
									    				 badgeStatus	= "watched";
									    				 statusTitle	= "Already Possessing";
									    			 }
									    			 else
									    			 {
									    				 badgeStatus	= "";
									    				 statusTitle	= "";
									    			 }
								    			 }	 
								    		 }
								    	 }	 
								    	 
									     if(String(badgesListMap[index].badgeType) === "badge" && String(badgesListMap[index].isFlag) != "disabled")
									     {
									    	 if(String(badgeStatus) === "unwatched")
									    	 {
									    		 buildWorkingbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
									    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>'; 
									    	 }
									    	 else if(String(badgeStatus) === "watched")
									    	 {
									    		 buildEarnedbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
									    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
									    	 }
									    	 else if(String(badgeStatus) === "")
									    	 {
									    		 buildNotStartedbadgeLi 	+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
									    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
									    	 }	 
									    	 
									     }	 
									    	 
									     badgeStatus = "";
									     statusTitle = "";
			    		 				}
			    		 		}
			    		 }*/
			     }
				$('#earnBadgeUL').html(buildWorkingbadgeLi+buildNotStartedbadgeLi+buildEarnedbadgeLi);
				
				
				var buildEarnTrophiesLi = "";
			    for(index in badgesListMap)
			    {
			    	for(indexingUserStatus in userstatusdetails)
			    	{
			    		if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[index].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
			    		{
			    			if(badgeStatus != "unwatched")
			    			{
			    				if( String(userstatusdetails[indexingUserStatus].status) === "working on" || String(userstatusdetails[indexingUserStatus].status) === "requested" )
				    			{
				    				badgeStatus	= "unwatched";
				    				statusTitle	= "Currently Working-On";
				    			}
				    			else if( String(userstatusdetails[indexingUserStatus].status) === "approved")
				    			{
				    				badgeStatus	= "watched";
				    				statusTitle	= "Already Possessing";
				    			}
				    			else
				    			{
				    				badgeStatus	= "";
				    				statusTitle	= "";
				    			}
			    			}	 
			    		}
			    	}
			        if( badgesListMap[index].badgeType === "trophy" && badgesListMap[index].isFlag != "disabled")
			        {
			        	 buildEarnTrophiesLi += '<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
					      '<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
			        }
			        
			        badgeStatus = "";
			        statusTitle	= "";
			            
			    }
			    
			    $('#earnTrophiesUL').html(buildEarnTrophiesLi);
			    $('#earnTrophiesUL li,#earnBadgeUL li,.earnBadgeUL li').find("span").tipTip();
			    
			    $('.filtertags').tipTip({defaultPosition : "right"});
			    
			    
			    $(".badges_tag_holder").hide();
			    $(".filtertags").show().css("margin-left",.199 * ($("#profile_panel").width())).css("margin-top",.14 * ($("#profile_panel").height()));
				$(".lineseperator").show().css("margin-left",.226 * ($("#profile_panel").width()));
				$(".tagfilterlist").hide().css("margin-left",0.036 * ($("#profile_panel").width()));
			}
		else if(String(e.originalEvent.newURL).indexOf("getstuff") != -1)
			{
				window.location.hash="getstuff";
				$('#myBadgesTrophies').hide();
				$('#earn_badge').hide();
				$('#badgeInformation').hide();
				$('#badgestowork').removeClass('active');
				$('#badgeInformation').hide();
				$('#badges_to_work').hide();
				$('#myprofile').removeClass('active');
				$('#todays_auction').removeClass('active');
				$('#earnbadges').removeClass('active');
				$('#getStuffWithBadge').addClass('active');
				$('#settingsbutton').removeClass('active');
				$('#getstuff').show();
				$('#Settings').hide();
				$('.auction_holder').hide();
				$(".badges_tag_holder").hide();
				$(".filtertags").hide();
				$(".lineseperator").hide();
				$(".tagfilterlist").hide();
			}
		else if(String(e.originalEvent.newURL).indexOf("settings") != -1)
		{
			window.location.hash="settings";
			$('#myBadgesTrophies').hide();
			$('#earn_badge').hide();
			$('#badgeInformation').hide();
			$('#todays_auction').removeClass('active');
			$('#badgeInformation').hide();
			$('#badges_to_work').hide();
			$('#myprofile').removeClass('active');
			$('#getStuffWithBadge').removeClass('active');
			$('#badgestowork').removeClass('active');
			$('#earnbadges').removeClass('active');
			$('#settingsbutton').addClass('active');
			$('#getstuff').hide();
			$('#Settings').show();
			$('.auction_holder').hide();
			$(".badges_tag_holder").hide();
			$(".filtertags").hide();
			$(".lineseperator").hide();
			$(".tagfilterlist").hide();
		}
		else if(String(e.originalEvent.newURL).indexOf("auction") != -1)
		{
			window.location.hash = "auction";
			$(".badges_tag_holder").hide();
	  		$(".filtertags").hide();
	  		$(".lineseperator").hide();
	  		$(".tagfilterlist").hide();
			$('.auction_holder').show();
			$('.points_holder').hide();
			$('.bid_points').hide();
			$('#todays_auction').addClass('active');
			$('#myprofile').removeClass('active');
			$('#earnbadges').removeClass('active');
			$('#getStuffWithBadge').removeClass('active');
			$('#settingsbutton').removeClass('active');
			$('#badgestowork').removeClass('active');
			$('.productlist').show();
			$('#myBadgesTrophies').hide();
			$('#earn_badge').hide();
			$('#getstuff').hide();
			$('#Settings').hide();	
			$('.auction_detail_holder').hide();
			$('#badges_to_work').hide();
			$('#badgeInformation').hide();
			$('#all_transactions').hide();
			
			var buildAuctionMap = "";
			var incrementSec = 0;
			if(String(isTodaysAuctionClicked).indexOf("0") != -1)
			{
				isTodaysAuctionClicked = "1";
				
				$.ajax(
						     {  
						    	 type: 'GET', url: '/getServerTime',async: false, success: function( data )
						    	 {
						    		 if(data != null)
						    			 {
							    			serverTime = data;
						    			 }
						    	 }
						     });
				console.log(parseFloat(serverTime));
				
			}
			for(indexUserAuctionMap in auctionListMap)
				{
					
					console.log("Comes here");
					var currentClientEndDate = new Date(auctionListMap[indexUserAuctionMap].auctionEndTime);
					var clientOffset = 5.5;
					
					var currentClintEndLocalTime = currentClientEndDate.getTime();
					var currentClientUTCEndOffset = currentClientEndDate.getTimezoneOffset()*60000;
					var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
					var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
					//console.log(clientEndTimeAccToTimeZone);
					var endDate		= new Date(clientEndTimeAccToTimeZone);
					
					var currentClientLocation = new Date(parseFloat(serverTime));
					currentClientLocation.setSeconds(currentClientLocation.getSeconds() + incrementSec);
					var currentClientLocalTime = currentClientLocation.getTime();
					var currentClientUTCOffset = currentClientLocation.getTimezoneOffset()*60000;
					var convertedClientUTCTime = ((currentClientLocalTime) + (currentClientUTCOffset));
					var clientTimeAccToTimeZone = convertedClientUTCTime + (3600000 * clientOffset);
					clientDateAccToSettingsTimeZone = new Date(clientTimeAccToTimeZone);
					console.log("clientDateAccToSettingsTimeZone ::"+clientDateAccToSettingsTimeZone);
					if(endDate.getTime() > clientDateAccToSettingsTimeZone.getTime())
						buildAuctionMap += '<li class="product_list live_auction_item" id="'+indexUserAuctionMap+'" onclick="showDetailedAuction(this)"><img height="140px" width="140px" src="'+auctionListMap[indexUserAuctionMap].auctionImgId+'">'
	                    +'<h3>'+auctionListMap[indexUserAuctionMap].auctionName+'</h3>'
	                    +'<div class="left_time"><h1>00:00:00</h1><h2>Left to end Bid</h2></div></li>';
					else if(endDate.getTime() < clientDateAccToSettingsTimeZone.getTime())
						buildAuctionMap +=  '<li class="product_list closed_auction_item" style="display:none" id="'+indexUserAuctionMap+'" onclick="showDetailedAuction(this)"><img height="140px" width="140px" src="'+auctionListMap[indexUserAuctionMap].auctionImgId+'">'
		                    +'<h3>'+auctionListMap[indexUserAuctionMap].auctionName+'</h3>'
		                    +'<div class="left_time"><h1>00:00:00</h1><h2>Left to end Bid</h2></div></li>'
					startTime(endDate,indexUserAuctionMap,incrementSec);
				}
			
			
			$('.live_auction_holder').html(buildAuctionMap);
		}
		
		
	});
	
	
	
   $(window).load(function(){

		$("#profile_panel").height($(window).height() - ( $("#header").height()+$("#login_details").height()+30)+"px");
		$(".lineseperator,.tagfilterlist").height(1.2 * ($("#profile_panel").prop("scrollHeight"))).css({"margin-top":"-20px"});
		
//		$('.content-area').jScrollPane({horizontalGutter:5,verticalGutter:5,'showArrows': false});
//		$('.jspDrag').hide();
//		$('.jspScrollable').mouseenter(function(){
//			$(this).find('.jspDrag').stop(true, true).fadeIn('slow');
//			});
//			$('.jspScrollable').mouseleave(function(){
//				$(this).find('.jspDrag').stop(true, true).fadeOut('slow');
//				});
	});
	
	$(window).resize(function(){
		
		$("#profile_panel").height($(window).height() - ( $("#header").height()+$("#login_details").height()+30 ) +"px");
		$(".lineseperator,.tagfilterlist").height($("#profile_panel").prop("scrollHeight")).css({"bottom":"auto","margin-top":"-20px"});
		
//		$('.content-area').jScrollPane({horizontalGutter:5,verticalGutter:5,'showArrows': false});
//		$('.jspDrag').hide();
//		$('.jspScrollable').mouseenter(function(){
//			$(this).find('.jspDrag').stop(true, true).fadeIn('slow');
//			});
//			$('.jspScrollable').mouseleave(function(){
//				$(this).find('.jspDrag').stop(true, true).fadeOut('slow');
//				});
		
	});
	
	$("#profile_panel").scroll(function(){
			$("#profile_panel").height($(window).height() - ( $("#header").height()+$("#login_details").height()+30 ) +"px");
			$(".lineseperator,.tagfilterlist").height($("#profile_panel").prop("scrollHeight")).css({"bottom":"auto","margin-top":"-20px"});
		 });
	
	$("#auction_winner_close").live("click",function(){
		
		$("#auction_winner").hide();
		$("#backgroundPopup").fadeOut();
		
	});
	
	$(window).focus(function(){
		
		if(ytplayer && ytplayer.getPlayerState() === 2)
		{
			ytplayer.playVideo();
		}
		
	});
	
	$(window).blur(function(){
		
		if(ytplayer && ytplayer.getPlayerState() === 1)
		{
			ytplayer.pauseVideo();
		}
		
	});
	
	
});

$(document).ready(function() 
{
	
	$("#create_account").live("submit",function(){
		
		$.ajax({
			url 	: 	'/createCompany',
			type	: 	'GET',
			data	: 	$("#create_account").serialize(),
			async	: 	false,
			success : 	function(data)
					 	{
							window.location.href=window.location.href;
						}
		});
		
		
	});
	$(".user_info").hover(
			function()
			{
				$(".badge_navigator").fadeIn(1000);
			},
			function()
			{
				$(".badge_navigator").fadeOut('normal');
			}
	);
	$('.tooltipB').tipsy({trigger: 'focus', gravity: 's'});
//	$('#company-name').html(bannerCompanyName);
//	$("#earnbadges").html(bannerCompanyName+"'s Badges");
//	$(".BadgesTab").html(bannerCompanyName+"'s Badges");
//	$(".TrophiesTab").html(bannerCompanyName+"'s Trophies");
		
	for(index in userDetails)
	  {
			userKey  = userDetails[index].key;
			userName = userDetails[index].userName;
			userFirstName = userDetails[index].firstName;	
			userLastName =  userDetails[index].lastName;
			userEmail = userDetails[index].userName;
			userType = userDetails[index].type;
			profilePicture	= userDetails[index].profilePicture;
		 if(userDetails[index].profilePicture)
	 	 {
	 		$("#profileImage").attr("src",userDetails[index].profilePicture);
	 	 }
	 	 else
	 	 {
	 		$("#profileImage").attr("src","../images/genral-photo.jpg");
	 	 }
		 
		 
		$('.user_person_name').html(userFirstName+" "+ userLastName);  
//		$('.user_person_name_badges').html(userFirstName+"'s Badges");  
//		$('.user_person_name_trophies').html(userFirstName+"'s Trophies");  
//		$('.user_person_name_stuffs').html(userFirstName+"'s Stuff"); 
		if(userFirstName  != null && userFirstName != 'undefined' && userLastName  != null && userLastName != 'undefined')
		$('.welcome_username').html("Welcome, "+userFirstName+" "+ userLastName);
		if(String(userDetails[index].type).indexOf("Admin") != -1 || String(userDetails[index].type).indexOf("Company") != -1)
		{
		$('.adminpanel').show();
		}
		else
			{
				$('.adminpanel').remove();
			}
		
	  }
	
	if(String(userDetails[userKey].companyName) === "" && String(userDetails[userKey].type) === "Company")
	{
		console.log("in")
		$("#backgroundPopup,#form_wrapper").fadeIn();
		$("#backgroundPopup").css({"position":"fixed"});
		
		return false;
	}
	else
	{
		$("#form_wrapper").remove();
		history.pushState(new Object,"Me","/persistUser");
	}	
	
	
	//Update for userBadgeLogJdo
	for(index in userBadgeLogJdoMap)
	{
		if(userBadgeLogJdoMap[index].userId)
		if(userBadgeLogJdoMap[index].userId.indexOf(userKey) != -1)
			{
				var stuffArray 					= new Array();
				var auctionArray				= new Array();
				var userStuffLi 				= "";
				if(String(userBadgeLogJdoMap[index].stuffId).indexOf(",") != -1)
					stuffArray = String(userBadgeLogJdoMap[index].stuffId).split(",");
				else if(userBadgeLogJdoMap[index].stuffId && userBadgeLogJdoMap[index].stuffId != "")
					stuffArray.push(String(userBadgeLogJdoMap[index].stuffId));
				
				if(String(userBadgeLogJdoMap[index].auctionId).indexOf(",") != -1)
					auctionArray = String(userBadgeLogJdoMap[index].auctionId).split(",");
				else if(userBadgeLogJdoMap[index].auctionId && userBadgeLogJdoMap[index].auctionId != "")
					auctionArray.push(String(userBadgeLogJdoMap[index].auctionId));
				
				
					for(var indexStuffArray =0; indexStuffArray<stuffArray.length;indexStuffArray++)
					{
						for(badge_Index in badgesListMap)
						{
							if(badge_Index.indexOf(stuffArray[indexStuffArray]) != -1)
							{
								if(badgesListMap[badge_Index].badgeType.indexOf("item") != -1)
								{
									userStuffLi += '<li style="cursor:default"><img title="'+badgesListMap[badge_Index].badgeName+'" alt="'+badgesListMap[badge_Index].badgeName+'" src="'+badgesListMap[badge_Index].badgeLogoPath+'"><div class="badge-name " title="'+badgesListMap[badge_Index].badgeName+'">'+badgesListMap[badge_Index].badgeName.substr(0,15)+'</div></li>'
								}
							}
						}
					}
					
					for(var indexAuctionArray =0; indexAuctionArray<auctionArray.length;indexAuctionArray++)
					{
						for(badge_Index in auctionListMap)
						{
							if(badge_Index.indexOf(auctionArray[indexStuffArray]) != -1)
							{
								userStuffLi += '<li style="cursor:default"><img title="'+auctionListMap[badge_Index].auctionName+'" alt="'+auctionListMap[badge_Index].auctionName+'" src="'+badgesListMap[badge_Index].auctionImgId+'"><div class="badge-name " title="'+badgesListMap[badge_Index].auctionName+'">'+badgesListMap[badge_Index].auctionName.substr(0,15)+'</div></li>'
							}
						}
					}
				$("#stuffs_total").html(userStuffLi);
			}
	} 
	for(index in userBadgeLogJdoMap)
	{
		if(userBadgeLogJdoMap[index].userId)
		if(userBadgeLogJdoMap[index].userId.indexOf(userKey) != -1)
			{	
			var badgesArray 	= new Array();
			var trophiesArray 	= new Array();
			var userBadgeLi 	= "";
			var userTrophyLi	= "";
			
			if(String(userBadgeLogJdoMap[index].badgeId).indexOf(",") != -1)
				badgesArray = String(userBadgeLogJdoMap[index].badgeId).split(",");
			else if(String(userBadgeLogJdoMap[index].badgeId) && String(userBadgeLogJdoMap[index].badgeId) != "")
				badgesArray.push(String(userBadgeLogJdoMap[index].badgeId));
			
			if(String(userBadgeLogJdoMap[index].trophyId).indexOf(",") != -1)
				trophiesArray = String(userBadgeLogJdoMap[index].trophyId).split(",");
			else if(String(userBadgeLogJdoMap[index].trophyId) && String(userBadgeLogJdoMap[index].trophyId) != "")
				trophiesArray.push(String(userBadgeLogJdoMap[index].trophyId));
			
			
			
			$('.badgeDB_total').html(badgesArray.length);
			$('.trophyDB_total').html(trophiesArray.length);
			
			   
			var badgeCount			= "";
			var displayCount		= "";
			   
			for(var i=0; i<badgesArray.length+1;i++)
			{
				var count			= 0;
			    for(var j=0; j<badgesArray.length;j++)
			    {
			       if(badgesArray[i]==badgesArray[j])
			       {
			    	   count++;
			       }
			    }
			    badgeCount			+= badgesArray[i]+"@"+count+",";
			}
			      
			for(var indexBadgesArray =0; indexBadgesArray < badgesArray.length;indexBadgesArray++)
			{
				for(badge_Index in badgesListMap)
			    {
			       if(badge_Index.indexOf(badgesArray[indexBadgesArray]) != -1)
			       {
			    	   if((badgeCount.split(",")[indexBadgesArray].split("@")[0].indexOf(badge_Index))!=-1)
			    	   {
			    		   var BadgesCount 	= badgeCount.split(",")[indexBadgesArray].split("@")[1];
			    	   }
			    	   if(String(BadgesCount) === "1")
			    	   {
			    		   displayCount			= "display:none";
			    	   }
			    	   if(userBadgeLi.indexOf(badge_Index) === -1)
			    	   {
				            userBadgeLi +='<li style="cursor:pointer" id="'+badgesListMap[badge_Index].key+'"><div class="circle_double" style="width:15px !important;'+displayCount+'"><span  class="badge_count" style="float: left; margin: 0 0 0 -11px;position: absolute;text-align: center; width: 22px;cursor:default;">'+BadgesCount+'</span></div><span style="position:absolute;margin-left: 66px; margin-top: -10px;">'+
				           '</span><img alt="'+badgesListMap[badge_Index].badgeName+'" title="'+badgesListMap[badge_Index].badgeName+'" src="'+badgesListMap[badge_Index].badgeLogoPath+'" id="'+badgesListMap[badge_Index].key+'" onclick="myBadgeDetail(this,\''+badgesListMap[badge_Index].badgeType+'\')"><div class="badge-name " >'+badgesListMap[badge_Index].badgeName.substr(0,12)+'</div></li>';
			    	   }
			        }
			    } 
			 }
			         
		    $("#total_badges").html(userBadgeLi);
			      
			
			for(var indextrophiesArray =0; indextrophiesArray<trophiesArray.length;indextrophiesArray++)
			{
				for(badge_Index in badgesListMap)
				{
					if(badge_Index.indexOf(trophiesArray[indextrophiesArray]) != -1)
					{
						userTrophyLi += '<li style="cursor:pointer" id="'+badgesListMap[badge_Index].key+'"><img alt="'+badgesListMap[badge_Index].badgeName+'" title="'+badgesListMap[badge_Index].badgeName+'" src="'+badgesListMap[badge_Index].badgeLogoPath+'" id="'+badgesListMap[badge_Index].key+'" onclick="myBadgeDetail(this,\''+badgesListMap[badge_Index].badgeType+'\')"><div class="badge-name " >'+badgesListMap[badge_Index].badgeName.substr(0,12)+'</div></li>'
					}
				}
			}
			
			$("#total_trophies").html(userTrophyLi);
			$('.total').html(userBadgeLogJdoMap[index].points);
			}
		}
	
		
	
			for(badge_Index in badgesListMap)
			{
				if(badgesListMap[badge_Index].badgeType === "item" && badgesListMap[badge_Index].isFlag!="disabled" )
					{
						var buildLiStuff= '<li class="badges_list" id ="'+badgesListMap[badge_Index].key+'"> '+
                    	'<div class="col1"><img alt="'+badgesListMap[badge_Index].badgeName+'" src="'+badgesListMap[badge_Index].badgeLogoPath+'" width="107" height="108" /></div>'+
                        '<div class="col2">'+
                            '<h4>'+badgesListMap[badge_Index].badgeName+'</h4>'+
                            '<p>'+htmlDecode(badgesListMap[badge_Index].badgeDiscription.value)+'</p>'+
                        '</div>'+
                        '<div class="col3">'+
                        	'<span id="'+badgesListMap[badge_Index].key+'points"><b>'+badgesListMap[badge_Index].badgeValue+'</b><br/>Points</span>'+
                            '<input type="button" onclick="buyStuff(this);" class="grn_btn2 add_vlink add_vlink_act" value="Buy it!" id="'+badgesListMap[badge_Index].key+'">'+
                        '</div>'+
                        '<div class="clear_all"></div>'+
                    '</li>'
                    var ulgetStuff = $('.get_stuff').html();
                        $('.get_stuff').html(ulgetStuff+buildLiStuff);
					}
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
			
			$("#saveGooglePicture").live("click",function(){
				$.ajax({  
	   			    	type: 'GET', 
	   			    	url: '/saveGooglePicture',
	   			    	async: true, 
	   			    	success: function(data)
	   			    	{
	   			    		$('#profileImage').attr("src", googlePicture.toString().replace("/photo.jpg","/s140-c/photo.jpg"));
	   			    		$("#backgroundPopup").fadeOut();
	   			    		$("#editPictureHolder").hide();
	   			    		$('.jcrop-tracker').remove();
	   			    		jcrop_api.destroy();
	   			    		$('#beingCroppedPicture').attr('src', "");
	   			    	    $('#beingCroppedPicture').hide();
	   			    		$('#saveCroppedPicture').hide();
	   			    		$('#saveGooglePicture').hide();
	   			    		$('#cancelOption').hide();
	   			    		$('#selectNewPicture').hide();
	   			    		$('#selectGooglePicture').hide();
						}
   			     	});
			});
			
			if(userName.indexOf("@facebook.com") != -1)
			{
				$("#selectGooglePicture").val("Picture From Facebook");
			}
			
			var body_win_height = parseInt(document.body.clientHeight) ;
			var win_height = parseInt(window.innerHeight) ;
			
			if( body_win_height > win_height) 
			{
				$('#backgroundPopup').height(body_win_height);
			} 
			else 
			{
				$('#backgroundPopup').height(win_height);
			}
			
			$('#earnbadgesback').live("click",function() {
				window.location.replace("/others");
			});
			
			 $('#auctiondetail_act').click(function(){
			     $(".productlist").hide();
				 $(".auction_detail_holder").show();
			    });
			 
			
			$('#textAreaBadgeReq').live("focus",function(){
				if(String($('#textAreaBadgeReq').val()) === "Please provide a brief description about your work.." )
				{
					$('#textAreaBadgeReq').val("");
				}
			});
			$('#textAreaBadgeReq').live("focusout",function(){
				if(String($('#textAreaBadgeReq').val()) === "" )
				{
					$('#textAreaBadgeReq').val("Please provide a brief description about your work..");
				}
			});
			
			$('#account_name').html(bannerCompanyName);
			
			if(userName.indexOf("@facebook.com") != -1)
			{
				$("#domainChangeImage").html("Facebook's Profile Picture");
				$("#domainChangeName").html("Facebook's Profile Name")
			}
			if(String(profilePicture).indexOf(String(oauthImage)) != -1)
			{
				$("#editPictureHolder").hide();
			}
			else
			{
				$("#updatePictureCheck").removeAttr("checked");
				$("#selectPicture").show();
			}
			
			if(oauthFirstName != userFirstName || oauthLastName != userLastName)
			{
				$("#updateNameCheck").removeAttr("checked");
				$("#updateUserName").show();
				$("#firstName").val(userFirstName);
				$("#lastName").val(userLastName);
			}
			else
			{
				$("#updateUserName").hide();
			}
			
			
			var userHasBadges 				= false;
			for(indexingUserStatusDetails in userstatusdetails)
			{
				if(String(userstatusdetails[indexingUserStatusDetails].status) === "approved" && String(userstatusdetails[indexingUserStatusDetails].userId) === String(userKey))
				{
					userHasBadges			= true;
				}	
			}	
			if(!userHasBadges)
			{
				$("#earnbadges").trigger("click");
			}	
			
			
	});

	
	function buyStuff(stuff)
	{
		var stuffid 							= stuff.id;
		var points 								= $('#'+stuff.id+"points").html();
		points 									= points.replace("<b>","");
		points 									= points.replace("</b>","");
		points 									= points.replace("<br>Points",""); 
		var totalpoints 						= $('.total').html();
		stuffid 								= stuffid.replace("_buy","");
		
		var status								= true;
		
		for(indexUserStatusDetails in userstatusdetails)
		{
			if(String(userstatusdetails[indexUserStatusDetails].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(stuffid) != -1 && String(userstatusdetails[indexUserStatusDetails].status).indexOf("purchased") != -1)
			{
						status = confirm('Do you really want to purchase this stuff again?');
						break;
			}
		}
		
		if(status)
			{
				if(parseInt(totalpoints) >= parseInt(points))
				{
					if(parseInt(badgesListMap[stuffid].quantity) > 0 || String(badgesListMap[stuffid].quantity) === "-1")
					{
						var uniqueUserKey				= "";
				
						for(indexingUserBadgeLog in userBadgeLogJdoMap)
						{
							if(userBadgeLogJdoMap[indexingUserBadgeLog].userId === userKey)
							{
								uniqueUserKey 			= userBadgeLogJdoMap[indexingUserBadgeLog].key;
							}	
						}
						try
						{
							$.ajax({
								type: 'POST', 
								url: '/editUserStuffList',
								data:"points="+points+ "&uniqueUserKey="+uniqueUserKey+"&stuffId="+stuffid, 
								success: function(data)
										{ 
											$('.total').html(parseInt($('.total').html()) - points);
											if(String(badgesListMap[stuffid].quantity) != "-1")
											{
												badgesListMap[stuffid].quantity 	= parseInt(badgesListMap[stuffid].quantity) - 1;
											}	
											alert('Thanks for buying this stuff. An admin will soon get in touch with you regarding your request.');
										}
								}); 
							jQuery._uuidlet= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
							var userStatusDetailsKey = jQuery._uuidlet;
							var userNewStuffRequest = new Object();
							$.ajax
							({
								type: 'POST', 
								url: '/makeRequestForStuff' ,
								data:"stuffid="+stuffid+"&points="+points+ "&userKey="+userKey+"&uniqueUserKey="+userStatusDetailsKey, 
								success: function(data)
								{
									var now = new Date();
									userNewStuffRequest.key 	          = userStatusDetailsKey;
									userNewStuffRequest.dateAdded 		  = now;
									userNewStuffRequest.status	  		  = "purchased";
									userNewStuffRequest.typeRequested	  = "stuff";
									userNewStuffRequest.userId			  = userKey;
									userNewStuffRequest.stuffid			  = stuffid;
									
									userstatusdetails[userStatusDetailsKey] = userNewStuffRequest;
								}
						  	 });
						}
						catch(e)
						{
						}
					}	
					else
					{
						alert('Sorry, We have received maximum requests for this Stuff...')
					}	
				}
			
				else
				{
					alert('Sorry, to get this stuff you need to earn some more points...');
				}
			}
	}
	
	
	
	
	function badge_popup()
	{
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
				try
				{
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
				}
				catch(e)
				{
				}
			}
	}
	
	
	
	function googleLogout()
	{
		$.ajax({type: 'GET', url: 'https://accounts.google.com/Logout',async: false, success: function( data )
  			      {
  			    	 window.location = "http://localhost:8080";
  			      }
  			     });
	}
	$('#getStuffWithBadge').live("click", function()
	{ 
		$('#myBadgesTrophies').hide();
		$('#earn_badge').hide();
		$('#badgeInformation').hide();
		$('#badgestowork').removeClass('active');
		$('#badgeInformation').hide();
		$('#badges_to_work').hide();
		$('#myprofile').removeClass('active');
		$('#todays_auction').removeClass('active');
		$('#earnbadges').removeClass('active');
		$('#getStuffWithBadge').addClass('active');
		$('#settingsbutton').removeClass('active');
		$('#getstuff').show();
		$('#Settings').hide();
		$('.auction_holder').hide();
		$(".badges_tag_holder").hide();
		$(".filtertags").hide();
		$(".lineseperator").hide();
		$(".tagfilterlist").hide();
		window.location.hash="getstuff";
	});
	
	$('#settingsbutton').live("click", function()
			{ 
				$('#myBadgesTrophies').hide();
				$('#earn_badge').hide();
				$('#badgeInformation').hide();
				$('#todays_auction').removeClass('active');
				$('#badgeInformation').hide();
				$('#badges_to_work').hide();
				$('#myprofile').removeClass('active');
				$('#getStuffWithBadge').removeClass('active');
				$('#badgestowork').removeClass('active');
				$('#earnbadges').removeClass('active');
				$('#settingsbutton').addClass('active');
				$('#getstuff').hide();
				$('#Settings').show();
				$('.auction_holder').hide();
				$(".badges_tag_holder").hide();
				$(".filtertags").hide();
				$(".lineseperator").hide();
				$(".tagfilterlist").hide();
				window.location.hash="settings";
			});
	
			$('.earnbadges').live("click",function()
			{
				$('#badge_holder,#earn_badge > .points_wrapper,.badges_list').show();
			    $('#todays_auction').removeClass('active');
			    $('.auction_holder').hide();
				$('#myBadgesTrophies').hide();
				$('#getstuff').hide();
				$('#earn_badge').show();
				$('#badgeInformation').hide();
				$('#Settings').hide();
				$('#badgestowork').removeClass('active');
				$('#badges_to_work').hide();
				$('#myprofile').removeClass('active');
				$('#getStuffWithBadge').removeClass('active');
				$('#settingsbutton').removeClass('active');
				$('#earnbadges').addClass('active');
				 
				 var buildEarnedbadgeLi 		= "";
				 var buildWorkingbadgeLi 		= "";
				 var buildNotStartedbadgeLi 	= "";
				 var badgeStatus	  			= "";
				 var statusTitle				= "";
				 
			     for(index in badgesListMap) 
			     {
//			    	 console.log(badgesListMap[index].canEarnedTwice);
			    	 if(String(badgesListMap[index].canEarnedTwice).indexOf("true") != -1)
			    		 {
			    		
					    	 for(indexingUserStatus in userstatusdetails)
					    	 {
					    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[index].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
					    		 {
					    			 if(badgeStatus != "unwatched")
					    			 {
					    				 if( String(userstatusdetails[indexingUserStatus].status) === "working on" )
						    			 {
						    				 badgeStatus	= "unwatched";
						    				 statusTitle	= "Currently Working-On";
						    			 }
					    				 else if(String(userstatusdetails[indexingUserStatus].status) === "requested")
						    			 {
						    				 badgeStatus	= "unwatched";
						    				 statusTitle	= "Requested";
						    			 }
						    			 else if( String(userstatusdetails[indexingUserStatus].status) === "approved")
						    			 {
						    				 badgeStatus	= "watched";
						    				 statusTitle	= "Already Possessing";
						    			 }
						    			 else
						    			 {
						    				 badgeStatus	= "";
						    				 statusTitle	= "";
						    			 }
					    			 }	 
					    		 }
					    	 }	 
					    	 
						     if(String(badgesListMap[index].badgeType) === "badge" && String(badgesListMap[index].isFlag) != "disabled")
						     {
						    	 if(String(badgeStatus) === "unwatched")
						    	 {
						    		 buildWorkingbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
						    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>'; 
						    	 }
						    	 else if(String(badgeStatus) === "watched")
						    	 {
						    		 buildEarnedbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
						    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
						    	 }
						    	 else if(String(badgeStatus) === "")
						    	 {
						    		 buildNotStartedbadgeLi 	+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
						    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
						    	 }	 
						    	 
						     }	 
						    	 
						     badgeStatus = "";
						     statusTitle = "";
			    		 }
			    	 else
			    	 {
			    		 	for(indexUserBadgeLogJdo in userBadgeLogJdoMap)
			    		 		{
			    		 			if(String(userBadgeLogJdoMap[indexUserBadgeLogJdo].userId) === String(userKey) && userBadgeLogJdoMap[indexUserBadgeLogJdo].badgeId.indexOf(String(badgesListMap[index].key)) == -1)
			    		 			{
			    		 				for(indexingUserStatus in userstatusdetails)
								    	 {
								    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[index].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
								    		 {
								    			 if(badgeStatus != "unwatched")
								    			 {
								    				 if( String(userstatusdetails[indexingUserStatus].status) === "working on" )
									    			 {
									    				 badgeStatus	= "unwatched";
									    				 statusTitle	= "Currently Working-On";
									    			 }
								    				 else if(String(userstatusdetails[indexingUserStatus].status) === "requested")
									    			 {
									    				 badgeStatus	= "unwatched";
									    				 statusTitle	= "Requested";
									    			 }
									    			 else if( String(userstatusdetails[indexingUserStatus].status) === "approved")
									    			 {
									    				 badgeStatus	= "watched";
									    				 statusTitle	= "Already Possessing";
									    			 }
									    			 else
									    			 {
									    				 badgeStatus	= "";
									    				 statusTitle	= "";
									    			 }
								    			 }	 
								    		 }
								    	 }	 
								    	 
									     if(String(badgesListMap[index].badgeType) === "badge" && String(badgesListMap[index].isFlag) != "disabled")
									     {
									    	 if(String(badgeStatus) === "unwatched")
									    	 {
									    		 buildWorkingbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
									    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>'; 
									    	 }
									    	 else if(String(badgeStatus) === "watched")
									    	 {
									    		 buildEarnedbadgeLi 		+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
									    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
									    	 }
									    	 else if(String(badgeStatus) === "")
									    	 {
									    		 buildNotStartedbadgeLi 	+= 	'<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
									    	 									'<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
									    	 }	 
									    	 
									     }	 
									    	 
									     badgeStatus = "";
									     statusTitle = "";
			    		 				}
			    		 		}
			    		 }
			     }
				$('#earnBadgeUL').html(buildWorkingbadgeLi+buildNotStartedbadgeLi+buildEarnedbadgeLi);
				
				
				var buildEarnTrophiesLi = "";
			    for(index in badgesListMap)
			    {
			    	for(indexingUserStatus in userstatusdetails)
			    	{
			    		if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[index].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
			    		{
			    			if(badgeStatus != "unwatched")
			    			{
			    				if( String(userstatusdetails[indexingUserStatus].status) === "working on" || String(userstatusdetails[indexingUserStatus].status) === "requested" )
				    			{
				    				badgeStatus	= "unwatched";
				    				statusTitle	= "Currently Working-On";
				    			}
				    			else if( String(userstatusdetails[indexingUserStatus].status) === "approved")
				    			{
				    				badgeStatus	= "watched";
				    				statusTitle	= "Already Possessing";
				    			}
				    			else
				    			{
				    				badgeStatus	= "";
				    				statusTitle	= "";
				    			}
			    			}	 
			    		}
			    	}
			        if( badgesListMap[index].badgeType === "trophy" && badgesListMap[index].isFlag != "disabled")
			        {
			        	 buildEarnTrophiesLi += '<li style="cursor:pointer" id='+index+' onclick="displayBadgeDetail(this,\''+badgesListMap[index].badgeType+'\')"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img id='+index+' src="'+badgesListMap[index].badgeLogoPath+'" alt="'+badgesListMap[index].badgeName+'" title="'+badgesListMap[index].badgeName+'">'+
					      '<div class="badge-name toolTip">'+badgesListMap[index].badgeName.substr(0,12)+'</div></li>';
			        }
			        
			        badgeStatus = "";
			        statusTitle	= "";
			            
			    }
			    
			    $('#earnTrophiesUL').html(buildEarnTrophiesLi);
			    $('#earnTrophiesUL li,#earnBadgeUL li,.earnBadgeUL li').find("span").tipTip();
			    
			    $('.filtertags').tipTip({defaultPosition : "right"});
			    
			    
			    $(".badges_tag_holder").hide();
			    $(".filtertags").show().css("margin-left",.199 * ($("#profile_panel").width())).css("margin-top",.14 * ($("#profile_panel").height()));
				$(".lineseperator").show().css("margin-left",.226 * ($("#profile_panel").width()));
				$(".tagfilterlist").hide().css("margin-left",0.036 * ($("#profile_panel").width()));
				
				window.location.hash= "earnbadgeslink";
			});
			
			
			$('#myprofile').live("click",function ()
			{
				
				$('#myprofile').addClass('active');
				$('#getStuffWithBadge').removeClass('active');
				$('#earnbadges').removeClass('active');
				$('#badgestowork').removeClass('active');
				$('#settingsbutton,#todays_auction').removeClass('active');
				$('#badgeInformation').hide();
				$('#badges_to_work').hide();
				$('#getstuff').hide();
				$('#earn_badge').hide();
				$('#Settings').hide();
				$('#badgeInformation').hide();
				$('#myBadgesTrophies,#myBadgesTrophies > .badges_list').show();
				$('.auction_holder').hide();
				$(".badges_tag_holder").hide();
				$(".filtertags").hide();
				$(".lineseperator").hide();
				$(".tagfilterlist").hide();
				window.location.hash = "myprofile";
			});
	
	
			$('#badgestowork').live("click", function()
			{
				$('#badges_to_work').show();
				$('#myBadgesTrophies').hide();
				$('#getstuff').hide();
				$('#earn_badge').hide();
				$('#badgeInformation').hide();
				$('#Settings').hide();
				$('#badgestowork').addClass('active');
				$('#earnbadges').removeClass('active');
				$('#myprofile').removeClass('active');
				$('#getStuffWithBadge').removeClass('active');
				$('#earn_badge').removeClass('active');
				$('#settingsbutton').removeClass('active');
				$('.auction_holder').hide();	
				$(".badges_tag_holder").hide();
				$(".filtertags").hide();
				$(".lineseperator").hide();
				$(".tagfilterlist").hide();
				window.location.hash = "badgestowork";
			}); 
	
			$('#looptodo_feedback_btn').live("click",function(){
					//$('#backgroundPopup').hide();
				$('#feedback_popup_window').show();
				$('.feedback_holder').show();
			});
	$('#showRequest').live("click",function() {
		var statusToMakeRequest = "true";
		$('.add_vlink_cont').children().each(function(){
			 var kid = $(this);
			 if($(this).attr("class").indexOf("row_clr") != -1)
				 {
					 if($(this).find('code').attr("class") == "undefined"   || $(this).find('code').attr("class") == undefined || String($(this).find('code').attr("class")) === "")
						 {
						 	statusToMakeRequest = "false";
						 }
					 
					 else if($(this).find('code').attr("class").indexOf("unwatched") != -1)
						 {
						 	statusToMakeRequest = "false";
						 }
				 }
		});
		
		if(statusToMakeRequest.indexOf("true") != -1)
			{
				$('#showRequest').hide();
				$('.badgestowork').hide();
				$('.makerequest').show();
				$('#textAreaBadgeReq').show();
			}
		else
			{
				alert("Please complete watching all videos !")
			}
	});
	
	function requestForTheBadge(requestBadgeObject)
	{
		if(String($.trim($('#textAreaBadgeReq').val())) != "" && String($.trim($('#textAreaBadgeReq').val())) != "Please provide a brief description about your work..")
		{	
			var badgeReqContent 						= $('#textAreaBadgeReq').val();
			var userStatusKey 							= $(requestBadgeObject).attr('id')
			var badgeId 								= $('.briefBadgeImage').attr("id");
			var badgeType 								= "";
			
			for(indexBadge in badgesListMap)
			{
				if(indexBadge.indexOf(badgeId) != -1)
				{
					badgeType 							= badgesListMap[indexBadge].badgeType;
				}
			}
			
			$.ajax({
					type	: 'POST', 
					url		: '/updateRequestForBadge' ,
					async	: true,
					data	: "userStatusKey="+userStatusKey+"&userId="+userKey+"&badgeReqContent="+badgeReqContent, 
					success	: function(data)
							  {
						 		 if(data != null)
						 		 {
						 			$("#voice-box").fadeIn();
									document.getElementById("statusMessage").innerHTML = "Request has been sent!";
									document.getElementById("voice-box").setAttribute("status", "saved");
									setTimeout("hideStatusMessage()", 1750);
						 		 }
							  }
			});
			
			$('#makeBadgeReq').hide();
			
			for(confirmuser in userstatusdetails)
			{
				if(confirmuser.indexOf(userStatusKey) != -1)
				{
					if(String(userstatusdetails[confirmuser].stuffid).indexOf(badgeId) != -1 && String(userstatusdetails[confirmuser].status) === "working on")
					{
						userstatusdetails[confirmuser].badgeReqContent 		= badgeReqContent;
						userstatusdetails[confirmuser].status 				= "requested";
					}
				}
			}
	    }
		else
		{
			$("#voice-box").fadeIn();
		 	document.getElementById("statusMessage").innerHTML = "Please enter description to make a request!";
		  	document.getElementById("voice-box").setAttribute("status", "saved");
		  	setTimeout("hideStatusMessage()", 1750);
		}
	}
	
	/* //bhadri videopopup start */
	var videokey1="";
	var badgekey1="";
	var userDetailsKeyForVideo = "";
	var runvideoId = "";
	
	function run(test1,userDetailsKey,test2,runvideoIdPassed)
		{
			   videokey1=test1;
			   userDetailsKeyForVideo = userDetailsKey;
			   badgekey1=test2;
			   runvideoId = runvideoIdPassed;
		}
	/* //bhadri videopopup end */
	
	function badge_popup1()
	{
		$('body').removeClass('noscroll');
		$('body').addClass('scroll');
		ytplayer.stopVideo();
		if(ytplayer.getPlayerState() === -1)
		{
			  $('#backgroundPopup').hide();
			  $('#videopopup').hide();
			  $("#voice-box").fadeIn();
			  document.getElementById("statusMessage").innerHTML = "Didn't start watching the video!";
			  document.getElementById("voice-box").setAttribute("status", "saved");
			  setTimeout("hideStatusMessage()", 1750);
		}
		else
		 {
			 stopCount();
			 $('#backgroundPopup').hide();
			 $('#videopopup').hide();
			 showalert();
		 }
	}
	
	
	
	function displayBadgeDetail(badge,badgeType)
	{
		var badgesListNavigator									= new Array();
		var videoBadgeOrNot										= false;
		var badgeID 											= badge.id;
		var earnedBadgeOrNot									= false;
		var buildProfilePic 									= '<h4 class="simpleTxtStyle">People who earned this '+badgeType+':</h4><br></br><div style="float: left;clear: none;padding: 0px 0px 40px 20px;margin: 0px;overflow-y: auto;max-height: 150px;" class="mem_of_badge">';
		
		for(indexUserBadgeDetails in userBadgeLogJdoMap)
		{
			if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).indexOf(badgeID) != -1 || String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).indexOf(badgeID) != -1)
			{
				for(indexUserProfileDetails in userProfileMap)
				{
					if(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId).indexOf(indexUserProfileDetails) != -1)
					{
						if(userProfileMap[indexUserProfileDetails].profilePicture)
							buildProfilePic 					+= '<img alt="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" src="'+String(userProfileMap[indexUserProfileDetails].profilePicture).replace("/photo.jpg","/s42-c/photo.jpg")+'" title="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" height="42" width="42" />&nbsp&nbsp';
						else
							buildProfilePic 					+= '<img alt="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" src="/images/genral-photo.jpg" title="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" height="42" width="42" />&nbsp&nbsp';
					}
				}
				
				earnedBadgeOrNot								= true;
			}
//			else
//			{
//				buildProfilePic += '<h4>No one has earned this badge yet. Be the first one to earn this badge. !!</h4>';
//			}

		}
		
		if(!earnedBadgeOrNot && String(earnedBadgeOrNot) != "true")
		{
			buildProfilePic										+= '<h4 style="border:2px solid #DFDFDF;font-weight:600;padding:12px;width:715px;margin-left:-18px;"><img src="favicon.ico" /><span style="margin-left:10px;position:absolute;margin-top:2px;">No one has earned this badge yet. Be the first one to get this badge!</span>';
		}
		
		buildProfilePic 										+= '</div>';
		
		for(badge_Index in badgesListMap)
		{
			if(badge_Index.indexOf(badgeID) != -1)
			{
				var badgeLogoPath 								= badgesListMap[badge_Index].badgeLogoPath;
				
				$('.briefBadgeImage').attr("src",String(badgesListMap[badge_Index].badgeLogoPath));
				$('.briefBadgeImage').attr("alt",String(badgesListMap[badge_Index].badgeName));
				$('.briefBadgeImage').attr("id", badgesListMap[badge_Index].key);
				$('.briefBadgeImage').attr("title", badgesListMap[badge_Index].badgeName);
				$('#briefBadgeName > h3').html(badgesListMap[badge_Index].badgeName);
				
				if(String(badgesListMap[badge_Index].contentType) === "true")
				{
					$('.badges_list > p').html(badgesListMap[badge_Index].badgeDiscription.value);
				}
				else
				{
					$('.badges_list > p').html(htmlDecode(badgesListMap[badge_Index].badgeDiscription.value));
				}	
				if(badgesListMap[badge_Index].badgeType.indexOf("badge") != -1)
					$('#briefBadgeName > h4').html(badgesListMap[badge_Index].badgeValue + " points for this badge");
				else if(badgesListMap[badge_Index].badgeType.indexOf("trophy") != -1)
					$('#briefBadgeName > h4').html(badgesListMap[badge_Index].badgeValue + " points for this trophy");
				
				var requestStatus								= "";
				var buildvideolist								= "";
				var userStatusKey								= "";
				
		    	 for(indexingUserStatus in userstatusdetails)
		    	 {
		    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[badge_Index].key) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
		    		 {
		    			 if(requestStatus != "requested")
		    			 {
		    				 if( String(userstatusdetails[indexingUserStatus].status) === "requested")
			    			 {
			    				 requestStatus					= "requested";
			    				 userStatusKey  				= userstatusdetails[indexingUserStatus].key;
			    			 }
		    				 else if( String(userstatusdetails[indexingUserStatus].status) === "working on")
			    			 {
			    				 requestStatus					= "working on";
			    				 userStatusKey  				= userstatusdetails[indexingUserStatus].key;
			    			 }
			    			 else if(requestStatus != "working on" )
			    			 {
			    				 requestStatus					= "";
			    				 userStatusKey  				= "";
			    			 }
		    			 }	 
		    		 }
		    	 }
		    	 if(String(requestStatus) === "")
		    	 {
		    		 for(index in videodetailsMap)
		    		 {
		    			 for( var i = 0; i < (badgesListMap[badge_Index].videoid.length) ; i++ )
		    			 {
		    				 if(String(index).indexOf(String(badgesListMap[badge_Index].videoid[i])) != -1)
							 { 
		    					 buildvideolist 				+= '<li  onclick = "javascript:confirmToMoveBadge(\''+badgesListMap[badge_Index].key+'\',\''+videodetailsMap[index].videoId+'\',\''+videodetailsMap[index].key+'\')" class="row_clr odd" id="'+videodetailsMap[index].videoId+'"><code class=""></code><img src="'+videodetailsMap[index].videothumbnail+'" height="90" width="120" class="video_thump video_popup_act"/><p class="heading video_title_heading">'+ videodetailsMap[index].vidtitle+'</p></li>';
							 }
		    			 }	 
		    		 }
		    		 
		    		 $('.add_vlink_cont').html(buildvideolist+'<div class="clear_all"></div>'+
			                    			   '<input type="button" id="'+badgesListMap[badge_Index].key+'" value="Work on this '+badgeType+' !!" class="grn_btn2 add_vlink add_vlink_act" onclick="confirmToMoveBadge(\''+badgesListMap[badge_Index].key+'\',\'frombuttonclick\',\'frombuttonclick\');"/>'+
			                    			   '<input type="button" id="earnbadges" value="Back" class="grn_btn2 add_vlink add_vlink_act"/>');
		    	 }
		    	 else if(String(requestStatus) === "requested")
		    	 {
		    		 for(index in videodetailsMap)
		    		 {
		    			 for( var i = 0; i < (badgesListMap[badge_Index].videoid.length) ; i++ )
		    			 {
		    				 if(String(index).indexOf(String(badgesListMap[badge_Index].videoid[i])) != -1)
							 { 
		    					 buildvideolist 	+= '<li onclick=_run("'+videodetailsMap[index].videoId+'",0),run("'+videodetailsMap[index].key+'","'+userStatusKey+'","'+badgesListMap[badge_Index].key+'","'+videodetailsMap[index].videoId+'"); class="row_clr odd" id="'+videodetailsMap[index].videoId+'"><code class="watched"></code><img src="'+videodetailsMap[index].videothumbnail+'"  height="90" width="120" class="video_thump video_popup_act" /><p class="heading video_title_heading">'+ videodetailsMap[index].vidtitle+'</p></li>';
							 }
		    			 }	 
		    		 }
		    		 
		    		 $('.add_vlink_cont').html(buildvideolist+"<div  style='border:2px solid #DFDFDF;font-weight:600;padding:12px;width:715px;'><img src='favicon.ico' /><span style='margin-top10px;position:absolute;margin-top:2px;margin-left:10px;'>Request already made. Admin will review your work and approve you the badge.</span></div>");
		    	 }
		    	 else if(String(requestStatus) === "working on")
		    	 {
		    		 var videoStatusList 			= new Array();
		    		 var addVideosArray				= new Array();
		    		 var videoPositioning			= "odd";
		    		 var userStatusKey				= "";
		    		 var videostatus				= "";
		    		 var startSeconds				= 0
		    		 var badgeRequestContent		= "";
		    		 
		 				for(indexingUserStatusMap in userstatusdetails)
		 				{
		 					if(userstatusdetails[indexingUserStatusMap].stuffid === badgeID && String(userstatusdetails[indexingUserStatusMap].status) === "working on" && String(userstatusdetails[indexingUserStatusMap].userId) === String(userKey))
		 					{
		 						videoStatusList		= String(userstatusdetails[indexingUserStatusMap].videostatus).split(",");
		 						userStatusKey		= userstatusdetails[indexingUserStatusMap].key;
		 						
		 						if(videoStatusList)
		 						for(var i = 0 ; i < videoStatusList.length ; i++)
		 						{
		 							for(indexingVideoDetialsMap in videodetailsMap)
		 							{
		 								if(String(videoStatusList[i]).split(":")[0] === String(videodetailsMap[indexingVideoDetialsMap].key) &&  addVideosArray.indexOf(String(videoStatusList[i])) == -1)
		 								{
		 									videoBadgeOrNot 				= true;
		 									if(String(videoStatusList[i]).split(":")[1] != "not started" && String(videoStatusList[i]).split(":")[1] != "completed")
		 									{
		 										videostatus = "unwatched";
		 										addVideosArray.push(videoStatusList[i]);
		 										startSeconds	= String(videoStatusList[i]).split(":")[1];
		 									}	
		 									else if(String(videoStatusList[i]).split(":")[1] === "completed")
		 									{
		 										videostatus = "watched";
		 										addVideosArray.push(videoStatusList[i]);
		 										startSeconds	= 0
		 									}
		 									else if(String(videoStatusList[i]).split(":")[1] === "not started")
		 									{
		 										videostatus = "";
		 										addVideosArray.push(videoStatusList[i]);
		 										startSeconds	= 0
		 									}	
		 									buildvideolist  += 	'<li id="'+videodetailsMap[indexingVideoDetialsMap].videoId+'" class="row_clr '+videoPositioning+'" onclick=_run("'+videodetailsMap[indexingVideoDetialsMap].videoId+'",'+startSeconds+'),run("'+videodetailsMap[indexingVideoDetialsMap].key+'","'+userstatusdetails[indexingUserStatusMap].key+'","'+badgesListMap[badge_Index].key+'","'+videodetailsMap[indexingVideoDetialsMap].videoId+'");>'+
		 									 					'<code class="'+videostatus+'"></code>'+
							 									'<img src="'+videodetailsMap[indexingVideoDetialsMap].videothumbnail+'" height="90" width="120" class="video_thump video_popup_act"/>'+
							 									'<p class="heading video_title_heading">'+videodetailsMap[indexingVideoDetialsMap].vidtitle+'</p>'+ 
							 									'</li>';
		 									
		 									if(videoPositioning === "odd")
		 									{
		 										videoPositioning	= "even";
		 									}
		 									else
		 									{
		 										videoPositioning	= "odd";
		 									}
		 								}	
		 							}
		 						}
		 						
		 						if(userstatusdetails[indexingUserStatusMap].badgeReqContent != null && String(userstatusdetails[indexingUserStatusMap].badgeReqContent) != "" )
		 						{
		 							badgeRequestContent = userstatusdetails[indexingUserStatusMap].badgeReqContent;
		 						}	
								else
								{
									badgeRequestContent = "Please provide a brief description about your work..";
								}
		 					}	
		 				}
		    		 console.log("videoBadgeOrNot ::"+videoBadgeOrNot);
		    		 if(videoBadgeOrNot)
					 {
						 $('.add_vlink_cont').html(buildvideolist+'<div class="clear_all"></div><div class="badges_list" id="makeBadgeReq">'+
									 	'<h3>Please make your '+badgeType+' request after watching all videos</h3><textarea id="textAreaBadgeReq" onblur="saveDescription(this);" style="display:none;color:#848484;font-size:12px;width:700px;">Please provide a brief description about your work..</textarea>'+
					                    '<input type="button" id="showRequest" value="Make request" class="grn_btn2 add_vlink add_vlink_act"/><input id='+userStatusKey+'  type="button" class="makerequest grn_btn2 add_vlink add_vlink_act" style = "display:none" value="Make request" class="grn_btn2 add_vlink add_vlink_act" onclick="requestForTheBadge(this)"/> <input type="button" id="earnbadges" value="Back" class="grn_btn2 add_vlink add_vlink_act"/>'); 
					 }
		    		 else
					 {
						 $('.add_vlink_cont').html(buildvideolist+'<div class="clear_all"></div><div class="badges_list" id="makeBadgeReq">'+ 
								 		'<h3>Please make a request to get this '+badgeType+'!</h3><textarea id="textAreaBadgeReq" onblur="saveDescription(this);" style="color:#848484;font-size:12px;width:700px;">Please provide a brief description about your work..</textarea>'+
								 		'<input id='+userStatusKey+' type="button" value="Make request" class="grn_btn2 add_vlink add_vlink_act" onclick="requestForTheBadge(this)"/>'+
								 		'<input type="button" class="earnbadges badgestowork grn_btn2 add_vlink add_vlink_act" value="Back" class="grn_btn2 add_vlink add_vlink_act"/>'); 
					 }
		    		 $('#textAreaBadgeReq').html(badgeRequestContent);
		    		 
		    	}
		    	 
		    	$("#persisting_user").html(buildProfilePic).show();
				
			 	$("#allTagsCreated").html("");
		  		var adminCreatedTags 							= "" ;
		  		var userCreatedTags 							= "";
		  		badgeIdForAddingDeletingTag 					= badgeID;
		  		var badgesTagsDetails 							= new String(badgesListMap[badge_Index].badgeTagsContents);
		  		
		  		if(String(badgesTagsDetails).indexOf("nimdasgat") != -1)
		  		{
		  			adminCreatedTags 							= String(badgesTagsDetails).substring(0,String(badgesTagsDetails).indexOf("nimdasgat")-1);
		  		}
		  		if(String(badgesTagsDetails).indexOf("resusgat") != -1)
		  		{
		  			userCreatedTags 							= String(badgesTagsDetails).substring(String(badgesTagsDetails).indexOf("nimdasgat")+9,String(badgesTagsDetails).indexOf("resusgat")-1);
		  		}
		  		
		  		adminTag 										= adminCreatedTags.split(",").sort();
		  		userTag 										= userCreatedTags.split(",").sort();
		  		
		  		if(userType.indexOf("Admin") != -1 || userType.indexOf("Company") != -1)
		  		{
		  			if(adminTag.length > 0)
					{
						for(var i = 0; i<adminTag.length ; i++)
						{
							if(adminTag[i] != "")
							{
								var adminTagFromDetails 		= String(adminTag[i]).split(":")[0];
								$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+adminTagFromDetails+'"><span class="tagRating" id="'+ adminTagFromDetails+'popularizeTheTag">+1</span><span class="'+adminTagFromDetails+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">'+String(adminTag[i]).split(":")[1]+'</span><span id="'+adminTagFromDetails+'" class="tagSeperator" title="Click Me">'+adminTagFromDetails+'</span> <span id="'+adminTagFromDetails+'tagdelete" class="tag-delete" title="Delete Me"></span></span></span>');
							}
						}	
					}
		  		}
		  		else
		  		{
		  			if(adminTag.length > 0)
					{
						for(var i = 0; i<adminTag.length ; i++)
						{
							if(adminTag[i] != "")
							{
								var adminTagFromDetails 		= String(adminTag[i]).split(":")[0];
								$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+adminTagFromDetails+'"><span class="tagRating" id="'+ adminTagFromDetails+'popularizeTheTag">+1</span><span class="'+adminTagFromDetails+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">'+String(adminTag[i]).split(":")[1]+'</span><span id="'+adminTagFromDetails+'" class="tagSeperator" title="Click Me">'+adminTagFromDetails+'</span></span></span>');
							}
						}	
					}
		  		}	
				if(userTag.length > 0)
				{
					for(var i = 0; i<userTag.length ; i++)
					{
						if(userTag[i] != "")
						{
							var userTagFromDetails 				= String(userTag[i]).split(":")[0];
							$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+userTagFromDetails+'"><span class="tagRating" id="'+userTagFromDetails+'popularizeTheTag">+1</span><span class="'+userTagFromDetails+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">'+String(userTag[i]).split(":")[1]+'</span><span id="'+userTagFromDetails+'" class="tagSeperator" title="Click Me">'+userTagFromDetails+'</span> <span id="'+userTagFromDetails+'tagdelete" class="tag-delete" title="Delete Me"></span></span></span>');
						}	
					}	
				}
			}
		}
		if(String(badgeType) === "badge")
		{
			$("#earnBadgeUL li").each(function(){
				
				for(indexingBadgesList in badgesListMap)
				{
					if(String($(this).attr("id")) === String(badgesListMap[indexingBadgesList].key) && String(badgeType) === String(badgesListMap[indexingBadgesList].badgeType))
					{
						badgesListNavigator.push({
							key 	: indexingBadgesList,
							value 	: badgesListMap[indexingBadgesList]
			
						});
					}	
				}	
				
			});
		}
		else if(String(badgeType) === "trophy")
		{
			$("#earnTrophiesUL li").each(function(){
				
				for(indexingBadgesList in badgesListMap)
				{
					if(String($(this).attr("id")) === String(badgesListMap[indexingBadgesList].key) && String(badgeType) === String(badgesListMap[indexingBadgesList].badgeType))
					{
						badgesListNavigator.push({
							key 	: indexingBadgesList,
							value 	: badgesListMap[indexingBadgesList]
			
						});
					}	
				}	
				
			});
		}	
			
		
		
		
		for(var i=0; i<badgesListNavigator.length;i++)
		{
			if(String(badgesListNavigator[i].key) === String(badgeID))
			{
				if( i != 0)
				{
					$(".badge_navigator > .previousbadge").attr ({
																	id 			: badgesListNavigator[i-1].key,
																	onclick 	: "javascript:displayBadgeDetail(this,'"+badgesListNavigator[i-1].value.badgeType+"')"		
					}).addClass("navigation_enabled").removeClass("navigation_disabled");
				}
				else
				{
					$(".badge_navigator > .previousbadge").removeAttr("id").removeAttr("onclick").addClass("navigation_disabled").removeClass("navigation_enabled");
				}	
				
				if((i+1) != badgesListNavigator.length)
				{
					$(".badge_navigator > .nextbadge").attr ({
																id 			: badgesListNavigator[i+1].key,
																onclick 	: "javascript:displayBadgeDetail(this,'"+badgesListNavigator[i+1].value.badgeType+"')"		
					}).addClass("navigation_enabled").removeClass("navigation_disabled");
				}	
				else
				{
					$(".badge_navigator > .nextbadge").removeAttr("id").removeAttr("onclick").addClass("navigation_disabled").removeClass("navigation_enabled");
				}	
			}	
		}	
		
		 $("#allTagsCreated").show();
		 $('.badges_tag_holder').hide();
		 $('#badge_holder').show();
		 $('#earn_badge').hide();
		 $('#getstuff').hide();
		 $('#myBadgesTrophies').hide();
		 $('#badgeInformation').show();
		 $('#badgeInformation > #badge_holder > .badges_list').show();
		
		tagsOfAllTheBadges 										= [];
		for(indexingBadgesList in badgesListMap)
		{
			var allTagsDetails 									= new String(badgesListMap[indexingBadgesList].badgeTagsContents).split(",");
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
		    				toAddNewTagToTheBadge(String(data.item.value));
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
		    				$("#toAddNewTag").show();
		    		   }
		});
		
		$("#profile_panel").scrollTop(0);
	}
	
	function changeCompany(keyIndex)
	{
	   window.location.href="/intermediateCheck?companyKey="+keyIndex;
	}
	
	
	function confirmToMoveBadge(badgeID,videoId,videoKey) 
	{
//		var actionToPerform 								= confirm("Do you want to work on this badge ??");
//		var badgeID 										= selBadge.id;
		var badgeType 										= "";
			
		for(indexBadge in badgesListMap)
	 	{
			if(indexBadge.indexOf(badgeID) != -1)
			{
				badgeType 									= badgesListMap[indexBadge].badgeType;
			}
		}
		 
		for(indexUserStatusDetails in userstatusdetails)
		{
			if(String(userstatusdetails[indexUserStatusDetails].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(badgeID) != -1 && String(userstatusdetails[indexUserStatusDetails].status).indexOf('working on') != -1)
	 		{
	 			alert('Sorry you are already working on this badge! Please complete working on it!')
	 			actionToPerform = false;
	 		}
		}
			 
//		if(actionToPerform)
//		{
			jQuery._uuidlet									= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
			var userStatusDetailsKey 						= jQuery._uuidlet;
			
			
			var buildvideolist								= "";
			var isVideo										= false;
				
			$.ajax({
					type		: 'POST', 
					url			: '/updatebadgestoworkon' ,
					data		: "userStatusDetailsKey="+userStatusDetailsKey+"&badgeId="+badgeID+"&userid="+userKey+"&badgeType="+badgeType, 
					success		: function(data)
								  { 
									 for(userBadgeIndex in userBadgeLogJdoMap)
									 {
										if(userBadgeLogJdoMap[userBadgeIndex].userId.indexOf(userKey) != -1 )
										{
											if(badgeType.indexOf('badge') != -1)
											{
												var currentBadges = new Array();
												if(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn)
												if(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn.indexOf(",") != -1)
												{
													currentBadges = userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn.split(",");
												}
												
												else if(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn)
												{
													currentBadges.push(userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn);
												}
												
												currentBadges.push(badgeID);
												userBadgeLogJdoMap[userBadgeIndex].badgesWorkingOn = currentBadges;
											}
										    else if(badgeType.indexOf('trophy') != -1)
											{
												var currentBadges = new Array();
												if(userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn.indexOf(",") != -1)
												{
													currentBadges = userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn.split(",");
												}
												
												else if(userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn)
												{
													currentBadges.push(userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn);
												}
												
												currentBadges.push(badgeID);
												userBadgeLogJdoMap[userBadgeIndex].trophiesWorkingOn = currentBadges;
											}
										 }
									 }
									 
									 if(String(videoId) != String(videoKey))
									 {
										 _run(videoId,0);
										  run(videoKey,userStatusDetailsKey,badgeID,videoId); 
									 }	 
								  }
			});
				 
			 var updateUserStatusJsonObject          					= new Object();
		     var addVideoStatusArray         		 					= new Array();
		     
		     for(index in badgesListMap)
		     {
		    	 if(index === badgeID)
		    	 {
		    		 updateUserStatusJsonObject.key						= userStatusDetailsKey;
			         updateUserStatusJsonObject.stuffid     			= index; 
			         updateUserStatusJsonObject.status     				= "working on";
			         updateUserStatusJsonObject.typeRequested   		= badgesListMap[index].badgeType;
			         updateUserStatusJsonObject.userId     				= userKey;
			         for(var i = 0;i<badgesListMap[index].videoid.length;i++)
			         {
			        	 addVideoStatusArray.push(badgesListMap[index].videoid[i]+":not started");
			         } 
			         updateUserStatusJsonObject.videostatus    			= addVideoStatusArray;
		    	  }
		      } 
		      userstatusdetails[userStatusDetailsKey]      				= updateUserStatusJsonObject;
		      
		      for(badge_Index in badgesListMap)
		      {
		    	  if(String(badgesListMap[badge_Index].key) === String(badgeID) && badgesListMap[badge_Index].videoid != null && String(badgesListMap[badge_Index].videoid) != "")
		    	  {
		    		 isVideo 											= true;
		    		  
		    		 for(index in videodetailsMap)
					 {	
						for (x=0;x<(badgesListMap[badge_Index].videoid.length);x++)
						{
					       var videokey  								= videodetailsMap[index].key;
						   var badgevideokey							= String(badgesListMap[badge_Index].videoid[x]);
							
						   if(String(index).indexOf(String(badgesListMap[badge_Index].videoid[x])) != -1)
						   { 
								buildvideolist 							+= '<li class="row_clr odd" onclick =_run("'+videodetailsMap[index].videoId+'",0),run("'+videodetailsMap[index].key+'","'+userStatusDetailsKey+'","'+badgesListMap[badge_Index].key+'","'+videodetailsMap[index].videoId+'"); id="'+videodetailsMap[index].videoId+'"><code></code><img src="'+videodetailsMap[index].videothumbnail+'"  height="90" width="120" class="video_thump video_popup_act"  /><p class="heading video_title_heading">'+ videodetailsMap[index].vidtitle+'</p></li>';
						   }
						}
					 }
		    	  }	  
		      }
		      
		      if(isVideo)
			  {
		    	   $('.add_vlink_cont').html(buildvideolist+'<div class="clear_all"></div><div class="badges_list" id="makeBadgeReq">'+
							 		'<h3>Please Request Badge after watching all videos</h3><textarea id="textAreaBadgeReq" onblur="saveDescription(this);" style="display:none;color:#848484;font-size:12px;height: 100px;width:700px;">Please provide a brief description about your work..</textarea>'+
							 		'<input type="button" id="showRequest" value="Request Badge" class="grn_btn2 add_vlink add_vlink_act"/>'+
							 		'<input id='+userStatusDetailsKey+'  type="button" class="makerequest grn_btn2 add_vlink add_vlink_act" style = "display:none" value="Request Badge" class="grn_btn2 add_vlink add_vlink_act" onclick="requestForTheBadge(this)"/>'+ 
		    	   					'<input type="button"  value="Back" class="earnbadges grn_btn2 add_vlink add_vlink_act"/>'); 
			  }
			  else
			  {
				   $('.add_vlink_cont').html('<div class="clear_all"></div><div class="badges_list" id="makeBadgeReq">'+ 
						   			'<h3>Please make a request to get this badge!</h3><textarea id="textAreaBadgeReq" onblur="saveDescription(this);" style="color:#848484;font-size:12px;width:700px;" >Please provide a brief description about your work..</textarea>'+
						   			'<input id='+userStatusDetailsKey+' type="button" value="Make request" class="grn_btn2 add_vlink add_vlink_act" onclick="requestForTheBadge(this)"/>'+
						 			'<input type="button"  class=" earnbadges badgestowork grn_btn2 add_vlink add_vlink_act" value="Back" class="grn_btn2 add_vlink add_vlink_act"/>'); 
			  }
//		}
	}
	
	function saveDescription(textAreaContent)
	{
		var userStatusKey					= "";
		
		$(textAreaContent).parent().find(":input").each(function(){
			
			if($(this).attr("onclick"))
			{
				userStatusKey				= $(this).attr("id");
			}
			
		});
		if(String($.trim($('#textAreaBadgeReq').val())) != "" && String($('#textAreaBadgeReq').val()) != "Please provide a brief description about your work.." && String(userstatusdetails[userStatusKey].badgeReqContent) != String($.trim($('#textAreaBadgeReq').val())) )
		{	
			var badgeRequestDescription 	= $.trim($('#textAreaBadgeReq').val());
			
			$.ajax({
					type		: 'POST', 
					url			: '/saveDescription', 
					async		: true,
					data		: "userStatusKey="+userStatusKey+"&userId="+userKey+"&badgeRequestDescription="+badgeRequestDescription, 
					success		: function(data)
								  {
									 userstatusdetails[userStatusKey].badgeReqContent	= badgeRequestDescription;
									 $('#textAreaBadgeReq').html(badgeRequestDescription);
								  }
			});
		}
	}
		

	function myBadgeDetail(badge,badgeType)
	{
		var badgesListNavigator		= new Array();
		var badgeID 				= badge.id;
//		var badgeType				= "";
		var buildProfilePic = '<div class="clear_all"></div><h4 class="simpleTxtStyle">People who earned this '+badgeType+':</h4><br></br><div style="float: left;clear: none;padding: 0px 0px 40px 20px;margin: 0px;overflow-y: auto;max-height: 150px;" class="mem_of_badge">';
			
		for(indexUserBadgeDetails in userBadgeLogJdoMap)
		{
			if(String(userBadgeLogJdoMap[indexUserBadgeDetails].badgeId).indexOf(badgeID) != -1  || String(userBadgeLogJdoMap[indexUserBadgeDetails].trophyId).indexOf(badgeID) != -1)
			{
				
				for(indexUserProfileDetails in userProfileMap)
				{
					if(String(userBadgeLogJdoMap[indexUserBadgeDetails].userId).indexOf(indexUserProfileDetails) != -1)
					{
						if(userProfileMap[indexUserProfileDetails].profilePicture)
							buildProfilePic +='<img alt="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" src="'+String(userProfileMap[indexUserProfileDetails].profilePicture).replace("/photo.jpg","/s42-c/photo.jpg")+'" title="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" height="42" width="42" />&nbsp&nbsp';
						else
							buildProfilePic +='<img alt="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" src="/images/genral-photo.jpg" title="'+userProfileMap[indexUserProfileDetails].firstName+" "+userProfileMap[indexUserProfileDetails].lastName+'" height="42" width="42" />&nbsp&nbsp';
					}
				}
			}
		}
		buildProfilePic += '</div>';
		
		for(badge_Index in badgesListMap)
		{
				if(badge_Index.indexOf(badgeID) != -1)
				{
//					badgeType		= badgesListMap[badge_Index].badgeType;
					var badgeLogoPath = badgesListMap[badge_Index].badgeLogoPath;
					 $('.briefBadgeImage').attr("src",String(badgesListMap[badge_Index].badgeLogoPath));
					$('.briefBadgeImage').attr("id", badgesListMap[badge_Index].key);
					$('.briefBadgeImage').attr("title", badgesListMap[badge_Index].badgeName);
					$('#briefBadgeName > h3').html(badgesListMap[badge_Index].badgeName);
					$('.briefBadgeImage').attr("alt",String(badgesListMap[badge_Index].badgeName));
					if(badgesListMap[badge_Index].badgeType.indexOf("badge") != -1)
						$('#briefBadgeName > h4').html(badgesListMap[badge_Index].badgeValue + " points for this badge");
					else if(badgesListMap[badge_Index].badgeType.indexOf("trophy") != -1)
						$('#briefBadgeName > h4').html(badgesListMap[badge_Index].badgeValue + " points for this trophy");
					
					if(String(badgesListMap[badge_Index].contentType) === "true")
					{
						$('.badges_list > p').html(badgesListMap[badge_Index].badgeDiscription.value);
					}
					else
					{
						$('.badges_list > p').html(htmlDecode(badgesListMap[badge_Index].badgeDiscription.value));
					}
					
					 var x=0;
						
					 var buildvideolist="";
					 for(index in videodetailsMap)
					  {	
					
						 for (x=0;x<(badgesListMap[badge_Index].videoid.length);x++)
						 {
							
					     	var  videokey  = videodetailsMap[index].key;
							var badgevideokey=(badgesListMap[badge_Index].videoid[x]);
							if(videokey==badgevideokey)
							{
						 		buildvideolist +='<li style="cursor:default;" class="" id="'+videodetailsMap[index].VideoId+'"><code class=""></code><img src="'+videodetailsMap[index].videothumbnail+'"  height="90" width="120" class="video_thump video_popup_act"/><p class="heading video_title_heading">'+ videodetailsMap[index].vidtitle+'</p></li>';
							}
						 }
					  }
					 $("#allTagsCreated").html("");
	 			  		var adminCreatedTags = "" ;
	 			  		var userCreatedTags = "";
	 			  		badgeIdForAddingDeletingTag = badgeID;
	 			  		
	 			  		var badgesTagsDetails = new String(badgesListMap[badge_Index].badgeTagsContents);
	 			  		
	 			  		if(String(badgesTagsDetails).indexOf("nimdasgat") != -1)
	 			  		{
	 			  			adminCreatedTags = String(badgesTagsDetails).substring(0,String(badgesTagsDetails).indexOf("nimdasgat")-1);
	 			  		}
	 			  		if(String(badgesTagsDetails).indexOf("resusgat") != -1)
	 			  		{
	 			  			userCreatedTags = String(badgesTagsDetails).substring(String(badgesTagsDetails).indexOf("nimdasgat")+9,String(badgesTagsDetails).indexOf("resusgat")-1);
	 			  		}
	 			  		
	 			  		adminTag = adminCreatedTags.split(",").sort();
	 			  		userTag = userCreatedTags.split(",").sort();
	 			  		
	 			  		
	 			  		if(userType.indexOf("Admin") != -1 || userType.indexOf("Company") != -1)
	 			  		{
	 			  			if(adminTag.length > 0)
							{
								for(var i = 0; i<adminTag.length ; i++)
								{
									if(adminTag[i] != "")
									{
										var adminTagFromDetails = String(adminTag[i]).split(":")[0];
										$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+adminTagFromDetails+'"><span class="tagRating" id="'+ adminTagFromDetails+'popularizeTheTag">+1</span><span class="'+adminTagFromDetails+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">'+String(adminTag[i]).split(":")[1]+'</span><span id="'+adminTagFromDetails+'" class="tagSeperator" title="Click Me">'+adminTagFromDetails+'</span> <span id="'+adminTagFromDetails+'tagdelete" class="tag-delete" title="Delete Me"></span></span></span>');
									}
								}	
							}
	 			  		}
	 			  		else
	 			  		{
	 			  			if(adminTag.length > 0)
							{
								for(var i = 0; i<adminTag.length ; i++)
								{
									if(adminTag[i] != "")
									{
										var adminTagFromDetails = String(adminTag[i]).split(":")[0];
										$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+adminTagFromDetails+'"><span class="tagRating" id="'+ adminTagFromDetails+'popularizeTheTag">+1</span><span class="'+adminTagFromDetails+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">'+String(adminTag[i]).split(":")[1]+'</span><span id="'+adminTagFromDetails+'" class="tagSeperator" title="Click Me">'+adminTagFromDetails+'</span></span></span>');
									}
								}	
							}
	 			  		}	
						if(userTag.length > 0)
						{
							for(var i = 0; i<userTag.length ; i++)
							{
								if(userTag[i] != "")
								{
									var userTagFromDetails = String(userTag[i]).split(":")[0];
									$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+userTagFromDetails+'"><span class="tagRating" id="'+userTagFromDetails+'popularizeTheTag">+1</span><span class="'+userTagFromDetails+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">'+String(userTag[i]).split(":")[1]+'</span><span id="'+userTagFromDetails+'" class="tagSeperator" title="Click Me">'+userTagFromDetails+'</span> <span id="'+userTagFromDetails+'tagdelete" class="tag-delete" title="Delete Me"></span></span></span>');
								}	
								
							}	
						}
						
					 $("#allTagsCreated").show();
					 $('.badges_tag_holder').hide();
					 $('#badge_holder').show();
					 $('#persisting_user').hide();
					 $('.add_vlink_cont').html(buildvideolist+buildProfilePic);
					 $('#earn_badge').hide();
					 $('#getstuff').hide();
					 $('#myBadgesTrophies').hide();
					 
					$('#badgeInformation').show();
					
				}
			}
		
		tagsOfAllTheBadges 			= [];
		for(indexingBadgesList in badgesListMap)
		{
			var allTagsDetails 		= new String(badgesListMap[indexingBadgesList].badgeTagsContents).split(",");
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
		    				toAddNewTagToTheBadge(String(data.item.value));
		    		   },
		    open	 : function()
		               {
		    				$(".ui-autocomplete,.ui-menu,.ui-widget,.ui-widget-content,.ui-corner-all").css({
		    					"list-style" : "none",
		    					"color"		 : "#8B9BA0",
		    					"text-decoration" : "bold"	
		    				});
		               },
		    close	 : function()
		    		   {
		    				$("#toAddNewTag").show();
		    		   }
		});
		
		
		if(String(badgeType) === "badge")
		{
			$("#total_badges li").each(function(){
				
				for(indexingBadgesList in badgesListMap)
				{
					if(String($(this).attr("id")) === String(badgesListMap[indexingBadgesList].key) && String(badgesListMap[indexingBadgesList].badgeType) === String(badgeType))
					{
						badgesListNavigator.push({
							key 	: indexingBadgesList,
							value 	: badgesListMap[indexingBadgesList]
			
						});
					}	
				}	
				
			});
		}
		else if(String(badgeType) === "trophy")
		{
			$("#total_trophies li").each(function(){
				
				for(indexingBadgesList in badgesListMap)
				{
					if(String($(this).attr("id")) === String(badgesListMap[indexingBadgesList].key) && String(badgesListMap[indexingBadgesList].badgeType) === String(badgeType))
					{
						badgesListNavigator.push({
							key 	: indexingBadgesList,
							value 	: badgesListMap[indexingBadgesList]
			
						});
					}	
				}	
				
			});
		}	
		
		
		
		
		for(var i=0; i<badgesListNavigator.length;i++)
		{
			if(String(badgesListNavigator[i].key) === String(badgeID) )
			{
				if( i != 0)
				{
					$(".badge_navigator > .previousbadge").attr ({
																	id 			: badgesListNavigator[i-1].key,
																	onclick 	: "javascript:myBadgeDetail(this,'"+badgesListNavigator[i-1].value.badgeType+"')"		
					}).addClass("navigation_enabled").removeClass("navigation_disabled");
				}
				else
				{
					$(".badge_navigator > .previousbadge").removeAttr("id").removeAttr("onclick").addClass("navigation_disabled").removeClass("navigation_enabled");
				}	
				
				if((i+1) != badgesListNavigator.length)
				{
					$(".badge_navigator > .nextbadge").attr ({
																id 			: badgesListNavigator[i+1].key,
																onclick 	: "javascript:myBadgeDetail(this,'"+badgesListNavigator[i+1].value.badgeType+"')"		
					}).addClass("navigation_enabled").removeClass("navigation_disabled");
				}	
				else
				{
					$(".badge_navigator > .nextbadge").removeAttr("id").removeAttr("onclick").addClass("navigation_disabled").removeClass("navigation_enabled");
				}	
			}	
		}
	}
	
	var videostatus="";
	  function showalert()
	  {
		  if(c>=Math.floor(ytplayer.getDuration() - videoStartingSeconds) && ytplayer.getDuration() != 0 && c!= 0 && ytplayer.getCurrentTime() === ytplayer.getDuration())
		  {
			  videostatus="completed";
			   try{
					if(videokey1 != "")
						{
						 if(userstatusdetails[userDetailsKeyForVideo])
				  		 {
				  		 	var previousVideoStatus = new Array();
				  		 	if(String(userstatusdetails[userDetailsKeyForVideo].videostatus).indexOf(",") != -1)
				  		 		previousVideoStatus = String(userstatusdetails[userDetailsKeyForVideo].videostatus).split(",");
				  		 	else if(String(userstatusdetails[userDetailsKeyForVideo].videostatus))
				  		 		{
				  		 			previousVideoStatus.push(String(userstatusdetails[userDetailsKeyForVideo].videostatus));
				  		 		}
				  		 	for(var i=0;i<previousVideoStatus.length;i++)
				  		 		{
				  		 			if(previousVideoStatus[i].indexOf(videokey1) != -1)
				  		 				previousVideoStatus[i] = videokey1+":"+videostatus;
				  		 		}
				  		 	
				  		 	userstatusdetails[userDetailsKeyForVideo].videostatus			= previousVideoStatus;
				  		 	
				  		 	$(".add_vlink_cont li[id='"+videoID+"']").attr("onclick",'_run("'+videoID+'",0)');
				  		 }
					 $.ajax({type: 'POST', url: '/storevideopercentage1' ,data:"userDetailsKey="+userDetailsKeyForVideo+"&status="+videostatus+"&videokey="+videokey1,async:true, success: function(data)
						 { 
						  
							 $('.add_vlink_cont').find('#'+runvideoId).find('code').attr("class","watched");
							 videokey1 = "";
							 $("#voice-box").fadeIn();
							 document.getElementById("statusMessage").innerHTML = "completely watched!";
							 document.getElementById("voice-box").setAttribute("status", "saved");
							 setTimeout("hideStatusMessage()", 1750);
						 } 
					 	}); 
						}
			   }
			   catch(e)
				{
				}
		  }
		 else
		 {
			 if(videoStartingSeconds < ytplayer.getCurrentTime() && c >= Math.floor(ytplayer.getCurrentTime() - videoStartingSeconds))
			 {
				 videostatus	=	ytplayer.getCurrentTime();
			 }
			 else
			 {
				 videostatus	=	videoStartingSeconds;
			 }	 
			 
			 try{
				 if(videokey1 != "" && ytplayer.getCurrentTime() < ytplayer.getDuration())
				 {
					 if(userstatusdetails[userDetailsKeyForVideo])
				  	   {
				  		 	var previousVideoStatus 	= new Array();
				  		 	
				  		 	if(String(userstatusdetails[userDetailsKeyForVideo].videostatus).indexOf(",") != -1)
				  		 	{
				  		 		previousVideoStatus = String(userstatusdetails[userDetailsKeyForVideo].videostatus).split(",");
				  		 	}	
				  		 	else if(String(userstatusdetails[userDetailsKeyForVideo].videostatus))
				  		 	{
			  		 			previousVideoStatus.push(String(userstatusdetails[userDetailsKeyForVideo].videostatus));
			  		 		}
				  		 	
				  		 	for(var i=0;i<previousVideoStatus.length;i++)
				  		 	{
			  		 			if(String(previousVideoStatus[i]).indexOf(videokey1) != -1)
			  		 			{
			  		 				previousVideoStatus[i] = videokey1+":"+videostatus;
			  		 			}	
				  		 	}
				  		 	userstatusdetails[userDetailsKeyForVideo].videostatus			= previousVideoStatus;
				  		 	
				  		 	$(".add_vlink_cont li[id='"+videoID+"']").attr("onclick",'_run("'+videoID+'","'+videostatus+'"),run("'+videokey1+'","'+userDetailsKeyForVideo+'","'+userstatusdetails[userDetailsKeyForVideo].stuffid+'","'+videoID+'")');
				  		}
					 
					 
						 $.ajax({type: 'POST', url: '/storevideopercentage1' ,data:"userDetailsKey="+userDetailsKeyForVideo+"&status="+videostatus+"&videokey="+videokey1, success: function(data)
							 { 
							 	var currentclasscode					= $('.add_vlink_cont').find('#'+runvideoId).find('code').attr("class");
							 	
								   if(currentclasscode != "watched" )
								   {
									   $('.add_vlink_cont').find('#'+runvideoId).find('code').attr("class","unwatched");
									   $("#voice-box").fadeIn();
									   document.getElementById("statusMessage").innerHTML = "partially watched!";
									   document.getElementById("voice-box").setAttribute("status", "saved");
									   setTimeout("hideStatusMessage()", 1750);
									   
								   }
								   videokey1 = "";
							  } 
							 
						 }); 
					 }
			   }
			   catch(e)
				{
				}
		   }
	  }
	  
	  $('#bidnow_act').live("click",function(){
		     $(".bidnow").hide();
		     $(".bidtext_act, .bidnow_button").show();
		    });
	  	var isTodaysAuctionClicked 			= "0";
	  	var clientDateAccToSettingsTimeZone = "";
	  	var serverTime			   			= "";
		$('#todays_auction').live("click",function()
				{
					window.location.hash = "auction";
					/*$(".badges_tag_holder").hide();
			  		$(".filtertags").hide();
			  		$(".lineseperator").hide();
			  		$(".tagfilterlist").hide();
					$('.auction_holder').show();
					$('.points_holder').hide();
					$('.bid_points').hide();
					$('#todays_auction').addClass('active');
					$('#myprofile').removeClass('active');
					$('#earnbadges').removeClass('active');
					$('#getStuffWithBadge').removeClass('active');
					$('#settingsbutton').removeClass('active');
					$('#badgestowork').removeClass('active');
					$('.productlist').show();
					$('#myBadgesTrophies').hide();
					$('#earn_badge').hide();
					$('#getstuff').hide();
					$('#Settings').hide();	
					$('.auction_detail_holder').hide();
					$('#badges_to_work').hide();
					$('#badgeInformation').hide();
					$('#all_transactions').hide();
					
					var buildAuctionMap = "";
					var incrementSec = 0;
					if(String(isTodaysAuctionClicked).indexOf("0") != -1)
					{
						isTodaysAuctionClicked = "1";
						
						$.ajax(
								     {  
								    	 type: 'GET', url: '/getServerTime',async: false, success: function( data )
								    	 {
								    		 if(data != null)
								    			 {
									    			serverTime = data;
								    			 }
								    	 }
								     });
						console.log(parseFloat(serverTime));
						
					}
					for(indexUserAuctionMap in auctionListMap)
						{
							
							
							var currentClientEndDate = new Date(auctionListMap[indexUserAuctionMap].auctionEndTime);
							var clientOffset = 5.5;
							
							var currentClintEndLocalTime = currentClientEndDate.getTime();
							var currentClientUTCEndOffset = currentClientEndDate.getTimezoneOffset()*60000;
							var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
							var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
							//console.log(clientEndTimeAccToTimeZone);
							var endDate		= new Date(clientEndTimeAccToTimeZone);
							
							var currentClientLocation = new Date(parseFloat(serverTime));
							currentClientLocation.setSeconds(currentClientLocation.getSeconds() + incrementSec);
							var currentClientLocalTime = currentClientLocation.getTime();
							var currentClientUTCOffset = currentClientLocation.getTimezoneOffset()*60000;
							var convertedClientUTCTime = ((currentClientLocalTime) + (currentClientUTCOffset));
							var clientTimeAccToTimeZone = convertedClientUTCTime + (3600000 * clientOffset);
							clientDateAccToSettingsTimeZone = new Date(clientTimeAccToTimeZone);
							
							if(endDate.getTime() > clientDateAccToSettingsTimeZone.getTime())
								buildAuctionMap += '<li class="product_list live_auction_item" id="'+indexUserAuctionMap+'" onclick="showDetailedAuction(this)"><img height="140px" width="140px" src="'+auctionListMap[indexUserAuctionMap].auctionImgId+'">'
			                    +'<h3>'+auctionListMap[indexUserAuctionMap].auctionName+'</h3>'
			                    +'<div class="left_time"><h1>00:00:00</h1><h2>Left to end Bid</h2></div></li>';
							else if(endDate.getTime() < clientDateAccToSettingsTimeZone.getTime())
								buildAuctionMap +=  '<li class="product_list closed_auction_item" style="display:none" id="'+indexUserAuctionMap+'" onclick="showDetailedAuction(this)"><img height="140px" width="140px" src="'+auctionListMap[indexUserAuctionMap].auctionImgId+'">'
				                    +'<h3>'+auctionListMap[indexUserAuctionMap].auctionName+'</h3>'
				                    +'<div class="left_time"><h1>00:00:00</h1><h2>Left to end Bid</h2></div></li>'
							startTime(endDate,indexUserAuctionMap,incrementSec);
						}
					
					
					$('.live_auction_holder').html(buildAuctionMap);*/
					
				});
		$('#closed_auction').live("click",function()
				{
					$('#closed_auction').addClass('selected');
					$('#live_auction').removeClass('selected');
					$('#future_auction').removeClass('selected');
					$('.closed_auction_item').show();
					$('.live_auction_item').hide();
				});
		
		$('#live_auction').live("click",function()
		{
			$('#live_auction').addClass('selected');
			$('#closed_auction').removeClass('selected');
			$('#future_auction').removeClass('selected');
			$('.closed_auction_item').hide();
			$('.live_auction_item').show();
		});
		
		var auctionTransactionMap = new Object();
		var userKeyColor = new Object();
		var diffTimeToDisplayInTable;
		var colorsArray = new Array();
		colorsArray[0] = "user2";
		colorsArray[1] = "user3";
		colorsArray[2] = "user4";
		colorsArray[3] = "user5";
		colorsArray[4] = "user6";
		colorsArray[5] = "user7";
		colorsArray[6] = "user8";
		colorsArray[7] = "user9";
		colorsArray[8] = "user10";
		
		var isShowDetailedAuctionCalled = "0";
		function showDetailedAuction(auctionId)
		{
			$('.productlist').hide();
			auctionId = $(auctionId).attr("id");
			
			var clientOffset = 5.5;
			
			
			for(indexUserAuctionMap in auctionListMap)
			{
				if(indexUserAuctionMap.indexOf(auctionId) != -1)
					{
						var buildDetailedLi = 
							'<img height="110px" width="110px" src="'+auctionListMap[indexUserAuctionMap].auctionImgId+'">'+
					        '<span class="auction_desc">'+
					        	'<h2>'+auctionListMap[indexUserAuctionMap].auctionName+'</h2>'+
					            '<p>'+auctionListMap[indexUserAuctionMap].auctionDescription.value+'</p>'+
					        '</span>'+
					        '<span>'+
					        	'<h1>00:00:00</h1>'+
					           ' <h3>Left to end bid</h3>'+
					       ' </span>'+
					       ' <h5 style="display:none">insufficient points</h5>'+
					       //' <span id="bidnow_act" class="bidnow" >Bid Now</span>'+
					        '<span class="bidtext bidtext_act" style="margin-left:69%"><form><input type="text" id="bidPoints"><input type="submit" class="bidnow_button" id='+auctionId+' onclick="return sendBiddingInformation(this)" value="BID"/></form></span>'+
					        '<div class="clear_all"></div>';
					       // '</div>';
						var currentDate = new Date(auctionListMap[indexUserAuctionMap].auctionStartTime);
						var currentClintEndLocalTimeTableDiff = currentDate.getTime();
						var currentClientUTCEndOffsetTableDiff = currentDate.getTimezoneOffset()*60000;
						var convertedClientUTCEndTimeTableDiff = ((currentClintEndLocalTimeTableDiff) + (currentClientUTCEndOffsetTableDiff));
						var clientEndTimeAccToTimeZoneTableDiff = convertedClientUTCEndTimeTableDiff + (3600000 * clientOffset);
						diffTimeToDisplayInTable		= new Date(clientEndTimeAccToTimeZoneTableDiff);
						 
						var currentClientEndDate = new Date(auctionListMap[indexUserAuctionMap].auctionEndTime);
						var clientOffset = 5.5;
						
						var currentClintEndLocalTime = currentClientEndDate.getTime();
						var currentClientUTCEndOffset = currentClientEndDate.getTimezoneOffset()*60000;
						var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
						var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
						var endDate		= new Date(clientEndTimeAccToTimeZone);
						displayPreviousAuction(auctionId,auctionListMap[indexUserAuctionMap].auctionStartTime);
						
						/*var serverTime						= "";
						$.ajax(
				 			     {  
				 			    	 type: 'GET', url: '/getServerTime',async: false, success: function( data )
				 			    	 {
				 			    		 if(data != null)
				 			    			 {
					 			    			serverTime = data;
				 			    			 }
				 			    	 }
				 			     });
						console.log(parseFloat(serverTime));
						var currentTime 					= new Date();
						var currentTimeInMillis				= parseFloat(serverTime); // currentTime.getTime();
						var currentTimeUTCOffset			= currentClientEndDate.getTimezoneOffset()*60000;
						var convertedCurrentTimeUTCOffset	= currentTimeUTCOffset + currentTimeInMillis;
						var currentTimeAccToTimezpne		=  convertedCurrentTimeUTCOffset + (3600000 * clientOffset);
						var	convertedCurrentTimeAccTZ		=new Date(currentTimeAccToTimezpne);*/
						
						var incrementSecForDetailedAuction = 0;
						if(isShowDetailedAuctionCalled.indexOf("0") != -1)
							{
								isShowDetailedAuctionCalled = "1";
								//startTimeForDetailedAuction(endDate,indexUserAuctionMap,incrementSecForDetailedAuction);
								if(endDate.getTime() > clientDateAccToSettingsTimeZone.getTime())
								{
									//requestToken(auctionId);
									var httpRequest = makeRequest('/requestToken?userKey='+userKey+'&auctionId='+auctionId,true);
									//console.log(httpRequest);
									try
									{
									httpRequest.onreadystatechange = function(){
										if (httpRequest.readyState === 4) {
											if (httpRequest.status === 200) {
												openChannel(httpRequest.responseText);
											}
											else {
												alert('There was a problem with the request.');
											}
										}
									}
									}
									catch(e)
									{
										 console.error("Channe API failed ::"+e.message);
									}
								}
								else
									{

										var revealImg = $('#all_transactions').find('tr').find('.reveal').html();
										//console.log('revealImg ::'+revealImg);
										for(indexAuctionTransactionMap in auctionTransactionMap)
											{
												if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
												{
													for(index in userProfileMap)
														{
															if(String(revealImg).indexOf(index) != -1)
																{
																	$('#all_transactions').find('tr.highlite').find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
																	$('#all_transactions').find('tr.highlite').find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
																}
														}
												}
											}
										$('#least_transactions > tbody').children().each(function()
												{
													var revealImg =  $(this).find('.reveal').html();
													
													for(indexAuctionTransactionMap in auctionTransactionMap)
													{
														if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
														{
															for(index in userProfileMap)
																{
																	if(String(revealImg).indexOf(index) != -1)
																		{
																			$(this).find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
																			$(this).find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
																		}
																}
														}
													}
												});
										
									}
							}
						
				    	var  pointsHolder = "";
						for(indexUserBadgeLogJdoMap in userBadgeLogJdoMap)
							{
								if(String(userBadgeLogJdoMap[indexUserBadgeLogJdoMap].userId).indexOf(userKey) != -1)
									{
										pointsHolder += '<div class="current_points"> Your Points :<span>'+(parseInt(userBadgeLogJdoMap[indexUserBadgeLogJdoMap].points) )+'</span></div>'+
						                  '<div class="balance_points" style="display:none">Your Balance Points :<span></span></div>'+
						                  '<div class="clear_all">';
									}
							}
					}
			}
			$('.live_auction_detail').html(buildDetailedLi);
			$('.points_holder').show();
			$('.points_holder').html(pointsHolder);
			$('.auction_detail_holder').show();
		}
		function sendBiddingInformation(auctionId)
		{
			console.log("come here");
			var auctionId = $(auctionId).attr('id');
			var bidPoints = 0;
			var maxBidPoints = 0;
			var highestBid = 0;
			var status = true;
			bidPoints = parseInt($('#bidPoints').val());
			var timingStatus = false;
			for(indexAuctionList in auctionListMap)
				{
					if(indexAuctionList.indexOf(String(auctionId)) != -1)
						{
						var currentClientEndDate = new Date(auctionListMap[indexAuctionList].auctionEndTime);
						var clientOffset = 5.5;
						
						var currentClintEndLocalTime = currentClientEndDate.getTime();
						var currentClientUTCEndOffset = currentClientEndDate.getTimezoneOffset()*60000;
						var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
						var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
						var endDate		= new Date(clientEndTimeAccToTimeZone);
						
						/*var serverTime						= "";
						$.ajax(
				 			     {  
				 			    	 type: 'GET', url: '/getServerTime',async: false, success: function( data )
				 			    	 {
				 			    		 if(data != null)
				 			    			 {
					 			    			serverTime = data;
				 			    			 }
				 			    	 }
				 			     });
						console.log(parseFloat(serverTime));
						var currentTime 					= new Date();
						var currentTimeInMillis				= parseFloat(serverTime); //currentTime.getTime();
						var currentTimeUTCOffset			= currentClientEndDate.getTimezoneOffset()*60000;
						var convertedCurrentTimeUTCOffset	= currentTimeUTCOffset + currentTimeInMillis;
						var currentTimeAccToTimezpne		=  convertedCurrentTimeUTCOffset + (3600000 * clientOffset);
						var	convertedCurrentTimeAccTZ		=new Date(currentTimeAccToTimezpne);*/
						if(endDate > clientDateAccToSettingsTimeZone)
							timingStatus = true;
						}
				}
			if(timingStatus)
				{
					for(indexAuctionTransactionMap in auctionTransactionMap)
						{
							if(highestBid < auctionTransactionMap[indexAuctionTransactionMap].bidPoints)
								highestBid = auctionTransactionMap[indexAuctionTransactionMap].bidPoints;
						}
					for(indexUserAuctionMap in auctionListMap)
					{
						if(indexUserAuctionMap.indexOf(auctionId) != -1)
							{
								maxBidPoints = parseInt(auctionListMap[indexUserAuctionMap].auctionMaxPoints);
							}
					}
	  
		if(auctionTransactionMap != null)
		{
			for(indexAuctionTransactionMap in auctionTransactionMap)
				{
					if(String(auctionTransactionMap[indexAuctionTransactionMap].userId).indexOf(userKey) != -1) 
					 {
						if(parseInt(bidPoints) <= auctionTransactionMap[indexAuctionTransactionMap].bidPoints)
							{
								status = false;
								alert('You have to bid more than your pervious points');
							}
						else
							{
								if(highestBid == parseInt(auctionTransactionMap[indexAuctionTransactionMap].bidPoints))
								{
									status = false;
									alert('You are the highest bidder right now!');
								}
							}
					 }
				}
		}
	for(index in userBadgeLogJdoMap)
		{
		 	if(userBadgeLogJdoMap[index].userId.indexOf(userKey) != -1)
		 		{
		 			if(parseInt(bidPoints)  <= (parseInt(userBadgeLogJdoMap[index].points)))
		 				{
		 					if(parseInt(bidPoints) > maxBidPoints && parseInt(bidPoints) > highestBid)
		 						{
		 							if(status)
		 								status = true;
		 							$('#bidPoints').val("");
		 						}
		 					else
		 						{
		 							status = false;
		 							$('#bidPoints').val("");
		 							alert('Sorry, you must bid with highest points');
		 						}
		 				}
		 			else
		 				{
		 					status = false;
		 					$('#bidPoints').val("");
		 					alert('Sorry, you dont have enough points');
		 				}
		 				
		 		}
		}
	if(status)
		{
			$('.bid_points').show();
			$('#previous_points').append('<li>'+bidPoints+'</li>');
			jQuery._uuidlet =  (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
			var auctionKey = jQuery._uuidlet;
			$.ajax(
	 			     {  
	 			    	 type: 'POST', url: '/addAuctionEntry', data:'auctionId='+auctionId+'&auctionKey='+auctionKey+'&userKey='+userKey+'&bidPoints='+bidPoints,async: false, success: function( data )
	 			      {
	 			    		 if(String(data).indexOf('Success') != -1)
	 			    			 {
			 			    		var previousPoints = $('#previous_points').html();
			 			    		$('#previous_points').append("<li>"+addAuctionEntry.bidPoints+"</li>");
	 			    			 }
	 			    		 else
	 			    			 {
	 			    			 	alert('Sorry, one of your friend has already bidded for the same points ');
	 			    			 }
	 			    		
	 			      }
	 			     });	
		}
}
			return false;
}

function requestToken(auctionId)
{

$.ajax(
     {  
    	 type: 'POST', url: '/requestToken', data:'userKey='+userKey+'&auctionId='+auctionId,async:true,success: function( data )
      {
    		 try
    			{
		    		 console.info('The channel token is *******: '+ data);
		    		 //console.log('Before calling the openchannel');
		    		 	var channel = new goog.appengine.Channel(data);
		    			var socket = channel.open();
		    			//console.log('After opening the channel');
		    			socket.onopen = onSocketOpen;
		    			socket.onmessage = onSocketMessage;
		    			socket.onerror = onSocketError;
		    			socket.onclose = onSocketClose;
		    		 console.info('After opening the channel');
    			}
    		 catch(e)
    		 {
    			 console.error("Channe API failed ::"+e.message);
    		 }
      }
     });


}

function makeRequest(url,async) {
var httpRequest;
if (window.XMLHttpRequest) {
// Mozilla, Safari, ...
httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) {
// IE
try {
	httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
} 
catch (e) {
	try {
		httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	} 
	catch (e) {}
}
}

if (!httpRequest) {
alert('Giving up :( Cannot create an XMLHTTP instance');
return false;
}
httpRequest.open('POST', url,async);
httpRequest.send();
return httpRequest;
}



openChannel = function(token) { 
var channel = new goog.appengine.Channel(String(token.trim()));
var socket = channel.open();
socket.onopen = onSocketOpen;
socket.onmessage = onSocketMessage;
socket.onerror = onSocketError;
socket.onclose = onSocketClose;	
};

onSocketError = function(error){

$.ajax(
     {  
    	 type: 'POST', url: '/removeUserKey', data:'userKey='+userKey, success: function( data )
      {
    		 
      }
     }
     );

//	alert("Error is <br/>"+error.description+" <br /> and HTML code"+error.code);
};

onSocketOpen = function() {
};

onSocketClose = function() {
$.ajax(
     {  
    	 type: 'POST', url: '/removeUserKey', data:'userKey='+userKey, success: function( data )
      {
    		 
      }
     }
     );
//alert("Socket Connection closed");
};
var colorIndex = 0;
onSocketMessage = function(message)
	{
			var messageData = (String(message.data)).trim();
			var newAuctionEntryAdd = JSON.parse(messageData);
			var newAuctionEntry = newAuctionEntryAdd.newAuctionEntryMap;
			console.log(messageData);
		
			if(newAuctionEntry)
			{
			
				 var addAuctionEntry 							= new Object();
					 addAuctionEntry.key 							= newAuctionEntry.key;
					 addAuctionEntry.userId 						= newAuctionEntry.userId;
					 addAuctionEntry.bidPoints						= newAuctionEntry.bidPoints;
					 addAuctionEntry.auctionId 						= newAuctionEntry.auctionId;
					 addAuctionEntry.requestedTime					= newAuctionEntry.requestedTime;
					 auctionTransactionMap[newAuctionEntry.key] 	= addAuctionEntry;
				
				var newAuctionEntryRequestedDate = new Date(newAuctionEntry.requestedTime);
				var clientOffset = 5.5;
				
				var currentClintEndLocalTime =  newAuctionEntryRequestedDate.getTime();
				var currentClientUTCEndOffset = newAuctionEntryRequestedDate.getTimezoneOffset()*60000;
				var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
				var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
				//console.log(clientEndTimeAccToTimeZone);
				var endDate		= new Date(clientEndTimeAccToTimeZone);
				
				
				
				var diff			= endDate.getTime() -  diffTimeToDisplayInTable.getTime();
				//var days  			= Math.floor( diff / (1000*60*60*24) );
				var hours 			= Math.floor( diff / (1000*60*60) );
				var mins  			= Math.floor( diff / (1000*60) );
				//var secs  			= Math.floor( diff / 1000 );
				
				var buildHighestBid = "";
				var userKeyColorId = newAuctionEntry.userId;
				
				//console.log(userKeyColor);
				
				var userColor = "user1";
				console.log("userKeyColor ::"+userKeyColor);
				console.log(userKeyColor);
				if(userKeyColor[userKeyColorId])
					userColor = userKeyColor[userKeyColorId];
				else
					{
					 var userKeyTransaction = newAuctionEntry.userId;
						if(colorIndex < 8)
						 {
						 	 //console.log("colorIndex ::"+colorIndex)
							 userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
						 	 userColor =  userKeyColor[userKeyTransaction];
							 colorIndex = colorIndex + 1;
						 }
					 else
						 {
						 	colorIndex = 0;
						 	userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
						 	userColor =  userKeyColor[userKeyTransaction];
						 	colorIndex = colorIndex + 1;
						 }
					}
						buildHighestBid = '<td  class="'+userColor+'">?</td><td id='+newAuctionEntry.userId+' width="250px">'+newAuctionEntry.userId+'</td><td width="200px">'+hours+'hrs '+mins+'mins after auction started</td><td width="89px">'+newAuctionEntry.bidPoints+'</td>';
						var previousHighestBid 				=  $('#all_transactions > tbody').find('tr.highlite').html();
						var previousHighestBidderUserId		= $('#all_transactions > tbody').find('tr.highlite').find('td.reveal').html()
						
						
						    $('#all_transactions > tbody').find('tr.highlite').html("");
							$('#all_transactions > tbody').find('tr.highlite').append(buildHighestBid);
							
							$('#least_transactions > tbody').prepend("<tr>"+previousHighestBid+"</tr>");	
							 $('#all_transactions').show();
				}
			else if(newAuctionEntryAdd.winnerUserInfo)
				{
					var userBadgeLogMapUpdated  = new Object();
					userBadgeLogMapUpdated 		= newAuctionEntryAdd.winnerUserInfo;
					console.log("userBadgeLogMapUpdated ::"+userBadgeLogMapUpdated);
					console.log(userBadgeLogMapUpdated);
					if(String(userBadgeLogMapUpdated.userId).indexOf(userKey) != -1)
						{
//							alert("Congrats you are the winner");
							$('.total').html(userBadgeLogMapUpdated.points);
							$("#auction_winner > h3").html("Congrats you are the winner!")
							

							if(userDetails[userKey].profilePicture)
							{
									$("#auction_winner").find("img").attr("src",userDetails[userKey].profilePicture);
							}	
							else
							{
									$("#auction_winner").find("img").attr("src","../images/genral-photo.jpg");
							}
							
							$("#auction_winner").fadeIn();
							$("#backgroundPopup").show();
						}
					else
						{
						for(index in userProfileMap)
							{
							if(String(index).indexOf(String(userBadgeLogMapUpdated.userId)) != -1)
								{
//									alert("The winner is "+userProfileMap[index].firstName+ " "+ userProfileMap[index].lastName);
									
									$("#backgroundPopup").show();
									$("#auction_winner > h3").html("Sorry "+userFirstName+". "+userProfileMap[index].firstName+ " "+ userProfileMap[index].lastName+" wins this Auction");
									
									if(userDetails[userKey].profilePicture)
									{
											$("#auction_winner").find("img").attr("src",userDetails[userKey].profilePicture);
									}	
									else
									{
											$("#auction_winner").find("img").attr("src","../images/genral-photo.jpg");
									}
									$("#auction_winner").fadeIn();
									$("#backgroundPopup").show();
								}
							}
						}
					for(indexUserBadgeLogJdoMap in userBadgeLogJdoMap)
						{
							if(String(userBadgeLogMapUpdated.userId).indexOf(userBadgeLogJdoMap[indexUserBadgeLogJdoMap].userId) != -1)
								userBadgeLogJdoMap[indexUserBadgeLogJdoMap].points = userBadgeLogMapUpdated.points;
						}
					
					var revealImg = $('#all_transactions').find('tr').find('.reveal').html();
					//console.log('revealImg ::'+revealImg);
					for(indexAuctionTransactionMap in auctionTransactionMap)
						{
							if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
							{
								for(index in userProfileMap)
									{
										if(String(revealImg).indexOf(index) != -1)
											{
												$('#all_transactions').find('tr.highlite').find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
												$('#all_transactions').find('tr.highlite').find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
											}
									}
							}
						}
					$('#least_transactions > tbody').children().each(function()
							{
								var revealImg =  $(this).find('.reveal').html();
								
								for(indexAuctionTransactionMap in auctionTransactionMap)
								{
									if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
									{
										for(index in userProfileMap)
											{
												if(String(revealImg).indexOf(index) != -1)
													{
														$(this).find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
														$(this).find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
													}
											}
									}
								}
							});
				}
		
	};


function displayPreviousAuction(auctionId,auctionStartTime)
{
	$.ajax(
     {  
    	 type: 'POST', url: '/getPreviousAuction', data:'auctionId='+auctionId,async: false, success: function( data )
      {
    		 //console.log(data);
    		var colorIndex = 0;
    		
    		var transactionMap =  JSON.parse(data);
    		var buildTransactionTable = "";
    		var firstRowOfTransactionTable  = "";
    		var buildPreviousAuctionPoints = "";
    		auctionTransactionMap = transactionMap;
    		
    		var currentClientLocation = new Date(auctionStartTime);
			var clientOffset = 5.5;
			
			var currentClientLocalTime = currentClientLocation.getTime();
			var currentClientUTCOffset = currentClientLocation.getTimezoneOffset()*60000;
			var convertedClientUTCTime = ((currentClientLocalTime) + (currentClientUTCOffset));
			var clientTimeAccToTimeZone = convertedClientUTCTime + (3600000 * clientOffset);
			var clientDateAccToSettingsTimeZone = new Date(clientTimeAccToTimeZone);
			var previousMaxBid = 0;
			for(indexTransactionMap in transactionMap)
				{
				 if(previousMaxBid < transactionMap[indexTransactionMap].bidPoints)
					 previousMaxBid = transactionMap[indexTransactionMap].bidPoints;
				}
			
    		 for(index in transactionMap)
    			 {
    			 var userKeyTransaction = transactionMap[index].userId;
    			 //console.log("colorIndex ::"+colorIndex)
    			 if(colorIndex < 8)
    				 {
	    				 userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
	    				 colorIndex = colorIndex + 1;
    				 }
    			 else
    				 {
    				 	colorIndex = 0;
    				 	userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
    				 	colorIndex = colorIndex + 1;
    				 }
    			 
    			
	    			 if(String(transactionMap[index].userId).indexOf(userKey) != -1) 
	    				 {
	    				 if(JSON.stringify(transactionMap[index].previousBids))
	    					 {
	    					 	var previousBids =  new Array();
	    					 	if(JSON.stringify(transactionMap[index].previousBids).indexOf(",") != -1)
	    					 		{
	    					 			previousBids = JSON.stringify(transactionMap[index].previousBids).split(",");
	    					 		}
	    					 	else if(JSON.stringify(transactionMap[index].previousBids))
	    					 		{
	    					 			previousBids.push(JSON.stringify(transactionMap[index].previousBids));
	    					 		}
	    					 		var tempPrevious=JSON.parse(previousBids);
	    					 		var pointsArray = new Array();
	    					 		for(indexTemp in tempPrevious)
	    					 			{
	    					 				pointsArray.push(indexTemp);
	    					 				//buildPreviousAuctionPoints += '<li>'+indexTemp+'</li>';
	    					 			}
	    					 		pointsArray = pointsArray.sort();
	    					 		for(var i=0;i<pointsArray.length; i++)
	    					 			buildPreviousAuctionPoints += '<li>'+pointsArray[i]+'</li>';
	    					 		$('.bid_points').show();
	    					 	$('#previous_points').html(buildPreviousAuctionPoints);
	    					 }
	    				 }
	    			    var previousRequesetedAuctionDate = new Date(transactionMap[index].requestedTime);
	    				var clientOffset = 5.5;
	    				
	    				var currentClintEndLocalTime =  previousRequesetedAuctionDate.getTime();
	    				var currentClientUTCEndOffset = previousRequesetedAuctionDate.getTimezoneOffset()*60000;
	    				var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
	    				var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
	    				var endDate		= new Date(clientEndTimeAccToTimeZone);
	    				
	    				
	    				
	    				var diff			=  endDate.getTime() - clientDateAccToSettingsTimeZone.getTime();
	    				//var days  			= Math.floor( diff / (1000*60*60*24) );
	    				var hours 			= Math.floor( diff / (1000*60*60) );
	    				var mins  			= Math.floor( diff / (1000*60) );
	    				//var secs  			= Math.floor( diff / 1000 );
	    				if(mins > 60)
    					{
	    					var addToHours 			= hours / 60;
	    					mins					=  (mins % 60);
	    					if(addToHours > 0)
	    						hours				= hours + (addToHours.toPrecision(1));
    					}
	    				if(parseInt(transactionMap[index].bidPoints) == parseInt(previousMaxBid) )
	    					{
	    				
	    					var diffColor = "user2";
	    					var transactionUserId = transactionMap[index].userId;
		    				if(userKeyColor[transactionUserId])
		    					{
		    						diffColor = userKeyColor[transactionUserId];
		    					}
		    				else
		    					{
			    					var userKeyTransaction = transactionMap[index].userId; //userKeyColor[userKeyColorId];
			    					if(colorIndex < 8)
			    					 {
			    						 userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
			    					 	 diffColor =  userKeyColor[userKeyTransaction];
			    						 colorIndex = colorIndex + 1;
			    					 }
			    					else
			    					 {
			    					 	colorIndex = 0;
			    					 	userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
			    					 	diffColor =  userKeyColor[userKeyTransaction];
			    					 	colorIndex = colorIndex + 1;
			    					 }
		    					}
		    					
		    					firstRowOfTransactionTable = ''+
	                 			'<td class="'+diffColor+'">?</td>'+
	                 			'<td class="reveal" width="260px">'+transactionMap[index].userId+'</td>'+
	                 			'<td width="230px">'+hours+'hrs '+mins+'mins after auction started</td>'+
	                 			'<td width="89px" class="tr_points">'+transactionMap[index].bidPoints+'</td>'+
	                 			'';
	    					}
	    				else
						{
	    					var diffColor = "user2";
	    					var transactionUserId = transactionMap[index].userId;
		    				if(userKeyColor.transactionUserId)
		    					{
		    					diffColor = userKeyColor[transactionUserId];
		    					}
		    				else
		    					{
			    					var userKeyTransaction = transactionMap[index].userId; //userKeyColor.userKeyColorId;
			    					if(colorIndex < 8)
			    					 {
			    						 userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
			    					 	diffColor =  userKeyColor[userKeyTransaction];
			    						 colorIndex = colorIndex + 1;
			    					 }
			    					else
			    					 {
			    					 	colorIndex = 0;
			    					 	userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
			    					 	diffColor =  userKeyColor[userKeyTransaction];
			    					 	colorIndex = colorIndex + 1;
			    					 }
		    					}
	    					
			    			  buildTransactionTable +='<tr id="'+transactionMap[index].userId+'">'+
	                 			'<td class="'+diffColor+'">?</td>'+
	                 			'<td class="reveal" width="250px">'+transactionMap[index].userId+'</td>'+
	                 			'<td width="200px">'+hours+'hrs '+mins+'mins after auction started</td>'+
	                 			'<td width="89px" class="tr_points">'+transactionMap[index].bidPoints+'</td>'+
	                 			'</tr>';
						}
	    				if(JSON.stringify(transactionMap[index].previousBids))
	    					{
		    					var previousBids =  new Array();
	    					 	if(JSON.stringify(transactionMap[index].previousBids).indexOf(",") != -1)
	    					 		{
	    					 			previousBids = JSON.stringify(transactionMap[index].previousBids).split(",");
	    					 		}
	    					 	else if(JSON.stringify(transactionMap[index].previousBids))
	    					 		{
	    					 			previousBids.push(JSON.stringify(transactionMap[index].previousBids));
	    					 		}
	    					 //	previousBids = previousBids.sort();
	    					 	
		    					 		var tempPrevious=JSON.parse(previousBids);
		    					 		for(indexTempPrevious in tempPrevious)
		    					 			{
			    					 			var previousRequesetedAuctionDate = new Date(tempPrevious[indexTempPrevious]);
							    				var clientOffset = 5.5;
							    				
							    				var currentClintEndLocalTime =  previousRequesetedAuctionDate.getTime();
							    				var currentClientUTCEndOffset = previousRequesetedAuctionDate.getTimezoneOffset()*60000;
							    				var convertedClientUTCEndTime = ((currentClintEndLocalTime) + (currentClientUTCEndOffset));
							    				var clientEndTimeAccToTimeZone = convertedClientUTCEndTime + (3600000 * clientOffset);
							    				var endDate		= new Date(clientEndTimeAccToTimeZone);
							    				
							    				
							    				var diff			=  endDate.getTime() - clientDateAccToSettingsTimeZone.getTime();
							    				var hours 			= Math.floor( diff / (1000*60*60) );
							    				var mins  			= Math.floor( diff / (1000*60) );
							    				if(mins > 60)
							    					{
								    					var addToHours 			= hours / 60;
								    					mins					= (mins % 60);
								    					if(addToHours > 0)
								    						hours				= hours + (addToHours.toPrecision(1));
							    					}
							    				var diffColor = "user2";
							    				 var userKeyTransaction = transactionMap[index].userId;
							    				if(userKeyColor[userKeyTransaction])
							    						diffColor = userKeyColor[userKeyTransaction];
							    				else
						    					{
							    					var userKeyTransaction = transactionMap[index].userId; //userKeyColor[userKeyColorId];
							    					if(colorIndex < 8)
							    					 {
							    						 userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
							    						 diffColor =  userKeyColor[userKeyTransaction];
							    						 colorIndex = colorIndex + 1;
							    					 }
							    					else
							    					 {
							    					 	colorIndex = 0;
							    					 	userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
							    					 	diffColor =  userKeyColor[userKeyTransaction];
							    					 	colorIndex = colorIndex + 1;
							    					 }
						    					}
						    					
							    				
			    					 			 buildTransactionTable +='<tr id="'+transactionMap[index].userId+'">'+
						                 			'<td class="'+diffColor+'">?</td>'+
						                 			'<td class="reveal" width="250px">'+transactionMap[index].userId+'</td>'+
						                 			'<td width="200px">'+hours+'hrs '+mins+'mins after auction started</td>'+
						                 			'<td width="89px" class="tr_points">'+indexTempPrevious+'</td>'+
						                 			'</tr>';
		    					 			}
	    					 		
	    					}
	    				else
						{
    						var diffColor = "user2";
		    				if(userKeyColor.transactionMap[index].userId)
		    					diffColor = userKeyColor.transactionMap[index].userId;
		    				else
	    					{
		    					var userKeyTransaction = userKeyColor.userKeyColorId;
		    					if(colorIndex < 8)
		    					 {
		    						 userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
		    						 diffColor =  userKeyColor[userKeyTransaction];
		    						 colorIndex = colorIndex + 1;
		    					 }
		    					else
		    					 {
		    					 	colorIndex = 0;
		    					 	userKeyColor[userKeyTransaction] = colorsArray[colorIndex];
		    					 	diffColor =  userKeyColor[userKeyTransaction];
		    					 	colorIndex = colorIndex + 1;
		    					 }
	    					}
	    					
			    			  buildTransactionTable +='<tr id="'+transactionMap[index].userId+'">'+
	                 			'<td class="'+diffColor+'">?</td>'+
	                 			'<td class="reveal" width="250px">'+transactionMap[index].userId+'</td>'+
	                 			'<td width="200px">'+hours+'hrs '+mins+'mins after auction started</td>'+
	                 			'<td width="89px" class="td_points">'+transactionMap[index].bidPoints+'</td>'+
	                 			'</tr>';
						}
	    					
    			 }
    		 $('#all_transactions').show();
    		 $('#all_transactions > tbody').find('tr.highlite').html("");
    		$('#all_transactions > tbody').find('tr.highlite').append(firstRowOfTransactionTable);
    		$('#least_transactions > tbody:last').html("");
    		$('#least_transactions > tbody:last').append(buildTransactionTable);
    		$('.bid_points').show();
    		$('#previous_points').html(buildPreviousAuctionPoints);
    		
    		
    		 
    		 var table = $('#least_transactions > tbody');
    		 var myPointsList = $('#least_transactions > tbody > tr > td.tr_points');
 		   myPointsList.sort(function(a, b) {
 		    		var compA = parseInt($(a).text());
 		    		var compB = parseInt($(b).text());
 		    	   return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
 			    })
 		    $.each(myPointsList, function(idx, itm) 
 		    	{
 		    		table.append($(itm).parent());
 		    	});
      }
     });
}




function startTime(endDate,liAuctionId,incrementSec)
{
	console.log("Comes here too"+endDate.getTime() +"clientDateAccToSettingsTimeZone.getTime( ::"+clientDateAccToSettingsTimeZone.getTime());
	var clientOffset = 5.5;
	var currentClientLocation = new Date(parseFloat(serverTime));
	currentClientLocation.setSeconds(currentClientLocation.getSeconds() + incrementSec);
	var currentClientLocalTime = currentClientLocation.getTime();
	var currentClientUTCOffset = currentClientLocation.getTimezoneOffset()*60000;
	var convertedClientUTCTime = ((currentClientLocalTime) + (currentClientUTCOffset));
	var clientTimeAccToTimeZone = convertedClientUTCTime + (3600000 * clientOffset);
	clientDateAccToSettingsTimeZone = new Date(clientTimeAccToTimeZone);
	
	var today=clientDateAccToSettingsTimeZone;
	if(endDate.getTime() > clientDateAccToSettingsTimeZone.getTime())
	{
		var diff			= endDate.getTime() - clientTimeAccToTimeZone;
		var days  			= Math.floor( diff / (1000*60*60*24) );
		var hours 			= Math.floor( diff / (1000*60*60) );
		var mins  			= Math.floor( diff / (1000*60) );
		var secs  			= Math.floor( diff / 1000 );
		console.log("days ::"+days+" hours ::"+hours+" min ::"+mins);
		
		var dd = days;
		var hh = hours - days  * 24;
		var mm = mins  - hours * 60;
		mm 	   = checkTime(mm); 
		var ss = secs  - mins  * 60;
		ss 	   = checkTime(ss); 
			$('#'+liAuctionId).find('div.left_time').html("");
			$('#'+liAuctionId).find('div.left_time').html('<h1>'+hh+':'+mm+':'+ss+'</h1>');
			$('.live_auction_detail').find('h1').html('<h1>'+hh+':'+mm+':'+ss+'</h1>');
//			console.log("hh:mm:ss ::"+hh+':'+mm+':'+ss);
			t=setTimeout(function()
			{
				if(endDate.getTime() > today.getTime())
					{
						incrementSec = incrementSec + 1;
						startTime(endDate,liAuctionId,incrementSec)
					}
					
			},1000);
	}
	else
	{
//		if(channel)
//			channel.close();
		
		var revealImg = $('#all_transactions').find('tr').find('.reveal').html();
		//console.log('revealImg ::'+revealImg);
		for(indexAuctionTransactionMap in auctionTransactionMap)
			{
				if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
				{
					for(index in userProfileMap)
						{
							if(String(revealImg).indexOf(index) != -1)
								{
									$('#all_transactions').find('tr.highlite').find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
									$('#all_transactions').find('tr.highlite').find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
								}
						}
				}
			}
		$('#least_transactions > tbody').children().each(function()
				{
					var revealImg =  $(this).find('.reveal').html();
					
					for(indexAuctionTransactionMap in auctionTransactionMap)
					{
						if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
						{
							for(index in userProfileMap)
								{
									if(String(revealImg).indexOf(index) != -1)
										{
											$(this).find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
											$(this).find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
										}
								}
						}
					}
				});
		
	}
}


var serverTimeForDetailedAuction						= "";


function startTimeForDetailedAuction(endDate,liAuctionId,incrementSecForDetailedAuction)
{
	if(incrementSecForDetailedAuction == 0)
		{
			$.ajax(
				     {  
				    	 type: 'GET', url: '/getServerTime',async: false, success: function( data )
				    	 {
				    		 if(data != null)
				    			 {
				    			 	serverTimeForDetailedAuction = data;
				    			 }
				    	 }
				     });
			console.log(parseFloat(serverTimeForDetailedAuction));
		}
	
	var clientOffset = 5.5;
	var currentClientLocation = new Date(parseFloat(serverTime));
	currentClientLocation.setSeconds(currentClientLocation.getSeconds() + incrementSecForDetailedAuction);
	//incrementSecForDetailedAuction = incrementSecForDetailedAuction + 1;
	var currentClientLocalTime = currentClientLocation.getTime();
	var currentClientUTCOffset = currentClientLocation.getTimezoneOffset()*60000;
	var convertedClientUTCTime = ((currentClientLocalTime) + (currentClientUTCOffset));
	var clientTimeAccToTimeZone = convertedClientUTCTime + (3600000 * clientOffset);
	var clientDateAccToSettingsTimeZone = new Date(clientTimeAccToTimeZone);
	
	var today=clientDateAccToSettingsTimeZone;
	if(endDate.getTime() > clientDateAccToSettingsTimeZone.getTime())
		{
			var diff			= endDate.getTime() - clientTimeAccToTimeZone;
			var days  			= Math.floor( diff / (1000*60*60*24) );
			var hours 			= Math.floor( diff / (1000*60*60) );
			var mins  			= Math.floor( diff / (1000*60) );
			var secs  			= Math.floor( diff / 1000 );
			////console.log("days ::"+days+" hours ::"+hours+" min ::"+mins);
			
			var dd = days;
			var hh = hours - days  * 24;
			var mm = mins  - hours * 60;
			mm 	   = checkTime(mm); 
			var ss = secs  - mins  * 60;
			ss 	   = checkTime(ss); 
				$('.live_auction_detail').find('h1').html('<h1>'+hh+':'+mm+':'+ss+'</h1>');
				t=setTimeout(function()
				{
					if(endDate.getTime() > today.getTime())
						{
						incrementSecForDetailedAuction = incrementSecForDetailedAuction + 1;
							startTimeForDetailedAuction(endDate,liAuctionId,incrementSecForDetailedAuction)
						}
						
				},1000);
		}
	else
		{
	//		if(channel)
	//			channel.close();
			
			var revealImg = $('#all_transactions').find('tr').find('.reveal').html();
			//console.log('revealImg ::'+revealImg);
			for(indexAuctionTransactionMap in auctionTransactionMap)
				{
					if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
					{
						for(index in userProfileMap)
							{
								if(String(revealImg).indexOf(index) != -1)
									{
										$('#all_transactions').find('tr.highlite').find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
										$('#all_transactions').find('tr.highlite').find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
									}
							}
					}
				}
			$('#least_transactions > tbody').children().each(function()
					{
						var revealImg =  $(this).find('.reveal').html();
						
						for(indexAuctionTransactionMap in auctionTransactionMap)
						{
							if(String(revealImg).indexOf(auctionTransactionMap[indexAuctionTransactionMap].userId) != -1)
							{
								for(index in userProfileMap)
									{
										if(String(revealImg).indexOf(index) != -1)
											{
												$(this).find('td:first-child').html('<img width="42" height="42" title="'+userProfileMap[index].firstName+'" src="'+userProfileMap[index].profilePicture+'">');
												$(this).find('td.reveal').html(userProfileMap[index].firstName+"  "+userProfileMap[index].lastName);
											}
									}
							}
						}
					});
			
			return "false";
		}

}

function checkTime(i)
{
if (i<10)
  {
	i="0" + i;
  }
return i;
}

function searchBadges()
{
	var searchval = $("#search_mem").val();
	$("#earnBadgeUL li").hide();
	$("#earnBadgeUL li:containsi('"+searchval+"')").show();
}	

function blank(selId) {
	$(selId).val("");
}
function unblank(selId,textToDisplay) {
	$(selId).val(textToDisplay);
}
