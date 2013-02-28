/*************************************************************************
 * 
 * LoopTodo  CONFIDENTIAL
 * __________________
 * 
 *  Copyright (c) LoopTodo, 2012
 *  All Rights Reserved.
 * 
 * NOTICE:  Except where expressly excluded, all information contained herein is, and remains
 * the property of LoopTodo and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to LoopTodo
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from LoopTodo.
 */


var messageListener = {

	/** messageListener log **/
	/** Disables logging on live **/
	logger: (function() { 
		//if( (window.location.hostname == "localhost" || window.location.port.length == 4 || messageListener.debug == true) ) {
		if(window.localStorage && window.localStorage.getItem("debug") != undefined && window.localStorage.getItem("debug") == "true")  {
			return console;
		} else {
			return { log: function() {}, info: function() {}, warn: function() {}, error: function() {}, trace: function() {}, debug: function() {},
			   timeStamp: function() { } };
		}
	})(),
	
	

    /** 
	 * Binds the listeners to handlers. system will invoke the listeners,
	 * and the appropriate handler on the top.window side will fire.
	 *
	 */
	listen: function(event, callbackFn) {
		var obj = { "event" : event };
		messageListener.logger.info("["+window.location.hostname+"]: listener set for event");
		messageListener.logger.info("["+window.location.hostname+"]: callbackFn = " + callbackFn);
		messageListener.logger.info("["+window.location.hostname+"]: event = " + event);
	    
		if (window.addEventListener) {  // all browsers except IE before version 9
	    
	    	window.addEventListener ("message", (function(callbackFn) { /* function that returns a function that takes 1 event argument */
	        	return function(e) {
	        	    messageListener.callbackHandler(e,callbackFn);
	        	}
	        })(callbackFn), false);
	        
	    } else if (window.attachEvent) {   // IE before version 9
	            window.attachEvent("onmessage", (function(callbackFn) {
	            	return function(e) {
	            	    messageListener.callbackHandler(e, callbackFn);
	            	}
	            })(callbackFn));
	    }
		
	},

	callbackHandler: function(e, callbackFn) {
		messageListener.logger.info("["+window.location.hostname+"]: handler called for event :: " + e.data.toString());
//		var obj = JSON.parse(e.data);
		var obj = { data: JSON.parse(e.data.toString()) };
		messageListener.logger.info("["+window.location.hostname+"]: event = " + obj.event);
//        alert(callbackFn);
		callbackFn(obj);
	},
	
	/**
	 * 
	 */
	trigger: function(eventName, data, context, origin) {
		messageListener.logger.info("["+window.location.hostname+"]: trigger the event");
		messageListener.logger.info("["+window.location.hostname+"]: sending data = " + JSON.stringify(data));
//		alert(context)
		context.postMessage(JSON.stringify(data), origin);			
	},
	
	init: function() {
		
				
		if(parent.postMessage) {
			
			// construct object
			var obj = {"event" : "receiveData", "data" : {}};
			
			// put data in object and serialize to a JSON string
			obj.event = "receiveData";
			obj.data.hello = "hello"
			
			
			var json = JSON.stringify(obj);
			
	        messageListener.logger.info("postMessage supported.");
	        //var obj = '{ "event" : "incomingCall","data": { "dnis":"209","ani":"825"}}';
		    parent.postMessage(json,
				referrer);
		} else {
			messageListener.logger.warn("postMessage NOT supported");
		}
		
		
	}
	
};
	