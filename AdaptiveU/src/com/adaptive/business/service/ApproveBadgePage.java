package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.dao.BadgeListDAO;
import com.adaptive.business.dao.UserBadgeLogDAO;
import com.adaptive.business.dao.UserProfileDAO;
import com.adaptive.business.dao.UserStatusDetailsDAO;
import com.adaptive.business.dao.videodetailsDAO;

public class ApproveBadgePage {

	public void getDetailsForApproveStuffPage(String compId,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		String videoDetailsMap 			= videodetailsDAO.getDataFromVideoDetails(compId);
		String userProfileMap 			= UserProfileDAO.getDataFromUserProfile(compId);
		String badgesInfo	 			= BadgeListDAO.getDataFromBadgeListTable(compId);
		String userStatusDetailsMap 	= UserStatusDetailsDAO.getDataFromUserStatusDetails(compId);
		String userBadgeLogJdoMap			= UserBadgeLogDAO.getDataFromUserBadgeLogJdo(compId);
		
		request.setAttribute("userDetailsMap",userProfileMap);
		request.setAttribute("badgesListMap",badgesInfo);
		request.setAttribute("userStatusDetailsMap",userStatusDetailsMap);
		request.setAttribute("videoDetailsMap",videoDetailsMap);
		request.setAttribute("userBadgeLogJdoMap",userBadgeLogJdoMap);
	}
}
