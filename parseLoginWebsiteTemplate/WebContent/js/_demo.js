$(document).ready(function(){

	Parse.initialize(parseAppKey, parseJSKey );

     init();
   
     $('#helloworld').click(function(event){ 
    		
    		event.preventDefault();
    		
    		var offset = (new Date().getTimezoneOffset() / 60) * -1;
    		
    		Parse.Cloud.run('hello', {"offset" : offset}, {
    			success: function(result) {
    			// result is 'Hello world!'
    				 
    				$("#f1").html(    result  );
    			 },
    			error: function(error) {
    				$("#f1").html(    error  );
    			}
    			});
    		
    	}); // hw
     
     $('#swap').click(function(event){ 
 		
 		event.preventDefault();
 		
 		var offset = (new Date().getTimezoneOffset() / 60) * -1;
 		
 		validate_a_b();
 		
 		a = $("input#a").val();
 		b = $("input#b").val();
 		$("#f2").html(    "" );
 		
 	
 		Parse.Cloud.run('swap', {"a" : a, "b" : b}, {
 			success: function(result) {
 			// result is 'Hello world!'
 				 
 				$("#f2").html(    result.a + " and " + result.b  );
 			 },
 			error: function(error) {
 				$("#f2").html(    error  );
 			}
 			});
 		
 	}); // swap   
     
     $('#swaprest').click(function(event){ 
  		
  		event.preventDefault();
  		
  		var offset = (new Date().getTimezoneOffset() / 60) * -1;
  		
  		validate_a_b();
  		a = $("input#a").val();
  		b = $("input#b").val();
  		$("#f2").html(    "" );
  		
  	    var urlTarget = "https://api.parse.com/1/functions/swap"; // uses Master Key on the server
  	     $.ajax({
  	    	    url : urlTarget,
  	    	    type : 'POST',
  	    	    dataType: 'JSON', 
  	    	    contentType : 'application/json',
  	    	    headers : {
  	    	    	'X-Parse-Session-Token' :  Parse.User.current().getSessionToken(), 
  	    	        'X-Parse-Application-Id' : parseAppKey,
  	    	        'X-Parse-REST-API-Key'   : parseRestKey 	       
  	    	    },
  	    	    data :  "{\"a\" : \"" + a +  "\", \"b\" : \"" + b + "\"  }"  
  	    	    	, 	
  	    	    error : function(error) {
  	 				$("#f2").html(    error  );
  	    	    },
  	    	    success : function(data) {
  	 				$("#f2").html(    data.result.a + " and " + data.result.b  );
  	    	    }
  	    	});   		
  	}); // swaprest  
      
     $('#users1').click(function(event){ 		
 		event.preventDefault();
 		
 		$("#testresultstable tbody").html("");
 		cloudFunctionCall(1, "Users", "Users", {"skip" : 0, "limit": 6}); 		
 	}); // user1  
     
     $('#users2').click(function(event){ 
  		
  		event.preventDefault();
  		clientSideCode();
  	}); // user2      
     
     
     /* ******************************************** */
     
     
     

 });  // ready


function validate_a_b()
{
	a = $("input#a").val();
  	b = $("input#b").val();
	if (isNaN(a) || a.length == 0)
		{
			$("input#a").val(11);
			a = 11;
		}
		if (isNaN(b) || b.length == 0)
		{
			$("input#b").val(99);
			b = 99;
		}		
}




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
    
 function cloudFunctionCall(i, desc,fn, jsonData)
 {
	  Parse.Cloud.run(fn,jsonData).then(
			  function(data){			            
				            appendTestRow(i,desc,data);
			  			    },
			  function(err) {			  				 
			  				appendTestRow(i,desc,err.message);
		                     }
		);	 
 }
 

 function appendTestRow(i,desc,data)
 {
	 // data may be atomic or it may be a json object from inside the ajax result = { "result" : "x" } or { "result" : { "a":"b" ...} }
	 // jQuery.isEmptyObject({}); // true
	 // jQuery.isEmptyObject({ foo: "bar" }); // false
	  var str = JSON.stringify(data, undefined, 4);   // tidy for presentation
	  var prettied = syntaxHighlight(str); 
	 
	 var datatype = typeof data;
	 var dataLength = data.length;
	 
	 if (data.length === undefined)
		 { 
		 dataLength = 0;
		 datatype = "json";
         }
	 else
		 {
		 if (Array.isArray(data))
			 {
			 datatype = "json array[" + dataLength + "]";
			 }
		 }

	 //  valign='top'
	 var newrow = "<tr><td>" + i +"</td><td>" + desc + "</td><td>" + datatype +"</td><td><pre>" + prettied + "</pre><td></td>";
 
	 
	 $("#testresultstable tbody") .append( newrow );
 }
 
 function clientSideCode()
 {
		var resultDiv = "#result2";
		$(resultDiv).html("")
 
	 	var user = Parse.Object.extend("User");  // is case sensitive
		var query = new Parse.Query(user);
	 	
		fields = [];
		
		fields.push("username");
		
	   	query.select(fields);  // this field is required in the query response
	 // no method	query.selectKeys(fields); 
		
		query.find().then(function(results) {
		  // each of results will only have the selected fields available.
			console.log("2 " + results.length );
			  var jsonArray = [];

		        for(var i = 0; i < results.length; i++) {
		           jsonArray.push(results[i].toJSON());
		        	 	           
		     	  var str = JSON.stringify(results[i].toJSON(), undefined, 4);   // tidy for presentation
		    	  var prettied = syntaxHighlight(str); 
		           
		    	   $(resultDiv).append( results[i].toJSON().username + "<br><br>");
		    	  
		           $(resultDiv).append( prettied + "<br><br>");
          
		        } 
 
		      //  return jsonArray;		
		},
			 function(err) {
				 console.log(err);
				 return {};
				 }	
		);	 
 }	 
