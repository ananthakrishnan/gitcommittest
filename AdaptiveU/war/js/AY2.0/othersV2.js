	//Added for case sensitive search
	$.extend($.expr[':'], {
	'containsi': function (elem, i, match, array) {
	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
	});
	
	//Added for sorting the list
	jQuery.fn.sort = function() {
    return this.pushStack( [].sort.apply( this, arguments ), []);
	}; 

$(document).ready(function() 
{
	//build Groups
	var buildGroupOthers = '<ul class="nav nav-pills team_names nav-stacked">'+
            '<li class="list-header">'+
            	'<h3>'+
              		'<i class="icon-group"></i> Everyone'+
            	'</h3>'+
           ' </li>'+
            '<li class="clearfix search-li">'+
            	'<form class="navbar-search pull-left">'+
            	  '<input id="search_cus" type="text" placeholder="Find a person ..." class="search-query"  onkeyup="searchCustomer()" onfocus="blank(this)" onblur="unblank(this)">'+
            	'</form>'+
            '</li>';
	var allTeamId = "";
	var allTeamLi = "";
	for(indexGroups in teamManageUser)
		{
		 	if(teamManageUser[indexGroups].teamName.indexOf("AllTeam") != -1)
		 		{
		 		allTeamId = indexGroups;
		 			var teamMembers = new Array();
		 			if(String(teamManageUser[indexGroups].teamMembers).indexOf(",") != -1)
		 				teamMembers = String(teamManageUser[indexGroups].teamMembers).split(",");
		 			else if(teamManageUser[indexGroups].teamMembers && teamManageUser[indexGroups].teamMembers != null && teamManageUser[indexGroups].teamMembers != "null")
		 				teamMembers.push(teamManageUser[indexGroups].teamMembers);
		 			allTeamLi +=  '<li id="'+indexGroups+'" class="active allTeam" onclick="buildTeamUsersAccToTeamId(this.id)">'+
			            '<a href="#">'+
			            'All Groups'+
			            '<span class="pull-right label-default">'+teamMembers.length+'</span>'+
			         ' </a>'+
			        '</li>';
		 		}
		 	else 
		 		{
			 		var teamMembers = new Array();
		 			if(String(teamManageUser[indexGroups].teamMembers).indexOf(",") != -1)
		 				teamMembers = String(teamManageUser[indexGroups].teamMembers).split(",");
		 			else if(teamManageUser[indexGroups].teamMembers && teamManageUser[indexGroups].teamMembers != null && teamManageUser[indexGroups].teamMembers != "null")
		 				teamMembers.push(teamManageUser[indexGroups].teamMembers);
					buildGroupOthers +=  '<li id="'+indexGroups+'" class="otherTeams" onclick="buildTeamUsersAccToTeamId(this.id)">'+
			            '<a href="#">'+
			            ''+teamManageUser[indexGroups].teamName+''+
			            '<span class="pull-right label-default">'+teamMembers.length+'</span>'+
			         ' </a>'+
			        '</li>';
		 		}
		}
	buildGroupOthers += '</ul>';
	$('#groups').html(buildGroupOthers+'</ul>');
	$('.team_names li:eq(1)').after(allTeamLi);
	buildTeamUsersAccToTeamId(allTeamId);
	
	
});
function buildTeamUsersAccToTeamId(teamId)
{
	//var teamId = $(teamInfo).attr('id');
	$('.team_names').children().each(function(){
		 var kid = $(this);
		
		 if(kid.attr('id') != undefined && kid.attr('id') != "")
			 {
				 if(kid.hasClass('active'))
					 kid.removeClass('active');
			 }
	});
	
	$('#'+teamId).addClass('active');
	
	$('#others_list').html("");
	var buildOthersList = "";
	
	for(indexTeamUserInfo in teamManageUser)
		{
		if(indexTeamUserInfo.indexOf(teamId) != -1)
		for(indexUserBadgeLogJdo in userBadgeLogJdoMap)
			{
				if(String(teamManageUser[indexTeamUserInfo].teamMembers).indexOf(String(userBadgeLogJdoMap[indexUserBadgeLogJdo].userId)) != -1)
					{
					for(indexUserProfile in userProfileMap)
						{
							if(indexUserProfile.indexOf(userBadgeLogJdoMap[indexUserBadgeLogJdo].userId) != -1)
								{
									var badgesArray = new Array();
									if(String(userBadgeLogJdoMap[indexUserBadgeLogJdo].badgeId).indexOf(",") != -1)
										{
											badgesArray = String(userBadgeLogJdoMap[indexUserBadgeLogJdo].badgeId).split(",");
										}
									else if(String(userBadgeLogJdoMap[indexUserBadgeLogJdo].badgeId) != "" && String(userBadgeLogJdoMap[indexUserBadgeLogJdo].badges) != null && String(userBadgeLogJdoMap[indexUserBadgeLogJdo].badges) != "null")
										{
											badgesArray.push(userBadgeLogJdoMap[indexUserBadgeLogJdo].badgeId);
										}
										buildOthersList += '<tr id="'+indexUserProfile+'"class="person-listing">'+
									          '<td width="15%">'+
									          	'<img style="height:100px;width:100px;" class="user-photo" src="'+userProfileMap[indexUserProfile].profilePicture+'">'+
									         ' </td>'+
									         ' <td width="46%">'+
									         ' 	<h3><a class="other_name" href="#">'+userProfileMap[indexUserProfile].firstName+'  '+userProfileMap[indexUserProfile].lastName+'</a></h3>'+
									          	'<ul class="user-stats">'+
									          		'<li id="points"><i class="coin-small"></i>'+userBadgeLogJdoMap[indexUserBadgeLogJdo].points+'</li>'+
									          		'<li><i class="icon-certificate"></i> '+badgesArray.length+' Badges</li>'+
									          	'</ul>'+
									          '</td>';
										var badgesCount = 0;
										for(indexBadgesList in badgeDetails)
											{
												if(String(badgesArray).indexOf(indexBadgesList) != -1 && badgesCount < 3)
													{
														buildOthersList +='<td class="badge_image" width="12%">'+
													          	'<img class="pull-left" style="height:80px;width:80px;" src="'+badgeDetails[indexBadgesList].badgeLogoPath+'">'+
													          	'<div class="label label-plain">'+badgeDetails[indexBadgesList].badgeName+'</div>'+
													         ' </td>';
														badgesCount = badgesCount + 1;
													}
											}
										if(badgesCount < 3)
										{
											for(var badgeI=badgesCount;badgeI<3;badgeI++)
												{
													buildOthersList +='<td width="12%"></td>';	
												}
										}
										if(badgesArray.length == 0)
											{
												for(var i=0;i<3;i++)
												buildOthersList +='<td width="12%"></td>';	
											}
								}
						}
					}
			}
		}	
	
	$('#others_list').html(buildOthersList);
		
	bindClickEvents();
	sortByPoints();
}

function searchCustomer() //Changed for new design
{
	$('.allTeam').removeClass('active');
	$('.otherTeams').removeClass('active');
	var searchId = document.getElementById("search_cus").value;
	$("tr.person-listing").hide();
	var toShow = $("tr.person-listing").find("a:containsi('"+searchId+"')").parents()[2];
	$(toShow).show();
	if(searchId == "")
		{
			$("tr.person-listing").show();
			$('.allTeam').addClass('active');
		}
		
}
function blank(blankText)
	{
		$('#search_cus').val(""); 		
	}
	function unblank(blankText)
	{
		$("tr.person-listing").show();
		$('#search_cus').val("Find a person..."); 		
	}


	
function bindClickEvents()
{

 	$("#sort_by_points").bind("click",function()
 		{
 		sortByPoints();
 	});

 	$("#sort_by_name").bind("click",function(){
 		
 			var mylist 				= $('#others_list > tr');
 		    var listitems 			= mylist.find('a.other_name');
 		    console.log(listitems);
 		    listitems.sort(function(a, b) {
 		    	var compA = parseInt($(a).text());
 	    		var compB = parseInt($(b).text());
 	    	    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
 		    });
 		    $.each(listitems, function(idx, itm) {$('#others_list').append($(itm).parent().parent().parent()); });
 		
 	});
 	
}
function sortByPoints()
{
	var mylist 				= $('#others_list > tr');
	    var listitems 			= mylist.find('li#points');
	    
	    listitems.sort(function(a, b) {
	    var compA = (String($(a).text()).toLowerCase());
	    console.log("compA ::"+compA);
 		var compB = (String($(b).text()).toLowerCase());
 		console.log("compB ::"+compB);
 	    return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
	    });
	    
	    $.each(listitems, function(idx, itm) 
	    		{ 
	    		$('#others_list').append($(itm).parent().parent().parent()); 
	    	});
}
