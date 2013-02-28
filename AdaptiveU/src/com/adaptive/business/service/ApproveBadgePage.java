package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;

public class ApproveBadgePage {

	public void getDetailsForApproveStuffPage(String compId,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO 		= new AdaptiveYouoDataStore();
		String videoDetailsMap 			= adaptiveDAO.getDataFromVideoDetails(compId);
		String userProfileMap 			= adaptiveDAO.getDataFromUserProfile(compId);
		String badgesInfo	 			= adaptiveDAO.getDataFromBadgeListTable(compId);
		String userStatusDetailsMap 	= adaptiveDAO.getDataFromUserStatusDetails(compId);
		String userBadgeLogJdoMap			= adaptiveDAO.getDataFromUserBadgeLogJdo(compId);
		
		request.setAttribute("userDetailsMap",userProfileMap);
		request.setAttribute("badgesListMap",badgesInfo);
		request.setAttribute("userStatusDetailsMap",userStatusDetailsMap);
		request.setAttribute("videoDetailsMap",videoDetailsMap);
		request.setAttribute("userBadgeLogJdoMap",userBadgeLogJdoMap);
	}
}
