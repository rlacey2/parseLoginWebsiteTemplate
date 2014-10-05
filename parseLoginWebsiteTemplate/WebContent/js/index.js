 // index = login
var sTotal = 0;

// stuff to do when the document is loaded

 

var currentUser = "";

$(document).ready(function(){
	
	//  enterprise2013
	Parse.initialize(parseAppKey, parseJSKey );
 
	var msgSaved = "saved to parse.com";
	
    $('#login2parse').click(function(event){ 
	     event.preventDefault();
 
	  	    $("#result").html("");
	     	 
	
	     	currentUser = Parse.User.current();
	     	if (currentUser) {
	     		$("#resultraw").html( "logged in already!" ); 
	     		return;
	     	} else {
	     	    // show the signup or login page
	     	}
	     	  
	     var uName =  $("#txtUsername").val();
	     var pWord =  $("#txtPassword").val();
	          	     
	     if ( uName.length == 0 || pWord.length == 0 )
	    	 {
	    	 $("#result").html("<h1>Please complete the data fields!</h1>");
	    	 return;
	    	 }
	       
	     $("#result").html("<h1>Attempting to login to parse.com</h1>");
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
	 $("#result").html("<h1>No user logged in!</h1>");
	 }
else
	 {
	 $("#result").html("<h1>Logged in as: " + currentUser.getUsername() + "</h1>");
	 }	
}
    
   
    
 
