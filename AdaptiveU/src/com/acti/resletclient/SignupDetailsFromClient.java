package com.acti.resletclient;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import org.springframework.ui.Model;

import com.acti.controller.CMSController;
import com.acti.jdo.PMF;
import com.acti.jdo.UserProfile;
import com.google.appengine.labs.repackaged.org.json.JSONObject;





public class SignupDetailsFromClient extends ServerResource
{
	Model model;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Post
	public String addDetails(ArrayList Details)   throws Exception
		{
		
		String firstname = (String) Details.get(0);
		String lastName = (String) Details.get(1);
		String email = (String) Details.get(2);
		String company = (String) Details.get(3);
		String profilePic = (String)Details.get(4);
		
		Date now = new Date();
		
		String respToClient = "Failure";
		ArrayList responseToClient = new ArrayList();
		
		PersistenceManager pmComp = PMF.get().getPersistenceManager();
//		String domain =email.split("@")[1];
//		if(("gmail.com").equalsIgnoreCase(email.split("@")[1]) || ("facebook.com").equalsIgnoreCase(email.split("@")[1]))
//		{
//			Query queryCompanyDetails =pmComp.newQuery(UserProfile.class,"userName == '"+email.toLowerCase()+"' && type == 'Company'");
//			List<UserProfile> compDetails = (List<UserProfile>)queryCompanyDetails.execute();
//			if(compDetails.size() > 0)
//			{
//				respToClient = "Failure";
//			}
//			else
//			{
				pmComp = PMF.get().getPersistenceManager();
				UserProfile userInfo = new UserProfile();
				UUID compkey = UUID.randomUUID();
				userInfo.setKey(compkey.toString());
				userInfo.setcompanyName(company);
				userInfo.setcompanyId(compkey.toString());
				userInfo.setFirstName(firstname);
				userInfo.setLastName(lastName);
				userInfo.setLoginTime(now);
				userInfo.setDomain(email.split("@")[1]);
				userInfo.setprofilePicture(profilePic);
				userInfo.setType("Company");
				userInfo.setuserName(email.toLowerCase());
				
				CMSController cmsInstance				= new CMSController();
				String dataReturnedFromCMS				= cmsInstance.insertCompanyToCMS(userInfo);
				System.out.println(dataReturnedFromCMS+" from cms controller");
				if(dataReturnedFromCMS != null)
				{
					userInfo.setCmsKey(dataReturnedFromCMS);
				}
				
				
				pmComp.makePersistent(userInfo);
				respToClient = "Success";
//			}
			
//		}
//		else
//		{
//			Query queryCompanyDetails =pmComp.newQuery(UserProfile.class,"domain == '"+domain+"' && type == 'Company'");
//			List<UserProfile> compDetails = (List<UserProfile>)queryCompanyDetails.execute();
//			if(compDetails.size() > 0)
//			{
//				respToClient = "Failure";
//			}
//			else
//			{
//				pmComp = PMF.get().getPersistenceManager();
//				UserProfile userInfo = new UserProfile();
//				UUID compkey = UUID.randomUUID();
//				userInfo.setKey(compkey.toString());
//				userInfo.setcompanyName(company);
//				userInfo.setcompanyId(compkey.toString());
//				userInfo.setFirstName(firstname);
//				userInfo.setLastName(lastName);
//				userInfo.setLoginTime(now);
//				userInfo.setDomain(email.split("@")[1]);
//				userInfo.setprofilePicture(profilePic);
//				userInfo.setType("Company");
//				userInfo.setuserName(email.toLowerCase());
//				
//				CMSController cmsInstance				= new CMSController();
//				String dataReturnedFromCMS				= cmsInstance.insertCompanyToCMS(userInfo);
//				System.out.println(dataReturnedFromCMS+" from cms controller");
//				if(dataReturnedFromCMS != null)
//				{
//					userInfo.setCmsKey(dataReturnedFromCMS);
//				}
//				
//				pmComp.makePersistent(userInfo);
//				respToClient = "Success";
//			}
//		}
		responseToClient.add(respToClient);
		return compkey.toString();
		}
	
}