// Helpers for the api

// Dependencies
const database = require('../../database');

// container for the library
const lib = {};


lib.buildInsertionQuery = function (data,table){
  let keys = Object.keys(data);
  let values = keys.map((k)=>data[k]);

  keys = "("+ keys.join(',') +")";
  values = "('"+ values.join("','") +"')";
  const query = "INSERT INTO "+table+" "+ keys+" VALUES "+values+";";
  return query;
}

lib.buildUpdateQuery = function (data,table,id){
  let keys = Object.keys(data);
  let values = keys.map((k)=>data[k]);

  let qstring = keys.map((k)=> `${k} = '${data[k]}'` );
  qstring = qstring.join(',');

  console.log (`SET ${qstring} `);

  const query = `UPDATE ${table}
                 SET ${qstring}
                 WHERE id = ${id}`;
  return query;
}


lib.insertGenre = function(bookID, genre) {
    let data = genre.split(',');
    data.forEach((e)=>{
      const query = `INSERT INTO genre (book, genre) VALUES ('${bookID}', '${e}');`;
      database.query(query);
    });
}

lib.insertSubjects = function(bookID, subjects) {
    let data = subjects.split(',');
    data.forEach((e)=>{
      const query = `INSERT INTO subjects (book, subject) VALUES ('${bookID}', '${e}');`;
      database.query(query);
    });
}



module.exports = lib;
