<style>
	#voice-box {
	  position: fixed;
	  margin: 0 auto;
	  top: 0;
	  z-index:999999;
	  text-align: center;
	  left : 45%;
	  display:none;
	}
	
	#voice-box span { 
	 background:#fffed5;
	 font-size: 12px;
	 color: #000;
	 font-weight: bold;
	 padding: 10px 12px 3px 12px;
	 line-height: 26px;
	 border: solid 1px #cfcd59;
	 border-radius:0px 0px 5px 5px
	 
	}
</style>

<!--  Start fixed navbar --> 

<div id="voice-box" style="display: none;">
		<p>
			<span id="statusMessage">Saving changes...</span>
		</p>
	</div>
    <div class="navbar navbar-fixed-top navbar-inverse">
      <div class="navbar-inner">
        <div class="container-fluid">
        
<!--  Start dropdown U picker menu -->      
    		<div class="u-picker">
  	        <div class="btn-group pull-left">
  	          <button class="btn btn-large btn-inverse">Adaptive U</button>
  		        <button class="btn btn-large dropdown-toggle btn-inverse" data-toggle="dropdown"><span class="caret"></span></button>
  		        <ul class="dropdown-menu">
  		          <li><a href="#">Adaptive U</a></li>
  		          <li><a href="#">Cobalt Inc. U</a></li>
  		          <li><a href="#">SetMore U</a></li>
  		          <li class="divider"></li>
  		          <li><a href="#">Browse Universities...</a></li>
  		        </ul>
  		      </div>
  	      </div>
<!--  End dropdown U picker menu --> 	
        
          <div class="nav-collapse">
          
<!--  Start nav menu -->                 
            <ul class="nav">
              <li id="me_page" class="active">
                <a  href="/persistUser">
  				Me
                </a>
              </li>
              <li id="others_page">
                <a  href="/others">
              	Everyone
                </a>
              </li>
              <li id="earnBadges_page" class="">
                <a  href="/earnBadges">
                  Challenges
                </a>
              </li>
              <li>
                <a href="degrees.html">
                  Degrees
                </a>
              </li>
              <li>
                <a href="/store">
                  Store
                </a>
              </li>
            </ul>
<!--  End nav menu -->                   
  
<!--  Start Support - My Account -->                  
            <ul class="nav pull-right">
              <li><a href="#">Support</a></li>
              <li class="dropdown">
                <a href="#" class="user_email_id dropdown-toggle" data-toggle="dropdown"><b class="caret"></b></a>
                <ul class="dropdown-menu">
                  <li>
                  	<!-- Button to trigger modal -->
                  	<a href="#myModal" data-toggle="modal"><i class="icon-user"></i> My Account</a>                                
                  </li>
  				<li class="divider"></li>
                  <li><a href="/logout"><i class="icon-off"></i> Sign Out</a></li>
                </ul>
              </li>
            </ul>
<!--  End Support - My Account -->                   
         	</div><!--  End nav-collapse -->  
        </div><!-- End container-fluid -->
      </div><!-- End navbar-inner -->
    </div><!-- End navbar -->        
<!--  End fixed navbar -->   
<script type="text/javascript">
function makeCurrentTabActive()
{
	url	=	window.location.href;
	$(".nav > li > a").each(function(index, elem){
		link	=	$(this).attr("href");
		if(url.indexOf(link) != -1)
		{
			$(this).attr("href" , "javascript:void(0)");
			$(this).parent().addClass("active");
		}
		else
			{
			$(this).parent().removeClass("active");
			}
	});
}

function buildHeaderCompanyList()
{
	console.log(singleUserProfile);
	var buildCompanyList = '<div class="btn-group pull-left">'+
	
      '<button class="btn btn-large btn-inverse">'+singleUserProfile[userKey].companyName+'</button>'+
        '<button data-toggle="dropdown" class="btn btn-large dropdown-toggle btn-inverse"><span class="caret"></span></button>'+
        '<ul class="dropdown-menu">';
        for(index in companyList)
        	{
        		buildCompanyList += '<li><a onClick="changeCompany(\''+index+'\');"><span>'+companyList[index]+'<span></a></li>';
        	}
        buildCompanyList +='</ul> </div>';
        $('.u-picker').html(buildCompanyList);
}
function changeCompany(keyIndex)
{
   window.location.href="/intermediateCheck?companyKey="+keyIndex;
}

function hideStatusMessage()
{
	if(document.getElementById("voice-box").getAttribute("status") == "saved")
	{
		$("#voice-box").fadeOut(300);
	}
}

	buildHeaderCompanyList();
	makeCurrentTabActive();
</script>
