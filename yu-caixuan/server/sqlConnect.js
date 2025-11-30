const mysql = require("mysql2")
const MySQLObj = {
    host: "localhost",
    user: "root",
    password: "",
    database: "yu-caixuan"
}
// 创建数据库连接池，提高数据库连接效率
const pool = mysql.createPool(MySQLObj);

/**
 * 封装数据库查询函数
 */
function sqlConnect(sql, arr, callback) {
     // 从连接池获取数据库连接
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