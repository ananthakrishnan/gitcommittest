package com.acti.controller;

import javax.servlet.http.HttpServlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.acti.jdo.ManageTeamJdo;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.adaptive.business.service.ManageTeamServiceMethod;
//import com.google.gdata.client.contacts.ContactsService;
//import com.google.gdata.data.contacts.ContactEntry;
//import com.google.gdata.data.contacts.ContactFeed;
//import com.google.gdata.data.extensions.Email;


import org.springframework.stereotype.Controller;
@SuppressWarnings("serial")
@Controller
public class ManageTeamPageController  extends HttpServlet
{
	private static final Logger log = Logger.getLogger(ManageGroups.class.getName());
	@RequestMapping(value="/manageTeam" , method=RequestMethod.GET)
	protected String manageTeam(HttpServletRequest request,HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
	{
		HttpSession session = request.getSession();
		String companyId = (String) session.getAttribute("companyKey");
		ManageTeamServiceMethod.manageTeamdatastore(companyId,request);
		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);
		return "manageTeam";
	}
	@RequestMapping(value="/deleteTeamMem" , method=RequestMethod.GET)
	protected void deleteTeamMem(@RequestParam(value="userKey", required=false) String userKey,@RequestParam(value="teamName", required=false) String teamName,HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		PersistenceManager pmDeleteTeam 			= PMF.get().getPersistenceManager();
		HttpSession session 						= request.getSession();
		String companyId 							= (String) session.getAttribute("companyKey");
		
		if(session.getAttribute("detachingCompanyId") != null)
		{
			companyId								= (String) session.getAttribute("detachingCompanyId");
			
			session.setAttribute("detachingCompanyId", null);
		}
		ArrayList<String> newTeamMems 				= new ArrayList<String>();
		if(teamName.equals("AllTeam"))
		{
			Query query 							= pmDeleteTeam.newQuery(ManageTeamJdo.class,"companyId == '"+companyId+"'");
			List<ManageTeamJdo> teamInfo 			= (List<ManageTeamJdo>) query.execute();
			
			if(!(teamInfo.isEmpty()) && teamInfo != null)
			{
				for(ManageTeamJdo team : teamInfo)
				{
					if(team.getTeamMembers().contains(userKey))
					{
						newTeamMems 					= team.getTeamMembers();
						
						newTeamMems.remove(userKey);
						team.setTeamMembers(newTeamMems);
						
						pmDeleteTeam.currentTransaction().begin();
						pmDeleteTeam.makePersistent(team);
						pmDeleteTeam.currentTransaction().commit();
					}
				}
			}
			
			UserProfile userProfileDetails			= pmDeleteTeam.getObjectById(UserProfile.class,userKey);
			pmDeleteTeam.deletePersistent(userProfileDetails);
			
			Query queryUserBadgeLog 				= pmDeleteTeam.newQuery(UserBadgeLogJdo.class,"companyId == '"+companyId+"' && userId == '"+userKey+"'");
			List<UserBadgeLogJdo> userBadgeLogList	= (List<UserBadgeLogJdo>) queryUserBadgeLog.execute();
			
			if(!(userBadgeLogList.isEmpty()) && userBadgeLogList != null)
			{
				for(UserBadgeLogJdo iteratingUserBadgeLog : userBadgeLogList)
				{
					pmDeleteTeam.currentTransaction().begin();
					pmDeleteTeam.deletePersistent(iteratingUserBadgeLog);
					pmDeleteTeam.currentTransaction().commit();
				}
			}
			
			Query queryUserStatusDetails 			= pmDeleteTeam.newQuery(UserStatusDetails.class,"companyId == '"+companyId+"' && userId == '"+userKey+"'");
			List<UserStatusDetails> userStatusList	= (List<UserStatusDetails>) queryUserStatusDetails.execute();
			
			if(!(userStatusList.isEmpty()) && userStatusList != null)
			{
				for(UserStatusDetails iteratingUserStatusList : userStatusList)
				{
					pmDeleteTeam.currentTransaction().begin();
					pmDeleteTeam.deletePersistent(iteratingUserStatusList);
					pmDeleteTeam.currentTransaction().commit();
				}
			}
		}
		else
		{
			Query query 							= pmDeleteTeam.newQuery(ManageTeamJdo.class,"companyId == '"+companyId+"' && teamName == '"+teamName+"'");
			List<ManageTeamJdo> teamInfo 			= (List<ManageTeamJdo>) query.execute();
			
			if(!(teamInfo.isEmpty()) && teamInfo != null)
			{
				for(ManageTeamJdo team : teamInfo)
				{
					if(team.getTeamMembers().contains(userKey))
					{
						newTeamMems 					= team.getTeamMembers();
						
						newTeamMems.remove(userKey);
						team.setTeamMembers(newTeamMems);
						
						pmDeleteTeam.currentTransaction().begin();
						pmDeleteTeam.makePersistent(team);
						pmDeleteTeam.currentTransaction().commit();
					}
				}
			}
		}
	}
	
	@RequestMapping(value="/detachFromCompany" , method=RequestMethod.GET)
	protected void detachFromCompany(@RequestParam(value="detachingCompanyId", required=false) String detachingCompanyId,HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		System.out.println("detachingCompanyId :: "+detachingCompanyId);
		HttpSession session 			= request.getSession();
		String userKey					= (String) session.getAttribute("userKeyLogin");
		session.setAttribute("detachingCompanyId", detachingCompanyId);
		
		this.deleteTeamMem(userKey, "AllTeam", request, response);
	}
	
	@RequestMapping(value="/hideFromOthers" , method=RequestMethod.GET)
	protected void hideFromOthers(@RequestParam(value="hidingCompanyId", required=false) String hidingCompanyId,@RequestParam(value="access_specifier", required=false) String access_specifier,HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		PersistenceManager hideTheUser		 	= PMF.get().getPersistenceManager();
		System.out.println("hideFromOthers :: "+hidingCompanyId);
		
		HttpSession session 					= request.getSession();
		String userKey							= (String) session.getAttribute("userKeyLogin");
		
		UserProfile userProfileInstance			= null;
		
		try 
		{
			 userProfileInstance				= hideTheUser.getObjectById(UserProfile.class,userKey);
			 
			 if(userProfileInstance != null && access_specifier != null)
			 {
				   if(access_specifier.equals("public"))
				   {
					   userProfileInstance.setProfileAccess("private");
				   }
				   else if(access_specifier.equals("private"))
				   {
					   userProfileInstance.setProfileAccess("public");
				   }
				   hideTheUser.makePersistent(userProfileInstance);
			}
		}
		catch(Exception e)
		{
			System.out.println("exception");
		}
		finally
		{
			hideTheUser.close();
		}
	}
	
	@RequestMapping(value="/changeStatusOfUser" , method=RequestMethod.GET)
	protected void editStatusOfUser(@RequestParam(value="status", required=false) String status,@RequestParam(value="userKey", required=false) String userKey,HttpServletRequest request,HttpServletResponse response)
	{
		PersistenceManager userstatusToEdit = PMF.get().getPersistenceManager();
		try
		{
		UserProfile userStatusInfo = userstatusToEdit.getObjectById(UserProfile.class,userKey);
		userStatusInfo.setType(status);
		userstatusToEdit.currentTransaction().begin();
		userstatusToEdit.makePersistent(userStatusInfo);
		userstatusToEdit.currentTransaction().commit();
		 response.setContentType("text/html");
		 response.getWriter().println("Success");
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
	}

	@RequestMapping(value="/addNewTeamToCompany" , method=RequestMethod.GET)
	protected void addNewTeam(@RequestParam(value="teamName", required=false) String teamName,@RequestParam(value ="teamOrder",required=false) String teamOrder,HttpServletRequest request,HttpServletResponse response)
	{
		HttpSession session = request.getSession();
		String companyId = (String) session.getAttribute("companyKey");
		
		PersistenceManager pmAddNewTeam = PMF.get().getPersistenceManager();
		UUID newTeamId = UUID.randomUUID();
		Date now = new Date();
		try
		{
			ManageTeamJdo addNew = new ManageTeamJdo();
			addNew.setCompanyId(companyId);
			addNew.setTeamName(teamName);
			addNew.setDate(now);
			addNew.setKey(newTeamId.toString());
			addNew.setTeamOrder(Integer.parseInt(teamOrder));
			addNew.setDeleteFlag("false");
			pmAddNewTeam.makePersistent(addNew);
			response.setContentType("text/html");
			response.getWriter().print(newTeamId.toString());
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	
	@RequestMapping(value="/editExistingTeam" , method=RequestMethod.GET)
	protected void editExistingTeam(@RequestParam(value="teamId", required=false) String teamId,@RequestParam(value="userId", required=false) String userId,HttpServletRequest request,HttpServletResponse response)
	{
		Date now = new Date();
		PersistenceManager pmEditTeam = PMF.get().getPersistenceManager();
		try
		{
			pmEditTeam.currentTransaction().begin();
			ManageTeamJdo editInfo = pmEditTeam.getObjectById(ManageTeamJdo.class,teamId);
			ArrayList<String> existingMembers = editInfo.getTeamMembers();
			if(!(existingMembers.contains(userId)))
			{
				existingMembers.add(userId);
				editInfo.setTeamMembers(existingMembers);
				editInfo.setDate(now);
				pmEditTeam.makePersistent(editInfo);
				pmEditTeam.currentTransaction().commit();
			}
			response.setContentType("text/html");
			response.getWriter().print("Success");
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
	@RequestMapping(value="/inviteNewUser" , method=RequestMethod.POST)
	protected @ResponseBody void inviteNewUser(@RequestParam(value="emailId", required=false) String allEmailIds,@RequestParam(value="userKeyList", required=false) String allUserKeyList,HttpServletRequest request,HttpServletResponse response) throws IOException, JSONException
	{
		HttpSession session											= request.getSession();
		PersistenceManager pmAddNewTeamMem 							= PMF.get().getPersistenceManager();
		MailingService mail 										= new MailingService();
		
		CMSController cmsInstance 									= new CMSController();
			
		String companyId 											= (String) session.getAttribute("companyKey");
		String firstName 											= (String) session.getAttribute("userFirstName");
		String lastName 											= (String) session.getAttribute("userLastName");
		String companyName											= (String) session.getAttribute("companyName");
		
		List<String> validEmailIds									= new ArrayList<String>();
		List<UserProfile> manageTeamList ;
		Query queryManageTeam;
		
		String[] emailArray											= allEmailIds.split(",");
		String[] userKeyList										= allUserKeyList.split(",");
		
		try
		{
			for(int j=0;j<emailArray.length;j++)
			{
				JSONObject jsonInstance 							= new JSONObject(emailArray[j]);
				
				
				for(int i= 0;i<userKeyList.length;i++)
				{
					if(jsonInstance.has(userKeyList[i]))
					{
						
						queryManageTeam 									= pmAddNewTeamMem.newQuery(UserProfile.class,"companyId == '"+companyId+"' && userName == '"+jsonInstance.getString(userKeyList[i]).toLowerCase()+"'");
						manageTeamList 										= (List<UserProfile>) queryManageTeam.execute();
						
						if(manageTeamList.size() == 0)
						{	
								validEmailIds.add(jsonInstance.getString(userKeyList[i]));
								
								PersistenceManager persistenceInstance 		= PMF.get().getPersistenceManager();
								UserProfile userProfileInstance 			= persistenceInstance.getObjectById(UserProfile.class,companyId);
							
								JSONObject cmsKey							= new JSONObject(userProfileInstance.getCmsKey());
							
								UserProfile addNewMemToComp 				= new UserProfile();
								UUID key 									= UUID.randomUUID();
								
								addNewMemToComp.setKey(key.toString());
								addNewMemToComp.setcompanyId(companyId);
								addNewMemToComp.setcompanyName(companyName);
								addNewMemToComp.setDomain(jsonInstance.getString(userKeyList[i]).split("@")[1].replace("[","").replace("]",""));
								addNewMemToComp.setType("user");
								addNewMemToComp.setuserName(jsonInstance.getString(userKeyList[i]).toLowerCase());
							   
								
								String cmsKeyForNewUser 					= cmsInstance.insertStaffToCMS(cmsKey.getString("uniquepin"), addNewMemToComp);
							   
								addNewMemToComp.setCmsKey(cmsKeyForNewUser);
							   
								pmAddNewTeamMem.currentTransaction().begin();
								pmAddNewTeamMem.makePersistent(addNewMemToComp);
								pmAddNewTeamMem.currentTransaction().commit();
								
//								mail.sendMailToNewUser(validEmailIds.toString().replace("[","").replace("]", ""),firstName,lastName);
						}
					}
				}
			}
			System.out.println("validEmailIds.toString() "+validEmailIds.toString().replace("[","").replace("]", ""));
			mail.sendMailToNewUser(validEmailIds.toString().replace("[","").replace("]",""),firstName,lastName);
	  
	  }
	  catch(Exception e)
	  {
	   
	  }
	 }
	
//	@RequestMapping(value="/getcontactdetailsfromgmail", method=RequestMethod.GET)
//	public void getcontactdetails(HttpServletRequest req, HttpServletResponse response , HttpSession session)
//	{
//		String accestokenString=(String) session.getAttribute("accessToken");
//		 String addr1 = "https://www.google.com/m8/feeds/contacts/default/full?alt=json&max-results=1000&access_token="+accestokenString;
//	      try
//	      {
//		      URL url = new URL(addr1);
//		      String inputLine;
//		      String inputToJson = "";
//		      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//		      conn.setRequestMethod("GET");
//		      conn.connect();
//		      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
//		      while ((inputLine = reader.readLine()) != null)
//				{		
//		    	  System.out.println("inputLine ::"+inputLine);
//		    	  inputToJson += inputLine;
//				}
//		  
//		      response.setContentType("application/json");
//				PrintWriter out = response.getWriter();
//				out.print(inputToJson);
//		      System.out.println("inputToJson ::"+inputToJson);
//		    
//		      conn.disconnect();
//		      }
//	      catch(IOException ex)
//		      {
//			      ex.printStackTrace();
//		      }
//	}
	
	/*@RequestMapping(value="/getcontactdetailsfromgmail", method=RequestMethod.GET)
	public void getcontactdetails(HttpServletRequest req, HttpServletResponse response)
	{
		
		HttpSession session 						= req.getSession();
		System.out.println("comes inside"+session.getAttribute("emailIdFirst").toString());
		
		try
		{
			String accestokenString						= (String) session.getAttribute("accessToken");
			String userEmailId							= (String) session.getAttribute("emailIdFirst");
			
			ContactsService myService 					= new ContactsService("AdaptiveYou");
//			myService.setAuthSubToken(accestokenString);
//			myService.setUserToken(accestokenString);
			
			myService.setHeader("Authorization", "OAuth "+accestokenString);
			myService.setHeader("GData-Version","3.0");
			
			System.out.println("Email id :: "+userEmailId);
			
			URL feedUrl 								= new URL("https://www.google.com/m8/feeds/contacts/"+userEmailId+"/full?access_token="+accestokenString);
			
			ContactFeed resultFeed 						= myService.getFeed(feedUrl, ContactFeed.class);
			
			ObjectMapper objMapper 						= new ObjectMapper();
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			
			HashMap<String,String> contactsListMap = new HashMap<String,String>();
			
			
			String emailAddress 						= "";
			String userFullName							= "";
			
			for (ContactEntry entry : resultFeed.getEntries())
			{
				if(entry != null && entry.getEmailAddresses() != null)
				{	
					 for (Email email : entry.getEmailAddresses()) 
					 {
						 emailAddress 					= "";
						 userFullName					= "";
						 if(email != null)
						 {
							 if(email.getAddress() != null)
							 {
								 emailAddress			= email.getAddress();
							 }
							 if(entry.getName() != null && entry.getName().getFullName() != null && entry.getName().getFullName().getValue() != null)
							 {
								 userFullName			= entry.getName().getFullName().getValue();
							 }
						 }
					 }
				}
				
				contactsListMap.put(emailAddress, userFullName);
			}
			
			System.out.println("contactsListMap :: "+contactsListMap.size()+" "+contactsListMap);
			
			response.setContentType("application/json");
			response.getWriter().println(objMapper.writeValueAsString(contactsListMap));
		}
		catch (Exception e) 
		{
			e.printStackTrace();
		}
		
		
	}*/
	
	@RequestMapping(value="/deletePendingRequest" , method=RequestMethod.POST)
	protected @ResponseBody void deletePendingRequest(HttpServletRequest request,HttpServletResponse response,@RequestParam(value="pendingUserId",required=true)String pendingUserId)
	{
		HttpSession session 						= request.getSession();
		PersistenceManager persistentManager		= PMF.get().getPersistenceManager();
		String companyId 							= (String) session.getAttribute("companyKey");
		
		Query query									= persistentManager.newQuery(UserProfile.class,"companyId == '"+companyId+"' && userName == '"+pendingUserId+"'");
		List<UserProfile> userProfile				= (List<UserProfile>)query.execute();
		
		if( userProfile != null && !userProfile.isEmpty())
		{
			for(UserProfile iterateOverUserProfile:userProfile)
			{
				persistentManager.currentTransaction().begin();
				persistentManager.deletePersistent(iterateOverUserProfile);
				persistentManager.currentTransaction().commit();
			}
		}
	}
}
