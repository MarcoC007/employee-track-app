
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: 'localhost',

    port: 3306,

    user: 'root', 

    password: 'marco',

    database: 'employee_trackDB;'
});

connection.connect();

module.exports = connection;



