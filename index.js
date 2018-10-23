// entry point for the application

const server = require('./lib/server');


//initialize the server
server.startServer('http',process.env.PORT,(err)=>{console.log(err)});
