// Handler for the /api/stacks/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');
const database = require('../../database');
const { buildInsertionQuery, buildUpdateQuery, insertGenre, insertSubjects } = require('./apiHelpers');



// handlers for specific stacks
const containerbyID = {};
// /api/statks/

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
containerbyID.post = sharedHandlers.methodNotAllowed;

// PUT
// update information about this container
containerbyID.put = function(requestData,callback,containerID){
  //Get stack data
  const containerData = JSON.parse(requestData.payload);

  // Update the entry in the stacks table
  updateQuery = buildUpdateQuery(containerData,'stacks',containerID);
  database.query(updateQuery,function(err,results){

    let reply = {};
    if(!err){
      reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `Container ${containerID} successfully updated`,
        },
      }
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


// DELETE
// remove this container from the database
containerbyID.delete = function(requestData,callback,containerID){
  database.query(`DELETE FROM stacks WHERE id = ${containerID}`,function(err,result){
    callback(
      {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {message: `Contaier ${containerID} deleted from database.`},
      }
    )
  });
}

//OPTIONS
// return list of method allowed in cross-site requests.
containerbyID.options= sharedHandlers.notImplemented;


// handlers for the main stacks database.
const stacksDB = {};
// /api/stacks/

// GET
// returns list off all stacks.
stacksDB.get = function(requestData,callback){
  //Get list of all stack containers

  database.query('SELECT id, name, building, floor, room, container FROM stacks',function(err,results){
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

// POST
// create a new stacks container
stacksDB.post = function(requestData,callback){
  //Get stack data
  const stackData = JSON.parse(requestData.payload);

  const insertionQuery = buildInsertionQuery(stackData,'stacks');
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
          message: "An Error has occured inserting new stack into database",
          error: err,
        },
      }
    }
    callback(reply);
  });

}

// PUT
// Not Accepted
stacksDB.put = sharedHandlers.methodNotAllowed;

// DELETE
// Not Accepted.
stacksDB.delete = sharedHandlers.methodNotAllowed;

//OPTIONS
// return list of method allowed in cross-site requests.
stacksDB.options= sharedHandlers.notImplemented;


// Entry point for the hander
const lib = function (requestData,callback) {
  containerID = requestData.path.split('/')[2];
if(typeof(containerID) === 'undefined'){ // Request is for the api/stacks path itself
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
      case 'options':
        stacksDB.options(requestData,callback);
        break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  } else { // A stack was specified
    switch (requestData.method) {
      case 'get':
        containerbyID.get(requestData,callback,containerID);
        break;
      case 'post':
        containerbyID.post(requestData,callback,containerID);
        break;
      case 'put':
      console.log('ypu')
        containerbyID.put(requestData,callback,containerID);
        break;
      case 'delete':
        containerbyID.delete(requestData,callback,containerID);
        break;
      case 'options':
        containerbyID.options(requestData,callback);
        break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  }
}

module.exports = lib;
