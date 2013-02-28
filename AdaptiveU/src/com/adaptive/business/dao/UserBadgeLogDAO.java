package com.adaptive.business.dao;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;

public class UserBadgeLogDAO {
	private static final Logger log = Logger.getLogger(UserBadgeLogDAO.class.getName());
	static ObjectMapper objMapper=new ObjectMapper();
	public static UserBadgeLogJdo saveUserBadgeLogJdo (UserBadgeLogJdo objUserBadgeLogJdo ){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			
			pm.makePersistent(objUserBadgeLogJdo );
		
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting UserBadgeLogJdo  Object");
		}
		
		return objUserBadgeLogJdo ;
	}

	
	public static  String getDataFromUserBadgeLogJdo(String companyId)
	{
		PersistenceManager pmForBadgeLogJdo = PMF.get().getPersistenceManager();
		HashMap<String,UserBadgeLogJdo>  userBadgeLogMap = new HashMap<String,UserBadgeLogJdo>();
		String userBadgeLogMapByCompany = "";
		Query queryforbadgelogjdo =pmForBadgeLogJdo.newQuery(UserBadgeLogJdo.class,"companyId == '"+companyId+"'");         
		List<UserBadgeLogJdo> badgelogjdoData = (List<UserBadgeLogJdo>)queryforbadgelogjdo.execute();
		for(UserBadgeLogJdo badgeLogInfo:badgelogjdoData)
		{
			userBadgeLogMap.put(badgeLogInfo.getUserId(),badgeLogInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userBadgeLogMapByCompany = objMapper.writeValueAsString(userBadgeLogMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userBadgeLogMapByCompany;
	}
}
