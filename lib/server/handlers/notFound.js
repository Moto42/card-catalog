// Not Found HandlerFunction

const notFound = function (requestData,callback) {

  const reply = {
    statusCode: 200,
    headers : {
      'Content-Type':'text/html',
    },
    payload : '<html><head><title>Index</title></head><body><h1>404</h1><h2>Requested path not found</h2></body></html>',
  }

  callback(reply);
}

module.exports = notFound;
