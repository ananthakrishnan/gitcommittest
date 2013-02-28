/**
 * 
 */
package com.acti.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Properties;
import java.util.TimeZone;
import java.util.logging.Logger;

import javax.jdo.PersistenceManager;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;

import com.acti.jdo.BadgesList;
import com.acti.jdo.PMF;
import com.acti.jdo.UserProfile;
import com.google.appengine.api.mail.MailService;
import com.google.appengine.api.mail.MailServiceFactory;
import com.google.appengine.api.datastore.Text;
/**
 * @author Saranya
 *
 */
public class MailingService {
	private static final Logger log = Logger.getLogger((MailingService.class).getName());
	
	public void sendMailToContactFeedbackSuggestion(String name,String comments, 	String commentsdate)
	{
		String from 	= "saranya.shanmugavel@a-cti.com";
		String to	    = "saranya.shanmugavel@a-cti.com";
		String cc       = "kevin.payne@a-cti.com";
		String subject  = "AdaptiveCourse Feedback - Suggestion ";
		String replyToEmail  = "";
		
		/*Changes added by Rittik Ray on 22.11.2011 for making sure global date format is used in mails*/
		SimpleDateFormat df = new SimpleDateFormat("EEE, d MMM yyyy");
		SimpleDateFormat df_string = new SimpleDateFormat("MM/dd/yy hh:mm aaa");
		try {
			//log.info("Date String Format Before::::::::::"+commentsdate);
			Date date = df_string.parse(commentsdate);
			commentsdate = df.format(date);
			//log.info("Date String Format After:::::::::::::"+commentsdate);
		} catch (ParseException e) {					
			e.printStackTrace();
			//log.info("Some Error while parsing the date");
		}
		/*End of changes made by Rittik Ray*/
		
		StringBuffer bodyText = new StringBuffer();
		bodyText.append("Hello Admin,").append("\n\n");;
		bodyText.append("You have received suggestion from ").append(name).append(" on ").append(commentsdate).append(".");
		bodyText.append("\n\n").append(comments);
		bodyText.append("\n\n");
		bodyText.append("Thank you!");
		bodyText.append("\nThe SetMore Team.");
		//log.info("Message::::"+bodyText);
		this.mailservice(from, subject, to, cc, bodyText,replyToEmail,"");
		}

	
	public void sendMailToUserForBadge(StringBuffer bodyText, String subject,String to)
	{
		String from 	= "support@adaptiveyou.com";
		String cc       = "";
		String replyToEmail  = "";
		//log.info("Message::::"+bodyText);
		//this.mailservice(from, subject, to, cc, bodyText,replyToEmail);
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props);
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			if((!("".equals(cc))) && (cc != null))
				message.setRecipient(Message.RecipientType.CC, new InternetAddress(cc));
			//Changes made by Saranya on 17-01-2012
			//Added reply-to address for customers and the reply-to points to the client's cc email address
			//Changes made by Saranya on 17-01-2012 ends here
			message.setSubject(subject);
			message.setSentDate(new Date());
			MimeBodyPart messagePart = new MimeBodyPart();
			messagePart.setContent(bodyText.toString(),"text/html");
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messagePart);
			message.setContent(multipart);
			try {
				//log.info("message ::" +message);
				Transport.send(message);				
				if((!("".equals(cc))) && (cc != null))
				log.info("After the mail has sent to " + to + "and CC to "+cc);
				else
					log.info("After the mail has sent to " + to +"With no CC");
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
	}

	
	public void sendMailToUserForRequest(String userName,String RequestText, String today,String userEmail,String badgeName)
	{
		
		String from 	= "saranya.shanmugavel@a-cti.com";
		String to	    = "saranya.shanmugavel@a-cti.com";
		String cc       = "kevin.payne@a-cti.com";
		String subject  = "AdaptiveCourse - Badge Request ";
		String replyToEmail = "";
		
		/*Changes added by Rittik Ray on 22.11.2011 for making sure global date format is used in mails*/
		SimpleDateFormat df = new SimpleDateFormat("EEE, d MMM yyyy");
		SimpleDateFormat df_string = new SimpleDateFormat("MM/dd/yy hh:mm aaa");
		try {
			//log.info("Date String Format Before::::::::::"+today);
			Date date = df_string.parse(today);
			today = df.format(date);
			//log.info("Date String Format After:::::::::::::"+today);
		} catch (ParseException e) {					
			e.printStackTrace();
			//log.info("Some Error while parsing the date");
		}
		/*End of changes made by Rittik Ray*/
		
		StringBuffer bodyText = new StringBuffer();
		bodyText.append("Hello Admin,").append("\n\n");;
		bodyText.append("You have received request from ").append(userName).append(" on ").append(today).append(".");
		bodyText.append("\n\n For this Badge - "+badgeName);
		bodyText.append("\n\n And their email address is "+userEmail);
		bodyText.append("\n\n").append("The Request Information is ::"+RequestText);
		bodyText.append("\n\n");
		bodyText.append("Thank you!");
		bodyText.append("\nThe Adaptive Course Team");
		//log.info("Message::::"+bodyText);
		this.mailservice(from, subject, to, cc, bodyText,replyToEmail,"");
		
	}
	
	
	public void sendMailToContactFeedbackQuestion(String name,String comments, 	String commentsdate)
	{
		String from 	= "saranya.shanmugavel@a-cti.com";
		String to	    = "saranya.shanmugavel@a-cti.com";
		String cc       = "kevin.payne@a-cti.com";
		String subject  = "AdaptiveCourse Feedback - Question ";
		String replyToEmail = "";
		
		/*Changes added by Rittik Ray on 22.11.2011 for making sure global date format is used in mails*/
		SimpleDateFormat df = new SimpleDateFormat("EEE, d MMM yyyy");
		SimpleDateFormat df_string = new SimpleDateFormat("MM/dd/yy hh:mm aaa");
		try {
			//log.info("Date String Format Before::::::::::"+commentsdate);
			Date date = df_string.parse(commentsdate);
			commentsdate = df.format(date);
			//log.info("Date String Format After:::::::::::::"+commentsdate);
		} catch (ParseException e) {					
			e.printStackTrace();
			//log.info("Some Error while parsing the date");
		}
		/*End of changes made by Rittik Ray*/
		
		StringBuffer bodyText = new StringBuffer();
		bodyText.append("Hello Admin,").append("\n\n");;
		bodyText.append("You have received suggestion from ").append(name).append(" on ").append(commentsdate).append(".");
		bodyText.append("\n\n").append(comments);
		bodyText.append("\n\n");
		bodyText.append("Thank you!");
		bodyText.append("\nThe SetMore Team");
		//log.info("Message::::"+bodyText);
		this.mailservice(from, subject, to, cc, bodyText,replyToEmail,"");
		}
	
	public void sendMailToContactFeedback(String name,String comments, 	String commentsdate)
	{
		String from 	= "saranya.shanmugavel@a-cti.com";
		String to	    = "saranya.shanmugavel@a-cti.com";
		String cc       = "kevin.payne@a-cti.com";		
		String subject  = "AdaptiveCourse Feedback - Problem ";
		String replyToEmail = "";
		
		/*Changes added by Rittik Ray on 22.11.2011 for making sure global date format is used in mails*/
		SimpleDateFormat df = new SimpleDateFormat("EEE, d MMM yyyy");
		SimpleDateFormat df_string = new SimpleDateFormat("MM/dd/yy hh:mm aaa");
		try {
			//log.info("Date String Format Before::::::::::"+commentsdate);
			Date date = df_string.parse(commentsdate);
			commentsdate = df.format(date);
			//log.info("Date String Format After:::::::::::::"+commentsdate);
		} catch (ParseException e) {					
			e.printStackTrace();
			//log.info("Some Error while parsing the date");
		}
		/*End of changes made by Rittik Ray*/
		
		StringBuffer bodyText = new StringBuffer();
		bodyText.append("Hello Admin,").append("\n\n");;
		bodyText.append("You have received feedback from  ").append(name).append(" in " ).append(" on ").append(commentsdate).append(".");
		bodyText.append("\n\n").append(comments);
		bodyText.append("\n\n");
		bodyText.append("Thank you!");
		bodyText.append("\nThe SetMore Team");
		//log.info("Message::::"+bodyText);
		this.mailservice(from, subject, to, cc, bodyText,replyToEmail,"");
		} 
	
/*	public void sendMailToNewUser(String emailId)
	{
		String from 	= "support@adaptiveyou.com";
		String subject  = "We happily invite you to AdpativeYou";
		String replyToEmail = "";
		
		StringBuffer bodyText = new StringBuffer();
		bodyText.append("Bored of formal assessment apps? No worries! Stay Cool!Your search for fun-filled assessment app ends here at Adaptive You!"+
						"\n"+
				"This comes your way from Adaptive You and we happily invite you to enjoy our cool app.:)"+
				"\nhttp://www.adaptivecourse.appspot.com\n"+
				"--------------------------------------"+
				"\n"+
				"Know some of our attractive features:"+
					"\n"+
				"User History"+
				"Keep track your users’ activities (when and what stuff they win)."+
				"\n"+
				"Add New Badge"+
				"Create new badges which you think would help users know your product better."+
				"\n"+
				"Manage Teams/Groups"+
				"Organize your users into tidy categories."+
				"\n"+
				"Get Stuff"+
				"Offer fun prizes like yummy food, days off and T-shirts to users scoring more."+
				"\n"+
				"Email Notification"+
				"Notify your users about the badges/trophies/stuff they win."+
				"\n"+
				"Coming Soon!"+
				"Invisible Badge.."+
				"\n"+
				"--------------------------------------\n"+
				"Nothing’s better than showing up soon!"+
				"\n"+
				"Help us know your interest. Your query is our development.");
		
		this.mailservice(from, subject, emailId, "", bodyText,replyToEmail);
		
	}*/
	public void sendMailToNewUser(String emailId,String firstName,String lastName)
	 {
	  String from  = "support@adaptiveyou.com";
	  String subject  = "We happily invite you to AdpativeYou";
	  String replyToEmail = "";
	  VelocityEngine ve = new VelocityEngine();
	  ve.init();
	  Template t = ve.getTemplate( "/vm/welcomemail-AdaptiveYou.vm" );
	  VelocityContext context = new VelocityContext();
	 // context.put("name", emailId);
	  context.put("invitee_name", firstName + " " + lastName);
	  StringWriter writer = new StringWriter();
	        t.merge( context, writer );
	        StringBuffer buffer = new StringBuffer(writer.toString());
	  //this.mailservice(from,subject,emailId,"",buffer,replyToEmail);
	        MailService mailService = MailServiceFactory.getMailService();
	        MailService.Message message = new MailService.Message();
	        message.setSender(from);
	        message.setReplyTo("no-reply@setmore.com");
	        message.setTo(emailId);
	        message.setSubject(subject);
	        message.setHtmlBody(buffer.toString());
	        try
	        {
	         mailService.send(message);
	        }
	        catch(Exception e2)
	        {
	         e2.printStackTrace();
	        }
	 }
	private void mailservice(String from,String subject,String to,String cc,StringBuffer bodyText,String replyTo,String bcc)
	{
		Properties props = new Properties();
		Session session = Session.getDefaultInstance(props);
		try {
			MimeMessage message = new MimeMessage(session);
			message.setFrom(new InternetAddress(from));
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
			if((!("".equals(cc))) && (cc != null))
				message.setRecipient(Message.RecipientType.CC, new InternetAddress(cc));
			if((!("".equals(bcc))) && (bcc != null))
			message.setRecipient(Message.RecipientType.BCC, new InternetAddress(bcc));
			//Changes made by Saranya on 17-01-2012
			//Added reply-to address for customers and the reply-to points to the client's cc email address
			if((!("".equals(replyTo))) && (replyTo != null))
				message.setReplyTo(new Address[] { new InternetAddress(replyTo) });
			//Changes made by Saranya on 17-01-2012 ends here
			message.setSubject(subject);
			message.setSentDate(new Date());
			MimeBodyPart messagePart = new MimeBodyPart();
			messagePart.setText(bodyText.toString());
			Multipart multipart = new MimeMultipart();
			multipart.addBodyPart(messagePart);
			message.setContent(multipart);
			try {
				//log.info("message ::" +message);
				Transport.send(message);				
				if((!("".equals(cc))) && (cc != null))
					log.info("After the mail has sent to " + to + "and CC to "+cc);
				else
					log.info("After the mail has sent to " + to +"With no CC");
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (javax.mail.MessagingException e) {
			e.printStackTrace();
		}
	
	}
	public void sendMailfordenyingbadgeRequest(String emailId,Text mailContent,String type,String badgeName)
	{
		StringBuffer bodyText 			= new StringBuffer();
		String from 					= "support@adaptiveyou.com";
		String subject  				= "Sorry, Your Request for "+badgeName +" "+type+" has been denied :(";
		String replyToEmail 			= "";
		
		bodyText.append(mailContent.getValue());
		
		this.mailservice(from, subject, emailId, "", bodyText,replyToEmail,"");
	}
	
	public void sendMailToAdminAfterRequested(String adminMailId , String adminName , String badgeName , String userName, String type, String date)
	{
		StringBuffer bodyText 			= new StringBuffer();
		String from 					= "support@adaptiveyou.com";
		String subject 					= "One more request in AdaptiveYou";
		
		bodyText.append("Hello "+adminName+",");
		bodyText.append("You have got a request for "+badgeName+" "+type+" from "+userName+" on "+date);
		bodyText.append("Thanks,");
		bodyText.append("AdaptiveYou Team");

		this.mailservice(from , subject , adminMailId , "", bodyText,"","");
	}
	
	
	public void sendMailRegardingUserRequest(String userMailId, String userFirstName, String requestStatus)
	{
		StringBuffer bodyText 			= new StringBuffer();
		String from 					= "support@adaptiveyou.com";
		String subject 					= "";
		
		bodyText.append("Hello "+userFirstName+",");
		
		if(requestStatus.equalsIgnoreCase("accept"))
		{
			subject						= "Greetings, your request is accepted";
			
			bodyText.append("Congrats, your request to join AdaptiveYou is accepted.");
			bodyText.append("You shall start using AdaptiveYou and work on your company's badges.");
			
		}
		else if(requestStatus.equalsIgnoreCase("deny"))
		{
			subject						= "Sorry, your request is denied";
			
			bodyText.append("Sorry, your request to join AdaptiveYou is denied.");
		}
		
		bodyText.append("Thanks,");
		bodyText.append("AdaptiveYou Team");

		this.mailservice(from , subject , userMailId , "", bodyText,"","");
	}
	
}
