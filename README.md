<<<<<<< HEAD
Parse.com 101

1)	Create an account at https://www.parse.com/#signup (if not done already).

2)	Think about the name and email for your long-term plans/usage.
Create a project; this will generate various keys unique to this project. Never release the “master key” to the public (it may be in testing source files etc.), if you do you will have the hassle of generating another master key and breaking existing code base until updated.

3)	Create a project called “parsetest”.

4)	Create a class called Role, from one of the built-in classes.
Add a role called  "admin" by clicking +row, set its ACL to {"admin":{"read":true,"write":true}}
Next click the blue Users Relation.
This will bring you into the users table, choose add a row and add a user: enter the username, password and email address. This user should now be a member of the admin role.
The classes are listed on the left, click the Roles class and add a "Basic" role.
Hosting on the left will show you your cloud files.
Settings across the top will change the left menu and allow access to the keys etc.

5)	Download the basic start up Eclipse project, unzip and import as an existing project.
Supply download link 
Place your relevant project keys in the WebContent/js/_parseKeys.js file, 3 updates here.
Also place keys in the curl_scripts/functions.bat file, 4 updates here.

6)	Install curl (if not on your platform yet). Beware of platform issues with \versus ^ and " becoming \“ and the need to quote the data payload as in:   -d "{\"a\":65, \"b\":66}". A windows example:
curl 	-s -X POST                                                           		^
  		-H "X-Parse-Application-Id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"   	^
  		-H "X-Parse-REST-API-Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"     	^
  		-H "Content-Type: application/json"                                     	^
     	 	-d "{\"offset\" : 1}"                                               	^
 	  	https://api.parse.com/1/functions/hello  


7)	Install the Parse command line tool as described at: https://parse.com/docs/cloud_code_guide
This tool will allow you to push nodejs code to the cloud. The steps are easy to follow.
However, we will make life easier by configuring a number of external tools in Eclipse to make the deploy cycle easier.

The creation of a new project with the tool creates the framework structure: folders and files for you. The file global.json contains the project keys.
We will see that we can create a new project by copying the entire structure and manually making a number of edits to global.json.

 
{
    "applications": {
        "parse.com app name": {
            "applicationId": "Get this from parse project settings", 
            "masterKey": "Get this from parse project settings"
        }, 
        "_default": {
            "link": "parse.com app name"
        }
    }, 
    "global": {
        "parseVersion": "1.3.0"
    }
}

8)	_
Cloud Code:
The edit/deploy/test cycle to the cloud nodejs can be quite inefficient, try fixing as many bugs as possible and writing extra code with each cycle before deploying.
Time stamps are based on the parse.com servers in UTC, you may need to adjust times according by an offset when displaying on client machines across web time zones. The supplied hello function has been modified to take an offset as a parameter and add it to the server time before returning the time to the client. Another option is to add the offset to returned results before displaying from the client side JavaScript.
Parse run and parse rest success call-backs walk the return data structure differently, result.* versus data.result.*  
parse features
Each instance of an object in a class is given a unique “objectId”, this is a 10 character alphanumeric value (if supplying from a data file import). When referring to the objectId in JavaScript/NodeJS the field is id as in item.id
With a class selected the  More->Set Permissions can be used to improve the security on the class to roles, users, public etc.
curl_scripts
sessionTokenRead.bat   returns a session token to use as a login short cut, after initial login.
sessionTokenRead.bat with the session token call a function to return users.
functions.bat  a number of function calls to show syntax and parameter passing.

=======
parseLoginWebsiteTemplate
=========================

parse.com tutorial using a website.

Parse.com 101

1)	Create an account at https://www.parse.com/#signup (if not done already).

2)	Think about the name and email for your long-term plans/usage.
Create a project; this will generate various keys unique to this project. Never release the â€œmaster keyâ€ to the public (it may be in testing source files etc.), if you do you will have the hassle of generating another master key and breaking existing code base until updated.

3)	Create a project called â€œparsetestâ€.

4)	Create a class called Role, from one of the built-in classes.
Add a role called â€œadminâ€ by clicking +row, set its ACL to {"admin":{"read":true,"write":true}}
Next click the blue Users Relation.
This will bring you into the users table, choose add a row and add a user: enter the username, password and email address. This user should now be a member of the admin role.
The classes are listed on the left, click the Roles class and add a â€œBasicâ€ role.
Hosting on the left will show you your cloud files.
Settings across the top will change the left menu and allow access to the keys etc.

5)	Download the basic start up Eclipse project, unzip and import as an existing project.
Supply download link 
Place your relevant project keys in the WebContent/js/_parseKeys.js file, 3 updates here.
Also place keys in the curl_scripts/functions.bat file, 4 updates here.

6)	Install curl (if not on your platform yet). Beware of platform issues with \versus ^ and â€œ becoming \â€œ and the need to quote the data payload as in:   -d "{\"a\":65, \"b\":66}". A windows example:
curl 	-s -X POST                                                           		^
  		-H "X-Parse-Application-Id: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"   	^
  		-H "X-Parse-REST-API-Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"     	^
  		-H "Content-Type: application/json"                                     	^
     	 	-d "{\"offset\" : 1}"                                               	^
 	  	https://api.parse.com/1/functions/hello  


7)	Install the Parse command line tool as described at: https://parse.com/docs/cloud_code_guide
This tool will allow you to push nodejs code to the cloud. The steps are easy to follow.
However, we will make life easier by configuring a number of external tools in Eclipse to make the deploy cycle easier.

The creation of a new project with the tool creates the framework structure: folders and files for you. The file global.json contains the project keys.
We will see that we can create a new project by copying the entire structure and manually making a number of edits to global.json.

 
{
    "applications": {
        "parse.com app name": {
            "applicationId": "Get this from parse project settings", 
            "masterKey": "Get this from parse project settings"
        }, 
        "_default": {
            "link": "parse.com app name"
        }
    }, 
    "global": {
        "parseVersion": "1.3.0"
    }
}

8)	_
Cloud Code:
The edit/deploy/test cycle to the cloud nodejs can be quite inefficient, try fixing as many bugs as possible and writing extra code with each cycle before deploying.
Time stamps are based on the parse.com servers in UTC, you may need to adjust times according by an offset when displaying on client machines across web time zones. The supplied hello function has been modified to take an offset as a parameter and add it to the server time before returning the time to the client. Another option is to add the offset to returned results before displaying from the client side JavaScript.
Parse run and parse rest success call-backs walk the return data structure differently, result.* versus data.result.* 
parse features
Each instance of an object in a class is given a unique â€œobjectIdâ€, this is a 10 character alphanumeric value (if supplying from a data file import). When referring to the objectId in JavaScript/NodeJS the field is id as in item.id
With a class selected the  More->Set Permissions can be used to improve the security on the class to roles, users, public etc.
curl_scripts
sessionTokenRead.bat   returns a session token to use as a login short cut, after initial login.
sessionTokenRead.bat with the session token call a function to return users.
functions.bat  a number of function calls to show syntax and parameter passing.
>>>>>>> branch 'master' of https://github.com/rlacey2/parseLoginWebsiteTemplate.git
