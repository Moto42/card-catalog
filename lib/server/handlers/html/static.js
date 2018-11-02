const  sharedHandlers = require('../api/sharedHandlers');

const static = function (requestData,callback) {
  if(requestData.method.toLowerCase()==="get"){
    const fullpath = requestData.path;

    const reply = {
      statusCode: 200,
      headers : {
        'Content-Type':'text/html',
      },
      payload : `<html><head><title>Index</title></head><body>
      Static delivery working for this page! <br>
      Path requested: ${path}
      </body></html>`,
    }
    callback(reply);
  } else {
  console.log('else found')
  console.log(requestData.method)
  sharedHandlers.methodNotAllowed(requestData,callback)
  }
}

module.exports = static;
