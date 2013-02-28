<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import ="java.util.LinkedHashMap"%>  
<%@page import = "com.google.gson.Gson"%> 
<%@page import = "com.google.gson.GsonBuilder"
import="org.codehaus.jackson.map.ObjectMapper"
	import="org.codehaus.jackson.JsonGenerator"
	import="org.codehaus.jackson.JsonParser"
	import="org.codehaus.jackson.map.DeserializationConfig"
    import="org.codehaus.jackson.map.SerializationConfig"
    import="org.codehaus.jackson.map.annotate.JsonSerialize"
%>  
<%@page import = "com.acti.jdo.*"
import="java.util.HashMap"
import="org.apache.commons.collections.MultiHashMap"
import="org.apache.commons.collections.MultiMap"
import="java.util.*"
import="com.google.appengine.api.blobstore.BlobstoreServiceFactory"
import="com.google.appengine.api.blobstore.BlobstoreService"%> 
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>AdaptiveYou - User History</title>

   	<link rel="stylesheet" type="text/css" href="/css/reset.css" />
    <link rel="stylesheet" type="text/css" href="/css/style.css" />
    <link rel="stylesheet" type="text/css" href="/css/admin.css" />
    <link rel="stylesheet" type="text/css" href="/css/datepickerStyle.css" />
    <link rel="stylesheet" type="text/css" href="/colortip-1.0/colortip-1.0-jquery.css"/>
 	<link rel="stylesheet" type="text/css" href="../css/CustomStyle.css" />
    <script type="text/javascript" src="/js/jquery-1.6.2.min.js"></script>
    <script type="text/javascript" src="/js/datepickr.js"></script>
    <script type="text/javascript" src="../js/actions.js"></script>
    <script type="text/javascript" src="../js/commonFunctions.js"></script>
    
        
    <script type="text/javascript" src="/js/jquery.dataTables.js"></script>  
    <link rel="stylesheet" type="text/css" href="/css/demo_table.css" />
    <link rel="stylesheet" type="text/css" href="/css/demo_page.css" />
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,300'rel='stylesheet' type='text/css' ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/reset.css" ></link>
	<link rel="stylesheet" type="text/css" href="../css/feedback/loop_form.css?v=0-9-2012-8-3"></link>
    
      
      
      
        
        <script type="text/javascript">
    function cache()
    {
      <%   
       response.setHeader("Cache-Control","no-cache");   
       response.setHeader("Cache-Control","no-store");   
       response.setDateHeader("Expires", 0);   
       response.setHeader("Pragma","no-cache");
       %> 
    }
    </script>
       <script type="text/javascript">
      
    <%
    if(session.getAttribute("userProfileDetails")==null){
    	  response.sendRedirect("/");
    }
	    String emailId = "";
		emailId = (String) session.getAttribute("userEmailid");
		System.out.println("emailId ::"+emailId);
		String firstName = "";
		firstName = (String) session.getAttribute("userFirstName");
		System.out.println("firstName ::"+firstName);
		String lastName = "";
		lastName = (String) session.getAttribute("userLastName"); //userImage
		System.out.println("lastName ::"+lastName);
		String profileImage = "";
		profileImage = (String) session.getAttribute("userImage");
		System.out.println("profileImage ::"+profileImage);
    
		/* String transdetails = "{}";
	 	if(request.getAttribute("transactionLog") !=null)
		{
	 		
	 		String mapTransaction = (String)request.getAttribute("transactionLog");
		transdetails      =  mapTransaction;
			System.out.println("transdetails ::"+transdetails);
		} */
	 	String transdetails1 = "{}";
	 	if(request.getAttribute("transactionLog1") !=null)
		{
	 		/* LinkedHashMap<String,UserStuffInfo> mapTransaction  = (LinkedHashMap<String,UserStuffInfo>)request.getAttribute("transactionLog");
	 	Gson gsonLogoDetails =  new Gson();
	 	transdetails      =  gsonLogoDetails.toJson(mapTransaction);
		System.out.println("logoDetails ::"+transdetails); */
	 		String mapTransaction = (String)request.getAttribute("transactionLog1");
		transdetails1     =  mapTransaction;
			System.out.println("transdetails1 ::"+transdetails1);
		}
	 	String userbadges = "{}";
		if(request.getAttribute("badges_list") != null)
		{
			/* LinkedHashMap<String,BadgesList> userBadgeList = (LinkedHashMap<String,BadgesList>)request.getAttribute("badges_list");
		/* 	Gson gsonBadges			         =  new Gson();
			 userbadges      =  gsonBadges.toJson(userBadgeList); */
			
			/* ObjectMapper mapper = new ObjectMapper();
			mapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			mapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			userbadges = mapper.writeValueAsString(userBadgeList);
			System.out.println("userbadges ::"+userbadges); */ 
			String userBadgeList = (String)request.getAttribute("badges_list");
			userbadges      =  userBadgeList;
			System.out.println("teamManageUsers ::"+userbadges);
			
		}
		System.out.println("userbadges ::"+userbadges);
		
		String userInfo = "{}";
		if(request.getAttribute("user_list") != null)
		{
			/* LinkedHashMap<String,UserProfile> userInfoList = (LinkedHashMap<String,UserProfile>)request.getAttribute("user_list");
			ObjectMapper mapper = new ObjectMapper();
			mapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			mapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			userInfo = mapper.writeValueAsString(userInfoList);
			System.out.println("userInfo ::"+userInfo); */
			String userInfoList = (String)request.getAttribute("user_list");
			userInfo      =  userInfoList;
			System.out.println("userInfo ::"+userInfo);
		}
		System.out.println("userInfo ::"+userInfo);
		
		String pendingReqCount = "{}";
		 if(session.getAttribute("pendingReqCount") != null)
		 {
				pendingReqCount = (String)session.getAttribute("pendingReqCount");
				System.out.println("pendingReqCount ::"+pendingReqCount);
		 }
		 String requestURLFromFeedback 			= (String) request.getRequestURL().toString(); 
    %>
 <%--    var transdetails = <%=transdetails%>; --%>
    var transdetails1 			= <%=transdetails1%>;
    var count					= 0;
    for(index in transdetails1) {
    	count+=1;
    }
    var badgeDetails 			= <%=userbadges%>;
    var userDetails 			= <%=userInfo%>;
    var pendingReq 				= '<%= pendingReqCount%>';
    var pendingReqObj 			= JSON.parse(pendingReq);	
    var stuffCount 				= 0;
    var badgeCount 				= 0;
    var bannerCompanyName 		= '<%= (String)session.getAttribute("companyName") %>';
    var userEmail				= '<%= emailId%>';
    var userFirstName			= '<%=firstName %>';
    var userLastName			= '<%=lastName %>';
    var requestURL 				= '<%= requestURLFromFeedback%>';
    </script>
<script type="text/javascript" src="../js/feedback.js"></script>	
<script>
    $(document).ready(function() {
   /* function x(){ */
// 	   $('#company-name').html(bannerCompanyName);
	   stuffCount = pendingReqObj.stuffCount;
    		badgeCount = pendingReqObj.badgeCount;
    		//console.info("pendingReq badgeCount::"+pendingReqObj.badgeCount);
    		$('#pending_req_badge').html("Approve Badge Request ("+pendingReqObj.badgeCount+")"); 
    		$('#pending_req_stuff').html("Approve Stuff from Store ("+pendingReqObj.stuffCount+")"); 
   	var userTableHtml = "";
  	var trUserTable = "";
  	var userArray = new Array();
   		for(index in transdetails1)
   			{
	   			if(transdetails1[index].status.indexOf("approved") != -1)
	   			{
	   				/* if(userArray.indexOf(transdetails[index].dateAdded) != -1)
	   				{	 */
		   				userArray.push(transdetails1[index].dateAdded);
		   				//console.info(transdetails1[index].status);
		   				for(indexUser in userDetails)
	   					{
	   						if(indexUser.indexOf(transdetails1[index].userId) != -1)
	   							{
	   								//console.info("person name ::"+userDetails[indexUser].firstName);
	   								var personName = userDetails[indexUser].firstName + " " + userDetails[indexUser].lastName;
	   								//console.info(personName);
	   							}
	   					}
		   				for(indexBadge in badgeDetails)
		   					{
		   						if(indexBadge.indexOf(transdetails1[index].stuffid) != -1)
		   							{
		   								//console.info("badge Name ::"+badgeDetails[indexBadge].badgeName);
		   								//console.info("badgeValue ::"+badgeDetails[indexBadge].badgeValue);
		   								//console.info("dateAdded ::" + transdetails1[index].dateAdded);
		   								if(badgeDetails[indexBadge].badgeType.indexOf("badges") != -1 || badgeDetails[indexBadge].badgeType.indexOf("badge") != -1 ||badgeDetails[indexBadge].badgeType.indexOf("trophy") != -1)
		   									{
		   										var dateAssigned = new Date(transdetails1[index].dateAdded).toUTCString();
		   										trUserTable += '<tr><td width="1%">&nbsp;</td><td width="26%">'+personName+'</td><td width="12%">Earned</td><td width="20%">'+badgeDetails[indexBadge].badgeName+'</td>'
		   		                               +'<td width="15%">'+badgeDetails[indexBadge].badgeValue+'</td><td width="26%">'+dateAssigned+'</tr>';
		   									}
		   								else if(badgeDetails[indexBadge].badgeType.indexOf("item") != -1)
		   									{
		   									var dateAssigned = new Date(transdetails1[index].dateAdded);
		   									trUserTable += '<tr><td width="1%">&nbsp;</td><td width="26%">'+personName+'</td><td width="12%">Purchased</td><td width="20%">'+badgeDetails[indexBadge].badgeName+'</td>'
		   		                               +'<td width="15%">'+badgeDetails[indexBadge].badgeValue+'</td><td width="26%">'+dateAssigned+'</tr>';
		   									}
		   							}
		   					}
	   				/* } */
	   			}
   			}
   		/* if(transdetails[index][0] != null && transdetails[index][0] != undefined)
			{
			//console.info(transdetails[index].length);
			for(var i=0; i<transdetails[index].length;i++){
			//console.info(transdetails[index][0].userName);
   			userTableHtml += '<table cellpadding="0" cellspacing="0" border="0" width="100%">'+
                '<tbody id="transactions_tbody"><tr><td width="1%">&nbsp;</td> <td width="20%">'+transdetails[index][i].userName+'</td> <td width="20%">'+transdetails[index][i].userAction+'</td> <td width="20%">'+transdetails[index][i].itemName+'</td>'+
		         '<td width="19%">'+transdetails[index][i].points+'</td><td width="20%">'+transdetails[index][i].dateAdded+'</tr></tbody>';
			}
			} */
// 			userTableHtml = '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>'+trUserTable+' </tbody></table>';
   		$('#transactions_tbody').html(trUserTable);
   		$('#userName').html("Welcome, <%= firstName%> <%= lastName%>");
   /* 	} */
   
   	   $('#allvalues').click(function(){
   	   	var userTableHtml = "";
   	  	var trUserTable = "";
   	    for(index in transdetails1)
   	   {
   	      if(transdetails1[index].status.indexOf("approved") != -1)
   	      {
   	        userArray.push(transdetails1[index].dateAdded);
   	        //console.info(transdetails1[index].status);
   	        for(indexUser in userDetails)
   	        {
   	         if(indexUser.indexOf(transdetails1[index].userId) != -1)
   	          {
   	           //console.info("person name ::"+userDetails[indexUser].firstName);
   	           var personName = userDetails[indexUser].firstName + " " + userDetails[indexUser].lastName;
   	          }
   	        }
   	        for(indexBadge in badgeDetails)
   	         {
   	          if(indexBadge.indexOf(transdetails1[index].stuffid) != -1)
   	           {
   	            //console.info("badge Name ::"+badgeDetails[indexBadge].badgeName);
   	            //console.info("badgeValue ::"+badgeDetails[indexBadge].badgeValue);
   	            //console.info("dateAdded ::" + transdetails1[index].dateAdded);
   	            if(badgeDetails[indexBadge].badgeType.indexOf("badges") != -1 || badgeDetails[indexBadge].badgeType.indexOf("badge") != -1 ||badgeDetails[indexBadge].badgeType.indexOf("trophy") != -1)
   	             {
   	              var dateAssigned = new Date(transdetails1[index].dateAdded).toUTCString();
   	              trUserTable += '<tr><td width="1%">&nbsp;</td><td width="20%">'+personName+'</td><td width="20%">Earned</td><td width="20%">'+badgeDetails[indexBadge].badgeName+'</td>'
   	                                     +'<td width="19%">'+badgeDetails[indexBadge].badgeValue+'</td><td width="20%">'+dateAssigned+'</tr>';
   	             }
   	            else if(badgeDetails[indexBadge].badgeType.indexOf("item") != -1)
   	             {
   	             var dateAssigned = new Date(transdetails1[index].dateAdded);
   	             trUserTable += '<tr><td width="1%">&nbsp;</td><td width="20%">'+personName+'</td><td width="20%">Purchased</td><td width="20%">'+badgeDetails[indexBadge].badgeName+'</td>'
   	                                     +'<td width="19%">'+badgeDetails[indexBadge].badgeValue+'</td><td width="20%">'+dateAssigned+'</tr>';
   	             }
   	           }
   	         }
   	      }
   	   }
//    	  userTableHtml = '<table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>'+trUserTable+' </tbody></table>';
   	  $('#transactions_tbody').html(trUserTable);
   	   
   	   });
   
    }); 
    </script>
    
    <!-- Viswanath: Code for datepicker start. -->
<script type="text/javascript">
    function getvalue() {
    
    	var id1 = document.getElementById("datepick").value;
    	//console.info("id1 ::"+id1);
    	var id2 = document.getElementById("datepick1").value;
    	//console.info("id2 ::"+id2);
     	var temp1 = new Array();
    	var temp2 = new Array();
    	var Datadate = new Array();
    	temp1 = id1.split('-');
    	temp2 = id2.split('-');  
    	
    	var count=0;
    	//console.info("temp1[1] temp1[0] temp1[2] ::"+temp1[1]+"-" + temp1[0]+"-" + temp1[2]);
    	fdate=new Date(temp1[2],temp1[1]-1,temp1[0]);

    	tdate=new Date(temp2[2],temp2[1]-1,temp2[0],11,59,59,00); //+" 11:59:59 PM"
    	//console.info("tdate is"+tdate);
    	
    	tdate.setDate(tdate.getDate()+1);
    	 //console.info(fdate+"This is the fdate");
    	//console.info(tdate+"This is the tdate");   

    	//console.info(tdate+" tdate This is the t1date");
    	for(index in transdetails1){
    	Datadate[index]=new Date(transdetails1[index].dateAdded);    	
    	} 
    	var datevalidflag=1;
    	var userTableHtml = "";
	  	var trUserTable = "";
	  	var userArray = new Array();
     	//console.info("fdate ::"+fdate);
     	//console.info("tdate ::"+tdate);
 		if (fdate <= tdate){
    	            for(index in transdetails1){
    						if(Datadate[index]>=fdate && Datadate[index]<=tdate)
    							{
    							count++;
    				    		if(transdetails1[index].status.indexOf("approved") != -1)
    			    					{    			    			   					
    			    				   	userArray.push(transdetails1[index].dateAdded);
    			    				   	for(indexUser in userDetails)
    			    			   			{
    			    			   			if(indexUser.indexOf(transdetails1[index].userId) != -1)
    			    			   				{
    			    			   				var personName = userDetails[indexUser].firstName + " " + userDetails[indexUser].lastName;
    			    			   				}
    			    			   			}
    			    					for(indexBadge in badgeDetails)
    				   					{
    				   						if(indexBadge.indexOf(transdetails1[index].stuffid) != -1)
    				   							{
    				   								//console.info("badge Name ::"+badgeDetails[indexBadge].badgeName);
    				   								//console.info("badgeValue ::"+badgeDetails[indexBadge].badgeValue);
    				   								//console.info("dateAdded ::" + transdetails1[index].dateAdded);
    				   								if(badgeDetails[indexBadge].badgeType.indexOf("badges") != -1 || badgeDetails[indexBadge].badgeType.indexOf("badge") != -1 ||badgeDetails[indexBadge].badgeType.indexOf("trophy") != -1)
    				   									{
    				   										var dateAssigned = new Date(transdetails1[index].dateAdded).toUTCString();
    				   										trUserTable += '<tr><td width="1%">&nbsp;</td><td width="20%">'+personName+'</td><td width="20%">Earned</td><td width="20%">'+badgeDetails[indexBadge].badgeName+'</td>'
    				   		                               +'<td width="19%">'+badgeDetails[indexBadge].badgeValue+'</td><td width="20%">'+dateAssigned+'</tr>';
    				   									}
    				   								else if(badgeDetails[indexBadge].badgeType.indexOf("item") != -1)
    				   									{
    				   									var dateAssigned = new Date(transdetails1[index].dateAdded);
    				   									trUserTable += '<tr><td width="1%">&nbsp;</td><td width="20%">'+personName+'</td><td width="20%">Purchased</td><td width="20%">'+badgeDetails[indexBadge].badgeName+'</td>'
    				   		                               +'<td width="19%">'+badgeDetails[indexBadge].badgeValue+'</td><td width="20%">'+dateAssigned+'</tr>';
    				   									}
    				   							}
    				   					}   			    			   				
    			    			   		}    			    		   			
    			    		   		
//     			    				userTableHtml = '<table id="resultsorder" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>'+trUserTable+' </tbody></table>';
    			    		   		$('#transactions_tbody').html(trUserTable);
    			    		   		$('#userName').html("Welcome, <%= firstName%> <%= lastName%>");
				}
			}
		} else {
			
			if((String(id1) != "" && id1 != null) || (String(id2) != "" && id2 != null))
			{
				datevalidflag=0;
				$("#voice-box").fadeIn();
				document.getElementById("statusMessage").innerHTML = "This is an Invaid date.!";	
				document.getElementById("voice-box").setAttribute("status", "saved");
				setTimeout("hideStatusMessage()", 1750);
			}
			else
			{
				datevalidflag=0;
				$("#voice-box").fadeIn();
				document.getElementById("statusMessage").innerHTML = "Please select from and to date.!";	
				document.getElementById("voice-box").setAttribute("status", "saved");
				setTimeout("hideStatusMessage()", 1750);
			}	
			
			//alert("This is an Invaid date.!");
			datevalidflag=0;
			$("#voice-box").fadeIn();
			document.getElementById("statusMessage").innerHTML = "This is an Invaid date.!";	
			document.getElementById("voice-box").setAttribute("status", "saved");
			setTimeout("hideStatusMessage()", 1750);
			
		}
 		//console.info(count );
 		if(count===0 && datevalidflag!=0){
 			trUserTable += '<tr><td width="1%">&nbsp;</td><td width="20%">'+""+'</td><td width="20%">Purchased</td><td width="20%">'+""+'</td>'
               +'<td width="19%">'+""+'</td><td width="20%">'+""+'</tr>';	
 		userTableHtml = '<table id="resultsorder" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody>'+""+' </tbody></table>';
   		$('#transactions').html(userTableHtml);
   		$('#userName').html("Welcome, <%= firstName%> <%= lastName%>");
   		 $("#voice-box").fadeIn();
		document.getElementById("statusMessage").innerHTML = "No data found!";	
		document.getElementById("voice-box").setAttribute("status", "saved");
		setTimeout("hideStatusMessage()", 1750); 
 		}
	}
</script>
<script  type="text/javascript">
		function hideStatusMessage()
		  {
				if(document.getElementById("voice-box").getAttribute("status") == "saved")
				{
					$("#voice-box").fadeOut(300);
				}
		  }
		</script>
<!-- Viswanath: Code for the datepicker end. -->

<!-- Vali Shah: Code For DataTable Start -->

  <script type="text/javascript">
      
      $(document).ready(function() {
    	  
    	  		$("#table").dataTable({
    		  		
    	  			"sPaginationType": "full_numbers",
    		   		"sScrollY": "450px"
    	      
    	 				 } )
    	
    	  		
    	
     		 } );

     </script>

<!-- Vali Shah: Code For DataTable End... -->

</head>
<body onload="cache()">
<div id="voice-box" style="display: none;">
<p><span id="statusMessage">Saving changes...</span></p>
</div>
<div class="wrapper">
		<div id="login_details">
			<ul class="right_nav_holder">
				<li id="userName"></li> 
				<li id="account_menu"><a href="#">My Account</a>
					<ul>
<!-- 						<li id="my_details" onclick="openwin();"><a href="#">My Details &raquo;<span>Username/password</span></a></li> -->
						<li id="sign_out"><a href="/logout">Sign Out &raquo;<span>See you soon!</span></a></li>
					</ul>
				</li>
			</ul>
		</div> <!-- login_details -->
    <div id="header" class="admin_header">
 				<div class="header_holder">
 					<div id="company-name"><%= (String)session.getAttribute("companyName") %></div>
 					<div id="header_nav_holder">
                            <div class="tab_nav_holder">
                                <ul class="nav_list">
                                    <li class="selected"><a href="#">Admin</a></li>
                                    <li><a href="/others">Others</a></li>
                                    <li><a href="/persistUser">Me</a></li>
                                 </ul>
                             <div class="clear_all"></div>
                            </div> <!-- tab_nav_holder -->  
               </div>  <!-- header_nav_holder -->                           
            </div>  <!-- header_holder -->
    </div> <!-- header -->
    
    <div id="admin_panel" class="admin-content-wrapper">
    	<ul class="admin_left_panel">
        	<li class="selected"><a href="/displayAllTransactions">User History</a></li>
        	<li><a href="/addNewBadge">Manage Badges</a></li>
        	<li><a href="/addstuff">Manage Store</a></li>
        	<li ><a href="/manageTeam">Manage Teams / Groups</a></li>
        	<li><a href="/admin">Issue Badges</a></li>
        	<li><a id= "pending_req_badge" href="/approveBadge">Approve Badge Request</a></li>
        	<li><a id= "pending_req_stuff" href="/allStuffDetails">Approve Stuff from Store</a></li>
        </ul>
    	<div class="admin_right_pannel">
        	<div class="user_history_cont">
            	<h2>User History</h2>
            
            	<div class="mid-menus">        
            	             <span>From date:
					            	 <input id="datepick" class="date-pick" /> 
					            	  To date: 
					            	 <input id="datepick1" class="date-pick" />
			            	 </span>
			            	 
							<button type="submit" class="grn_btn2 add_vlink add_vlink_act" onclick="getvalue()">Get Details!</button>
										
							<button type="button" class="grn_btn2 add_vlink add_vlink_act" id="allvalues">All Details!</button>
										
			   </div>
				<script type="text/javascript">
					       new datepickr('datepick', { dateFormat: 'd-m-Y' });
					        new datepickr('datepick1', { dateFormat: 'd-m-Y' });
				 </script>
				 
<!-- Vali Shah: Code For DataTable Start -->
			
		
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="table_head" id="table" style="padding-right:15px;">
                    <thead>
                        <tr>
                        	<th style=" background-image:none;" width="1%">&nbsp;</th>
                            <th width="20%">Name</th>
                            <th width="20%">Action</th>
                            <th width="20%">Item</th>
                            <th width="5%">Points</th>
                            <th width="34%">Date</th>
                        </tr>
                    </thead>
                    
                    
<!--             	</table> -->
            	   
<!--                 <div class="table_body" id="transactions"> -->
<!--                    <table cellpadding="0" cellspacing="0" border="0" width="100%"> -->
                   
                        <tbody id="transactions_tbody">
                        <tr>
                       			 <td width="1%">&nbsp;</td>
                                <td width="20%">Kevin</td>
                                <td width="20%">Earned</td>
                                <td width="20%">SetMore Badge</td>
                                <td width="5%">50</td>
                                <td width="34%">2. March. 2012</td>
                                </tr>
                        </tbody> 
<!--                 </div> -->
<!--             </div>user_history_cont -->
</table>

<!-- Vali Shah: Code For DataTable Start -->

        </div>
    </div> <!--content-wrapper -->
    
</div> <!-- wrapper -->
<div id="backgroundPopup" style="z-index:99999"></div>
<%@ include file="/jsp/feedbackLoopTodo.jsp" %>

    
</body>
</html>
