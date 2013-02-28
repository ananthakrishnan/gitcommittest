
package com.adaptive.business.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.acti.jdo.AuctionList;
import com.acti.jdo.BadgesList;
import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.acti.jdo.videodetails;
import com.adaptive.business.dao.AdaptiveYouDAO;
@SuppressWarnings("unchecked")
public class AdaptiveYouoDataStore
{
	static ObjectMapper objMapper=new ObjectMapper();
	
}
