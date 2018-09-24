// Handler responses shared among all the endpoints.


const lib = {};


// 4xx Client Errors

// 405 - Method Not Allowed
lib.methodNotAllowed = function(requestData,callback) {

  const reply = {
    statusCode: 405,
    headers : {
      'Content-Type':'application/json',
    },
    payload : {"error": `HTTP method '${requestData.method}' not valid for ${requestData.url}/${requestData.path}`},
  }

  callback(reply);
}



// 5xx Internal Server Errors

// 501 - Not Implemented
lib.notImplemented = function(requestData,callback) {

  const reply = {
    statusCode: 501,
    headers : {
      'Content-Type':'application/json',
    },
    payload : {"error": "this is not yet implemented"},
  }

  callback(reply);
}

module.exports = lib;
