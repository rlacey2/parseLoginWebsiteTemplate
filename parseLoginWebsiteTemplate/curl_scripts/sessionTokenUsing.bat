rem returns a user object after login including as sessionToken which can be used as an alias for the username and password
rem paste in the session token below

 
 curl -s -X POST  ^
      -H "X-Parse-Application-Id: XXXXXXXXXXXXXXXXXXXXXX"     ^
      -H "X-Parse-REST-API-Key: YYYYYYYYYYYYYYYYYYYYYYYYYY"       ^
      -H "X-Parse-Session-Token: ZZZZZZZZZZZZZZZZZZZZZZ"                     ^
      -H "Content-Type: application/json"                                       ^
 		-d "{\"skip\":0, \"limit\":6}"                                          ^
        https://api.parse.com/1/functions/Users            
                                                                      
