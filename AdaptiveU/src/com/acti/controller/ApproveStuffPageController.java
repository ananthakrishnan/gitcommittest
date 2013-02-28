package com.acti.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.adaptive.business.service.ApproveStuffPage;

@Controller
public class ApproveStuffPageController extends HttpServlet {
	private static final Logger log = Logger.getLogger(ApproveStuffPageController.class.getName());
	@RequestMapping(value="/denyRequestForStuff" , method=RequestMethod.POST)
	protected void denyStuff1(@RequestParam(value="uniqueUserKey", required=false) String uniqueUserKey,@RequestParam(value="stuffid", required=false) String stuffid,@RequestParam(value="userKey", required=false) String userid,@RequestParam(value="points", required=false) String points,HttpServletRequest request,HttpServletResponse response)
	{
		//changes by bharath
		PersistenceManager editStuff = PMF.get().getPersistenceManager();
		UserStatusDetails userBadgeLogedit = editStuff.getObjectById(UserStatusDetails.class,uniqueUserKey);
		
		try
		{   
				if(userBadgeLogedit.getStatus().equals("purchased"))
				{
					editStuff.deletePersistent(userBadgeLogedit);
				}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		PersistenceManager addpoints	= PMF.get().getPersistenceManager();
		Query queryEditStuff = addpoints.newQuery(UserBadgeLogJdo.class,"userId == '"+userid+"'");
		List<UserBadgeLogJdo> editInfo = (List<UserBadgeLogJdo>)queryEditStuff.execute();
		try
		{
			for(UserBadgeLogJdo userBadge : editInfo )
			{
				int points1=userBadge.getPoints();
				points1+=Integer.parseInt(points);
				userBadge.setPoints(points1);
				addpoints.makePersistent(userBadge);
			}
				
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally{
			addpoints.close();
			editStuff.close();
		}
		//changes by bharath
	}
	
	@RequestMapping(value="/allStuffDetails" , method=RequestMethod.GET)
	protected String requestStuffDetails(HttpServletRequest request,HttpServletResponse response) throws IOException
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
		 
		ApproveStuffPage approvestuffpageservicemethod=new ApproveStuffPage();
		approvestuffpageservicemethod.getDetailsForApproveStuffPage(compId,request);
		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);
		return "approvestuff";
	}
	
	//bharath starts here
	 @RequestMapping(value="/approveStuffRequest" , method=RequestMethod.POST)
	 protected void editStuff(@RequestParam(value="uniqueUserKey", required=false) String uniqueUserKey,@RequestParam(value="stuffid", required=false) String stuffid,@RequestParam(value="userKey", required=false) String userid,HttpServletRequest request,HttpServletResponse response)
	 {
	  PersistenceManager editStuff    				= PMF.get().getPersistenceManager();
	  PersistenceManager userstuffDetailsToEdit 	= PMF.get().getPersistenceManager();
	  Date now        								= new Date();
	  ArrayList<String> previousStuff				= new ArrayList<String>();
	  
	  
	  
	  
	  UserStatusDetails stuffInfo    =  editStuff.getObjectById(UserStatusDetails.class,uniqueUserKey);
	  
	  try
	  {
		
	    if(stuffInfo.getStatus().equals("purchased"))
	    {
		     stuffInfo.setStatus("approved");
		     stuffInfo.setDateApproved(now);
		     editStuff.currentTransaction().begin();
		     editStuff.makePersistent(stuffInfo);
		     editStuff.currentTransaction().commit();
	   }
	    
	    Query queryEditStuff      					= userstuffDetailsToEdit.newQuery(UserBadgeLogJdo.class,"userId == '"+userid+"'");
		  List<UserBadgeLogJdo> editInfo   			= (List<UserBadgeLogJdo>)queryEditStuff.execute();
	   
		  for(UserBadgeLogJdo updatestuff :  editInfo)
		  { 
			  if(updatestuff.getUserId() != null)
			    {
			    	if(updatestuff.getStuffId().isEmpty())
			    	{
			    		previousStuff.add(stuffid);
			    	}
			    	else
			    	{
			    		previousStuff  = updatestuff.getStuffId();
			   	     	previousStuff.add(stuffid);
			    	}
			    	updatestuff.setStuffId(previousStuff);
			    	userstuffDetailsToEdit.currentTransaction().begin();
			    	userstuffDetailsToEdit.makePersistent(updatestuff);
			    	userstuffDetailsToEdit.currentTransaction().commit();
			    	
			    }
		   }
	   }
	   catch(Exception e)
	   {
		   e.printStackTrace();
	   }
	  finally
	  {
		  userstuffDetailsToEdit.close();
	  }
	 }
	 //bharath ends here
	
}
