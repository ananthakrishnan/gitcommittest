package com.adaptive.business.service;

import java.io.IOException;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.dao.BadgeListDAO;
import com.adaptive.business.dao.videodetailsDAO;

public class AddNewBadgeServiceMethod 
{
	public static void addNewBadgeDetails(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		
		String badgeListMap					= BadgeListDAO.getDataFromBadgeListTable(company_Id);
		request.setAttribute("badgeListMap",badgeListMap);
		
		String videoDetailsMap				= videodetailsDAO.getDataFromVideoDetails(company_Id);
		request.setAttribute("videoDetailsMap",videoDetailsMap);
	}

}
