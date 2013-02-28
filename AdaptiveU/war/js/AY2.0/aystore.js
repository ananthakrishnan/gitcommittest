var userPoints 		= "";
$(document).ready(function() 
{
	var userImage		= "";
	var userEmailId		= "";
	var itemsCount      =  0;
	for(indexUserBadgeLogJdoMap in userBadgeLogJdoMap)
		{
			for(indexUserDetails in userDetails)
				{
					if(userBadgeLogJdoMap[indexUserBadgeLogJdoMap].userId.indexOf(indexUserDetails) != -1)
						{
							userPoints = userBadgeLogJdoMap[indexUserBadgeLogJdoMap].points;
							userImage  = userDetails[indexUserDetails].profilePicture;
							userKey	   = indexUserDetails;
							userEmailId= userDetails[indexUserDetails].userName;
						}
				}
		}
	
	$('.user_email_id').html(userEmailId);
	$('#userspoints').html('<i class="coin-large"></i>'+userPoints);
	var storeItemsTableBody="";
	for(index in badgesListMap)
	{
		if(badgesListMap[index].badgeType ==="item")
		{
			 itemsCount =itemsCount+1;
		     storeItemsTableBody ='<tr class="person-listing"><td width="20%"><img src="'+badgesListMap[index].badgeLogoPath+'"class="store-photo" /></td>'
							+'<td width="50%"><h3>'+badgesListMap[index].badgeName+'</h3><p>'+badgesListMap[index].badgeDiscription.value+' </p></td>'
							+'<td width="30%" class="price-col"><div class="price-well"><h3 style="text-align: center;"><i class="coin-small"></i>'+badgesListMap[index].badgeValue+'</h3><a style="text-align: center;" class="btn btn-green btn-large block" id="'+badgesListMap[index].key+'" onclick="buyStuff(\''+badgesListMap[index].key+'\' )">Buy It!</a><div class="clearfix"></div></div></td></tr>';
		}
	}
	$('#storeItemsList').html(storeItemsTableBody);
	$('#itemscount').html(itemsCount);
});

function buyStuff(id)
{
	var stuffid 							= id;
	var points 								= badgesListMap[id].badgeValue;
	var totalpoints 						= userPoints;
	
	var status								= true;
	
	for(indexUserStatusDetails in userstatusdetails)
	{
		if(String(userstatusdetails[indexUserStatusDetails].userId).indexOf(userKey) != -1 && String(userstatusdetails[indexUserStatusDetails].stuffid).indexOf(stuffid) != -1 && String(userstatusdetails[indexUserStatusDetails].status).indexOf("purchased") != -1)
		{
					status = confirm('Do you really want to purchase this stuff again?');
					break;
		}
	}
	
	if(status)
		{
			if(parseInt(totalpoints) >= parseInt(points))
			{
				if(parseInt(badgesListMap[stuffid].quantity) > 0 || String(badgesListMap[stuffid].quantity) === "-1")
				{
					var uniqueUserKey				= "";
			
					for(indexingUserBadgeLog in userBadgeLogJdoMap)
					{
						if(userBadgeLogJdoMap[indexingUserBadgeLog].userId === userKey)
						{
							uniqueUserKey 			= userBadgeLogJdoMap[indexingUserBadgeLog].key;
						}	
					}
					try
					{
						$.ajax({
							type: 'POST', 
							url: '/editUserStuffList',
							data:"points="+points+ "&uniqueUserKey="+uniqueUserKey+"&stuffId="+stuffid, 
							success: function(data)
									{ 
										var previousPoints = $('#userspoints').html();
										previousPoints = previousPoints.replace('<i class="coin-large"></i>','');
										$('#userspoints').html('<i class="coin-large"></i>' + (previousPoints - points));
										if(String(badgesListMap[stuffid].quantity) != "-1")
										{
											badgesListMap[stuffid].quantity 	= parseInt(badgesListMap[stuffid].quantity) - 1;
										}	
										alert('Thanks for buying this stuff. An admin will soon get in touch with you regarding your request.');
									}
							}); 
						jQuery._uuidlet= (((1+Math.random())*0x10000)|0).toString(16).substring(1)+new Date().getTime();
						var userStatusDetailsKey = jQuery._uuidlet;
						var userNewStuffRequest = new Object();
						$.ajax
						({
							type: 'POST', 
							url: '/makeRequestForStuff' ,
							data:"stuffid="+stuffid+"&points="+points+ "&userKey="+userKey+"&uniqueUserKey="+userStatusDetailsKey, 
							success: function(data)
							{
								var now = new Date();
								userNewStuffRequest.key 	          = userStatusDetailsKey;
								userNewStuffRequest.dateAdded 		  = now;
								userNewStuffRequest.status	  		  = "purchased";
								userNewStuffRequest.typeRequested	  = "stuff";
								userNewStuffRequest.userId			  = userKey;
								userNewStuffRequest.stuffid			  = stuffid;
								
								userstatusdetails[userStatusDetailsKey] = userNewStuffRequest;
							}
					  	 });
					}
					catch(e)
					{
					}
				}	
				else
				{
					alert('Sorry, We have received maximum requests for this Stuff...')
				}	
			}
		
			else
			{
				alert('Sorry, to get this stuff you need to earn some more points...');
			}
		}
}