<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<META HTTP-EQUIV='Pragma' CONTENT='no-cache'>
<META HTTP-EQUIV="Expires" CONTENT="-1">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Welcome to AdaptiveYou Login</title>

<script type="text/javascript" >

<%
/* updated by vasumithra */
if(session.getAttribute("userProfileDetails")!=null){
 response.sendRedirect("/persistUser");
}
/* updated by vasumithra */
%>

	
	function onclickforlogin(){
		window.location.href='/oauth2callback';
	}
	
	function onclickOfFacebookLogin(){
		window.location.href='/facebookOauthCallback';
	}
	
</script>
<style type="text/css">

#login_with_google_account {
	background: url("http://commondatastorage.googleapis.com/conversionsupportimages/cswebsiteimages/google.png") no-repeat scroll 0 0 transparent; 
    border: medium none;
    float: right;
    height: 40px;
    width: 102px;
    cursor: pointer;
}

.header_signup {
    float: right;
    padding-top: 14px;
}

.header_signup a, .header_signup div {
    font-size: 14px;
}

.header_signup .green_btn span {
    background: url("../images/loginArrow.png") no-repeat scroll right -35px transparent;
    padding: 6px 24px 0 15px;
}

.green_btn {
   /*  background: url("../images/green-btn-bg.gif") repeat-x scroll 0 0 transparent;
    border-radius: 2px 2px 2px 2px;
    box-shadow: 2px 2px 4px #222222;
    cursor: pointer;
    display: block;
    float: right;
    position: relative;
    z-index: 1000; */
    
     -moz-transition: all 0.218s ease 0s;
    -moz-user-select: none;
    background-color: #D14836;
    background-image: -moz-linear-gradient(center top , #D14836, #D14836);
    border: 1px solid #DCDCDC;
    border-radius: 2px 2px 2px 2px;
    color: #444444;
    cursor: default;
    display: inline-block;
    font-size: 11px;
    font-weight: bold;
    height: 27px;
    line-height: 27px;
    min-width: 46px;
    padding: 0 8px;
    text-align: center;
}
.green_btn span {
   /*  background: url("../images/loginArrow.png") no-repeat scroll 135px -35px transparent; */
    color: #EEEEEE;
    display: block;
    font-size: 11px;
    font-weight: 600;
    height: 26px;
    line-height: 22px;
    padding: 3px 11px 11px 14px;
    text-shadow: 0 0 #188200;
    text-transform: uppercase;
}


#content {
	clear: both;
	margin: 0px auto; 	
	padding: 5px 30px;
	height:	auto;
}
#content_inner_wrapper {
	float: left;
	width: 100%;
	padding:5px 0px;
	padding: 26px 5px 0;
} 
.login_wrapper 
{
	
	-moz-border-radius: 6px;
	-webkit-border-radius: 6px;
 	border-radius:6px;
	-moz-box-shadow: 0px 0px 10px #cecece;
 	-webkit-box-shadow: 0px 0px 10px #cecece;
 	box-shadow: 0px 0px 10px #cecece;
  	border:1px solid #CCC;
}
.login_wrapper
{
	
	width: 215px;
   	margin: 80px auto;
	padding: 35px 68px;
	/* background: url(../images/cs_logo_small-55x55.png) 60px 20px no-repeat; */
	height: 115px;
} 

.login_wrapper span{
	font-size:11px;
	color:#333;
}
.login_wrapper h1{
	font-size:18px;		font-weight:normal;
	margin:-1px 0px;	padding:0px;
	color:#333;
}
body {
	margin: 0px;	padding: 0px;
	font-family: "Helvetica", verdana, arial, sans-serif;
	font-size: 12px;
	background:#444;
}
#login_thirdParty_authentication {
margin-top : 10px;
margin-left: 0px;
}
.clear_all { clear:both; }

#login_with_facebook_account {
background: url("http://commondatastorage.googleapis.com/conversionsupportimages/cswebsiteimages/facebook.gif") no-repeat scroll 0 0 transparent;
border: medium none;
cursor: pointer;
float: left;
height: 47px;
width: 102px;
}
</style>
</head>

<body style="background:#fff;"  >
<div 	id="content">
    <div id="content_inner_wrapper"> <!-- controls the width of layout -->
<!--     	<div class="header_signup green_btn"> -->
<!-- 		        	Signup button Starts Here -->
<!-- 		        	<a target="_blank" style="text-decoration: none" href="http://adaptiveyou-signup.appspot.com/"><span>SIGN UP</span><em></em></a> -->
<!-- 		        	Signup button Ends Here -->
<!-- 		 </div> -->
		<div class="login_wrapper">
        	<span style="padding-left: 50px;"></span>
        	<h1 style="padding-left: 50px;">AdaptiveYou</h1>
          <!--   <form class="login_form" method="post" id="login" onsubmit="return loginActions.validateForm();" action="login">
                <div class="button_holder">  </div>
            </form> -->
        <div class="clear_all"></div>
        
	        <div id="login_thirdParty_authentication">
	        <center><div style="color: #555; margin-bottom: 12px; margin-left:-22px;margin-right:-20px;">Login With Your Facebook / Google Account </div></center>
	        <div id="login_with_facebook_account" onclick="onclickOfFacebookLogin()"> </div>
	         <div id="login_with_google_account" onclick="onclickforlogin()"> </div>
	        </div> 
	          	 		
        </div> <!-- login_wrapper -->
    </div> <!-- content_inner_wrapper -->
</div> <!-- content -->
    
<div class="black_screen"></div>  <!-- black_screen -->
</body>
</html>