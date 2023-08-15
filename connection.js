const mysql = require('mysql')

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'my-web'
})

module.exports = db