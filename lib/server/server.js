// Server related logic

// Dependencies
const http          = require('http');
const https         = require('https');
const url           = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const router        = require('./router');
// const sanity        = require('./sanity');

//container for the server
server = {};

const processHandlerResonse = function(res, reply){
	// use the callback defined by the handler or default to 200
	statusCode = typeof(reply.statusCode) == 'number' ? reply.statusCode : 200;


	// determing the contentType and fallback to JSON
	contentType = typeof(reply.headers['Content-Type']) == 'string' ? reply.headers['Content-Type'] : 'json';

	//return the response parts that are content-specific
	let payloadString = '';
	if(contentType == 'application/json'){
		// res.setHeader('Content-Type','application/json');
		payload = typeof(reply.payload) == 'object' ? reply.payload : {};
		payloadString = JSON.stringify(reply.payload);
	}
	if(contentType == 'text/html'){
		// res.setHeader('Content-Type', 'text/html');
		payloadString = typeof(reply.payload) == 'string' ? reply.payload : '';
	}
	if(contentType == 'image/x-icon'){
		// res.setHeader('Content-Type', 'image/x-icon');
		payloadString = typeof(reply.payload) !== 'undefined' ? reply.payload : '';
	}
	if(contentType == 'text/css'){
		// res.setHeader('Content-Type', 'text/css');
		payloadString = typeof(reply.payload) !== 'undefined' ? reply.payload : '';
	}
	if(contentType == 'text/png'){
		// res.setHeader('Content-Type', 'image/png');
		payloadString = typeof(reply.payload) !== 'undefined' ? reply.payload : '';
	}
	if(contentType == 'text/jpg'){
		// res.setHeader('Content-Type', 'image/jpeg');
		payloadString = typeof(reply.payload) !== 'undefined' ? reply.payload : '';
	}
	if(contentType == 'text/plain'){
		// res.setHeader('Content-Type', 'text/plain');
		payloadString = typeof(reply.payload) !== 'undefined' ? reply.payload : '';
	}

	//return the response parts common to all content types
	res.writeHead(statusCode);
	res.end(payloadString);

	//log what path was asked for
	console.log(`Returning this response: ${reply.statusCode}; Content-Type: ${contentType}`);

}

const unifiedServerLogic = function(req, res) {

  //get the url and parse it
	const parsedURL = url.parse(req.url, true, true);

	//get the path from the url
	const path = parsedURL.pathname.replace(/^\/+|\/+$/g,'');;

	// Get Query String as an object
	const query = parsedURL.query;

	// Get the HTTP method
	const method = req.method.toLowerCase();

	// Get the headers as an object
	const headers = req.headers;


  // Get payload if there is any
	const decoder = new StringDecoder('utf-8');
	let buffer = '';
	req.on('data',(data)=>{
		buffer += decoder.write(data);
	})
	req.on('end',()=>{
		buffer += decoder.end();

    const requestData = {
      url     : parsedURL.host,
      path    : path,
      query   : query,
      method  : method,
      headers : headers,
      payload : buffer,
    }
		//request has ended Now do things.

    //Choose the correct handler based on the path specified
		// let chosenHandler = typeof(router[requestData.path]) !== 'undefined' ? router[requestData.path] : router.notFound;
		if(requestData.path.indexOf('api/books') > -1){
			chosenHandler = router['api/books'];

		} else if (requestData.path.indexOf('api/users') > -1) {
			chosenHandler = router['api/users'];

		} else if (requestData.path.indexOf('api/stacks') > -1) {
			chosenHandler = router['api/stacks'];
		} else if (requestData.path.indexOf('api') > -1) {
			chosenHandler = router['notFound'];
		} else if (requestData.method === 'get') {
			chosenHandler = router['html/static'];
		} else {
			chosenHandler = router['notFound'];
		}


    chosenHandler(requestData,function(reply){

      processHandlerResonse(res,reply);

		})
  });
}

server.startServer = function (method,port,callback){

    //decide if this is an http or https server
    switch (method) {
      case 'http':
        http.createServer(unifiedServerLogic).listen(port,()=>{callback(`${method} server listening on port ${port}.`);});
        break;

      case 'https':
        callback('HTTPS server not yet set up.');
        // callback(`${method} server listening on port ${port}.`);
        break;

      default:
      callback( { error: 'incorrect method specified.' });
    }
}

module.exports = server;
