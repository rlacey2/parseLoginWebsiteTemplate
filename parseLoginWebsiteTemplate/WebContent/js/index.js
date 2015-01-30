// index = login
 

// stuff to do when the document is loaded

 
 
var currentUser = "";

$(document).ready(function(){
	
	//  enterprise2013
	Parse.initialize(parseAppKey, parseJSKey );
 
	var msgSaved = "saved to parse.com";
	
    $('#login2parse').click(function(event){ 
	     event.preventDefault();
 
	     var uName =  $("#txtUsername").val();
	     var pWord =  $("#txtPassword").val();
	 
	          	     
	     if ( uName.length == 0 || pWord.length == 0 )
	    	 {
 
			 $("#result").html("<span style='color:red font-weight: 700'>Please complete the data fields!</span>");

	    	 return;
	    	 }
	     
		 $("#result").html("<span style='color:blue font-weight: 700'>Attempting to login to parse.com</span>");

		 Parse.User.logOut(); // in case someone is logged in
	     Parse.User.logIn(uName , pWord, {
	    	  success: function(user) {
	    	    // Do stuff after successful login.
	    		  loginStatus();
	    	  },
	    	  error: function(user, error) {
	    	    // The login failed. Check error to see why.
	    		  loginStatus();
	    		   
	    	  }
	    	});
	    
 
	     
   }); // click login2parse
    

  
    // executed on page load, from here
    init();
   
      
 });  // ready

function init()
{
	 
	 loginStatus();
}

function loginStatus()
{
	currentUser = Parse.User.current();
    if (currentUser == null )
	 {
	 $("#result").html("<span style='color:red'>No user logged in!</span>");
	 }
else
	 { 
	  logged_in_as();
	 }	
}
    
function logged_in_as() 
{
	 
	 $("#result").html("<span style='color:green'>Logged in as: " + currentUser.getUsername() + " / " + currentUser.getSessionToken() + " </span>"); 
}
   
    
 
