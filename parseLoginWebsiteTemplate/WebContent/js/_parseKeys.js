 
 // Your project keys
var parseAppKey = "XXXXXXXXXXXXXXX";  
var parseJSKey =  "YYYYYYYYYYYYYYY";
var parseRestKey =  "ZZZZZZZZZZZZZ";
 
// {"admin":{"read":true,"write":true}}
 


$(document).ready(function(){ // if this code grows move to a separate file?


	$('#logoutparse').click(function(event){ 
	    event.preventDefault();
	    Parse.User.logOut();
		 $("#result").html("<span style='color:red font-weight: 700'>No user logged in!</span>");
	
	 
		 $("#txtPassword").val("")
	}); // click logoutparse

}); // ready



function inputPresent(data) { // json check if all data values are empty
var result = false;
$.each(data, function(k, v) {
    //display the key and value pair
    console.log(v.length);
    if (v.length > 0 ) 
    	{
    	result = true;
    	return false; // we have data, break out of the loop
    	}
   // alert(k + ' is ' + v);
});
return result;  

};


function isEmail(email) { // minimum?
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

