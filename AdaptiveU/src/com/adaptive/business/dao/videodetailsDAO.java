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
import com.acti.jdo.videodetails;

public class videodetailsDAO {
	private static final Logger log = Logger.getLogger(videodetailsDAO.class.getName());
	static ObjectMapper objMapper=new ObjectMapper();
	public static videodetails savevideodetails(videodetails objvideodetails){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			
			pm.makePersistent(objvideodetails );
		
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting videodetails  Object");
		}
		
		return objvideodetails ;
	}
	public static  String getDataFromVideoDetails(String companyId)
	{
		PersistenceManager pmForVideoDetails = PMF.get().getPersistenceManager();
		HashMap<String,videodetails> videoDetailsMap = new HashMap<String,videodetails>();
		String videoDetailsMapByCompany = "";
		Query queryforVideoDetails =pmForVideoDetails.newQuery(videodetails.class,"companyId == '"+companyId+"'");         
		List<videodetails> videoDetails = (List<videodetails>)queryforVideoDetails.execute();
		for(videodetails videodetailsInfo:videoDetails)
		{
			videoDetailsMap.put(videodetailsInfo.getKey(),videodetailsInfo);
		}
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		try
		{
			videoDetailsMapByCompany = objMapper.writeValueAsString(videoDetailsMap);
		} 
		catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return videoDetailsMapByCompany;
	}
}
