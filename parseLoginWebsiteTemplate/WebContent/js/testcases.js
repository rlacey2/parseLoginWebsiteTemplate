  
//  https://parse.com/questions/querys-then-function-not-triggering


 $(document).ready(function(){
 
  Parse.initialize(parseAppKey, parseJSKey );
  
  
  // remember these are asynchronous, so results may be out of order
  
  cloudFunctionCall(1, "Logged-in", "getCurrentUserName", {});
  
  cloudFunctionCall(2, "Username", "findUserByName", {"userName" : "rlacey2" });

  cloudFunctionCall(3, "User Count", "countUsers", {});    
  
  cloudFunctionCall(4, "Get Role", "getRoleByName", {  "roleName" : "admin"  });    
  
  cloudFunctionCall(5, "Get Institutes", "getInstitutesList", {"skip" : 0, "limit": 6});     
  
  cloudFunctionCall(6, "Get Institutes(3,4)", "getInstitutesList", {"skip" : 3, "limit": 4});    
  
  cloudFunctionCall(7, "Get Institutes(2,5)", "getInstitutesList", {"skip" : 2, "limit": 5});   
  
  cloudFunctionCall(8, "Get Institutes('Omega2')", "getInstitutesList", {"filter":"Omega2"});   
  
  cloudFunctionCall(9, "Get Institutes('*a2*')", "getInstitutesList", {"filter":"a2"});   
  
  cloudFunctionCall(10, "Get Institutes4(3,4)", "getInstitutesList4", {"skip" : 3, "limit": 4});    
  
  
  clientSideCode()
 
 });  // ready

 
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
	/*	
	    Parse.Cloud.useMasterKey();
		var skipValue = req.params.skip ? req.params.skip : 0;
		
		var filterValue = req.params.filter ? req.params.filter : "";
		var limitValue = req.params.limit ? req.params.limit : 20;
		
		var fieldsRequired = req.params.fields ? req.params.fields : "";
		
		console.log("0 skip = " + skipValue);
		console.log("0 filter = " + filterValue);
	*/	
	 	var instit = Parse.Object.extend("institutes");  // is case sensitive
		var query = new Parse.Query(instit);
	/*
	 	query.limit(limitValue);
	 	query.skip(skipValue);
		 
		if (filterValue.length > 0) // is there a filter on the name to match a substring
			{
			query.contains("name",filterValue); // filter on a specific name
			}	 
	*/	
		
		fields = [];
		
		fields.push("name");
		
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
		           
		    	   $(resultDiv).append( results[i].toJSON().name + "<br><br>");
		    	  
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
  