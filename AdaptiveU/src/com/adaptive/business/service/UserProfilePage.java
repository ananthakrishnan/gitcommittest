package com.adaptive.business.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserCommitBadge;
import com.adaptive.business.dao.AuctionListDAO;
import com.adaptive.business.dao.BadgeListDAO;
import com.adaptive.business.dao.ManageTeamDAO;
import com.adaptive.business.dao.NotificationDAO;
import com.adaptive.business.dao.UserBadgeLogDAO;
import com.adaptive.business.dao.UserProfileDAO;
import com.adaptive.business.dao.UserStatusDetailsDAO;
import com.adaptive.business.dao.videodetailsDAO;

public class UserProfilePage {
	
	
	public void userProfileService(String compId ,String userKey,String emailId,HttpServletRequest req) throws JsonGenerationException, JsonMappingException, IOException
	{
		   
		   PersistenceManager pmAddToTeam = PMF.get().getPersistenceManager();
		   PersistenceManager pmBatchDetails = PMF.get().getPersistenceManager();
		   Date now = new Date();
		   
		   ObjectMapper objMapper = new ObjectMapper();
		   objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		   objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		
		   String badgesListMap = BadgeListDAO.getDataFromBadgeListTable(compId);
		   req.setAttribute("badgesListMap",badgesListMap);
		   String videodetailsMap= videodetailsDAO.getDataFromVideoDetails(compId);
		   req.setAttribute("videoDetailsMap",videodetailsMap);
		   String userProfileMap =  UserProfileDAO.getDataFromUserProfile(compId);
		   req.setAttribute("userProfileMap",userProfileMap);
		   String userStatusDetailsMap =  UserStatusDetailsDAO.getDataFromUserStatusDetails(compId);
		   req.setAttribute("userStatusDetailsMap",userStatusDetailsMap);
		   String auctionListMap = AuctionListDAO.getDataFromAuctionListTable(compId);
		   req.setAttribute("auctionListMap",auctionListMap);
		  
		   
		   PersistenceManager pmCheckUpdateBadgeLogJdo = PMF.get().getPersistenceManager();
		      LinkedHashMap<String,UserBadgeLogJdo> userBadgeLogDetails = new LinkedHashMap<String, UserBadgeLogJdo>();
				try
				{
					Query querybadgeLog =pmCheckUpdateBadgeLogJdo.newQuery(UserBadgeLogJdo.class,"companyId == '"+compId+"' && userId == '"+userKey+"'");
					List<UserBadgeLogJdo> userBadgeLogInfo  = (List<UserBadgeLogJdo>)querybadgeLog.execute();
					//If there is no entry in UserBadgeLogJdo for that user then it is done here
					if(userBadgeLogInfo.size() == 0 )
					{
						UserBadgeLogJdo intialUser = new UserBadgeLogJdo();
						UUID key = UUID.randomUUID();
						intialUser.setKey(key.toString());
						intialUser.setCompanyId(compId);
						intialUser.setUserId(userKey);
						intialUser.setPoints(0);
						pmCheckUpdateBadgeLogJdo.currentTransaction().begin();
						pmCheckUpdateBadgeLogJdo.makePersistent(intialUser);
						pmCheckUpdateBadgeLogJdo.currentTransaction().commit();
						userBadgeLogDetails.put(key.toString(),intialUser);
					}
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
				 String userBadgeLogJdoMap =  UserBadgeLogDAO.getDataFromUserBadgeLogJdo(compId);
				 req.setAttribute("userBadgeLogJdoMap",userBadgeLogJdoMap);
				 
				 UserCommitBadge userCommitBadge = null;
                try
	                {
		                userCommitBadge = NotificationDAO.getUserCommitBadge( userKey );
	                }
                catch ( Exception e )
	                {
		                // TODO Auto-generated catch block
		                e.printStackTrace();
	                }
				 req.setAttribute("userCommitBadge",userCommitBadge);
		
		  
		    
		  //To check if the team mem belong to "AllTeam" or else he is added
		  //If All team is not created then it is created here
	      ManageTeamJdo groupInfo = new ManageTeamJdo();
	      Query queryAddToAllTeam =pmAddToTeam.newQuery(ManageTeamJdo.class,"companyId == '"+compId+"' && teamName ==  'AllTeam'");
	      List<ManageTeamJdo> teamList = (List<ManageTeamJdo>)queryAddToAllTeam.execute();
	      if(teamList.size() > 0)
	      {
	    	  for(ManageTeamJdo teamInfo:teamList)
	    	  {
	    		  
	    		  ArrayList<String> existingMems = teamInfo.getTeamMembers();
	    		  	  if(!(existingMems.contains(userKey)))
	    		  	  {
		    		      existingMems.add(userKey);
			    		  teamInfo.setTeamMembers(existingMems);
			    		  pmAddToTeam.currentTransaction().begin();
			    		  pmAddToTeam.makePersistent(teamInfo);
			    		  pmAddToTeam.currentTransaction().commit();
	    		  	  }
	    		  }
	      }
	      else
	      {
		       ArrayList<String> teamMem = new ArrayList<String>();
		       UUID manageId =  UUID.randomUUID();
		       groupInfo.setCompanyId(compId);
		       groupInfo.setDate(now);
		       groupInfo.setDeleteFlag("false");
		       groupInfo.setKey(manageId.toString());
		       teamMem.add(userKey);
		       groupInfo.setTeamMembers(teamMem);
		       groupInfo.setTeamName("AllTeam");
		      ManageTeamDAO.saveManageTeamJdo(groupInfo);
	      }
					
					//Changes has to be done
	}

}
