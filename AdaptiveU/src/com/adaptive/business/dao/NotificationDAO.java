package com.adaptive.business.dao;

import java.util.ArrayList;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;

import com.acti.jdo.PMF;
import com.acti.jdo.UserCommitBadge;

public class NotificationDAO
	{
		public static UserCommitBadge getUserCommitBadge( String userId ) throws Exception
			{
				UserCommitBadge userCommitBadge = null;
				List <UserCommitBadge> userCommitBadgeListFromDb , userCommitBadgeList = null;
				PersistenceManager pm = PMF.get().getPersistenceManager();
				Query query = null;

				try
					{
						query = pm.newQuery( UserCommitBadge.class , "userId == '" + userId + "'" );
						userCommitBadgeListFromDb = (List <UserCommitBadge>) query.execute();
						userCommitBadgeList = new ArrayList <UserCommitBadge>( userCommitBadgeListFromDb );

						if ( userCommitBadgeList != null || !userCommitBadgeList.isEmpty() )
							userCommitBadge = userCommitBadgeList.get( 0 );
					}
				finally
					{
						pm.close();
					}

				return userCommitBadge;
			}

		public static UserCommitBadge createUserCommitBadge( UserCommitBadge userCommitBadge ) throws Exception
			{
				UserCommitBadge persistedUserCommitBadge = null;
				PersistenceManager pm = PMF.get().getPersistenceManager();

				try
					{
						persistedUserCommitBadge = pm.makePersistent( userCommitBadge );
					}
				finally
					{
						pm.close();
					}
				
				return persistedUserCommitBadge;
			}
	}
