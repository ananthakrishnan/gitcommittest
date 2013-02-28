package com.adaptive.business.dao;

import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeRequest;

public class UserBadgeRequestDAO {
	private static final Logger log = Logger.getLogger(UserBadgeRequestDAO.class.getName());
	public static UserBadgeRequest saveUserBadgeRequest(UserBadgeRequest objUserBadgeRequest){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objUserBadgeRequest );
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting UserBadgeRequest  Object");
		}
		
		return objUserBadgeRequest ;
	}
}
