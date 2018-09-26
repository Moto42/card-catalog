// Helpers for the api

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



// UPDATE Customers
// SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
// WHERE CustomerID = 1;

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



module.exports = lib;
