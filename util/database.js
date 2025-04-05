import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gg'
})

connection.connect((err)=>{
    if(err){
        return console.log("Unable to connect with database ",err)
    }
    console.log("Connected successfully from database : ", connection.threadId)
})

export default connection;