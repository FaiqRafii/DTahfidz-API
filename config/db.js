const mysql=require('mysql2')

const connection=mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'dtahfidz'
})

connection.connect((err)=>{
    if(err){
        console.error('Error connecting to the database: '+err.stack);
        return
    }
    console.log('Connected to the MySQL database with id '+ connection.threadId);
})

module.exports=connection