package com.acti.jdo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(detachable = "true")
public class badgeLogJDO implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private String userName;	
	@Persistent
	private ArrayList<String> badgeId;

	private String assignee;

	private Date dateAssigned;
	
	//private ArrayList<String> badgeImagePath;
	
	private Integer badgesCount=0;
	
	private Integer trophiesCount=0;

	private Integer points;

	private ArrayList<String> stuffBought;
	
	@Persistent
	private ArrayList<String> badgesworkingon;
	
	@Persistent
	private String companyId;
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	

	public ArrayList<String> getBadgesworkingon() {
		return badgesworkingon;
	}

	public void setBadgesworkingon(ArrayList<String> badgesworkingon) {
		this.badgesworkingon = badgesworkingon;
	}

	public ArrayList<String> getBadgeId() {
		return badgeId;
	}

	public void setBadgeId(ArrayList<String> badgeId) {
		this.badgeId = badgeId;
	}

	public String getAssignee() {
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public Date getDateAssigned() {
		return dateAssigned;
	}

	public void setDateAssigned(Date dateAssigned) {
		this.dateAssigned = dateAssigned;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getBadgesCount() {
		return badgesCount;
	}

	public void setBadgesCount(Integer badgesCount) {
		this.badgesCount = badgesCount;
	}

	public Integer getTrophiesCount() {
		return trophiesCount;
	}

	public void setTrophiesCount(Integer trophiesCount) {
		this.trophiesCount = trophiesCount;
	}
	
	public ArrayList<String> getstuffBought()
	{
		return stuffBought;
	}
	
	public void setstuffBought(ArrayList<String> stuffBought)
	{
		this.stuffBought = stuffBought;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	}
