// Helpers for the api

// container for the library
const lib = {};


lib.buildInsertionQuery = function (data){
  let keys = Object.keys(data);
  let values = keys.map((k)=>data[k]);

  keys = "("+ keys.join(',') +")";
  values = "('"+ values.join("','") +"')";
  const query = "INSERT INTO books "+ keys+" VALUES "+values+";";
  return query;
}



module.exports = lib;
