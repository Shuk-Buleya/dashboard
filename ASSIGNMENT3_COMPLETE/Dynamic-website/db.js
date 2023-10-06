const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'volunteermanagementsystem'
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to database: ' + error.message);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
