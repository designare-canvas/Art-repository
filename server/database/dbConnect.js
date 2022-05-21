// const mysql = require('mysql');

// const mysqlConnection = mysql.createConnection({
//     host:process.env.DATABASEURL,
//     user:process.env.DATABASEUSER,
//     password:process.env.DATABASEPASSWORD,
// });

// module.exports = mysqlConnection;

const {Client} = require('pg');

const env = process.env.NODE_ENV || 'development';

let connectionString = {
    host: process.env.DATABASEURL,
    user: process.env.DATABASEUSER,
    password:process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME
};

if (env === 'development') {
    connectionString.database = process.env.DATABASENAME;
} else {
    connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
    };
};

const pgConnection = new Client(connectionString);

module.exports = pgConnection;