// Handler for the /api/books/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');
const database = require('../../database');
const { buildInsertionQuery, buildUpdateQuery, insertGenre, insertSubjects } = require('./apiHelpers');



// handlers for specific stacks
const containerbyID = {};
// /api/statks/

// TODO: GET containerbyID
// GET
// returns JSON data about this container
containerbyID.get = function(requestData,callback,stackID){
  database.query(`SELECT * FROM stacks WHERE id=${stackID}`,function(err,results){

    if(!err){
      let payload = results[0];
      callback({
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload :payload,
      })
    } else {
      callback({
        statusCode: 500,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `Error retrieving information on for stackID ${stackID} from database`,
        },
      })
    }
  });
}

// POST
// Not accepted
containerbyID.put = sharedHandlers.methodNotAllowed;

// PUT // TODO: PUT containerbyID
// update information about this container
containerbyID.post = sharedHandlers.notImplemented;

// TODO: DELETE containerbyID
// DELETE
// remove this container from the database
containerbyID.delete = sharedHandlers.notImplemented;




// handlers for the main books database.
const stacksDB = {};
// /api/books/

// TODO: GET stacksDB
// GET
// returns list off all stacks. Might be large
stacksDB.get = sharedHandlers.notImplemented;

// TODO: POST stacksDB
// POST
// create a new stacks container
stacksDB.post = sharedHandlers.notImplemented;

// PUT
// Not Accepted
stacksDB.put = sharedHandlers.methodNotAllowed;

// DELETE
// Not Accepted.
stacksDB.delete = sharedHandlers.methodNotAllowed;


// Entry point for the hander
const lib = function (requestData,callback) {
  containerID = requestData.path.split('/')[2];
if(typeof(containerID) === 'undefined'){ // Request is for the api/books path itself
    switch (requestData.method) {
      case 'get':
      stacksDB.get(requestData,callback);
      break;
      case 'post':
      stacksDB.post(requestData,callback);
      break;
      case 'put':
      stacksDB.put(requestData,callback);
      break;
      case 'delete':
      stacksDB.delete(requestData,callback);
      break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  } else { // A book was specified
    switch (requestData.method) {
      case 'get':
      containerbyID.get(requestData,callback,containerID);
      break;
      case 'post':
      containerbyID.post(requestData,callback,containerID);
      break;
      case 'put':
      containerbyID.put(requestData,callback,containerID);
      break;
      case 'delete':
      containerbyID.delete(requestData,callback,containerID);
      break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  }
}

module.exports = lib;
