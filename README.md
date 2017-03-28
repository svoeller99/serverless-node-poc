# Serverless POC

To deploy:

- `nvm install` - see [this](https://github.com/creationix/nvm/blob/master/README.markdown#install-script) if you don't have nvm yet
- `npm install -g serverless`
- setup AWS creds - see [this](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- `serverless deploy`

To test endpoints (replace `<somewhere>` with your API Gateway resource identifier - `serverless deploy` should spit this out at the command line):

- POST - `curl -X POST -H "Content-Type: application/json" -d '{
    "email": "blah@blah.com",
    "firstName": "someone"
}' "https://<somewhere>.execute-api.us-east-1.amazonaws.com/dev/users"`
- GET - `curl -X GET "https://<somewhere>.execute-api.us-east-1.amazonaws.com/dev/users/blah@blah.com"`
- PUT - `curl -X PUT -H "Content-Type: application/json" -d '{
    "firstName": "Sean",
    "lastName": "Voeller"
}' "https://<somewhere>.execute-api.us-east-1.amazonaws.com/dev/users/blah@blah.com"`
- DELETE - `curl -X DELETE "https://<somewhere>.execute-api.us-east-1.amazonaws.com/dev/users/blah@blah.com"` 
