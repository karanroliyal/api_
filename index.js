import express from 'express';
import CORS from './middleware/cors.js'
import db from './util/database.js'

const app = express();
const port = 3000;

app.use(CORS);

app.listen(port, (err)=>{
    if(err){
        return console.log("Error is ", err)
    }
    console.log(`Server is listning at port ${port}`);
})