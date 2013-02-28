package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;

public class AdminServiceMethod {
	public static void adminDatastoreDetails(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO = new AdaptiveYouoDataStore();
		String badgesInfo = adaptiveDAO.getDataFromBadgeListTable(company_Id);
		String usersInfo = adaptiveDAO.getDataFromUserProfile(company_Id);
		String userStatusDetailsInfo = adaptiveDAO.getDataFromUserStatusDetails(company_Id);
		String userBadgelogInfo = adaptiveDAO.getDataFromUserBadgeLogJdo(company_Id);
		
		request.setAttribute("badgesListMap",badgesInfo);
		request.setAttribute("userProfileMap",usersInfo);
		request.setAttribute("userStatusDetails",userStatusDetailsInfo);
		request.setAttribute("userBadgelogInfo",userBadgelogInfo);
		
	}

}
