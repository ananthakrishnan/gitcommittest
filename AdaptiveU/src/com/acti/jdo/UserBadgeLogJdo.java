package com.acti.jdo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(detachable = "true")
public class UserBadgeLogJdo implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
	private String key;	
	
	@Persistent
	private String companyId;
	
	@Persistent
	private String userId;
	
	@Persistent
	private ArrayList<String> badgeId;
	
	@Persistent
	private ArrayList<String> trophyId;
	
	@Persistent
	private ArrayList<String> stuffId;
	
	@Persistent
	private ArrayList<String> auctionId;
	
	@Persistent
	private Integer points;
	
	@Persistent
	private ArrayList<String> badgesWorkingOn;
	
	@Persistent
	private ArrayList<String> trophiesWorkingOn;
	
	
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public ArrayList<String> getBadgeId() {
		return badgeId;
	}
	public void setBadgeId(ArrayList<String> badgeId) {
		this.badgeId = badgeId;
	}
	public ArrayList<String> getTrophyId() {
		return trophyId;
	}
	public void setTrophyId(ArrayList<String> trophyId) {
		this.trophyId = trophyId;
	}
	public ArrayList<String> getStuffId() {
		return stuffId;
	}
	public void setStuffId(ArrayList<String> stuffId) {
		this.stuffId = stuffId;
	}
	public Integer getPoints() {
		return points;
	}
	public void setPoints(Integer points) {
		this.points = points;
	}
	public ArrayList<String> getBadgesWorkingOn() {
		return badgesWorkingOn;
	}
	public void setBadgesWorkingOn(ArrayList<String> badgesWorkingOn) {
		this.badgesWorkingOn = badgesWorkingOn;
	}
	public ArrayList<String> getTrophiesWorkingOn() {
		return trophiesWorkingOn;
	}
	public void setTrophiesWorkingOn(ArrayList<String> trophiesWorkingOn) {
		this.trophiesWorkingOn = trophiesWorkingOn;
	}
	public ArrayList<String> getAuctionId() {
		return auctionId;
	}
	public void setAuctionId(ArrayList<String> auctionId) {
		this.auctionId = auctionId;
	}
	


	}
