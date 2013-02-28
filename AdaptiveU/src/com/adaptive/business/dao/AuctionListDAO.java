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
import com.acti.jdo.AuctionList;
import com.acti.jdo.PMF;

public class AuctionListDAO {
	private static final Logger log = Logger.getLogger(AuctionListDAO.class.getName());
	static ObjectMapper objMapper=new ObjectMapper();
	public static AuctionList saveAuctionList(AuctionList objAuctionList){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{	
			pm.makePersistent(objAuctionList);
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting AuctionList Object");
		}
		
		return objAuctionList;
	}
	public static String getDataFromAuctionListTable(String companyId)
	 {
	  PersistenceManager pmForAuctionsListTable = PMF.get().getPersistenceManager();
	  HashMap<String,AuctionList> AuctionsMap = new HashMap<String,AuctionList>();
	  String auctionsMapByCompany = "";
	  Query queryforbadgeslilsttable =pmForAuctionsListTable.newQuery(AuctionList.class,"companyId == '"+companyId+"'");         
	  List<AuctionList> badgesListData = (List<AuctionList>)queryforbadgeslilsttable.execute();
	  for(AuctionList badgeInfo:badgesListData)
	  {
	   AuctionsMap.put(badgeInfo.getKey(), badgeInfo);
	  }
	  objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
	  objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
	  try
	  {
	   auctionsMapByCompany = objMapper.writeValueAsString(AuctionsMap);
	  } 
	  catch (JsonGenerationException e) {
	   e.printStackTrace();
	  } catch (JsonMappingException e) {
	   e.printStackTrace();
	  } catch (IOException e) {
	   e.printStackTrace();
	  }
	  return auctionsMapByCompany;
	 }
}
