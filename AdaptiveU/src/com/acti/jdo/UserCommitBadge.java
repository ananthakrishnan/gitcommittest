package com.acti.jdo;

import java.io.Serializable;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class UserCommitBadge implements Serializable
	{
		/**
	 * 
	 */
		private static final long	serialVersionUID	= 6721734058763467205L;

		@PrimaryKey
		private String		      userId;
		
		private String		      userName;
		
		@Persistent
		private Integer		      count;

		public String getUserId()
			{
				return userId;
			}

		public void setUserId( String userId )
			{
				this.userId = userId;
			}

		public Integer getCount()
			{
				return count;
			}

		public void setCount( Integer count )
			{
				this.count = count;
			}
		
	}
