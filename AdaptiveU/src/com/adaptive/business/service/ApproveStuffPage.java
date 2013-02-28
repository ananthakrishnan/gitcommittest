package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;

public class ApproveStuffPage 
{
	public void getDetailsForApproveStuffPage(String compId,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO 	= new AdaptiveYouoDataStore();
		String userBadgeLogDetails 		= adaptiveDAO.getDataFromUserBadgeLogJdo(compId);
		String userDetails 			= adaptiveDAO.getDataFromUserProfile(compId);
		String userStatusDetails 		= adaptiveDAO.getDataFromUserStatusDetails(compId);
		String badgeDetailsMap		= adaptiveDAO.getDataFromBadgeListTable(compId);
		
		request.setAttribute("userBadgeLogJdoMap",userBadgeLogDetails);
		request.setAttribute("userDetailsMap",userDetails);
		request.setAttribute("badgeDetailsMap",badgeDetailsMap);
	    request.setAttribute("userStatusDetailsMap",userStatusDetails);
	}
}


