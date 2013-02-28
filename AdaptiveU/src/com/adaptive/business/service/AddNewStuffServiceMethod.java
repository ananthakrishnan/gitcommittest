package com.adaptive.business.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.dao.AuctionListDAO;
import com.adaptive.business.dao.BadgeListDAO;

public class AddNewStuffServiceMethod 
{
	public static void addStuffDetails(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		String badgesInfo 							= BadgeListDAO.getDataFromBadgeListTable(company_Id);
		String auctionListInfo  					= AuctionListDAO.getDataFromAuctionListTable(company_Id);
		
		request.setAttribute("badgesListMap",badgesInfo);
		request.setAttribute("auctionListInfo",auctionListInfo);

	}

}
