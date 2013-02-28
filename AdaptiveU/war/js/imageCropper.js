
var jcrop_api={destroy:function(){}},boundx, boundy,x1=0,x2=0,y1=0,y2=0;
var height=0,width=0;
var croppedWidth=0,croppedHeight=0;
var pictureElement;

function displaySelectedImage(input)
{
	jcrop_api.destroy();
	$('.jcrop-tracker').remove();
	
	pictureElement			= input;

	if (input.files && input.files[0]) 
	{
		$("#saveCroppedPicture").attr("disabled",false).removeClass("gry_btn").addClass("grn_btn");
		
		
        var reader 			= new FileReader();
        reader.onload 		= function (e) {
        	
        	$("#backgroundPopup").show();
        	$("#editPictureHolder").fadeIn();
            $('#beingCroppedPicture').attr('src', e.target.result);
            $('#saveCroppedPicture').show();
        	$('#cancelOption').show();
        	$('#selectNewPicture').show();
        	
        	$('#beingCroppedPicture').load(function(){
        		
        		width			= $("#beingCroppedPicture").width();
          		height			= $("#beingCroppedPicture").height();
          		
          		
          		
          		if(width > height)
          		{
          			$("#beingCroppedPicture").removeAttr("style").attr({'height':"300px",'width':"450px"});
          			croppingIntializer(300,450);
          			croppedWidth	= 450;
          			croppedHeight	= 300;
          		}
          		else if(width < height)
          		{
          			$("#beingCroppedPicture").removeAttr("style").attr({'height':"450px",'width':"300px"});
          			croppingIntializer(450,300);
          			croppedWidth	= 300;
          			croppedHeight	= 450;
          		}	
          		else if(width === height)
          		{
          			$("#beingCroppedPicture").removeAttr("style").attr({'height':"300px",'width':"300px"});
          			croppingIntializer(300,300);
          			croppedWidth	= 300;
          			croppedHeight	= 300;
          		}	
          		$('#beingCroppedPicture').hide();
          		
        	});
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function croppingIntializer(jcropHeight,jcropWidth)
{
		var left					= (jcropWidth/2)-70;
		var right					= (jcropWidth/2)+70;
		var top						= (jcropHeight/2)-70;
		var bottom					= (jcropHeight/2)+70;
		
	 $('#beingCroppedPicture').Jcrop({
     	onSelect	: getCoordinates,
     	onChange	: getCoordinates,
     	bgColor		: 'black',
        bgOpacity	: .4,
        minSize		: [ 140, 140 ],
        setSelect	: [ left,top,right,bottom ],
        aspectRatio : 1/1
     },
     function()
     {
         var bounds 	= this.getBounds();
         boundx 		= bounds[0];
         boundy 		= bounds[1];
         jcrop_api 	= this;
     });
	 
}

function getCoordinates(coordinates)
{
	if (parseInt(coordinates.w) > 0)
    {
      	x1=coordinates.x;
    	y1=coordinates.y;
    	x2=coordinates.x2;
    	y2=coordinates.y2;
    }
}

function  closeEditPicturePopup()
{
	$("#backgroundPopup").fadeOut();
	$("#editPictureHolder").hide();
	$('.jcrop-tracker').remove();
	jcrop_api.destroy();
	$('#beingCroppedPicture').attr('src',"").removeAttr("style").removeAttr("width").removeAttr("height").hide();
	$('#saveCroppedPicture').hide();
	$('#cancelOption').hide();
	$('#selectPicture').hide();
	$('#selectNewPicture').hide();
	$("#updatePictureCheck").attr("checked","checked");
}



$(document).ready(function(){
	

	$("#selectNewPicture , #selectPicture").live("click",function(){
		$('#beingCroppedPicture').attr('src',"").removeAttr("style").removeAttr("width").removeAttr("height").hide();
		$("#choosePicture").trigger('click');
	});
	
	$("#updatePictureCheck").live("change",function(){
		
		if($("#updatePictureCheck").attr("checked"))
		{
			if(String(profilePicture).indexOf("googleusercontent.com") === -1)
			{
				$.ajax({
					url			: '/revertToGoogleImage',
					type		: "POST",
					success		: function(data)
					{
						$('#profileImage').attr("src", googlePicture.toString().replace("/photo.jpg","/s140-c/photo.jpg"));
						document.getElementById("statusMessage").innerHTML = "Saved Changes...";
						$("#voice-box").fadeIn();
						$("#voice-box").fadeOut(2250);
					}
			  });
			}	
			$('#selectPicture').hide();
	   }
	   else
	   {
		   $("#selectPicture").show();
	   }

	});

	
	$("#updateFullName").live("click",function(){
		
		var userFirstNameHere 		= $.trim($("#firstName").val());
		var userLastNameHere		= $.trim($("#lastName").val());
		var userFullName			= userFirstNameHere+" "+userLastNameHere;
		if( userFirstNameHere === userFirstName && userLastNameHere === userLastName )
		{
			document.getElementById("statusMessage").innerHTML = "No Changes In Name...";
			$("#voice-box").fadeIn();
			$("#voice-box").fadeOut(2250);
			if(userFirstNameHere === oauthFirstName && userLastNameHere === oauthLastName)
			{
				$("#updateUserName").hide();
				$("#updateNameCheck").attr("checked","checked");
			}	
		}
		else  if(userFirstNameHere === oauthFirstName && userLastNameHere === oauthLastName)
		{
			$.ajax({
	 				url				: "/revertBackToOauthName",
	 				type			: "POST",
	 				success			: function(data)
		 								{
		 									var userFullName 	= oauthFirstName+" "+oauthLastName;
		 									userFirstName 		= oauthFirstName;
											userLastName 		= oauthLastName;
											
		 									$("#updateUserName").hide();
											$(".welcome_username").html( "Welcome, " + userFullName );
											$('.user_person_name').html( userFullName );  
											$('.user_person_name_badges').html(oauthFirstName+"'s Badges");  
											$('.user_person_name_trophies').html(oauthFirstName+"'s Trophies");  
											$('.user_person_name_stuffs').html(oauthFirstName+"'s Stuff");
											$("#updateNameCheck").attr("checked","checked");
											
											document.getElementById("statusMessage").innerHTML = "Saved Changes...";
											$("#voice-box").fadeIn();
											$("#voice-box").fadeOut(2250);
		 								}
	 				});
		}
		else if( (userFirstNameHere && userLastNameHere) || userFirstNameHere )
		{
	 		$.ajax({
	 				url				: "/updateUserName",
	 				type			: "POST",
	 				data			: {userFirstName:userFirstNameHere,userLastName:userLastNameHere},
	 				success			: function(data)
	 									{
	 										userFirstName 		= userFirstNameHere;
	 										userLastName 		= userLastNameHere;
	 										
	 										$("#updateNameCheck").removeAttr("checked");
											$(".welcome_username").html( "Welcome, " + userFullName );
											$('.user_person_name').html( userFullName );  
											$('.user_person_name_badges').html(userFirstNameHere+"'s Badges");  
											$('.user_person_name_trophies').html(userFirstNameHere+"'s Trophies");  
											$('.user_person_name_stuffs').html(userFirstNameHere+"'s Stuff");
											 
											 
											document.getElementById("statusMessage").innerHTML = "Saved Changes...";
											$("#voice-box").fadeIn();
											$("#voice-box").fadeOut(2250);
											$('#updateUserName').hide();
	 									}
	 				});
			}
			else 
			{
				document.getElementById("statusMessage").innerHTML = "Name Fields Cannot be Empty...";
				$("#voice-box").fadeIn();
				$("#voice-box").fadeOut(2250);
			}
		

	
	});
	
	$("#updateNameCheck").live("change",function(){
		
		if($("#updateNameCheck").attr("checked"))
		{
			if(userFirstName === oauthFirstName && userLastName === oauthLastName)
			{
				$("#updateUserName").hide();
				$("#updateNameCheck").attr("checked","checked");
			}
			else
			{
				$.ajax({
	 				url				: "/revertBackToOauthName",
	 				type			: "POST",
	 				success			: function(data)
	 									{
	 										 var userFullName 	= oauthFirstName+" "+oauthLastName;
	 										 userFirstName 		= oauthFirstName;
											 userLastName 		= oauthLastName;
											 
	 										 $("#updateUserName").hide();
											 $(".welcome_username").html( "Welcome, " + userFullName );
											 $('.user_person_name').html( userFullName );  
											 $('.user_person_name_badges').html(oauthFirstName+"'s Badges");  
											 $('.user_person_name_trophies').html(oauthFirstName+"'s Trophies");  
											 $('.user_person_name_stuffs').html(oauthFirstName+"'s Stuff");
											 
											 
											 document.getElementById("statusMessage").innerHTML = "Saved Changes...";
											 $("#voice-box").fadeIn();
											 $("#voice-box").fadeOut(2250);
	 									}
	 				});
			}	
		}
		else
		{
			$("#updateUserName").show();
			$("#firstName").val(userFirstName);
			$("#lastName").val(userLastName);
		}
 
	});

});
