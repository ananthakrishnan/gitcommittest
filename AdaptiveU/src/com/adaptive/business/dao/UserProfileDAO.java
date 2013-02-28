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
import com.acti.jdo.UserProfile;

public class UserProfileDAO {
	private static final Logger log = Logger.getLogger(UserProfileDAO.class.getName());
	static ObjectMapper objMapper=new ObjectMapper();
	public static UserProfile saveUserProfile(UserProfile objUserProfile){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			
			pm.makePersistent(objUserProfile);
			
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting objUserProfile Object");
		}
		
		return objUserProfile;
	}
	public static  String getDataFromUserProfile(String companyId)
	{
		PersistenceManager pmForUserProfile = PMF.get().getPersistenceManager();
		HashMap<String,UserProfile> userProfileMap = new HashMap<String,UserProfile>();
		String userProfileMapByCompany = "";
		Query queryforuserprofile =pmForUserProfile.newQuery(UserProfile.class,"companyId == '"+companyId+"'");         
		List<UserProfile> usesrprofiledata = (List<UserProfile>)queryforuserprofile.execute();
		for(UserProfile userInfo:usesrprofiledata)
		{
			userProfileMap.put(userInfo.getKey(), userInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			userProfileMapByCompany = objMapper.writeValueAsString(userProfileMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userProfileMapByCompany;
	}
}
