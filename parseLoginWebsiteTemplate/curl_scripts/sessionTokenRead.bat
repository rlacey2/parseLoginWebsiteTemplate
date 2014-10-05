rem returns a user object after login including as sessionToken which can be used as an alias for the username and password
                                                                      
curl -s -H "X-Parse-Application-Id: XXXXXXXXXXXXXXXXXXXX"   ^
        -H "X-Parse-REST-API-Key: YYYYYYYYYYYYYYYYYYYYYYYYY"     ^
        -H "Content-Type: application/json"                                     ^
        --data-urlencode "username=rlacey2"                                     ^
        --data-urlencode "password=******"                                      ^
        -G https://api.parse.com/1/login  