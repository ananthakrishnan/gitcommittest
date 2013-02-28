package com.acti.controller;

import java.io.IOException;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserProfile;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.dao.videodetailsDAO;
import com.adaptive.business.service.AdaptiveYouServiceMethods;
import com.adaptive.business.service.AdaptiveYouoDataStore;

@Controller
public class EmbedBadgePageController {
	private static final Logger log = Logger.getLogger(EmbedBadgePageController.class.getName());
	@RequestMapping(value="/workOnBadge" , method=RequestMethod.GET)
	public  String  verifyOpenIdResponseJson(@RequestParam(value="badgeId", required=false) String badgeId,@RequestParam(value="companyId", required=false) String companyId,@RequestParam(value="userKey", required=false) String userId,HttpServletRequest req, HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException
	{
		try
		{
		   
		   String videodetailsMap= videodetailsDAO.getDataFromVideoDetails(companyId);
		   req.setAttribute("videoDetailsMap",videodetailsMap);
		   
		   AdaptiveYouServiceMethods lserviceMethod = new AdaptiveYouServiceMethods();
		   String badgesInfo = lserviceMethod.getDataFromBadgeListByBadgeId(badgeId, companyId);
		   req.setAttribute("badgesInfo",badgesInfo);
		   
		   String userBadgeLogJdoInfo = lserviceMethod.getDataFromUserBadgeLogJdo(companyId, userId);
		   req.setAttribute("userBadgeLogJdoInfo",userBadgeLogJdoInfo);
		   
		   String userStatusDetailsInfo = lserviceMethod.getDataFromUserBadgeLogJdo(companyId, userId);
		   req.setAttribute("userStatusDetailsInfo",userStatusDetailsInfo);
		   
		   String userProfileInfo = lserviceMethod.getDataFromUserProfile(companyId, userId);
		 
		   req.setAttribute("userProfileInfo",userProfileInfo);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		   
		return "embedBadgePage";
	}

}
