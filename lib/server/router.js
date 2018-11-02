//The router for the Server
// In it's own file for easy editing and my sanity

// Put the path as the key in the router object, and the hander function as the value therof.
//  "Path/Requested" : HandlerFunction,

const router = {

  // HTML handlers
  // '' : require('./handlers/html/indexPage'), //Depricated, Static HTML handler is the new default.
  'html/static' : require('./handlers/html/static'),

  // API handlers
  'api/books' : require('./handlers/api/books'),
  'api/stacks': require('./handlers/api/stacks'),
  'api/users': require('./handlers/api/users'),

  //Not Found Handler
  'notFound' : require('./handlers/notFound'),
}

module.exports = router;
