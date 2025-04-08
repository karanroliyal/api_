import express from 'express';
import CORS from './middleware/cors.js'
import admin_login from './route/super_admin_login.js';
import add from './route/add.js';
import update from './route/update.js';
import delete_ from './route/delete.js';
import {list_owners,list_rooms,list_property} from './route/get_list.js'
import authMiddleware from './auth/authMiddleware.js'
import add_room from './route/add_room.js'
import update_room from './route/update_room.js'
import delete_room from './route/delete_room.js'
import add_property from './route/add_property.js'
import update_property from './route/update_property.js'
import delete_property from './route/delete_property.js'
import pg_owner_login from './route/pg_owner_login.js'
import add_tenant from './route/add_tenant.js'
import update_tenant from './route/update_tenant.js'
import delete_tenant from './route/delete_tenant.js'

const app = express();
const port = 3000;
app.use(CORS);
app.use(express.json());

app.use('/pg-login',pg_owner_login);
app.use('/admin-login',admin_login);

// All authenticated API's belows
app.use(authMiddleware);

app.use('/add',add);
app.use('/update',update);
app.use('/delete_',delete_);
app.use('/',list_owners);
app.use('/',list_rooms);
app.use('/',list_property);
app.use('/add-room',add_room);
app.use('/update-room',update_room);
app.use('/delete-room',delete_room);
app.use('/add-property',add_property);
app.use('/update-property',update_property);
app.use('/delete-property',delete_property);
app.use('/add-tenant',add_tenant);
app.use('/update-tenant',update_tenant);
app.use('/delete-tenant',delete_tenant);

app.listen(port, (err)=>{
    if(err){
        return console.log("Error is ", err)
    }
    console.log(`Server is listning at port ${port}`);

})

