var badgeIdForDeletingInGroups = "";
var groupIdForDeletingInGroups = "";
function group_badge_function(groupName) {
	group_function(groupName)
	function group_function() {
		groupedIds = $('input:checkbox:checked.badge_group').map(function() {
			return this.value;
		}).get();
		console.log(groupedIds);
		var groupedJson={};
		groupedJson.ids=groupedIds;
		groupedJson = JSON.stringify(groupedJson);
		console.log(groupedJson);
		fun(groupedJson,groupName);
	}
	function fun(groupedIdsToController,groupedNameToController) {
		console.log(groupName);
		$.ajax({  
		    	type: 'GET', 
		    	url: '/addNewGroup',
		    	data:{
		    		groupedIdsJson : groupedIdsToController,
		    		grouupIdName : groupedNameToController
		    	},
		    	async: true, 
		    	success: function( data )
		    	{
		            $('#myDiv').delay(10).load('addNewBadge');
		    	}
		});
	}
}

$(function() {
	  var availableTags=[];
	  var tags = tagValues;
	  for(var i=0;i<tags.length;i++){
		  availableTags.push(tags[i]);
	  }
	  console.log(availableTags);
  $( "#tags" ).autocomplete({
    source: availableTags
  });
});
function deleteBadgesIdFromGroupBadges(twoIds){
	if(twoIds!=null && twoIds!=""){
	  console.log(twoIds);
	  var id = twoIds.split(':::'); 
	  console.log("badgeid::" +id[0]);
	  console.log("groupid::" +id[1]);
	  badgeId = id[0];
	  groupId = id[1];
	}
}

function idsTodDeleteBadgeFromGroup(){
	console.log(badgeId);
	console.log(groupId);
	$.ajax({  
    	type: 'GET', 
    	url: '/deleteBadgeFromGroup',
    	data:{
    		badgeId : badgeId,
    		groupId : groupId
    	},
    	async: true, 
    	success: function( data )
    	{
    		$('#myDiv').delay(10).load('addNewBadge');
    	}
});
}