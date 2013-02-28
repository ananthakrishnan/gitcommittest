package com.acti.controller;
import java.io.IOException;
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

import com.acti.jdo.PMF;
import com.acti.jdo.UserProfile;
import com.adaptive.business.service.UserHistoryServiceMethod;
@Controller
public class UserHistoryPageController extends HttpServlet
{
	@RequestMapping(value="/displayAllTransactions" , method=RequestMethod.GET)
	protected String displayAllTransactions(HttpServletRequest request,HttpServletResponse response) throws IOException
	{
		HttpSession session = request.getSession();
		PersistenceManager pmfrusercheck = PMF.get().getPersistenceManager();
		Query queryUserDetails1 =pmfrusercheck.newQuery(UserProfile.class,"	key == '"+(String)session.getAttribute("userKeyLogin")+"'");
		queryUserDetails1.setOrdering("firstName asc");
		@SuppressWarnings("unchecked")
		List<UserProfile> usersInfo = (List<UserProfile>)queryUserDetails1.execute();
		for(UserProfile usersInfoDetail: usersInfo)
		{
			if(usersInfoDetail.getType().equals("user")){
				return "error";
			}

		}
		String company_Id=(String)session.getAttribute("companyKey");
		UserHistoryServiceMethod.userHistoryDataStore(company_Id,request);

		ManageStuff mgStuff = new ManageStuff();
		mgStuff.pendingReqInfo(request);

		return "displayAllTransactions";
	}
}
