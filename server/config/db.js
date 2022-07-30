const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456",
    database: "matcha",
  });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE IF NOT EXISTS users (id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), username VARCHAR(255), email VARCHAR(255), password VARCHAR(255))";
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("User table created");
    });
  });

module.exports = db;