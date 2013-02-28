/**
 * 
 */
package com.acti.jdo;

import java.io.Serializable;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

/**
 * @author Saranya
 *
 */
@PersistenceCapable
public class UserBadgeRequest implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;

    @Persistent
    private String userName;
    
    @Persistent
    private String badgeId;
    
    @Persistent
	private String date;
    
    @Persistent
    private String requestInformation;
    
    @Persistent
	private String companyId;
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
    
    
    public void setKey(String key)
    {
    	this.key = key;
    }
    
    public String getKey()
    {
    	return key;
    }
    
    public void setBadgeId(String badgeId)
    {
    	this.badgeId = badgeId;
    }
    
    public String getBadgeId()
    {
    	return badgeId;
    }
    
    public void setUserName(String userName)
    {
    	this.userName = userName;
    }
    
    public String getUserName()
    {
    	return userName;
    }
    
    public void setrequestInformation(String requestInformation)
    {
    	this.requestInformation = requestInformation;
    }
    
    public String getrequestInformation()
    {
    	return requestInformation;
    }
    
    public String getDate()
	{
		return date;
	}
	public void setDate(String date)
	{
		this.date=date;
	}
    
    
}
