const mysql = require("mysql2")
const MySQLObj = {
    host: "localhost",
    user: "root",
    password: "",
    database: "yu-caixuan"
}

const pool = mysql.createPool(MySQLObj);

function sqlConnect(sql, arr, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        connection.query(sql, arr, (err, result) => {
            // 释放连接
            connection.release();
            if (err) {
                console.log(err);
                return;
            }
            callback(result)
        })
    })
}

module.exports = sqlConnect