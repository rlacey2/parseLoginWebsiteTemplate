$(document).ready(function(){
	
	//  enterprise2013
	Parse.initialize(parseAppKey, parseJSKey );
 
	 
     init();
   
      
 });  // ready

 function init()
 {
 	 currentUser = Parse.User.current();
 	 loginStatus();
 } // init

 function loginStatus()
 {
     if (currentUser == null )
 	 {
 	 $("#navcontainer").append("<h3>No user logged in to parse.com project!</h3>");
 	 }
 else
 	 {
	 $("#navcontainer").append("<h3>Logged in as: " + currentUser.getUsername() + " to parse.com project</h3>");
 	 }	
 } // loginStatus 
    
 
