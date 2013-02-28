//      $(document).ready(function() {
//          //READY
//
//          var obj = {};
//          obj.analyticsProfileId = 'UA-10884090-1';
//          
//          console.info("calling analytics2 with = " + obj.analyticsProfileId);
//          setupAnalytics( { analyticsProfileId: obj.analyticsProfileId } );
//    	
//          
//          $('[name="salesDemo"]').submit( function() {
//        	 var obj = {};
//        	 obj.userName = $('#username').val();
//
//        	 // toString() - required to convert object to string for GA
//        	 obj.action = $('[name="action"]').fieldValue().toString();  
//        	 
//      //  	 obj.analyticsProfileId = "UA-10884090-1";
//        	 //obj.analyticsProfileId = "";
//        	 
//        	 try {
//        	     recordAction(obj);
//        	 } catch(e) {
//        		 console.error("problem calling recordAction :: " + e.message);
//        	 }
//        	 
//        	 return false;
//          });
//
//      });
          
      
var loopEvents = {
      
      _gaq2: null,
      _analyticsProfileId: "",
      events: [],
      
      _init: function(obj) {
    	  loopEvents._analyticsProfileId = obj.analyticsProfileId;
      },
      
      setupAnalytics: function() {
    	                	
    	//console.info("setupAnalytics begin... obj.analyticsProfileId = " + obj.analyticsProfileId);
    	try {
        	//loopEvents._gaq2 = _gaq || [];
    		loopEvents._gaq2 = _gaq != null ? _gaq : [];
        	if(loopEvents._gaq2 == []) {
        		alert("problem. Stop execution");
        		return false;
        	}
        	loopEvents._gaq2.push(['b._setAccount', loopEvents._analyticsProfileId]);
        	loopEvents._gaq2.push(['b._setDomainName', 'none']);
        	loopEvents._gaq2.push(['b._setAllowLinker', true]);
        	//loopEvents._gaq2.push(['b._trackPageview']);
	    	
	    	console.info("setupAnalytics :: calling 2nd analytics script tag...");
	    	
//	    	(function() {
//	    	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//	    	  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//	    	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//	    	})();
	    	
	    	
	    	
    	} catch(e) { 
    		alert("setupAnalytics :: Problem with Google Analytics :: "  + e.message);
    		
    	}	
    	
    	
      },
    
      
      recordAction: function (obj) {
    	  loopEvents.setupAnalytics();
          //alert(JSON.stringify(obj));
    	  try {
    		  //label = username
    		  loopEvents._gaq2.push(["b._trackEvent", obj.category, obj.action, obj.label]);
    		  //_gaq.push(["_trackEvent", obj.category, obj.action, obj.label]);
    		
    		  console.info("Recorded result in analytics");
    	  } catch(e) {
    		  console.warn("Google Analytics call failed :: " + e.message);
    	  }
    	   
    	  
      	    	  
      },
      
      /** 
       * Registers an event object to pass to Google Analytics
       */
//      applyGoogleAnalyticsEventTracking: function(legacyFn, eventObj) {  
//    	        
//    			/** arguments for original fn **/
//   			return function() { 
//  		    	// original function pass in as parameter
//   				legacyFn.apply(this, arguments);
//   		    	
//   				alert("Event to be recorded = " + JSON.stringify(eventObj));    		    	
//   		    	loopEvents.recordAction(eventObj);
//   		    };
//   		    
//      },
    	  
      
      
      
    markAsLead: function(obj) { 
    	loopEvents._gaq2.push(['_trackEvent', 'Chat','Lead Captured',obj.userName]);
    },
    
    markAsSale: function (obj) {
    	loopEvents._gaq2.push(['_trackEvent', 'Chat','Made Sale',obj.userName]);
    },

    makeReady: function (obj) {
    	
    },
    
    makeNotReady: function (obj) {
    	
    },
    
    // category = loopName
    // action = action
    // label = userEmail
    bindEvent: function(eventName) {
    	
    	loopEvents.events.push(function(obj) {
    	    alert(obj.category + ":" + obj.action + ":" + obj.label);
    		//loopEvents._gaq2.push(['_trackEvent', cat, action, label]);
    		
    	});
    }
};
    
      