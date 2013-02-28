<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Select Company</title>
<%
String companydetails="";
if(session.getAttribute("companyslist")!=null){
		System.out.println("companyslist ::"+session.getAttribute("companyslist"));
	  companydetails=(String)session.getAttribute("companyslist");
%>
<%}%>

<script type="text/javascript" src="../js/jquery-1.6.2.min.js"></script>
<script type="text/javascript">

var companylist=<%=companydetails %>

$(document).ready(function(){
	
	
	var companylistli="";

	for(index in companylist)
		{
			if(companylist[index])
			{
				companylistli	+= '<div class="future" onclick="javascript:selectedCompany(this);" id="'+index+'"><a href="#" value="'+companylist[index]+'"><img src="../images/UU.png" /><p style="margin-top:7%;margin-left:65px;margin-bottom:7%;">'+companylist[index]+'</p></a></div>';
			}	
		}
	$('.content_link').append(companylistli);
	
	
	function position_popup () {
		var pop_pos = $(window).scrollTop() + 20;
		$('.popup_wrapper').css('top', pop_pos);
	}	


  	$('.popup_close_act').click(function() {
  		$('#backgroundPopup').fadeOut();
		$(this).parent().hide();
				
	});
		
   var body_win_height = parseInt(document.body.clientHeight) ;
   var win_height = parseInt(document.documentElement.clientHeight) ;

	   if( body_win_height > win_height) {
		$('#backgroundPopup').height(body_win_height);
	   } else {
		$('#backgroundPopup').height(win_height);
	   }

	$(window).resize(function(){
	   var body_win_height = parseInt(document.body.clientHeight) ;
	   var win_height = parseInt(document.documentElement.clientHeight) ;

	   if( body_win_height > win_height) {
		$('#backgroundPopup').height(body_win_height);
	   } else {
		$('#backgroundPopup').height(win_height);
	   }
	}); 	


	
	$('.term_condition_act').click (function() {
			$('#backgroundPopup').fadeIn();
			$('.term_condition').show();
			position_popup ();
	});
	$('.privacy_policy_act').click (function() {
		
		$('#backgroundPopup').fadeIn();
		$('.privacy_policy').show();
		position_popup ();
	});	
	
	
	$(window).load(function(){
		
		if($(".content_link").height() > (.6 * $(window).height()))
		{
			$(".footer_wrapper").css({'position':'relative','margin-top':'230px'});
		}	
		
	});
	
});
function selectedCompany(input)
{
	$(".footer_wrapper").css({'position':'absolute','margin-top':'0px'});
	var userCompanyId 				= input.id;
	var selectedCompanyName 		= "";
	
	$(".content_link").find("div").each(function(){
		
		if(String($.trim(userCompanyId)) != String($.trim($(this).attr("id"))))
		{
			$(this).fadeOut("slow");
		}
		else
		{
			$(this).removeAttr("onclick");
			selectedCompanyName		= $(this).find("a").attr("value");
		}	
		
	});
	
	$(".content_inner > h2").html("Loading "+selectedCompanyName).hide().fadeIn("slow");
	
	window.location.href = "/intermediateCheck?companyKey="+userCompanyId;

}
</script>
<style type="text/css">
@charset "utf-8";
/* CSS Document */

body {
	margin: 0px;
	padding: 0px;
	font-family: 'Open Sans', sans-serif;
	font-size: 13px;
	background: url(../images/ban.png) 0px 0px repeat;
}
ul, li,a, h1, h2, h3, h4, h5, p {
	margin: 0px;
	padding: 0px;
	text-decoration: none;
	list-style: none;
}
strong {
	font-weight: bold;
}
h2 {
	font-weight: bold;
	font-size: 16px;
}

h3 {
	font-weight: bold;
	font-size: 15px;
}

a {
	color: #333333;
}

.clear_all {
	clear: both;
}

.grace_font {
	font-family: 'Covered By Your Grace', cursive;
	color: #0b88bc;
	font-size: 18px;
}
.nm { margin:0px !important; }
.nb { border:none !important; }
.nlp { padding-left: 0px !important; }
.fr { float:right; }
.fl { float:left;}

/*************** Header *********/
.header_wrapper {
	margin: 0 auto;
	padding: 0px 0px 0px;
	height: 65px;
	position: fixed;
	width: 100%;
	z-index: 2000;
	border-bottom:5px solid #c5cfd5;
	background-color: #3c525d;
	background-image: -webkit-gradient(linear, left top, left bottom, from(#58676f), to(#3c525d));
	background-image: -webkit-linear-gradient(top, #58676f, #3c525d);
	background-image: -moz-linear-gradient(top, #58676f, #3c525d);
	background-image: -o-linear-gradient(top, #58676f, #3c525d);
	background-image: -ms-linear-gradient(top, #58676f, #3c525d);
	background-image: linear-gradient(top, #58676f, #3c525d);
	top:0px;
	position: absolute;

}
#header {
	width: 1000px;	height:65px;
	margin: 0 auto;
}

.logo {
	background: url(../images/logo.png) 0px 0px no-repeat;
	width: 198px;
	height: 31px;
	float: left;
 	margin-top: 15px;
}
#header span {
	float:right;
	font-weight:bold;	color:#ffffff;
	margin-top:30px;
	text-transform:uppercase;
	font-size:14px;
	cursor:pointer;
	margin-left: 16px;
}
/**************content***********/
.content{
/* 	background: url(../images/ban.png) 0px 0px repeat; */
/* 	height: 750px; */
/* background-color: #ececec; */
/* padding-top: 65px; */
}
.content_wap{
	margin: 0px auto;
width: 960px;
}
.content_inner{
margin-top: 50px;
}
.content_inner h2{

	color: #E77D24;
    font-size: 34px;
    font-weight: 800;
    left: 25%;
    padding-bottom: 30px;
    position: absolute;
    text-align: center;
    top: 15%;
}

.content_link{
/* 	background-color: #c5cfd5; */
/* margin-left: 300px; */
/* width: 340px; */
/* padding-top: 20px; */
/* padding-bottom: 20px; */

	 border: 5px solid #C5CFD5;
    height: auto;
    left: 34%;
    margin-bottom: 30px;
    padding: 0;
    position: relative;
    top: 120px;
    width: 312px;
}
.future{
	background-color: #3C525D;
    border: 1px solid #FFFFFF;
    cursor: pointer;
    height: auto;
    margin: 5px;
    padding: 0;
    width: 300px;
    min-height:60px;
}
.future li{
	height: 60px;
border: 1px solid;
}
.future a span{
	padding-left: 15px;
}
.future a{
/*     padding:20px; */
	font-size: 18px;
font-weight: 600;
color: rgb(255, 255, 255);
}

.content_link div:hover
{

box-shadow: 0 0 16px #FFFFFF inset;
/* background: rgb(127,137,140); /* Old browsers */
/* background: -moz-linear-gradient(top,  rgb(127,137,140) 1%, rgb(60,82,93) 38%, rgb(60,82,93) 53%, rgb(127,137,140) 100%); /* FF3.6+ */ */
/* background: -webkit-gradient(linear, left top, left bottom, color-stop(1%,rgb(127,137,140)), color-stop(38%,rgb(60,82,93)), color-stop(53%,rgb(60,82,93)), color-stop(100%,rgb(127,137,140))); /* Chrome,Safari4+ */ */
/* background: -webkit-linear-gradient(top,  rgb(127,137,140) 1%,rgb(60,82,93) 38%,rgb(60,82,93) 53%,rgb(127,137,140) 100%); /* Chrome10+,Safari5.1+ */ */
/* background: -o-linear-gradient(top,  rgb(127,137,140) 1%,rgb(60,82,93) 38%,rgb(60,82,93) 53%,rgb(127,137,140) 100%); /* Opera 11.10+ */ */
/* background: -ms-linear-gradient(top,  rgb(127,137,140) 1%,rgb(60,82,93) 38%,rgb(60,82,93) 53%,rgb(127,137,140) 100%); /* IE10+ */ */
/* background: linear-gradient(to bottom,  rgb(127,137,140) 1%,rgb(60,82,93) 38%,rgb(60,82,93) 53%,rgb(127,137,140) 100%); /* W3C */ */
/* filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#7f898c', endColorstr='#7f898c',GradientType=0 ); /* IE6-9 */ */

}
.future a:hover{

}

.future a img{
	float: left;
    height: 36px;
    margin-left: 15px;
    margin-top : 4%;
    padding-right: 15px;
    position: relative;
/*     top: 10px; */

}
/************** Footer ***********/

.footer_wrapper {
	clear: both;
	height:6px;
	background:#ececec;
	width:100%;
	position:absolute;
	bottom:64px;
	
}

.footer_content {
	width: 910px;
	margin: 0 auto;
	padding: 35px 40px 50px;
}
.footer_content p {
	font-size:24px;
	font-weight:600;
	float:left;
	width: 510px;
	line-height:31px;
	margin-top:10px;
	color:#000000;
}
.footer_wrapper .login_btn_holder {
	margin:0px 0px 0px 10px;
}
.footer_wrapper .btn_inner {
	border: 5px solid #869096;
	float:left;
}
.footer_wrapper font { float:left; width: 110px; margin-top:14px;}
.footerBtm {
	background:#354852;
	border-top:5px solid #c4ced4;
	height:35px;
	padding-top:30px;
}
.footerBtm p {
	color:#ffffff;
	width:1010px;
	margin: 0 auto;
}
.footerBtm p span:hover {
	cursor:pointer;
	text-decoration:underline;
	}
.footerBtm p a {
	color:#ffffff;
}
.footerBtm p a:hover {
	text-decoration:underline;
}

/************* Popups *****************/
/**************** popup *********************/

 .popup_wrapper {
 	width:708px;
	height:471px;
	position:absolute;
	left:50%;
	margin-left:-354px;
	top:100px;
	z-index:99999;
	background-color: rgb(229,229,229); /* Needed for IEs */
	-moz-box-shadow: 0px 0px 15px rgba(0,0,0,0.6);
	-webkit-box-shadow: 0px 0px 15px rgba(0,0,0,0.6);
	box-shadow: 0px 0px 15px rgba(0,0,0,0.6);
	zoom: 1;
	display:none;
 }
 .popup_content {
 	background:#e5e5e5;
	padding:30px 35px 25px 30px;
 }
.popup_content_holder { 
  	height:550px;
	overflow-y:scroll;
	}
.popup_content h1 {
	font-family:"Open Sans";
	font-weight:lighter;
	font-size:36px;
	color:#4c4c4c;
	text-align:center;
	padding:0px 0px 15px 0px;
	margin:0px 0px 20px;
	border-bottom:1px solid #dadada;
}
.popup_content p {
	font-family:"Open Sans";
	font-size:14px;
	color:#4c4c4c;
	font-weight:normal;
	padding:0px 0px 17px 0px;
	line-height:27px;
	width:604px;
}
.popup_content p a { color:#006CBC; }
.popup_content h3 {
	font-size:15px;
	font-weight:bold;
	padding:0px 0px 10px;
}
.popup_content ul li {
    background: url(../images/arrow.png) no-repeat scroll 0 6px transparent;
    color: #4C4C4C;
    font-family: "Open Sans";
    font-size: 14px;
    padding: 0 0 15px 20px;
    line-height:23px;
}
.popup_close {
	 background: url(../images/close.png) 0 0px no-repeat;
    cursor: pointer;
    height: 14px;
	float:right;
    width: 23px;
    margin:10px 0px 0px;
}
#backgroundPopup {
 	background:#5ebae9;
	display:none;
	height:100%;
	top:0px;
	width:100%;
	z-index:70000;
	filter:0;
	position:absolute;
	-moz-opacity:0.6; -khtml-opacity: 0.6;
	opacity: 0.6;	filter: alpha(opacity=60);  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60); 
	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=60)"; 
	zoom: 1;
	padding:113px 0px 0px 0px;
 }
 
 .signup_content {
    position: absolute;
    top: 40%;
    width: 100%;
    overflow: auto;
}

.selected_company
{
	display:none;
	cursor:default;
	position:absolute;
	left:45%;
	top:40%;
	color: #3C525D;
    font-size: 20px;
    font-weight:bold;
}

</style>
</head>
<body>

<!-- <div id="companyslist" style="margin-left:580px;margin-top: 200px;">Please choose a company to proceed:</div> -->

<div class="header_wrapper">
    	<div id="header">
	    	<a href="http://www.adaptiveyou.com" class="logo"></a> <!--- logo --->
        </div>
    </div>
<div class="clear"></div>
<div class="content">
	<div class="content_wap">
    	<div class="content_inner">
            <h2>Please choose an Organization to proceed
            </h2>
            <div class="content_link">
<!--                	        <div class="future"> -->
<!--                         	<a href=""><img src="image/UU.png" />Internship Training</a> -->
<!--                         </div> -->
<!--                         <div class="future"> -->
<!--                     		<a href=""><img src="image/UU.png" />Ethiraj College</a> -->
<!--                         </div> -->
            </div>
    	</div>
    </div><!--content_inner-->
</div><!--content-->
<div class="footer_wrapper">
    	        <div class="footerBtm" style="">
            <p>@2012 AdaptiveYou | <span class="term_condition_act">Terms of Use</span> | <span class="privacy_policy_act">PrivacyPolicy</span> | <a href="http://invis.io/J99JFSAF">Upcoming Versions</a></p>
        </div>
    </div>





<div style="top: 20x; display: none;" class="popup_wrapper term_condition">
<div class="popup_close popup_close_act"></div>
	<div class="popup_content">
     <h1>Terms</h1>
     <div class="popup_content_holder">
		<p>By accessing or using the Site, any user ("User") accepts these 
Terms of Use ("Agreement") and agrees to be bound, without limitation or
 qualification, by these terms and all applicable Oregon State, and 
federal laws. User agrees not to alter or tamper with the software, 
security, or site operations of the Site. AdaptiveYou reserves the right 
to change provisions of the Agreement without notice, and User agrees to
 be bound by the terms in effect at the time at which the Site is 
accessed.</p>        

        <h3>Use of Site</h3> 
        <p>Services and products are intended for persons who are 
legally permitted to enter binding contracts. The Site may not be used 
to gain or attempt to gain a competitive advantage in AdaptiveYou's 
industry market.</p>
        <p>Any comments, data, and data disclosed or submitted to the 
Site become property of AdaptiveYou. Except as provided in the Privacy 
Notice, AdaptiveYou is under no obligation to 1) hold in confidence any 
disclosures or submissions except where required by law; 2) pay for any 
disclosures or submissions; or 3) respond to any disclosures or 
submissions. All submissions are subject to use by AdaptiveYou without 
restriction, and User is not entitled to any compensation. User agrees 
to provide data that is not inflammatory, obscene, or harmful to others,
 nor that gives rise to civil liability or infringes on any copyright. 
User agrees to provide truthful data about herself/himself only. 
AdaptiveYou may restrict or terminate any User's access to the Site 
without notice at AdaptiveYou's sole discretion if data has been provided
 that may be harmful to others or if User has engaged in harassment of 
AdaptiveYou service providers. Harassment of any AdaptiveYou service 
provider includes but is not limited to offensive language during 
registration, ordering, email correspondence, or customer service calls.
 Any harassment of AdaptiveYou service providers is subject to legal 
recourse by AdaptiveYou. Neither AdaptiveYou nor its service providers 
assumes responsibility or liability for any action or inaction taken in 
regards to offensive material on the Site.</p>
    	
    	<h3>Accuracy of data</h3>
    	<p>Although AdaptiveYou's webmaster updates data on the Site 
periodically, AdaptiveYou does not offer assurance that the data or 
material is error-free or complete. Such updates include but are not 
limited to color, availability, product description, and price. 
AdaptiveYou reserves the right to revise or change data without prior 
notice. Although we apologize for the inconvenience, AdaptiveYou reserves
 the right to correct any data at any time, even during your 
transaction, and will take measures that may include refusal, 
cancellation, or revision to adjust your final payment.</p>
    	
    	<h3>Third Party Links and Content</h3>
    	<p>Links and references to and from third party websites are 
provided for convenience only. AdaptiveYou does not expressly or 
implicitly endorse any data, materials, or services offered on third 
party sites, nor their accessibility or security. AdaptiveYou does not 
assume any responsibility or liability for third party sites, nor does 
AdaptiveYou make any representation or warranties for these sites. No 
User may provide links to AdaptiveYou's website without prior written 
permission from AdaptiveYou's webmaster.</p>
    	<p>AdaptiveYou and its service providers do not guarantee the 
accuracy or completeness of the Site's content. AdaptiveYou does not 
assume responsibility or liability for third party material on the Site.
 Vendors of AdaptiveYou may furnish certain data available to the User, 
including certain product data and opinions, and thus User agrees to 
indemnify AdaptiveYou service providers and affiliates against all losses
 or damages resulting in User's reliance on any data, opinion, or advice
 obtained through the Site.</p>
    	
    	<h3>Termination</h3>
    	<p>These Terms of Use are applicable to any User who accesses, 
registers, or browses on the Site. AdaptiveYou may restrict or terminate 
any user's access to our services or products at any time and without 
notice. The terms of Termination; Indemnity; Copyright and Trademark 
Disclaimer; Limitation of Liability and Disclaimer of Warranties; and 
Governing Law sections will survive any termination of service or use of
 the Site.</p>
    	
    	<h3>Indemnity</h3>
    	<p>User agrees to indemnify all AdaptiveYou service providers and 
affiliates against all losses or damages, including reasonable 
attorney's fees, resulting from any violation of this Agreement and/or 
the Privacy Notice by the User, or any activity on the User's account by
 another third party.</p>
    	
    	<h3>Copyright and Trademark Disclaimer</h3>
    	<p>The Site is owned by AdaptiveYou and is available for a User's 
personal and non-commercial purposes only. The AdaptiveYou name, logo, 
and site content, including all pictures, slogans, text, colors, 
designs, graphics, images, icons, buttons, code, and software, are all 
subject to trademark, copyright, and other applicable intellectual 
property rights and law. Third-party trademarks, product names, and 
logos on the Site are the property of their respective owners. 
AdaptiveYou retains sole rights for all use, production, and copy of its 
trademarks, and any misuse is strictly prohibited. AdaptiveYou trademarks
 may not be copied, reproduced, modified, downloaded, published, 
exploited, or transmitted without first obtaining written permission 
from AdaptiveYou. Permission is only granted to electronically copy and 
print pages from the Site solely as related to the non-commercial 
placement of User's personal order from AdaptiveYou. AdaptiveYou retains 
all intellectual property rights, copyrights, and trademarks for any 
material that User prints for personal use. User agrees to respect all 
applicable intellectual property laws and not use any materials on the 
site to create new works.</p>
    	
    	<h3>Limitation of Liability and Disclaimer of Warranties</h3>
    	<p>AdaptiveYou PROVIDES THE SITE "AS IS" AND DOES NOT CLAIM TO MAKE 
ANY WARRANTIES, EXPRESS OR IMPLIED, ABOUT THE SERVICEABILITY, 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR MATERIALOF THE 
SITE. AdaptiveYou FURTHER DOES NOT WARRANT THAT ITS SITE OR THE PRODUCTS 
AND MATERIALS CONTAINED ON THE SITE ARE ERROR-FREE, OR THAT ERRORS WILL 
BE CORRECTED, OR THAT THIS SITE OR APPLICABLE SERVER IS FREE FROM 
VIRUSES OR OTHER POTENTIALLY HARMFUL CODE. NEITHER AdaptiveYou NOR ANY OF
 ITS SERVICE PROVIDERS SHALL BE DIRECTLY OR INDIRECTLY LIABLE FOR ANY 
DAMAGES, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL, DAMAGES OF ANY 
CHARACTER, INCLUDING, WITHOUT LIMITATION, CLAIMS ARISING FROM ANY USE OR
 INABILITY TO USE PRODUCTS OR SERVICES, MALFUNCTIONS OR DEFECTS IN THE 
SITE, LACK OF PRIVACY OR SECURITY IF USING THE SITE, FOR ANY DELAY IN OR
 LACK OF DELIVERY, FOR ANY LOSS OF PROFITS, DATA, OR BUSINESS, FOR USER 
OR ANY THIRD PARTY, AS PERMISSIBLE UNDER ALL APPLICABLE LAW. IF 
APPLICABLE LAW DOES NOT PERMIT SUCH AN EXCLUSION OF LIABILITY FOR 
INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, THE LIMITATION MAY NOT 
APPLY IN ITS ENTIRETY. USER IS NOT OBLIGATED TO ACCESS OR USE THE 
AdaptiveYou SITE. USER AGREES TO INDEMNIFY AND HOLD HARMLESS AdaptiveYou 
AND ITS SERVICE PROVIDERS FROM DAMAGES, AND NEITHER PARTY WILL BE LIABLE
 FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR ANY DAMAGES 
WHATSOEVER (INCLUDING, BUT NOT LIMITED TO, DAMAGE CAUSED BY LOST 
PROFITS, LOSS OF BUSINESS OPPORTUNITY, LOST DATA, COMPUTER VIRUSES, 
BUSINESS INTERRUPTION, LOST REVENUE, OR LOSS OF GOODWILL) FOR ANY CAUSE 
OF ACTION, WHETHER IN CONTRACT, TORT, STRICT LIABILITY, OR OTHERWISE, 
ARISING OUT OF OR RELATED TO THIS AGREEMENT IN NO EVENT SHALL AdaptiveYou
 BE LIABLE FOR DAMAGES IN EXCESS OF THE PRICE CHARGED TO USER FOR USER'S
 ORDER. THIS LIMITATION SHALL NOT APPLY TO DEATH OR PERSONAL INJURY TO 
THE EXTENT THAT APPLICABLE LAW PROHIBITS SUCH LIMITATION. AdaptiveYou 
RESERVES THE RIGHT TO CHANGE OR DISCONTINUE AT ANY TIME ANY ASPECT OR 
FEATURE OF THIS SITE.</p>
    	
    	<h3>Governing Law</h3>
    	<p>The Site is controlled and operated by AdaptiveYou in Washington 
County, Oregon, United States of America. AdaptiveYou makes no claim that
 the Site, its services, or products, are appropriate or accessible to 
other locations. User accesses the Site on her/his own initiative, 
accepts and agrees to be bound by the terms of the Agreement, the 
Privacy Notice, and submits to the jurisdiction and venue in the state 
or federal courts located in Oregon. This agreement shall be governed by
 the laws of the State of Oregon without giving effect to its conflicts 
of law principles. The provisions of this Agreement will be deemed 
severable, and the invalidity or unenforceability of any provision will 
not affect the validity or enforceability of any other provision. If 
AdaptiveYou initiates legal proceedings to collect any amount due 
hereunder and AdaptiveYou substantially prevails in such proceedings, 
then User agrees to pay AdaptiveYou's costs and reasonable attorneys' 
fees in such proceedings and any appeals. User waives any and all rights
 that she/he may have to a jury trial in connection with any proceedings
 concerning this Agreement.</p>
   	</div>
    </div>
</div>
<div style="display: none; top: 20px;" class="popup_wrapper privacy_policy">
<div class="popup_close popup_close_act"></div>
	<div class="popup_content">
     <h1>Privacy Policy</h1>
     <div class="popup_content_holder">     
 		<p>At AdaptiveYou Communications Inc. ("AdaptiveYou"), we are committed
 to protecting your privacy and to providing you an informative and 
secure online experience. You can travel through most of this web site 
(this "Site") without submitting any data about yourself. But sometimes 
we do need data to provide services and/or data that you request, and 
this statement of privacy (this "Privacy Policy") explains data 
collection and use practices of AdaptiveYou in those situations. Please 
read this Privacy Policy.</p>
 		<h3>Collecting your Personal data</h3>    
 		<p>We will ask you if we need data that personally identifies you 
("personal data") or allows us to contact you. Generally, this data is 
requested if you are registering before ordering e-mail newsletters, 
joining a limited-access premium site or Forums (see the definition in 
the Terms of Use), signing up for an event, or if purchasing and 
registering AdaptiveYou products and services. Personal data collected by
 this Site often is limited to first and last names, e-mail address, 
language, country or location, the company you work for and your 
position within this company but may include other data if needed to 
provide a service you requested.</p>
 		<p>If you buy and install a new product (if any offered for sale in 
this Site), we may ask you to register your purchase electronically. if 
you do, we keep this registration data on file with any data you've 
already given us on previous visits to this Site. This is considered 
your personal profile.
 		</p>
 		
 		<h3>Use of your Personal data</h3>
 		<p>We use your personal data for the following purposes:</p>    
 		<ul>
 			<li>To proceed with your subscription to a user account and to make 
this Site easier for you to use by not making you enter your personal 
data more than once.</li>
 			<li>To deliver services that you request or purchase.</li>
 			<li>To help you quickly find software, services or data on this Site.</li>
 			<li>To help us create and publish material most relevant to you.</li>
 			<li>To alert you to product upgrades, special offers, updated data and other new services from AdaptiveYou.</li>
 			<li>To enable us to proceed with your registration to an event organized by AdaptiveYou and/or its associates. </li>
 			<li>To correspond with you and/or to respond to your inquiries, request for data or any other message posted through this Site.</li>
 			<li>To send you newsletters, direct marketing data and to perform 
market research or surveys, unless if you have requested AdaptiveYou to 
not contact you for this purposes by clicking on the appropriate option 
or by editing our updating your personal profile.</li>
  		</ul>
  		
  		<p>By accepting the Terms of Use (this Privacy Policy being part of 
it), AdaptiveYou assumes that you have given your permission to collect 
and use your personal data as per this Privacy Policy.</p>
  		
  		<h3>Data Sharing</h3>
  		<p>We may provide and share your personal data to our affiliated 
companies, subsidiaries or business associates on a need to know basis 
to support us for the above usage purposes.</p>
  		<p>
		We also occasionally hire other companies to provide limited services 
on our behalf, including packaging, mailing and delivering purchases, 
answering customer questions about products or services, sending postal 
mail and processing event registration. We will only provide those 
companies the data they need to deliver the service, and they are 
prohibited from using that data for any other purpose.</p>
		<p>
		AdaptiveYou may disclose your personal data if required to do so by law
 or in the good faith belief that such action is necessary to: (a) 
conform to the edicts of the law or comply with legal process served on 
AdaptiveYou or this Site; (b) protect and defend the rights or property 
of AdaptiveYou, its affiliated companies or subsidiaries and its family 
of Web sites, or (c) act in urgent circumstances to protect the personal
 safety of users of AdaptiveYou, its Web sites, or the public.
		</p>
		<p>
		Whole or part of your personal data could be available to and could be
 collected by all other users in cases where data is shared with third 
party as a necessary or implied function of certain part of this Site or
 for certain services, for example, (a) posting comments within Forums 
(as this term is defined in the Terms of Use); or (b) attendance at 
conference, training sessions, seminar or any other events organized by 
AdaptiveYou or AdaptiveYou affiliated companies or subsidiaries (even if 
in partnership with AdaptiveYou business partners or suppliers).
		</p>
		<p>
		Your data may be stored and processed in the United States or any 
other country in which AdaptiveYou or its affiliates, subsidiaries or 
agents maintain facilities, and by using this Site, you consent to any 
such transfer of data outside of your country. AdaptiveYou abides by the 
safe harbor framework as set forth by the U.S. Department of Commerce 
regarding the collection, use, and retention of data from the European 
Union.
		</p>
		<p>
		In the event that AdaptiveYou moves or transfers whole or part of its 
business, your personal data collected through this Site could be 
transferred to the company acquiring such business unless you instruct 
AdaptiveYou not to do so.
		</p> 
		
		<h3>Control of your Personal data</h3> 	
		<p>If you register, or otherwise give us personal data, AdaptiveYou 
will not share that data with third parties without your permission, 
other than for the limited exceptions already listed. It will only be 
used for the purposes stated above. AdaptiveYou may send out periodic 
e-mails informing you of technical service issues related to a product 
or service you requested as they are essential to the use of the product
 or service.</p>
		
		<h3>Security of your Personal data</h3>	
		<p>This Site strictly protects the security of your personal data and 
honors your choices for its intended use. We carefully protect your data
 from loss, misuse, unauthorized access or disclosure, alteration, or 
destruction. Your personal data is never shared outside AdaptiveYou 
without your permission, except under conditions explained above. Inside
 AdaptiveYou, data is stored in password-controlled servers with limited 
access.
		</p>
		<p>
		You also have a significant role in protecting your data. As an 
example, no one can see or edit your personal data without knowing your 
password, so do not share this with others. If you believe that your 
password has been compromised, you should immediately change your 
password.
     	</p>
     	
     	<h3>Information Gathered Outside this Site</h3>
     	<p>AdaptiveYou may hire third parties to collect data or may 
purchase data from third parties. This may include renting e-mail 
address lists for use in e-mail campaigns. To the extent that your 
personal data at this Site is augmented through such measures, 
AdaptiveYou will provide the same security and management options as set 
forth herein for data collected within this Site.
</p><p>While travelling through this Site, you may happen upon links to 
third party websites (such as site of AdaptiveYou business associates); 
even though a connection might be made to such third party sites, 
AdaptiveYou is not responsible for their respective and own privacy 
policies.
</p>
<h3>Use of Cookies</h3>

<p>To ensure we are publishing material users need and want, this Site 
collects site-visitation statistics using cookies. We only use this data
 in composite form and only use site-visitation statistics for improving
 this site.
</p>
<p>
If someone visits this Site, a cookie is placed on the user's machine 
(if the user accepts cookies) or is read if the user has visited this 
Site previously.</p>
<p>
Web beacons, also known as clear gif technology, or action tags, assist 
in delivering the cookie. This technology tells us how many visitors 
clicked on key elements (such as links or graphics) on this Site. We do 
not use this technology to access your personally identifiable data on 
this Site; it is a tool we use to compile composite statistics about 
this Site usage. We may share composite site statistics with associate 
companies but do not allow other companies to place clear gifs on our 
sites.
</p>
<p>
If you choose to not have your browser accept cookies from this Site, 
you will be able to view the text on the screens, however you will not 
experience a personalized visit nor will you be able to subscribe to the
 service offerings on this Site.
</p>

<h3>Changes to this Privacy Policy</h3>
<p>
AdaptiveYou will occasionally update this Privacy Policy. For material 
changes to this Privacy Policy, AdaptiveYou will notify you by placing 
prominent notice on this Site.
</p>
<p>
Continued use of this Site implies your agreement of any changes to this Privacy Policy.
</p>
     </div>     
    </div>
</div>

<div style="height: 2290px; display: none;" id="backgroundPopup"></div>
<!-- <a href="#" style="position: fixed; right: 0px; top: 25%; display: block; z-index: 20000;" id="looptodo_feedback_btn"><img src="images/loop_feedback_btn.png" /></a> -->
</body>
</html>