<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Untitled Document</title>

	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'/>
   	<link rel="stylesheet" type="text/css" href="/css/others/reset.css" />
    <link rel="stylesheet" type="text/css" href="/css/others/style.css" />
    <link rel="stylesheet" type="text/css" href="/css/others/single.css" />
    <link rel="stylesheet" type="text/css" href="colortip-1.0/colortip-1.0-jquery.css"/>

    <script type="text/javascript" src="/js/jquery-1.6.2.min.js"></script>
	<script type="text/javascript" src="/colortip-1.0/colortip-1.0-jquery.js"></script>
	<script type="text/javascript" src="/js/actions.js"></script>
    
    <style type="text/css">
	
/****** Popup **********/
.popup_holder {
	position:absolute;
	top:20px;
	background:#ffffff;
	padding:0px 30px 10px;
	z-index:999999;
	width:620px;
	left:50%;
	margin-left:-340px;
	box-shadow: 4px 4px 4px #999;
	border-radius:5px;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	display:block;
}
#backgroundPopup {
	display:none;
	position:absolute;
	top:0px;
	height:100%;
	width:100%;
	background:url(../images/popup_bg.png) repeat;
	z-index:98;
}

.popup_close {
	position:absolute;
	font-weight:bold;
	right:0;
	margin:10px 14px 0px 0px;
	font-size:20px;
	cursor:pointer;
}
.popup_holder .badge_detial_col {
	margin: 0px;
	height:auto !important;
}
.popup_img {
	float:left;
	border:10px solid #e8f2f4;
	padding:0px;
	border-radius:4px;
	-moz-border-radius:4px;
	-webkit-border-radius:4px;
	box-shadow: 1px 1px 1px #eee;
}
code.badge_icon {
	background:url(../images/total_icons.png) 0px 0px no-repeat;
	width:20px;
	height:30px;
	position:absolute;
	margin:82px 0px 0px 37px;
	left:0;	
}
.popup_holder .person_name {
	float:left;
	clear:none;
	padding:45px 0px 40px 20px;
	margin: 0px;
}
.popup_holder .person_name h3 {
	font-size:25px;
	font-weight:bold;
}
.popup_holder .person_name h4 {
	margin: 10px 0 0 0px;
	font-size:17px;
}
.popup_holder .badges_list {
	max-height:250px;
	overflow-y:auto;
	padding: 20px !important;
	margin-bottom:20px !important;
}
.popup_holder .badges_list p {
	margin:0px 0px 14px 0px;
	line-height:18px;
}
.popup_holder .badges_list p.last {
	margin-bottom:0px !important;
}
.popup_holder .badges_list ul li {
	background:none !important;
	box-shadow:none !important;
	float:none;
	width:auto !important;
	margin:0px 0px 0px 5px !important;
	padding:0px !important;
}
.popup_holder .badges_list h3 {
	font-size:16px;
	font-weight:bold;
}
.popup_holder .badges_list textarea {
	width:450px;
	height:40px;
	margin:15px 0px 0px;
	border:1px solid #e4e4e4;
	box-shadow: inset 0px 0px 4px #eee; 
	-moz-box-shadow: inset 0px 0px 4px #eee; 
	-webkit-box-shadow: inset 0px 0px 4px #eee; 
	float:left;
	padding:10px 0px 0px 10px;
	font-size:14px;
	font-family: "Open Sans",arial;
	color:#555555;
}
.popup_holder .badges_list input[type="submit"] {
	border:1px solid #b8b8b8;
	background:url(../images/btn_bg.gif) 0px 0px repeat-x;
	font-size:17px;
	color:#555555;
	padding:4px 30px 5px;
	cursor:pointer;
	margin:32px 0px 0px 10px;
	float:left;
}
	</style>
    
</head>
<body>

<div class="popup_holder popup_pos badge_detail_act ">
		<div class="popup_close">X</div>
        <div class="badge_detial_col">
        	<ul class="user_info">
            	<li>
                	<div class="popup_img">
                    	<img title="This is a test" alt="typing-test" src="/images/others/badge-setmore.png">
                        <code class="badge_icon"></code>
                    </div>
                	<div class="person_name">
                        <h3>Setmore Basic Certification</h3>
                        <h4>50 points for this badge</h4>
                    </div>
                    <div class="clear_all"></div>
                </li>
            </ul>    
            
            <div class="badges_list">
            	<p>
                	The Setmore Basic Certifiation is for a user that has set up their own account and can answer basic question on Setmore
                </p>
                <ul>
					<li>
                    	<p>To get this certification please go to goo.gl/vMtCN.</p>
                	</li> 
                	<li>
                    	<p>You will find a list of activities you are to complete. Once you have completed them then please submit request.</p>
                	</li> 
                    <li>
                    	<p class="last">On request notes please include your username and password for setmore</p>
                    </li>
                </ul>
            <div class="clear_all"></div>     
            </div> <!-- badges_list -->
            
                <div class="badges_list">
                    <h3>Make your badge request</h3>
                    <textarea></textarea> 
                    <input type="submit" value="Send" />
                <div class="clear_all"></div>     
                </div> <!-- badges_list -->     
            <div class="clear_all"></div>       
        </div> <!-- badge_detail_col -->
       <div class="clear_all"></div> 
</div>

    	<div id="backgroundPopup"></div>

</body>
</html>
