package com.adaptive.business.dao;

import java.util.logging.Logger;

import javax.jdo.PersistenceManager;

import com.acti.controller.ApproveBadgePageController;
import com.acti.jdo.AuctionTransactions;
import com.acti.jdo.PMF;

public class AuctionTransactionsDAO {

	private static final Logger log = Logger.getLogger(ApproveBadgePageController.class.getName());
	public static AuctionTransactions saveAuctionTransactions(AuctionTransactions objAuctionTransactions){
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try{
			pm.currentTransaction().begin();
			pm.makePersistent(objAuctionTransactions);
			pm.currentTransaction().commit();
		}
		catch(Exception e)
		{
			log.warning("Exception Occured while Persisting AuctionParticipants Object");
		}
		
		return objAuctionTransactions;
	}
}
