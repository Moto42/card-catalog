// Handler for the /api/users/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');


// handlers for specific books
const userById = {};
// /api/books/

// TODO: TEST GET userById
// GET
// returns JSON data about the user
userById.get = function(requestData,callback,userID){
  database.query(`SELECT id,nameFirst,NameLast FROM users WHERE id=${userID}`,function(err,results){

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
          message: `Error retrieving information on for userID ${userID} from database`,
        },
      })
    }
  });
}

// POST
// Not accepted
userById.post = sharedHandlers.methodNotAllowed;

// TODO: PUT userById
// PUT
// update information about this user
userById.put = function(requestData,callback,userID){
  //Get stack data
  const containerData = JSON.parse(requestData.payload);

  // Update the entry in the stacks table
  updateQuery = buildUpdateQuery(containerData,'stacks',userID);
  database.query(updateQuery,function(err,results){

    let reply = {};
    if(!err){
      reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `Container ${userID} successfully updated`,
        },
      }()
    } else {
      console.log(err);
      reply = {
        statusCode: 500,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: "An Error has occured updating stack information",
        },
      }
    }
    callback(reply);
  });
}


// TODO: DELETE userById
// DELETE
// remove this user from the database
userById.delete = sharedHandlers.notImplemented;




// handlers for the main books database.
const usersDB = {};
// /api/books/

// TODO: GET usersDB
// GET
// returns list off all users. Might be large
usersDB.get = sharedHandlers.notImplemented;

// TODO: POST usersDB
// POST
// add new item to users db
usersDB.post = sharedHandlers.notImplemented;

// PUT
// Not Accepted
usersDB.put = sharedHandlers.methodNotAllowed;

// DELETE
// Not Accepted.
usersDB.delete = sharedHandlers.methodNotAllowed;


// Entry point for the hander
const lib = function (requestData,callback) {
  userID = requestData.path.split('/')[2];
  console.log('userID: ', userID,);
if(typeof(userID) === 'undefined'){ // Request is for the api/books path itself
    switch (requestData.method) {
      case 'get':
      usersDB.get(requestData,callback);
      break;
      case 'post':
      usersDB.post(requestData,callback);
      break;
      case 'put':
      usersDB.put(requestData,callback);
      break;
      case 'delete':
      usersDB.delete(requestData,callback);
      break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  } else { // A book was specified
    switch (requestData.method) {
      case 'get':
      userById.get(requestData,callback,userID);
      break;
      case 'post':
      userById.post(requestData,callback,userID);
      break;
      case 'put':
      userById.put(requestData,callback,userID);
      break;
      case 'delete':
      userById.delete(requestData,callback,userID);
      break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  }
}

module.exports = lib;
