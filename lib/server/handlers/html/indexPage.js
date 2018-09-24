// Handler for the server index.


const indexHandler = function(requestData,callback){

  const reply = {
    statusCode: 200,
    headers : {
      'Content-Type':'text/html',
    },
    payload : '<html><head><title>Index</title></head><body><h1>Index</h1></body></html>'
  }

  callback(reply);
}

module.exports = indexHandler;
