$(document).ready(function() {
	
	var header_ht;
	var login_ht;			
	var content_header_ht;
	var col_ht;
	var schedule_bar_height = 0;
 	 

  	$('.popup_close_act').click(function() {
  		$('#backgroundPopup').fadeOut();
		$(this).parent().fadeOut();
	});
	
	$('.popup_cancel_act').click(function() {
  		$('#backgroundPopup').fadeOut();
		$('.popup_holder').hide();
	});
	
			
	$(window).load(function () { 
		topbar_height = $('#login_details').height(); 
		header_height = $('#header').height(); 

		cal_height = parseInt(document.documentElement.clientHeight) - (topbar_height + header_height ); /* agenda hari */
		$('.scrl_block, .manageteam_content, .new_badge_holder, .user_history_cont, .approve_badge_cont').height(cal_height - 24);	
		$('.person_list_scrl').height(cal_height - 144);
		$('.table_body').height(cal_height - 111);
		$('.issue_badge_content .content-col').height(cal_height - 64);
		$ ('.admin_left_panel').height(cal_height - 25);	
		$('.approve_cont .person_list').height(cal_height - 68);
		$('.admin-content-wrapper').height(cal_height - 0);
		$('.drag_list_cont').height(cal_height - 121);
		$('.left_cont ul').height(cal_height - 115);
		
		
	});						  

	$(window).resize(function () {		
		topbar_height = $('#login_details').height(); 
		header_height = $('#header').height(); 

		cal_height = parseInt(document.documentElement.clientHeight) - (topbar_height + header_height ); /* agenda hari */
		$('.scrl_block, .manageteam_content, .new_badge_holder, .user_history_cont, .approve_badge_cont').height(cal_height - 24);	
		$('.person_list_scrl').height(cal_height - 144);
		$('.table_body').height(cal_height - 111);
		$('.issue_badge_content .content-col').height(cal_height - 64);
		$ ('.admin_left_panel').height(cal_height - 25);	
		$('.approve_cont .person_list').height(cal_height - 68);
		$('.admin-content-wrapper').height(cal_height - 0);
		$('.drag_list_cont').height(cal_height - 121);
		$('.left_cont ul').height(cal_height - 115);
	});						  
	
	
// black screen dynamic height on window resize
	$(window).resize(function(){
	   var body_win_height = parseInt(document.body.clientHeight) ;
	   var win_height = parseInt(document.documentElement.clientHeight) ;
	   if( body_win_height > win_height) {
		$('#backgroundPopup').height(body_win_height);
	   } else {
		$('#backgroundPopup').height(win_height);
	   }
	});
	
   var body_win_height = parseInt(document.body.clientHeight) ;
   var win_height = parseInt(document.documentElement.clientHeight) ;
	   if( body_win_height > win_height) {
		$('#backgroundPopup').height(body_win_height);
	   } else {
		$('#backgroundPopup').height(win_height);
	   }

	function position_popup () {
		var pop_pos = $(window).scrollTop() + 60;
		$('.popup_pos').css('top', pop_pos);
	}
	
	$('.badge_popup_act').click(function() {
		$('#backgroundPopup').show();
		$('.badge_detail_act').fadeIn();		
   		 position_popup ();
	 });

 	$(".admin_right_pannel .admin_tabcontent").hide();
 	$(".admin_left_panel li.accounts").addClass("active")
	$('#user_histroy_act').show();
	
	$(".admin_left_panel li").click(function(){
 		$(".admin_left_panel li").removeClass("active"); 
		$(this).addClass("active"); 
		$(".admin_right_pannel .admin_tabcontent").hide();
		
		var activeTab = $(this).find("a").attr("class");
		$('#' + activeTab).show();
 	});
	$('.file-wrapper').click(function() {
		$('.input_holder label .radio_chc').attr('checked', false);
		$('.file-wrapper input').attr('checked', true);
   		 position_popup ();
	 });
	$('.input_holder label .radio_chc').click(function() {
		$('.input_holder label .radio_chc').attr('checked', true);
		$('.file-wrapper input').attr('checked', false);
   		 position_popup ();
	 });
	  
	$('.dragable_list_act li')
			// Set the element as draggable.
			.attr('draggable', 'true')
			// Handle the start of dragging to initialize.
			.bind('dragstart', function(ev) {
				var dt = ev.originalEvent.dataTransfer;
				   $(ev.target).addClass('test');
					 /*$(this).parent().find('.opacity_act').children().addClass("opacity");
					$(this).parent().find('.opacity_act').show();*/
				dt.setData("Text", "Dropped in zone!");
				return true;
			
        })

	$('.badge_act').click(function() {
		$('code.badge_icon').fadeIn();	
		$('code.badge_icon').removeClass('trophy_icon');		
	 });
	$('.trophy_act').click(function() {
		$('code.badge_icon').fadeIn();	
		$('code.badge_icon').addClass('trophy_icon');		
	 });
	 
//InputBox
$('input[type="text"], textarea').focus(function() {
  if( this.value == this.defaultValue ) {
   this.value = "";
  }
  }).blur(function() {
   if( !this.value.length ) {
	this.value = this.defaultValue;
   }
}); 

$('#search').keypress(function() {
	 $(".search_list").fadeIn();
	 $('.wrapper').addClass('flag');

}); 

$('#search').keypress(function() {
	$(this).next().next().show();
	 $('.wrapper').addClass('flag');

}); 
$('.search_list ul').find('li').click(function(){
  $('#search').val($(this).html());
  $('.search_list').hide();
});
$('.add_vlink_act').click(function(){
$('#imagethumbnail').attr('src',"");
  $('#backgroundPopup').show();
  $('.popup_holder').hide();
  $('.add_vid_link').show();
});
$('.add_vlink_cancel_act').click(function(){
  $('#backgroundPopup').show();
  $('.popup_holder').hide();
  $('.add_stuff_popup').show();
});
$('.ppup_badge_library_act').click(function(){
  $('#backgroundPopup').show();
  $('.popup_holder').hide();
  $('.badge_library').show();
});
$('.add_vlink_cont li').mouseover(function(){
  $(this).children('code.edit').show();
  $(this).children('code.remove').show();
});
$('.add_vlink_cont li').mouseout(function(){
  $(this).children('code.edit').hide();
  $(this).children('code.remove').hide();
});

$('.close_act').click(function () {
	$(this).parent().parent().hide();
	$('#backgroundPopup').hide();
});
$('#get_stuff_panel').find('.gry_btn').click(function() {
	$('#stuff_insuff').show();
	$('#backgroundPopup').show();
});
$('#get_stuff_panel').find('.grn_btn').click(function() {
	$('#stuff_thank').show();
	$('#backgroundPopup').show();
});
$('.video_popup_act').click(function() {
	$('.video_play').show();
	$('#backgroundPopup').show();
	position_popup ()
});
$('.badge_library_act').click(function() {
	$('.badge_library').show();
	$('#backgroundPopup').show();
	position_popup ()
});

//admin and user active
	$('#active_staus a').click(function() {
		var status = $(this).html();
		if (status == "Admin") {
			$(this).siblings().removeClass('user_active_btn');
			$(this).addClass('admin_active_btn');
		}
		else {
			$(this).siblings().removeClass('admin_active_btn');
			$(this).addClass('user_active_btn');
		}
	});
 
 $('.add_team_act').click(function() {
	$(this).parent().parent().find('.addto_list').show();
	$(this).hide();
});
 $('.addto_list .gry_btn').click(function() {
	$(this).parent().parent().parent().find('.addto_list').hide();
	$(this).parent().parent().find('.add_team_act').show();
});


});


