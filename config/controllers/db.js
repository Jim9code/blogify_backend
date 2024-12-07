const mysql  = require('mysql2')
// db config
const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl:false
  });
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Connected to DB on ${connection.threadId}`);
    }
  });

  module.exports = pool