package com.acti.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import com.acti.jdo.PMF;
import com.acti.jdo.UserStatusDetails;

@Controller
public class ManageStuff  extends HttpServlet{
	
	
	public void pendingReqInfo(HttpServletRequest req)
	{
		PersistenceManager pmGetPendingreqCount = PMF.get().getPersistenceManager();
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String,Integer> pendingCountMap = new HashMap<String,Integer>();
		int badgeCount = 0;
		int stuffCount = 0;
		Writer writer = new StringWriter();
		HttpSession sessionLogin = req.getSession();
		String compId = "";
		 compId =  (String)sessionLogin.getAttribute("companyKey");
		try
		{
			Query queryPendingCount =pmGetPendingreqCount.newQuery(UserStatusDetails.class,"companyId == '"+compId+"'");
			                                                                                
			List<UserStatusDetails> pendingCount = (List<UserStatusDetails>)queryPendingCount.execute();
			
			for(UserStatusDetails userInfo:pendingCount)
			{
					if(("badge".equalsIgnoreCase(userInfo.getTypeRequested()) || "trophy".equalsIgnoreCase(userInfo.getTypeRequested())) && userInfo.getStatus().equals("requested"))
					{
						badgeCount += 1;
					}
					else if("stuff".equalsIgnoreCase(userInfo.getTypeRequested()) && userInfo.getStatus().equals("purchased"))
					{
						stuffCount += 1;
					}
			}
		}
		catch(Exception e)
		{
			
		}
		pendingCountMap.put("badgeCount", badgeCount);
		pendingCountMap.put("stuffCount", stuffCount);
		
		
		HttpSession session = req.getSession();
		
		try {
			mapper.writeValue(writer, pendingCountMap);
			session.setAttribute("pendingReqCount",writer.toString());
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
