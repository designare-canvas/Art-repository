const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:process.env.DATABASEURL,
    user:process.env.DATABASEUSER,
    password:process.env.DATABASEPASSWORD,
});

module.exports = mysqlConnection;