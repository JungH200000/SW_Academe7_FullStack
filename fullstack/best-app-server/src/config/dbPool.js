const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'master', //root
    password: 'tiger', //1234
    database: 'kbdb',
    connectionLimit: 10,
    waitForConnections: true,
});
module.exports = pool;
