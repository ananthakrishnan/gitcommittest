
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - Error</title>
   	<link rel="stylesheet" type="text/css" href="../css/reset.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css" />
    <link rel="stylesheet" type="text/css" href="../css/others.css" />
    <link rel="stylesheet" type="text/css" href="../css/single.css" />

    <script type="text/javascript" src="../js/jquery-1.6.2.min.js"></script>
   
</head>
<body >
<div id="voice-box" style="display: none;">
<p><span id="statusMessage">Saving changes...</span></p> 
</div>
<div class="wrapper">
		<div id="login_details">
			<ul class="right_nav_holder">
				<li class="welcome_username"></li> 
				<li id="account_menu"><a href="#">My Account</a>
					<ul>
						<li id="my_details" onclick="openwin();"><!-- <a href="#">My Details &raquo;<span>Username/password</span></a> --></li>
						<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a></li>
					</ul>
				</li>
			</ul>
		</div> <!-- login_details -->
    <div id="header">
 				<div class="header_holder">
 					<div id="company-name"></div>
 					<div id="header_nav_holder">
                            <div class="tab_nav_holder">
                             <div class="clear_all"></div>
                            </div> <!-- tab_nav_holder -->  
               </div>  <!-- header_nav_holder -->                           
            </div>  <!-- header_holder -->
    </div> <!-- header -->
    
    <div id="listing" class="content-wrapper">
    	<div class="content-header">
    		Oops! We couldn't find this page.

			Sorry we weren't able to find the page you're looking for. 
			
			<a href="http://www.adaptiveyou.com">Click this link to go back to home page</a>
        <div class="clear_all"></div>
        </div> <!-- content-header -->
        
	    	<!-- <div class="content-col full-width">
	              <ul class="person_list" id="user_detailsUL">
	            </ul>
	        <div class="clear_all"></div>    
	        </div> content-col
	       -->
      
      
          <div class="clear_all"></div>    
    </div> <!--content-wrapper -->
</div> <!-- wrapper -->
<div class="wrapper" id="profile_panel" style="display:none">
    <div id="profile_panel" class="content-wrapper single-wrapper">
    <span id="backothers" style="display:none" class="header_link" onclick="showOthers()">
    <a  href="#" onclick="showOthers()">Back To Others</a>
    </span>
		<div class="picture">
        	<div class="picture_frame">
            	<img id="profileImage" src="../images/badge-robot.png" />
            </div>
        </div>
        <div class="badge_detial_col">
        	<ul class="user_info">
            	<li>
                	<div class="person_name">
                        <h3 class="user_person_name">Kevin</h3>
                    </div>
                    <div class="points_wrapper my_points">
                        <ul class="totals">
                        	<li class="badge_total"><span class="badgeDB_total">0</span> Badges</li>
                        	<li class="trophy_total"><span class="trophyDB_total">0</span> Trophies</li>
                        </ul>	
                        <div id ="total" class="total">
                        	0
                        </div>
                    </div>	
                <div class="clear_all"></div>
                </li>
            </ul>    
            
            <div class="badges_list">
            	<h2 class="user_person_name_badges">Kevin's Badges</h2>
                <ul id="total_badges">
					 
                </ul>
            <div class="clear_all"></div> 
            
           
            </div> <!-- badges_list -->
            
			<div class="badges_list">
            	<h2 class="user_person_name_trophies">Kevin's Trophies</h2>
                <ul id="total_trophies">
   
                </ul>
            <div class="clear_all"></div>     
            </div> <!-- badges_list -->            
        </div> <!-- badge_detail_col -->
    <div class="clear_all"></div>    
    </div> <!--content-	rapper -->
</div>
<div id="backgroundPopup" style="display:none"></div>
<div id="badgepopup" class="popup_holder popup_pos badge_detail_act" style="display:none">
		<div class="popup_close badge_popup_close" onclick="badge_popup()">X</div>
        <div class="badge_detial_col">
        	<ul class="user_info">
            	<li>
                	<div class="popup_img">
                    	<img title="This is a test" alt="typing-test" class="badge_img" src="/images/others/badge-setmore.png" style="height: auto; width: 95px;"/>
                        <code class="badge_icon"></code>
                    </div>
                	<div class="person_name cert_details">
                        <h3>Setmore Basic Certification</h3>
                        <h4>50 points for this badge</h4>
                    </div>
                    <div class="clear_all"></div>
                </li>
            </ul>    
            
            <div class="badges_list cert_para">
            	<p>
                	<!-- The Setmore Basic Certifiation is for a user that has set up their own account and can answer basic question on Setmore -->
                </p>
               <!--  <ul>
					<li>
                    	<p>To get this certification please go to goo.gl/vMtCN.</p>
                	</li> 
                	<li>
                    	<p>You will find a list of activities you are to complete. Once you have completed them then please submit request.</p>
                	</li> 
                    <li>
                    	<p class="last">On request notes please include your username and password for setmore</p>
                    </li>
                </ul> -->
            <div class="clear_all"></div>     
            </div> <!-- badges_list -->
            
                <div class="badges_list">
                    <h3>Make your badge request</h3>
                    <textarea id="badgeRequestContent"></textarea> 
                    <input type="submit" value="Send" onclick = "sendMailToUser()"/>
                <div class="clear_all"></div>     
                </div> <!-- badges_list -->     
            <div class="clear_all"></div>       
        </div> <!-- badge_detail_col -->
       <div class="clear_all"></div> 
</div>

</body>
</html>
