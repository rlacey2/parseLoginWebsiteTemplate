var moment =require('cloud/moment.min.js'); // this is uploaded (bug server version, i.e. did not work as expected at time)

// functions:
// hello
// swap
// Users

Parse.Cloud.define("hello", function(request, response) {
		
	offset = request.params.offset; // get passed in values
	console.log("10 offset = " + offset);	
	
	serverTime = moment(); 	// get server time
	localClientTime = serverTime.add( offset, 'hour').format(); // adjust
    response.success("Hello world at " + localClientTime );  // return value
});

 

var fn_swap = function(request, response) {
	
	  var jsonObject = { "a": request.params.b, "b": request.params.a };
	  
	  response.success(jsonObject); // return the new object
	}

Parse.Cloud.define("swap", fn_swap);

Parse.Cloud.define("Users", function(req, res){ // collection of users
	 
	  if( ! Parse.User.current() ) {
			console.log("1 Are you logged in?");
		    res.error('Are you logged in?');
	  }
		
		Parse.Cloud.useMasterKey();
		
		var skipValue = req.params.skip ? req.params.skip : 20;
		var filterValue = req.params.filter ? req.params.filter : "";
		
		
		console.log("0 skip = " + skipValue);
		console.log("0 filter = " + filterValue);
		
	 	var user = Parse.Object.extend("User");  // is case sensitive
		var query = new Parse.Query(user);
		query.limit(skipValue);
		 
		if (filterValue.length > 0) // may not be supplied
			{
			query.contains("username",filterValue);
			}
			 
		query.select("username");
		
		query.find().then(function(results) {
		  // each of results will only have the selected fields available.
			console.log("2 " + results.length );
			  var jsonArray = [];

		        for(var i = 0; i < results.length; i++) {
		           jsonArray.push(results[i].toJSON());
		        } 
		        res.success(jsonArray);		
		},
			 function(err) {
				 console.log(err);
				 res.error(err);
				 }	
		);
	}); // Users