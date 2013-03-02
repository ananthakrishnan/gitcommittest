package com.acti.controller;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mortbay.util.ajax.JSON;
import org.springframework.stereotype.Controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.UUID;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.acti.jdo.AuctionList;
import com.acti.jdo.AuctionParticipants;
import com.acti.jdo.AuctionTransactions;
import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.acti.jdo.UserStatusDetails;
import com.acti.jdo.videodetails;
import com.adaptive.business.dao.BadgeListDAO;
import com.adaptive.business.dao.videodetailsDAO;
import com.adaptive.business.service.AddNewBadgeServiceMethod;
import com.google.appengine.api.blobstore.BlobInfoFactory;
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
import com.google.appengine.api.memcache.MemcacheService;
import com.google.appengine.api.memcache.MemcacheServiceFactory;

@Controller
public class AddNewBadgePageController extends HttpServlet 
{
	private static final Logger log = Logger.getLogger(AddNewBadgePageController.class.getName());
	private BlobstoreService blobstoreService=BlobstoreServiceFactory.getBlobstoreService();
	ResourceBundle lResourceBundle = ResourceBundle.getBundle("ApplicationResources");
	@RequestMapping("/addNewBadge")
	public String addNewBadge(HttpServletRequest request, HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
	{
		HttpSession session = request.getSession();
		PersistenceManager pmfrusercheck = PMF.get().getPersistenceManager();
		
		Query queryUserDetails =pmfrusercheck.newQuery(UserProfile.class,"	key == '"+(String)session.getAttribute("userKeyLogin")+"'");
		queryUserDetails.setOrdering("firstName asc");
		List<UserProfile> usersInfo = (List<UserProfile>)queryUserDetails.execute();

		for(UserProfile usersInfoDetail: usersInfo)
		{
			if(usersInfoDetail.getType().equals("user"))
			{
				return "error";
			}

		}
		String companyId	=	(String)session.getAttribute("companyKey");
		AddNewBadgeServiceMethod.addNewBadgeDetails(companyId,request);
		
		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);
		return "addNewBadge";
	}
	
	
	@RequestMapping("/getVideoDetails")
	public @ResponseBody void getVideoDetails(@RequestParam(value="videoids[]", required=false) String[] videoids,HttpServletRequest request,HttpServletResponse response) throws JsonGenerationException, JsonMappingException, IOException
	{
		PersistenceManager pm_get = null;
		pm_get = PMF.get().getPersistenceManager();
		ObjectMapper objMapper=new ObjectMapper();
		LinkedHashMap<String,videodetails> videosidmaps = new LinkedHashMap<String, videodetails>();
		Query query = pm_get.newQuery(videodetails.class,"key == keyedit");
		query.declareParameters("String keyedit");
		if(videoids !=null && !(videoids.equals("")) && !(videoids.equals("undefined"))){
			for(int i=0;i<videoids.length;i++){
				@SuppressWarnings("unchecked")
				List<videodetails> check=(List<videodetails>) query.execute(videoids[i]);
				for(videodetails badge: check)
				{
					videosidmaps.put(videoids[i], badge);
				}
			}
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			//request.setAttribute("videoidlists",objMapper.writeValueAsString(videosidmaps));
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			out.print(objMapper.writeValueAsString(videosidmaps));
			out.flush();
		}
	}
	@RequestMapping(value="/showDontshow", method=RequestMethod.POST)
	public @ResponseBody void showDontshow(@RequestParam(value="badgeKey", required=false) String badgeKey,@RequestParam(value="flagStatus", required=false) String flagStatus,HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		PersistenceManager changingBadgeStatusPMF 			= PMF.get().getPersistenceManager();
		BadgesList badgesListDetails 						= changingBadgeStatusPMF.getObjectById(BadgesList.class, badgeKey);
		
		badgesListDetails.setIsFlag(flagStatus);
		
		changingBadgeStatusPMF.makePersistent(badgesListDetails);
		
		changingBadgeStatusPMF.close();

	}
	 @RequestMapping(value="/deleteBadgeDetails" , method=RequestMethod.POST)
	 public @ResponseBody void deleteBadgeDetails(@RequestParam(value="deletingBadgeKey", required=false) String deletingBadgeKey,HttpServletRequest request,HttpServletResponse response, HttpSession session)
	 {
		 PersistenceManager pm_get       					= PMF.get().getPersistenceManager();
		 BadgesList setDelete        						= pm_get.getObjectById(BadgesList.class, deletingBadgeKey);
		 String badgeType        							= setDelete.getbadgeType();
		 
		 setDelete.setbadgeType("deleted "+badgeType);
		 pm_get.makePersistent(setDelete);
		 pm_get.close();
	  
	  
		 ArrayList<String> editEarnedBadgeTrophyList  		= new ArrayList<String>();
		 ArrayList<String> editWorkingOnBadgeTrophyList  	= new ArrayList<String>();
	  
		 PersistenceManager persistenceUserObject   		= PMF.get().getPersistenceManager();
		 String userCompanyId       						= (String)session.getAttribute("companyKey");
	  
		 Query queryUserDetails        						= persistenceUserObject.newQuery(UserBadgeLogJdo.class, "companyId == '"+userCompanyId+"'");
		 List<UserBadgeLogJdo> userDetails     				= (List<UserBadgeLogJdo>)queryUserDetails.execute();
		 
		 if(userDetails != null && userDetails.size() > 0)
		 {
			 for(UserBadgeLogJdo userAttributes : userDetails)
			 {
				 if(badgeType.equals("badge"))
				 {
					 editEarnedBadgeTrophyList     			= userAttributes.getBadgeId();
					 if(editEarnedBadgeTrophyList.contains(deletingBadgeKey))
					 {
						 editEarnedBadgeTrophyList.remove(deletingBadgeKey);
					 }
					 editWorkingOnBadgeTrophyList    		= userAttributes.getBadgesWorkingOn();
					 if(editWorkingOnBadgeTrophyList.contains(deletingBadgeKey))
					 {
						 editWorkingOnBadgeTrophyList.remove(deletingBadgeKey);
					 }
					 userAttributes.setBadgeId(editEarnedBadgeTrophyList);
					 userAttributes.setBadgesWorkingOn(editWorkingOnBadgeTrophyList);
				 }
				 else if(badgeType.equals("trophy"))
				 {
					 editEarnedBadgeTrophyList     			= userAttributes.getTrophyId();
					 if(editEarnedBadgeTrophyList.contains(deletingBadgeKey))
					 {
						 editEarnedBadgeTrophyList.remove(deletingBadgeKey);
					 }
					 editWorkingOnBadgeTrophyList    		= userAttributes.getTrophiesWorkingOn();
					 if(editWorkingOnBadgeTrophyList.contains(deletingBadgeKey))
					 {
						 editWorkingOnBadgeTrophyList.remove(deletingBadgeKey);
					 }
					 userAttributes.setTrophyId(editEarnedBadgeTrophyList);
					 userAttributes.setTrophiesWorkingOn(editWorkingOnBadgeTrophyList);
				 }
				 else if(badgeType.equals("item"))
				 {
					 editEarnedBadgeTrophyList     			= userAttributes.getStuffId();
					 if(editEarnedBadgeTrophyList.contains(deletingBadgeKey))
					 {
						 editEarnedBadgeTrophyList.remove(deletingBadgeKey);
					 }
					 userAttributes.setStuffId(editEarnedBadgeTrophyList);
				 }
				 persistenceUserObject.currentTransaction().begin();
				 persistenceUserObject.makePersistent(userAttributes);
				 persistenceUserObject.currentTransaction().commit();
			 }
		 }
		 
	  
		 PersistenceManager persistenceObject    			= PMF.get().getPersistenceManager();
		 Query queryDetails        						 	= persistenceObject.newQuery(UserStatusDetails.class, "stuffid == '"+deletingBadgeKey+"'");
		 List<UserStatusDetails> badgeDetails    			= (List<UserStatusDetails>)queryDetails.execute();
	  
		 if(badgeDetails != null && badgeDetails.size() > 0)
		 {
			 for(UserStatusDetails userdetails : badgeDetails)
			 {
				 persistenceObject.currentTransaction().begin();
				 persistenceObject.deletePersistent(userdetails);
				 persistenceObject.currentTransaction().commit();
			 }
		 }
	 }
	 
	 @RequestMapping(value="/deleteAuctionDetails" , method=RequestMethod.POST)
	 public @ResponseBody void deleteAuctionDetails(@RequestParam(value="deletingAuctionKey", required=false) String deletingAuctionKey,HttpServletRequest request,HttpServletResponse response, HttpSession session)
	 {

		 PersistenceManager persisenceInstance1							= PMF.get().getPersistenceManager();
		 PersistenceManager persisenceInstance2							= PMF.get().getPersistenceManager();
		 PersistenceManager persisenceInstance3							= PMF.get().getPersistenceManager();
		 
		 try
		 {
			 try
			 {
				 AuctionList	autionListData							= persisenceInstance1.getObjectById(AuctionList.class,deletingAuctionKey);
				 if(autionListData != null)
				 {
					 persisenceInstance1.deletePersistent(autionListData);
				 }
			 }
			 catch (NullPointerException e) 
			 {
				log.warning("Null pointer Exception");
			 }
			 catch (Exception e) 
			 {
				 log.warning("Not a  Null pointer Exception");
			 }
			 
			 Query queryAuctionParticipants								= persisenceInstance2.newQuery(AuctionParticipants.class,"auctionId == '"+deletingAuctionKey+"'");
			 
			 List<AuctionParticipants> auctionParticipantsList			= (List<AuctionParticipants>) queryAuctionParticipants.execute();
			 
			 if(auctionParticipantsList != null && !(auctionParticipantsList.isEmpty()) && auctionParticipantsList.size() > 0)
			 {
				 persisenceInstance2.deletePersistentAll(auctionParticipantsList);
			 }
			 
			 
			 Query queryAuctionTranscations								= persisenceInstance3.newQuery(AuctionTransactions.class,"auctionId == '"+deletingAuctionKey+"'");
			 
			 List<AuctionTransactions> auctionTranscationsList			= (List<AuctionTransactions>) queryAuctionTranscations.execute();
			 
			 if(auctionTranscationsList != null && !(auctionTranscationsList.isEmpty()) && auctionTranscationsList.size() > 0)
			 {
				 persisenceInstance3.deletePersistentAll(auctionTranscationsList);
			 }
		 }
		 catch (Exception e) 
		 {
			log.warning("Exception in DeleteAuctionDetails");
		 }
		 finally
		 {
			 persisenceInstance1.close();
			 persisenceInstance2.close();
			 persisenceInstance3.close();
		 }
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
	 }
	
	@RequestMapping(value="/saveBadgeDetails", method=RequestMethod.POST)
	protected void saveBadgeDetails(@RequestParam(value="badgeObject", required=false) String badgeObject,@RequestParam(value="videoListObject", required=false) String videoListObject,@RequestParam(value="arrayofTagsCreatedByAdmin[]", required=false) String[] arrayofTagsCreatedByAdmin,@RequestParam(value="arrayofTagsCreatedByUser[]", required=false) String[] arrayofTagsCreatedByUser,HttpServletRequest request,HttpServletResponse response,HttpSession session) throws IOException, JSONException 
	{
		String userCompanyId									= (String)session.getAttribute("companyKey");
		
		ArrayList<String> tagsContentList 						= new ArrayList<String>();
		ArrayList<String> tagsList								= new ArrayList<String>();
		ArrayList<String> temporaryList							= new ArrayList<String>();
		
		ArrayList<String> videoKeysList							= new ArrayList<String>();
		ArrayList<String> oldVideoKeys							= new ArrayList<String>();
		ArrayList<String> newVideoKeys							= new ArrayList<String>();
		
		PersistenceManager persistenceObject					= PMF.get().getPersistenceManager();
		PersistenceManager editVideoDetailsPMF					= PMF.get().getPersistenceManager();
		
		try
		{
			if(videoListObject != null && !(videoListObject.equals("{}")))
			{
				PersistenceManager videoDetailsPMF					= PMF.get().getPersistenceManager();
				JSONObject videoList								= new JSONObject(videoListObject);
				Iterator<?> keys 									= videoList.keys();
				
				while( keys.hasNext() )
				{
		            String key										= (String)keys.next();
		            if( videoList.get(key) instanceof JSONObject)
		            {
		            	JSONObject videoObject						= videoList.getJSONObject(key);
		            	
						if(videoObject.has("videoType"))
						{
							videodetails videoDetailsInstance			= new videodetails();
							
							videoDetailsInstance.setKey(videoObject.getString("key"));
							videoDetailsInstance.setCompanyId(userCompanyId);
							videoDetailsInstance.setViddesc(new Text(videoObject.getString("viddesc")));
							videoDetailsInstance.setVideoId(key);
							videoDetailsInstance.setVideothumbnail(videoObject.getString("videothumbnail"));
							videoDetailsInstance.setVideourl(videoObject.getString("Videourl"));
							videoDetailsInstance.setVidtitle(videoObject.getString("vidtitle"));
							
							videodetailsDAO.savevideodetails(videoDetailsInstance);
							
							videoKeysList.add(videoObject.getString("key"));
							newVideoKeys.add(videoObject.getString("key"));
						}
						else
						{
							videodetails videoDetailsList				= editVideoDetailsPMF.getObjectById(videodetails.class,videoObject.getString("key"));
							videoDetailsList.setViddesc(new Text(videoObject.getString("viddesc")));
							videoDetailsList.setVideoId(key);
							videoDetailsList.setVideothumbnail(videoObject.getString("videothumbnail"));
							videoDetailsList.setVideourl(videoObject.getString("Videourl"));
							videoDetailsList.setVidtitle(videoObject.getString("vidtitle"));
							
							editVideoDetailsPMF.makePersistent(videoDetailsList);
							
							videoKeysList.add(videoObject.getString("key"));
							oldVideoKeys.add(videoObject.getString("key"));
						}
		            }
			    }
				editVideoDetailsPMF.close();
			}

			if(badgeObject != null && !(badgeObject.equals("{}")))
			{
				JSONObject	badgeDetails								= new JSONObject(badgeObject);
				
				if(badgeDetails.has("key"))
				{
					BadgesList userBadgeDetails							= persistenceObject.getObjectById(BadgesList.class, badgeDetails.getString("key"));
					
					if(userBadgeDetails != null && userBadgeDetails.getBadgeTagsContents() != null && !(userBadgeDetails.getBadgeTagsContents().isEmpty()))
					{
						tagsList 										= userBadgeDetails.getBadgeTagsContents();
					}
					
					if(tagsList == null)
					{
						if(arrayofTagsCreatedByAdmin != null && arrayofTagsCreatedByAdmin.length != 0)
						{
				 			for(int i = 0 ; i< arrayofTagsCreatedByAdmin.length;i++)
				 			{
				 				if(!(arrayofTagsCreatedByAdmin[i].equals("")))
								{
				 					tagsContentList.add(arrayofTagsCreatedByAdmin[i]+":"+0);
								}	
				 			}
				 			tagsContentList.add("nimdasgat");
						}
						
						if(arrayofTagsCreatedByUser != null && arrayofTagsCreatedByUser.length != 0 )
						{
							for(int i = 0 ; i< arrayofTagsCreatedByUser.length;i++)
				 			{
								if(!(arrayofTagsCreatedByUser[i].equals("")))
								{	
									tagsContentList.add(arrayofTagsCreatedByUser[i]+":"+0);
								}
				 			}
				 			tagsContentList.add("resusgat");
						}
					}
					else
					{
						if(arrayofTagsCreatedByAdmin != null && arrayofTagsCreatedByAdmin.length != 0)
						{
				 			for(int i = 0 ; i< arrayofTagsCreatedByAdmin.length;i++)
				 			{
				 				if(!(arrayofTagsCreatedByAdmin[i].equals("")))
								{
				 					if(tagsList.toString().contains(arrayofTagsCreatedByAdmin[i]+":"))
				 					{
				 						for(String iterateTagList : tagsList)
					 					{
					 						if((iterateTagList != null && iterateTagList.split(":")[0].equals(arrayofTagsCreatedByAdmin[i])) && !(temporaryList.contains(arrayofTagsCreatedByAdmin[i])))
					 						{
					 							tagsContentList.add(iterateTagList);
					 							temporaryList.add(arrayofTagsCreatedByAdmin[i]);
					 						}
					 					}
				 					}
				 					else if(!(temporaryList.contains(arrayofTagsCreatedByAdmin[i])))
				 					{
				 						tagsContentList.add(arrayofTagsCreatedByAdmin[i]+":"+0);
			 							temporaryList.add(arrayofTagsCreatedByAdmin[i]);
				 					}
								}	
				 			}
				 			tagsContentList.add("nimdasgat");
				 			if(!(temporaryList.isEmpty()))
				 			{
				 				temporaryList.clear();
				 			}
						}
						
						if(arrayofTagsCreatedByUser != null && arrayofTagsCreatedByUser.length != 0)
						{
				 			for(int i = 0 ; i< arrayofTagsCreatedByUser.length;i++)
				 			{
				 				if(!(arrayofTagsCreatedByUser[i].equals("")))
								{
				 					if(tagsList.toString().contains(arrayofTagsCreatedByUser[i]+":"))
				 					{
				 						for(String iterateTagList : tagsList)
					 					{
					 						if((iterateTagList != null && iterateTagList.split(":")[0].equals(arrayofTagsCreatedByUser[i])) && !(temporaryList.contains(arrayofTagsCreatedByUser[i])))
					 						{
					 							tagsContentList.add(iterateTagList);
					 							temporaryList.add(arrayofTagsCreatedByUser[i]);
					 						}
					 					}
				 					}
				 					else if(!(temporaryList.contains(arrayofTagsCreatedByUser[i])))
				 					{
				 						tagsContentList.add(arrayofTagsCreatedByUser[i]+":"+0);
			 							temporaryList.add(arrayofTagsCreatedByUser[i]);
				 					}
								}	
				 			}
				 			tagsContentList.add("resusgat");
				 			if(!(temporaryList.isEmpty()))
				 			{
				 				temporaryList.clear();
				 			}
						}
					}
					// updation in userstatusdetails and videodetails starts here
					
					PersistenceManager userStatusPMF					= PMF.get().getPersistenceManager();
					
					Query queryUserStatusDetails 						= userStatusPMF.newQuery(UserStatusDetails.class,"companyId == '"+userCompanyId+"' && stuffid == '"+badgeDetails.getString("key")+"' && status != 'approved'");
					List<UserStatusDetails> userStatusDetailsList		= (List<UserStatusDetails>) queryUserStatusDetails.execute();
					
					if(videoKeysList != null && videoKeysList.size() > 0 )
					{
						if((oldVideoKeys != null && oldVideoKeys.size() > 0) || (newVideoKeys != null && newVideoKeys.size() > 0))
						{
							ArrayList<String> newUserStatusList				= new ArrayList<String>();
							
							if(!(userStatusDetailsList.isEmpty()) && userStatusDetailsList.size() > 0 && userStatusDetailsList != null )
							{
								for(UserStatusDetails iteratingUserStatus : userStatusDetailsList)
								{
									if(!(newUserStatusList.isEmpty()))
									{
										newUserStatusList.clear();
									}
									
									if(!(iteratingUserStatus.getVideostatus().isEmpty())  && iteratingUserStatus.getVideostatus().size() > 0 && iteratingUserStatus.getVideostatus() != null)
									{
										if(!(oldVideoKeys.isEmpty()) && oldVideoKeys.size() > 0 && oldVideoKeys != null)
										{
											for(String videoStatusKey : iteratingUserStatus.getVideostatus())
											{
												for(String iteratingVideoKeys : oldVideoKeys)
												{	
													if(videoStatusKey.startsWith(iteratingVideoKeys+":"))
													{
														newUserStatusList.add(videoStatusKey);
													}
												}
											}
										}
										else
										{
											newUserStatusList = iteratingUserStatus.getVideostatus();
										}
									}
									
									if(newVideoKeys != null && !(newVideoKeys.isEmpty()) && newVideoKeys.size() > 0  )
									{	
										for(String iteratingNewVideoKeys : newVideoKeys)
										{
											newUserStatusList.add(iteratingNewVideoKeys+":not started");
										}
									}
									
									iteratingUserStatus.setVideostatus(newUserStatusList);
									
									userStatusPMF.currentTransaction().begin();
									userStatusPMF.makePersistent(iteratingUserStatus);
									userStatusPMF.currentTransaction().commit();
									
									
								}
							}
							
							ArrayList<String> videoKeysToBeDeleted			= new ArrayList<String>();
							if(userBadgeDetails.getVideoid().containsAll(oldVideoKeys))
							{
								videoKeysToBeDeleted						= userBadgeDetails.getVideoid();
								videoKeysToBeDeleted.removeAll(oldVideoKeys);
							}
							PersistenceManager videoListPMF		= PMF.get().getPersistenceManager();
							for(String iteratingNeededVideoKeys : videoKeysToBeDeleted)
							{
								videodetails deleteVideoDetails = videoListPMF.getObjectById(videodetails.class,iteratingNeededVideoKeys);
								videoListPMF.deletePersistent(deleteVideoDetails);
							}
							videoListPMF.close();
						}
					}
					else
					{
						if(!(userStatusDetailsList.isEmpty()) && userStatusDetailsList.size() > 0 && userStatusDetailsList != null && userBadgeDetails.getVideoid() != null && !(userBadgeDetails.getVideoid().isEmpty()))
						{
							for(UserStatusDetails iteratingUserStatus : userStatusDetailsList)
							{
								iteratingUserStatus.setVideostatus(null);
								
								userStatusPMF.currentTransaction().begin();
								userStatusPMF.makePersistent(iteratingUserStatus);
								userStatusPMF.currentTransaction().commit();
							}
							
							PersistenceManager videoListPMF		= PMF.get().getPersistenceManager();
							for(String iteratingBadgeVideoKeys : userBadgeDetails.getVideoid())
							{
								videodetails deleteVideoDetails = videoListPMF.getObjectById(videodetails.class,iteratingBadgeVideoKeys);
								videoListPMF.deletePersistent(deleteVideoDetails);
							}
							videoListPMF.close();
						}
					}
					
					// updation in userstatusdetails and videodetails ends here
					
					
					
					userBadgeDetails.setbadgeDiscription(new Text(badgeDetails.getString("badgeDiscription")));
					userBadgeDetails.setBadgeLogoPath(badgeDetails.getString("badgeLogoPath"));
					userBadgeDetails.setBadgeName(badgeDetails.getString("badgeName"));
					userBadgeDetails.setBadgeTagsContents(tagsContentList);
					userBadgeDetails.setbadgeType(badgeDetails.getString("badgeType"));
					userBadgeDetails.setbadgeValue(Integer.parseInt(badgeDetails.getString("badgeValue")));
					userBadgeDetails.setCompanyId(userCompanyId);
					userBadgeDetails.setVideoid(videoKeysList);
					if(badgeDetails.has("canEarnedTwice"))
						userBadgeDetails.setCanEarnedTwice(badgeDetails.getString("canEarnedTwice"));
					
					if(badgeDetails.has("contentType"))
					{
						userBadgeDetails.setContentType(badgeDetails.getString("contentType"));
					}
					
					if(badgeDetails.has("maximumQuantity"))
					{
						if(badgeDetails.getString("maximumQuantity").equals("infinite"))
						{
							userBadgeDetails.setQunatity(-1);
						}
						else
						{
							userBadgeDetails.setQunatity(Integer.parseInt(badgeDetails.getString("maximumQuantity")));
						}
					}
					
					if(badgeDetails.has("badgeImageBlobkey"))
					{
						String oldBadgeImageBlobkey			= userBadgeDetails.getBadgeImageBlobkey();
						
						
						if(oldBadgeImageBlobkey != null && oldBadgeImageBlobkey.contains(":"))
						{
							String oAuthMode = lResourceBundle.getString("MODE");
							
							if("LIVE".equalsIgnoreCase(oAuthMode) || "STAGING".equalsIgnoreCase(oAuthMode))
							{
								oldBadgeImageBlobkey		= oldBadgeImageBlobkey.split(":")[1].replace(">","").trim();
								blobstoreService.delete(new BlobKey(oldBadgeImageBlobkey));
							}
						}
						
						userBadgeDetails.setBadgeImageBlobkey(badgeDetails.getString("badgeImageBlobkey"));
					}
					BadgeListDAO.saveAuctionTransactions(userBadgeDetails);
					persistenceObject.close();
					
					
				}
				else
				{
					if(arrayofTagsCreatedByAdmin != null && arrayofTagsCreatedByAdmin.length != 0)
					{
			 			for(int i = 0 ; i< arrayofTagsCreatedByAdmin.length;i++)
			 			{
			 				if(!(arrayofTagsCreatedByAdmin[i].equals("")))
							{
			 					tagsContentList.add(arrayofTagsCreatedByAdmin[i]+":"+0);
							}	
			 			}
			 			tagsContentList.add("nimdasgat");
					}
					
					BadgesList badgesListInstance				= new BadgesList();
					
					UUID uniqueKey								= UUID.randomUUID();
					
					badgesListInstance.setKey(uniqueKey.toString());
					badgesListInstance.setbadgeAssignee(badgeDetails.getString("badgeAssignee"));
					badgesListInstance.setbadgeDiscription(new Text(badgeDetails.getString("badgeDiscription")));
					badgesListInstance.setBadgeLogoPath(badgeDetails.getString("badgeLogoPath"));
					badgesListInstance.setBadgeName(badgeDetails.getString("badgeName"));
					badgesListInstance.setBadgeTagsContents(tagsContentList);
					badgesListInstance.setbadgeType(badgeDetails.getString("badgeType"));
					badgesListInstance.setbadgeValue(Integer.parseInt(badgeDetails.getString("badgeValue")));
					badgesListInstance.setCompanyId(userCompanyId);
					badgesListInstance.setcreatedDate(new Date());
					badgesListInstance.setIsFlag("enabled");
					badgesListInstance.setVideoid(videoKeysList);
					if(badgeDetails.has("canEarnedTwice"))
						badgesListInstance.setCanEarnedTwice(badgeDetails.getString("canEarnedTwice"));
					
					if(badgeDetails.has("badgeImageBlobkey"))
					{
						badgesListInstance.setBadgeImageBlobkey(badgeDetails.getString("badgeImageBlobkey"));
					}
					
					
					if(badgeDetails.has("contentType"))
					{
						badgesListInstance.setContentType(badgeDetails.getString("contentType"));
					}
					if(badgeDetails.has("maximumQuantity"))
					{
						if(badgeDetails.getString("maximumQuantity").equals("infinite"))
						{
							badgesListInstance.setQunatity(-1);
						}
						else
						{
							badgesListInstance.setQunatity(Integer.parseInt(badgeDetails.getString("maximumQuantity")));
						}
					}
					BadgeListDAO.saveAuctionTransactions(badgesListInstance);
					
					persistenceObject.close();
					
					response.setContentType("text/plain");
					response.getWriter().println(uniqueKey.toString());
				}
			}
		}
		catch(Exception e)
		{
			log.warning("Exception occured in SaveBadgeDetails");
		}
	}
	
	
	@RequestMapping("/updateAuctionImage")
	public void updateAuctionImage(HttpServletRequest request, HttpServletResponse response)
	{
		try{
			Map<String, BlobKey> blobs=blobstoreService.getUploadedBlobs(request);
			BlobKey blobKey=blobs.get("badgeLogo");

			ServletOutputStream out = response.getOutputStream();


			ImagesService imagesService = ImagesServiceFactory.getImagesService();
			if(blobKey != null){
				String imageURL = imagesService.getServingUrl(blobKey);
				
				//updateBadgeBlobPath(imageURL, blobKey.getKeyString(),request);

				request.setAttribute("badge_imageUrl", imageURL);
				response.setContentType("text/html");
				log.info(imageURL);
			}
		}

		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

	
	
	@RequestMapping("/uploadBadgeLogo.do")
	public void uploadBadgeLogo(@RequestParam(value="x1", required=false) String x1,@RequestParam(value="y1", required=false) String y1,@RequestParam(value="x2", required=false) String x2,@RequestParam(value="y2", required=false) String y2,@RequestParam(value="height", required=false) String height,@RequestParam(value="width", required=false) String width,HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		HttpSession session 						= request.getSession();
		ImagesService imagesService 				= ImagesServiceFactory.getImagesService();
		BlobKey blobKey								= null;
		
		String badgeImageUrl						= "";
		String imageUploadSessionUrl				= "";
		String badgeImageblobKey					= "";
		
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
		
		try
		{
			Map<String, List<BlobKey>> blobs		= blobstoreService.getUploads(request);
			List<BlobKey> blobKeyList				= blobs.get("badgeLogo");
			
			if(blobKeyList!=null && !(blobKeyList.isEmpty()))
			{
			/*	for(BlobKey iteratingBlobKeyList : blobKeyList)
				{
					if(iteratingBlobKeyList != null)
					{*/
						blobKey						= blobKeyList.get(0);
				/*	}
				}*/
						
						badgeImageblobKey			= blobKey.toString();
						
				if(X1 > 0 && X2 > 0 && Y1 > 0 && Y2 > 0)
				{
					Image oldimage 						= ImagesServiceFactory.makeImageFromBlob(blobKey);
			        Transform cropTransform 			= ImagesServiceFactory.makeCrop(X1, Y1, X2, Y2);
			        Image newimage 						= imagesService.applyTransform(cropTransform, oldimage);

			        FileService fileService 			= FileServiceFactory.getFileService();
			        AppEngineFile file 					= fileService.createNewBlobFile(newimage.getFormat().toString());
			        FileWriteChannel writeChannel 		= fileService.openWriteChannel(file, true);
			        	
			        writeChannel.write(ByteBuffer.wrap(newimage.getImageData()));
			        writeChannel.closeFinally();

			        BlobKey croppedblobKey 				= fileService.getBlobKey(file);
					
					
					if(croppedblobKey != null)
					{
						badgeImageUrl 					= imagesService.getServingUrl(ServingUrlOptions.Builder.withBlobKey(croppedblobKey));
						badgeImageblobKey				= croppedblobKey.toString();
						session.setAttribute("badge_imageUrl", badgeImageUrl);
						
					}
					blobstoreService.delete(blobKey);
				}
				else
				{
					badgeImageUrl 						= imagesService.getServingUrl(ServingUrlOptions.Builder.withBlobKey(blobKey));
				}
			}
			imageUploadSessionUrl				= blobstoreService.createUploadUrl("/uploadBadgeLogo.do");
			
			session.setAttribute("badgeImageUrl", badgeImageUrl);
			session.setAttribute("imageUploadSessionUrl", imageUploadSessionUrl);
			session.setAttribute("badgeImageblobKey", badgeImageblobKey);
		}

		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/getUploadedBadgeImageUrl")
	public void getUploadedBadgeImageUrl(HttpServletRequest request, HttpServletResponse response) throws IOException
	{
		HttpSession session 					= request.getSession();
		
		String badgeImageUrl					= (String) session.getAttribute("badgeImageUrl");
		String imageUploadSessionUrl			= (String) session.getAttribute("imageUploadSessionUrl");
		String badgeImageblobKey				= (String) session.getAttribute("badgeImageblobKey");
		
		
		response.setContentType("text/plain");
		response.getWriter().println(badgeImageUrl+"_ah/image.jpg"+imageUploadSessionUrl+"_ah/image.jpg"+badgeImageblobKey);
	}

	
	@RequestMapping(value = "/deleteTagFromBadge" , method = RequestMethod.POST)
	public void deleteTagFromBadge(@RequestParam(value="idOfTheTag", required=false) String idOfTheTag,@RequestParam(value="badgeIdForDeletingTag", required=false) String badgeIdForDeletingTag,HttpServletRequest request, HttpServletResponse response,HttpSession session) throws IOException
	{
		response.setContentType("text/plain");
		
		PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
		PersistenceManager persistenceObject			= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		String userEmailID								= (String)session.getAttribute("emailIdFirst");
		ArrayList<String> updationList					= new ArrayList<String>();
		String typeOfUser 								= "";
		
		Query query										= persistenceInstance.newQuery(BadgesList.class,"key == '"+badgeIdForDeletingTag+"' && companyId == '"+userCompanyId+"'");
		List<BadgesList> userBadgeDetails				= (List<BadgesList>)query.execute();
		
		Query queryUserProfile							= persistenceObject.newQuery(UserProfile.class,"userName == '"+userEmailID+"' && companyId == '"+userCompanyId+"'");
		List<UserProfile> userProfileDetails			= (List<UserProfile>)queryUserProfile.execute();
		
		for(UserProfile iteratingUserProfileDetails : userProfileDetails)
		{
			typeOfUser = iteratingUserProfileDetails.getType();
		}
		
		for(BadgesList iteratingBadgeDetails : userBadgeDetails)
		{
			if(iteratingBadgeDetails.getBadgeTagsContents() != null && !(typeOfUser.equals("")))
			{
				if( typeOfUser.equalsIgnoreCase("Company") || typeOfUser.equalsIgnoreCase("Admin"))
				{
					updationList = iteratingBadgeDetails.getBadgeTagsContents();
					
					for(String iterateList : updationList)
					{
						if(iterateList.split(":")[0].equals(idOfTheTag))
						{
							updationList.remove(iterateList);
						}
					}
					
					iteratingBadgeDetails.setBadgeTagsContents(updationList);
					
					persistenceInstance.currentTransaction().begin();
					persistenceInstance.makePersistent(iteratingBadgeDetails);
					persistenceInstance.currentTransaction().commit();
					
					response.getWriter().print("successfully deleted by admin");
				}
				else if(typeOfUser.equalsIgnoreCase("user"))
				{
					for(String iterateTagContents : iteratingBadgeDetails.getBadgeTagsContents())
					{
						if(iterateTagContents.split(":")[0].equals(idOfTheTag) )
						{
							if(iteratingBadgeDetails.getBadgeTagsContents().indexOf(iterateTagContents) > iteratingBadgeDetails.getBadgeTagsContents().indexOf("nimdasgat"))
							{
								updationList = iteratingBadgeDetails.getBadgeTagsContents();
								
								for(String iterateList : updationList)
								{
									if(iterateList.split(":")[0].equals(idOfTheTag))
									{
										updationList.remove(iterateList);
									}
								}
								
								iteratingBadgeDetails.setBadgeTagsContents(updationList);
								
								persistenceInstance.currentTransaction().begin();
								persistenceInstance.makePersistent(iteratingBadgeDetails);
								persistenceInstance.currentTransaction().commit();
								
								response.getWriter().print("successfully deleted by user");
							}
						}
					}
				}
				else
				{
					response.getWriter().print("couldn't delete");
				}
			}
			else
			{
				response.getWriter().print("couldn't delete");
			}
		}
	}
	
	@RequestMapping(value = "/addTagForBadge" , method = RequestMethod.POST)
	public void addTagForBadge(@RequestParam(value="idOfTheTag", required=false) String idOfTheTag,@RequestParam(value="badgeIdForAddingTag", required=false) String badgeIdForAddingTag,HttpServletRequest request, HttpServletResponse response,HttpSession session) throws IOException
	{
		response.setContentType("text/plain");
		
		PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
		PersistenceManager persistenceObject			= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		String userEmailID								= (String)session.getAttribute("emailIdFirst");
		ArrayList<String> updationList					= new ArrayList<String>();
		String typeOfUser 								= "";
		
		Query query										= persistenceInstance.newQuery(BadgesList.class,"key == '"+badgeIdForAddingTag+"' && companyId == '"+userCompanyId+"'");
		List<BadgesList> userBadgeDetails				= (List<BadgesList>)query.execute();
		
		Query queryUserProfile							= persistenceObject.newQuery(UserProfile.class,"userName == '"+userEmailID+"' && companyId == '"+userCompanyId+"'");
		List<UserProfile> userProfileDetails			= (List<UserProfile>)queryUserProfile.execute();
		
		for(UserProfile iteratingUserProfileDetails : userProfileDetails)
		{
			typeOfUser = iteratingUserProfileDetails.getType();
		}
		
		for(BadgesList iteratingBadgeDetails : userBadgeDetails)
		{
			if(iteratingBadgeDetails.getBadgeTagsContents() != null && !(typeOfUser.equals("")))
			{
				if( typeOfUser.equalsIgnoreCase("Company") || typeOfUser.equalsIgnoreCase("Admin"))
				{
					updationList = iteratingBadgeDetails.getBadgeTagsContents();
					
					if(iteratingBadgeDetails.getBadgeTagsContents().contains("nimdasgat") )
					{
						updationList.add(0,idOfTheTag+":"+0);
					}
					else
					{
						updationList.add(0,idOfTheTag+":"+0);
						updationList.add(1,"nimdasgat");
					}
					
					iteratingBadgeDetails.setBadgeTagsContents(updationList);
					
					persistenceInstance.currentTransaction().begin();
					persistenceInstance.makePersistent(iteratingBadgeDetails);
					persistenceInstance.currentTransaction().commit();
					
				}
				else if(typeOfUser.equalsIgnoreCase("user"))
				{
					updationList = iteratingBadgeDetails.getBadgeTagsContents();
					
					if( iteratingBadgeDetails.getBadgeTagsContents().contains("nimdasgat") && iteratingBadgeDetails.getBadgeTagsContents().contains("resusgat") )
					{
						updationList.add(iteratingBadgeDetails.getBadgeTagsContents().indexOf("nimdasgat")+1,idOfTheTag+":"+0);
					}
					else if( !(iteratingBadgeDetails.getBadgeTagsContents().contains("nimdasgat")) && iteratingBadgeDetails.getBadgeTagsContents().contains("resusgat") )
					{
						updationList.add(0,idOfTheTag+":"+0);
					}
					else
					{
						updationList.add(idOfTheTag+":"+0);
						updationList.add("resusgat");
					}
					
					iteratingBadgeDetails.setBadgeTagsContents(updationList);
					
					persistenceInstance.currentTransaction().begin();
					persistenceInstance.makePersistent(iteratingBadgeDetails);
					persistenceInstance.currentTransaction().commit();
					
				}
			}
		}
	}
	
	@RequestMapping(value = "/increamentTagRatingByOne" , method = RequestMethod.GET)
	public void increamentTagRatingByOne(@RequestParam(value="idOfTheTag", required=false) String idOfTheTag,@RequestParam(value="badgeIdForEditingTagRating", required=false) String badgeIdForEditingTagRating,HttpServletRequest request, HttpServletResponse response,HttpSession session) throws IOException
	{
		response.setContentType("text/plain");
		
		PersistenceManager persistenceObject			= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		ArrayList<String> tagContents					= new ArrayList<String>();
		int increamentRating 							= 0;
		int indexOfCurrentTag							= 0;
		
		Query query										= persistenceObject.newQuery(BadgesList.class,"key == '"+badgeIdForEditingTagRating+"' && companyId == '"+userCompanyId+"'");
		List<BadgesList> userBadgeDetails				= (List<BadgesList>)query.execute();
		
		for(BadgesList iteratingBadgeDetails : userBadgeDetails)
		{
			tagContents = iteratingBadgeDetails.getBadgeTagsContents();
			
			for(String iteratingTagContents : tagContents)
			{
				if(iteratingTagContents != null && iteratingTagContents.contains(idOfTheTag+":"))
				{
					increamentRating 					= Integer.parseInt(iteratingTagContents.split(":")[1]);
					indexOfCurrentTag					= tagContents.indexOf(iteratingTagContents);
				}
			}
			
			increamentRating 							+= 1;
			tagContents.set(indexOfCurrentTag, idOfTheTag+":"+increamentRating);
			
			iteratingBadgeDetails.setBadgeTagsContents(tagContents);
			
			persistenceObject.currentTransaction().begin();
			persistenceObject.makePersistent(iteratingBadgeDetails);
			persistenceObject.currentTransaction().commit();
		}
	}
	
	/*@RequestMapping(value="/updateVideoId", method=RequestMethod.GET)
	public void updateVideoId(HttpServletRequest request, HttpServletResponse response)throws IOException
	{
		ArrayList<String> videoID       						= new ArrayList<String>();
		PersistenceManager pm        							= PMF.get().getPersistenceManager();
		
		try
		{
			Query badgesQuery        							= pm.newQuery(BadgesList.class);
			List<BadgesList> badgesList      					= (List<BadgesList>)badgesQuery.execute();
		   
			if(!(badgesList.isEmpty()) && badgesList != null && badgesList.size()>0)
			{
				for(BadgesList badgeDetails : badgesList)
				{
					if(badgeDetails.getVideoid() != null && !(badgeDetails.getVideoid().isEmpty()))
					{
						for(String iteratingVideoIDArray : badgeDetails.getVideoid())
						{
							videoID.add(iteratingVideoIDArray+":not started");
						}
						Query statusQuery      					= pm.newQuery(UserStatusDetails.class,"stuffid == '"+badgeDetails.getKey()+"' && status == 'working on'");
						List<UserStatusDetails> statusList  	= (List<UserStatusDetails>)statusQuery.execute();
						if(statusList.size()>0)
						{
							for(UserStatusDetails statusDetails : statusList)
							{
								if(statusDetails.getStatus().equalsIgnoreCase("working on"))
								{
									if(statusDetails.getVideostatus() != videoID)
									{
										statusDetails.setVideostatus(videoID);
		          
									}
								}
		        
						        pm.currentTransaction().begin();
						        pm.makePersistent(statusDetails);
						        pm.currentTransaction().commit();
							}
						}
		      
						if(!(videoID.isEmpty()))
						{
							videoID.clear();
						}
					}
				}
		   }
			
		   pm.close();
		   
		}
		catch(Exception e)
		{
			 e.printStackTrace();
		}
	}*/
	
	/*@RequestMapping(value="changeBadgeId", method=RequestMethod.GET)
	public void changeBadgeId(HttpServletRequest request, HttpServletResponse response)
	{
		try
		{
			PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
			Query query										= persistenceInstance.newQuery(UserBadgeLogJdo.class,"companyId == 'a2d982da-2253-471c-ade8-f409f69d4416'");
			List<UserBadgeLogJdo> 		badgeInfo			= (List<UserBadgeLogJdo> )query.execute();
			for(UserBadgeLogJdo badgeList:badgeInfo)
			{
				if(badgeList.getBadgesWorkingOn().contains("63344a6f-1f63-469b-b4f5-93d43f9d0ce0"))
				{
					ArrayList<String>  previousEntry = badgeList.getBadgesWorkingOn();
					previousEntry.remove("63344a6f-1f63-469b-b4f5-93d43f9d0ce0");
					previousEntry.add("6a81a7f0-9b53-4e5f-9823-26701671491f");
					badgeList.setBadgesWorkingOn(previousEntry);
					persistenceInstance.currentTransaction().begin();
					persistenceInstance.makePersistent(badgeList);
					persistenceInstance.currentTransaction().commit();
				}
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}*/
	
	/*@RequestMapping(value="/updateBadgeVCTraining", method=RequestMethod.GET)
	public void updateVideoId(HttpServletRequest request, HttpServletResponse response,HttpSession session)throws IOException
	{
		PersistenceManager persistenceObject			= PMF.get().getPersistenceManager();
		PersistenceManager persistenceInstance			= PMF.get().getPersistenceManager();
		String userCompanyId							= (String)session.getAttribute("companyKey");
		
		
		BadgesList badgeInfo							= persistenceObject.getObjectById(BadgesList.class,"63344a6f-1f63-469b-b4f5-93d43f9d0ce0");
		badgeInfo.setVideoid(null);
		persistenceObject.makePersistent(badgeInfo);
		
		
		Query query										= persistenceInstance.newQuery(UserStatusDetails.class,"stuffid == '63344a6f-1f63-469b-b4f5-93d43f9d0ce0' && companyId == '"+userCompanyId+"'");
		List<UserStatusDetails> userStatusDetails		= (List<UserStatusDetails>)query.execute();
		
		if(!(userStatusDetails.isEmpty()) && userStatusDetails.size() > 0 && userStatusDetails != null)
		{
			for(UserStatusDetails iteratingUserStatus : userStatusDetails)
			{
				iteratingUserStatus.setVideostatus(null);
				
				persistenceInstance.currentTransaction().begin();
				persistenceInstance.makePersistent(iteratingUserStatus);
				persistenceInstance.currentTransaction().commit();
			}
		}
		
		persistenceObject.close();
		persistenceInstance.close();
	}*/
	
	@RequestMapping(value="/saveBadgeDetailsAPI", method=RequestMethod.POST)
	protected @ResponseBody Map<String, Object> saveBadgeDetailsAPI(@RequestParam(value="badgeObject", required=false) String badgeObject,@RequestParam(value="videoListObject", required=false) String videoListObject,@RequestParam(value="arrayofTagsCreatedByAdmin[]", required=false) String[] arrayofTagsCreatedByAdmin,@RequestParam(value="arrayofTagsCreatedByUser[]", required=false) String[] arrayofTagsCreatedByUser, HttpServletRequest request,HttpServletResponse response,HttpSession session) throws IOException, JSONException 
	{
		String userCompanyId									= (String)session.getAttribute("companyKey");
		
		ArrayList<String> tagsContentList 						= new ArrayList<String>();
		ArrayList<String> tagsList								= new ArrayList<String>();
		ArrayList<String> temporaryList							= new ArrayList<String>();
		
		ArrayList<String> videoKeysList							= new ArrayList<String>();
		ArrayList<String> oldVideoKeys							= new ArrayList<String>();
		ArrayList<String> newVideoKeys							= new ArrayList<String>();
		
		PersistenceManager persistenceObject					= PMF.get().getPersistenceManager();
		PersistenceManager editVideoDetailsPMF					= PMF.get().getPersistenceManager();
		boolean status = false;
		Map<String, Object> map = new HashMap<String, Object>();
		BadgesList persistedBadgesList= null;
		videodetails persistedVideoDetails = null;
		/*ObjectMapper mapper = new ObjectMapper();
		String badgeObject = "", videoListObject = "";
		String[] arrayofTagsCreatedByAdmin = null,arrayofTagsCreatedByUser = null;*/ 

		
		try
		{
			
			//badgeObject = mapper.readValue(json, String.class);
		
			if(videoListObject != null && !(videoListObject.equals("{}")))
			{
				PersistenceManager videoDetailsPMF					= PMF.get().getPersistenceManager();
				JSONObject videoList								= new JSONObject(videoListObject);
				Iterator<?> keys 									= videoList.keys();
				
				while( keys.hasNext() )
				{
					log.warning("inside while loop");
		            String key										= (String)keys.next();
		            if( videoList.get(key) instanceof JSONObject)
		            {
		            	JSONObject videoObject						= videoList.getJSONObject(key);
		            	
						if(videoObject.has("videoType"))
						{
							videodetails videoDetailsInstance			= new videodetails();
							
							videoDetailsInstance.setKey(UUID.randomUUID().toString());
							videoDetailsInstance.setCompanyId(userCompanyId);
							videoDetailsInstance.setViddesc(new Text(videoObject.getString("viddesc")));
							videoDetailsInstance.setVideoId(key);
							videoDetailsInstance.setVideothumbnail(videoObject.getString("videothumbnail"));
							videoDetailsInstance.setVideourl(videoObject.getString("Videourl"));
							videoDetailsInstance.setVidtitle(videoObject.getString("vidtitle"));
							
							persistedVideoDetails = videodetailsDAO.savevideodetails(videoDetailsInstance);
							map.put("videolist", persistedVideoDetails);
							
							videoKeysList.add(videoDetailsInstance.getKey());
							newVideoKeys.add(videoDetailsInstance.getKey());
						}
		            }
			    }
				editVideoDetailsPMF.close();
			}

			if(badgeObject != null && !(badgeObject.equals("{}")))
			{
				log.warning("inside badge object");
				JSONObject	badgeDetails								= new JSONObject(badgeObject);
				
					if(arrayofTagsCreatedByAdmin != null && arrayofTagsCreatedByAdmin.length != 0)
					{
			 			for(int i = 0 ; i< arrayofTagsCreatedByAdmin.length;i++)
			 			{
			 				if(!(arrayofTagsCreatedByAdmin[i].equals("")))
							{
			 					tagsContentList.add(arrayofTagsCreatedByAdmin[i]+":"+0);
							}	
			 			}
			 			tagsContentList.add("nimdasgat");
					}
					
					BadgesList badgesListInstance				= new BadgesList();
					
					UUID uniqueKey								= UUID.randomUUID();
					
					badgesListInstance.setKey(uniqueKey.toString());
					//badgesListInstance.setbadgeAssignee(badgeDetails.getString("badgeAssignee"));
					badgesListInstance.setbadgeAssignee("4c1c01b1-54d1-4968-a730-bca67e1e15bb");
					badgesListInstance.setbadgeDiscription(new Text(badgeDetails.getString("badgeDiscription")));
					//badgesListInstance.setBadgeLogoPath(badgeDetails.getString("badgeLogoPath"));
					badgesListInstance.setBadgeLogoPath("http://127.0.0.1:8888/_ah/img/sIA7jiMiQNlF6NacYZiNtA");
					badgesListInstance.setBadgeName(badgeDetails.getString("badgeName"));
					badgesListInstance.setBadgeTagsContents(tagsContentList);
					badgesListInstance.setbadgeType(badgeDetails.getString("badgeType"));
					badgesListInstance.setbadgeValue(Integer.parseInt(badgeDetails.getString("badgeValue")));
					//badgesListInstance.setCompanyId(userCompanyId);
					badgesListInstance.setCompanyId("4c1c01b1-54d1-4968-a730-bca67e1e15bb");
					badgesListInstance.setcreatedDate(new Date());
					badgesListInstance.setIsFlag("enabled");
					badgesListInstance.setVideoid(videoKeysList);
					if(badgeDetails.has("canEarnedTwice"))
						badgesListInstance.setCanEarnedTwice(badgeDetails.getString("canEarnedTwice"));
					else//
						badgesListInstance.setCanEarnedTwice("true");
					/*if(badgeDetails.has("badgeImageBlobkey"))
					{
						badgesListInstance.setBadgeImageBlobkey(badgeDetails.getString("badgeImageBlobkey"));
					}*/
					badgesListInstance.setBadgeImageBlobkey("sIA7jiMiQNlF6NacYZiNtA");
					
					if(badgeDetails.has("contentType"))
					{
						badgesListInstance.setContentType(badgeDetails.getString("contentType"));
					}
					else//
						badgesListInstance.setContentType("true");
					
					if(badgeDetails.has("maximumQuantity"))
					{
						if(badgeDetails.getString("maximumQuantity").equals("infinite"))
						{
							badgesListInstance.setQunatity(-1);
						}
						else
						{
							badgesListInstance.setQunatity(Integer.parseInt(badgeDetails.getString("maximumQuantity")));
						}
					}
					log.warning("persisting");
					persistedBadgesList = BadgeListDAO.saveAuctionTransactions(badgesListInstance);
					
					persistenceObject.close();
					map.put("BadgesList", persistedBadgesList);
					
					//response.setContentType("text/plain");
					//response.getWriter().println(uniqueKey.toString());
			}
			status = true;
		}
		catch(Exception e)
		{
			log.warning("Exception occured in SaveBadgeDetails");
			e.printStackTrace();
		}
		finally{
			map.put("success", status);
		}
		
		return map;
	}
}
