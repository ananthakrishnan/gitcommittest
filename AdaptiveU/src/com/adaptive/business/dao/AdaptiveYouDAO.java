package com.adaptive.business.dao;

public interface AdaptiveYouDAO 
{
	/**
	 * @param companyKey
	 * @return This method returns String with badgeslist of a company
	 */
	public String getDataFromBadgeListTable(String companyId);
	
	/**
	 * @param companyKey
	 * @return This method returns String with UserStatusDetails of a company
	 */
	public  String getDataFromUserStatusDetails(String companyId);
	
	/**
	 * @param companyKey
	 * @return This method returns String with UserProfile of a company
	 */
	public  String getDataFromUserProfile(String companyId);
	
	/**
	 * @param companyKey
	 * @return This method returns String with videodetails of a company
	 */
	public  String getDataFromVideoDetails(String companyId);
	
	/**
	 * @param companyKey
	 * @return This method returns String with TeamDetails of a company
	 */
	
	public  String getDataFromManageTeamJdo(String companyId);
	
	/**
	 * @param companyKey
	 * @return This method returns String with UserBadgeLogJDo of a company
	 */
	
	public String getDataFromUserBadgeLogJdo(String companyId);
	
	/**
	 * @param companyKey
	 * @return This method returns String with AuctionsList of a company
	 */
	
	public String getDataFromAuctionListTable(String companyId);
	
	public String getUserProfileInformation(String userKey);
}
