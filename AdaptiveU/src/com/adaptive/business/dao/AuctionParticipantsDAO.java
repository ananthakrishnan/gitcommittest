package com.adaptive.business.dao;

import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.acti.controller.ApproveBadgePageController;
import com.acti.jdo.AuctionParticipants;
import com.acti.jdo.PMF;

public class AuctionParticipantsDAO {

	private static final Logger log = Logger.getLogger(ApproveBadgePageController.class.getName());
	public static AuctionParticipants saveAuctionParticipants(AuctionParticipants objAuctionParticipants){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objAuctionParticipants);
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting AuctionParticipants Object");
		}
		
		return objAuctionParticipants;
	}

}
