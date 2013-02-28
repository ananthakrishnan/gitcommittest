/**
 * 
 */
package com.acti.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.collections.MultiHashMap;
import org.apache.commons.collections.MultiMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.SerializationConfig;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.acti.jdo.BadgesList;
import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStuffInfo;
import com.acti.jdo.UserStatusDetails;


import javax.jdo.Query;
import javax.mail.Session;

import com.google.appengine.api.datastore.Text;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 * @author Saranya
 *
 */
@Controller
public class EditController extends HttpServlet{
	private static final Logger log = Logger.getLogger(EditController.class.getName());
	

			@RequestMapping(value="/conversion1" , method=RequestMethod.GET)
			protected void conversionservice1(HttpServletRequest request,HttpServletResponse response)
			{
				PersistenceManager pmuser = PMF.get().getPersistenceManager();
				Query queryUserDetails =pmuser.newQuery(UserStuffInfo.class);
				List<UserStuffInfo> usersInfo = (List<UserStuffInfo>)queryUserDetails.execute();
				for(UserStuffInfo userslist: usersInfo)
				{
					if(userslist.getTypeRequested().equals("badge"))
					{	
							PersistenceManager pmuser1 = PMF.get().getPersistenceManager();
							Query userstatusdetails =pmuser1.newQuery(UserStatusDetails.class,"userId ==  '"+userslist.getUserId()+"' && stuffid == '"+userslist.getStuffid()+"'");
							List<UserStatusDetails> userstat = (List<UserStatusDetails>)userstatusdetails.execute();
							if(userstat.isEmpty())
							{
								if(userslist.getVideoid()==null)
								{
									/*if(userslist.getStatus().equals("finished"))
											{
										
											}
									else{
							                PersistenceManager freshrowvthoutvideo =PMF.get().getPersistenceManager();
											UserStatusDetails userstatustableupdate=new UserStatusDetails();
											UUID id = UUID.randomUUID();
											userstatustableupdate.setKey(id.toString());
											userstatustableupdate.setStatus(userslist.getStatus());
											if(userslist.getStatus().equals("approved"))
											{
												userstatustableupdate.setBadgeAssignee(userslist.getBadgeAssignee());
											}
											else if(userslist.getStatus().equals("requested"))
											{
												userstatustableupdate.setBadgeReqContent(userslist.getBadgeReqContent());
											}
											userstatustableupdate.setTypeRequested(userslist.getTypeRequested());
											userstatustableupdate.setUserId(userslist.getUserId());
											userstatustableupdate.setCompanyId("3f6f330b-6010-4349-b3a7-f0332eeeef39");
											userstatustableupdate.setDateAdded(userslist.getDateAdded());
											userstatustableupdate.setStuffid(userslist.getStuffid());
											 try
										      {
												 freshrowvthoutvideo.makePersistent(userstatustableupdate);
										      }
										      catch(Exception e)
										      {
										       e.printStackTrace();
										      }
									}*/
						               
								}
								else
								{
									if(!userslist.getStatus().equals("finished"))
									{
										PersistenceManager freshrowvthvideo =PMF.get().getPersistenceManager();
										UserStatusDetails userstatustablemodify=new UserStatusDetails();
										UUID id = UUID.randomUUID();
										userstatustablemodify.setKey(id.toString());
										userstatustablemodify.setStatus(userslist.getStatus());
										userstatustablemodify.setTypeRequested(userslist.getTypeRequested());
										userstatustablemodify.setUserId(userslist.getUserId());
										userstatustablemodify.setCompanyId("3f6f330b-6010-4349-b3a7-f0332eeeef39");
										userstatustablemodify.setDateAdded(userslist.getDateAdded());
										userstatustablemodify.setStuffid(userslist.getStuffid());
										if(userslist.getStatus().equals("requested"))
										{
											userstatustablemodify.setBadgeReqContent(userslist.getBadgeReqContent());
										}
										ArrayList<String> al=new ArrayList<String>();
										al.add(userslist.getVideoid()+":"+userslist.getPercentagecompleted());
										userstatustablemodify.setVideostatus(al);
										try
									      {
											freshrowvthvideo.makePersistent(userstatustablemodify);
									      }
									      catch(Exception e)
									      {
									       e.printStackTrace();
									      }
									}
									
									
								}
							}
							else
							{
								for(UserStatusDetails usertatus:userstat)
								{
									if(userslist.getVideoid()==null)
									{
										/*
									    if(userslist.getStatus().equals("approved"))
										{
											for(UserStatusDetails usertatus1:userstat)
											{
												if(usertatus1.getUserId().equals(userslist.getUserId())&&usertatus1.getStuffid().equals(userslist.getStuffid()))
												{
													usertatus1.setStatus(userslist.getStatus());
													usertatus1.setBadgeAssignee(userslist.getBadgeAssignee());
													pmuser1.currentTransaction().begin();
													pmuser1.makePersistent(usertatus);
													pmuser1.currentTransaction().commit();
												}	
											}
										}
									    else if(userslist.getStatus().equals("finished"))
									    {
									    	for(UserStatusDetails usertatus1:userstat)
											{
												if(usertatus1.getUserId().equals(userslist.getUserId())&&usertatus1.getStuffid().equals(userslist.getStuffid()))
												{
													usertatus1.setStatus("approved");
													usertatus1.setBadgeReqContent(userslist.getBadgeReqContent());
													pmuser1.currentTransaction().begin();
													pmuser1.makePersistent(usertatus);
													pmuser1.currentTransaction().commit();
												}	
											}
									    }
										*/
									}
									else
									{
										PersistenceManager updaterowvthvideo =PMF.get().getPersistenceManager();
										 if(usertatus.getVideostatus()!=null)
										{
											ArrayList<String> al=new ArrayList<String>();
											al=usertatus.getVideostatus();
											al.add(userslist.getVideoid()+":"+userslist.getPercentagecompleted());
											usertatus.setVideostatus(al);
										}
										
										pmuser1.currentTransaction().begin();
										pmuser1.makePersistent(usertatus);
										pmuser1.currentTransaction().commit();
										
									}
									
								}
							}
					}
					else
					{
						/*
						PersistenceManager pmuser1 = PMF.get().getPersistenceManager();
						Query userstatusdetails =pmuser1.newQuery(UserStatusDetails.class,"userId ==  '"+userslist.getUserId()+"' && stuffid == '"+userslist.getStuffid()+"'");
						List<UserStatusDetails> userstat = (List<UserStatusDetails>)userstatusdetails.execute();
						if(userstat.isEmpty())
						{
							PersistenceManager storeinuserstat = PMF.get().getPersistenceManager();
							  UserStatusDetails fornewworkonbadge = new UserStatusDetails();
						      UUID id = UUID.randomUUID();
						      fornewworkonbadge.setKey(id.toString());
						      fornewworkonbadge.setStatus(userslist.getStatus());
						      fornewworkonbadge.setTypeRequested(userslist.getTypeRequested());
						      fornewworkonbadge.setUserId(userslist.getUserId());
						      fornewworkonbadge.setCompanyId("3f6f330b-6010-4349-b3a7-f0332eeeef39");
						      fornewworkonbadge.setDateAdded(userslist.getDateAdded());
						      fornewworkonbadge.setStuffid(userslist.getStuffid());
						         if((userslist.getStatus().equals("approved")))
						    		  {
						        	 fornewworkonbadge.setBadgeAssignee(userslist.getBadgeAssignee());
						    		  }
						      try
						      {
						    	 
						    	  storeinuserstat.makePersistent(fornewworkonbadge);
						      }
						      catch(Exception e)
						      {
						       e.printStackTrace();
						      }
						}
						else
						{
							for(UserStatusDetails usertatus1:userstat)
							{
								if(usertatus1.getUserId().equals(userslist.getUserId())&&usertatus1.getStuffid().equals(userslist.getStuffid()) && userslist.getStatus().equals("approved"))
								{
									usertatus1.setStatus("approved");
									usertatus1.setBadgeAssignee(userslist.getBadgeAssignee());
									pmuser1.currentTransaction().begin();
									pmuser1.makePersistent(usertatus1);
									pmuser1.currentTransaction().commit();
								}
								else
								{
									
								}
							}
						}*/
					}
				}
			}
			
			/*@RequestMapping(value="/editManageTeam" , method=RequestMethod.GET)
			public void addDomainName(HttpServletRequest request,HttpServletResponse response)
			{
				PersistenceManager pmSearch = PMF.get().getPersistenceManager();
				try
				{
					Query queryUserDetails =pmSearch.newQuery(UserProfile.class);
					List<UserProfile> usersInfo = (List<UserProfile>)queryUserDetails.execute();
				
					for(UserProfile usersInfoDetail: usersInfo)
					{
						if(usersInfoDetail.getcompanyId().equalsIgnoreCase("3f6f330b-6010-4349-b3a7-f0332eeeef39"))
						{
							usersInfoDetail.setcompanyName("Adaptavant");
							pmSearch.currentTransaction().begin();
							pmSearch.makePersistent(usersInfoDetail);
							pmSearch.currentTransaction().commit();
						}
					}
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
				
			}*/
			
			@RequestMapping(value="/addFlag" , method=RequestMethod.GET)
			public void setBadgeFlag(HttpServletRequest request,HttpServletResponse response){
				 PersistenceManager pmnew = PMF.get().getPersistenceManager();
				 try{
				 Query query = pmnew.newQuery(BadgesList.class);
				 List<BadgesList> flagsss=(List<BadgesList>) query.execute();
				 for(BadgesList looping : flagsss){
					 pmnew.currentTransaction().begin();
				 looping.setIsFlag("enabled");
				 pmnew.makePersistent(looping);
				 pmnew.currentTransaction().commit();
				 
				 }
				 }catch(Exception e)
					{
						e.printStackTrace();
					}
				}
			@RequestMapping(value="/editManageTeamUser" , method=RequestMethod.GET)
			public void editTypingBadge(HttpServletRequest request,HttpServletResponse response){
				PersistenceManager pmnew = PMF.get().getPersistenceManager();//b33a8552-9f89-4bed-b2b2-ea1d3000004d
				 try
				 {
					 ManageTeamJdo tempBadgeList =  pmnew.getObjectById(ManageTeamJdo.class,"267ccff8-dc30-4cc5-b052-beff63e282c2"); 
					 ArrayList<String> allUsers = tempBadgeList.getTeamMembers();
					 allUsers.remove("7530517e-c62c-4f97-a0f0-c877a054ef09");
					 tempBadgeList.setTeamMembers(allUsers);
					 pmnew.currentTransaction().begin();
					 pmnew.makePersistent(tempBadgeList);
					 pmnew.currentTransaction().commit();
				 }
				 catch(Exception e)
				 {
					 e.printStackTrace();
				 }
			}
			
}

