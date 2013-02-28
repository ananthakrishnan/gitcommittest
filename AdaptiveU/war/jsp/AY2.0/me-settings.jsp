
        
<!--  Start badge thumb  -->
           <div class="span12">
              <div class="well settings-well">
                
				<form class="form-horizontal">
				        <fieldset>
				            <div class="" id="legend">
				                <legend class=""><h3>Profile Settings</h3></legend>
				            </div>
				
				            <div class="control-group">
				                <label class="control-label">Profile Image</label>
				
				                <div class="controls profile-image">
				                    <!-- Multiple Radios -->
				                     <label class="radio" id="google_profile_image">
				                     	<input checked="checked"  name="profile-img" type="radio" value="Use my Google profile image"> 
				                    	<img style="height:50px;width:50px;" src="" class="pull-left" />
				                    	Use my Google profile image
				                    </label> <div class="clearfix"></div>
				                    <label class="radio" style="margin-top: 15px;" >
				                    	<input name="profile-img" id="user_profile_image" type="radio" value="Upload an image"> 
				                    	<img style="height:50px;width:50px;" src="http://placehold.it/50x50&text=Hello world" id="uploaded_image" class="pull-left" />
				                    	Upload an image
				                    </label>
				                    <input type="file" id="image_chooser" name="chooseNewPicture" style="display:none;" onchange="displaySelectedImage(this);"> 
				                </div>
				            </div>
				
				            <div class="control-group">
				                <label class="control-label">Profile Display Name</label>
				
				                <div class="controls">
				                    <!-- Multiple Radios -->
				                     <label class="radio" id="google_name"><input  checked="checked" name="group" id="original_name" type="radio" value="Kevin Payne"> 
				                     	Kevin Payne
				                     </label>
				                    <label class="radio">
				                    	<input name="group" type="radio" id="modified_name" value="Nickname or secret alias"> 
				                    	<div class="clearfix">
											<input id="user_given_name" type="text" placeholder="Nickname or secret alias" class="input-xlarge">
										</div>
				                    </label>
				                </div>
				            </div>
				            <hr>
				            <div class="" id="legend">
				                <legend class=""><h3>Manage Universities</h3></legend>
				            </div>
				            
				            <div class="control-group">
	                            <label class="control-label">Currently enrolled in:</label>
	            
	                            <div class="controls">
	                                <ul class="nav nav-tabs nav-stacked span6" id="company_enrolled">
	                                  <li>
	                                  	<div class="btn-group">
	                                  	  <button class="btn">Adaptavant U</button>
	                                  	  <button class="btn dropdown-toggle" data-toggle="dropdown">
	                                  	    <span class="caret"></span>
	                                  	  </button>
	                                  	  <ul class="dropdown-menu">
	                                  	    <li><a href="#">Hide my profile in this U</a></li>
	                                  	    <li class="divider"></li>
	                                  	    <li><a href="#">Dropout of this U</a></li>
	                                  	  </ul>
	                                  	</div>
	                                  </li>
	                                  <li>
	                                  	<div class="btn-group">
	                                  	  <button class="btn">Full Customer Focus U</button>
	                                  	  <button class="btn dropdown-toggle" data-toggle="dropdown">
	                                  	    <span class="caret"></span>
	                                  	  </button>
	                                  	  <ul class="dropdown-menu">
	                                  	    <li><a href="#">Hide my profile in this U</a></li>
	                                  	    <li><a href="#">Dropout of this U</a></li>
	                                  	  </ul>
	                                  	</div>
	                                  </li>
	                                  <li>
	                                  	<div class="btn-group">
	                                  	  <button class="btn">SetMore U</button>
	                                  	  <button class="btn dropdown-toggle" data-toggle="dropdown">
	                                  	    <span class="caret"></span>
	                                  	  </button>
	                                  	  <ul class="dropdown-menu">
	                                  	    <li><a href="#">Hide my profile in this U</a></li>
	                                  	    <li><a href="#">Dropout of this U</a></li>
	                                  	  </ul>
	                                  	</div>
	                                  
	                                  </li>
	                                </ul>
	                            </div>
	                        </div>
				            
				        </fieldset>
				    </form>        
				                            
              </div><!-- End well -->
            </div><!-- End badge thumb -->
            
            <div id="imageCropperHolder" style="display:none;">
            	<img src="" id="beingCroppedPicture" />
            </div>
	
<!--  End badge thumb wrapper  -->
                                                              
        <hr class="span12">
        <div class="span12">
          AdaptiveYou Copyright 2012
        </div>
     