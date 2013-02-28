package com.acti.jdo;

import java.io.Serializable;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;


@PersistenceCapable(detachable = "true")
public class UserStuffInfo implements Serializable{
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private String Key;
	
	@Persistent
	private String userId;
	
	private Date dateAdded;
	
	private String status;
		
	private String typeRequested;
	
	private String stuffid;
	
	private String percentagecompleted;
	
	private String videoid;
	
	private String badgeAssignee;
	
	private String badgeReqContent;
	
	
	@Persistent
	private String companyId;
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	
	public String getBadgeReqContent() {
		return badgeReqContent;
	}

	public void setBadgeReqContent(String badgeReqContent) {
		this.badgeReqContent = badgeReqContent;
	}

	public String getBadgeAssignee() {
		return badgeAssignee;
	}

	public void setBadgeAssignee(String badgeAssignee) {
		this.badgeAssignee = badgeAssignee;
	}

	public String getPercentagecompleted() {
		return percentagecompleted;
	}

	public void setPercentagecompleted(String percentagecompleted) {
		this.percentagecompleted = percentagecompleted;
	}

	public String getVideoid() {
		return videoid;
	}

	public void setVideoid(String videoid) {
		this.videoid = videoid;
	}


	public String getStuffid() {
		return stuffid;
	}

	public void setStuffid(String stuffid) {
		this.stuffid = stuffid;
	}

	public String getKey() {
		return Key;
	}

	public void setKey(String key) {
		Key = key;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Date getDateAdded() {
		return dateAdded;
	}

	public void setDateAdded(Date dateAdded) {
		this.dateAdded = dateAdded;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTypeRequested() {
		return typeRequested;
	}

	public void setTypeRequested(String typeRequested) {
		this.typeRequested = typeRequested;
	}
	
	
	

}
