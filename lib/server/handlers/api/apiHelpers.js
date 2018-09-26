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



module.exports = lib;
