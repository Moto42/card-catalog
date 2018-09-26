// Handler for the /api/books/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');
const database = require('../../database');
const { buildInsertionQuery } = require('./apiHelpers');



// handlers for specific books
const bookByID = {};
// /api/books/

// GET
// returns JSON data about the book
bookByID.get = function(requestData,callback,bookID){
  console.log('herp')

  database.query(`SELECT * FROM books WHERE id=${bookID}`,function(err,results){
    if(!err){
      callback({
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : results,
      })
    } else {
      callback({
        statusCode: 500,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `Error retrieving information on for bookID ${bookID} from database`,
        },
      })
    }
  });
}

// POST
// Not accepted
bookByID.post = sharedHandlers.methodNotAllowed;

// TODO: PUT bookByID
// PUT
// update information about this book
bookByID.put = sharedHandlers.notImplemented;

// TODO: DELETE bookByID
// DELETE
// remove this book from the database
bookByID.delete = sharedHandlers.notImplemented;




// handlers for the main books database.
const booksDB = {};
// /api/books/


// GET
// returns list off all book titles. Might get large
booksDB.get = function(requestData,callback){
  //Get list of all book titles

  database.query('SELECT title, authorFirst, authorLast, publishedYear FROM books',function(err,results){
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
// add new item to books db
booksDB.post = function(requestData,callback){
  //Get book data
  const bookData = JSON.parse(requestData.payload);

  insertionQuery = buildInsertionQuery(bookData,'books');
  database.query(insertionQuery,function(err,results){
    let reply = {};
    if(!err){
      reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `New entry ${bookData.title} successfully added to database`,
        },
      }
    } else {
      reply = {
        statusCode: 500,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: "An Error has occured inserting new book into database",
          'error returned from database': err,
        },
      }
    }
    callback(reply);
  });

}

// PUT
// Not Accepted
booksDB.put = sharedHandlers.methodNotAllowed;

// DELETE
// Not Accepted.
booksDB.delete = sharedHandlers.methodNotAllowed;


// Entry point for the hander
const lib = function (requestData,callback) {

  bookID = requestData.path.split('/')[2];
  console.log(typeof(bookID))
  if(typeof(bookID) === 'undefined'){ // Request is for the api/books path itself
    switch (requestData.method) {
      case 'get':
      booksDB.get(requestData,callback);
      break;
      case 'post':
      booksDB.post(requestData,callback);
      break;
      case 'put':
      booksDB.put(requestData,callback);
      break;
      case 'delete':
      booksDB.delete(requestData,callback);
      break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  } else { // A book was specified
    switch (requestData.method) {
      case 'get':
      bookByID.get(requestData,callback,bookID);
      break;
      case 'post':
      bookByID.post(requestData,callback,bookID);
      break;
      case 'put':
      bookByID.put(requestData,callback,bookID);
      break;
      case 'delete':
      bookByID.delete(requestData,callback,bookID);
      break;
      default:
      sharedHandlers.methodNotAllowed(requestData,callback);
    }
  }
}

module.exports = lib;
