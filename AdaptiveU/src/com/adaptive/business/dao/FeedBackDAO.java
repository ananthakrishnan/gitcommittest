package com.adaptive.business.dao;

import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.acti.controller.ApproveBadgePageController;
import com.acti.jdo.FeedBackJdo;
import com.acti.jdo.PMF;

public class FeedBackDAO {
	private static final Logger log = Logger.getLogger(FeedBackDAO.class.getName());
	public static FeedBackJdo saveFeedBackJDO(FeedBackJdo objFeedBackJDO){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objFeedBackJDO);
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting FeedBackJDO Object");
		}
		
		return objFeedBackJDO;
	}
}
