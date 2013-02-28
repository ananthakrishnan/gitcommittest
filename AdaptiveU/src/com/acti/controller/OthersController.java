package com.acti.controller;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;

import com.acti.jdo.UserProfile;
import com.adaptive.business.service.*;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class OthersController {


	@RequestMapping("/others")
	public String others(HttpServletRequest request, HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException
	{
		HttpSession sessionOthers = request.getSession();
		String userKey = (String)sessionOthers.getAttribute("userKeyLogin");
		String company_Id=(String)session.getAttribute("companyKey");
		OthersServiceMethod.dataStoreDetails(company_Id, userKey,request);
		return "others";
	}
}
