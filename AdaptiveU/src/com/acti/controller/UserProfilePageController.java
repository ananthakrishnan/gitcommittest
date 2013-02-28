package com.acti.controller;
import java.io.IOException;

import com.acti.jdo.BadgesList;

import java.util.*;
import java.util.logging.Logger;


import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.face4j.facebook.Client;
import com.face4j.facebook.Facebook;
import com.face4j.facebook.OAuthAccessToken;
import com.face4j.facebook.entity.User;
import com.face4j.facebook.enums.Display;
import com.face4j.facebook.enums.HttpClientType;
import com.face4j.facebook.enums.Permission;
import com.face4j.facebook.exception.FacebookException;
import com.face4j.facebook.factory.FacebookFactory;
import com.adaptive.business.dao.UserProfileDAO;
import com.adaptive.business.dao.UserStatusDetailsDAO;
import com.adaptive.business.service.UserProfilePage;
import com.google.gson.Gson;
import com.managementsystem.objects.People;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;


import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.*;

import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import static com.google.appengine.api.taskqueue.TaskOptions.Builder.*;

@SuppressWarnings("deprecation")
@Controller
public class UserProfilePageController extends HttpServlet{
	private static final Logger log = Logger.getLogger(UserProfilePageController.class.getName());
	ResourceBundle lResourceBundle = ResourceBundle.getBundle("ApplicationResources");
	@RequestMapping(value="/persistUser" , method=RequestMethod.GET)
	public  String  verifyOpenIdResponseJson(@RequestParam(value="badgedetail", required=false) String badgeid,HttpServletRequest req, HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException
	{
		String emailId 			= (String)session.getAttribute("emailIdFirst");
		String firstName		= (String)session.getAttribute("firstNameFirst");
		String lastName			= (String)session.getAttribute("lastNameFirst");
		String profileImage 	= (String)session.getAttribute("profileImageFirst");
		String referrerUrl		= (String)session.getAttribute("referrerUrl");
		String userType			= "";
		
		
		
			PersistenceManager pm = PMF.get().getPersistenceManager();
			PMF.get().getPersistenceManager();
			PMF.get().getPersistenceManager();
			HttpSession sessionLogin = req.getSession();
			String userKey = "";
			String compId = "";
			try
			{
					if(session.getAttribute("companyKey") != null )
					{
					     compId=session.getAttribute("companyKey").toString();
				    }
					else
					{
						return "login";
				    }
					
					System.out.println(compId+" id");
					
					//log.warning("comes to if");
					emailId = emailId.trim();
					Date now = new Date();
					LinkedHashMap<String,UserProfile> respUserDetails = new LinkedHashMap<String,UserProfile>();
					Query query =pm.newQuery(UserProfile.class,"userName == '"+emailId+"' && companyId == '"+compId+"' && type != 'requested'");//&& type == 'user'
					List<UserProfile> contactDetails = (List<UserProfile>)query.execute();
						if(contactDetails.isEmpty())
						{
							UserProfile u1 = new UserProfile();
								UUID key = UUID.randomUUID();
								 u1.setKey(key.toString());
								 userKey = key.toString();
						         u1.setFirstName(firstName);
						         u1.setuserName(emailId);
						         u1.setLastName(lastName);
						         u1.setType("user");
						         u1.setprofilePicture(profileImage);
						         u1.setDomain(emailId.split("@")[1]);
						         u1.setcompanyId(compId);
						         u1.setLoginTime(now);
						         UserProfileDAO.saveUserProfile(u1);
						         respUserDetails.put(u1.getKey(), u1);
			
							  Gson gson				 = new Gson();
							  gson.toJson(respUserDetails);
						      //log.warning("the sendRespUserDetails List ..."+sendRespUserDetails);
						      ObjectMapper objMapper = new ObjectMapper();
								objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
								objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
								
								 req.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
						      sessionLogin.setAttribute("companyKey",compId);
						      objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
								objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
								
							  sessionLogin.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
						      sessionLogin.setAttribute("userKeyLogin", u1.getKey());
						      sessionLogin.setAttribute("userEmailid",emailId);
						      sessionLogin.setAttribute("userFirstName",firstName);
						      sessionLogin.setAttribute("userLastName", lastName);
						      sessionLogin.setAttribute("userImage",profileImage);
						      session.setAttribute("signinFlagFirst",null);
					}
					else
					{
						//log.warning("comes to else");
						String companyName="";
						for(UserProfile userDls: contactDetails)
						{
							if(userDls.getKey() != null)
							{
								if(!("Company".equalsIgnoreCase(userDls.getType())))
								{
									userKey = userDls.getKey();
									sessionLogin.setAttribute("userKeyLogin", userDls.getKey());//userDls.getKey();
									
									if(!(userDls.getProfileUpdate().isEmpty()))
									{
										if(!(userDls.getProfileUpdate().contains("firstName")) && !(userDls.getProfileUpdate().contains("lastName")))
										{
											userDls.setFirstName(firstName);
											userDls.setLastName(lastName);
										}
										if(!(userDls.getProfileUpdate().contains("profileImage")))
										{
											userDls.setprofilePicture(profileImage);
										}
									}
									else
									{
										userDls.setFirstName(firstName);
										userDls.setLastName(lastName);
										userDls.setprofilePicture(profileImage);
									}
									userDls.setDomain(emailId.split("@")[1]);
									userDls.setLoginTime(now);
									userDls.setcompanyId(compId);
									pm.currentTransaction().begin();
									pm.makePersistent(userDls);
									pm.currentTransaction().commit();
								}
								else if("Company".equalsIgnoreCase(userDls.getType()))
										{
											userKey = userDls.getKey();
											sessionLogin.setAttribute("userKeyLogin", userDls.getKey());//userDls.getKey();
											userDls.setLoginTime(now);
											pm.currentTransaction().begin();
											pm.makePersistent(userDls);
											pm.currentTransaction().commit();
										}
							}
							respUserDetails.put(userDls.getKey(), userDls);
							companyName=userDls.getcompanyName();
							
							userType				= userDls.getType();
						}
						
						
						 Gson gson				 = new Gson();
						  gson.toJson(respUserDetails);
					      ObjectMapper objMapper = new ObjectMapper();
							objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
							objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
							
							 req.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
					      sessionLogin.setAttribute("companyKey",compId);
					      objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
							objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
							
						  sessionLogin.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
					      sessionLogin.setAttribute("userEmailid",emailId);
					      sessionLogin.setAttribute("companyName",companyName);
					      sessionLogin.setAttribute("userFirstName",firstName);
					      sessionLogin.setAttribute("userLastName", lastName);
					      sessionLogin.setAttribute("userImage",profileImage);
					      
					      session.setAttribute("signinFlagFirst",null);
					}
						
						
					UserProfilePage usrprofilepage=new UserProfilePage();
					usrprofilepage.userProfileService(compId,userKey,emailId,req);
					
					session.setAttribute("referrerUrl", null);
					
					if(referrerUrl == null)
					{
						return "user";
					}
					else if((referrerUrl.contains("/userCompanyList") || userType.equalsIgnoreCase("user")) && !(referrerUrl.contains("/others")))
					{
						return "user";
					}
					else
					{
						response.sendRedirect(referrerUrl);
					}
							
				
			}
		catch(Exception e)
		{
			//log.warning("Exception while verifying the google account"+e);
			e.printStackTrace();
			pm.close();
		}
		finally
		{
			//pm.close();
		}
		return "user";
	}
	
	@RequestMapping(value="/storevideopercentage1" , method=RequestMethod.POST)
	protected void savevideopercentagewatched1(@RequestParam(value="userDetailsKey", required=false) String userDetailsKey,@RequestParam(value="status", required=false) String status,@RequestParam(value="videokey", required=false) String videoKey, HttpServletRequest request,HttpServletResponse response)
	{
		log.info("userDetailsKey :: "+userDetailsKey);
		if(userDetailsKey != null && !(userDetailsKey.equals("undefined")) && !(userDetailsKey.equals("")))
		{
			PersistenceManager pmInstance					= 	PMF.get().getPersistenceManager();
			try
			{
				UserStatusDetails userStatusDetailsInfo		= 	pmInstance.getObjectById(UserStatusDetails.class,userDetailsKey);
				
				ArrayList<String> previousVideoStatus		= 	userStatusDetailsInfo.getVideostatus();
				ArrayList<String> newVideoStatus			= 	new ArrayList<String>();
				
				for(String videoStatus	: previousVideoStatus)
				{
					if(videoStatus.contains(videoKey) && !(videoStatus.contains("completed")))
					{
						if(videoStatus.contains(":"))
						{
							String modifyingTheVideoStatus		= 	videoStatus.split(":")[0];
							newVideoStatus.add(modifyingTheVideoStatus+":"+status);
						}
					}
					else
					{
						newVideoStatus.add(videoStatus);
					}
				}
				
				userStatusDetailsInfo.setVideostatus(newVideoStatus);
				pmInstance.makePersistent(userStatusDetailsInfo);
			}
			catch(NullPointerException npe)
			{
				
			}
			catch(Exception e)
			{
				
			}
			finally
			{
				pmInstance.close();
			}
			
			
			/*PersistenceManager addvideo2 = PMF.get().getPersistenceManager();
			UserStatusDetails userStatusDetailsInfo= addvideo2.getObjectById(UserStatusDetails.class,userDetailsKey);
			
					 if(userStatusDetailsInfo.getVideostatus() != null)
					  {
						  ArrayList<String> previousVideoStatus=new ArrayList<String>();
						  previousVideoStatus=userStatusDetailsInfo.getVideostatus();
						  
						  for(String iteratingVideoStatus : previousVideoStatus )
						  {
							  if(iteratingVideoStatus.contains(videoKey))
							  {
								  if(!(iteratingVideoStatus.contains(("completed"))))
								  {
									  int indexOfThisVideo			 = previousVideoStatus.indexOf(iteratingVideoStatus);
									  previousVideoStatus.remove(iteratingVideoStatus);
									  previousVideoStatus.add(indexOfThisVideo,videoKey+":"+status);
								  }
							  }
						  }
//						  for(int j=0;j<userStatusDetailsInfo.getVideostatus().size();j++)
//						  {
//							 if(userStatusDetailsInfo.getVideostatus().get(j).contains(videoKey+":"+"not started") || userStatusDetailsInfo.getVideostatus().get(j).contains(videoKey+":"+"started"))
//							 {
//								 previousVideoStatus.set(j,videoKey+":"+status );
//							 }
//						  }
						  
						  userStatusDetailsInfo.setVideostatus(previousVideoStatus);
						  addvideo2.currentTransaction().begin();
						  addvideo2.makePersistent(userStatusDetailsInfo);
						  addvideo2.currentTransaction().commit();  
					  }
					 response.setContentType("text/html");
					 try 
					 {
						response.getWriter().println("Stored");
					 } 
					 catch (IOException e) {
						e.printStackTrace();
					}*/
		}
		
	}
	
	 @RequestMapping(value="/stopWorkingOnThisBadge",method=RequestMethod.POST)
	 protected void stopWorkOnThisBadge(@RequestParam(value="badgeId", required=false) String badgeId,@RequestParam(value="userKey", required=false) String userKey,@RequestParam(value="companyKey", required=false) String companyKey,@RequestParam(value="userStatusDetailsKey", required=false) String userStatusDetailsKey,HttpServletResponse response)
	 {
	  PersistenceManager pmf      = PMF.get().getPersistenceManager();
	  try
	  {
	   UserStatusDetails userStatusInfo  = pmf.getObjectById(UserStatusDetails.class,userStatusDetailsKey);
	    pmf.currentTransaction().begin();
	    pmf.deletePersistent(userStatusInfo);
	    pmf.currentTransaction().commit();
	      pmf      = PMF.get().getPersistenceManager(); 
	   Query query =  pmf.newQuery(UserBadgeLogJdo.class,"userId == '"+userKey+"' && companyId == '"+companyKey+"'");
	   List<UserBadgeLogJdo> userBadgeLogInfo  = (List<UserBadgeLogJdo>)query.execute();
	   for( UserBadgeLogJdo userInfo:userBadgeLogInfo)
	   {
		    ArrayList<String>  badgesWorkingOn = userInfo.getBadgesWorkingOn();
		    badgesWorkingOn.remove(badgeId);
		    pmf.currentTransaction().begin();
		    userInfo.setBadgesWorkingOn(badgesWorkingOn);
		    pmf.makePersistent(userInfo);
		    pmf.currentTransaction().commit();
	   }
	   
	   response.setContentType("text/html");
	   response.getWriter().println("Success");
	  }
	  catch(Exception e)
	  {
	   e.printStackTrace();
	  }
	  
	 }
	
	@RequestMapping(value="/makeRequestForStuff" , method=RequestMethod.POST)
	protected void addStuff1(@RequestParam(value="stuffid", required=false) String stuffid,@RequestParam(value="points",required=false) String points,@RequestParam(value="userKey", required=false) String userid,@RequestParam(value="uniqueUserKey", required=false) String userStatusDetailsKey,HttpServletRequest request,HttpServletResponse response)
	{
		HttpSession sessionLogin 						= request.getSession();
		PersistenceManager addStuff 					= PMF.get().getPersistenceManager();
		
		String userName									= "";
		String badgeName								= "";
		String type										= "";
		String adminMailId								= "";
		String adminName								= "";
		String adminId									= "";
		String companyId 								= (String)sessionLogin.getAttribute("companyKey");
		
		Date now 										= new Date();
		UserStatusDetails stuffInfo 					= new UserStatusDetails();
		MailingService mail 							= new MailingService();
		
		//UUID id 										= UUID.randomUUID();
		log.info("userStatusDetailsKey :::"+userStatusDetailsKey);
		stuffInfo.setKey(userStatusDetailsKey);
		stuffInfo.setStatus("purchased");
		stuffInfo.setTypeRequested("stuff");
		stuffInfo.setUserId(userid);
		stuffInfo.setCompanyId(companyId);
		stuffInfo.setDateAdded(now);
		stuffInfo.setStuffid(stuffid);
		
		try
		{
			UserStatusDetailsDAO.saveUserStatusDetails(stuffInfo);
			
			BadgesList badgesListInfo					= addStuff.getObjectById(BadgesList.class,stuffid);
			adminId 									= badgesListInfo.getbadgeAssignee();
			badgeName									= badgesListInfo.getBadgeName();
			type										= badgesListInfo.getbadgeType();
			
			UserProfile userProfileDetails				= addStuff.getObjectById(UserProfile.class, userid);
			userName									= userProfileDetails.getFirstName()+" "+userProfileDetails.getLastName();
			
			UserProfile adminDetails					= addStuff.getObjectById(UserProfile.class, adminId);
			adminMailId									= adminDetails.getuserName();
			adminName									= adminDetails.getFirstName();
			
			
			mail.sendMailToAdminAfterRequested(adminMailId, adminName, badgeName , userName , type , now.toString());
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping(value="/saveDescription", method=RequestMethod.POST)
	protected void saveDescription(@RequestParam(value="userStatusKey", required=false) String userStatusDetailsKey,@RequestParam(value="badgeRequestDescription", required=false) String badgeRequestDescription,HttpSession session, HttpServletRequest request,HttpServletResponse response)
	{
		if(badgeRequestDescription != null && !(badgeRequestDescription.equals("undefined")) && badgeRequestDescription.length() < 500)
		{	
			PersistenceManager persist_manager			= PMF.get().getPersistenceManager();
			UserStatusDetails userStatusInfo 			= persist_manager.getObjectById(UserStatusDetails.class,userStatusDetailsKey);
			
			userStatusInfo.setBadgeReqContent(badgeRequestDescription);
			persist_manager.makePersistent(userStatusInfo);
			
			persist_manager.close();
		}
	}
	
	@RequestMapping(value="/updateRequestForBadge" , method=RequestMethod.POST)
	protected void updateRequestForBadge1(@RequestParam(value="userStatusKey", required=false) String userStatusDetailsKey,@RequestParam(value="userId", required=false) String userkey,@RequestParam(value="badgeReqContent",required=false) String badgeReqContent,HttpSession session, HttpServletRequest request,HttpServletResponse response)
	{
		
		PersistenceManager editReqBadge = PMF.get().getPersistenceManager();
		String userName					= "";
		String badgeId					= "";
		String badgeName				= "";
		String type						= "";
		String adminMailId				= "";
		String adminName				= "";
		String adminId					= "";
		
		try
		{
				UserStatusDetails userStatusInfo 			= editReqBadge.getObjectById(UserStatusDetails.class,userStatusDetailsKey);
				
				badgeId 									= userStatusInfo.getStuffid();
				Date now 									= new Date();
				
				userStatusInfo.setDateRequested(now);
				userStatusInfo.setStatus("requested");
				userStatusInfo.setBadgeReqContent(badgeReqContent);
				
				editReqBadge.currentTransaction().begin();
				editReqBadge.makePersistent(userStatusInfo);
				editReqBadge.currentTransaction().commit();
			
				BadgesList badgesListInfo					= editReqBadge.getObjectById(BadgesList.class,badgeId);
				adminId 									= badgesListInfo.getbadgeAssignee();
				badgeName									= badgesListInfo.getBadgeName();
				type										= badgesListInfo.getbadgeType();
				
				UserProfile userProfileDetails				= editReqBadge.getObjectById(UserProfile.class, userkey);
				userName									= userProfileDetails.getFirstName()+" "+userProfileDetails.getLastName();
				
				UserProfile adminDetailsList				= editReqBadge.getObjectById(UserProfile.class,adminId);
				
				if(adminDetailsList != null)
				{
						if(!(adminDetailsList.getuserName().equals("")) && adminDetailsList.getuserName() != null)
						{
							adminMailId								= adminDetailsList.getuserName();
							adminName								= adminDetailsList.getFirstName();
						}
						
					MailingService mail = new MailingService();
					mail.sendMailToAdminAfterRequested(adminMailId, adminName, badgeName , userName , type , now.toString());
				}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}		
	
	@RequestMapping(value="/updatebadgestoworkon" , method=RequestMethod.POST)
	protected void editbadgestoworkondetails1(@RequestParam(value="userStatusDetailsKey", required=false) String userStatusDetailsKey,@RequestParam(value="badgeId", required=false) String badgeid,@RequestParam(value="userid", required=false) String userid,@RequestParam(value="badgeType", required=false) String badgeType,HttpServletRequest request,HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
		{
		     HttpSession lsession= request.getSession();
			PersistenceManager addtostuffinfo = PMF.get().getPersistenceManager();
			PersistenceManager badgestoworkonedit = PMF.get().getPersistenceManager();
			try
			{
				Query querybadgeLog =  badgestoworkonedit.newQuery(UserBadgeLogJdo.class,"userId == '"+userid+"'");
				List<UserBadgeLogJdo> userBadgeLogInfo =  (List<UserBadgeLogJdo>)querybadgeLog.execute();
				for(UserBadgeLogJdo indexUserBadgeLogInfo:userBadgeLogInfo)
				{
					if("badge".equalsIgnoreCase(badgeType))
					{
						ArrayList<String> previousbadgesworkingon = indexUserBadgeLogInfo.getBadgesWorkingOn();
						previousbadgesworkingon.add(badgeid);
						indexUserBadgeLogInfo.setBadgesWorkingOn(previousbadgesworkingon);
					}
					else if("trophy".equalsIgnoreCase(badgeType))
					{
						ArrayList<String> previousTrophiesWorkingon = indexUserBadgeLogInfo.getTrophiesWorkingOn();
						previousTrophiesWorkingon.add(badgeid);
						indexUserBadgeLogInfo.setTrophiesWorkingOn(previousTrophiesWorkingon);
					}
					badgestoworkonedit.currentTransaction().begin();
					badgestoworkonedit.makePersistent(indexUserBadgeLogInfo);
					badgestoworkonedit.currentTransaction().commit();
				}

			}
			catch(Exception e)
			{
			}
			
			 PersistenceManager getvideodetails1 = PMF.get().getPersistenceManager();
			 BadgesList getvideodetails = getvideodetails1.getObjectById(BadgesList.class,badgeid); 
			
			 ArrayList<String> al=new ArrayList<String>();
			 ArrayList<String> badgeVideoDetails= new ArrayList<String>();
			 badgeVideoDetails=getvideodetails.getVideoid();
			 //To update in UserStatusDetails  you need to send the primary key of the user
			 if(badgeVideoDetails.size() > 0)
			 {
				 for(int i=0;i<badgeVideoDetails.size();i++)
			     {
					 al.add(badgeVideoDetails.get(i)+":"+"not started");
				 }
				  Date now = new Date();
					  if(badgeVideoDetails.size()!= 0)
					  {
							  UserStatusDetails fornewworkonbadge = new UserStatusDetails();
						      fornewworkonbadge.setKey(userStatusDetailsKey);
						      fornewworkonbadge.setStatus("working on");
						      fornewworkonbadge.setTypeRequested(badgeType);
						      fornewworkonbadge.setUserId(userid);
						      fornewworkonbadge.setCompanyId((String)lsession.getAttribute("companyKey"));
						      fornewworkonbadge.setDateAdded(now);
						      fornewworkonbadge.setStuffid(badgeid);
						      fornewworkonbadge.setVideostatus(al);
						     
						      try
						      {
						    	  UserStatusDetailsDAO.saveUserStatusDetails(fornewworkonbadge);
						      }
						      catch(Exception e)
						      {
						    	  e.printStackTrace();
						      }
						 
					  }
					
			 }
			  else
			  {
				  Date now = new Date();
				  PersistenceManager addtostuffinfo1 = PMF.get().getPersistenceManager();
				  UserStatusDetails fornewworkonbadge1 = new UserStatusDetails();
				   fornewworkonbadge1.setKey(userStatusDetailsKey);
			       fornewworkonbadge1.setStatus("working on");
			       fornewworkonbadge1.setTypeRequested(badgeType);
			       fornewworkonbadge1.setUserId(userid);
			       fornewworkonbadge1.setCompanyId((String)lsession.getAttribute("companyKey"));
			       fornewworkonbadge1.setDateAdded(now);
			       fornewworkonbadge1.setStuffid(badgeid);
			       UserStatusDetailsDAO.saveUserStatusDetails(fornewworkonbadge1);
			   } 
		}
	
	@RequestMapping(value="/facebookOauthCallback" , method=RequestMethod.GET)
	protected void fbOauth(HttpServletRequest req,HttpServletResponse resp) throws FacebookException, IOException  
	{
		
		HttpSession session = req.getSession(true);

		String redirectURI = "http://my.adaptiveyou.com/facebookOauthCallback";
		Client client = new Client("516319421715805", "540fa8e271ee6b63d76d5174e17e9b8e");
		
		
//		String redirectURI = "http://adaptivecourse.appspot.com/facebookOauthCallback";
//		Client client = new Client("432924960091154", "39486ef8c9f9ae9759ce0d6e175457a1");
		
//		String redirectURI = "http://localhost:8888/facebookOauthCallback";
//		Client client = new Client("135771289896004", "860e48f07a0fbc6b98b24bfa3b556f44");

		
	    FacebookFactory facebookFactory = new FacebookFactory(client,HttpClientType.URL_FETCH_SERVICE);
	    String code = req.getParameter("code");
	    User user = null;
	    if(code == null || code.isEmpty())
	    {
	        String redirectURL = facebookFactory.getRedirectURL(redirectURI, Display.POPUP, Permission.EMAIL, Permission.OFFLINE_ACCESS);
	        resp.sendRedirect(redirectURL);
	    }
	    else
	    {
		    OAuthAccessToken accessToken = facebookFactory.getOAuthAccessToken(code, redirectURI);
		    Facebook facebook = facebookFactory.getInstance(accessToken);
		    user = facebook.getCurrentUser();
		    session.setAttribute("emailIdFirst",user.getLink().replace("http://www.facebook.com/","")+"@facebook.com");
		    session.setAttribute("firstNameFirst",user.getFirstName());
		    session.setAttribute("lastNameFirst",user.getLastName());
		    session.setAttribute("profileImageFirst",user.getPictureURL()+"?type=large");
		    
		    session.setAttribute("facebookAccessToken",accessToken.getAccessToken());
	
		    resp.sendRedirect("/userCompanyList");
	    }
	}
	
	
	@RequestMapping(value="/facebookOpenOauthCallback" , method=RequestMethod.GET)
	protected void fbOpenOauth(HttpServletRequest req,HttpServletResponse resp) throws FacebookException, IOException  
	{
		
		HttpSession session = req.getSession(true);
		session.setAttribute("openLogin", "enabled");
		
		String redirectURI = "http://my.adaptiveyou.com/facebookOpenOauthCallback";
		Client client = new Client("117041998460503", "b166da7444ccb046b79a4eeb7bb7b31c");
		
//		redirectURI = "http://adaptivecourse.appspot.com/facebookOpenOauthCallback";
//		client = new Client("480133158704102", "232a667d221be631244e48dbd9f3e5e2");
		
//		redirectURI = "http://localhost:8888/facebookOpenOauthCallback";
//		client = new Client("300925023352055", "4b112a05b776815a2389b562bf7bd4e6");
		
		
	    FacebookFactory facebookFactory 			= new FacebookFactory(client,HttpClientType.URL_FETCH_SERVICE);
	    String code 								= req.getParameter("code");
	    User user 									= null;
	    if(code == null || code.isEmpty())
	    {
	        String redirectURL = facebookFactory.getRedirectURL(redirectURI, Display.POPUP, Permission.EMAIL, Permission.OFFLINE_ACCESS);
	        resp.sendRedirect(redirectURL);
	    }
	    else
	    {
		    OAuthAccessToken accessToken = facebookFactory.getOAuthAccessToken(code, redirectURI);
		    Facebook facebook = facebookFactory.getInstance(accessToken);
		    user = facebook.getCurrentUser();
		    session.setAttribute("emailIdFirst",user.getLink().replace("http://www.facebook.com/","")+"@facebook.com");
		    session.setAttribute("firstNameFirst",user.getFirstName());
		    session.setAttribute("lastNameFirst",user.getLastName());
		    session.setAttribute("profileImageFirst",user.getPictureURL()+"?type=large");
	
		    resp.sendRedirect("/userCompanyList");
	    }
	}
	
	
	
	@RequestMapping(value="/editUserStuffList" , method=RequestMethod.POST)
	protected void editUserStuffList(@RequestParam(value="points", required=false) String points,@RequestParam(value="uniqueUserKey", required=false) String uniqueUserKey,@RequestParam(value="stuffId", required=false) String stuffId,HttpServletRequest request,HttpServletResponse response)
	{
		PersistenceManager userstuffDetailsToEdit    	= PMF.get().getPersistenceManager();
		int previousPoints								= 0;
		int updateQuantity								= 0;
		
		try
		{
			if(uniqueUserKey != null && !(uniqueUserKey.equals("")))
			{
				UserBadgeLogJdo updateuserstuff     		=  userstuffDetailsToEdit.getObjectById(UserBadgeLogJdo.class,uniqueUserKey);
				
				if(updateuserstuff.getUserId() != null)
				{
					previousPoints       	 				= (updateuserstuff.getPoints()-Integer.parseInt(points));
					
					updateuserstuff.setPoints(previousPoints);
					userstuffDetailsToEdit.currentTransaction().begin();
					userstuffDetailsToEdit.makePersistent(updateuserstuff);
					userstuffDetailsToEdit.currentTransaction().commit();
					
				}
			}
			
			if(stuffId != null && !(stuffId.equals("")))
			{
				BadgesList badgesListDetails 				= userstuffDetailsToEdit.getObjectById(BadgesList.class,stuffId);
				
				if(badgesListDetails != null)
				{
					if(badgesListDetails.getKey() != null)
					{
						if(badgesListDetails.getQuantity() >0)
						{
							updateQuantity 						= badgesListDetails.getQuantity() - 1;;
							
							badgesListDetails.setQunatity(updateQuantity);
							userstuffDetailsToEdit.currentTransaction().begin();
							userstuffDetailsToEdit.makePersistent(badgesListDetails);
							userstuffDetailsToEdit.currentTransaction().commit();
						}
					}
				}
			}
		}
		catch(Exception e)
		{
		}
	}
	
	
	@RequestMapping(value="/openLoginController" , method=RequestMethod.GET)
	public  String  openLoginController(HttpServletRequest req, HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException
	{
		String oAuthMode = lResourceBundle.getString("MODE");
		String companyId 												= "fdc0c85f-ca2d-4d25-9bc9-e5b05f1cb2e9";//"fd7f3837-fd5d-4621-aa87-e3eda5cd1c65" for ethiraj; //By default its LIVE
		String emailId 													= "";
		String domain													= "";
		
		
		if(session.getAttribute("emailIdFirst") != null)
		{
			emailId 													= session.getAttribute("emailIdFirst").toString().trim();
			
			if(emailId.contains("@"))
			{
				domain 													= emailId.split("@")[1];
			}
			
		}
		
		String firstName												= session.getAttribute("firstNameFirst").toString();
		String lastName													= session.getAttribute("lastNameFirst").toString();
		String profileImage 											= session.getAttribute("profileImageFirst").toString();
		
		PersistenceManager persistenceInstance 							= PMF.get().getPersistenceManager();
		
		String companyName												= "";	
		String userKey 													= "";
		
		if("LIVE".equalsIgnoreCase(oAuthMode))
		{
			companyId													= lResourceBundle.getString("live_ec_companyId").trim();
		}
		else if("STAGING".equalsIgnoreCase(oAuthMode))
		{
			companyId													= lResourceBundle.getString("staging_ec_companyId").trim();
		}
			
		else if("LOCAL".equalsIgnoreCase(oAuthMode))
		{
			companyId													= lResourceBundle.getString("local_ec_companyId").trim();
		}
			
		
		Date now 														= new Date();
		
		ObjectMapper objMapper 											= new ObjectMapper();
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		
		try
		{
			LinkedHashMap<String,UserProfile> respUserDetails 			= new LinkedHashMap<String,UserProfile>();
			Query query 												= persistenceInstance.newQuery(UserProfile.class,"userName == '"+emailId+"' && companyId == '"+companyId+"' && type != 'requested'");
			List<UserProfile> userDetails	 							= (List<UserProfile>)query.execute();
			
			if(userDetails.isEmpty())
			{
				PersistenceManager persistenceLocalInstance 			= PMF.get().getPersistenceManager();
				UserProfile userProfileDetails							= persistenceLocalInstance.getObjectById(UserProfile.class,companyId);
				
				if(userProfileDetails != null)
				{
					companyName											= userProfileDetails.getcompanyName();
				}
				
				UserProfile userDetialsObject 							= new UserProfile();
				
				UUID key 												= UUID.randomUUID();
				userKey 												= key.toString();
				
								
				userDetialsObject.setKey(userKey);
				userDetialsObject.setFirstName(firstName);
				userDetialsObject.setuserName(emailId.toLowerCase());
				userDetialsObject.setLastName(lastName);
				userDetialsObject.setType("user");
				userDetialsObject.setprofilePicture(profileImage);
				userDetialsObject.setDomain(domain);
				userDetialsObject.setcompanyId(companyId);
				userDetialsObject.setcompanyName(companyName);
				userDetialsObject.setLoginTime(now);
				
				
				UserProfileDAO.saveUserProfile(userDetialsObject);
		        respUserDetails.put(userKey, userDetialsObject);
			
						      
								
				req.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
				
				session.setAttribute("companyName",companyName);
				session.setAttribute("companyKey",companyId);	
				session.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
				session.setAttribute("userKeyLogin", userKey);
				session.setAttribute("userEmailid",emailId);
				session.setAttribute("userFirstName",firstName);
				session.setAttribute("userLastName", lastName);
				session.setAttribute("userImage",profileImage);
				
				session.setAttribute("signinFlagFirst",null);
			}
			else
			{
				for(UserProfile iteratinUserDetails: userDetails)
				{
					if(iteratinUserDetails.getKey() != null)
					{
						if(!("Company".equalsIgnoreCase(iteratinUserDetails.getType())))
						{
							userKey = iteratinUserDetails.getKey();
							session.setAttribute("userKeyLogin", iteratinUserDetails.getKey());
							
							if(!(iteratinUserDetails.getProfileUpdate().isEmpty()))
							{
								if(!(iteratinUserDetails.getProfileUpdate().contains("firstName")) && !(iteratinUserDetails.getProfileUpdate().contains("lastName")))
								{
									iteratinUserDetails.setFirstName(firstName);
									iteratinUserDetails.setLastName(lastName);
								}
								if(!(iteratinUserDetails.getProfileUpdate().contains("profileImage")))
								{
									iteratinUserDetails.setprofilePicture(profileImage);
								}
							}
							else
							{
								iteratinUserDetails.setFirstName(firstName);
								iteratinUserDetails.setLastName(lastName);
								iteratinUserDetails.setprofilePicture(profileImage);
							}
							
							iteratinUserDetails.setDomain(emailId.split("@")[1]);
							iteratinUserDetails.setLoginTime(now);
							iteratinUserDetails.setcompanyId(companyId);
							
							persistenceInstance.currentTransaction().begin();
							persistenceInstance.makePersistent(iteratinUserDetails);
							persistenceInstance.currentTransaction().commit();
						}
						else if("Company".equalsIgnoreCase(iteratinUserDetails.getType()))
						{
							userKey 									= iteratinUserDetails.getKey();
							session.setAttribute("userKeyLogin", userKey);
							
							iteratinUserDetails.setLoginTime(now);
							
							persistenceInstance.currentTransaction().begin();
							persistenceInstance.makePersistent(iteratinUserDetails);
							persistenceInstance.currentTransaction().commit();
						}
					}
					
					respUserDetails.put(userKey, iteratinUserDetails);
					companyName											= iteratinUserDetails.getcompanyName();
				}
				
				req.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
				  
				session.setAttribute("companyKey",companyId);
				session.setAttribute("userProfileDetails",objMapper.writeValueAsString(respUserDetails));
				session.setAttribute("userEmailid",emailId);
				session.setAttribute("companyName",companyName);
				session.setAttribute("userFirstName",firstName);
				session.setAttribute("userLastName", lastName);
				session.setAttribute("userImage",profileImage);
				
				session.setAttribute("signinFlagFirst",null);
			}
						
						
			UserProfilePage usrprofilepage								= new UserProfilePage();
			usrprofilepage.userProfileService(companyId,userKey,emailId,req);
			
			return "user";
		}
		catch(Exception e)
		{
			e.printStackTrace();
			persistenceInstance.close();
		}
		return "user";
	}
	
	@RequestMapping(value="/registerNewCompany" , method=RequestMethod.POST)
	public  void  registerNewCompany(@RequestParam(value="signupDetails", required=false) String signupDetails,HttpServletRequest req, HttpServletResponse response , HttpSession session ) 
	{
		String referrerUrl				= req.getHeader("referer");
		
		log.info("referrerUrl : "+referrerUrl);
		
		if( referrerUrl.contains("adaptiveyou.com") || referrerUrl.contains("localhost") || referrerUrl.contains("adaptivecourse.appspot.com") )
		{
			
		}
	}
}
