const mysql = require('mysql');

const config = {
  host: "sql10.freemysqlhosting.net",
  user: "sql10435461",
  password: "z4jMeufhSB",
  database: "sql10435461",
};

const pool = mysql.createPool(config);

module.exports = pool;
