
package com.adaptive.business.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.AuctionList;
import com.acti.jdo.BadgesList;
import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.acti.jdo.videodetails;
import com.adaptive.business.dao.AdaptiveYouDAO;
@SuppressWarnings("unchecked")
public class AdaptiveYouoDataStore implements AdaptiveYouDAO
{
	static ObjectMapper objMapper=new ObjectMapper();
	public String getDataFromBadgeListTable(String companyId)
	{
		PersistenceManager pmForBadgesListTable = PMF.get().getPersistenceManager();
		HashMap<String,BadgesList> badgesMap = new HashMap<String,BadgesList>();
		String badgesMapByCompany = "";
		Query queryforbadgeslilsttable =pmForBadgesListTable.newQuery(BadgesList.class,"companyId == '"+companyId+"'");         
		List<BadgesList> badgesListData = (List<BadgesList>)queryforbadgeslilsttable.execute();
		for(BadgesList badgeInfo:badgesListData)
		{
			badgesMap.put(badgeInfo.getKey(), badgeInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			badgesMapByCompany = objMapper.writeValueAsString(badgesMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return badgesMapByCompany;
	}
	
	
	public  String getDataFromUserBadgeLogJdo(String companyId)
	{
		PersistenceManager pmForBadgeLogJdo = PMF.get().getPersistenceManager();
		HashMap<String,UserBadgeLogJdo>  userBadgeLogMap = new HashMap<String,UserBadgeLogJdo>();
		String userBadgeLogMapByCompany = "";
		Query queryforbadgelogjdo =pmForBadgeLogJdo.newQuery(UserBadgeLogJdo.class,"companyId == '"+companyId+"'");         
		List<UserBadgeLogJdo> badgelogjdoData = (List<UserBadgeLogJdo>)queryforbadgelogjdo.execute();
		for(UserBadgeLogJdo badgeLogInfo:badgelogjdoData)
		{
			userBadgeLogMap.put(badgeLogInfo.getUserId(),badgeLogInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userBadgeLogMapByCompany = objMapper.writeValueAsString(userBadgeLogMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userBadgeLogMapByCompany;
	}
	
	public String getDataFromUserStatusDetails(String companyId)
	{
		PersistenceManager pmForUserStatusDetails = PMF.get().getPersistenceManager();
		HashMap<String,UserStatusDetails> userStatusDetailsMap = new HashMap<String,UserStatusDetails>();
		String userStatusDetailsMapByCompany = "";
		Query queryforuserstatusdetails = pmForUserStatusDetails.newQuery(UserStatusDetails.class,"companyId == '"+companyId+"'"); 
		queryforuserstatusdetails.setOrdering("dateAdded ASC");
		List<UserStatusDetails> userstatusdetailsData = (List<UserStatusDetails>)queryforuserstatusdetails.execute();
		for(UserStatusDetails userStatusDetailsInfo:userstatusdetailsData)
		{
			userStatusDetailsMap.put(userStatusDetailsInfo.getKey(),userStatusDetailsInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userStatusDetailsMapByCompany = objMapper.writeValueAsString(userStatusDetailsMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userStatusDetailsMapByCompany;
	}
	
	public  String getDataFromUserProfile(String companyId)
	{
		PersistenceManager pmForUserProfile = PMF.get().getPersistenceManager();
		HashMap<String,UserProfile> userProfileMap = new HashMap<String,UserProfile>();
		String userProfileMapByCompany = "";
		Query queryforuserprofile =pmForUserProfile.newQuery(UserProfile.class,"companyId == '"+companyId+"'");         
		List<UserProfile> usesrprofiledata = (List<UserProfile>)queryforuserprofile.execute();
		for(UserProfile userInfo:usesrprofiledata)
		{
			userProfileMap.put(userInfo.getKey(), userInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userProfileMapByCompany = objMapper.writeValueAsString(userProfileMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userProfileMapByCompany;
	}
	
	public  String getDataFromManageTeamJdo(String companyId)
	{
		PersistenceManager pmForManageTeamJdo = PMF.get().getPersistenceManager();
		HashMap<String,ManageTeamJdo> manageTeamMap = new HashMap<String,ManageTeamJdo>();
		String manageTeamMapByCompany = "";
		Query queryforManageTeamJdo =pmForManageTeamJdo.newQuery(ManageTeamJdo.class,"companyId == '"+companyId+"'");         
		List<ManageTeamJdo> manageteamdata = (List<ManageTeamJdo>)queryforManageTeamJdo.execute();
		for(ManageTeamJdo manageTeamInfo:manageteamdata)
		{
			manageTeamMap.put(manageTeamInfo.getKey(), manageTeamInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			manageTeamMapByCompany = objMapper.writeValueAsString(manageTeamMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return manageTeamMapByCompany;
	}
	
	public  String getDataFromVideoDetails(String companyId)
	{
		PersistenceManager pmForVideoDetails = PMF.get().getPersistenceManager();
		HashMap<String,videodetails> videoDetailsMap = new HashMap<String,videodetails>();
		String videoDetailsMapByCompany = "";
		Query queryforVideoDetails =pmForVideoDetails.newQuery(videodetails.class,"companyId == '"+companyId+"'");         
		List<videodetails> videoDetails = (List<videodetails>)queryforVideoDetails.execute();
		for(videodetails videodetailsInfo:videoDetails)
		{
			videoDetailsMap.put(videodetailsInfo.getKey(),videodetailsInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			videoDetailsMapByCompany = objMapper.writeValueAsString(videoDetailsMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return videoDetailsMapByCompany;
	}


	public String getDataFromAuctionListTable(String companyId)
	 {
	  PersistenceManager pmForAuctionsListTable = PMF.get().getPersistenceManager();
	  HashMap<String,AuctionList> AuctionsMap = new HashMap<String,AuctionList>();
	  String auctionsMapByCompany = "";
	  Query queryforbadgeslilsttable =pmForAuctionsListTable.newQuery(AuctionList.class,"companyId == '"+companyId+"'");         
	  List<AuctionList> badgesListData = (List<AuctionList>)queryforbadgeslilsttable.execute();
	  for(AuctionList badgeInfo:badgesListData)
	  {
	   AuctionsMap.put(badgeInfo.getKey(), badgeInfo);
	  }
	  objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
	  objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
	  try
	  {
	   auctionsMapByCompany = objMapper.writeValueAsString(AuctionsMap);
	  } 
	  catch (JsonGenerationException e) {
	   e.printStackTrace();
	  } catch (JsonMappingException e) {
	   e.printStackTrace();
	  } catch (IOException e) {
	   e.printStackTrace();
	  }
	  return auctionsMapByCompany;
	 }
	
	public String getUserProfileInformation(String userKey)
	{
		PersistenceManager pmForUserProfile = PMF.get().getPersistenceManager();
		String userProfileInformation = "";
		try
		{
			UserProfile userInfo =  pmForUserProfile.getObjectById(UserProfile.class,userKey);     
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			userProfileInformation = objMapper.writeValueAsString(userInfo);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return userProfileInformation;
	}
	
}
