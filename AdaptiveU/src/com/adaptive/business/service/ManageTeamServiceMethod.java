package com.adaptive.business.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.UserProfile;
import com.adaptive.business.dao.AdaptiveYouDAO;

public class ManageTeamServiceMethod 
{
	public static void manageTeamdatastore(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		AdaptiveYouDAO adaptiveDAO = new AdaptiveYouoDataStore();
		String manageTeamMap = adaptiveDAO.getDataFromManageTeamJdo(company_Id);
		String userProfileMap = adaptiveDAO.getDataFromUserProfile(company_Id);
		request.setAttribute("teamMemInfo",manageTeamMap);
		request.setAttribute("userMap",userProfileMap);
	}
}
