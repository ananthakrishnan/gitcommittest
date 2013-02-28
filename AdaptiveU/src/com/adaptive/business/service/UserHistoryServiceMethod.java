package com.adaptive.business.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.dao.BadgeListDAO;
import com.adaptive.business.dao.UserProfileDAO;

public class UserHistoryServiceMethod {
	static PersistenceManager pmf = PMF.get().getPersistenceManager();
	static ObjectMapper objMapper = new ObjectMapper();

	@SuppressWarnings("unchecked")
	public static void userHistoryDataStore(String company_Id,HttpServletRequest request) throws JsonGenerationException, JsonMappingException, IOException
	{
		
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );

		LinkedHashMap<String,UserStatusDetails> mapTransaction1 = new LinkedHashMap<String,UserStatusDetails>();                                                          
		String str="approved";
		Query queryUserStatus = pmf.newQuery(UserStatusDetails.class,"status == '"+str+"' && companyId == '"+company_Id+"'");
		queryUserStatus.setOrdering("dateAdded DESC");
		List<UserStatusDetails> allTransactions = (List<UserStatusDetails>) queryUserStatus.execute();
		if(allTransactions.size() > 0)
		{
			for(UserStatusDetails stuffInfo:allTransactions)
			{
				mapTransaction1.put(stuffInfo.getKey(), stuffInfo);
			}
		}
		
		String badgesListMap = BadgeListDAO.getDataFromBadgeListTable(company_Id);
		String userDetailsMap = UserProfileDAO.getDataFromUserProfile(company_Id);
		
		request.setAttribute("transactionLog1",objMapper.writeValueAsString(mapTransaction1));
		request.setAttribute("badges_list",badgesListMap);
		request.setAttribute("user_list",userDetailsMap);

	}
}
