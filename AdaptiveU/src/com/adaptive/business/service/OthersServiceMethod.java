package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.dao.BadgeListDAO;
import com.adaptive.business.dao.ManageTeamDAO;
import com.adaptive.business.dao.UserBadgeLogDAO;
import com.adaptive.business.dao.UserProfileDAO;
import com.adaptive.business.dao.videodetailsDAO;

public class OthersServiceMethod 
{
	public static void dataStoreDetails(String company_Id , String userKey,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		

		String badgesListMap 		= BadgeListDAO.getDataFromBadgeListTable(company_Id);
		String UserProfileMap 		= UserProfileDAO.getDataFromUserProfile(company_Id);
		String manageTeamJdoMap 	= ManageTeamDAO.getDataFromManageTeamJdo(company_Id);
		String userBadgelogJdoMap	= UserBadgeLogDAO.getDataFromUserBadgeLogJdo(company_Id);
		String videosInfo 			= videodetailsDAO.getDataFromVideoDetails(company_Id);
		
		request.setAttribute("badges_list",badgesListMap);
		request.setAttribute("userProfileMap",UserProfileMap);
		request.setAttribute("teamMemInfoUser",manageTeamJdoMap);
		request.setAttribute("userBadgelogJdoMap",userBadgelogJdoMap);
		request.setAttribute("video_list",videosInfo);

	}
}
