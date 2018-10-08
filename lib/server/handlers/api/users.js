// Handler for the /api/users/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');


// handlers for specific books
const userById = {};
// /api/books/

// TODO: test GET userById
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

// TODO: test PUT userById
// PUT
// update information about this user
userById.put = function(requestData,callback,userID){
  //Get user data
  const containerData = JSON.parse(requestData.payload);

  // Update the entry in the stacks table
  updateQuery = buildUpdateQuery(containerData,'users',userID);
  database.query(updateQuery,function(err,results){

    let reply = {};
    if(!err){
      reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `User ${userID} successfully updated`,
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
          message: "An Error has occured updating user information",
        },
      }
    }
    callback(reply);
  });
}


// TODO: test DELETE userById
// DELETE
// remove this user from the database
userById.delete = function(requestData,callback,userID){
  database.query(`DELETE FROM users WHERE id = ${userID}`,function(err,result){
    callback(
      {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {message: `User ${userID} deleted from database.`},
      }
    )
  });
}




// handlers for the main books database.
const usersDB = {};
// /api/books/

// TODO: test GET usersDB
// GET
// returns list off all users. Might be large
usersDB.get = function(requestData,callback){
  //Get list of all users

  database.query('SELECT id,nameFirst,NameLast FROM users',function(err,results){
    if(!err){
      const reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : results,
      }
      callback(reply);
    } else {
      console.log(err)
    }
  });
}

// TODO: test POST usersDB
// POST
// add new item to users db
usersDB.post = function(requestData,callback){
  //Get stack data
  const stackData = JSON.parse(requestData.payload);

  const insertionQuery = buildInsertionQuery(stackData,'users');
  database.query(insertionQuery,function(err,results){
    let reply = {};
    if(!err){
      reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `New entry ${stackData.name} successfully added to database`,
        },
      }

    } else {
      reply = {
        statusCode: 500,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: "An Error has occured inserting new user into database",
          error: err,
        },
      }
    }
    callback(reply);
  });

}

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
