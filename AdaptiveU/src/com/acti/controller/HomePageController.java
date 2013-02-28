package com.acti.controller;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.withUrl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.ByteBuffer;

import com.acti.jdo.BadgesList;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.logging.Logger;


import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.acti.jdo.PMF;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.acti.resletclient.SignupDetailsFromClient;
import com.adaptive.business.dao.AdaptiveYouDAO;
import com.adaptive.business.service.AdaptiveYouServiceMethods;
import com.adaptive.business.service.AdaptiveYouoDataStore;
import com.google.api.client.auth.oauth2.draft10.AccessTokenResponse;
import com.google.api.client.auth.oauth2.draft10.AuthorizationRequestUrl;
import com.google.api.client.extensions.appengine.http.urlfetch.UrlFetchTransport;
import com.google.api.client.googleapis.auth.oauth2.draft10.GoogleAccessProtectedResource;
import com.google.api.client.googleapis.auth.oauth2.draft10.GoogleAccessTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.draft10.GoogleAuthorizationRequestUrl;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.api.files.AppEngineFile;
import com.google.appengine.api.files.FileService;
import com.google.appengine.api.files.FileServiceFactory;
import com.google.appengine.api.files.FileWriteChannel;
import com.google.appengine.api.images.Image;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.appengine.api.images.Transform;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.json.JSONException;
import org.json.JSONObject;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@Controller
public class HomePageController extends HttpServlet {


	private static final Logger log = Logger.getLogger(HomePageController.class.getName());
	ResourceBundle lResourceBundle = ResourceBundle.getBundle("ApplicationResources");
	
	
	@RequestMapping(value="/" , method=RequestMethod.GET)
	protected String loginPage(HttpServletRequest request,HttpServletResponse response)
	{
		return "login";
	}
	
	@RequestMapping(value="/user" , method=RequestMethod.GET)
	protected String userPage(HttpServletRequest request,HttpServletResponse response)
	{
		return "user";
	}
	
	@RequestMapping(value="/error" , method=RequestMethod.GET)
	protected String errorPage(HttpServletRequest request,HttpServletResponse response)
	{
		return "error";
	}
	
	@RequestMapping(value="/logout",method=RequestMethod.GET)
	protected void logout(HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		HttpSession httpSession 						= request.getSession();
		PersistenceManager persistenceUserObject 		= PMF.get().getPersistenceManager();
		Date logutTime 									= new Date();
		
		if(	(String)httpSession.getAttribute("userEmailid") != null	)
		{
			String userid 								= (String)httpSession.getAttribute("userEmailid");
		
			Query queryUserDetails 						= persistenceUserObject.newQuery(UserProfile.class, "userName == '"+userid+"'");
			List<UserProfile> userDetails 				= (List<UserProfile>)queryUserDetails.execute();
		
			for(UserProfile userAttributes : userDetails)
			{
				userAttributes.setLogoutTime(logutTime);
				persistenceUserObject.currentTransaction().begin();
				persistenceUserObject.makePersistent(userAttributes);
				persistenceUserObject.currentTransaction().commit();
			}
		}
		
		httpSession.invalidate();
//		return "logout";
		
//		String serverName 								= request.getServerName().toLowerCase();
		String scheme 									= request.getScheme();
//		int port 										= request.getServerPort();
		
//		String val 										= (new URL(scheme + "://" + serverName + ":"+ port)).getHost();
		
		String oAuthMode 								= lResourceBundle.getString("MODE");
		
		if("LIVE".equalsIgnoreCase(oAuthMode))
		{
			response.sendRedirect(scheme+"://"+"adaptiveyou.com");
		}
		else if("STAGING".equalsIgnoreCase(oAuthMode))
		{
			response.sendRedirect(scheme+"://"+"adaptiveyou-staging-signup.appspot.com");
		}
		else if("LOCAL".equalsIgnoreCase(oAuthMode))
		{
			response.sendRedirect("http://localhost:8080");
		}	
		  
	}
	


	
	@RequestMapping(value="/editBadgeDetails", method=RequestMethod.POST)
	protected void editBadges(@RequestParam(value="badge_details[]", required=false) String[] Values,@RequestParam(value="videotitle[]", required=false) String[] Values1,@RequestParam(value="videourl[]", required=false) String[] Values2,@RequestParam(value="videodescription[]", required=false) String[] Values3,@RequestParam(value="videoids[]", required=false) String[] Values4,@RequestParam(value="videothumbnails[]", required=false) String[] Values5,HttpServletRequest request,HttpServletResponse response)
	{
	
		if(Values1==null&&Values2==null&&Values3==null &&Values4==null&&Values5==null){
			String badgeCreatedId = Values[0];
			String badgeName = Values[1];
			int badge_points = Integer.parseInt(Values[2]);
			Text badgeDescription = new Text(Values[3]);
			String badgeType= Values[4];
			String badgeLogoPath  = "";
			String existingBadgeId = "";
			if(Values.length > 6)
			{
				 badgeLogoPath = Values[5];
				 existingBadgeId = Values[6];
			}
			PersistenceManager pm_get = PMF.get().getPersistenceManager();
			Date now = new Date();
			HttpSession lsession= request.getSession();
			BadgesList badgesList =  pm_get.getObjectById(BadgesList.class,existingBadgeId);
			badgesList.setBadgeName(badgeName);
			badgesList.setbadgeDiscription(badgeDescription);
			badgesList.setbadgeValue(badge_points);
			badgesList.setcreatedDate(now);
			if(!("".equalsIgnoreCase(badgeLogoPath)) && badgeLogoPath != null)
			{
				badgesList.setBadgeLogoPath(badgeLogoPath);
			}
			badgesList.setbadgeType(badgeType);
			badgesList.setbadgeAssignee(badgeCreatedId);
			badgesList.setCompanyId((String)lsession.getAttribute("companyKey"));
			/*badgesList.setVideoid(videokeys);*/
			
			 pm_get.currentTransaction().begin();
			 pm_get.makePersistent(badgesList);
			 pm_get.currentTransaction().commit();
		}
		
	}
	
	@RequestMapping(value="/ecoauth2callback" , method=RequestMethod.GET)
	public String ecoauth2callback(HttpServletRequest req,HttpServletResponse resp) throws ServletException, IOException 
	{
		
		 	HttpSession session = req.getSession();
			String oAuthMode = lResourceBundle.getString("MODE");
			String oauth_client_id 		= "";
			String oauth_client_secret 	= "";
			String oauth_redirect_uri 	= "";
			
			if("LIVE".equalsIgnoreCase(oAuthMode))
			{
				oauth_client_id 	= lResourceBundle.getString("live_ec_oauth_client_id").trim();
				oauth_client_secret = lResourceBundle.getString("live_ec_oauth_client_secret").trim();
				oauth_redirect_uri	= lResourceBundle.getString("live_ec_oauth_redirect_uri").trim();
			}
			else if("STAGING".equalsIgnoreCase(oAuthMode))
			{
				oauth_client_id 	= lResourceBundle.getString("staging_ec_oauth_client_id").trim();
				oauth_client_secret = lResourceBundle.getString("staging_ec_oauth_client_secret").trim();
				oauth_redirect_uri	= lResourceBundle.getString("staging_ec_oauth_redirect_uri").trim();
			}
			else
			{
				oauth_client_id 	= lResourceBundle.getString("local_ec_oauth_client_id").trim();
				oauth_client_secret = lResourceBundle.getString("local_ec_oauth_client_secret").trim();
				oauth_redirect_uri	= lResourceBundle.getString("local_ec_oauth_redirect_uri").trim();
			}
			
		 
		    String firstName ="";
		    String lastName = "";
		    String profileImage = "";
		    String emailId = "";
		    // Check for an error returned by OAuth
		    String error = req.getParameter("error");
		    String code = req.getParameter("code");
		    if (error != null) {
		      resp.setContentType("text/plain");
		      resp.getWriter().println("There was a problem during authentication: " + error);
		      log.severe("There was a problem during authentication: " + error);
		      return "error";
		    }
		   
		    if(session.getAttribute("refreshToken") != null)
		      {
		    	  GoogleAccessProtectedResource requestInitializer =
		    		        new GoogleAccessProtectedResource(
		    		        	(String)session.getAttribute("accessToken"),
		    		            new UrlFetchTransport(),
		    		            new GsonFactory(),
		    		            oauth_client_id,
		    		            oauth_client_secret,
		    		            (String)session.getAttribute("refreshToken"));
		    	  
		    	 
		    	  session.setAttribute("accessToken", requestInitializer.getAccessToken());
			      session.setAttribute("refreshToken", requestInitializer.getRefreshToken());
			      
			      String addr = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+requestInitializer.getAccessToken();

			      
			     
			      try
			      {
				      URL url = new URL(addr);
				      String inputLine;
				      String inputToJson = "";
				      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
				      conn.setRequestMethod("GET");
				      conn.connect();
				      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
				      while ((inputLine = reader.readLine()) != null)
						{		
				    	  inputToJson += inputLine;
						}
				      
				    JSONObject googleUserDetails = null;
					try 
					{
				      googleUserDetails = new JSONObject(inputToJson);
				      if(googleUserDetails.getString("email") != null)
							  emailId = googleUserDetails.getString("email");
						if(googleUserDetails.getString("given_name") != null)
				    	  firstName = googleUserDetails.getString("given_name");
						if(googleUserDetails.getString("family_name") != null)
				    	  lastName = googleUserDetails.getString("family_name");
						if(googleUserDetails.getString("picture") != null)
				    	  profileImage= googleUserDetails.getString("picture");
				      } 
				      catch (JSONException e) {
							e.printStackTrace();
						}
				      conn.disconnect();
				      
				      

				      }catch(IOException ex)
				      {
					      ex.printStackTrace();
				      }
			
			
			      	  session.setAttribute("openLogin","enabled");
				      session.setAttribute("emailIdFirst",emailId.toLowerCase());
				      session.setAttribute("firstNameFirst",firstName);
				      session.setAttribute("lastNameFirst",lastName);
				      session.setAttribute("profileImageFirst", profileImage);
				      
//				      if(session.getAttribute("openLogin") != null && session.getAttribute("openLogin").toString().equals("enabled"))
//				      {
//				    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/openLoginController");
//				      }
//				      else
//				      {
//				    	  if(session.getAttribute("workingRemotelyIsActive") == null && session.getAttribute("emailIdDuringRemoteSession") == null)
//					      {
					    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/userCompanyList");
//					      }
//					      else
//					      {
//					    	  session.setAttribute("emailIdDuringRemoteSession", emailId.toLowerCase()); 
//					    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/"+session.getAttribute("companyNameRemote")+"/"+session.getAttribute("badgeNameRemote"));
//					      }
//				      }
		      }
		     
		    // When we're redirected back from the OAuth 2.0 grant page, a code will be supplied in a GET parameter named 'code'
		  
		    else if (code == null || code.isEmpty()) {	
		    	
		      // Now that we have the OAuth 2.0 code, we must exchange it for a token to make API requests.

		      // Build the authorization URL
		      AuthorizationRequestUrl authorizeUrl = new GoogleAuthorizationRequestUrl(
		    		  oauth_client_id,
		    		  oauth_redirect_uri,
		    		  lResourceBundle.getString("oauth_scopes")
		      );
		      authorizeUrl.set("access_type", "offline");
		      //authorizeUrl.set("approval_prompt", "force");
		      authorizeUrl.redirectUri = oauth_redirect_uri;
		      authorizeUrl.scope = lResourceBundle.getString("oauth_scopes");
		      
		      String authorizationUrl = authorizeUrl.build();

		      
		      resp.sendRedirect(authorizationUrl);
		      return "user";
		    } 

		    else {
		     
		      AccessTokenResponse accessTokenResponse = new GoogleAccessTokenRequest.GoogleAuthorizationCodeGrant(new NetHttpTransport(),
		              new GsonFactory(),
		              oauth_client_id,
		              oauth_client_secret,
		              code,
		              oauth_redirect_uri
		    			).execute();

		    
		      
		      String addr = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+accessTokenResponse.accessToken;

		      
		     
		      try
		      {
			      URL url = new URL(addr);
			      String inputLine;
			      String inputToJson = "";
			      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			      conn.setRequestMethod("GET");
			      conn.connect();
			      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
			      while ((inputLine = reader.readLine()) != null)
					{		
			    	  inputToJson += inputLine;
					}
			      
			    JSONObject googleUserDetails = null;
				try 
				{
			      googleUserDetails = new JSONObject(inputToJson);
			      if(googleUserDetails.getString("email") != null)
			    	  emailId = googleUserDetails.getString("email");
			      if(googleUserDetails.getString("given_name") != null)
			    	  firstName = googleUserDetails.getString("given_name");
			      if(googleUserDetails.getString("family_name") != null)
			    	  lastName = googleUserDetails.getString("family_name");
			      if(!("null".equalsIgnoreCase(googleUserDetails.getString("picture"))) && googleUserDetails.getString("picture") != null)
			    	  profileImage= googleUserDetails.getString("picture");  
				} 
				catch (JSONException e) {
						e.printStackTrace();
					}
			      conn.disconnect();
			      }catch(IOException ex)
			      {
				      ex.printStackTrace();
			      }
		      
		      	  session.setAttribute("openLogin","enabled");
			      session.setAttribute("emailIdFirst",emailId.toLowerCase());
			      session.setAttribute("firstNameFirst",firstName);
			      session.setAttribute("lastNameFirst",lastName);
			      session.setAttribute("profileImageFirst", profileImage);
			      
			      
//			      if(session.getAttribute("openLogin") != null && session.getAttribute("openLogin").toString().equals("enabled"))
//			      {
//			    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/openLoginController");
//			      }
//			      else
//			      {
//			    	  if(session.getAttribute("workingRemotelyIsActive") == null && session.getAttribute("emailIdDuringRemoteSession") == null)
//				      {
				    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/userCompanyList");
//				      }
//				      else
//				      {
//				    	  session.setAttribute("emailIdDuringRemoteSession", emailId.toLowerCase()); 
//				    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/"+session.getAttribute("companyNameRemote")+"/"+session.getAttribute("badgeNameRemote"));
//				      }
//			      }
			      
//			      if(session.getAttribute("workingRemotelyIsActive") == null && session.getAttribute("emailIdDuringRemoteSession") == null)
//			      {
//			    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/userCompanyList");
//			      }
//			      else
//			      {
//			    	  session.setAttribute("emailIdDuringRemoteSession", emailId.toLowerCase()); 
//			    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/"+session.getAttribute("companyNameRemote")+"/"+session.getAttribute("badgeNameRemote"));
//			      }
			      
			      session.setAttribute("accessToken", accessTokenResponse.accessToken);
				  session.setAttribute("refreshToken", accessTokenResponse.refreshToken);
		    }
		    return "user";
	}
	
	
	String type			= "";
	
	@RequestMapping(value="/oauth2callback" , method=RequestMethod.GET)
	public String openId(HttpServletRequest req,HttpServletResponse resp) throws Exception 
	{
		 HttpSession session = req.getSession();
		String oAuthMode = lResourceBundle.getString("MODE");
		String oauth_client_id 		= "";
		String oauth_client_secret 	= "";
		String oauth_redirect_uri 	= "";
		
		
		if(req.getParameter("type") != null)
		{
			type			= req.getParameter("type");
		}
		
		
		System.out.println("type :: "+type);
		
		
		if("LIVE".equalsIgnoreCase(oAuthMode))
		{
			oauth_client_id 	= lResourceBundle.getString("live_oauth_client_id").trim();
			oauth_client_secret = lResourceBundle.getString("live_oauth_client_secret").trim();
			oauth_redirect_uri	= lResourceBundle.getString("live_oauth_redirect_uri").trim();
		}
		else if("STAGING".equalsIgnoreCase(oAuthMode))
		{
			oauth_client_id 	= lResourceBundle.getString("staging_oauth_client_id").trim();
			oauth_client_secret = lResourceBundle.getString("staging_oauth_client_secret").trim();
			oauth_redirect_uri	= lResourceBundle.getString("staging_oauth_redirect_uri").trim();
		}
		else
		{
			oauth_client_id 	= lResourceBundle.getString("local_oauth_client_id").trim();
			oauth_client_secret = lResourceBundle.getString("local_oauth_client_secret").trim();
			oauth_redirect_uri	= lResourceBundle.getString("local_oauth_redirect_uri").trim();
		}
		
	 
	    String firstName ="";
	    String lastName = "";
	    String profileImage = "";
	    String emailId = "";
	    // Check for an error returned by OAuth
	    String error = req.getParameter("error");
	    String code = req.getParameter("code");
	    if (error != null) {
	      resp.setContentType("text/plain");
	      resp.getWriter().println("There was a problem during authentication: " + error);
	      log.severe("There was a problem during authentication: " + error);
	      return "error";
	    }
	   
	    if(session.getAttribute("refreshToken") != null)
	      {
	    	  GoogleAccessProtectedResource requestInitializer =
	    		        new GoogleAccessProtectedResource(
	    		        	(String)session.getAttribute("accessToken"),
	    		            new UrlFetchTransport(),
	    		            new GsonFactory(),
	    		            oauth_client_id,
	    		            oauth_client_secret,
	    		            (String)session.getAttribute("refreshToken"));
	    	  
	    	 
	    	  session.setAttribute("accessToken", requestInitializer.getAccessToken());
		      session.setAttribute("refreshToken", requestInitializer.getRefreshToken());
		      
		      String addr = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+requestInitializer.getAccessToken();

		      
		     
		      try
		      {
			      URL url = new URL(addr);
			      String inputLine;
			      String inputToJson = "";
			      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			      conn.setRequestMethod("GET");
			      conn.connect();
			      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
			      while ((inputLine = reader.readLine()) != null)
					{		
			    	  inputToJson += inputLine;
					}
			      
			    JSONObject googleUserDetails = null;
				try 
				{
			      googleUserDetails = new JSONObject(inputToJson);
			      if(googleUserDetails.getString("email") != null)
						  emailId = googleUserDetails.getString("email");
					if(googleUserDetails.getString("given_name") != null)
			    	  firstName = googleUserDetails.getString("given_name");
					if(googleUserDetails.getString("family_name") != null)
			    	  lastName = googleUserDetails.getString("family_name");
					if(googleUserDetails.getString("picture") != null)
			    	  profileImage= googleUserDetails.getString("picture");
			      } 
			      catch (JSONException e) {
						e.printStackTrace();
					}
			      conn.disconnect();
			      
			      

			      }catch(IOException ex)
			      {
				      ex.printStackTrace();
			      }
		
		
			      
			      session.setAttribute("emailIdFirst",emailId.toLowerCase());
			      session.setAttribute("firstNameFirst",firstName);
			      session.setAttribute("lastNameFirst",lastName);
			      session.setAttribute("profileImageFirst", profileImage);
			      
//			      if(session.getAttribute("openLogin") != null && session.getAttribute("openLogin").toString().equals("enabled"))
//			      {
//			    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/openLoginController");
//			      }
//			      else
//			      {
			      
			      if(type.equals("signupClient"))
			      {
			    	  SignupDetailsFromClient			signupInstance				= new SignupDetailsFromClient();
			    	  
			    	  ArrayList signupDetails				= new ArrayList();
			    	  
			    	  signupDetails.add(firstName);
			    	  signupDetails.add(firstName);
			    	  signupDetails.add(emailId.toLowerCase());
			    	  signupDetails.add("");
			    	  signupDetails.add(profileImage);
			    	  
			    	  if(session.getAttribute("companyKey") == null)
			    	  {
			    		  String companyKey			= signupInstance.addDetails(signupDetails);
				    	  
				    	  session.setAttribute("companyKey",companyKey);
			    	  }
			    	  
			    	  type			= "";
			    	  
			    	  resp.sendRedirect("/persistUser");
			      }
			      else
			      {
			    	  if(session.getAttribute("workingRemotelyIsActive") == null && session.getAttribute("emailIdDuringRemoteSession") == null)
				      {
				    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/userCompanyList");
				      }
				      else
				      {
				    	  session.setAttribute("emailIdDuringRemoteSession", emailId.toLowerCase()); 
				    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/"+session.getAttribute("companyNameRemote")+".do/"+session.getAttribute("badgeNameRemote"));
				      }
			      }
			    	 
//			      }
	      }
	     
	    // When we're redirected back from the OAuth 2.0 grant page, a code will be supplied in a GET parameter named 'code'
	  
	    else if (code == null || code.isEmpty()) {	
	    	
	      // Now that we have the OAuth 2.0 code, we must exchange it for a token to make API requests.

	      // Build the authorization URL
	      AuthorizationRequestUrl authorizeUrl = new GoogleAuthorizationRequestUrl(
	    		  oauth_client_id,
	    		  oauth_redirect_uri,
	    		  lResourceBundle.getString("oauth_scopes")
	      );
	      authorizeUrl.set("access_type", "offline");
	      //authorizeUrl.set("approval_prompt", "force");
	      authorizeUrl.redirectUri = oauth_redirect_uri;
	      authorizeUrl.scope = lResourceBundle.getString("oauth_scopes");
	      
	      String authorizationUrl = authorizeUrl.build();

	      
	      resp.sendRedirect(authorizationUrl);
	      return "user";
	    } 

	    else {
	     
	      AccessTokenResponse accessTokenResponse = new GoogleAccessTokenRequest.GoogleAuthorizationCodeGrant(new NetHttpTransport(),
	              new GsonFactory(),
	              oauth_client_id,
	              oauth_client_secret,
	              code,
	              oauth_redirect_uri
	    			).execute();

	    
	      
	      String addr = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+accessTokenResponse.accessToken;

	      
	     
	      try
	      {
		      URL url = new URL(addr);
		      String inputLine;
		      String inputToJson = "";
		      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		      conn.setRequestMethod("GET");
		      conn.connect();
		      BufferedReader reader = new BufferedReader(new InputStreamReader(url.openStream()));
		      while ((inputLine = reader.readLine()) != null)
				{		
		    	  inputToJson += inputLine;
				}
		      
		    JSONObject googleUserDetails = null;
			try 
			{
		      googleUserDetails = new JSONObject(inputToJson);
		      if(googleUserDetails.getString("email") != null)
		    	  emailId = googleUserDetails.getString("email");
		      if(googleUserDetails.getString("given_name") != null)
		    	  firstName = googleUserDetails.getString("given_name");
		      if(googleUserDetails.getString("family_name") != null)
		    	  lastName = googleUserDetails.getString("family_name");
		      if(!("null".equalsIgnoreCase(googleUserDetails.getString("picture"))) && googleUserDetails.getString("picture") != null)
		    	  profileImage= googleUserDetails.getString("picture");  
			} 
			catch (JSONException e) {
					e.printStackTrace();
				}
		      conn.disconnect();
		      }catch(IOException ex)
		      {
			      ex.printStackTrace();
		      }
		      session.setAttribute("emailIdFirst",emailId.toLowerCase());
		      session.setAttribute("firstNameFirst",firstName);
		      session.setAttribute("lastNameFirst",lastName);
		      session.setAttribute("profileImageFirst", profileImage);
		      
		      
//		      if(session.getAttribute("openLogin") != null && session.getAttribute("openLogin").toString().equals("enabled"))
//		      {
//		    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/openLoginController");
//		      }
//		      else
//		      {
		      if(type.equals("signupClient"))
		      {
		    	  SignupDetailsFromClient			signupInstance				= new SignupDetailsFromClient();
		    	  
		    	  ArrayList signupDetails				= new ArrayList();
		    	  
		    	  signupDetails.add(firstName);
		    	  signupDetails.add(firstName);
		    	  signupDetails.add(emailId.toLowerCase());
		    	  signupDetails.add("");
		    	  signupDetails.add(profileImage);
		    	  
		    	  
		    	  if(session.getAttribute("companyKey") == null)
		    	  {
		    		  String companyKey			= signupInstance.addDetails(signupDetails);
			    	  
			    	  session.setAttribute("companyKey",companyKey);
		    	  }
		    	  
		    	  
		    	  
		    	  type			= "";
		    	  
		    	  resp.sendRedirect("/persistUser");
		      }
		      else
		      {
		    	  if(session.getAttribute("workingRemotelyIsActive") == null && session.getAttribute("emailIdDuringRemoteSession") == null)
			      {
			    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/userCompanyList");
			      }
			      else
			      {
			    	  session.setAttribute("emailIdDuringRemoteSession", emailId.toLowerCase()); 
			    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/"+session.getAttribute("companyNameRemote")+".do/"+session.getAttribute("badgeNameRemote"));
			      }
		      }
		    	  
//		      }
		      
//		      if(session.getAttribute("workingRemotelyIsActive") == null && session.getAttribute("emailIdDuringRemoteSession") == null)
//		      {
//		    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/userCompanyList");
//		      }
//		      else
//		      {
//		    	  session.setAttribute("emailIdDuringRemoteSession", emailId.toLowerCase()); 
//		    	  resp.sendRedirect(req.getScheme() + "://"+ req.getServerName() + ":" + req.getServerPort() + req.getContextPath()+"/"+session.getAttribute("companyNameRemote")+"/"+session.getAttribute("badgeNameRemote"));
//		      }
		      
		      session.setAttribute("accessToken", accessTokenResponse.accessToken);
			  session.setAttribute("refreshToken", accessTokenResponse.refreshToken);
	    }
	    return "user";
	}
	

	
	@RequestMapping(value="/loginDetailsFromClient", method=RequestMethod.GET)
	public String persistUserFromClient(@RequestParam(value="firstName", required=false) String firstName,@RequestParam(value="lastName", required=false) String lastName,@RequestParam(value="email", required=false) String emailId,@RequestParam(value="profileImage", required=false) String profileImage, @RequestParam(value="signinFlag", required=false) String signinFlag, HttpServletRequest req, HttpServletResponse response , HttpSession session) throws JSONException
	{
		  session.setAttribute("emailIdFirst",emailId.toLowerCase());
	      session.setAttribute("firstNameFirst",firstName);
	      session.setAttribute("lastNameFirst",lastName);
	      session.setAttribute("profileImageFirst", profileImage);
	     // session.setAttribute("signinFlagFirst", signinFlag);
	      Date now = new Date();
	      try 
	      {
    		  System.out.println(signinFlag);

	    	  if(signinFlag==null)
	    	  {
	    		  System.out.println(firstName);
			response.sendRedirect("/userCompanyList");
	    	  }
	    	  else
	    	  {
	    		  
	    		  
	    		  
	    		  PersistenceManager pmComp = PMF.get().getPersistenceManager();
	    		  System.out.println(firstName);
	    		  pmComp = PMF.get().getPersistenceManager();
					UserProfile userInfo = new UserProfile();
					UUID compkey = UUID.randomUUID();
					userInfo.setKey(compkey.toString());
					//userInfo.setcompanyName(company);
					userInfo.setcompanyId(compkey.toString());
					userInfo.setFirstName(firstName);
					userInfo.setLastName(lastName);
					userInfo.setLoginTime(now);
					userInfo.setDomain(emailId.split("@")[1]);
					userInfo.setprofilePicture(profileImage);
					userInfo.setType("Company");
					userInfo.setuserName(emailId.toLowerCase());
					
					CMSController cmsInstance				= new CMSController();
					String dataReturnedFromCMS				= cmsInstance.insertCompanyToCMS(userInfo);
					System.out.println(dataReturnedFromCMS+" from cms controller");
					if(dataReturnedFromCMS != null)
					{
						userInfo.setCmsKey(dataReturnedFromCMS);
					}
					
					
					pmComp.makePersistent(userInfo);
	    		  
	    		  
	    		  
	    		  
	    		  
	    		  
	    		  
	    		  
				  session.setAttribute("companykey",compkey.toString());
	    		  session.setAttribute("emailIdFirst",emailId.toLowerCase());
	    	      session.setAttribute("firstNameFirst",firstName);
	    	      session.setAttribute("lastNameFirst",lastName);
	    	      session.setAttribute("signinFlagFirst", signinFlag);
	    		  System.out.println(signinFlag);
	    		  //String redirectsignin="http://localhost:8888/loginDetailsFromClient.do?firstName="+firstName+"&lastName="+lastName+"&email="+emailId+"&profileImage="+profileImage+"&signinFlag="+"signin";
	    		  
	    		  return "user";
	    		  //response.sendRedirect("/persistUser");
	    	  }
	      } 
	      catch (IOException e) 
	      {
			e.printStackTrace();
	      }
	      return "user";
	}
	
	@RequestMapping(value="/passingCompanyName" , method=RequestMethod.GET)
	public  String  passCompanyName(@RequestParam(value="company", required=false) String company,@RequestParam(value="companyKey", required=false) String companyKey,@RequestParam(value="email", required=false) String emailId,HttpServletRequest req, @RequestParam(value="firstName", required=false) String firstName,@RequestParam(value="lastName", required=false) String lastName,@RequestParam(value="profileImage", required=false) String profileImage,HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException
	{
		try
		{
			//@RequestParam(value="firstName", required=false) String firstName,@RequestParam(value="lastName", required=false) String lastName,@RequestParam(value="email", required=false) String emailId,@RequestParam(value="profileImage", required=false) String profileImage, @RequestParam(value="signinFlag", required=false) String signinFlag,
			
			
			PersistenceManager pm = PMF.get().getPersistenceManager();
			PMF.get().getPersistenceManager();
			PMF.get().getPersistenceManager();
			HttpSession sessionLogin = req.getSession();
			String userKey = "";
			String compId = companyKey;
			String userType="";
			LinkedHashMap<String,UserProfile> respUserDetails = new LinkedHashMap<String,UserProfile>();
			Query query =pm.newQuery(UserProfile.class,"userName == '"+emailId+"' && companyId == '"+companyKey+"' && type != 'requested'");//&& type == 'user'
			System.out.println(companyKey);
			Date now = new Date();
			List<UserProfile> contactDetails = (List<UserProfile>)query.execute();
			
			System.out.println("company ID   "+companyKey+"   "+contactDetails);
			//log.warning("comes to else");
			String companyName="";
			for(UserProfile userDls: contactDetails)
			{
				
				userDls.setcompanyName(company);

				
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
		      sessionLogin.setAttribute("signinFlagFirst",null);
		     // response.sendRedirect("/persistUser");
		      //sessionLogin.setAttribute("companyName",company);

		}
		catch(IOException e)
		{
			
		}
		return "user";
	}

	//end
	
	@RequestMapping(value="/userCompanyList", method=RequestMethod.GET)
	public String userCompanyList(HttpServletRequest req, HttpServletResponse response , HttpSession session) throws JsonGenerationException, JsonMappingException, IOException
	{
		PersistenceManager persistenceObject 		= PMF.get().getPersistenceManager();
		LinkedHashMap<String,String> companyList 	= new LinkedHashMap<String, String>();
		List<UserProfile> companyDetails 			= new ArrayList<UserProfile>();
		String compId								= "";
		String companyName 							= "";
		String emailId								= "";
		String domain								= "";	
		
		ObjectMapper objMapper 						= new ObjectMapper();
		objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
		objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
		
		if(session.getAttribute("emailIdFirst") != null)
		{
			emailId 								= (String) session.getAttribute("emailIdFirst");
			
			if(emailId.contains("@"))
			{
				domain 								= emailId.split("@")[1];
			}
		}
		
		Query queryCompanyDetails 					= persistenceObject.newQuery(UserProfile.class,"domain == '"+domain+"' && userName == '"+emailId+"'");
		companyDetails 								= (List<UserProfile>)queryCompanyDetails.execute();
		
		if(companyDetails.isEmpty() || companyDetails.size() == 0)
		{
			log.info("*****************************Before session************ COMPANY	DETAILS 0"+session.getAttribute("openLogin"));
			if(session.getAttribute("openLogin") != null)
			{
				log.info("*****************************After session************" + session.getAttribute("openLogin"));
				response.sendRedirect("/openLoginController");
			}
			else
			{
				return "error";
			}
		} 
		else if(companyDetails.size() == 1)
		{
			log.info("*****************************Before session************ COMPANY	DETAILS 1" + session.getAttribute("openLogin"));
			if(session.getAttribute("openLogin") != null)
			{
				log.info("*****************************AFTER session************ COMPANY	DETAILS 1");
				companyList.put("fdc0c85f-ca2d-4d25-9bc9-e5b05f1cb2e9","EMICS");
				
				for(UserProfile compInfo:companyDetails)
				{
					if((!(("").equals(compInfo.getcompanyName())) || compInfo.getcompanyName()!= null) && !(("fdc0c85f-ca2d-4d25-9bc9-e5b05f1cb2e9").equals(compInfo.getcompanyName())))
					{
						companyList.put(compInfo.getcompanyId(),compInfo.getcompanyName());
					}
				}
				
				
				session.setAttribute("companyslist",objMapper.writeValueAsString(companyList));
				
				response.sendRedirect("/openLoginController");
			}
			else
			{
				for( UserProfile compInfo : companyDetails )
				{
					compId 							= compInfo.getcompanyId();
					companyName 					= compInfo.getcompanyName();
				}
				
				session.setAttribute("companyslist", null);
				session.setAttribute("companyKey"  , compId);
				session.setAttribute("companyName" , companyName);
				
				response.sendRedirect("/persistUser");
			}
		}
		else if(companyDetails.size() > 1)
		{
			log.info("*****************************Before session************ COMPANY	DETAILS MORE THAN 1" + session.getAttribute("openLogin"));
			if(session.getAttribute("openLogin") != null)
			{
				log.info("*****************************AFTER session************ COMPANY	DETAILS MORE THAN 1");
				companyList.put("fdc0c85f-ca2d-4d25-9bc9-e5b05f1cb2e9","EMICS");
				
				for(UserProfile compInfo:companyDetails)
				{
					if((!(("").equals(compInfo.getcompanyName())) || compInfo.getcompanyName()!= null) && !(("fdc0c85f-ca2d-4d25-9bc9-e5b05f1cb2e9").equals(compInfo.getcompanyName())))
					{
						companyList.put(compInfo.getcompanyId(),compInfo.getcompanyName());
					}
				}
				
				session.setAttribute("companyslist",objMapper.writeValueAsString(companyList));
				
				response.sendRedirect("/openLoginController");
			}
			else
			{
				for(UserProfile compInfo:companyDetails)
				{
					if(!(("").equals(compInfo.getcompanyName()))||compInfo.getcompanyName()!= null)
					{
						companyList.put(compInfo.getcompanyId(),compInfo.getcompanyName());
					}
				}
				session.setAttribute("companyslist",objMapper.writeValueAsString(companyList));
				
				return "companyselector";
			}
		}
		return "companyselector";
	}
	
	@RequestMapping(value="/intermediateCheck", method=RequestMethod.GET)
	public void intermediateCheck(HttpServletRequest req, HttpServletResponse response , HttpSession session) throws JsonGenerationException, JsonMappingException, IOException, JSONException
	{
		String referrerUrl										= req.getHeader("Referer");
		String companyID			 							= req.getParameter("companyKey").trim();
//		String userEmailId										= (String) session.getAttribute("userEmailid");
		
		if("fdc0c85f-ca2d-4d25-9bc9-e5b05f1cb2e9".equalsIgnoreCase(companyID))
			session.setAttribute("openLogin","enabled");
		else
			session.setAttribute("openLogin", null);
		
		session.setAttribute("companyKey", companyID);
		session.setAttribute("referrerUrl", referrerUrl);
		
		response.sendRedirect("/persistUser");
	
//		if(referrerUrl.contains("/userCompanyList"))
//		{
//			response.sendRedirect("/persistUser");
//		}
//		else
//		{
//			AdaptiveYouServiceMethods userProfileDetails		= new AdaptiveYouServiceMethods();
//			String userProfileDetailsList						= userProfileDetails.getDataFromUserProfile(companyID, userEmailId);
//			
//			JSONObject userProfileObject						= new JSONObject(userProfileDetailsList);
//			
//			if(userProfileObject != null && userProfileObject.length() > 0)
//			{
//				session.setAttribute("userProfileDetails",userProfileDetailsList);
//				session.setAttribute("companyName",userProfileObject.getString("companyName"));
//				session.setAttribute("userFirstName",userProfileObject.getString("firstName"));
//				session.setAttribute("userLastName",userProfileObject.getString("lastName"));
//				session.setAttribute("userImage",userProfileObject.getString("profileImage"));
//			}
//			
//			response.sendRedirect(referrerUrl);
//		}
		
	}

	
	String croppedImageUrl 					= "";
	String uploadSessionURL 				= "";
	
	@RequestMapping(value="/displayCroppedImage")
	public void displayCroppedImage(@RequestParam(value="x1", required=false) String x1,@RequestParam(value="y1", required=false) String y1,@RequestParam(value="x2", required=false) String x2,@RequestParam(value="y2", required=false) String y2,@RequestParam(value="height", required=false) String height,@RequestParam(value="width", required=false) String width,HttpServletResponse response , HttpSession session,HttpServletRequest  request) throws IOException
	{
		BlobstoreService blobstoreService 	= BlobstoreServiceFactory.getBlobstoreService();
		ImagesService image  			  	= (ImagesService) ImagesServiceFactory.getImagesService();
		BlobKey oldblobKey 				  	= null;
		croppedImageUrl						= "";
		int realwidth,realheight;
		float X1,X2,Y1,Y2;
		
		X1									= Float.parseFloat(x1);
		Y1									= Float.parseFloat(y1);
		X2									= Float.parseFloat(x2);
		Y2									= Float.parseFloat(y2);
		realwidth							= Integer.parseInt(width);
		realheight							= Integer.parseInt(height);
		
		X1									= X1/realwidth;
		X2									= X2/realwidth;
		Y1									= Y1/realheight;
		Y2									= Y2/realheight;
		
		
		
        
		Map<String, List<BlobKey>> blobs 	= blobstoreService.getUploads(request);
		List<BlobKey> blobKeyList			= blobs.get("chooseNewPicture");
		
		for(BlobKey iteratingBlobKeyList : blobKeyList)
		{
			if(iteratingBlobKeyList != null)
			{
				oldblobKey					= iteratingBlobKeyList;
			}
		}
        
        Image oldimage 						= ImagesServiceFactory.makeImageFromBlob(oldblobKey);
        Transform cropTransform 			= ImagesServiceFactory.makeCrop(X1, Y1, X2, Y2);
        Image newimage 						= image.applyTransform(cropTransform, oldimage);

        FileService fileService 			= FileServiceFactory.getFileService();
        AppEngineFile file 					= fileService.createNewBlobFile(newimage.getFormat().toString());
        FileWriteChannel writeChannel 		= fileService.openWriteChannel(file, true);
        	
        writeChannel.write(ByteBuffer.wrap(newimage.getImageData()));
        writeChannel.closeFinally();

        BlobKey croppedblobKey 				= fileService.getBlobKey(file);

        croppedImageUrl		 				= image.getServingUrl(ServingUrlOptions.Builder.withBlobKey(croppedblobKey));
        uploadSessionURL					= blobstoreService.createUploadUrl("/displayCroppedImage");
        
        blobstoreService.delete(oldblobKey);
	}
	
	
	@RequestMapping(value="/getCroppedImageUrl", method=RequestMethod.POST)
	public void getCroppedImageUrl(HttpServletRequest req, HttpServletResponse response , HttpSession session) throws IOException
	{
		BlobstoreService blobStoreService 				= BlobstoreServiceFactory.getBlobstoreService();
		PersistenceManager persistenceUserObject 		= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		String userEmailID								= (String)session.getAttribute("emailIdFirst");
		String oldImageUrl								= "";
		ArrayList<String> updationList					= new ArrayList<String>();
		
		Query query										= persistenceUserObject.newQuery(UserProfile.class,"userName == '"+userEmailID+"' && companyId == '"+userCompanyId+"'");
		List<UserProfile> userProfileDetails			= (List<UserProfile>)query.execute();
		
		
		
		for(UserProfile iteratingUserProfileDetails : userProfileDetails)
		{
			if( !(iteratingUserProfileDetails.getProfileUpdate().contains("profileImage")) && iteratingUserProfileDetails.getProfileUpdate().contains("firstName") && iteratingUserProfileDetails.getProfileUpdate().contains("lastName") )
			{
				updationList.add("firstName");
				updationList.add("lastName");
				updationList.add("profileImage");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			else if(!(iteratingUserProfileDetails.getProfileUpdate().contains("profileImage")))
			{
				updationList.add("profileImage");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			
			oldImageUrl									= iteratingUserProfileDetails.getprofilePicture();
			iteratingUserProfileDetails.setprofilePicture(croppedImageUrl);
			
			persistenceUserObject.currentTransaction().begin();
			persistenceUserObject.makePersistent(iteratingUserProfileDetails);
			persistenceUserObject.currentTransaction().commit();
		}
		
//		if(oldImageUrl != null && !(oldImageUrl.equals("")))
//        {
//			if(!(oldImageUrl.equals((String)session.getAttribute("profileImageFirst"))))
//			{
//				blobStoreService.delete(new BlobKey(oldImageUrl.split("/")[(oldImageUrl.split("/").length)-1]));
//			}
//        }
	
		response.setContentType("text/plain");
		response.getWriter().println(croppedImageUrl+","+uploadSessionURL);
	}
	
	@RequestMapping(value="/revertToGoogleImage", method=RequestMethod.POST)
	public void saveGooglePicture(HttpServletRequest req, HttpServletResponse response , HttpSession session) throws IOException
	{
		BlobstoreService blobStoreService 				= BlobstoreServiceFactory.getBlobstoreService();
		PersistenceManager persistenceUserObject 		= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		String userEmailID								= (String)session.getAttribute("emailIdFirst");
		String profileImage 							= (String)session.getAttribute("profileImageFirst");
		String oldImageUrl								= "";
		ArrayList<String> updationList					= new ArrayList<String>();
		
		Query query										= persistenceUserObject.newQuery(UserProfile.class,"userName == '"+userEmailID+"' && companyId == '"+userCompanyId+"'");
		List<UserProfile> userProfileDetails			= (List<UserProfile>)query.execute();
		
		for(UserProfile iteratingUserProfileDetails : userProfileDetails)
		{
			if( iteratingUserProfileDetails.getProfileUpdate().contains("profileImage") && iteratingUserProfileDetails.getProfileUpdate().contains("firstName") && iteratingUserProfileDetails.getProfileUpdate().contains("lastName") )
			{
				updationList.add("firstName");
				updationList.add("lastName");
				updationList.remove("profileImage");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			else if(iteratingUserProfileDetails.getProfileUpdate().contains("profileImage"))
			{
				updationList.remove("profileImage");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			
			oldImageUrl									= iteratingUserProfileDetails.getprofilePicture();
			iteratingUserProfileDetails.setprofilePicture(profileImage);
			
			persistenceUserObject.currentTransaction().begin();
			persistenceUserObject.makePersistent(iteratingUserProfileDetails);
			persistenceUserObject.currentTransaction().commit();
		}
//		log.info(oldImageUrl+" url");
//		if(oldImageUrl != null && !(oldImageUrl.equals("")))
//        {
//			if(!(oldImageUrl.equals((String)session.getAttribute("profileImageFirst"))))
//			{
//				blobStoreService.delete(new BlobKey(oldImageUrl.split("/")[(oldImageUrl.split("/").length)-1]));
//			}
//        }
	}
	
	
	@RequestMapping(value="/updateUserName", method=RequestMethod.POST)
	public void getUpdateName(@RequestParam(value="userFirstName", required=false) String userFirstName,@RequestParam(value="userLastName", required=false) String userLastName, HttpServletRequest requset, HttpServletResponse response, HttpSession session)throws IOException
	{
		
		PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		String userEmailID								= (String)session.getAttribute("emailIdFirst");
		
		ArrayList<String> updationList					= new ArrayList<String>();
		Query query										= persistenceInstance.newQuery(UserProfile.class,"userName == '"+userEmailID+"' && companyId == '"+userCompanyId+"'");
		List<UserProfile> userProfileDetails			= (List<UserProfile>)query.execute();
		
		for(UserProfile iteratingUserProfileDetails : userProfileDetails)
		{
			if( !(iteratingUserProfileDetails.getProfileUpdate().contains("firstName")) && !(iteratingUserProfileDetails.getProfileUpdate().contains("lastName")) && !(iteratingUserProfileDetails.getProfileUpdate().contains("profileImage")) )
			{
				updationList.add("firstName");
				updationList.add("lastName");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			else if(!(iteratingUserProfileDetails.getProfileUpdate().contains("firstName")) && !(iteratingUserProfileDetails.getProfileUpdate().contains("lastName")) && iteratingUserProfileDetails.getProfileUpdate().contains("profileImage"))
			{
				updationList.add("firstName");
				updationList.add("lastName");
				updationList.add("profileImage");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			
			iteratingUserProfileDetails.setFirstName(userFirstName);
			iteratingUserProfileDetails.setLastName(userLastName);
			
//			JSONObject cmsKey			= new JSONObject(iteratingUserProfileDetails.getCmsKey());
//			CMSController cmsInstance 	= new CMSController();
//			String cmsKeyForNewUser = cmsInstance.updateStaffInCMS(cmsKey.getString("peopleId"), iteratingUserProfileDetails,requset);
//			iteratingUserProfileDetails.setCmsKey(cmsKeyForNewUser);
			
			persistenceInstance.currentTransaction().begin();
			persistenceInstance.makePersistent(iteratingUserProfileDetails);
			persistenceInstance.currentTransaction().commit();
		}
	}
	
	@RequestMapping(value="/revertBackToOauthName", method=RequestMethod.POST)
	public void revertBackToOauthName(HttpServletRequest requset, HttpServletResponse response, HttpSession session)throws IOException, JSONException
	{
		PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		String userEmailID								= (String)session.getAttribute("emailIdFirst");
		String userFirstName							= (String)session.getAttribute("firstNameFirst");
		String userLastName 							= (String)session.getAttribute("lastNameFirst");
		
		ArrayList<String> updationList					= new ArrayList<String>();
		
		Query query										= persistenceInstance.newQuery(UserProfile.class,"userName == '"+userEmailID+"' && companyId == '"+userCompanyId+"'");
		List<UserProfile> userProfileDetails			= (List<UserProfile>)query.execute();
		
		for(UserProfile iteratingUserProfileDetails : userProfileDetails)
		{
			if( iteratingUserProfileDetails.getProfileUpdate().contains("firstName") && iteratingUserProfileDetails.getProfileUpdate().contains("lastName") && !(iteratingUserProfileDetails.getProfileUpdate().contains("profileImage")) )
			{
				updationList.remove("firstName");
				updationList.remove("lastName");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			else if(iteratingUserProfileDetails.getProfileUpdate().contains("firstName") && iteratingUserProfileDetails.getProfileUpdate().contains("lastName") && iteratingUserProfileDetails.getProfileUpdate().contains("profileImage"))
			{
				updationList.remove("firstName");
				updationList.remove("lastName");
				updationList.add("profileImage");
				iteratingUserProfileDetails.setProfileUpdate(updationList);
			}
			
			iteratingUserProfileDetails.setFirstName(userFirstName);
			iteratingUserProfileDetails.setLastName(userLastName);
			
//			
//			JSONObject cmsKey			= new JSONObject(iteratingUserProfileDetails.getCmsKey());
//			CMSController cmsInstance 	= new CMSController();
//			String cmsKeyForNewUser = cmsInstance.updateStaffInCMS(cmsKey.getString("peopleId"), iteratingUserProfileDetails,requset);
//			iteratingUserProfileDetails.setCmsKey(cmsKeyForNewUser);
			
			persistenceInstance.currentTransaction().begin();
			persistenceInstance.makePersistent(iteratingUserProfileDetails);
			persistenceInstance.currentTransaction().commit();
		}
	}
	
	@RequestMapping(value="/createCompany", method=RequestMethod.GET)
	public void createCompany(HttpServletRequest requset, HttpServletResponse response, HttpSession session)throws IOException, JSONException
	{
			String companyName			 = requset.getParameter("user_company");
			String companyKey			 = (String) session.getAttribute("companyKey");
			
			System.out.println(companyName+" in "+companyKey);
		
		if(companyName != null && companyKey != null && !(companyName.equals("")))
		{
			PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
			UserProfile userProfileInstance					= persistenceInstance.getObjectById(UserProfile.class,companyKey);
			
			userProfileInstance.setcompanyName(companyName);
			
			persistenceInstance.currentTransaction().begin();
			persistenceInstance.makePersistent(userProfileInstance);
			persistenceInstance.currentTransaction().commit();
			
			
			persistenceInstance.close();
		}
	}
	
	@RequestMapping("/sendMailToUser")
	public void updateUserOnReceivingBadge(HttpServletRequest request, HttpServletResponse response , HttpSession session) throws IOException
		{
			String badgeId							= request.getParameter("badgeId");
		  	String userId							= request.getParameter("userId");
		  	String badgeAssigneId					= request.getParameter("badgeAssigneId");
		  	PersistenceManager pm 					= null;
		  	PersistenceManager pm1 					= null;
		  	String badgeAssigneeName 				= "";
		  	String userName 						= "";
		  	String emailId 							= "";
		  	String userImage 						= "";
		  	BadgesList badgeDetails 				= null;
		  	
		  	PersistenceManager persistenceObject	= PMF.get().getPersistenceManager();
		  	UserProfile badgeAssigneFullName		= persistenceObject.getObjectById(UserProfile.class,badgeAssigneId);
			badgeAssigneeName 						= badgeAssigneFullName.getFirstName()+ " " + badgeAssigneFullName.getLastName();
			
		  	
		  	try
			{
				pm									= PMF.get().getPersistenceManager();
				badgeDetails 						= pm.getObjectById(BadgesList.class,badgeId); 
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		  	try
			{
		  		pm1									= PMF.get().getPersistenceManager();
		  		UserProfile userProfileToSendMail 	= pm1.getObjectById(UserProfile.class,userId); 
		  		userName 							= userProfileToSendMail.getFirstName() + " " + userProfileToSendMail.getLastName();
		  		userImage 							= userProfileToSendMail.getprofilePicture();
		  		emailId 							= userProfileToSendMail.getuserName();
			}
		  	catch(Exception e)
		  	{
		  		e.printStackTrace();
		  	}
		  	
		  	try
		  	{
				Calendar now 		 				= Calendar.getInstance();
				Date date 							= new Date();
				String today 						= DateFormat.getDateTimeInstance(DateFormat.SHORT,DateFormat.SHORT).format(date);
				log.info("Today to check is it in correct Format " + today);
				
				VelocityEngine ve 					= new VelocityEngine();
				ve.init();
				Template t 							= ve.getTemplate( "/vm/userBadgeEmailTemp.vm" );
				
				VelocityContext context 			= new VelocityContext();
				
				context.put("companyName",(String)session.getAttribute("companyName"));
				context.put("username", userName);
				context.put("adminname", badgeAssigneeName);
				context.put("userimg", userImage);
				context.put("badgeimage",badgeDetails.getBadgeLogoPath());
				
				log.info("badgeName ::"+badgeDetails.getBadgeName());
				
				if("badge".equalsIgnoreCase(badgeDetails.getbadgeType()))
					context.put("badgename",badgeDetails.getBadgeName() + " badge");
				else if("trophy".equalsIgnoreCase(badgeDetails.getbadgeType()))
					context.put("badgename",badgeDetails.getBadgeName()+ " trophy");
				if("0".equalsIgnoreCase(badgeDetails.getbadgeValue().toString()))
					context.put("points","");
				else
					context.put("points","& "+badgeDetails.getbadgeValue()+" points too");
				
				StringWriter writer 				= new StringWriter();
		        t.merge( context, writer );
		        StringBuffer buffer 				= new StringBuffer(writer.toString());
				
				DateFormat dtformat 				= new SimpleDateFormat("MM/dd/yyyy");
				dtformat.setTimeZone( TimeZone.getTimeZone("America/Los_Angeles"));
				String ldate 						= dtformat.format(now.getTime());
				
			  	StringBuffer bodyText 				= new StringBuffer();
				bodyText.append("Hi "+userName+" ,").append("\n\n");
				String subject 						= "";
				
				if("badge".equalsIgnoreCase(badgeDetails.getbadgeType()))
				{
					bodyText.append("Congrats, you have received a badge from ").append(badgeAssigneeName).append(" on ").append(ldate).append(".");
					bodyText.append("\n\nThe Badge Name is - "+badgeDetails.getBadgeName());
					subject 						= "Congrats, you have received a badge";
				}
				else if("trophy".equalsIgnoreCase(badgeDetails.getbadgeType()))
				{
					bodyText.append("Congrats, you have received a trophy from ").append(badgeAssigneeName).append(" on ").append(ldate).append(".");
					bodyText.append("\n\nThe Trophy Name is - "+badgeDetails.getBadgeName());
					subject 						= "Congrats, you have received a trophy";
				}
				
				bodyText.append("\n\n");
				bodyText.append("Thank you!");
				bodyText.append("\nThe Adaptive Course Team.");
				MailingService mail  				= new MailingService();
				mail.sendMailToUserForBadge(buffer, subject, emailId);
		  	}
		  	catch(Exception e)
		  	{
		  		e.printStackTrace();
		  	}
		}
	
/*	@RequestMapping("/updateVideoStatusFromStarted")
	public void updateVideoStatusFromStarted(HttpServletRequest request, HttpServletResponse response , HttpSession session) throws IOException
	{
		PersistenceManager persistenceInstance					= PMF.get().getPersistenceManager();
		Query queryUserStatusDetails							= persistenceInstance.newQuery(UserStatusDetails.class);
		List<UserStatusDetails> userStatusDetailsList			= (List<UserStatusDetails>) queryUserStatusDetails.execute();
		
		if(userStatusDetailsList != null && userStatusDetailsList.size() > 0)
		{
			for(UserStatusDetails iteratingUserStatus : userStatusDetailsList)
			{
				if(iteratingUserStatus.getVideostatus() != null && iteratingUserStatus.getVideostatus().size() > 0)
				{
					ArrayList<String> videoStatusList			= iteratingUserStatus.getVideostatus();
					
					for(String iteratingVideoStatus : videoStatusList )
					{
						if(iteratingVideoStatus.contains("started"))
						{
							String videoKey						= iteratingVideoStatus.split(":")[0];
							int indexOftheVideoKey				= videoStatusList.indexOf(iteratingVideoStatus);
							videoStatusList.set(indexOftheVideoKey, videoKey+":0");
						}
					}
					iteratingUserStatus.setVideostatus(videoStatusList);
					persistenceInstance.currentTransaction().begin();
					persistenceInstance.makePersistent(iteratingUserStatus);
					persistenceInstance.currentTransaction().commit();
					
				}
			}
		}
	}*/
/*	@RequestMapping("/triggerTaskQueue")
	public void triggerTaskQueue(HttpServletRequest request, HttpServletResponse response , HttpSession session) throws IOException, JSONException
	{
		
		log.info("triggering task queue");
		Queue queue 			= QueueFactory.getQueue("cmsconfiguration");
		queue.add(withUrl("/pushAllCompaniesIntoCMS"));
		
		log.info("triggered");
	}
	
	@RequestMapping("/pushAllCompaniesIntoCMS")
	public void pushAllCompaniesIntoCMS(HttpServletRequest request, HttpServletResponse response , HttpSession session) throws IOException, JSONException
	{
		
		log.info("succes fully queued");
		
		PersistenceManager persistenceInstance					= PMF.get().getPersistenceManager();
		PersistenceManager persistenceObject					= PMF.get().getPersistenceManager();
		CMSController cmsInstance 								= new CMSController();
		List<String> companiesList								= new ArrayList<String>();
		
		
		companiesList.add("3f6f330b-6010-4349-b3a7-f0332eeeef39");
		
		
//		for(String iteratingCompaniesList : companiesList)
//		{
//			UserProfile userProfileDetails						= persistenceInstance.getObjectById(UserProfile.class,iteratingCompaniesList); 
//			String dataReturnedFromCMS							= cmsInstance.insertCompanyToCMS(userProfileDetails);
//			
//			log.info(dataReturnedFromCMS+" from cms controller 1");
//			
//			if(dataReturnedFromCMS != null)
//			{
//				userProfileDetails.setCmsKey(dataReturnedFromCMS);
//			}
//			
//			JSONObject cmsKey									= new JSONObject(userProfileDetails.getCmsKey());
//			
//			Query queryUserProfileDetails						= persistenceObject.newQuery(UserProfile.class,"companyId == '"+iteratingCompaniesList+"'");
//			List<UserProfile> userDetails						= (List<UserProfile>) queryUserProfileDetails.execute();
//			
//			for(UserProfile iteratingUserProfileDetails : userDetails)
//			{	
//				String staffCMSKey								= cmsInstance.insertStaffToCMS(cmsKey.getString("uniquepin"), iteratingUserProfileDetails);
//				log.info(dataReturnedFromCMS+" from cms controller 2");
//				
//				iteratingUserProfileDetails.setCmsKey(staffCMSKey);
//				
//				persistenceObject.currentTransaction().begin();
//				persistenceObject.makePersistent(iteratingUserProfileDetails);
//				persistenceObject.currentTransaction().commit();
//			}
//		}
			
//			Query queryUserProfileDetails						= persistenceObject.newQuery(UserProfile.class,"companyId == '3f6f330b-6010-4349-b3a7-f0332eeeef39'");
//			List<UserProfile> userDetails						= (List<UserProfile>) queryUserProfileDetails.execute();
//			
//			for(UserProfile iteratingUserProfileDetails : userDetails)
//			{	
//				if(iteratingUserProfileDetails.getCmsKey() == null || iteratingUserProfileDetails.getCmsKey().indexOf("uniquepin") == -1)
//				{	
//					String staffCMSKey								= cmsInstance.insertStaffToCMS("5XWU75", iteratingUserProfileDetails);
					
					iteratingUserProfileDetails.setCmsKey(staffCMSKey);
					
					persistenceObject.currentTransaction().begin();
					persistenceObject.makePersistent(iteratingUserProfileDetails);
					persistenceObject.currentTransaction().commit();
				}
			}
		
		
		log.info("pushing to cms completed");
	}*/

}