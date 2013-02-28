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

import com.acti.jdo.AuctionTransactions;
import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.acti.jdo.videodetails;

public class AdaptiveYouServiceMethods 
{
	static ObjectMapper objMapper=new ObjectMapper();
	public  String getDataFromUserProfile(String companyId,String emailId)
	{
		PersistenceManager pmForUserProfile = PMF.get().getPersistenceManager();
		HashMap<String,UserProfile> userProfileMap = new HashMap<String,UserProfile>();
		String userProfileMapByUserCompany = "";
		Query queryforuserprofile =pmForUserProfile.newQuery(UserProfile.class,"userName == '"+emailId+"' && companyId == '"+companyId+"' && type != 'requested'");         
		List<UserProfile> usesrprofiledata = (List<UserProfile>)queryforuserprofile.execute();
		for(UserProfile userInfo:usesrprofiledata)
		{
			userProfileMap.put(userInfo.getuserName(), userInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userProfileMapByUserCompany = objMapper.writeValueAsString(userProfileMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userProfileMapByUserCompany;
	}
	public String getCompanyIdFromCompanyName(String companyName)
	{
		PersistenceManager pmForUserProfile = PMF.get().getPersistenceManager();
		Query queryforuserprofile =pmForUserProfile.newQuery(UserProfile.class,"type == 'Company'");         
		List<UserProfile> usesrprofiledata = (List<UserProfile>)queryforuserprofile.execute();
		String companyId = "";
		if(companyName != null)
		{
			companyName = companyName.replaceAll(" " , "").trim();
		}
		for(UserProfile userInfo:usesrprofiledata)
		{
			if(userInfo.getcompanyName() != null && !("".equalsIgnoreCase(userInfo.getcompanyName())))
			{
				userInfo.setcompanyName(userInfo.getcompanyName().replaceAll(" " , "").trim());
				if(companyName.equalsIgnoreCase(userInfo.getcompanyName().replaceAll(" " , "").trim()))
				{
					companyId = userInfo.getKey();
				}
			}
		}
		return companyId;
	}
	
	public  String getDataFromUserBadgeLogJdo(String companyId,String userId)
	{
		PersistenceManager pmForBadgeLogJdo = PMF.get().getPersistenceManager();
		HashMap<String,UserBadgeLogJdo>  userBadgeLogMap = new HashMap<String,UserBadgeLogJdo>();
		String userBadgeLogMapByCompany = "";
		Query queryforbadgelogjdo =pmForBadgeLogJdo.newQuery(UserBadgeLogJdo.class,"companyId == '"+companyId+"' && userId == '"+userId+"'");         
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
	
	public String getDataFromUserStatusDetails(String companyId,String userId,String badgeId)
	{
		PersistenceManager pmForUserStatusDetails = PMF.get().getPersistenceManager();
		HashMap<String,UserStatusDetails> userStatusDetailsMap = new HashMap<String,UserStatusDetails>();
		String userStatusDetailsMapByCompany = "";
		Query queryforuserstatusdetails = pmForUserStatusDetails.newQuery(UserStatusDetails.class,"companyId == '"+companyId+"' && userId == '"+userId+"' && stuffid == '"+badgeId+"'");          
		List<UserStatusDetails> userstatusdetailsData = (List<UserStatusDetails>)queryforuserstatusdetails.execute();
		for(UserStatusDetails userStatusDetailsInfo:userstatusdetailsData)
		{
			if(userStatusDetailsInfo.getStatus().equalsIgnoreCase("working on") || userStatusDetailsInfo.getStatus().equalsIgnoreCase("requested") )
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
	
	public String getDataFromBadgeListByBadgeId(String badgeId,String companyId)
	{
		PersistenceManager getBadgeDetails = PMF.get().getPersistenceManager();
		BadgesList badgeDetailsInfo = getBadgeDetails.getObjectById(BadgesList.class,badgeId); 
		 ObjectMapper objMapper=new ObjectMapper();
		 String badgeInfo = "";
		 if(badgeDetailsInfo != null)
		 {
			 if(badgeDetailsInfo.getCompanyId() != null)
			 if(badgeDetailsInfo.getCompanyId().equals(companyId))
			 {
				 try {
					badgeInfo = objMapper.writeValueAsString(badgeDetailsInfo);
				} catch (JsonGenerationException e) {
					e.printStackTrace();
				} catch (JsonMappingException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				}
			 }
		 }
		 return badgeInfo;
	}
	
	public String getBadgeIdFromBadgeName(String badgeName,String companyId)
	{
		String badgeId = null;
		if(badgeName != null)
		{
			badgeName = badgeName.replaceAll(" ", "").trim();
		}
			
		PersistenceManager pmForBadgesList = PMF.get().getPersistenceManager();
		Query queryforuserprofile =pmForBadgesList.newQuery(BadgesList.class,"companyId == '"+companyId+"'");         
		List<BadgesList> badgesListData = (List<BadgesList>)queryforuserprofile.execute();
		for(BadgesList badgesList:badgesListData)
		{
			if(badgeName != null && badgesList.getBadgeName()  != null)
			{
				badgesList.setBadgeName(badgesList.getBadgeName().replaceAll(" ", "").trim());
				if(badgeName.equalsIgnoreCase(badgesList.getBadgeName().replaceAll(" ", "").trim()))
				{
					badgeId = badgesList.getKey();
				}
			}
				
		}
		return badgeId;
	}
	
	public HashMap<String,AuctionTransactions> getUserListFromAuctionTransactions(String auctionId,String userId)
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		Query queryforuserprofile =pm.newQuery(AuctionTransactions.class,"auctionId == '"+auctionId+"' && userId == '"+userId+"'");         
		List<AuctionTransactions> auctionTrans = (List<AuctionTransactions>)queryforuserprofile.execute();
		HashMap<String, AuctionTransactions> auctionTransactionsByUserId = new HashMap<String, AuctionTransactions>();
		for(AuctionTransactions auctionInfo:auctionTrans)
		{
			auctionTransactionsByUserId.put(auctionInfo.getKey(), auctionInfo);
		}
		return auctionTransactionsByUserId;
	}
	
}
