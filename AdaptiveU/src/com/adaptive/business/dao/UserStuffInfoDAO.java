package com.adaptive.business.dao;

import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.acti.jdo.PMF;
import com.acti.jdo.UserStuffInfo;

public class UserStuffInfoDAO {
	private static final Logger log = Logger.getLogger(UserStuffInfoDAO.class.getName());
	public static UserStuffInfo saveUserStuffInfo(UserStuffInfo objUserStuffInfo){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objUserStuffInfo);
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting UserStatusDetails Object");
		}
		
		return objUserStuffInfo;
	}
}
