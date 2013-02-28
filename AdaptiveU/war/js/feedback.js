function showFeedbackWin()
{
	$('#submit_btn2').removeAttr("disabled");
	$('#backgroundPopup').show();
	$('.feedback_header').show();
	$('.feedback_content').show();
	$('.feedback_nav').show();		
	$('.feedback_thank').hide();
	$('.feedback_holder').show();
    //$('#backgroundPopup').show();
	$('#feedback_popup_window').fadeIn();
	$('#new_appointment_window').hide();
	$('#feedback_report').val('');
	$('#c_count').html('500');
	$('#user_email_name').html("");
	$('#setmore_feedbacknew').find('input[name="user_email"]').val(userEmail);
	$('#user_email_label').html("");
	$('#setmore_feedbacknew').find('input[name="user_name"]').val(userFirstName);
	$('#feedback_popup_window .report').trigger('click');
	
	var card_desc= "Browser: "+BrowserDetect.browser+", Version: "+BrowserDetect.version+", Operating system: "+BrowserDetect.OS + ", Requested from the URL: "+requestURL;
	if($.browser)
		   card_desc+="\n"+JSON.stringify($.browser).substring(1,((JSON.stringify($.browser)).length-1));
	card_desc+="\nSubmitted from : "+userEmail;
	console.log(card_desc);
	$('#setmore_feedbacknew').find('textarea[name="card_desc"]').val(card_desc);
	
	$('#setmore_feedbacknew').find('input[name="anonymous"]').val("");
	if((window.location.host.indexOf("localhost:"))!=-1)
		$('#setmore_feedbacknew').find('input[name="loopKey"]').val("agtzfmxvb3BhYmFja3IMCxIETG9vcBjzvyQM");//localkey
	else
		$('#setmore_feedbacknew').find('input[name="loopKey"]').val("agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M");//live key 
	$('#setmore_feedbacknew').find('input[name="user_avatar"]').val("");
	$('#setmore_feedbacknew').find('input[name="user_tag"]').val("");
}

$().ready(function() {	
// Feedback & Support Popup		
	
	$('.feedback_btn').click(function() 
	{
		$('#submit_btn2').removeAttr("disabled");
		$('#backgroundPopup').show();
		$('#feedback_popup_window').fadeIn();
		$('.feedback_thank').hide();
		$('#new_appointment_window').hide();		
	});
	
	$('#feedback_popup_window .problem').click(function() 
	{
		$(this).addClass('active');
		$(this).find('code').addClass('active');
		$('#feedback_popup_window .sugges').removeClass('active');
		$('#feedback_popup_window .sugges').find('code').removeClass('active');
		$('#feedback_popup_window .ask_ques').removeClass('active');
		$('#feedback_popup_window .ask_ques').find('code').removeClass('active');
		$('#card_title').attr('placeholder','Please describe your problem...');
		$('#feedback_popup_window  input[type="submit"]').val('Submit Problem');
		$('#setmore_feedbacknew > label').html('')
		$('.feedback_content > .report_problem > div > h3').html('Sorry for the trouble!');
		$('#setmore_feedbacknew').find('input[name="tag"]').val('problem');
		
		
	});
	
	$('#feedback_popup_window .sugges').click(function() 
		{
		$('#feedback_popup_window .problem').removeClass('active');
		$('#feedback_popup_window .problem').find('code').removeClass('active');
		$(this).addClass('active');
		$(this).find('code').addClass('active');
		$('#feedback_popup_window .ask_ques').removeClass('active');
		$('#feedback_popup_window .ask_ques').find('code').removeClass('active');	
		$('#card_title').attr('placeholder','Please enter your suggestion...');
		$('#feedback_popup_window  input[type="submit"]').val('Send Suggestion');
		$('#setmore_feedbacknew > label').html('')
		//$('.feedback_content > .report_problem > div > h3').html('My suggestion for SetMore is:');
		$('#setmore_feedbacknew').find('input[name="tag"]').val('suggestion');
	});
	
	$('#feedback_popup_window .ask_ques').click(function() 
		{
		$('#feedback_popup_window .problem').removeClass('active');
		$('#feedback_popup_window .problem').find('code').removeClass('active');
		$('#feedback_popup_window .sugges').removeClass('active');
		$('#feedback_popup_window .sugges').find('code').removeClass('active');	
		$(this).addClass('active');
		$(this).find('code').addClass('active');	
		$('#card_title').attr('placeholder','Ask your question here...');
		$('#feedback_popup_window  input[type="submit"]').val('Send Question');
		$('#setmore_feedbacknew > label').html('We\'ll email you with our best answer :)');
		$('.feedback_content > .report_problem > div > h3').html('Question? We can help!');
		$('#setmore_feedbacknew').find('input[name="tag"]').val('question');
	});
	
	//Submit button
	$('#feedback_popup_window  input[type="submit"]').click(function() 
	{
		$('#feedback_popup_window  input[type="submit"]').attr('disabled','disabled');
		console.log("After disabling");
		document.getElementById("statusMessage").innerHTML = "Please wait";
		document.getElementById("voice-box").setAttribute("status", "saved");
		$("#voice-box").fadeIn(300);
		setTimeout("hideStatusMessage()", 1750);
		var formdata=$('#setmore_feedbacknew').serializeArray();
		console.log("Calling ajax call!!");
		if($('#card_title').val() != "")
			{
			$.ajax({
			  url: "/feedbacksender.do",
			  type: "POST",
              data: formdata,	
              context: document.body,
			  success: function(data){ 
				  	console.log(data);
					$('#backgroundPopup').show();
					$('.feedback_content').hide();
					$('.feedback_nav').hide();		
			   		$('.feedback_thank').show();	
			  },
			  error: function(jqXHR, textStatus, errorThrown) {
//				  $('#feedback_popup_window  input[type="submit"]').trigger('click');
				  	document.getElementById("statusMessage").innerHTML = "Feedback sending failed!";
					document.getElementById("voice-box").setAttribute("status", "saved");
					$("#voice-box").fadeIn(300);
					setTimeout("hideStatusMessage()", 1750);
				  
			  }
			}); 

			}
		else
			{
				document.getElementById("statusMessage").innerHTML = "Please provide your valuable feedback!";
				document.getElementById("voice-box").setAttribute("status", "saved");
				$("#voice-box").fadeIn(300);
				setTimeout("hideStatusMessage()", 1750);
			}
   		return false;
	});
	
	//Popup window close
	$('#feedback_popup_window .popup_close').click(function() 
			{
		$('#feedback_popup_window').fadeOut();
		$('#backgroundPopup').hide();		
	});
	
	$('#feedback_report').bind('keydown keyup click keypress paste change',function(){
		var b=$('#feedback_report').val(),len=0;
/*		while(b.indexOf("\n")!=-1){
			b=b.replace("\n","");
			console.log(b);
			len++;
		}*/
		$('#c_count').html(500-($('#feedback_report').val().length));
	});
	
	// Text area focus
	$('#feedback_popup_window textarea').focus(function() 
			{
		  if( this.value == this.defaultValue ) {
		   this.value = "";
		  }
		  }).blur(function() {
		   if( !this.value.length ) {
			this.value = this.defaultValue;
		   }
	  }); 
	

});	

$('#looptodo_close_btn').live("click",function()
		{
			$('#feedback_popup_window').hide();
			$('#backgroundPopup').hide();
		});


//Browser detection class by Vasu....

var BrowserDetect = {
		init: function () {
			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
			this.version = this.searchVersion(navigator.userAgent)
				|| this.searchVersion(navigator.appVersion)
				|| "an unknown version";
			this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function (data) {
			for (var i=0;i<data.length;i++)	{
				var dataString = data[i].string;
				var dataProp = data[i].prop;
				this.versionSearchString = data[i].versionSearch || data[i].identity;
				if (dataString) {
					if (dataString.indexOf(data[i].subString) != -1)
						return data[i].identity;
				}
				else if (dataProp)
					return data[i].identity;
			}
		},
		searchVersion: function (dataString) {
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
		dataBrowser: [
			{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{ 	string: navigator.userAgent,
				subString: "OmniWeb",
				versionSearch: "OmniWeb/",
				identity: "OmniWeb"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera",
				versionSearch: "Version"
			},
			{
				string: navigator.vendor,
				subString: "iCab",
				identity: "iCab"
			},
			{
				string: navigator.vendor,
				subString: "KDE",
				identity: "Konqueror"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.vendor,
				subString: "Camino",
				identity: "Camino"
			},
			{		// for newer Netscapes (6+)
				string: navigator.userAgent,
				subString: "Netscape",
				identity: "Netscape"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			},
			{
				string: navigator.userAgent,
				subString: "Gecko",
				identity: "Mozilla",
				versionSearch: "rv"
			},
			{ 		// for older Netscapes (4-)
				string: navigator.userAgent,
				subString: "Mozilla",
				identity: "Netscape",
				versionSearch: "Mozilla"
			}
		],
		dataOS : [
			{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			},
			{
				   string: navigator.userAgent,
				   subString: "iPhone",
				   identity: "iPhone/iPod"
		    },
			{
				   string: navigator.userAgent,
				   subString: "iPad",
				   identity: "iPad"
		    },
			{
				string: navigator.platform,
				subString: "Linux",
				identity: "Linux"
			}
		]

};
BrowserDetect.init();

//
//$(document).ready(function(){
//	var userHasBadges 				= false;
//	for(indexingUserStatusDetails in userstatusdetails)
//	{
//		if(String(userstatusdetails[indexingUserStatusDetails].status) === "approved")
//		{
//			userHasBadges			= true;
//		}	
//	}	
//	if(!userHasBadges)
//	{
//		$("#earnbadges").trigger("click");
//	}	
//});


