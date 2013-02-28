var condition_UserSeeked			= false;
var currentTime						= 0;
var seekedTime						= 0;
var elapsedTime						= 0;
var startingTime					= 0;
var previousStatus					= "";
var thisUserStatuskey				= "";
var loadedVideoKey					= "";


function onYouTubePlayerReady(playerId)
{
	var ytplayer					= document.getElementById("ytplayer");
	
	ytplayer.addEventListener('onStateChange','eventListener_'+playerId);
}


function storingVideoStatus(action)
{
	// When the video ends and if the player is not sought, then the person watched the video completely.
	// Else, we are taking the time up to which they have continuously watched
	
	var ytplayer					= document.getElementById("ytplayer");
	
	ytplayer.stopVideo();
	
	if(String(action) === "end")
	{
		if(!condition_UserSeeked)
		{
			elapsedTime								= "completed";
		}
		else if(String(elapsedTime) != "completed")
		{
			if(seekedTime <= startingTime)
			{
				elapsedTime							= "completed";	
			}
			else
			{
				elapsedTime							= startingTime;
			}	
		}
	}
	else if(String(action) === "click")
	{
		if(String(elapsedTime) === "completed" || String(previousStatus) === "completed")
		{
			elapsedTime								= "watched";
		}
		else
		{
			console.log(condition_UserSeeked+" "+startingTime+" "+String(previousStatus))
			
			if(!condition_UserSeeked)
			{
				if(parseInt(previousStatus) < ytplayer.getCurrentTime() || String(previousStatus) === "not started" )
				{
					elapsedTime						= ytplayer.getCurrentTime();
				}
				else
				{
					elapsedTime						= "watched";
				}	
			}
			else if(startingTime > parseInt(previousStatus) || String(previousStatus) === "not started")
			{
				if(seekedTime <= startingTime)
				{
					elapsedTime							= ytplayer.getCurrentTime();	
				}
				else
				{
					elapsedTime							= startingTime;
				}	
			}
		}	
		
		$('#video_popup').html("");
		$("#video_popup_holder").removeAttr("style");
	}	
	
	
	
	console.log("elapsedTime :: "+elapsedTime)
	
	
	if(String(elapsedTime) === "completed")
	{
		$($("#"+loadedVideoKey).parents()[2]).find(".ex-num").removeClass("pending-num").addClass("complete-num").html('<i class="icon-ok"></i>');
	}
	else
	{
		$($("#"+loadedVideoKey).parents()[2]).find(".ex-num").removeClass("complete-num").addClass("pending-num").html('&bull;&bull;&bull;');
	}
	
	if((String(previousStatus) === "completed" || String(previousStatus) === "not started" ||  elapsedTime > parseInt(previousStatus)) && String(elapsedTime) != "watched")
	{
		var videoArray		= String(userstatusdetails[thisUserStatuskey].videostatus).split(",");
		var newVideoArray	= new Array();
		
		if(videoArray.length > 0)
			for(var i=0;i<videoArray.length;i++)
				{
					if(String($.trim(videoArray[i])).indexOf(String($.trim(loadedVideoKey))) != -1)
					{
						newVideoArray.push($.trim(loadedVideoKey)+":"+elapsedTime);	
					}
					else
					{
						newVideoArray.push(videoArray[i]);
					}	
				}	
		
		userstatusdetails[thisUserStatuskey].videostatus		= newVideoArray;
		
		$.ajax({
			type		: 	'POST', 
			url			: 	'/storevideopercentage' ,
			data		:	"userDetailsKey="+thisUserStatuskey+"&status="+elapsedTime+"&videokey="+loadedVideoKey, 
			success		: 	function(data)
							{ 
			 					console.log("Saved your status")
							}
		});
		
		
	}	
	
	
	//Resetting the values
	
	condition_UserSeeked			= false;
	startingTime					= 0
	currentTime						= 0;
	seekedTime						= 0;
	elapsedTime						= 0;
	
}


//Change Profile Image

$(document).ready(function(){
	
	$("#google_profile_image").on("click",function(){
		
		console.log("in");
		
		$('.user-photo,#uploaded_image').attr("src", "http://placehold.it/50x50&text=Hello world");

		if(String(userProfileMap[userKey].profilePicture).indexOf("googleusercontent.com") === -1)
		{
			$.ajax({
				url			: 	'/revertToGoogleImage',
				type		: 	"POST",
				success		: 	function(data)
								{
									$('.user-photo').attr("src", oauthImage);
								}
		  });
		}
		
	});
	
	$("#user_profile_image").on("click",function(){
		
		$("#image_chooser").trigger("click");
		
	});
	
	//Change Profile Name

	$("#google_name").on("click",function(){
		
		if(String(singleUserProfile[userKey].firstName) != String(userFirstName) || String(singleUserProfile[userKey].lastName) != String(userLastName))
		{
			singleUserProfile[userKey].firstName			= userFirstName;
			singleUserProfile[userKey].lastName				= userLastName;
			
			$("#user_name").html(userFirstName+" "+userLastName);
			$("#user_given_name").val("");
			
			
			$.ajax({
				url				: "/revertBackToOauthName",
				type			: "POST",
				success			: function(data)
									{
										console.log("Saved")
									}
				});
		}	
		
	});

	$("#user_given_name").on("blur",function(){
		
		if(String($.trim($(this).val())) != "")
		{
			var userFullName			= String($.trim($(this).val()));
			var userFirstNameHere		= "";
			var userLastNameHere		= "";
			
			if(String(userFullName).indexOf(" ") != -1)
			{
				userFirstNameHere		= userFullName.split(" ")[0];
				userLastNameHere		= userFullName.split(" ")[1]
			}	
			else
			{
				userFirstNameHere		= userFullName;
			}
			
			singleUserProfile[userKey].firstName			= userFirstNameHere;
			singleUserProfile[userKey].lastName				= userLastNameHere;
			
			$("#user_name").html(userFullName);
			
			if( userFirstNameHere === userFirstName && userLastNameHere === userLastName )
			{
				
			}
			else  if(userFirstNameHere === userFirstName && userLastNameHere === userLastName)
			{
				$("#original_name").attr("checked","checked");
				$("#modified_name").removeAttr("checked");
				
				$("#user_given_name").val("");
				
				$.ajax({
		 				url				: "/revertBackToOauthName",
		 				type			: "POST",
		 				success			: function(data)
			 								{
			 								}
		 				});
			}
			else if( (userFirstNameHere && userLastNameHere) || userFirstNameHere )
			{
				$("#modified_name").attr("checked","checked");
				$("#original_name").removeAttr("checked");
				
				$("#user_given_name").val(singleUserProfile[userKey].firstName+" "+singleUserProfile[userKey].lastName);
				
		 		$.ajax({
		 				url				: "/updateUserName",
		 				type			: "POST",
		 				data			: {userFirstName:userFirstNameHere,userLastName:userLastNameHere},
		 				success			: function(data)
		 									{
		 										
		 									}
		 				});
			}
			else 
			{
				 
			}
		}
	});
	
	
});


//var jcrop_api={destroy:function(){}},boundx, boundy,x1=0,x2=0,y1=0,y2=0;
//var height=0,width=0;
//var croppedWidth=0,croppedHeight=0;
//var pictureElement;
//
//function displaySelectedImage(input)
//{
//	jcrop_api.destroy();
//	$('.jcrop-tracker').remove();
//	
//	pictureElement			= input;
//
//	if (input.files && input.files[0]) 
//	{
//        var reader 			= new FileReader();
//        reader.onload 		= function (e)  {
//        										$('#beingCroppedPicture').attr('src', e.target.result);
//        										
//												$('#beingCroppedPicture').load(function(){
//												        		
//												        		width			= $("#beingCroppedPicture").width();
//												          		height			= $("#beingCroppedPicture").height();
//												          		
//												          		if(width > height)
//												          		{
//												          			$("#beingCroppedPicture").removeAttr("style").attr({'height':"300px",'width':"450px"});
//												          			croppingIntializer(300,450);
//												          			croppedWidth	= 450;
//												          			croppedHeight	= 300;
//												          		}
//												          		else if(width < height)
//												          		{
//												          			$("#beingCroppedPicture").removeAttr("style").attr({'height':"450px",'width':"300px"});
//												          			croppingIntializer(450,300);
//												          			croppedWidth	= 300;
//												          			croppedHeight	= 450;
//												          		}	
//												          		else if(width === height)
//												          		{
//												          			$("#beingCroppedPicture").removeAttr("style").attr({'height':"300px",'width':"300px"});
//												          			croppingIntializer(300,300);
//												          			croppedWidth	= 300;
//												          			croppedHeight	= 300;
//												          		}	
////												          		$('#beingCroppedPicture').hide();
//          		
//												});
//        									}
//    }
//    reader.readAsDataURL(input.files[0]);
//    $("#imageCropperHolder").bPopup().show();
//    
//}
//
//function croppingIntializer(jcropHeight,jcropWidth)
//{
//		var left					= (jcropWidth/2)-70;
//		var right					= (jcropWidth/2)+70;
//		var top						= (jcropHeight/2)-70;
//		var bottom					= (jcropHeight/2)+70;
//		
//	 $('#beingCroppedPicture').Jcrop({
//     	onSelect	: getCoordinates,
//     	onChange	: getCoordinates,
//     	bgColor		: 'black',
//        bgOpacity	: .4,
//        minSize		: [ 140, 140 ],
//        setSelect	: [ left,top,right,bottom ],
//        aspectRatio : 1/1
//     },
//     function()
//     {
//         var bounds 	= this.getBounds();
//         boundx 		= bounds[0];
//         boundy 		= bounds[1];
//         jcrop_api 	= this;
//     });
//	 
//}
//
//function getCoordinates(coordinates)
//{
//	if (parseInt(coordinates.w) > 0)
//    {
//      	x1=coordinates.x;
//    	y1=coordinates.y;
//    	x2=coordinates.x2;
//    	y2=coordinates.y2;
//    }
//}
//
//function  closeEditPicturePopup()
//{
//
//}

function displaySelectedImage(input)
{
	$.ajaxFileUpload({
						url:uploadSessionURL,
						secureuri:false,
						fileElementId:input.id,
						success: function (text, status)
						{
					 		$.ajax({  
				   			    	type: 'POST', 
				   			    	url: '/getCroppedImageUrl',
				   			    	async: true, 
				   			    	success: function( data )
				   			    	{
				   			    		$('.user-photo,#uploaded_image').attr("src", data.toString().split(",")[0]);
				   			    		
				   			    		userProfileMap[userKey].profilePicture		= data.toString().split(",")[0];
				   			    		uploadSessionURL							= data.toString().split(",")[1];
									}
				   			     });
						}
	
					});
}


