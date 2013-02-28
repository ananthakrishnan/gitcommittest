package com.acti.controller;

import java.util.Date;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import org.restlet.data.Form;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;





@Controller
public class FeedbackReport {
	
	private static final Logger log = Logger.getLogger((FeedbackReport.class).getName());
	@RequestMapping(value="/feedbacksender.do")
	public @ResponseBody String  test(HttpServletRequest request){
		
		Form f=new Form();
		f.add("card_title", request.getParameter("card_title"));
		f.add("card_desc",request.getParameter("card_desc"));
		f.add("user_name",request.getParameter("user_name"));
		f.add("user_email",request.getParameter("user_email"));
		f.add("anonymous",request.getParameter("user_name"));
		f.add("loopKey",request.getParameter("loopKey"));
		f.add("user_avatar",request.getParameter("user_avatar"));
		f.add("user_tag",request.getParameter("user_tag"));
		f.add("tag", request.getParameter("tag"));
		Date date=new Date();
		Representation rep=f.getWebRepresentation();
		ClientResource clientSignup = new ClientResource("http://my.loopto.do/forms/process/?json=true&t="+date.getTime());
		clientSignup.post(rep);
		return "feedback sent successfully";
	}

}
