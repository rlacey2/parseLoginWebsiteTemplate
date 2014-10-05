 
$(document).ready(function(){
	
    $('#formatNow').click(function(event){ 
    	 event.preventDefault();
    	
        $("#resultraw").html( "" ); 
  	    $("#result").html("");
     	$("#errormsg").html("");
 	
     	var  ddd = $("#colDATA").val();
     	var  xxx = ddd.replace(/\\"/g,'');  
        var  yyy = jQuery.parseJSON( xxx );
    	
      	var str = JSON.stringify(yyy, undefined, 4);         	  
    	var prettied = syntaxHighlight(str);       	 
 	    $("#resultraw").html(prettied ); 
 	     
  }); // click formatNow
    
    
    $('#clearNow').click(function(event){ 
   	   event.preventDefault();
   	
       $("#resultraw").html( "" ); 
 	    $("#result").html("");
    	$("#errormsg").html("");
    	
    	$("#colDATA").val("");
   	
   	
    
	     
	     
 }); // click formatNow
      
 });  // ready

 
 
   
    
 
