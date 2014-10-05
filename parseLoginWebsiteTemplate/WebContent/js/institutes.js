// stuff to do when the document is loaded

var currentUser = "";

//var keyValidationFields = "#longName,  #shortName, #email";
var keyValidationFields = "#institute-data-form input";
 
//var keyValidationEvents =  "keyup  focusout change      keypress paste focus textInput input";
var keyValidationEvents =  "keyup  focusout change      keypress paste focus textInput input";

var instituteSelectList = ".institutesList"; // a class

$(document).ready(function(){
	
	
	Parse.initialize(parseAppKey, parseJSKey );
 
	var existing;
	var saveFunction =    function(event){  // to pass to the validation extension
		     event.preventDefault();
		     var obId = $("#objectId").val();
		     var data = {};
		     
		     if (obId.length > 0)
		    	 {
		    	 data.objectId = obId;
		    	 existing = true;
		    	 }
		     else
		    	 existing = false;
		     
		     data.name = $("#longName").val();
		     
		     data.shortname =	$("#shortName").val( );
		     data.website =	$("#websiteURL").val(  );
		     data.phone =	$("#phone").val(   );	 	
		     data.email =	$("#email").val( );
		     data.contactname =	$("#contactName").val(  );
		     
		     // do some validation
		      
		    if ( inputPresent(data) )
		    	{
		    	// do specific client side validation here before sending to cloud, check there also
		    	saveInstitute("institutes",data, existing);
		    	}
		    else
		    	{
		    	 $("#errormsg").html("All the inputs appear to be empty!");
		    	}	 
	   };  //  saveFunction
 
     $(document).on('change', instituteSelectList, function() {   
    	 getInstitute($(this).val());
     });
    
     $(document).on('click', '.new', function() { 
    	 institute_new();
    	 calledIfFormClean();
    	 $("#errormsg").html("need to decide if dirty warning presented on clicking new?");
     });    
     
     $(document).on('click', '#requeryInstitutes', function() {   
    	 getInstituteList();			
     });    
 
     $('#institute-data-form').areYouSure( // use a jquery extension plugin to had new behaviour to the form
             {
               message : "Did you forget to save your institute data?",
               saveFunction : saveFunction,
               validationFunction : validateMinimumInputSet,
               dirtyFunction : calledIfFormDirty, 
               cleanFunction : calledIfFormClean
             }
           );
           // Enable save button only if the form is dirty - using events.
     
    // executed on page load, from here
    init();
        
 });  // ready

function init()
{
	 currentUser = Parse.User.current();
     if (currentUser == null )
    	 {
    	 $("#statusline").html("No user logged in!");
    	 }
     else
    	 {
    	 $("#statusline").html("Logged in as: " + currentUser.getUsername());
    	 
    	 getInstituteList();
    	 }  
     institute_new();
}
     
function institute_new()
{
    disablePopup(); // if displayed
	 
    $("#resultraw").html( "" ); 
    $("#result").html("");
    $("#errormsg").html("");
 
    $(instituteSelectList).val('0');
    $("#objectId").val( "");
		$("#longName").val( "" );
		$("#shortName").val( "" );
		$("#websiteURL").val( "" );
		$("#phone").val( "" );	 	
		$("#email").val( "" );
		$("#contactName").val( "" );    

		$("div#instituteData .rw").prop("disabled", false);  // enable everything

     }   	
 
function getInstitute(objectID)
{
	var uiElements = "div#instituteData";
	
    $("#resultraw").html( "" ); 
    $("#result").html("");
	$("#errormsg").html("");
	$("#objectId").val( objectID);
		 
var Obj = Parse.Object.extend("institutes");
var query = new Parse.Query(Obj);
//$(uiElements).attr("disabled", true).addClass("ui-state-disabled");
$(uiElements + " .rw").prop("disabled", true); // disable everything in the form

query.get(objectID, {
  success: function(object) {
    // The object was retrieved successfully.
      	 var str = JSON.stringify(object, undefined, 4);  
      	 
      	 
    	 var prettied = syntaxHighlight(str);       	 
 	     $("#resultraw").html(prettied );  // testing only
 	     
 	     var institute = object.attributes; // get the actual sub object we are interested in
 	     
 		$("#longName").val( institute.name);
 		$("#shortName").val( institute.shortname);
 		$("#websiteURL").val( institute.website);
 		$("#phone").val( institute.phone);	 	
 		$("#email").val( institute.email);
 		$("#contactName").val( institute.contactname);
 		
 		$(uiElements + " .rw").prop("disabled", false); // enable everything in the form that is an input field etc
 		
 		$('#institute-data-form').trigger('reinitialize' ) ;	// mark form as unchanged
 		 		
 		 $(instituteSelectList + '  option[value="' + object.id + '"]').prop('selected', true); // any select with the same object

  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
	  
  }
}); 

}

function getInstituteList()
{

	$(instituteSelectList).find('option').remove();
 	
	// prevent the choose... appearing in the dropdown
	$(instituteSelectList).append("<option value='0'   disabled style='display:none;'>Choose An Institute...</option>");
	
 	 
	var limitValue = $("#perPageInstitutes").val();
	
	var filterStr = $("#longNameFilter").val();
	
	Parse.Cloud.run("getInstitutesList",{"limit" : limitValue, "filter": filterStr}).then(
					  function(dataJsonArray){
						  // have this work done in the cloud as there is a loop there anyway, put not display client generic
						  // i.e. data may not be going to a select, it could be a listview in android, hence client makes presentation decision
						  for (var i = 0, len = dataJsonArray.length; i < len; ++i) {      
							     var institute = dataJsonArray[i];
							     
							       $(instituteSelectList).append("<option value='" + institute.objectId + "'>" + institute.name + "</option>");							   
							         }
					  	    },
					  function(err) {			  				 
					  			    	 $("#errormsg").html("no institutes / change UI to reflect this");
				                     }
	); // run
}
    
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function saveInstitute(ObjectClass, objData ,existing)
{
    $("#resultraw").html( "" ); 
	$("#result").html("");
 	$("#errormsg").html("");
 	 
 	var Obj = Parse.Object.extend(ObjectClass);
 	var o = new Obj();
 
 	
    o.save( objData , {
	      success: function(resultObject) {
	    	  
	    	 var theObject = resultObject.attributes;
	    	 theObject.objectId = resultObject.id;
	    	  
	    	 $("#objectId").val(resultObject.id); 	    
	    	 var obId = resultObject.id;
	    	 
	    	    // is it a new object or
		    	// the longname may have changed and invalidates the option so do updates just in case
		    	if (existing)
		    		{ 
		    	    $(instituteSelectList + '  option[value="' + obId + '"]').prop('selected', true).text(theObject.name);
		    		}
		    	else
		    		{
		    		var newOption = "<option value='" + theObject.objectId + "'>" + theObject.name + "</option>";
		    		$(newOption).insertBefore($(instituteSelectList + " option:eq(1)")) ;     
		    		$(instituteSelectList + " option:eq(1)").prop('selected', true);
		    		}
		    	
		    	$('#institute-data-form').trigger('reinitialize' ) ;	
		    		    	
		    	console.log($(instituteSelectList + '  option[value="' + obId + '"]').text());
		    	console.log(".institutesList  option[value='"  + obId + "']");

	      	 var str = JSON.stringify(theObject, undefined, 4);         	  
	    	 var prettied = syntaxHighlight(str);       	 
	 	     $("#resultraw").html(prettied ); 
	 	 	 	    
	          }, //success
         error: function()
        {
        	 $("#resultraw").html("error saving the object: Are you logged in with relevant permissions?" ); 
        } // error
	    });
} // saveInstitute


var  validateMinimumInputSet = function(event) {  // form specific
     // this is enabling the submit, in reality more complicated validation required
	  // should arrive here after every key press
	var minimumPresent = true;
	// replace(/^\s+|\s+$/g,'')  removes white spaces
	minimumPresent = minimumPresent && $("#longName").val().replace(/^\s+|\s+$/g,'').length > 0;
	minimumPresent = minimumPresent && $("#shortName").val().replace(/^\s+|\s+$/g,'').length > 0;
	minimumPresent = minimumPresent && isEmail($("#email").val().replace(/^\s+|\s+$/g,''));
	
	return minimumPresent;
}; // validateMinimumInputSet

// these need to be coded correctly and css to reflect the state from the are you sure modified logic
var  calledIfFormDirty = function(event) {
 	$('#actionscontainer ul li:gt(1)').hide();  // too much ui flicker
};  // calledIfFormDirty


var  calledIfFormClean = function(event) {	
 	$('#actionscontainer ul li:gt(1)').show();
};  // calledIfFormClean
