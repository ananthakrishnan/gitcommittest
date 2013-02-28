	
var getValueFromTagInputBox 	= "";
var arrayofTagsCreatedByAdmin 	= new Array();
var arrayofTagsCreatedByUser 	= new Array();
var tagsOfAllTheBadges			= new Array();

	$(document).ready(function(){
		
		
			$(".add_stuff_popup").hover(
				function(){
					$("#adminAddNewTag").show();
				},
				function(){
					$("#adminAddNewTag").hide();
					if($("#toAddNewTag").css("display") != 'none')
					{
						var getValueFromTagInputBox = $.trim($("#toAddNewTag").val());
						
						if(getValueFromTagInputBox)
						{
							if(/^[a-zA-Z0-9]+$/.test(getValueFromTagInputBox))
							{
								creatingAdminTagArray(getValueFromTagInputBox);
							}
							else
							{
								$("#toAddNewTag").addClass("errorboxforinput");
							}
						}
						else
						{
							$("#toAddNewTag").val("");
							$("#toAddNewTag").hide();
						}
					}
			});
			
			$(".add_stuff_popup").live("click",function(){
				
				if( $("#toAddNewTag").css("display") != 'none')
				{
					var getValueFromTagInputBox = $.trim($("#toAddNewTag").val());
					
					if(getValueFromTagInputBox)
					{
						if(/^[a-zA-Z0-9]+$/.test(getValueFromTagInputBox))
						{
							creatingAdminTagArray(getValueFromTagInputBox);
						}
						else
						{
							$("#toAddNewTag").addClass("errorboxforinput");
						}
					}
					else if($("#toAddNewTag").val())
					{
						$("#toAddNewTag").val("");
						$("#toAddNewTag").hide();
					}
				}
				
			});
			
			$("#toAddNewTag").live("keyup",function(keypressed){
				
				var tagId 						= $.trim($(this).attr("id"));
				var getValueFromTagInputBox		= $.trim($(this).val());
				
				if(getValueFromTagInputBox)
				{
					if(/^[a-zA-Z0-9]+$/.test(getValueFromTagInputBox))
					{
						$("#toAddNewTag").removeClass("errorboxforinput");
						if(keypressed.which === 32 || keypressed.which === 13)
						{
							creatingAdminTagArray(getValueFromTagInputBox);
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
			
			$("#adminAddNewTag").live("click",function(){
				
				$("#adminAddNewTag").hide();
				$("#toAddNewTag").css("display","block");
				$("#toAddNewTag").show().focus();
				
			});
			
			$(".tag-delete").live("click",function(){
				
				var tagId 						= $(this).attr("id").toString().replace("tagdelete","");
				
				for(var i = 0;i<arrayofTagsCreatedByAdmin.length;i++)
				{
					if(arrayofTagsCreatedByAdmin[i].indexOf(String(tagId)) != -1)
					{
						arrayofTagsCreatedByAdmin.splice(arrayofTagsCreatedByAdmin.indexOf(arrayofTagsCreatedByAdmin[i]),1);
					}	
				}	
				
				for(var i = 0;i<arrayofTagsCreatedByUser.length;i++)
				{
					if(arrayofTagsCreatedByUser[i].indexOf(String(tagId)) != -1)
					{
						arrayofTagsCreatedByUser.splice(arrayofTagsCreatedByUser.indexOf(arrayofTagsCreatedByUser[i]),1);
					}	
				}
				
				$("."+tagId+"tagSelector").remove();
				
			});
			
			$("#toAddNewTag").live("blur",function(){
				if($.trim($(this).val()) === "")
				{
					$(this).hide();
					$("#adminAddNewTag").show();
				}
			});
			
			$(".earnBadgeUL li").tipTip({defaultPosition : "bottom"});
			$(".earnBadgeUL li").find("li").tipTip({defaultPosition : "bottom"});
	
	});
	
	function creatingAdminTagArray(getValueFromTagInputBox)
	{
		if(arrayofTagsCreatedByAdmin.indexOf(getValueFromTagInputBox) === -1)
		{
			arrayofTagsCreatedByAdmin.push(getValueFromTagInputBox);
			$("#allTagsCreated").append('<span class="tagLegsWrapper" id="'+getValueFromTagInputBox+'"><span class="'+getValueFromTagInputBox+'tagSelector tagSelector"><span id="'+getValueFromTagInputBox+'" class="tagSeperator">'+getValueFromTagInputBox+'</span> <span id="'+getValueFromTagInputBox+'tagdelete" class="tag-delete"></span></span></span>');
			$("#toAddNewTag").val("");
			$("#toAddNewTag").hide();
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
	}
