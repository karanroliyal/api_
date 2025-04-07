import express from 'express';
import CORS from './middleware/cors.js'
import admin_login from './route/super_admin_login.js';
import add from './route/add.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(CORS);

app.use('/admin-login',admin_login);
app.use('/add',add);

app.listen(port, (err)=>{
    if(err){
        return console.log("Error is ", err)
    }
    console.log(`Server is listning at port ${port}`);
})