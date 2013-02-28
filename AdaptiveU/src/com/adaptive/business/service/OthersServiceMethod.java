package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;

public class OthersServiceMethod 
{
	public static void dataStoreDetails(String company_Id , String userKey,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO = new AdaptiveYouoDataStore();

		String badgesListMap 		= adaptiveDAO.getDataFromBadgeListTable(company_Id);
		String UserProfileMap 		= adaptiveDAO.getDataFromUserProfile(company_Id);
		String manageTeamJdoMap 	= adaptiveDAO.getDataFromManageTeamJdo(company_Id);
		String userBadgelogJdoMap	= adaptiveDAO.getDataFromUserBadgeLogJdo(company_Id);
		String videosInfo 			= adaptiveDAO.getDataFromVideoDetails(company_Id);
		
		request.setAttribute("badges_list",badgesListMap);
		request.setAttribute("userProfileMap",UserProfileMap);
		request.setAttribute("teamMemInfoUser",manageTeamJdoMap);
		request.setAttribute("userBadgelogJdoMap",userBadgelogJdoMap);
		request.setAttribute("video_list",videosInfo);

	}
	
	public static void earnBadgesDataStoreDetails(String company_Id , String userKey,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO = new AdaptiveYouoDataStore();

		String badgesListMap 		= adaptiveDAO.getDataFromBadgeListTable(company_Id);
		String UserProfileMap 		= adaptiveDAO.getDataFromUserProfile(company_Id);
		String userStatusDetails 	= adaptiveDAO.getDataFromUserStatusDetails(company_Id);
		String userBadgelogJdoMap	= adaptiveDAO.getDataFromUserBadgeLogJdo(company_Id);
		String videosInfo 			= adaptiveDAO.getDataFromVideoDetails(company_Id);
		
		
		request.setAttribute("badgesListMap",badgesListMap);
		System.out.println("badgesListMap ::"+badgesListMap);
		request.setAttribute("userProfileMap",UserProfileMap);
		System.out.println("userProfileMap ::"+UserProfileMap);
		request.setAttribute("userStatusDetails",userStatusDetails);
		request.setAttribute("userBadgelogJdoMap",userBadgelogJdoMap);
		request.setAttribute("videoDetailsMap",videosInfo);

	}
}
