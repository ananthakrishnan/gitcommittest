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

/**
 * @author Saranya
 *
 */
@PersistenceCapable
public class ManageTeamJdo implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    private String key;
	@Persistent
	private String 	teamName;
	
	@Persistent
	private Integer 	teamOrder;
	
	@Persistent
	private String 	companyId;
	
	@Persistent
	private Date date;
	
	@Persistent
	private String deleteFlag;
	
	@Persistent
	private ArrayList<String> teamMembers;
	
	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public Integer getTeamOrder() {
		return teamOrder;
	}

	public void setTeamOrder(Integer teamOrder) {
		this.teamOrder = teamOrder;
	}

	public String getCompanyId() {
		return companyId;
	}

	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public ArrayList<String> getTeamMembers() {
		return teamMembers;
	}

	public void setTeamMembers(ArrayList<String> teamMembers) {
		this.teamMembers = teamMembers;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
	
	

}
