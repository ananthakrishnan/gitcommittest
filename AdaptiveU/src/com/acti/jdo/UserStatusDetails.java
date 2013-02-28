package com.acti.jdo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;


import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;




@PersistenceCapable
public class UserStatusDetails implements Serializable{
	
	@PrimaryKey
	@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private String Key;
	
	@Persistent
	private String userId;
	
	private Date dateAdded;
	
	private Date dateRequested;


	private Date dateApproved;

	private String status;
		
	private String typeRequested;
	
	private String stuffid;
	
	private String userStatusKey;
	

     private ArrayList<String> videostatus;
	
	public String getKey() {
	return Key;
}

public void setKey(String key) {
	Key = key;
}


public Date getDateRequested() {
	return dateRequested;
}

public void setDateRequested(Date dateRequested) {
	this.dateRequested = dateRequested;
}

public Date getDateApproved() {
	return dateApproved;
}

public void setDateApproved(Date dateApproved) {
	this.dateApproved = dateApproved;
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

public String getStuffid() {
	return stuffid;
}

public void setStuffid(String stuffid) {
	this.stuffid = stuffid;
}



public ArrayList<String> getVideostatus() {
	return videostatus;
}

public void setVideostatus(ArrayList<String> videostatus) {
	this.videostatus = videostatus;
}

public String getBadgeAssignee() {
	return badgeAssignee;
}

public void setBadgeAssignee(String badgeAssignee) {
	this.badgeAssignee = badgeAssignee;
}

public String getBadgeReqContent() {
	return badgeReqContent;
}

public void setBadgeReqContent(String badgeReqContent) {
	this.badgeReqContent = badgeReqContent;
}

public String getCompanyId() {
	return companyId;
}

public void setCompanyId(String companyId) {
	this.companyId = companyId;
}

	public String getUserStatusKey() {
	return userStatusKey;
}

public void setUserStatusKey(String userStatusKey) {
	this.userStatusKey = userStatusKey;
}

	private String badgeAssignee;
	
	private String badgeReqContent;
	
	@Persistent
	private String companyId;
	
	

	

}
