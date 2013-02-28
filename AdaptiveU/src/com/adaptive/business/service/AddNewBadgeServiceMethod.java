package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;

public class AddNewBadgeServiceMethod 
{
	public static void addNewBadgeDetails(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO = new AdaptiveYouoDataStore();
		
		String badgeListMap					= adaptiveDAO.getDataFromBadgeListTable(company_Id);
		request.setAttribute("badgeListMap",badgeListMap);
		
		String videoDetailsMap				= adaptiveDAO.getDataFromVideoDetails(company_Id);
		request.setAttribute("videoDetailsMap",videoDetailsMap);
	}

}
