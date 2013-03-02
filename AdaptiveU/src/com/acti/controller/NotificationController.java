package com.acti.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.adaptive.business.service.NotificationService;

public class NotificationController
	{
		@RequestMapping( value = "/pushNotification", method = RequestMethod.POST )
		public void pushNotification( @RequestBody String commitInfoAsJSON ) 
		{
			NotificationService.updateCommitInfoInBadge(commitInfoAsJSON);
		}
	}
