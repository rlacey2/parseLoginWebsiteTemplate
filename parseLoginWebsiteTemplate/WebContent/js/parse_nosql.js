 
var sTotal = 0;

 

// stuff to do when the document is loaded
$(document).ready(function(){
	
 
	Parse.initialize(parseAppKey, parseJSKey);
 
	var msgSaved = "saved to parse.com";
	
    $('#save2parse').click(function(event){ 
	     event.preventDefault();
	     saveNewObject("jsonString",$("#colDATA").val() );
   }); // click save2parse
    
    
    $('#save2parseclass').click(function(event){ 
	     event.preventDefault();     
	     saveNewObject($("#classlNAME").val(),$("#colDATA").val() );

  }); // click save2parseclass
    
    $('#fetchall').click(function(event){ 
	     event.preventDefault();     
	     fetchAll($("#classlNAME").val());
	   
 }); // click fetchall  
    
      
    
    $('#example1').click(function(event){  // from https://parse.com/docs/js_guide
	     event.preventDefault();
  	     $("#resultraw").html( "" ); 
  	     $("#result").html("");
     	 $("#errormsg").html("");
     	 
  
     	var GameScore = Parse.Object.extend("GameScore");
     	var gameScore = new GameScore();
     	 
     	gameScore.set("score", 1337);
     	gameScore.set("playerName", "Sean Plott");
     	gameScore.set("cheatMode", false);
     	
     	
     	 var str = JSON.stringify(gameScore, undefined, 4);         	  
    	 var prettied = syntaxHighlight(str);       	 
 	     $("#resultraw").html(prettied ); 
     	 
     	gameScore.save(null, {
     	  success: function(gameScore) {
     	    // Execute any logic that should take place after the object is saved.
     		 $("#result").html(msgSaved + ", object id = " + gameScore.id);
     	  
     	  },
     	  error: function(gameScore, error) {
     	    // Execute any logic that should take place if the save fails.
     	    // error is a Parse.Error with an error code and description.
     	    alert('Failed to create new object, with error code: ' + error.description);
     	  }
     	});

  }); // click 
	
    
    
    $( '#saved , #fetched' ).on( 'click', 'a', function () {
    	event.preventDefault();
    	
      getObjectID($(this).attr("classname"),$(this).attr("id"));
        
    });//  #saved' click
    
    
    
    function saveNewObject(ObjectClass, data)
    {
	    $("#resultraw").html( "" ); 
  	    $("#result").html("");
     	$("#errormsg").html("");
     	 
     	var Obj = Parse.Object.extend(ObjectClass);
     	var o = new Obj();
     	
     
     	
	    o.save({"data": data}, {
		      success: function(object) {
		    	  
		    	 $("#objectID").val(object.id); 
		    	 $("#result").html(msgSaved + ", object id = " + object.id);
		    	 $("#saved").append("<a  href='' id='" + object.id + "' classname='"+ ObjectClass +  "'>" + ObjectClass + "@" + object.id + "</a><br/>");   
		    	 
		      	 var str = JSON.stringify(data, undefined, 4);         	  
		    	 var prettied = syntaxHighlight(str);       	 
		 	     $("#resultraw").html(prettied ); 
		      }
		    });
    }
   
    function getObjectID(ObjectClass, objectID)
    {
 	     $("#resultraw").html( "" ); 
  	     $("#result").html("");
     	 $("#errormsg").html("");
     	 
    	var Obj = Parse.Object.extend(ObjectClass);
    	var query = new Parse.Query(Obj);
    	query.get(objectID, {
    	  success: function(object) {
    	    // The object was retrieved successfully.
  	    	 $("#objectID").val(object.id); 
 	    	 $("#result").html(msgSaved + ", object id = " + object.id);
 	      	 var str = JSON.stringify(object, undefined, 4);         	  
 	    	 var prettied = syntaxHighlight(str);       	 
 	 	     $("#resultraw").html(prettied ); 
    	  },
    	  error: function(object, error) {
    	    // The object was not retrieved successfully.
    	    // error is a Parse.Error with an error code and description.
    	  }
    	});
    	
    }    
   
    
    function fetchAll(ObjectClass)
    {
    	$("#resultraw").html( "" ); 
    	$("#fetched").html( "" ); 
    	var query = new Parse.Query(ObjectClass);
    	query.find({
    	  success: function(results) {
    	    // results is an array of Parse.Object.
    		  
    		  for (var i in results) {
    			 
 		    	 $("#fetched").append("<a  href='' id='" + results[i].id  + "' classname='"+ ObjectClass +  "'>" + ObjectClass + "@" + results[i].id + "</a><br/>");   

    		  }
    			 
    		  
    	  },

    	  error: function(error) {
    	    // error is an instance of Parse.Error.
    	  }
    	});
    }
 
      
 });  // ready



 