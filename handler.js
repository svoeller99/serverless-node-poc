'use strict';

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

function respond(callback, statusCode, body) {
  const response = { statusCode };
  if (body) {
    response.body = JSON.stringify(body);
  }
  callback(null, response);
}

function notFound(callback) {
  respond(callback, 404);
}

function ok(body, callback) {
  respond(callback, 200, body);
}

function created(body, callback) {
  respond(callback, 201, body);
}

function internalServerError(error, callback) {
  console.error(error);
  respond(callback, 500, error);
}

module.exports.get = (event, context, callback) => {
  const email = event.pathParameters.email;
  const params = {
    TableName: 'usersTable',
    Key: {
      email: email
    }
  };

  return dynamo.get(params, (err, result) => {
    try {
      if (err) {
        return internalServerError(err, callback);
      }

      if (!result.Item) {
        return notFound(callback);
      }

      ok(result.Item, callback);
    } catch (e) {
      internalServerError(e, callback);
    }
  });
};

module.exports.post = (event, context, callback) => {
  const user = JSON.parse(event.body);
  const params = {
    TableName: 'usersTable',
    Item: user
  };

  return dynamo.put(params, (err, result) => {
    try {
      if (err) {
        return internalServerError(err, callback);
      }

      created(user, callback);
    } catch (e) {
      internalServerError(e, callback);
    }
  });
};

module.exports.put = (event, context, callback) => {
  const user = JSON.parse(event.body);
  user.email = event.pathParameters.email;
  const params = {
    TableName: 'usersTable',
    Item: user
  };

  return dynamo.put(params, (err, result) => {
    try {
      if (err) {
        return internalServerError(err, callback);
      }

      ok(user, callback);
    } catch (e) {
      internalServerError(e, callback);
    }
  });
};

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: 'usersTable',
    Key: {
      email: event.pathParameters.email
    }
  };

  return dynamo.delete(params, (err, result) => {
    try {
      if (err) {
        return internalServerError(err, callback);
      }

      ok(null, callback);
    } catch (e) {
      internalServerError(e, callback);
    }
  });
};
