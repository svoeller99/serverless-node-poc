# Serverless POC

- npm install -g serverless
- setup AWS creds - see https://serverless.com/framework/docs/providers/aws/guide/credentials/
- serverless deploy
- POST - `curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: 2563414b-5015-b37a-da2c-74d9522ad688" -d '{
    "email": "blah@blah.com",
    "firstName": "someone"
}' "https://78j2nuye7h.execute-api.us-east-1.amazonaws.com/dev/users"`
- GET - `curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: eb2a9c91-56b3-1be4-f452-e69b3599b47e" "https://78j2nuye7h.execute-api.us-east-1.amazonaws.com/dev/users/blah@blah.com"`
- PUT - `curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -H "Postman-Token: e11710b9-32c4-1039-881f-3cc0584f7e03" -d '{
    "firstName": "Sean",
    "lastName": "Voeller"
}' "https://78j2nuye7h.execute-api.us-east-1.amazonaws.com/dev/users/blah@blah.com"`
- DELETE - `curl -X DELETE -H "Cache-Control: no-cache" -H "Postman-Token: 23d0193c-970e-0312-16c4-a985caca1e46" "https://78j2nuye7h.execute-api.us-east-1.amazonaws.com/dev/users/blah@blah.com"` 
