package com.acti.controller;

import static com.google.appengine.api.taskqueue.TaskOptions.Builder.withUrl;

import javax.servlet.http.HttpServlet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.acti.jdo.AuctionList;
import com.acti.jdo.AuctionParticipants;
import com.acti.jdo.AuctionTransactions;
import com.acti.jdo.PMF;
import com.acti.jdo.UserBadgeLogJdo;
import com.acti.jdo.UserProfile;
import com.adaptive.business.dao.AuctionListDAO;
import com.adaptive.business.dao.AuctionParticipantsDAO;
import com.adaptive.business.dao.AuctionTransactionsDAO;
import com.adaptive.business.service.AddNewStuffServiceMethod;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.channel.ChannelFailureException;
import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.datastore.Text;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.taskqueue.TaskOptions.Method;

import org.springframework.stereotype.Controller;
@Controller
public class AddNewStuffPageController  extends HttpServlet
{
	private static final Logger log = Logger.getLogger(AddNewStuffPageController.class.getName());
	 private static ChannelService channelService = ChannelServiceFactory.getChannelService();
	@RequestMapping("/addstuff")
	public String  addstuff(HttpServletRequest request, HttpServletResponse response , HttpSession session ) throws JsonGenerationException, JsonMappingException, IOException
	{
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
		AddNewStuffServiceMethod.addStuffDetails(company_Id,request);
		


		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);
		return "addstuff";

	}
	
	@RequestMapping("/uploadAuctionImage")
	public void uploadAuctionImage(HttpServletRequest request, HttpServletResponse response)
	{
		 BlobstoreService blobstoreService=BlobstoreServiceFactory.getBlobstoreService();
		try
		{
			Map<String, BlobKey> blobs=blobstoreService.getUploadedBlobs(request);
			BlobKey blobKey=blobs.get("badgeLogo");
			ImagesService imagesService = ImagesServiceFactory.getImagesService();
			if(blobKey != null)
			{
				String imageURL = imagesService.getServingUrl(blobKey);
				response.setContentType("text/html");
				response.getWriter().println(imageURL);
			}
		}

		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/saveAuctionsDetails")
	public void addNewEntryToAuctionList(@RequestParam(value="auction_details[]", required=false) String[] auction_details,HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		String company_Id=(String)session.getAttribute("companyKey");
		String auctionName 			= 	auction_details[1];
		String auctionAssignee		=	auction_details[0];
		String auctionMintues 		=   auction_details[4];
		String auctionStartPoints 	= 	auction_details[2];
		Text auctionDescription		=	new Text(auction_details[3]);
		String auctionImageId		=   auction_details[5];
		String existauctionKey			= 	"";
		
		if(auction_details.length >= 7)
		{
			existauctionKey			=  auction_details[6];
		}
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		
		try
		{
			if(existauctionKey.equals(""))
			{
				
					AuctionList aList = new AuctionList();
					UUID auctionKey = UUID.randomUUID(); 
					aList.setKey(auctionKey.toString());
					aList.setAuctionImgId(auctionImageId);
					aList.setAuctionName(auctionName);
					aList.setCompanyId(company_Id);
					aList.setAuctionAssignee(auctionAssignee);
					aList.setAuctionMins(auctionMintues);
					aList.setAuctionMaxPoints(auctionStartPoints);
					aList.setAuctionDescription(auctionDescription);
					AuctionListDAO.saveAuctionList(aList);
					response.setContentType("text/html");
					response.getWriter().println(auctionKey.toString());
				
			}
			else
			{
				AuctionList auctionList			= pm.getObjectById(AuctionList.class,existauctionKey);
				
				auctionList.setAuctionImgId(auctionImageId);
				auctionList.setAuctionName(auctionName);
				auctionList.setAuctionMins(auctionMintues);
				auctionList.setAuctionMaxPoints(auctionStartPoints);
				auctionList.setAuctionDescription(auctionDescription);
				AuctionListDAO.saveAuctionList(auctionList);
			}
		}
		catch (Exception e) 
		{
			log.warning("Exception in Save Auction Details");
		}
		finally
		{
			pm.close();
		}
	}
	
	
	@RequestMapping(value="/getServerTime", method = RequestMethod.GET)
	public void getServerTime(HttpServletRequest request, HttpServletResponse response,HttpSession session) 
	{
		try 
			{
			Date currentDate = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss aa");
			dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
			dateFormat.format(currentDate);
			long longStartTime = currentDate.getTime();
			response.setContentType("html/text");
			response.getWriter().print(longStartTime);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/updateStartTime")
	public void updateStartTime(@RequestParam(value="auctionId", required=false) String auctionId,HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try
		{
			AuctionList aList = pm.getObjectById(AuctionList.class,auctionId.trim());
			Date currentDate = new Date();
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss aa");
			dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
			dateFormat.format(currentDate);
			currentDate = (Date)dateFormat.parse(dateFormat.format(currentDate)); 
			long longStartTime = currentDate.getTime();
			aList.setAuctionStartTime(longStartTime);
			long longEndTime = longStartTime + (Integer.parseInt(aList.getAuctionMins()) * 60000);
			aList.setAuctionEndTime(longEndTime);
			aList.setAuctionStartDate(dateFormat.format(currentDate));
			
			pm.currentTransaction().begin();
			pm.makePersistent(aList);
			pm.currentTransaction().commit();
			ObjectMapper objMapper=new ObjectMapper();
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			objMapper.writeValueAsString(aList);
			
			try
			{
				com.google.appengine.api.taskqueue.Queue queue = QueueFactory.getQueue( "checkEndTime" );
				queue.add( withUrl( "/deductPointsForTheMaximumBidder" ).method( Method.GET ).etaMillis(longEndTime).param("auctionId",auctionId.trim()));
			}
			catch ( Exception e )
			{
				e.printStackTrace();
			}
			
			
			response.setContentType("text/html");
			response.getWriter().print(objMapper.writeValueAsString(aList));
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/deductPointsForTheMaximumBidder")
	public void deductPoints(HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try
		{
			HashMap<String,UserBadgeLogJdo> sendMessageToWinnerMap = new HashMap<String,UserBadgeLogJdo>();
			Integer highestBid = 0;
			String userId = "";
			String auctionId = request.getParameter("auctionId");
			log.info("request.getAttribute(auctionId) ::"+request.getParameter("auctionId"));
			Query auctionTransactions = pm.newQuery(AuctionTransactions.class,"	auctionId == '"+request.getParameter("auctionId")+"'");
			List<AuctionTransactions> auctionTrans = (List<AuctionTransactions>)auctionTransactions.execute();
			log.info("size ::"+auctionTrans.size());
			for(AuctionTransactions auctionInfo:auctionTrans)
			{
				log.info("auctionInfo.getBidPoints() ::"+auctionInfo.getBidPoints());
				if(highestBid < auctionInfo.getBidPoints())
				{
					highestBid  = auctionInfo.getBidPoints();
					userId 		= auctionInfo.getUserId();
				}
				
			}
			
			log.info("Points to be detected for "+userId+ " highest is ::"+highestBid);
			UserBadgeLogJdo winnerUserInfo = new UserBadgeLogJdo();
			if(! ("".equalsIgnoreCase(userId)))
			{
				Query getUserByMaxPoints = pm.newQuery(UserBadgeLogJdo.class,"	userId == '"+userId+"'");
				List<UserBadgeLogJdo>	userBadgeLogInfo = (List<UserBadgeLogJdo> )getUserByMaxPoints.execute();
				for(UserBadgeLogJdo userInfo:userBadgeLogInfo)
				{
					Integer points = userInfo.getPoints();
					points 	=	points - highestBid;
					userInfo.setPoints(points);
					ArrayList<String> previousAuctionId = userInfo.getAuctionId();
					previousAuctionId.add(auctionId);
					userInfo.setAuctionId(previousAuctionId);
					pm.currentTransaction().begin();
					pm.makePersistent(userInfo);
					pm.currentTransaction().commit();
					winnerUserInfo = userInfo;
				}
				
			}
			
			sendMessageToWinnerMap.put("winnerUserInfo", winnerUserInfo);
			ObjectMapper objMapper=new ObjectMapper();
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			
			for(AuctionTransactions auctionInfo:auctionTrans)
			{
				sendMessageToChannel(auctionInfo.getUserId(),objMapper.writeValueAsString(sendMessageToWinnerMap));
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	@RequestMapping("/removeUserKey")
	public void removeUserKey(@RequestParam(value="userKey", required=false) String userKey,HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			Query auctionParticipants =pm.newQuery(AuctionParticipants.class,"userId == '"+userKey+"'");
			  List<AuctionParticipants> auctionTrans = (List<AuctionParticipants>)auctionParticipants.execute();
			  for(AuctionParticipants auctionDeleteInfo:auctionTrans)
			  {
				  pm.deletePersistent(auctionDeleteInfo);
			  }
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			pm.close();
		}
	}
	
	@RequestMapping("/addAuctionEntry")
	public void addAuctionEntry(@RequestParam(value="auctionKey", required=false) String auctionKey,@RequestParam(value="auctionId", required=false) String auctionId,@RequestParam(value="userKey", required=false) String userKey,@RequestParam(value="bidPoints", required=false) String bidPoints,HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try 
		{
			boolean highestBid = true;
			AuctionTransactions aTrans = new AuctionTransactions();
			Query auctionTransactions =pm.newQuery(AuctionTransactions.class,"	auctionId == '"+auctionId+"'");
			List<AuctionTransactions> auctionTrans = (List<AuctionTransactions>)auctionTransactions.execute();
			for(AuctionTransactions auctionInfo:auctionTrans)
			{
				log.info("bidPoints ::"+bidPoints + " auctionInfo.getBidPoints() ::"+auctionInfo.getBidPoints());
				if(Integer.parseInt(bidPoints) <= auctionInfo.getBidPoints())
				{
					highestBid = false;
					response.setContentType("text/html");
					response.getWriter().println("Failure");
					break;
				}
			}
			log.info("highestBid ::"+highestBid);
			if(highestBid)
			{
				
				pm = PMF.get().getPersistenceManager();
				Query previousAuctionTransactions =pm.newQuery(AuctionTransactions.class,"	auctionId == '"+auctionId+"' && userId == '"+userKey+"'"); 
				List<AuctionTransactions> previousTransactionByUser = (List<AuctionTransactions>)previousAuctionTransactions.execute();
				if(previousTransactionByUser.size() > 0)
				{
					for(AuctionTransactions auctionInfo:previousTransactionByUser)
					{
						Integer previousBid = auctionInfo.getBidPoints();
						log.info("After setting the bidpoints ::"+auctionInfo.getPreviousBids());
						Map<Integer, Long> listPreviousBid = new HashMap<Integer, Long>();
						listPreviousBid.putAll(auctionInfo.getPreviousBids());
						listPreviousBid.put(previousBid,auctionInfo.getRequestedTime());
						auctionInfo.setPreviousBids(listPreviousBid);
						log.info("After setting the bidpoints ::"+auctionInfo);
						auctionInfo.setBidPoints(Integer.parseInt(bidPoints));
						
						Date currentDate = new Date();
						SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss aa");
						dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
						dateFormat.format(currentDate);
						currentDate = (Date)dateFormat.parse(dateFormat.format(currentDate));
						long longStartTime = currentDate.getTime();
						auctionInfo.setRequestedTime(longStartTime);
						
						pm.currentTransaction().begin();
						pm.makePersistent(auctionInfo);
						pm.currentTransaction().commit();
						aTrans = auctionInfo;
					}
				}
				else
				{
					aTrans.setAuctionId(auctionId);
					aTrans.setUserId(userKey);
					aTrans.setCompanyKey((String)session.getAttribute("companyKey"));
					aTrans.setBidPoints(Integer.parseInt(bidPoints));
					Map<Integer, Long> listPreviousBid = new HashMap<Integer, Long>();
					
					//UUID key = UUID.randomUUID();
					aTrans.setKey(auctionKey);
					Date currentDate = new Date();
					SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MMM-dd hh:mm:ss aa");
					dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"));
					dateFormat.format(currentDate);
					currentDate = (Date)dateFormat.parse(dateFormat.format(currentDate));
					long longStartTime = currentDate.getTime();
					aTrans.setRequestedTime(longStartTime);
					listPreviousBid.put(Integer.parseInt(bidPoints),longStartTime);
					aTrans.setPreviousBids(listPreviousBid);
					AuctionTransactionsDAO.saveAuctionTransactions(aTrans);
				}
				sendMessageToAllUsers( aTrans,request,response,session);
				response.setContentType("text/html");
				response.getWriter().println("Success");
			}
		} 
		catch(Exception e)
		{
			e.printStackTrace();
		}
		  
		
	}
	
	private void sendMessageToAllUsers(AuctionTransactions newAuctionEntry,HttpServletRequest request,HttpServletResponse response, HttpSession session) 
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		HashMap<String,AuctionTransactions> newAuctionEntryMap = new HashMap<String,AuctionTransactions>();
		try
		{
			Query auctionTransactions =pm.newQuery(AuctionParticipants.class,"auctionId == '"+newAuctionEntry.getAuctionId()+"'");
			List<AuctionParticipants> auctionTrans = (List<AuctionParticipants>)auctionTransactions.execute();
			newAuctionEntryMap.put("newAuctionEntryMap", newAuctionEntry);
			ObjectMapper objMapper=new ObjectMapper();
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			
			for(AuctionParticipants auctionInfo:auctionTrans)
			{
				sendMessageToChannel(auctionInfo.getUserId(),objMapper.writeValueAsString(newAuctionEntryMap));
			}
			//log.info("existingUsersForAuctionId ::"+existingUsersForAuctionId.toString());
				
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
	}
//	private void sendMessageToWinner(String userId,String userBadgeLogMap)
//	{
//		try
//		{
//				sendMessageToChannel(userId,userBadgeLogMap);
//		}
//		catch(Exception e)
//		{
//			e.printStackTrace();
//		}
//	}


	@RequestMapping("/requestToken")
	public void requestToken(@RequestParam(value="userKey", required=false) String userId,@RequestParam(value="auctionId", required=false) String auctionId,HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		try 
		{
		 if (userId != null && !("".equals(userId))) 
		 	{
			  PersistenceManager pm = PMF.get().getPersistenceManager();
			  Query auctionParticipants =pm.newQuery(AuctionParticipants.class,"auctionId == '"+auctionId+"'");
			  List<AuctionParticipants> auctionTrans = (List<AuctionParticipants>)auctionParticipants.execute();
			  boolean auctionEntry = true;
			  if(auctionTrans.size() > 0)
			  for(AuctionParticipants auctionTranInfo:auctionTrans)
			  {
				  if(auctionTranInfo.getUserId().equals(userId))
					  auctionEntry = false;
			  }
			  if(auctionEntry)
			  {
				  AuctionParticipants auctionentry = new AuctionParticipants();
				  UUID key = UUID.randomUUID();
				  auctionentry.setKey(key.toString());
				  auctionentry.setAuctionId(auctionId);
				  auctionentry.setUserId(userId);
				  AuctionParticipantsDAO.saveAuctionParticipants(auctionentry);
			      String token = createChannel(userId);
			      response.setContentType("text/xml");
				  response.getWriter().println(token);
			  }
			  else
			  {
				 String token = createChannel(userId);
				 response.setContentType("text/xml");
				 response.getWriter().println(token);
			  }
			} 
		}
		catch (IOException e) {
			e.printStackTrace();
		    }
	}
	
	@RequestMapping("/getPreviousAuction")
	public void displayPreviousAuctionEntries(@RequestParam(value="auctionId") String auctionId,HttpServletRequest request, HttpServletResponse response, HttpSession session)
	{
		PersistenceManager pm = PMF.get().getPersistenceManager();
		HashMap<String,AuctionTransactions> auctionMapByAuctionId = new HashMap<String,AuctionTransactions>();
		try
		{
			Query auctionTransactions =pm.newQuery(AuctionTransactions.class,"	auctionId == '"+auctionId+"'");
			auctionTransactions.setOrdering("requestedTime DESC");
			List<AuctionTransactions> auctionTrans = (List<AuctionTransactions>)auctionTransactions.execute();
			for(AuctionTransactions auctionInfo:auctionTrans)
			{
				log.info(auctionInfo.getPreviousBids()+"");
				auctionMapByAuctionId.put( auctionInfo.getKey(),auctionInfo);
			}
			
			ObjectMapper objMapper=new ObjectMapper();
			objMapper.configure( JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES , true );
			objMapper.configure( DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES , false );
			objMapper.writeValueAsString(auctionMapByAuctionId);
			response.setContentType("text/html");
			response.getWriter().print(objMapper.writeValueAsString(auctionMapByAuctionId));
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	public void sendMessageToChannel(String user,String message) throws ChannelFailureException{
	  	channelService.sendMessage(new ChannelMessage(user, message));
	  }
	
	 public String createChannel(String userId){
		    try
		    {
		      return channelService.createChannel(userId);
		    } catch(ChannelFailureException channelFailureException){
		      return null;
		    } catch(Exception otherException){
		      return null;
		    }
		  }
	
}
