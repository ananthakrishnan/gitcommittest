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

import com.acti.controller.ApproveBadgePageController;
import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.PMF;

public class ManageTeamDAO {
	static ObjectMapper objMapper=new ObjectMapper();
	private static final Logger log = Logger.getLogger(ManageTeamDAO.class.getName());
	public static ManageTeamJdo saveManageTeamJdo(ManageTeamJdo objManageTeamJdo){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			
			pm.makePersistent(objManageTeamJdo);
			
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting ManageTeamJdo Object");
		}
		
		return objManageTeamJdo;
	}

	public static  String getDataFromManageTeamJdo(String companyId)
	{
		PersistenceManager pmForManageTeamJdo = PMF.get().getPersistenceManager();
		HashMap<String,ManageTeamJdo> manageTeamMap = new HashMap<String,ManageTeamJdo>();
		String manageTeamMapByCompany = "";
		Query queryforManageTeamJdo =pmForManageTeamJdo.newQuery(ManageTeamJdo.class,"companyId == '"+companyId+"'");         
		List<ManageTeamJdo> manageteamdata = (List<ManageTeamJdo>)queryforManageTeamJdo.execute();
		for(ManageTeamJdo manageTeamInfo:manageteamdata)
		{
			manageTeamMap.put(manageTeamInfo.getKey(), manageTeamInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			manageTeamMapByCompany = objMapper.writeValueAsString(manageTeamMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return manageTeamMapByCompany;
	}
}
