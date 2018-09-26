// Handler for the /api/books/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');
const database = require('../../database');



// handlers for specific books
const bookByID = {};
// /api/books/

// TODO: GET bookByID
// GET
// returns JSON data about the book
bookByID.get = sharedHandlers.notImplemented;

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

// TODO: POST booksDB
// POST
// add new item to books db
booksDB.post = sharedHandlers.notImplemented;
// INSERT INTO books (title, authorFirst, authorLast, publisher, publishedYear, upc, isbn, format, checkedOut, shelfLocation, condition)
//           VALUES  (value,   value,        value, ...)

// PUT
// Not Accepted
booksDB.put = sharedHandlers.methodNotAllowed;

// DELETE
// Not Accepted.
booksDB.delete = sharedHandlers.methodNotAllowed;


// Entry point for the hander
const lib = function (requestData,callback) {

  bookID = requestData.path.split('/')[2];
if(typeof(bookID === 'undefined')){ // Request is for the api/books path itself
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
