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

// TODO: GET booksDB
// GET
// returns list off all books. Might be large
booksDB.get = sharedHandlers.notImplemented;

// TODO: POST booksDB
// POST
// add new item to books db
booksDB.post = sharedHandlers.notImplemented;

// PUT
// Not Accepted
booksDB.put = sharedHandlers.methodNotAllowed;

// DELETE
// Not Accepted.
booksDB.delete = sharedHandlers.methodNotAllowed;


// Entry point for the hander
const lib = function (requestData,callback) {
  // TODO: determine if the request is to api/books or api/books/ID and rout appropriately
  bookID = requestData.path.split('/')[2];
  console.log('bookID: ', bookID,);
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
