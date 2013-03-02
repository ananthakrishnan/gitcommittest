package com.adaptive.business.service;

import java.net.URLDecoder;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;

import com.acti.jdo.UserCommitBadge;
import com.adaptive.business.dao.NotificationDAO;

public class NotificationService
	{
		private static final Logger	mLogger	= Logger.getLogger( NotificationService.class.getPackage().getName() );
		
		@SuppressWarnings( "unchecked" )
        public static void updateCommitInfoInBadge( String commitInfoAsJSON )
	        {
	        	UserCommitBadge userCommitBadge = null;
	        	String userId = "";
	        	Map<String,Object> notificationMap = null, pusherMap = null;
	        	List <Map<String,Object>> listOfCommitsMap = null;
	        	ObjectMapper objectMapper = new ObjectMapper();
	        	
	        	try
					{
						commitInfoAsJSON = URLDecoder.decode( commitInfoAsJSON , "UTF-8" );
						
						mLogger.log( java.util.logging.Level.INFO , "\ncommitInfoAsJSON: " + commitInfoAsJSON);
						
						commitInfoAsJSON = commitInfoAsJSON.replace( "payload=" , "" );
						
						notificationMap = objectMapper.readValue( commitInfoAsJSON , new TypeReference<Map<String,Object>>(){} );
						pusherMap = (Map<String,Object>) notificationMap.get( "pusher" );
						
						userId = (String) pusherMap.get( "email" );
						
						mLogger.log( java.util.logging.Level.INFO , "\n userId: " + userId);
						
						userCommitBadge = NotificationDAO.getUserCommitBadge( userId );
						
						if(userCommitBadge!=null)
							userCommitBadge.setCount( userCommitBadge.getCount() + 1 );
						else
							{
								userCommitBadge = new UserCommitBadge();
								
								userCommitBadge.setUserId( userId );
								userCommitBadge.setCount( 1 );
							}
						
						userCommitBadge = NotificationDAO.createUserCommitBadge( userCommitBadge );
						
						mLogger.log( java.util.logging.Level.INFO , "\n userId: " + userId + "count: " + userCommitBadge.getCount());
					}
				catch(Exception ex)
					{
						mLogger.log( java.util.logging.Level.SEVERE , "\n userId: " + userId + "\ncommitInfoAsJSON: " + commitInfoAsJSON, ex );
					}
	        }
	}
