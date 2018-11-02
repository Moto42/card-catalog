const  sharedHandlers = require('../api/sharedHandlers');
const  fs = require('fs');

const reply = {
  statusCode: 200,
  headers : {
    'Content-Type':'text/html',
  },
  payload : `<html><head><title>I am Error</title></head><body>
    <h1>Error 724</h1>
    <p>This should be unreachable</p>
  </body></html>`,
}

const static = function (requestData,callback) {
  if(requestData.method.toLowerCase()==="get"){
    let fullpath = requestData.path.toLowerCase();
    const extension = fullpath.indexOf('.')>-1? fullpath.slice(fullpath.indexOf('.')+1) : null ;
    const filename = extension != null ? fullpath.slice(fullpath.lastIndexOf('/')+1) : "index.html" ;
    const path = extension != null ? fullpath.slice(0,fullpath.lastIndexOf('/')) : fullpath;
    fullpath = fullpath != '' ? fullpath : index.html;

    //check to see if that file exists in 'static/...<path>.../<filename>'
    try{
      const file = fs.readFileSync(`${__dirname}/../../../static/${fullpath}`,{"encoding":"utf8"});
    } catch(e){
      reply.statusCode = 404;
      payload = `There was an error retrieving the file at ${fullpath}`;
      callback(reply);
      return;// TODO: NEXT It's returning fromm the catch(e) function, not the static() func...
    }

    callback(reply);
  } else {
  console.log('else found')
  console.log(requestData.method)
  sharedHandlers.methodNotAllowed(requestData,callback)
  }
}

module.exports = static;
