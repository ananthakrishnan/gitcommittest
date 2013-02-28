package com.acti.resletclient;

import java.util.logging.Logger;
import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.routing.Router;



public class ServletRouting extends Application
{
	
	private static final Logger	mLogger		      = Logger.getLogger( ServletRouting.class.getName() );
	public synchronized Restlet createInboundRoot()
	{
		Router router = new Router( getContext() );
		try
			{
				router.attach( "/restletSignup" , SignupDetailsFromClient.class );
				mLogger.log( java.util.logging.Level.SEVERE,"After calling the restletService" );
			}
		catch ( Exception e )
		{
			mLogger.log( java.util.logging.Level.SEVERE,"Exception occured while attaching the application",e );
		}
		return router;
		
	}

}
