/*************************************************************************
 * 
 * LoopTodo  CONFIDENTIAL
 * __________________
 * 
 *  Copyright (c) LoopTodo, 2012
 *  All Rights Reserved.
 * 
 * NOTICE:  Except where expressly excluded, all information contained herein is, and remains
 * the property of LoopTodo and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to LoopTodo
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from LoopTodo.
 */


$(document).ready(function() {	
//$('#user_email').val("test@test.com");$('#user_name').val("test");

	$('#card_title').counter({
		text: false,
		goal: 500
	});
	
$("textarea", document.forms[0]).focus();

    var testElem = document.createElement("input");
    if( 'placeholder' in testElem == false ) {
//    	var s = document.createElement("script");
//    	s.setAttribute("type","text/javascript");
//    	s.setAttribute("src","/form/js/jquery.infieldlabel.js");
    	//$('input[placeholder], textarea[placeholder]').each(function() { alert($(this).val() == ""); });
    	$.getScript("/form/js/jquery.infieldlabel.js", function() {    		    		
    		$("label").inFieldLabels();
    		//$('[for="user_email"]').css("left","160px");
    		$('textarea[placeholder], input[placeholder]').each(function() {
    		    //$('label.placeholder').show();
    			if($(this).val() == "") {   // alert("show")
    			    $('label.placeholder[for="' + $(this).attr("id") + '"]').show();
    			} else {
    				$('label.placeholder[for="' + $(this).attr("id") + '"]').hide();
    			}
    		});

    	});
    
    	
    } else {
    	//alert($('input:first').attr("id"));
    	//alert('placeholder' in $('input:first').get(0));
    }
// Feedback & Support Popup		
	//$("label").inFieldLabels();
	
				

	$("input").focus(function() {
			$(this).removeClass('needsfilled');
  	});
  	$("textarea").focus(function() {
  			$(this).removeClass('needsfilled');  			
  		});


// Form Validation	
		// Place ID's of all required fields here.
	// If using an ID other than #email or #error then replace it here
	email = $("#user_email");

	$("#loop_form").submit(function(event) {
		
		// prevent the page from refreshing in IE
		event.preventDefault(); 
		
		//Validate required fields
		var required;
		if ($('.anon_chkbox').is(':checked')){ 
			required = ["feedback_box", "card_title"];
			$('.text_input').removeClass('needsfilled').val("");
					
		}
		else {
			
			required = ["user_name", "user_email", "card_title"];
			if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.val())) {
				email.addClass("needsfilled");
			} else {

				email.removeClass("needsfilled");
			}

		}
		for (i=0;i<required.length;i++) {
			
			var input = $('#'+required[i]);
			console.info("input = " + input.attr("id"));
			if ((input.val() == "")) {
				input.addClass("needsfilled");
			} else {
				input.removeClass("needsfilled");
			}			
		}
		
		// Validate the e-mail.

		//if any inputs on the page have the class 'needsfilled' the form will not submit
		if ($(":input").hasClass("needsfilled")) {
			return false;
		} else {
			
			// on the v2 loop form, this swaps the empty description with the "title" entered by the user
			 // so we don't need to deal with the 140 character limit. The description field can be
		      // as large as a POST or PUT body.
			//$('#card_desc').val( $('#card_title').val() );
			//$('#card_title').val("+Add Title");
			formManager.submitFeedback($('#loop_form').serializeArray());
			
			return false;
		}
		return false;
	});

// Anonymous checkbox

	$('.anon_chkbox').click(function() { 
			$(this).prev().children('.name_email').toggle();
			//$('.text_input').removeClass('needsfilled').val("");
			$('label:visible').show().css('opacity', 1);
			//$('textarea:first').blur();			
	});
	
	
	
	
// End validation		
		
//		var sugges_lb = "What's your suggestion?"
//		var problem_lb = "Please describe your problem..."
//		var question_lb = "Ask your question here..."
		
	if(formManager.loopListener == null || window.location.pathname != "/loop-form.html" || top.window.location == window.location) {
 		$('.feedback_nav').find('li').click(function() {
				$(this).removeClass('active');
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
 	 		if ($(this).hasClass('sugges')) {
 	 			$('.submit_btn').val('Send Suggestion');
				$('#tag').val("suggestion");
				if ($('textarea').val() == '') {
					$("textarea").attr("placeholder", "What's your suggestion?");					
					$("label[for='card_title']").html("What's your suggestion?");
				}
 			} else if ($(this).hasClass('problem')) {
 				$('.submit_btn').val('Submit Problem');
				$('#tag').val("problem");
				if ($('textarea').val() == '') {
					$("textarea").attr("placeholder", "Please describe your problem...");
					$("label[for='card_title']").html("Please describe your problem...");
				}
			} else if ($(this).hasClass('ask_ques')) {
				$('.submit_btn').val('Send Question');
				$('#tag').val("question");
				if ($('textarea').val() == '') {
					$("textarea, label[for='card_title']").attr("placeholder", "Ask your question here...");
					$("label[for='card_title']").html("Ask your question here...");
				}
			}
			
 		});
	}
 		
	$('.feedback_btn').click(function() {
		$('#backgroundPopup').show();
		$('#feedback_popup_window').fadeIn();
		$('.feedback_thank').hide();
		$('#new_appointment_window').hide();		
	});

	/* $('#feedback_popup_window .report').click(function() {
		$('#feedback_popup_window .report_problem').show();
		$(this).addClass('active');
	//	$(this).find('code').addClass('active');
		$('#feedback_popup_window .make_sugges').hide();
		$('#feedback_popup_window .sugges').removeClass('active');
		$('#feedback_popup_window .sugges').find('code').removeClass('active');
		$('#feedback_popup_window .ask_qusetion').hide();
		$('#feedback_popup_window .ask_ques').removeClass('active');
		$('#feedback_popup_window .ask_ques').find('code').removeClass('active');		
	});*/

 	 

	//Popup window close
	$('#feedback_popup_window .popup_close').click(function() {
		$('#feedback_popup_window').fadeOut();
		$('#backgroundPopup').hide();		
	});
	

});	