package com.acti.jdo;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import com.google.appengine.api.datastore.Key;


import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class UserProfile implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;

    @Persistent
    private String userName;
    @Persistent
    private String firstName;
    @Persistent
    private String lastName;
    @Persistent
    private String type;
    @Persistent
    private Date loginTime;
    @Persistent
    private Date logoutTime;
    @Persistent
    private String profilePicture;
    @Persistent
    private String companyName;
    @Persistent
    private String companyId;
    @Persistent
    private String domain;
    @Persistent
    private ArrayList<String> profileUpdate;
    @Persistent
    private String profileAccess;
    
    public String getProfileAccess() {
		return profileAccess;
	}
	public void setProfileAccess(String profileAccess) {
		this.profileAccess = profileAccess;
	}
    
    @Persistent
    private String cmsKey;
    
    public String getCmsKey() {
		return cmsKey;
	}
	public void setCmsKey(String cmsKey) {
		this.cmsKey = cmsKey;
	}
	public ArrayList<String> getProfileUpdate() {
  		return profileUpdate;
  	}
  	public void setProfileUpdate(ArrayList<String> profileUpdate) {
  		this.profileUpdate = profileUpdate;
  	}
    public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public UserProfile()
    {
    	
    }
    public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

    public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Date getLoginTime() {
		return loginTime;
	}
	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}
	public Date getLogoutTime() {
		return logoutTime;
	}
	public void setLogoutTime(Date logoutTime) {
		this.logoutTime = logoutTime;
	}
	public String getKey() {
        return key;
    }

    public String getuserName() {
        return userName;
    }
    public void setuserName(String userName) {
        this.userName = userName;
    }
    
    public String getprofilePicture() {
        return profilePicture;
    }
    public void setprofilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
	/**
	 * @param string
	 */
	public void setKey(String key) {
		this.key = key;
	}

	public String getcompanyName() {
        return companyName;
    }
    public void setcompanyName(String companyName) {
        this.companyName = companyName;
    }
    

    
    public String getcompanyId() {
        return companyId;
    }
    public void setcompanyId(String companyId) {
        this.companyId = companyId;
    }
   
}