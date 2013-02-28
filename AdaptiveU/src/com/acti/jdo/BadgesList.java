/**
 * 
 */
package com.acti.jdo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Text;


@PersistenceCapable
public class BadgesList implements Serializable{
	
	
	/**
	 * femina
	 */
	private static final long serialVersionUID = 1L;

	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;

    
    @Persistent
    private String badgeName;
    @Persistent
    private Integer badgeValue;
    @Persistent
    private Date createdDate;
    @Persistent
    private Text badgeDiscription;
    @Persistent
    private String badgeLogoPath;
    @Persistent 
    private String badgeType;
    @Persistent 
    private String isFlag;
    @Persistent 
    private ArrayList<String> badgeTagsContents;
    @Persistent 
    private String contentType;
    
    @Persistent
    private Integer quantity;
 // navya code starts
    @Persistent
    private ArrayList<String> badgeGroup;
    
    @Persistent
    private String canEarnedTwice;
    
    public ArrayList<String> getBadgeGroup() {
		return badgeGroup;
	}
	public void setBadgeGroup(ArrayList<String> badgeGroup) {
		this.badgeGroup = badgeGroup;
	}
// end code 
    
    @Persistent
    private String badgeImageBlobkey;
    
    public String getBadgeImageBlobkey() {
		return badgeImageBlobkey;
	}
	public void setBadgeImageBlobkey(String badgeImageBlobkey) {
		this.badgeImageBlobkey = badgeImageBlobkey;
	}
    
    public Integer getQuantity() {
		return quantity;
	}
	public void setQunatity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
    
    public ArrayList<String> getBadgeTagsContents() {
		return badgeTagsContents;
	}
	public void setBadgeTagsContents(ArrayList<String> badgeTagsContents) {
		this.badgeTagsContents = badgeTagsContents;
	}

  public String getIsFlag() {
		return isFlag;
	}
	public void setIsFlag(String isFlag) {
		this.isFlag = isFlag;
	}

private ArrayList<String> videoid;
  
  @Persistent
	private String companyId;
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public ArrayList<String> getVideoid() {
	return videoid;
}

public void setVideoid(ArrayList<String> videoid) {
	this.videoid = videoid;
}

	@Persistent
    private String badgeAssignee;
       /* @Persistent
    private Long VidID;*/
    
    public String getKey() {
        return key;
    }
    
    public void setKey(String key) {
		this.key = key;
	}
    
    public void setbadgeAssignee(String badgeAssignee) {
		this.badgeAssignee = badgeAssignee;
	}
    
    public String getbadgeAssignee()
    {
    	return  badgeAssignee;
    }
	
    public void setBadgeLogoPath(String badgeLogoPath) {
		this.badgeLogoPath = badgeLogoPath;
	}
    
    public String getBadgeLogoPath()
    {
    	return  badgeLogoPath;
    }
    
    public String getbadgeType()
    {
    	return badgeType;
    }
    
    public void setbadgeType(String badgeType)
    {
    	this.badgeType = badgeType;
    }
    
    
    public void setBadgeName(String badgeName) {
		this.badgeName = badgeName;
	}
    public String getBadgeName() {
        return badgeName;
    }
    
    public void setbadgeValue(Integer badgeValue) {
		this.badgeValue = badgeValue;
	}
    public Integer getbadgeValue() {
        return badgeValue;
    }
    
    public void setcreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
    public Date getcreatedDate() {
        return createdDate;
    }
    
    public void setbadgeDiscription(Text badgeDiscription) {
		this.badgeDiscription = badgeDiscription;
	}
    
    public Text getbadgeDiscription() {
        return badgeDiscription;
    }
	public String getCanEarnedTwice() {
		return canEarnedTwice;
	}
	public void setCanEarnedTwice(String canEarnedTwice) {
		this.canEarnedTwice = canEarnedTwice;
	}
}
