<a href="javascript: showFeedbackWin();void(0);" style="position: fixed; right: 0px; top: 25%; display: block; z-index: 99; " id="looptodo_feedback_btn">

	<img src="/images/loop_feedback_btn.png"/>
	</a>
    <!--  Page 1 -->
	<div id="wrapper">
		<!-- <div  style = "background: #232c34;text-align: center;position: fixed;z-index: 100;padding: 10px 0px 15px;font-family: "Open Sans", Arial;display: block;>
			<h1 id="loop_title" class="loop_title">AdaptiveYou Feedback</h1>
			<div class="header_tail"></div>
		</div> -->
		<div id="feedback_popup_window" style="display:none">
			<div class="feedback_holder ar9" style="border-radius: 0px; width: 318px; padding: 10px 30px 38px;display:none">
				<h2 class="loop_title">AdaptiveYou Feedback</h2>
				<p id="form_desc">We'd love to hear how we're doing and how we could do better. Thanks for your feedback!
				
				    </p><div class="exceeded hide">You've exceeded the 500 character limit.</div>
				<p></p>
								
				<div class="feedback_nav_holder">
					<ul class="feedback_nav">
						<li class="sugges  active"><span></span>Suggestion</li>
						<li class="problem"><span></span>Problem</li>
						<li class="ask_ques"><span></span>Question</li>
					</ul>
					<!-- feedback_nav -->
				</div>
				<!-- feedback_nav_holder -->
				<div class="feedback_content">
					<div class="make_sugges">
						<form id="setmore_feedbacknew" method="POST" action="/forms/process" style="margin: 0;padding: 0;border: 0;outline: 0;font-weight: inherit;font-style: inherit;font-size: 100%;vertical-align: baseline;">
							<div class="input_holder">
							    <label for="card_title" class="placeholder"></label>
								<textarea id="card_title" name="card_title" class="feedback_box" placeholder="What's your suggestion?"></textarea><div id="card_title_counter"><span id="card_title_count">500</span> </div>
								<textarea rows="1" cols="1" id="card_desc" name="card_desc" style="display: none"></textarea>
								<div class="name_email" style="width: 316px;border-top: 0px;position: relative;height: 40px;">
								
								    <label id="user_email_name" for="user_name" class="placeholder">Name</label>
									<input placeholder="Name" name="user_name" title="Name (optional)" class="input_name text_input" id="user_name" type="text"> 
									<label id="user_email_label" for="user_email" class="placeholder user_email">Email</label>
									<input placeholder="Email" name="user_email" title="Email (optional)" id="user_email" class="text_input" type="text">
								</div>
								<!-- name_email -->
							</div>
							<!-- input_holder -->
							<input id="anon2" class="anon_chkbox" name="anonymous" type="checkbox"><label class="anon_label" for="anon2"><strong>Anonymous</strong>
								(I don't want a response)</label>
								
								<input value="Send Suggestion" class="submit_btn" id="submit_btn2" type="submit"> <input value="agtzfmxvb3BhYmFja3IMCxIETG9vcBjZ4g4M" id="loopKey" name="loopKey" type="hidden"> <input id="user_avatar" name="user_avatar" type="hidden"> <input id="user_tag" name="user_tag" type="hidden"> <input id="tag" name="tag" value="suggestion" type="hidden"> <a id="loop-thanks" style="display: none" href="#loop-thanks.html">Send
								My Feedback</a>
						</form>
					</div>
					<!-- make_sugges -->
					<div class="fb_footer">
						Powered by <a href="http://www.loopto.do/" target="_blank"><span>LoopTodo</span></a>
					</div>
					<!-- fb_footer -->

				</div>
				<!-- feedback_content -->

			</div>
			<span id="looptodo_close_btn" style="position: absolute; top: 20px; right: 25px; font-family: Arial; font-size: 12px; cursor: pointer;">			<img src="/images/feedbackLoopToDo/close_btn.png">        </span>
		</div>
	</div>
	
	<!--  Page 2 -->

	<div id="thank-you-wrapper">
	<div class="header">
		<h1 class="loop_title">AdaptiveYou Feedback</h1>
		<div class="header_tail"></div>
	</div>
		<div class="feedback_thank">
			<h3>Thanks for the feedback!</h3>
			<p id="generate_ticket">Generating feedback card...</p>
			<p style="display:none" id="view_feedback_wrapper">
				Your issue has been submitted to our support crew, you can <a id="view_feedback_online" href="#">view it online here</a>.
			</p>
			<p>
				<a id="give_more_feedback" href="#">« Give more feedback</a>
			</p>
			<code></code>
		</div>
		<!-- feedback_thank -->

		<div class="popup_close"></div>
	</div>
	<!--  feedback_holder -->
	
	<!--  feedback_popup_window -->



