// Handler for the /api/books/ path.

// Dependencies
const sharedHandlers = require('./sharedHandlers');
const database = require('../../database');
const { buildInsertionQuery, buildUpdateQuery, insertGenre, insertSubjects } = require('./apiHelpers');



// handlers for specific books
const bookByID = {};
// /api/books/

// GET
// returns JSON data about the book
bookByID.get = function(requestData,callback,bookID){
  database.query(`SELECT * FROM books WHERE id=${bookID}`,function(err,results){

    if(!err){
      let payload = results[0];
      database.query(`SELECT genre FROM genre WHERE id=${bookID}`,(err,results)=>{
        if(!err) payload.genre=results;
        database.query(`SELECT subject FROM subjects WHERE id=${bookID}`,(err,results)=>{
          if(!err)payload.subjects=results;
          callback({
            statusCode: 200,
            headers : {
              'Content-Type':'application/json',
            },
            payload :payload,
          })
        });
      });

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


// PUT
// update information about this book
bookByID.put = function(requestData,callback,bookID){
  //Get book data
  const bookData = JSON.parse(requestData.payload);

  // Get genre info from the payload
  let genre = '';
  if(bookData.genre){
    genre = bookData.genre;
    delete bookData.genre;
  }
  // get subject info from the payload
  let subjects = '';
  if(bookData.subjects){
    subjects = bookData.subjects;
    delete bookData.subjects;
  }

  // Update the entry in the books table
  updateQuery = buildUpdateQuery(bookData,'books',bookID);
  database.query(updateQuery,function(err,results){

    // update the genres table if called for...
    if(genre !== ''){
      //delete all genre from the table
      database.query(`DELETE FROM genre WHERE book =${bookID}`,function(err,results){
        //should be empty now
        // enter new genre info, if genre is not '!EMPTY'
        if(genre !== '!EMPTY') insertGenre(bookID,genre);
      })
    }

    if(subjects !== ''){
      //delete all subjects from the table
      database.query(`DELETE FROM subjects WHERE book =${bookID}`,function(err,results){
        //should be empty now
        // enter new subjects info, if subjects is not '!EMPTY'
        if(subjects !== '!EMPTY') insertSubjects(bookID,subjects);
      })
    }

    let reply = {};
    if(!err){
      reply = {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: `BookID ${bookData.title} successfully updated`,
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
          message: "An Error has occured updating book information",
        },
      }
    }
    callback(reply);
  });
}

// DELETE
// remove this book from the database
bookByID.delete = function(requestData,callback,bookID){
  database.query(`DELETE FROM books WHERE id = ${bookID}`,function(err,result){
    callback(
      {
        statusCode: 200,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {message: `BookID ${bookID} deleted from database.`},
      }
    )
  });
}


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
  console.log(bookData);
  let genre = '';
  if(bookData.genre || bookData.genre === ''){
    genre = bookData.genre;
    delete bookData.genre;
  }
  let subjects = '';
  if(bookData.subjects || bookData.subjects === ''){

    subjects = bookData.subjects;
    delete bookData.subjects;
  }

  const insertionQuery = buildInsertionQuery(bookData,'books');
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

      if(genre !== '') insertGenre(results.insertId,genre);
      if(subjects !== '') insertSubjects(results.insertId,subjects);


    } else {
      console.log('--------------An error has occured--------\n',err);
      reply = {
        statusCode: 500,
        headers : {
          'Content-Type':'application/json',
        },
        payload : {
          message: "An Error has occured inserting new book into database",
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
