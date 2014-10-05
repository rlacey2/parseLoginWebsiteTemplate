 
var sTotal = 0;

// stuff to do when the document is loaded

 

var currentUser = "";

$(document).ready(function(){
	
	//  enterprise2013
	Parse.initialize(parseAppKey, parseJSKey );
 
	var msgSaved = "saved to parse.com";
	
    $('#submit').click(function(event){ 
	     event.preventDefault();
	     submit();   
   }); // click submit
    
    
    
    
    
    init();
      
 });  // ready
    

 function init() 
 {
  
	 userDetails();

 }
 
 function userDetails()
 {
	 currentUser = Parse.User.current();
     if (currentUser == null )
    	 {
    	 $("#userDetails").html( "you must log in with required role" ); 
    	 }
     else
    	 {
    	 $("#userDetails").html("Logged in as: " + currentUser.getUsername());
    	 } 	 
 }
   
 function rolesTest1()
 {
	 var role = new Parse.Role(roleName, roleACL);
	 for (var i = 0; i < usersToAddToRole.length; i++) {
	   role.getUsers().add(usersToAddToRole[i]);
	 }
	 for (var i = 0; i < rolesToAddToRole.length; i++) {
	   role.getRoles().add(rolesToAddToRole[i]);
	 }
	 role.save();
 }
 
 function submit()
 {
	    $("#resultraw").html( "" ); 
  	    $("#result").html("");
     	$("#errormsg").html("");
     	
        if (currentUser == null )
   	     {
         	 $("#errormsg").html( "Please Login First!" ); 
   	    }
        

     	
     
     var uRole  =   $("#txtRole").val();
  //   var rights =   $("#rights").val(); // must be boolean
     
     var acLIsTrueSet = ($('#rights').is(":checked"))
     
   //  var acLIsTrueSet = (rights === 'true');
     
     
  // By specifying no write privileges for the ACL, we can ensure the role cannot be altered.
     var roleACL = new Parse.ACL();
     roleACL.setPublicReadAccess(acLIsTrueSet);
     var role = new Parse.Role(uRole, roleACL);
     role.save();
 
 }
 
 function console_error_message(iname, imessage)
 {
     var err = new Error();
     err.name = iname;
     err.message = imessage;
     throw(err); 
 }
    
 
