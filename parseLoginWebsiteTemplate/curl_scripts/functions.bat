curl -s -X POST                                                           ^
  -H "X-Parse-Application-Id: XXXXXXXXXXXXXXXXXXX"   ^
  -H "X-Parse-REST-API-Key: YYYYYYYYYYYYYYYYYYYYY"     ^
  -H "Content-Type: application/json"                                     ^
      -d "{\"offset\" : 1}"                                               ^
 	  https://api.parse.com/1/functions/hello                              

curl -s -X POST ^
  -H "X-Parse-Application-Id: XXXXXXXXXXXXXXXXXXX"  ^
  -H "X-Parse-REST-API-Key: YYYYYYYYYYYYYYYYYYYYY" 	^
  -H "Content-Type: application/json" 									^
  -d "{\"a\":1, \"b\":99}" 											    ^
  https://api.parse.com/1/functions/swap
  
  curl -s -X POST ^
  -H "X-Parse-Application-Id: XXXXXXXXXXXXXXXXXXX" ^
  -H "X-Parse-REST-API-Key: YYYYYYYYYYYYYYYYYYYYY" 	^
  -H "Content-Type: application/json" 									^
  -d "{\"skip\":0, \"limit\":6}" 										^
  https://api.parse.com/1/functions/Users
  
  
  