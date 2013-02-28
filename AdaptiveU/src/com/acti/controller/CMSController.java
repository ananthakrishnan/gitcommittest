package com.acti.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.mortbay.util.ajax.JSON;

import com.acti.jdo.UserProfile;

public class CMSController 
{
	private static final Logger log = Logger.getLogger(CMSController.class.getName());
	ResourceBundle lResourceBundle 					= ResourceBundle.getBundle("ApplicationResources");
	String adaptiveYouAPIKey 						= "";
	String cms_url					 				= "";
	
	public CMSController() 
	{
		String cms_pointing_mode					= lResourceBundle.getString("MODE");
		
		if("LIVE".equalsIgnoreCase(cms_pointing_mode))
		{
			cms_url 								= lResourceBundle.getString("live_cms_url").trim();
			adaptiveYouAPIKey 						= lResourceBundle.getString("live_cms_uniquepin").trim();
		}
		else if("STAGING".equalsIgnoreCase(cms_pointing_mode) || "LOCAL".equalsIgnoreCase(cms_pointing_mode))
		{
			cms_url 								= lResourceBundle.getString("staging_cms_url").trim();
			adaptiveYouAPIKey 						= lResourceBundle.getString("staging_cms_uniquepin").trim();
		}
	}
	
	
	
	
	public String insertCompanyToCMS(UserProfile userProfile) throws JSONException
	{
		JSONObject cmsData 							= new JSONObject();
		
		try 
		{
			Map <String, Object> dataToCRM = new LinkedHashMap <String, Object> ();
			dataToCRM.put("name",  userProfile.getFirstName() + " " + userProfile.getLastName());
			dataToCRM.put("companyname", userProfile.getcompanyName());
			dataToCRM.put("login", userProfile.getuserName());
			dataToCRM.put("password","");
			dataToCRM.put("type", userProfile.getType());
			
			JSONObject crmReqData = new JSONObject(dataToCRM);
			log.info("request data is" +crmReqData.toString());
			
			InputStream output           = sendRequest(cms_url+"/services/data/v1.0/objects/Contact/?apikey="+adaptiveYouAPIKey, "POST", crmReqData);
			BufferedReader br            = new BufferedReader(new InputStreamReader(output));
			String temp                  = null;
			String responseString        = "";
			
			
			
			
				while((temp=br.readLine())!=null) {
					responseString += temp;
				}
				log.info("After receiving response "+responseString);
				
				if(!(responseString.equals("")))
				{
					  
					JSONObject jsonData 		= new JSONObject(responseString);
					
					if(jsonData.getJSONArray("contacts") != null)
					{
						JSONArray contactsArray =jsonData.getJSONArray("contacts");
						for(int i=0;i<contactsArray.length();i++)
						{
							JSONObject jsonContact = contactsArray.getJSONObject(i);
							log.info("Contact ::"+jsonContact.getJSONArray("listPeople"));
							JSONArray jsonListPeopleArray = jsonContact.getJSONArray("listPeople");
							log.info("listPeople ::"+jsonListPeopleArray.toString());
							for(int listPeople=0;listPeople < jsonListPeopleArray.length();listPeople++)
							{
								JSONObject jsonListPeople = jsonListPeopleArray.getJSONObject(i);
								if(jsonListPeople.getString("login").equalsIgnoreCase(userProfile.getuserName()))
								{
									cmsData.put("uniquepin",jsonListPeople.getString("uniquepin"));
									cmsData.put("peopleId",jsonListPeople.getString("peopleId"));
								}
							}
						}
						return cmsData.toString();
					}
				}
		} 
		 catch(JSONException e1){
			 e1.printStackTrace();
		 }
		catch (IOException e) 
		{
			e.printStackTrace();
		}
		return cmsData.toString();
	}
	
	public String insertStaffToCMS(String compUniqueKey,UserProfile userProfile)
	{
		JSONObject cmsData 			= new JSONObject();
		try 
		{
			Map <String, Object> dataToCRM = new LinkedHashMap <String, Object> ();
			dataToCRM.put("name",  userProfile.getFirstName() + " " + userProfile.getLastName());
			dataToCRM.put("companyname", userProfile.getcompanyName());
			dataToCRM.put("login", userProfile.getuserName());
			dataToCRM.put("password","");
			dataToCRM.put("type", "contact");
			
			JSONObject crmReqData = new JSONObject(dataToCRM);
			log.info("request data is" +crmReqData.toString());
			
			InputStream output           = sendRequest(cms_url+"/services/data/v1.0/objects/Contact/"+compUniqueKey+"?apikey="+adaptiveYouAPIKey, "PUT", crmReqData);
			BufferedReader br            = new BufferedReader(new InputStreamReader(output));
			String temp                  = null;
			String responseString        = "";
			
			
				while((temp=br.readLine())!=null) {
					responseString += temp;
				}
				
				log.info("After receiving response "+responseString);
				
				if(!(responseString.equals("")))
				{
					  
					JSONObject jsonData 		= new JSONObject(responseString);
					
					if(jsonData.getString("contact") != null)
					{
						JSONObject jsonContact =jsonData.getJSONObject("contact");
						
							log.info("Contact ::"+jsonContact.getJSONArray("listPeople"));
							JSONArray jsonListPeopleArray = jsonContact.getJSONArray("listPeople");
							log.info("listPeople ::"+jsonListPeopleArray.toString());
							for(int listPeople=0;listPeople < jsonListPeopleArray.length();listPeople++)
							{
								JSONObject jsonListPeople = jsonListPeopleArray.getJSONObject(listPeople);
								if(jsonListPeople.getString("login").equalsIgnoreCase(userProfile.getuserName()))
								{
									cmsData.put("uniquepin",jsonListPeople.getString("uniquepin"));
									cmsData.put("peopleId",jsonListPeople.getString("peopleId"));
								}
							}
						}
						return cmsData.toString();
					}
		} 
		catch(JSONException e1){
			 e1.printStackTrace();
		 }
		catch (IOException e) 
		{
			e.printStackTrace();
		}
		log.info("cms details :: "+cmsData.toString());
		return cmsData.toString();
	}
	
	public String updateStaffInCMS(String peopleId,UserProfile userProfile,HttpServletRequest request)
	{
		HttpSession session = request.getSession();
		JSONObject cmsData 			= new JSONObject();
		try 
		{
			Map <String, Object> dataToCRM = new LinkedHashMap <String, Object> ();
			dataToCRM.put("peopleid",peopleId);
			dataToCRM.put("name",  userProfile.getFirstName() + " " + userProfile.getLastName());
			dataToCRM.put("companyname", userProfile.getcompanyName());
			dataToCRM.put("login", userProfile.getuserName());
			dataToCRM.put("password","");
			
			JSONObject crmReqData = new JSONObject(dataToCRM);
			log.info("request data is" +crmReqData.toString());
			
			InputStream output           = sendRequest(cms_url+"/services/data/v1.0/objects/Contact/"+session.getAttribute("cmsCompanyUniqueKey")+"?apikey="+adaptiveYouAPIKey, "PUT", crmReqData);
			BufferedReader br            = new BufferedReader(new InputStreamReader(output));
			String temp                  = null;
			String responseString        = "";
			
			
				while((temp=br.readLine())!=null) {
					responseString += temp;
				}
				
				log.info("After receiving response "+responseString);
				if(!(responseString.equals("")))
				{
					  
					JSONObject jsonData 		= new JSONObject(responseString);
					
					if(jsonData.getString("contact") != null)
					{
						JSONObject jsonContact =jsonData.getJSONObject("contact");
						
							log.info("Contact ::"+jsonContact.getJSONArray("listPeople"));
							JSONArray jsonListPeopleArray = jsonContact.getJSONArray("listPeople");
							log.info("listPeople ::"+jsonListPeopleArray.toString());
							for(int listPeople=0;listPeople < jsonListPeopleArray.length();listPeople++)
							{
								JSONObject jsonListPeople = jsonListPeopleArray.getJSONObject(listPeople);
								if(jsonListPeople.getString("login").equalsIgnoreCase(userProfile.getuserName()))
								{
									cmsData.put("uniquepin",jsonListPeople.getString("uniquepin"));
									cmsData.put("peopleId",jsonListPeople.getString("peopleId"));
								}
							}
						}
						return cmsData.toString();
				}
		} 
		catch(JSONException e1){
			 e1.printStackTrace();
		 }
		catch (IOException e) 
		{
			e.printStackTrace();
		}
		return cmsData.toString();
	}
	
	
	public InputStream sendRequest(String crmUrl, String method, JSONObject data) {
		log.info("Inside send request function");
		InputStream output = null;
		try {
			URL url = new URL(crmUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("Accept",       "application/json");
			conn.setRequestMethod(method);
			conn.setConnectTimeout(60000);
			conn.setReadTimeout(60000);
			conn.setDoInput(true);
			conn.setDoOutput(true);
			conn.connect();
			if(data!=null) {
			OutputStream writer = conn.getOutputStream();
			writer.write(data.toString().getBytes());
			}
			output = conn.getInputStream();

		} catch (MalformedURLException ex) {
			ex.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} catch (Throwable t) {
			t.printStackTrace();
		}
		return output;

	}
}


/*{"locations":[],
	"success":true,
	"contact":{"location":null,"locationList":null,"userId":null,
	"contactTypeId":"d10ff787-89df-4a99-ac4b-4c90efc5292d",
	"listPeople":[{"key":{"name":null"parent":{"name":"81R1FW","parent":null,"id":0,"namespace":"","kind":"Contact","complete":true},"id":1,"namespace":"","kind":"People","complete":true},"location":null,"peopleId":"3f993bfc-6caf-4d06-8ddd-9cd380fdf39b","primaryContactFlag":false,"login":"bharathkumar.manoharan@a-cti.com","passNew":null,"password":"","uniquepin":"81R1FW","accountPin":"24HGWK","listContactMethod":[],"deleteFlag":false,"dateAdded":1355148157961,"comments":"","deleted":false,"costPerPoint":0.0,"firstName":"Bharath","lastName":"Kumaar","department":null,"jobTitle":null,"locationId":null,"phoneExtension":null,"photoId":null,"ipAddress":null,"personalWaits":0,"pass":null,"lastPhoneExtension":null,"currentStatusNote":null,"currentStatusType":null,"phoneSystemType":null,"accountId":null,"activationFlag":false,"billingContactFlag":false,"deliverymethodJobId":"","deliverymethodName":"","authenticaionProvder":"","companyName":""},{"key":{"name":null,"parent":{"name":"81R1FW","parent":null,"id":0,"namespace":"","kind":"Contact","complete":true},"id":1001,"namespace":"","kind":"People","complete":true},"location":null,"peopleId":"c9dfd301-4d28-4ff2-b0ed-a020c447bc3a","primaryContactFlag":false,"login":"embkay06@gmail.com","passNew":null,"password":"","uniquepin":"81R1FW","accountPin":"24HGWK","listContactMethod":[],"deleteFlag":false,"dateAdded":1355148860369,"comments":"","deleted":false,"costPerPoint":0.0,"firstName":"null","lastName":"null","department":null,"jobTitle":null,"locationId":null,"phoneExtension":null,"photoId":null,"ipAddress":null,"personalWaits":0,"pass":null,"lastPhoneExtension":null,"currentStatusNote":null,"currentStatusType":null,"phoneSystemType":null,"accountId":null,"activationFlag":false,"billingContactFlag":false,"deliverymethodJobId":"","deliverymethodName":"","authenticaionProvder":"","companyName":""},{"key":{"name":null,"parent":{"name":"81R1FW","parent":null,"id":0,"namespace":"","kind":"Contact","complete":true},"id":2001,"namespace":"","kind":"People","complete":true},"location":null,"peopleId":"aae5d6dd-8271-48c3-84ff-7b4e376b2e7d","primaryContactFlag":false,"login":"embkay06@gmail.com","passNew":null,"password":"","uniquepin":"81R1FW","accountPin":"24HGWK","listContactMethod":[],"deleteFlag":false,"dateAdded":1355154856559,"comments":"","deleted":false,"costPerPoint":0.0,"firstName":"null","lastName":"null","department":null,"jobTitle":null,"locationId":null,"phoneExtension":null,"photoId":null,"ipAddress":null,"personalWaits":0,"pass":null,"lastPhoneExtension":null,"currentStatusNote":null,"currentStatusType":null,"phoneSystemType":null,"accountId":null,"activationFlag":false,"billingContactFlag":false,"deliverymethodJobId":"","deliverymethodName":"","authenticaionProvder":"","companyName":""},{"key":{"name":null,"parent":{"name":"81R1FW","parent":null,"id":0,"namespace":"","kind":"Contact","complete":true},"id":3001,"namespace":"","kind":"People","complete":true},"location":null,"peopleId":"f0d13d9e-9ee5-4cab-99bc-777788b8476f","primaryContactFlag":false,"login":"embkay06@gmail.com","passNew":null,"password":"","uniquepin":"81R1FW","accountPin":"24HGWK","listContactMethod":[],"deleteFlag":false,"dateAdded":1355155155991,"comments":"","deleted":false,"costPerPoint":0.0,"firstName":"null","lastName":"null","department":null,"jobTitle":null,"locationId":null,"phoneExtension":null,"photoId":null,"ipAddress":null,"personalWaits":0,"pass":null,"lastPhoneExtension":null,"currentStatusNote":null,"currentStatusType":null,"phoneSystemType":null,"accountId":null,"activationFlag":false,"billingContactFlag":false,"deliverymethodJobId":"","deliverymethodName":"","authenticaionProvder":"","companyName":""}],"uniquepin":"81R1FW","accountPin":"24HGWK","listContactMethod":null,"contactName":"sada","subGroupId":null,"sourceCode":null,"dateAdded":1355148157961,"brandId":null,"subBrandId":null,"ssn":null,"brands":null,"comments":""}
	,"uniquepin":"81R1FW"}
*/














