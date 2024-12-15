const mysql=require('mysql')
var pool=mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'123',
    database:'foods',
    multipleStatements:true,
})

module.exports=pool