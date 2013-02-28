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
import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;

public class BadgeListDAO {
	private static final Logger log = Logger.getLogger(BadgeListDAO.class.getName());
	static ObjectMapper objMapper=new ObjectMapper();
	public static BadgesList saveAuctionTransactions(BadgesList objBadgeList){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objBadgeList);
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting AuctionParticipants Object");
		}
		
		return objBadgeList;
	}
	
	public static String getDataFromBadgeListTable(String companyId)
	{
		PersistenceManager pmForBadgesListTable = PMF.get().getPersistenceManager();
		HashMap<String,BadgesList> badgesMap = new HashMap<String,BadgesList>();
		String badgesMapByCompany = "";
		Query queryforbadgeslilsttable =pmForBadgesListTable.newQuery(BadgesList.class,"companyId == '"+companyId+"'");         
		List<BadgesList> badgesListData = (List<BadgesList>)queryforbadgeslilsttable.execute();
		for(BadgesList badgeInfo:badgesListData)
		{
			badgesMap.put(badgeInfo.getKey(), badgeInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			badgesMapByCompany = objMapper.writeValueAsString(badgesMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return badgesMapByCompany;
	}
}
