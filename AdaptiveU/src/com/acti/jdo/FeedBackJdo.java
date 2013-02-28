/**
 * 
 */
package com.acti.jdo;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

/**
 * @author Saranya
 *
 */
@PersistenceCapable
public class FeedBackJdo {

	
	
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
    private String key;
	
	
	@Persistent
	private String comments;
	
	
	@Persistent
	private String userName;
	
	
	@Persistent
	private String date;
	
	
	@Persistent
	private String feedback_type;
	
	
	public String getFeedback_type() {
		return feedback_type;
	}
	
	public void setFeedback_type(String feedback_type) {
		this.feedback_type = feedback_type;
	}

	
	public String getUserName(){
		return userName;
	}
	
	
	public void setUser(String userName)
	{
		this.userName=userName;
	}
	
	
	
	public String getComments()
	{
		return comments;
	}
	
	public void setComments(String comments)
	{
		this.comments=comments;
	}
	
	
	public void setKey(String key) {
		this.key = key;
	}
	public String getKey() {
		return key;
	}

	
	
	public String getDate()
	{
		return date;
	}
	public void setDate(String date)
	{
		this.date=date;
	}
	

}
