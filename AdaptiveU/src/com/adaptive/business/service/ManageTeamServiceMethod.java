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
import com.adaptive.business.dao.ManageTeamDAO;
import com.adaptive.business.dao.UserProfileDAO;

public class ManageTeamServiceMethod 
{
	public static void manageTeamdatastore(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		String manageTeamMap = ManageTeamDAO.getDataFromManageTeamJdo(company_Id);
		String userProfileMap = UserProfileDAO.getDataFromUserProfile(company_Id);
		request.setAttribute("teamMemInfo",manageTeamMap);
		request.setAttribute("userMap",userProfileMap);
	}
}
