<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link type="text/css" rel="stylesheet" href="../css/defaultstyle.css" />
<link type="text/css" rel="stylesheet" href="../css/defaultstyle1.css" />	
<link type="text/css" rel="stylesheet" href="../css/defaultstyle2.css" />	
<link rel="icon" type="image/x-icon" href="../images/favicon.ico" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800' rel='stylesheet' type='text/css'>
<script type="text/javascript" src="/js/jquery-1.6.2.min.js"></script>

<title>AdaptiveYou - <%=session.getAttribute("remoteBadgeName") %></title>




<script type="text/javascript">



$(".request_access").live("click",function(){
	
	$.ajax({
			type		: 	'POST',
			url			: 	'/postUserRequest',
			dataType	: 	'html',
			success		: 	function(data)
							{
// 								clearConsole();
								if(data)
								{
									$(".prior_to_request").html(data);
									
								}
						  	},
			error		:	function()
							{
// 								clearConsole();
							},
	});
	
});

// $("#logout_trigger").live("click",function(){
	
// 	var windowid = window.open('https://accounts.google.com/Logout', '_blank');
	
// 	$.ajax({
		
// 		type: 'POST',
// 		url:'/sessionKiller',
// 		success:function()
// 				{
// 					location.reload();
// 				}
// 	});
	
	
// });


function clearConsole()
{
	 var browsername = navigator.userAgent;
	 if( browsername.indexOf("Firefox")!=-1)
	 {
		 clear();
	 }
// 	 else if (browsername.indexOf("Chrome") != -1) 
// 	 {
// 		 console.clear();
// 	 }
}


</script>
</head>

<body>
    <div class="header_wrapper">
    	<div id="header">
	    	<a href="index.html" class="logo"></a> <!--- logo --->        </div>
    </div> <!--- header_wrapper --->
    
    <div class="clear_all"></div>
        <div class="ntSupport_cont">
        
        <div class="prior_to_request">
            <h2>Hey my friend! You need privilege to access this...</h2>
            <p>You are currently signed in as <%=session.getAttribute("userEmailId") %>. You don't have enough permission to access this content with this id.</p>
            <p>You can request access from one of the admins.</p>
            <input type="button" value="Request Access" class="request_access" />
            
        </div>    
       
            
        </div><!--- ntSupport_cont --->
<!--          <a class="sign_in_as_style" id ="logout_trigger">Signin as different user</a> -->
       
</body>
</html>
