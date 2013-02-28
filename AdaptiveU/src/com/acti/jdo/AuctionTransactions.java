package com.acti.jdo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable
public class AuctionTransactions implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;
	
	private String userId;
	
	private String auctionId;
	
	private long requestedTime;
	
	private Integer bidPoints;
	
	  @Persistent(serialized = "true", defaultFetchGroup = "true")
	  private Map<Integer, Long> previousAuctionMap = new LinkedHashMap<Integer, Long>();
	
	private String companyKey;
	
	

	public String getCompanyKey() {
		return companyKey;
	}

	public void setCompanyKey(String companyKey) {
		this.companyKey = companyKey;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getAuctionId() {
		return auctionId;
	}

	public void setAuctionId(String auctionId) {
		this.auctionId = auctionId;
	}

	public long getRequestedTime() {
		return requestedTime;
	}

	public void setRequestedTime(long requestedTime) {
		this.requestedTime = requestedTime;
	}

	public Integer getBidPoints() {
		return bidPoints;
	}

	public void setBidPoints(Integer bidPoints) {
		this.bidPoints = bidPoints;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Map<Integer, Long> getPreviousBids() {
		return previousAuctionMap;
	}

	public void setPreviousBids(Map<Integer, Long> previousAuctionMap) {
		this.previousAuctionMap = previousAuctionMap;
	}
	

}
