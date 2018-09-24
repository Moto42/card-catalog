// entry point for the application

const server = require('./lib/server');


//initialize the server
server.startServer('http',3000,(err)=>{console.log(err)});
