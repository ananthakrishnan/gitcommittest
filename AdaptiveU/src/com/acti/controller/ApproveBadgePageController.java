package com.acti.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.adaptive.business.dao.UserStatusDetailsDAO;
import com.adaptive.business.service.ApproveBadgePage;
import com.google.appengine.api.datastore.Text;

@Controller
public class ApproveBadgePageController extends HttpServlet {
	
	private static final Logger log = Logger.getLogger(ApproveBadgePageController.class.getName());
	
	
	@RequestMapping("/updateUserBadgeLogJdo")
	public void updateUserBadgeLogJdo(@RequestParam(value="badgeId", required=false) String badgeId,@RequestParam(value="userId", required=false) String userId,@RequestParam(value="badgeVal", required=false) String badgeValue,@RequestParam(value="badgeType", required=false) String badgeType,HttpServletRequest request,HttpServletResponse response)
	{
		PersistenceManager updateUserBadgeLogJdo = PMF.get().getPersistenceManager();
		HttpSession session = request.getSession();
		try
		{
			String companyId = (String)session.getAttribute("companyId");
			Query queryByUserBadgeLog 	 = updateUserBadgeLogJdo.newQuery(UserBadgeLogJdo.class, " userId == '" + userId + "' && companyId == '"+companyId+"'");
			List<UserBadgeLogJdo> userBadgeLogInfo =  (List<UserBadgeLogJdo>)queryByUserBadgeLog.execute();
			for(UserBadgeLogJdo userBadgeLog:userBadgeLogInfo)
			{
				if("badge".equalsIgnoreCase(badgeType))
				{
					ArrayList<String> existingBadgeId = userBadgeLog.getBadgeId();
					existingBadgeId.add(badgeId);
					userBadgeLog.setBadgeId(existingBadgeId);
					if(userBadgeLog.getBadgesWorkingOn().contains(badgeId))
					{
						ArrayList<String> existingBadgesWorkingOn = userBadgeLog.getBadgesWorkingOn();
						existingBadgesWorkingOn.remove(badgeId);
						userBadgeLog.setBadgesWorkingOn(existingBadgesWorkingOn);
					}
				}
				else if("trophy".equalsIgnoreCase(badgeType))
				{
					ArrayList<String> existingTrophyId = userBadgeLog.getTrophyId();
					existingTrophyId.add(badgeId);
					userBadgeLog.setTrophyId(existingTrophyId);
					if(userBadgeLog.getTrophiesWorkingOn().contains(badgeId))
					{
						ArrayList<String> existingTrophiesWorkingOn = userBadgeLog.getTrophiesWorkingOn();
						existingTrophiesWorkingOn.remove(badgeId);
						userBadgeLog.setTrophiesWorkingOn(existingTrophiesWorkingOn);
					}
				}
				else if("stuff".equalsIgnoreCase(badgeType))
				{
					ArrayList<String> existingStuffId = userBadgeLog.getStuffId();
					existingStuffId.add(badgeId);
					userBadgeLog.setStuffId(existingStuffId);
				}
				
				Integer points = userBadgeLog.getPoints();
				points = points + Integer.parseInt(badgeValue);
				userBadgeLog.setPoints(points);
				
				updateUserBadgeLogJdo.currentTransaction().begin();
				updateUserBadgeLogJdo.makePersistent(userBadgeLog);
				updateUserBadgeLogJdo.currentTransaction().commit();
			}	
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/deleteUserBadgeLogJdo")
	public void deleteFromUserBadgeLogJdo(@RequestParam(value="badgeId", required=false) String badgeId,@RequestParam(value="userId", required=false) String userId,@RequestParam(value="badgeVal", required=false) String badgeValue,@RequestParam(value="badgeType", required=false) String badgeType,HttpServletRequest request,HttpServletResponse response)
	{
		PersistenceManager deleteUserBadgeLogJdo = PMF.get().getPersistenceManager();
		HttpSession session = request.getSession();
		try
		{
			String companyId = (String)session.getAttribute("companyId");
			Query queryByUserBadgeLog 	 = deleteUserBadgeLogJdo.newQuery(UserBadgeLogJdo.class, " userId == '" + userId + "' && companyId == '"+companyId+"'");
			List<UserBadgeLogJdo> userBadgeLogInfo =  (List<UserBadgeLogJdo>)queryByUserBadgeLog.execute();
			for(UserBadgeLogJdo userBadgeLog:userBadgeLogInfo)
			{
				if("badge".equalsIgnoreCase(badgeType))
				{
					ArrayList<String> existingBadgeId = userBadgeLog.getBadgeId();
					if(existingBadgeId.contains(badgeId))
					{
						existingBadgeId.remove(badgeId);
						userBadgeLog.setBadgeId(existingBadgeId);
					}
					if(userBadgeLog.getBadgesWorkingOn().contains(badgeId))
					{
						ArrayList<String> existingBadgesWorkingOn = userBadgeLog.getBadgesWorkingOn();
						existingBadgesWorkingOn.remove(badgeId);
						userBadgeLog.setBadgesWorkingOn(existingBadgesWorkingOn);
					}
				}
				else if("trophy".equalsIgnoreCase(badgeType))
				{
					ArrayList<String> existingTrophyId = userBadgeLog.getTrophyId();
					if(existingTrophyId.contains(badgeId))
					{
						existingTrophyId.remove(badgeId);
						userBadgeLog.setTrophyId(existingTrophyId);
					}
					if(userBadgeLog.getTrophiesWorkingOn().contains(badgeId))
					{
						ArrayList<String> existingTrophiesWorkingOn = userBadgeLog.getTrophiesWorkingOn();
						existingTrophiesWorkingOn.remove(badgeId);
						userBadgeLog.setTrophiesWorkingOn(existingTrophiesWorkingOn);
					}
				}
				else if("stuff".equalsIgnoreCase(badgeType))
				{
					ArrayList<String> existingStuffId = userBadgeLog.getStuffId();
					existingStuffId.add(badgeId);
					userBadgeLog.setStuffId(existingStuffId);
				}
				
				Integer points = userBadgeLog.getPoints();
				points = points - Integer.parseInt(badgeValue);
				userBadgeLog.setPoints(points);
				
				deleteUserBadgeLogJdo.currentTransaction().begin();
				deleteUserBadgeLogJdo.makePersistent(userBadgeLog);
				deleteUserBadgeLogJdo.currentTransaction().commit();
			}	
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping(value="/denyBadgeRequest1" , method=RequestMethod.GET)
	 protected void denyBadgeRequest1(@RequestParam(value="userStatusDetailsKey", required=false) String userStatusDetailsKey,@RequestParam(value="userId", required=false) String userId,@RequestParam(value="badgeId", required=false) String badgeId,HttpServletRequest request,HttpServletResponse response)
	 {
	  PersistenceManager editBadge = PMF.get().getPersistenceManager();
	  log.info("badgeid ::"+badgeId);
	  log.info("userid ::"+userId);
	  try
	  {
		  UserStatusDetails userStatusDetailsInfo =  editBadge.getObjectById(UserStatusDetails.class,userStatusDetailsKey);
		    if(userStatusDetailsInfo.getVideostatus() != null)
		    {
		    	ArrayList<String> al=new ArrayList<String>();
				  al=userStatusDetailsInfo.getVideostatus();
				  for(int j=0;j<userStatusDetailsInfo.getVideostatus().size();j++)
				  {
						 if(userStatusDetailsInfo.getVideostatus().get(j).contains("started"))
						 {
							 al.get(j);
							 al.set(j,al.get(j).replace(":started", ":not started") );
						 }
						 if(userStatusDetailsInfo.getVideostatus().get(j).contains("completed"))
						 {
							 al.get(j);
							 al.set(j,al.get(j).replace(":completed", ":not started") );
						 }
				  }
		     
			log.info("Before "+userStatusDetailsInfo.getStatus());
			userStatusDetailsInfo.setStatus("working on");
		    editBadge.currentTransaction().begin();
		    editBadge.makePersistent(userStatusDetailsInfo);
		    editBadge.currentTransaction().commit();
		    log.info("After persisting "+userStatusDetailsInfo.getStatus());
	   }
	   response.setContentType("text/html");
	   response.getWriter().println("Success");
	  }
	  catch(Exception e)
	  {
	   e.printStackTrace();
	  }
	  finally{
	   editBadge.close();
	  }
	  
	 }
	
	@RequestMapping("/updateBadgeLogFromApproveBadgePage")
	public void updatebadgelogjdo1(@RequestParam(value="userKey", required=false) String userid,@RequestParam(value="badgeId", required=false) String badgeid,@RequestParam(value="userStatusDetailsKey", required=false) String userStatusDetailsKey,@RequestParam(value="badgeVal", required=false) String badgevalue,@RequestParam(value="badgeType", required=false) String badgetype,HttpServletRequest request,HttpServletResponse response)
	{
		PersistenceManager updateBadgeLogJdoPMF = PMF.get().getPersistenceManager();
		HttpSession session = request.getSession();
		try
		{
			Query querybadgeLog =  updateBadgeLogJdoPMF.newQuery(UserBadgeLogJdo.class,"userId == '"+userid+"'");
			List<UserBadgeLogJdo> userBadgeLogInfo =  (List<UserBadgeLogJdo>)querybadgeLog.execute();
			for(UserBadgeLogJdo indexUserBadgeLogInfo:userBadgeLogInfo)
			{
					int previousPoints=(indexUserBadgeLogInfo.getPoints() + Integer.parseInt(badgevalue)); 
					indexUserBadgeLogInfo.setPoints(previousPoints);
					
					if("badge".equalsIgnoreCase(badgetype))
					{
						ArrayList<String> previousbadges = indexUserBadgeLogInfo.getBadgeId();
						previousbadges.add(badgeid);
						indexUserBadgeLogInfo.setBadgeId(previousbadges);
						ArrayList<String> previousWorkingOnBadges = indexUserBadgeLogInfo.getBadgesWorkingOn();
						if(previousWorkingOnBadges.contains(badgeid))
						{
							previousWorkingOnBadges.remove(badgeid);
							indexUserBadgeLogInfo.setBadgesWorkingOn(previousWorkingOnBadges);
						}
						
					}
					else if("trophy".equalsIgnoreCase(badgetype))
					{
						ArrayList<String> previousTrophies = indexUserBadgeLogInfo.getTrophyId();
						previousTrophies.add(badgeid);
						indexUserBadgeLogInfo.setTrophyId(previousTrophies);
						ArrayList<String> previousWorkingOnTrophies = indexUserBadgeLogInfo.getTrophiesWorkingOn();
						if(previousWorkingOnTrophies.contains(badgeid))
						{
							previousWorkingOnTrophies.remove(badgeid);
							indexUserBadgeLogInfo.setTrophiesWorkingOn(previousWorkingOnTrophies);
						}
					}
					
					
					updateBadgeLogJdoPMF.currentTransaction().begin();
					updateBadgeLogJdoPMF.makePersistent(indexUserBadgeLogInfo);
					updateBadgeLogJdoPMF.currentTransaction().commit();
			}
		}
		catch(Exception e)
		 {
			 e.printStackTrace();
		 }
			 
			 
			 PersistenceManager pmUpdateStuffInfo = PMF.get().getPersistenceManager();
				try
				{
					UserStatusDetails userStatusInfo = pmUpdateStuffInfo.getObjectById(UserStatusDetails.class,userStatusDetailsKey);
					if(userStatusInfo != null)
					{
								if(session.getAttribute("userKeyLogin") != null)
								userStatusInfo.setBadgeAssignee((String) session.getAttribute("userKeyLogin"));
								if(userStatusInfo.getVideostatus() != null)
								  {
									  ArrayList<String> previousVideoStatus=new ArrayList<String>();
									  previousVideoStatus=userStatusInfo.getVideostatus();
									  for(int j=0;j<userStatusInfo.getVideostatus().size();j++)
									  {
										 if(userStatusInfo.getVideostatus().get(j).contains("not started"))
										 {
											 previousVideoStatus.set(j,userStatusInfo.getVideostatus().get(j).replaceAll("not started", "completed"));
										 }
										 if(userStatusInfo.getVideostatus().get(j).contains("started")){
											 previousVideoStatus.set(j,userStatusInfo.getVideostatus().get(j).replaceAll("started", "completed"));
										 }
									  }
									  userStatusInfo.setVideostatus(previousVideoStatus);
								  }
								Date now = new Date();
								userStatusInfo.setDateApproved(now);
								userStatusInfo.setStatus("approved");
								pmUpdateStuffInfo.currentTransaction().begin();
								pmUpdateStuffInfo.makePersistent(userStatusInfo);
								pmUpdateStuffInfo.currentTransaction().commit();
					}
					else
					{
						Date now = new Date();
						UserStatusDetails addNewUser = new UserStatusDetails();
						addNewUser.setKey(userStatusDetailsKey);
						addNewUser.setStuffid(badgeid);
						addNewUser.setDateApproved(now);
						addNewUser.setUserId(userid);
						addNewUser.setStatus("approved");
						addNewUser.setTypeRequested(badgetype);
						addNewUser.setCompanyId((String)(session.getAttribute("companyKey")));
						if(session.getAttribute("userKeyLogin") != null)
							addNewUser.setBadgeAssignee((String)session.getAttribute("userKeyLogin"));
						UserStatusDetailsDAO.saveUserStatusDetails(addNewUser);
					}
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
	}
	
	@RequestMapping(value="/approveBadge" , method=RequestMethod.GET)
	protected String allBadgeDetails(HttpServletRequest request,HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
	{
		HttpSession sessionLogin = request.getSession();
		PersistenceManager pmfrusercheck = PMF.get().getPersistenceManager();
		
		Query queryUserDetails1 =pmfrusercheck.newQuery(UserProfile.class,"	key == '"+(String)sessionLogin.getAttribute("userKeyLogin")+"'");
		queryUserDetails1.setOrdering("firstName asc");
		List<UserProfile> usersInfo1 = (List<UserProfile>)queryUserDetails1.execute();
		for(UserProfile usersInfoDetail: usersInfo1)
		{
			if(usersInfoDetail.getType().equals("user")){
				return "error";
			}
			
		}
		String compId = "";
		compId =  (String)sessionLogin.getAttribute("companyKey");
		ApproveBadgePage approvebadgepageobject=new ApproveBadgePage();
		approvebadgepageobject.getDetailsForApproveStuffPage(compId,request);
		
		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);
		return "approveBadge";
	}
	
	@RequestMapping(value="/sendmailforrequestdenied" , method=RequestMethod.POST)
	protected void requestforbadgedenied( @RequestParam(value="typeid", required=false) String typeid,@RequestParam(value="userKey", required=false) String userkey,@RequestParam(value="type", required=false) String type,@RequestParam(value="mailcontent", required=false) String mailcontent,@RequestParam(value="adminKey", required=false) String badgeAssignee,@RequestParam(value="userStatusDetailsKey", required=false) String  userStatusDetailsKey,HttpServletRequest request,HttpServletResponse response)
	{
		log.info("test from mailing service ");
		PersistenceManager pmfrusercheck 				= PMF.get().getPersistenceManager();
		PersistenceManager pmForBadgesListTable 		= PMF.get().getPersistenceManager();
		Text mailcontent1								= new Text(mailcontent);
		String usermailid								= "";
		String badgename								= "";
		HttpSession session 	= request.getSession();
		String companyId        = (String)session.getAttribute("companyKey");
		
		   UUID uniqueKey         = UUID.randomUUID();
		   UserStatusDetails declinedEntry     = new UserStatusDetails();
		   declinedEntry.setKey(uniqueKey.toString());
		   declinedEntry.setBadgeAssignee(badgeAssignee);
		   declinedEntry.setCompanyId(companyId);
		   declinedEntry.setStatus("declined");
		   declinedEntry.setTypeRequested(type);
		   declinedEntry.setUserId(userkey);
		   declinedEntry.setBadgeReqContent(mailcontent);
		   declinedEntry.setStuffid(typeid);
		   declinedEntry.setDateApproved(new Date());
		   declinedEntry.setUserStatusKey(userStatusDetailsKey);
		   //pmForBadgesListTable.makePersistent(declinedEntry);
		
		   UserStatusDetailsDAO.saveUserStatusDetails(declinedEntry);
		
		Query queryUserDetails1	 						= pmfrusercheck.newQuery(UserProfile.class,"	key == '"+userkey+"'");
		List<UserProfile> usersInfo1 					= (List<UserProfile>)queryUserDetails1.execute();
		for(UserProfile usersInfoDetail: usersInfo1)
		{
			usermailid									= usersInfoDetail.getuserName();
			
		}
		
		
		
		
		Query queryforbadgeslilsttable 					= pmForBadgesListTable.newQuery(BadgesList.class,"key == '"+typeid+"'");         
		List<BadgesList> badgesListData 				= (List<BadgesList>)queryforbadgeslilsttable.execute();
		for(BadgesList badgeslist:badgesListData){
			badgename									= badgeslist.getBadgeName();
		}
		
		MailingService ms								= new MailingService();
		ms.sendMailfordenyingbadgeRequest(usermailid,mailcontent1,type,badgename);
	}
	
}
