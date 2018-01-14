var connection = require("./sqlconnect.js");

//A function that will be used to build queries
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}


// Object for all our SQL statement functions.
var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        //send the query back to the callback function
        cb(result);
      });
    },
    // create function to create a burger in the table.
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      //collumns
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
      console.log(vals)
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);//callback
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    delete: function(table, condition, cb) {
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
  
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
  };
  
  // Export the orm object for the model.
  module.exports = orm;
