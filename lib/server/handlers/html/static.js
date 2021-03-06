const  sharedHandlers = require('../api/sharedHandlers');
const  fs = require('fs');

function determineContentType(extension){
  switch (extension) {
    case 'json':
      return {'Content-Type':'application/json'};
    case 'js':
      return {'Content-Type':'text/javascript'};
    case 'html':
      return {'Content-Type':'text/html'};
    case 'ico':
      return {'Content-Type':'image/x-icon'};
    case 'css':
      return {'Content-Type':'text/css'};
    case 'png':
      return {'Content-Type':'text/png'};
    case 'jpg':
      return {'Content-Type':'text/jpg'};
    case 'svg':
      return {'Content-Type':'image/svg+xml'}
    case 'svgz':
      return {'Content-Type':'image/svg+xml'}
    default:
      return {'Content-Type':'text/plain'};
  }
}


const reply = {
  statusCode: 724,
  headers : {
    'Content-Type':'text/html',
  },
  payload : `<html><head><title>I am Error</title></head><body>
    <h1>Error 724</h1>
    <h2>This should be unreachable</h2>
    <p>This is the default, 'empty', response. You should not be seeing this.</p>
  </body></html>`,
}

const static = function (requestData,callback) {
  let error = false;
  if(requestData.method.toLowerCase()==="get"){
    let fullpath = requestData.path.toLowerCase();
    const extension = fullpath.indexOf('.')>-1? fullpath.slice(fullpath.indexOf('.')+1) : null ;
    const filename = extension != null ? fullpath.slice(fullpath.lastIndexOf('/')+1) : "index.html" ;
    const path = extension != null ? fullpath.slice(0,fullpath.lastIndexOf('/')) : fullpath;
    fullpath = fullpath != '' ? fullpath : 'index.html';

    //check to see if that file exists in 'static/...<path>.../<filename>'
    try{
      const file = fs.readFileSync(`${__dirname}/../../../static/${fullpath}`,{"encoding":"utf8"});
      reply.headers = determineContentType(extension);
      reply.statusCode = 200;
      reply.payload = file;
      callback(reply);
    }
    //If it has any error retieving the file...
    catch(e){
      reply.statusCode = 404;
      reply.payload = `<html><head><title>I am Error</title></head><body>
        <h1>Error 404</h1>
        <p>File ${fullpath} not found</p>
      </body></html>`;
      callback(reply);
      error=true
    }
  } else {
  console.log('else found')
  console.log(requestData.method)
  sharedHandlers.methodNotAllowed(requestData,callback)
  }
}

module.exports = static;
