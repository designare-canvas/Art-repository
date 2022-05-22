// const mysql = require('mysql');

// const mysqlConnection = mysql.createConnection({
//     host:process.env.DATABASEURL,
//     user:process.env.DATABASEUSER,
//     password:process.env.DATABASEPASSWORD,
// });

// module.exports = mysqlConnection;

const {Pool} = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const connectionString=`postgresql://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@${process.env.DATABASEHOST}:5432/${process.env.DATABASENAME}`


const pgConnection = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

module.exports = pgConnection;