  
//  https://parse.com/questions/querys-then-function-not-triggering



function a(obj){
   if (obj  !== null )
   {
   for(var key in obj){

    if (obj.hasOwnProperty(key))  
        {
          console.log(key);
          a(obj[key])
        }
   /*   
      if ( typeof obj === 'array object')
      {
          console.log("array");
          a(obj[key])
      }
      else
       if ( typeof obj === 'object')
        {
          console.log(key);
          a(obj[key])
        }
*/
   }
  }
 }

function iterate_object_keys(dataObject)
{

  if (dataObject  !== null && typeof dataObject === 'object')
    
{
   for (var propertyName in dataObject) {
    
             if ( dataObject[propertyName] instanceof Array  )
           {

for (var offset in dataObject[propertyName]) {
}

            
            iterate_object_keys(dataObject[propertyName][offset]);
           }
           else
           if (typeof dataObject[propertyName] === 'object' )
           {
console.log(propertyName);
            
            iterate_object_keys(dataObject[propertyName]);
           }
           

          // else
          //     console.log(propertyName);

           
 
      }
   }
}




  function createJSON() {
         jsonObj = [];
      
          var id = 1;
          var email ="dddd@fff.com";

          item = {}
          item ["title"] = id;
          item ["email"] = email;

        

          jsonObj.push(item);

          jsonString = JSON.stringify(jsonObj);
          
          console.log(jsonString);
  }
  

  function iterate_json(json_data)
  {
       for(var i in json_data.roles)
    { 
       var role = json_data.roles[i];  
      
       console.log(role);
       console.log(json_data.roles[i].role);
 
    }
  }

     function iterate_roles(json_data)
  {
       for(var i in json_data.roles)
    { 
       var role = json_data.roles[i];  
      
       console.log(role);

       console.log(json_data.roles[i].role);
       console.log(json_data.roles[i].status);


       // fetch role 

    }
    }

    /*
    var result = [];


      for (var propertyName in json_data.roles) {
           console.log(propertyName);
             for (var propertyName2 in json_data.roles[propertyName]) {
                   console.log(propertyName2);
      }
      }
    

 



    for (var key in json_data.roles) {
        console.log("Key: " + key);
        console.log("Value: " + json_data.roles[key].pro);
      }

     jsonString = JSON.stringify(result);
     console.log(jsonString);
*/
  

   var jsObject =    { "roles" : [  {   "role": "admin", "status" : true  }, {  "role": "admin2" , "status" : false }, {   "role": "admin3", "status" : true  } ]};

  // createJSON();
  //iterate_json(jsObject)
  //console.log(jsObject);

  //iterate_roles(jsObject);

  console.log('Abc054_34-bd'.replace(/[^a-zA-Z0-9_-]/g,'')); // Abc054_34-bd

  console.log("\"sssss\"".replace(/\\"/g,''));

  console.log("{ \"a\":\"b\", \"c\" : [ {\"e\":\"f\"}, {\"g\":\"h\"}]}".replace(/\\"/g,'cccc'));
 console.log("{ \"a\":\"b\", \"c\" : [ {\"e\":\"f\"}, {\"g\":\"h\"}]}".replace("a",'cccc'));
   
  //a(jsObject);