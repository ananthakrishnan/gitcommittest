
	var badgeIdForAddingDeletingTag 	= "";
	var adminTag 						= new Array();
	var userTag 						= new Array();
	var tagsOfAllTheBadges			    = new Array();

	
	
	
	$(document).ready(function(){
				
				$("#earnBadgeUL,#earnTrophiesUL,#total_badges,#total_trophies,#stuffs_total,.mem_of_badge").live("mouseover",function(){
					
					$(this).find("img").tipTip({defaultPosition : "bottom"});
					
				});
				
				$(".tagLikes").live("mouseover",function(){
					
					$(this).tipTip({defaultPosition : "top"});
					
				});
				
				$(".popup_img > img").tipTip({defaultPosition : "bottom"});
				
				$(".popup_img > img").live("mouseover",function(){
					
					$(this).tipTip({defaultPosition : "bottom"});
					
				});
				
				$(".filtertags").live("mouseover",function(){
					
					$(this).tipTip({defaultPosition : "right"});
					
				});
		
				$(".tagRating").live({
					
					mouseover : function()
								{
									$(this).parent("span").find(".tagLikes").trigger("mouseover");
								},
								
					mouseout  : function()
								{
									$(this).parent("span").find(".tagLikes").trigger("mouseout");
									$("#adminAddNewTag").show();
								}
								
				});
				
				$(".tagLegsWrapper").live({
					
					mouseover : function()
								{
									var tagIdToShowItsRating 		= $(this).attr("id");
									$("#"+tagIdToShowItsRating+"popularizeTheTag").show();
									$(".tagSeperator").tipTip();
									$(".tag-delete").tipTip(); 
								},
								
					mouseout  : function()
								{
									var tagIdToShowItsRating 		= $(this).attr("id");
									$("#"+tagIdToShowItsRating+"popularizeTheTag").hide();
								}
								
				});
		
				$("#adminAddNewTag").live("click",function(){
					
					$("#adminAddNewTag").hide();
					
					if($("#toAddNewTag").hasClass("errorboxforinput"))
					{
						$("#toAddNewTag").removeClass("errorboxforinput");
					}	
					
					$("#toAddNewTag").show().focus().val("");
					
				});
		
				$(".tag-delete").live("click",function(){
					
							var updateTagArrayAfterDeleteingNewTag			= new Array();
							var tagId 										= $.trim($(this).attr("id").replace("tagdelete",""));
							$("span#"+tagId).trigger("mouseout").remove();
							
							
							if(tagId)
							{
								$.ajax({
										url		: '/deleteTagFromBadge',
										type 	: 'POST',
										data 	: {idOfTheTag : tagId , badgeIdForDeletingTag:badgeIdForAddingDeletingTag},
										success : function(data)
													{
														if(data && String(data) === "successfully deleted by admin")
														{
															for(var i = 0 ; i < adminTag.length;i++)
															{
																if(String(adminTag[i]).split(":")[0] === String(tagId))
																{
																	adminTag.splice(adminTag.indexOf(tagId),1);
																}	
															}
															for(var i = 0 ; i < userTag.length;i++)
															{
																if(String(userTag[i]).split(":")[0] === String(tagId))
																{
																	userTag.splice(userTag.indexOf(tagId),1);
																}	
															}
														}
														else if(data && String(data) === "successfully deleted by user")
														{
															for(var i = 0 ; i < userTag.length;i++)
															{
																if(String(userTag[i]).split(":")[0] === String(tagId))
																{
																	userTag.splice(userTag.indexOf(tagId),1);
																}	
															}
														}
														
														for(badge_Index in badgesListMap)
														{
															if(badgeIdForAddingDeletingTag === badgesListMap[badge_Index].key )
															{
																if(String(adminTag) != "")
																{
																	updateTagArrayAfterDeleteingNewTag.push(String(adminTag));
																	updateTagArrayAfterDeleteingNewTag.push(String("nimdasgat"));
																}	
																
																if(String(userTag) != "")
																{
																	updateTagArrayAfterDeleteingNewTag.push(String(userTag));
																	updateTagArrayAfterDeleteingNewTag.push(String("resusgat"));
																}
																
																badgesListMap[badge_Index].badgeTagsContents 	= updateTagArrayAfterDeleteingNewTag;
															}
														}	
													}
									});
							}
				});
				
				$(".content-wrapper").hover(
						function()
						{
							$("#adminAddNewTag").show();
							$("#toAddNewTag").hide();
						},
						function()
						{
							$("#adminAddNewTag").hide();
							
							if( $("#toAddNewTag").css("display") != 'none' )
							{
								var getValueFromTagInputBox = $.trim($("#toAddNewTag").val());
								
								if(/^[a-zA-Z0-9]+$/.test(getValueFromTagInputBox))
								{
									if(getValueFromTagInputBox)
									{
										toAddNewTagToTheBadge(getValueFromTagInputBox);
									}
									else if($("#toAddNewTag").val())
									{
										$("#toAddNewTag").val("");
										$("#toAddNewTag").hide();
									}
								}
							}
						}
					);
					
					$(".content-wrapper").live("click",function(){
						
							if( $("#toAddNewTag").css("display") != 'none' )
							{
								var getValueFromTagInputBox = $.trim($("#toAddNewTag").val());
								
								if(/^[a-zA-Z0-9]+$/.test(getValueFromTagInputBox))
								{
									if(getValueFromTagInputBox)
									{
										toAddNewTagToTheBadge(getValueFromTagInputBox);
									}
									else if($("#toAddNewTag").val())
									{
										$("#toAddNewTag").val("");
										$("#toAddNewTag").hide();
									}
								}
							}
					});
					
					
					$(".tagSeperator").live("click",function(){
						
							var tagId 			= $.trim($(this).attr("id"));
							var badgeIDArray 	= new Array();
							var workinOnArray 	= new Array();
							var earnedArray 	= new Array();
							var buildBadges  	= "";
							
							$("#badgesLinkedToThisTag").remove("p");
							
							if(tagId && tagId != "tagName")
							{
								for(index in userBadgeLogJdoMap)
								{
									earnedArray.push(new String(userBadgeLogJdoMap[index].badgeId));
									workinOnArray.push(new String(userBadgeLogJdoMap[index].badgesworkingon));
								}
								
								for(badge_Index in badgesListMap)
								{
									var individualBadgeTagArray = String(badgesListMap[badge_Index].badgeTagsContents).split(",");
									for(var i = 0; i<individualBadgeTagArray.length ; i++)
									{
										if(String(individualBadgeTagArray[i].split(":")[0]) === String(tagId))
										{
											badgeIDArray.push(badgesListMap[badge_Index].key);
										}
									}	
								}
								
								badgeIDArray.sort();
								
								
								for(indexInbadgesListMap in badgesListMap)
								{
									
									var badgeStatus	  	= "";
									var statusTitle	    = "";
									
									 for(indexingUserStatus in userstatusdetails)
							    	 {
							    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[indexInbadgesListMap].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
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
									 
									for( var i = 0 ; i < badgeIDArray.length ; i++ )
									{
										if(String(badgeIDArray[i]).indexOf(indexInbadgesListMap) != -1 && badgesListMap[indexInbadgesListMap].badgeType === "badge")
										{
											if(String(earnedArray).indexOf(indexInbadgesListMap) != -1)
											{
												buildBadges += '<p class="tagWrappper popup_img" id="'+badgeIDArray[i]+'" onclick="myBadgeDetail(this)"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img height="87px" width="87px" style="max-height:100px;max-width:90px;"  src ="'+badgesListMap[indexInbadgesListMap].badgeLogoPath+'"/><br><br><em class="badgetagName">'+String(badgesListMap[indexInbadgesListMap].badgeName).substring(0,12)+'</em></p>';
												earnedArray.splice(String(earnedArray).indexOf(indexInbadgesListMap),1);
											}
											else if(String(workinOnArray).indexOf(indexInbadgesListMap) != -1)
											{
												buildBadges += '<p class="tagWrappper popup_img" id="'+badgeIDArray[i]+'" onclick="displayBadgeDetail(this,\''+badgesListMap[indexInbadgesListMap].badgeType+'\')" ><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img width="87px" height="87px" style="max-height:100px;max-width:90px;" src ="'+badgesListMap[indexInbadgesListMap].badgeLogoPath+'"/><br><br><em class="badgetagName">'+String(badgesListMap[indexInbadgesListMap].badgeName).substring(0,12)+'</em></p>';
												workinOnArray.splice(String(workinOnArray).indexOf(indexInbadgesListMap),1);
											}
											else
											{
												buildBadges += '<p class="tagWrappper popup_img" id="'+badgeIDArray[i]+'" onclick="displayBadgeDetail(this,\''+badgesListMap[indexInbadgesListMap].badgeType+'\')" ><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img width="87px" height="87px" style="max-height:100px;max-width:90px;" src ="'+badgesListMap[indexInbadgesListMap].badgeLogoPath+'"/><br><br><em class="badgetagName">'+String(badgesListMap[indexInbadgesListMap].badgeName).substring(0,12)+'</em></p>';
											}
										}
									}	
								}
								
								$("#list_of_tags li > label").removeClass("checked_tag_highlight");
								$("#list_of_tags li > label").css("background","none repeat scroll 0 #DDE6ED");
								$("#list_of_tags li  :checkbox").removeAttr("checked");
								
								$("#list_of_tags li").each(function(){
									if($(this).attr("id") == tagId)
									{
										$("#list_of_tags li[id='"+tagId+"'] > label").addClass("checked_tag_highlight");
										$("#list_of_tags li[id='"+tagId+"']  :checkbox").attr("checked","checked");
									}	
								});
								
								if(buildBadges != "")
								{
									$("#badgesLinkedToThisTag").html(buildBadges);
								}
								if($(".tagfilterlist").css("display") == 'none')
								{
									$(".filtertags").show();
									$(".lineseperator").show();
								}	
								
								$('#tagName').html('<span class = "tagShowWrapper">'+tagId+'</span>');
								$('#badge_holder').hide();
								$('#badge_holder,#earn_badge > .points_wrapper').hide();
								$('.badges_tag_holder').fadeIn().css("margin-left",$(".picture_frame").width()+75).css("margin-top",20);
								
							    $(".filtertags").show().css("margin-left",0.199 * ($("#profile_panel").width())).css("margin-top",.16 * ($("#profile_panel").height()));
								$(".lineseperator").show().css("margin-left",0.226 * ($("#profile_panel").width()));
								$(".tagfilterlist").hide().css("margin-left",0.036 * ($("#profile_panel").width()));
							}
							
							$("#persisting_user").hide();
					});
					
					$("#toAddNewTag").live("keyup",function(keypressed){
						
						var tagId 			= $.trim($(this).attr("id"));
						var tagText			= $.trim($(this).val());
						
						if(tagText)
						{
							if(/^[a-zA-Z0-9]+$/.test(tagText))
							{
								$("#toAddNewTag").removeClass("errorboxforinput");
								if(keypressed.which === 32 || keypressed.which === 13)
								{
									toAddNewTagToTheBadge(tagText);
								}
							}
							else
							{
								$("#toAddNewTag").addClass("errorboxforinput");
							}
						}
						else
						{
							$("#toAddNewTag").removeClass("errorboxforinput");
						}
						
					});
					
					$(".tagRating").live("click",function(){
						
						var tagRatingUpdate		= new Array(); 
						var tagRatingId 		= $.trim($(this).attr("id").replace("popularizeTheTag",""));
						var increamentTag		= parseInt($("span#"+tagRatingId).find(".tagLikes").html())+1;
						
						$("span#"+tagRatingId).find(".tagLikes").html(increamentTag);
						
						$.ajax({
							url		: '/increamentTagRatingByOne',
							type 	: 'GET',
							data 	: {idOfTheTag : tagRatingId,badgeIdForEditingTagRating:badgeIdForAddingDeletingTag},
							success : function(data)
										{
											for(badge_Index in badgesListMap)
											{
												if(badgeIdForAddingDeletingTag === badgesListMap[badge_Index].key )
												{
													if(String(badgesListMap[badge_Index].badgeTagsContents).indexOf(",") != -1)
													{
														tagRatingUpdate 							= 	String(badgesListMap[badge_Index].badgeTagsContents).split(",");
													}
													for(var i=0 ; i<tagRatingUpdate.length; i++)
													{
														if(String(tagRatingUpdate[i]).indexOf(tagRatingId+":") != -1)
														{
															tagRatingUpdate[i] 						= tagRatingId+":"+increamentTag;
														}	
													}
													badgesListMap[badge_Index].badgeTagsContents 	= tagRatingUpdate ;
												}	
											}
										}
							
						});
						$(this).hide();
					});
					
					$(".filtertags").live("click",function(){
						
//						$(".lineseperator").hide();
						$("#list_of_tags").html("");
						$("#list_of_tags").append('<li id="all" ><div ><input type="checkbox" id="dropbyall" value="all" /></div><label style="z-index:0;margin:0 0 0 16px;" for="dropbyall"><b>All Tags</b></label></li>');
						var badgeTagHolderStyle = $(".badges_tag_holder").css("display");
						var arrayOfTags				= new Array();
						var allTags					= new Array();
						var tagsDetails				= "";
						
						for(indexInbadgesListMap in badgesListMap)
						{
							if(String(badgesListMap[indexInbadgesListMap].badgeTagsContents) != "" && String(badgesListMap[indexInbadgesListMap].badgeType) === "badge")
							{
								tagsDetails 		+= new String(badgesListMap[indexInbadgesListMap].badgeTagsContents)+",";
							}	
						}
						allTags 					= tagsDetails.split(",");
						allTags.sort();
						for(var i = 0; i < allTags.length ; i++)
						{
							if(String(allTags[i]).indexOf(":") != -1)
							{
								var tagNameFromTagDetails = allTags[i].split(":")[0];
								if(arrayOfTags.length > 0 && String(tagNameFromTagDetails) != "resusgat" && String(tagNameFromTagDetails) != "nimdasgat")
								{
										if(arrayOfTags.indexOf(tagNameFromTagDetails) === -1)
										{
											$("#list_of_tags").append('<li id="'+tagNameFromTagDetails+'"><div><input type="checkbox" id="dropby'+tagNameFromTagDetails+'" value="'+tagNameFromTagDetails+'" /></div><label style="z-index:0;margin:0 0 0 16px;" for="dropby'+tagNameFromTagDetails+'">'+tagNameFromTagDetails+'</label></li>');
											arrayOfTags.push(String(tagNameFromTagDetails));
										}
								}
								else
								{
									$("#list_of_tags").append('<li id="'+tagNameFromTagDetails+'"><div><input type="checkbox" id="dropby'+tagNameFromTagDetails+'" value="'+tagNameFromTagDetails+'" /></div><label style="z-index:0;margin:0 0 0 16px;" for="dropby'+tagNameFromTagDetails+'">'+tagNameFromTagDetails+'</label></li>');
									arrayOfTags.push(String(tagNameFromTagDetails));
								}	
								
							}	
						}
						
						if(String($(".badges_tag_holder").css("display")) != "none")
						{
							var selectedTagsArray			= $(".badges_tag_holder > span[id = 'tagName'] > span[class = 'tagShowWrapper']");
							var listOfTagsInstance			= "";
							var selectedTagsInstance		= "";
							
							
							$("#list_of_tags li > label").removeClass("checked_tag_highlight");
							$("#list_of_tags li > label").css("background","none repeat scroll 0 #DDE6ED");
							$("#list_of_tags li  :checkbox").removeAttr("checked");
							
							if(selectedTagsArray.length == ($("#list_of_tags li").length - 1))
							{
								$("#list_of_tags li[id='all'] > label").addClass("checked_tag_highlight");
								$("#list_of_tags li[id='all']  :checkbox").attr("checked","checked");
							}
							else
							{
								$("#list_of_tags li").each(function(){
									
									listOfTagsInstance			= $(this).attr("id");
									
									$(selectedTagsArray).each(function(){
										
										selectedTagsInstance	= $(this).html();
										
										if(String(listOfTagsInstance) === String(selectedTagsInstance))
										{
											$("#list_of_tags li[id='"+selectedTagsInstance+"'] > label").addClass("checked_tag_highlight");
											$("#list_of_tags li[id='"+selectedTagsInstance+"']  :checkbox").attr("checked","checked");
										}
										
									});
									
								});
							}	
						}
//						$(".badges_tag_holder").css("display",badgeTagHolderStyle).css("margin-left",$(".picture_frame").width()+55).css("margin-top",20);
						$(".badges_tag_holder").css("display",badgeTagHolderStyle);
						$(".filtertags").hide();
						$(".tagfilterlist").fadeIn();
						
					});
					
					$(".hide_filterTags").live("click",function(){
						
						$(".tagfilterlist").fadeOut();
						$(".filtertags").show();
						$(".lineseperator").show();
//						$(".badges_tag_holder").css("margin-left",$(".picture_frame").width()+75).css("margin-top",20);
						
					});
					
					$("#list_of_tags li").live("click",function(){
						
						
						var filterByThisTag 			= $.trim($(this).attr("id").replace("dropby",""));
						if(filterByThisTag)
						{
							var workinOnArrayOfBadges 	= new Array();
							var earnedArrayOfBadges 	= new Array();
							var badgesDisplayed			= new Array();
							var filterTagArray			= new Array();
							var buildBadgesByFilters	= "";
							
							$("#badgesLinkedToThisTag").html("");
							
							for(index in userBadgeLogJdoMap)
							{
								earnedArrayOfBadges.push(new String(userBadgeLogJdoMap[index].badgeId));
								workinOnArrayOfBadges.push(new String(userBadgeLogJdoMap[index].badgesworkingon));
							}
							if(String(filterByThisTag) === "all")
							{
								$("#list_of_tags li :checkbox").each(function(){
									if($(this).attr("id") !== "dropbyall")
									{
										filterTagArray.push($.trim(String($(this).attr("id").replace("dropby",""))));
									}	
									
								});
								
								$("#list_of_tags li > label").removeClass("checked_tag_highlight");
								$("#list_of_tags li > label").css("background","none repeat scroll 0 #DDE6ED");
								$("#list_of_tags li  :checkbox").removeAttr("checked");
								
								$("#list_of_tags li[id='all'] > label").addClass("checked_tag_highlight");
								$("#list_of_tags li[id='all']  :checkbox").attr("checked","checked");
							}
							else
							{
								$("#list_of_tags li[id='all'] > label").removeClass("checked_tag_highlight");
								$("#list_of_tags li[id='all'] > label").css("background","none repeat scroll 0 #DDE6ED");
								$("#list_of_tags li[id='all'] :checkbox").removeAttr("checked");
								
								$("#list_of_tags li :checkbox").each(function(){
									
									var idOfCurrentTagElement = $.trim(String($(this).attr("id").replace("dropby","")));
									if($(this).attr("checked"))
									{
										filterTagArray.push($.trim(String($(this).attr("id").replace("dropby",""))));
										
										$("#list_of_tags li[id='"+idOfCurrentTagElement+"'] > label").addClass("checked_tag_highlight");
										$("#list_of_tags li[id='"+idOfCurrentTagElement+"'] :checkbox").attr("checked","checked");
									}
									else
									{
										$("#list_of_tags li[id='"+idOfCurrentTagElement+"'] > label").removeClass("checked_tag_highlight");
										$("#list_of_tags li[id='"+idOfCurrentTagElement+"'] > label").css("background","none repeat scroll 0 #DDE6ED");
										$("#list_of_tags li[id='"+idOfCurrentTagElement+"'] :checkbox").removeAttr("checked");
									}
									
								});
								
								if(String(filterTagArray) === "")
								{
									$("#list_of_tags li :checkbox").each(function(){
										
										if(String($(this).attr("id").replace("dropby","")) !== "all")
										{
											filterTagArray.push($.trim(String($(this).attr("id").replace("dropby",""))));
										}	
										
									});
									
									$("#list_of_tags li[id='all'] > label").addClass("checked_tag_highlight");
									$("#list_of_tags li[id='all']  :checkbox").attr("checked","checked");
								}
							}
							
							filterTagArray.sort();
							
							
							for(indexInbadgesListMap in badgesListMap)
							{
								
								var badgeStatus	  	= "";
								var statusTitle	    = "";
								
								 for(indexingUserStatus in userstatusdetails)
						    	 {
						    		 if( String(userstatusdetails[indexingUserStatus].stuffid) === String(badgesListMap[indexInbadgesListMap].key ) && String(userstatusdetails[indexingUserStatus].userId) === userKey)
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
								
								var tagsDetails 		= new String(badgesListMap[indexInbadgesListMap].badgeTagsContents);
								for(var i=0;i<filterTagArray.length;i++)
								{
									if(String(tagsDetails).indexOf(filterTagArray[i]) !== -1 && String(badgesListMap[indexInbadgesListMap].badgeType) === "badge")
									{
										if(earnedArrayOfBadges.indexOf(indexInbadgesListMap) != -1)
										{
											buildBadgesByFilters += '<p class="tagWrappper popup_img" id="'+indexInbadgesListMap+'" onclick="myBadgeDetail(this)"><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img height="87px" width="87px"  style="max-height:100px;max-width:90px;"  src ="'+badgesListMap[indexInbadgesListMap].badgeLogoPath+'"/><br><br><em class="badgetagName">'+String(badgesListMap[indexInbadgesListMap].badgeName).substring(0,12)+'</em></p>';
											earnedArrayOfBadges.splice(String(earnedArrayOfBadges).indexOf(indexInbadgesListMap),1);
											badgesDisplayed.push(indexInbadgesListMap);
										}
										else if(workinOnArrayOfBadges.indexOf(indexInbadgesListMap) != -1)
										{
											buildBadgesByFilters += '<p class="tagWrappper popup_img" id="'+indexInbadgesListMap+'" onclick=""displayBadgeDetail(this,\''+badgesListMap[indexInbadgesListMap].badgeType+'\')" ><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img  height="87px" width="87px"  style="max-height:100px;max-width:90px;" src ="'+badgesListMap[indexInbadgesListMap].badgeLogoPath+'"/><br><br><em class="badgetagName">'+String(badgesListMap[indexInbadgesListMap].badgeName).substring(0,12)+'</em></p>';
											workinOnArrayOfBadges.splice(String(workinOnArrayOfBadges).indexOf(indexInbadgesListMap),1);
											badgesDisplayed.push(indexInbadgesListMap);
										}
										else if(badgesDisplayed.indexOf(indexInbadgesListMap) === -1)
										{
											buildBadgesByFilters += '<p class="tagWrappper popup_img" id="'+indexInbadgesListMap+'" onclick="displayBadgeDetail(this,\''+badgesListMap[indexInbadgesListMap].badgeType+'\')" ><span class="'+badgeStatus+'" title="'+statusTitle+'"></span><img height="87px" width="87px" style="max-height:100px;max-width:90px;" src ="'+badgesListMap[indexInbadgesListMap].badgeLogoPath+'"/><br><br><em class="badgetagName">'+String(badgesListMap[indexInbadgesListMap].badgeName).substring(0,12)+'</em></p>';
											badgesDisplayed.push(indexInbadgesListMap);
										}
									}
								}	
							}
							
							if(buildBadgesByFilters != "")
							{
								$("#badgesLinkedToThisTag").html(buildBadgesByFilters);
							}
							
							$('#tagName').html("");
							var tagMaker = "";
							for(i=0;i<filterTagArray.length;i++)
							{
								tagMaker			+= '<span class = "tagShowWrapper">'+filterTagArray[i]+'</span>';
							}
							
							
							$('#tagName').html(tagMaker);
							$('#badge_holder,#earn_badge > .points_wrapper,.badges_list').hide();
							$('.badges_tag_holder').fadeIn().css("margin-left",$(".picture_frame").width()+75).css("margin-top",20);
//							$('.badges_tag_holder').fadeIn();
							
						}	
						
						
					});
					
					$("#toAddNewTag").live("blur",function(){
						
						if($.trim($(this).val()) === "")
						{
							$(this).hide();
							$("#adminAddNewTag").show();
						}
					});
					
					
	});
	
	function toAddNewTagToTheBadge(getValueFromTagInputBox)
	{
		var updateTagArrayAfterAddinNewTag		= new Array();
		if(String(adminTag).indexOf(getValueFromTagInputBox+":") === -1 && String(userTag).indexOf(getValueFromTagInputBox+":") === -1 )
		{
			$.ajax({
				url		: '/addTagForBadge',
				type 	: 'POST',
				data 	: {idOfTheTag : getValueFromTagInputBox,badgeIdForAddingTag:badgeIdForAddingDeletingTag},
				success : function(data){}
			});
			if(userType.indexOf("Admin") != -1 || userType.indexOf("Company") != -1)
			{
				$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+getValueFromTagInputBox+'"><span class="tagRating" id="'+ getValueFromTagInputBox+'popularizeTheTag">+1</span><span class="'+getValueFromTagInputBox+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">0</span><span id="'+getValueFromTagInputBox+'" class="tagSeperator" title="Click Me">'+getValueFromTagInputBox+'</span> <span id="'+getValueFromTagInputBox+'tagdelete" class="tag-delete" title="Delete Me"></span></span></span>');
				adminTag.push(getValueFromTagInputBox+":"+0);
			}
			else if(userType.indexOf("user") != -1  )
			{
				$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+getValueFromTagInputBox+'"><span class="tagRating" id="'+ getValueFromTagInputBox+'popularizeTheTag">+1</span><span class="'+getValueFromTagInputBox+'tagSelector tagSelector"><span title="Popularize Me" class="tagLikes">0</span><span id="'+getValueFromTagInputBox+'" class="tagSeperator" title="Click Me">'+getValueFromTagInputBox+'</span> <span class="tag-delete"></span></span></span>');
				userTag.push(getValueFromTagInputBox+":"+0);
			}
			
			$(".tagLikes").tipTip();
			$("#toAddNewTag").val("");
			$("#list_of_tags").append('<li id="'+getValueFromTagInputBox+'" ><div ><input type="checkbox" id="dropby'+getValueFromTagInputBox+'" value="'+getValueFromTagInputBox+'" /></div><label for="dropby'+getValueFromTagInputBox+'">'+getValueFromTagInputBox+'</label></li>');
			
			var mylist = $('#list_of_tags');
			var listitems = mylist.children('li').get();
			listitems.sort(function(a, b) {
			   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
			   
			});
			$.each(listitems, function(index, item) { mylist.append(item); });
		}
		else
		{
			$("."+getValueFromTagInputBox+"tagSelector").fadeOut('fast').queue(function(next){
				
					$("."+getValueFromTagInputBox+"tagSelector").fadeIn("fast");
					next();
					
			});
			
			$("#toAddNewTag").val("");
			$("#toAddNewTag").hide();
		}
		
		
		for(badge_Index in badgesListMap)
		{
			if(badgeIdForAddingDeletingTag === badgesListMap[badge_Index].key )
			{
				if(String(adminTag) != "")
				{
					updateTagArrayAfterAddinNewTag.push(String(adminTag));
					updateTagArrayAfterAddinNewTag.push(String("nimdasgat"));
				}	
				
				if(String(userTag) != "")
				{
					updateTagArrayAfterAddinNewTag.push(String(userTag));
					updateTagArrayAfterAddinNewTag.push(String("resusgat"));
				}
				
				badgesListMap[badge_Index].badgeTagsContents 	= updateTagArrayAfterAddinNewTag;
			}
		}	
		
		$("#toAddNewTag").removeClass("errorboxforinput");
	}
	
