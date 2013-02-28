package com.adaptive.business.dao;

import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.acti.controller.ApproveBadgePageController;
import com.acti.jdo.badgeLogJDO;
import com.acti.jdo.PMF;

public class badgeLogDAO {
	private static final Logger log = Logger.getLogger(badgeLogDAO.class.getName());
	public static badgeLogJDO savebadgeLog(badgeLogJDO objbadgeLogJDO){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objbadgeLogJDO);
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting badgeLogJDO Object");
		}
		
		return objbadgeLogJDO;
	}
}
