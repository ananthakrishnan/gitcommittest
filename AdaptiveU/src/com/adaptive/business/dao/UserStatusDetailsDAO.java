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
import com.acti.jdo.UserStatusDetails;

public class UserStatusDetailsDAO {
	static ObjectMapper objMapper=new ObjectMapper();
	private static final Logger log = Logger.getLogger(UserStatusDetailsDAO.class.getName());
	public static UserStatusDetails saveUserStatusDetails(UserStatusDetails objUserStatusDetails){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			
			pm.makePersistent(objUserStatusDetails);
			
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting UserStatusDetails Object");
		}
		
		return objUserStatusDetails;
	}

	public static String getDataFromUserStatusDetails(String companyId)
	{
		PersistenceManager pmForUserStatusDetails = PMF.get().getPersistenceManager();
		HashMap<String,UserStatusDetails> userStatusDetailsMap = new HashMap<String,UserStatusDetails>();
		String userStatusDetailsMapByCompany = "";
		Query queryforuserstatusdetails = pmForUserStatusDetails.newQuery(UserStatusDetails.class,"companyId == '"+companyId+"'"); 
		queryforuserstatusdetails.setOrdering("dateAdded ASC");
		List<UserStatusDetails> userstatusdetailsData = (List<UserStatusDetails>)queryforuserstatusdetails.execute();
		for(UserStatusDetails userStatusDetailsInfo:userstatusdetailsData)
		{
			userStatusDetailsMap.put(userStatusDetailsInfo.getKey(),userStatusDetailsInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userStatusDetailsMapByCompany = objMapper.writeValueAsString(userStatusDetailsMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userStatusDetailsMapByCompany;
	}
}
