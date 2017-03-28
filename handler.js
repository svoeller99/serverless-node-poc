'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.hello = (event, context, callback) => {
  const method = event.requestContext.httpMethod;
  const pathParams = event.pathParameters;
  const body = event.body;

  if (method == 'POST' || method == 'PUT') {
    const user = JSON.parse(body);
    if (method == 'PUT') {
      user.email = pathParams.email;
    }
    const params = {
      TableName: 'usersTable',
      Item: user
    };

    return dynamo.put(params, (err, result) => {
      if (err) {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify(err)
        });
        return;
      }

      callback(null, {
        statusCode: method == 'POST' ? 201 : 200,
        body: JSON.stringify(user)
      });
    });
  }

  if (method == 'GET') {
    const email = pathParams.email;
    const params = {
      TableName: 'usersTable',
      Key: {
        email: email
      }
    };

    return dynamo.get(params, (err, result) => {
      try {
        if (err) {
          callback(null, {
            statusCode: 500,
            body: JSON.stringify(err)
          });
          return;
        }

        if (!result.Item) {
          callback(null, {
            statusCode: 404
          });
        }

        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result.Item)
        });
      } catch (e) {
        callback(e, null);
      }
    });
  }

  if (method == 'DELETE') {
    const email = pathParams.email;
    const params = {
      TableName: 'usersTable',
      Key: {
        email: email
      }
    };

    return dynamo.delete(params, (err, result) => {
      try {
        if (err) {
          callback(null, {
            statusCode: 500,
            body: JSON.stringify(err)
          });
          return;
        }

        callback(null, {
          statusCode: 200
        });
      } catch (e) {
        callback(e, null);
      }
    });
  }

/*
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully! Your method was ' + method,
      input: event,
    })
  };

  callback(null, response);
*/

  callback(null, {
    statusCode: 405
  });

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
