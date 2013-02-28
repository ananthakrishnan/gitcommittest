package com.acti.controller;

import java.util.UUID;

public class IDGenerator {
	
	public static String getUniqueId(){		
		return UUID.randomUUID().toString();
	}

}
