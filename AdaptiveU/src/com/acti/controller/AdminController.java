package com.acti.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.acti.jdo.videodetails;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.service.AdaptiveYouServiceMethods;
import com.adaptive.business.service.AdaptiveYouoDataStore;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@Controller
public class AdminController extends HttpServlet
{
	
	@RequestMapping(value="/*.do/*" , method=RequestMethod.GET)
	public  String  workingOnBadgesRemotely(HttpServletRequest request, HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException, JSONException
	{
		
		
		System.out.println("getServletPath ::"+request.getServletPath() +" emailIdDuringRemoteSession ::"+session.getAttribute("emailIdDuringRemoteSession"));
		
		String companyWithBadge 		= request.getServletPath();
		String companyNameRemote 		= null;
		String badgeNameRemote   		= null;
		String badgeIdRemote     		= null;
		String companyIdRemote 			= null;
		
		AdaptiveYouServiceMethods adaptiveYouService = new AdaptiveYouServiceMethods();
		
		if(session.getAttribute("emailIdDuringRemoteSession") == null && companyWithBadge != null && companyWithBadge.contains("/"))
		{
				if((String)session.getAttribute("badgeIdRemote") == null && (String)session.getAttribute("companyIdRemote") == null)
				{
					 companyNameRemote = companyWithBadge.split("/")[1];
					 companyNameRemote = companyNameRemote.replaceAll(".do", "");
					 badgeNameRemote =companyWithBadge.split("/")[2];
					 if(!("images".equalsIgnoreCase(companyNameRemote)))
					 {
						 System.out.println("companyNameRemote ::"+companyNameRemote + " badgeNameRemote ::"+badgeNameRemote );
						 companyIdRemote = adaptiveYouService.getCompanyIdFromCompanyName(companyNameRemote);
						 if(companyIdRemote != null)
						 {
							badgeIdRemote = adaptiveYouService.getBadgeIdFromBadgeName(badgeNameRemote,companyIdRemote);
							System.out.println("badgeIdRemote ::"+badgeIdRemote);
							session.setAttribute("badgeIdRemote",badgeIdRemote);
							session.setAttribute("companyIdRemote",companyIdRemote);
							session.setAttribute("badgeNameRemote",badgeNameRemote);
							session.setAttribute("companyNameRemote",companyNameRemote);
							System.out.println("badgeIdRemote  session::"+(String)session.getAttribute("badgeIdRemote"));
							System.out.println("companyIdRemote  session::"+(String)session.getAttribute("companyIdRemote"));
						 }
						 else
							return "error";
					 }
				}
				else
				{
					badgeIdRemote 		= (String)session.getAttribute("badgeIdRemote");
					companyIdRemote 	= (String)session.getAttribute("companyIdRemote");
				}
				try 
				{
					if(!("images".equalsIgnoreCase(companyNameRemote)))
					{
						HomePageController homePage = new HomePageController();
						session.setAttribute("workingRemotelyIsActive", "workingRemotelyIsActive");
						System.out.println("After setting the session ::"+session.getAttribute("workingRemotelyIsActive"));
						
						homePage.openId(request,response);
					}
					
				} 
				catch (ServletException e) 
				{
					e.printStackTrace();
				}
		}
		else
		{
			badgeIdRemote 											= (String)session.getAttribute("badgeIdRemote");
			companyIdRemote 										= (String)session.getAttribute("companyIdRemote");
			String emailId 											= (String)session.getAttribute("emailIdDuringRemoteSession");
			
			session.setAttribute("badgeNameRemote",null);
			session.setAttribute("companyNameRemote",null);
			session.setAttribute("badgeIdRemote",null);
			session.setAttribute("companyIdRemote",null);
			session.setAttribute("emailIdDuringRemoteSession", null);
			session.setAttribute("workingRemotelyIsActive", null);
				if(badgeIdRemote != null && companyIdRemote != null)
				{
					
					System.out.println("It comes to else where badgeIdRemote and companyIdRemote is not null");

					System.out.println("emailId ::"+emailId+" companyIdRemote ::"+companyIdRemote);
					
					
					String userId													= "";
					String badgeType												= "";
					JSONObject userProfileInfo										= null;
					boolean videoBadgeOrNonVideoBadge 								= false ;
					
					ArrayList<String> videoKeysOfTheBadge 							= new ArrayList<String>();
					ArrayList<String> videoStatusList 								= new ArrayList<String>();
					ArrayList<String> badgeOrTrophyWorkingOn 						= new ArrayList<String>();
					
					ObjectMapper objMapper											= new ObjectMapper();
					objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
					objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
					
					PMF.get().getPersistenceManager();
					PersistenceManager instanceForUserStatusDetails 				= PMF.get().getPersistenceManager();
					PersistenceManager pmForBadgeLogJdo 							= PMF.get().getPersistenceManager();
					PersistenceManager pmForBadgesListTable 						= PMF.get().getPersistenceManager();
					PMF.get().getPersistenceManager();
					
					new HashMap<String,UserProfile>();
					HashMap<String,UserStatusDetails> userStatusDetailsMap 			= new HashMap<String,UserStatusDetails>();
					HashMap<String,BadgesList> badgesMap 							= new HashMap<String,BadgesList>();
					new HashMap<String,videodetails>();
					
					String userProfileMapByCompany 									= "";
					String userStatusDetailsMapByCompany 							= "";
					String badgesMapByCompany 										= "";
					AdaptiveYouDAO adaptiveDAO 										= new AdaptiveYouoDataStore();
					
					Query queryforbadgeslilsttable 									= pmForBadgesListTable.newQuery(BadgesList.class,"companyId == '"+companyIdRemote+"' && key == '"+badgeIdRemote+"'");         
					List<BadgesList> badgesListData 								= (List<BadgesList>)queryforbadgeslilsttable.execute();
					
					if(!(badgesListData.isEmpty()) && badgesListData != null && badgesListData.size() > 0)
					{
						
						for(BadgesList badgeInfo:badgesListData)
						{
							badgesMap.put(badgeInfo.getKey(), badgeInfo);
							badgeType 												= badgeInfo.getbadgeType();
							if(!(badgeInfo.getVideoid().isEmpty()))
							{
								videoBadgeOrNonVideoBadge 							= true;
								videoKeysOfTheBadge 								= badgeInfo.getVideoid();
								
							}
							
							session.setAttribute("remoteBadgeName",badgeInfo.getBadgeName());
						}
						
						if(!(badgeType.equals("")) && !(badgeType.equals("deleted badge")) && !(badgeType.equals("deleted trophy")) )
						{
							session.setAttribute("userEmailId", emailId);
							session.setAttribute("requestedCompanyId", companyIdRemote);
							
							AdaptiveYouServiceMethods lserviceMethod = new AdaptiveYouServiceMethods();
							 userProfileMapByCompany = lserviceMethod.getDataFromUserProfile(companyIdRemote, emailId);
							System.out.println("userProfileInfo ::"+userProfileMapByCompany+ " emailId::"+emailId);
							if( !("{}".equalsIgnoreCase(userProfileMapByCompany)) && userProfileMapByCompany != null)
							{
								JSONObject userProfile  = new JSONObject(userProfileMapByCompany);
								System.out.println("userProfile ::"+userProfile.toString());
								userProfileInfo = userProfile.getJSONObject(emailId);
								userId = userProfileInfo.getString("key");
								System.out.println("userId ::"+userId);
								badgesMapByCompany 										= objMapper.writeValueAsString(badgesMap);
								request.setAttribute("badgesMapByCompany", badgesMapByCompany);
								request.setAttribute("userProfileMapByCompany",userProfileMapByCompany);
								
								 userStatusDetailsMapByCompany = lserviceMethod.getDataFromUserStatusDetails(companyIdRemote,userId,badgeIdRemote);
								System.out.println("userStatusDetailsMapByCompany "+userStatusDetailsMapByCompany);
								
								if(!("{}".equalsIgnoreCase(userStatusDetailsMapByCompany) && userStatusDetailsMapByCompany != null))
								{
									request.setAttribute("userStatusDetailsMapByCompany", userStatusDetailsMapByCompany);
								}
								else
								{
									UserStatusDetails userStatusDetailsInstance 		= new UserStatusDetails();
									UUID key 											= UUID.randomUUID();
									
									for(String iteratingVideoKeys : videoKeysOfTheBadge)
									{
										videoStatusList.add(iteratingVideoKeys+":not started");
									}
									
									userStatusDetailsInstance.setCompanyId(companyIdRemote);
									userStatusDetailsInstance.setDateAdded(new Date());
									userStatusDetailsInstance.setKey(key.toString());
									userStatusDetailsInstance.setStatus("working on");
									userStatusDetailsInstance.setStuffid(badgeIdRemote);
									userStatusDetailsInstance.setTypeRequested(badgeType);
									userStatusDetailsInstance.setUserId(userId);
									userStatusDetailsInstance.setVideostatus(videoStatusList);
									
									instanceForUserStatusDetails.makePersistent(userStatusDetailsInstance);
									
									userStatusDetailsMap.put(key.toString(), userStatusDetailsInstance);
									
									userStatusDetailsMapByCompany 							= objMapper.writeValueAsString(userStatusDetailsMap);
									request.setAttribute("userStatusDetailsMapByCompany", userStatusDetailsMapByCompany);
								}
								
								
								
								
								
								Query queryforbadgelogjdo				 				= pmForBadgeLogJdo.newQuery(UserBadgeLogJdo.class,"companyId == '"+companyIdRemote+"' && userId == '"+userId+"'");         
								List<UserBadgeLogJdo> badgelogjdoData 					= (List<UserBadgeLogJdo>)queryforbadgelogjdo.execute();
								if(badgelogjdoData != null)
									System.out.println("badgelogjdoData ::"+badgelogjdoData.size());
								
								if(!(badgelogjdoData.isEmpty()) && badgelogjdoData != null && badgelogjdoData.size() > 0)
								{
									for(UserBadgeLogJdo iteratingUserBadgeLog : badgelogjdoData)
									{
										System.out.println("badgeType ::"+badgeType);
										if(badgeType.equals("badge"))
										{
											badgeOrTrophyWorkingOn 						= iteratingUserBadgeLog.getBadgesWorkingOn();
											
											if(badgeOrTrophyWorkingOn.isEmpty())
											{
												badgeOrTrophyWorkingOn.add(badgeIdRemote);
											}
											else if(!(badgeOrTrophyWorkingOn.contains(badgeIdRemote)))
											{
												badgeOrTrophyWorkingOn.add(badgeIdRemote);
											}
											
											iteratingUserBadgeLog.setBadgesWorkingOn(badgeOrTrophyWorkingOn);
										}
										else if(badgeType.equals("trophy"))
										{
											badgeOrTrophyWorkingOn 						= iteratingUserBadgeLog.getTrophiesWorkingOn();
											
											if(badgeOrTrophyWorkingOn.isEmpty())
											{
												badgeOrTrophyWorkingOn.add(badgeIdRemote);
											}
											else if(!(badgeOrTrophyWorkingOn.contains(badgeIdRemote)))
											{
												badgeOrTrophyWorkingOn.add(badgeIdRemote);
											}
											
											iteratingUserBadgeLog.setTrophiesWorkingOn(badgeOrTrophyWorkingOn);
										}
										
										pmForBadgeLogJdo.currentTransaction().begin();
										pmForBadgeLogJdo.makePersistent(iteratingUserBadgeLog);
										pmForBadgeLogJdo.currentTransaction().commit();
									}
								}
								
								if(videoBadgeOrNonVideoBadge)
								{
									String videodetailsMap= adaptiveDAO.getDataFromVideoDetails(companyIdRemote);
									request.setAttribute("videoDetailsMapByCompany",videodetailsMap);
								}
								
								return "embedBadgePage";
							}
							else
							{
								return "requestAccess";
							}
						}
						else
						{
							session.setAttribute("remoteBadgeName",null);
							
							return "error";
						}
					}
					else
					{
						return "error";
					}
			
				}
				return "error";
		}
		return "error";
	}
	
	@RequestMapping(value="/postUserRequest" , method=RequestMethod.POST)
	public @ResponseBody String  postUserRequest(HttpServletRequest request, HttpServletResponse response , HttpSession session ) throws IOException
	{
		String userEmailId												= (String)session.getAttribute("userEmailId");
		String requestedCompanyId										= (String)session.getAttribute("requestedCompanyId");
		
		System.out.println(userEmailId+" "+requestedCompanyId);
		
		PersistenceManager instanceForUserDetails 						= PMF.get().getPersistenceManager();
		
		Query queryUserDetails											= instanceForUserDetails.newQuery(UserProfile.class,"companyId == '"+requestedCompanyId+"' && userName == '"+userEmailId+"'");
		
		List<UserProfile> userProfileDetailsList						= (List<UserProfile>) queryUserDetails.execute();
		
		System.out.println(userProfileDetailsList);
		
		if(userProfileDetailsList != null && userProfileDetailsList.size() > 0)
		{
			return "<p>Request already made. You will be notified once request is accepted.</p>";
		}
		else
		{
			PersistenceManager userDetailsObject						= PMF.get().getPersistenceManager();
			
			PersistenceManager userDetailsInstance						= PMF.get().getPersistenceManager();
			UserProfile userProfileDetails								= userDetailsInstance.getObjectById(UserProfile.class,requestedCompanyId);
			
			UserProfile userProfileInstance								= new UserProfile();
			
			UUID key 													= UUID.randomUUID();
			
			userProfileInstance.setKey(key.toString());
			userProfileInstance.setcompanyId(requestedCompanyId);
			userProfileInstance.setuserName(userEmailId);
			userProfileInstance.setDomain(userEmailId.split("@")[1]);
			userProfileInstance.setFirstName((String) session.getAttribute("firstNameFirst"));
			userProfileInstance.setLastName((String) session.getAttribute("lastNameFirst"));
			userProfileInstance.setcompanyName(userProfileDetails.getcompanyName());
			userProfileInstance.setType("requested");
			
			userDetailsObject.makePersistent(userProfileInstance);
			
			return "<p>Great news, the request is sent.</p>"+
    		"<p>Soon , you will get an email notification regarding you request and you will be able to get started..</p> ";
			
		}
	}
	
	@RequestMapping(value="/userRequestAction" , method=RequestMethod.POST)
	public void  userRequestAction(@RequestParam("requested_user_key") String requested_user_key,@RequestParam("request_action") String request_action,HttpServletRequest request, HttpServletResponse response , HttpSession session ) throws IOException, JSONException
	{
		PersistenceManager instanceForUserDetails 							= PMF.get().getPersistenceManager();
		try
		{
			UserProfile	userProfileInstance									= instanceForUserDetails.getObjectById(UserProfile.class,requested_user_key);
			
			MailingService mail 											= new MailingService();
			mail.sendMailRegardingUserRequest(userProfileInstance.getuserName(),userProfileInstance.getFirstName(),request_action);
			
			if(request_action.equalsIgnoreCase("accept"))
			{
				PersistenceManager persistenceInstance	 					= PMF.get().getPersistenceManager();
				
				
				UserProfile	adminProfileInstance							= persistenceInstance.getObjectById(UserProfile.class,userProfileInstance.getcompanyId());
				
				JSONObject companyCMSKey									= new JSONObject(adminProfileInstance.getCmsKey());
				
				CMSController cmsInstance 									= new CMSController();
				String cmsKeyForNewUser 									= cmsInstance.insertStaffToCMS(companyCMSKey.getString("uniquepin"), userProfileInstance);
				
				userProfileInstance.setType("user");
				userProfileInstance.setCmsKey(cmsKeyForNewUser);
				
				instanceForUserDetails.makePersistent(userProfileInstance);
				
				persistenceInstance.close();
			}
			else if(request_action.equalsIgnoreCase("deny"))
			{
				if(userProfileInstance != null)
				{
					instanceForUserDetails.deletePersistent(userProfileInstance);
				}
			}
		}
		finally
		{
			instanceForUserDetails.close();
		}
		
	}
	
//	@RequestMapping(value="/sessionKiller" , method=RequestMethod.POST)
//	public void  sessionKiller(HttpServletRequest request, HttpServletResponse response , HttpSession session ) throws IOException, JSONException, ServletException
//	{
//		System.out.println("session killer");
//		session.invalidate();
//	}
	
}
