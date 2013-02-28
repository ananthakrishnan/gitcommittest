package com.acti.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.datanucleus.query.evaluator.memory.UpperFunctionEvaluator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.adaptive.business.service.AdminServiceMethod;
@Controller
public class AdminPageController extends HttpServlet {
	@RequestMapping(value="/admin" , method=RequestMethod.GET)
	protected String adminPage(HttpServletRequest request,HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
	{
		HttpSession session = request.getSession();
		PersistenceManager pmfrusercheck = PMF.get().getPersistenceManager();
		Query queryUserDetails1 =pmfrusercheck.newQuery(UserProfile.class,"	key == '"+(String)session.getAttribute("userKeyLogin")+"'");
		queryUserDetails1.setOrdering("firstName asc");
		List<UserProfile> usersInfo1 = (List<UserProfile>)queryUserDetails1.execute();

		for(UserProfile usersInfoDetail: usersInfo1)
		{
			if(usersInfoDetail.getType().equals("user")){
				return "error";
			}

		}

		String company_Id=(String)session.getAttribute("companyKey");
		AdminServiceMethod.adminDatastoreDetails(company_Id,request);
		
		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);
		return "admin";
	}
	
	@RequestMapping(value="/adminLogin" , method=RequestMethod.GET)
	protected void adminLogin(@RequestParam(value="companyName", required=false) String companyName,@RequestParam(value="emailId", required=false) String emailId,HttpServletRequest request,HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
	{
		HttpSession session = request.getSession();
		PersistenceManager pmfrusercheck = PMF.get().getPersistenceManager();
		Query queryUserDetails1 =pmfrusercheck.newQuery(UserProfile.class,"	companyName == '"+companyName.trim()+"' && userName == '"+emailId.trim()+"'");
		List<UserProfile> usersInfo1 = (List<UserProfile>)queryUserDetails1.execute();
		for(UserProfile usersInfoDetail: usersInfo1)
		{
			session.setAttribute("emailIdFirst",usersInfoDetail.getuserName());
			session.setAttribute("firstNameFirst",usersInfoDetail.getFirstName());
			session.setAttribute("lastNameFirst",usersInfoDetail.getLastName());
			session.setAttribute("profileImageFirst",usersInfoDetail.getprofilePicture());
			session.setAttribute("companyKey",usersInfoDetail.getcompanyName());
		}
		
		
		response.sendRedirect("/persistUser");  
	}
	
	@RequestMapping(value="/updateUserStatusDetailsFromAdmin", method=RequestMethod.GET)
	public void updateUserStatusDetailsFromAdmin(@RequestParam(value="userKey", required=false) String userid,@RequestParam(value="badgeId", required=false) String badgeid,@RequestParam(value="badgeVal", required=false) String badgevalue,@RequestParam(value="badgeType", required=false) String badgetype,@RequestParam(value="isSuggestedBadge", required=false) String isSuggestedBadge,HttpServletRequest request,HttpServletResponse response){
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
					}
					else if("trophy".equalsIgnoreCase(badgetype))
					{
						ArrayList<String> previousTrophies = indexUserBadgeLogInfo.getTrophyId();
						previousTrophies.add(badgeid);
						indexUserBadgeLogInfo.setTrophyId(previousTrophies);
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
						Date now = new Date();
						UserStatusDetails addNewUser = new UserStatusDetails();
						UUID uniqueKey = UUID.randomUUID();
						addNewUser.setKey(uniqueKey.toString());
						addNewUser.setStuffid(badgeid);
						addNewUser.setDateApproved(now);
						addNewUser.setUserId(userid);
						addNewUser.setStatus("approved");
						addNewUser.setTypeRequested(badgetype);
						addNewUser.setCompanyId((String)(session.getAttribute("companyKey")));
						if(session.getAttribute("userKeyLogin") != null)
							addNewUser.setBadgeAssignee((String)session.getAttribute("userKeyLogin"));
						pmUpdateStuffInfo.makePersistent(addNewUser);
						response.setContentType("html/text");
						response.getWriter().println(uniqueKey);
				}
				catch(Exception e)
				{
					e.printStackTrace();
				}
		 
	}
	//changes made by Ram Balaji Subbaiyan
	@RequestMapping(value="/emailtoLowercaseJDO", method=RequestMethod.GET)
	public void emailtoLowercaseJDo()
	{
		try
		{
		PersistenceManager pmforemailcase = PMF.get().getPersistenceManager();
		Query queryemailDetails1 = pmforemailcase.newQuery(UserProfile.class);
		List<UserProfile> userName1 =  (List<UserProfile>)queryemailDetails1.execute();
		for  (UserProfile indexuserName:userName1)
		{
			indexuserName.setuserName(indexuserName.getuserName().toLowerCase());
			
			pmforemailcase.currentTransaction().begin();
			pmforemailcase.makePersistent(indexuserName);
			pmforemailcase.currentTransaction().commit();
			
		}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	// changes made by Ram ends

	@RequestMapping("/deleteBadgeLogJDO")
	public void deleteBadgeLogJDO(@RequestParam(value="userStatusDetailsKey", required=false) String userStatusDetailsKey,@RequestParam(value="badgeId", required=false) String badgeid,@RequestParam(value="userId", required=false) String userid,@RequestParam(value="badgeVal", required=false) String badgevalue,@RequestParam(value="badgeType", required=false) String badgetype,HttpServletRequest request,HttpServletResponse response){
		PersistenceManager updateBadgeLogJdoPMF = PMF.get().getPersistenceManager();
		try
		{
			Query querybadgeLog =  updateBadgeLogJdoPMF.newQuery(UserBadgeLogJdo.class,"userId == '"+userid+"'");
			List<UserBadgeLogJdo> userBadgeLogInfo =  (List<UserBadgeLogJdo>)querybadgeLog.execute();
			for(UserBadgeLogJdo indexUserBadgeLogInfo:userBadgeLogInfo)
			{
					int previousPoints	= (indexUserBadgeLogInfo.getPoints()-Integer.parseInt(badgevalue)); 
					indexUserBadgeLogInfo.setPoints(previousPoints);
					System.out.println("points :: "+previousPoints);
					if("badge".equalsIgnoreCase(badgetype))
					{
						ArrayList<String> previousbadges = indexUserBadgeLogInfo.getBadgeId();
						System.out.println("array list :: "+previousbadges);
						previousbadges.remove(badgeid);
						indexUserBadgeLogInfo.setBadgeId(previousbadges);
					}
					else if("trophy".equalsIgnoreCase(badgetype))
					{
						ArrayList<String> previousTrophies = indexUserBadgeLogInfo.getTrophyId();
						System.out.println("array list :: "+previousTrophies);
						previousTrophies.remove(badgeid);
						indexUserBadgeLogInfo.setTrophyId(previousTrophies);
					}
					
					
					updateBadgeLogJdoPMF.currentTransaction().begin();
					updateBadgeLogJdoPMF.makePersistent(indexUserBadgeLogInfo);
					updateBadgeLogJdoPMF.currentTransaction().commit();
			}
		}
		catch(Exception e){
				e.printStackTrace();
		}
		finally
		{
			updateBadgeLogJdoPMF.close();
		}
		PersistenceManager pmUpdateStuffInfo = PMF.get().getPersistenceManager();
		try
		{
			UserStatusDetails userToDelete = pmUpdateStuffInfo.getObjectById(UserStatusDetails.class,userStatusDetailsKey);
			userToDelete.setStatus("disapproved");
			pmUpdateStuffInfo.currentTransaction().begin();
			pmUpdateStuffInfo.makePersistent(userToDelete);
			pmUpdateStuffInfo.currentTransaction().commit();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			pmUpdateStuffInfo.close();
		}
	}
	
	@RequestMapping(value="/companyNameChanger",method=RequestMethod.POST)
	public void editComapnyName(@RequestParam(value="newCompanyName", required=false) String newCompanyName,HttpServletRequest request , HttpServletResponse response)
	{
		HttpSession session 						= request.getSession();
		String companyId							=(String)session.getAttribute("companyKey");
		PersistenceManager persistant_Manager		= PMF.get().getPersistenceManager();
		
		Query query									= persistant_Manager.newQuery(UserProfile.class,"companyId == '"+companyId+"'");
		List<UserProfile> userProfile				= (List<UserProfile>) query.execute();
		
		for (UserProfile userProfileDetails : userProfile) 
		{
			userProfileDetails.setcompanyName(newCompanyName);
			
			persistant_Manager.currentTransaction().begin();
			persistant_Manager.makePersistent(userProfileDetails);
			persistant_Manager.currentTransaction().commit();
		}
		
		session.setAttribute("companyName",newCompanyName);
	}
}
