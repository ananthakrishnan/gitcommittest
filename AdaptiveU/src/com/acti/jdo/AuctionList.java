package com.acti.jdo;

import java.io.Serializable;
import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Text;

@PersistenceCapable
public class AuctionList  implements Serializable
{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;
	
	private String auctionAssignee;
	
	private String auctionName;
	
	private String auctionImgId;
	
	private String auctionMins;
	
	private String auctionMaxPoints;
	
	private String auctionStartDate;
	
	private String auctionEndDate;
	
	private long auctionStartTime;
	
	private long auctionEndTime;
	
	private Text auctionDescription;
	
	private String companyId;
	
	public long getAuctionStartTime() {
		return auctionStartTime;
	}

	public void setAuctionStartTime(long auctionStartTime) {
		this.auctionStartTime = auctionStartTime;
	}

	public long getAuctionEndTime() {
		return auctionEndTime;
	}

	public void setAuctionEndTime(long auctionEndTime) {
		this.auctionEndTime = auctionEndTime;
	}

	public String getAuctionStartDate() {
		return auctionStartDate;
	}

	public void setAuctionStartDate(String auctionStartDate) {
		this.auctionStartDate = auctionStartDate;
	}

	public String getAuctionEndDate() {
		return auctionEndDate;
	}

	public void setAuctionEndDate(String auctionEndDate) {
		this.auctionEndDate = auctionEndDate;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getAuctionName() {
		return auctionName;
	}

	public void setAuctionName(String auctionName) {
		this.auctionName = auctionName;
	}

	public String getAuctionImgId() {
		return auctionImgId;
	}

	public void setAuctionImgId(String auctionImgId) {
		this.auctionImgId = auctionImgId;
	}

	public String getAuctionMins() {
		return auctionMins;
	}

	public void setAuctionMins(String auctionMins) {
		this.auctionMins = auctionMins;
	}

	public String getAuctionMaxPoints() {
		return auctionMaxPoints;
	}

	public void setAuctionMaxPoints(String auctionMaxPoints) {
		this.auctionMaxPoints = auctionMaxPoints;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getAuctionAssignee() {
		return auctionAssignee;
	}

	public void setAuctionAssignee(String auctionAssignee) {
		this.auctionAssignee = auctionAssignee;
	}

	public Text getAuctionDescription() {
		return auctionDescription;
	}

	public void setAuctionDescription(Text auctionDescription) {
		this.auctionDescription = auctionDescription;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	
	
}
