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

public class AdminServiceMethod {
	public static void adminDatastoreDetails(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		String badgesInfo = BadgeListDAO.getDataFromBadgeListTable(company_Id);
		String usersInfo = UserProfileDAO.getDataFromUserProfile(company_Id);
		String userStatusDetailsInfo = UserStatusDetailsDAO.getDataFromUserStatusDetails(company_Id);
		String userBadgelogInfo = UserBadgeLogDAO.getDataFromUserBadgeLogJdo(company_Id);
		
		request.setAttribute("badgesListMap",badgesInfo);
		request.setAttribute("userProfileMap",usersInfo);
		request.setAttribute("userStatusDetails",userStatusDetailsInfo);
		request.setAttribute("userBadgelogInfo",userBadgelogInfo);
		
	}

}
