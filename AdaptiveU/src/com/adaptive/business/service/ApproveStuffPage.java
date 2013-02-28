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

public class ApproveStuffPage 
{
	public void getDetailsForApproveStuffPage(String compId,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		String userBadgeLogDetails 		= UserBadgeLogDAO.getDataFromUserBadgeLogJdo(compId);
		String userDetails 			= UserProfileDAO.getDataFromUserProfile(compId);
		String userStatusDetails 		= UserStatusDetailsDAO.getDataFromUserStatusDetails(compId);
		String badgeDetailsMap		= BadgeListDAO.getDataFromBadgeListTable(compId);
		
		request.setAttribute("userBadgeLogJdoMap",userBadgeLogDetails);
		request.setAttribute("userDetailsMap",userDetails);
		request.setAttribute("badgeDetailsMap",badgeDetailsMap);
	    request.setAttribute("userStatusDetailsMap",userStatusDetails);
	}
}


