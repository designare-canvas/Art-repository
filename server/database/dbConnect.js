// const mysql = require('mysql');

// const mysqlConnection = mysql.createConnection({
//     host:process.env.DATABASEURL,
//     user:process.env.DATABASEUSER,
//     password:process.env.DATABASEPASSWORD,
// });

// module.exports = mysqlConnection;

const {Client} = require('pg');

const pgConnection = new Client({
    host:process.env.DATABASEURL,
    user:process.env.DATABASEUSER,
    port:5432,
    password:process.env.DATABASEPASSWORD,
    database:"designare"
})

module.exports = pgConnection;