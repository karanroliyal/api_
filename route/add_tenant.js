import express from 'express';
import db from '../util/database.js';
import { add_tenant } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
import upload from '../middleware/uploads.js'
import { getAuthHeader, decodeToken } from '../auth/authMiddleware.js';
const router = express.Router();

router.post('/', add_tenant, validation_result, upload, async (req, res) => {

    const token = getAuthHeader(req);
    const owner_data = decodeToken(token);

    const {name, phone, email, password, move_in_date, rent_due_date, profile_photo, aadhar, pan, parent_contact, emergency_contact, rent_status, pg_id, room_id } = req.body;

    const query = "Insert into tenants( owner_id, name, phone, email, password, move_in_date, rent_due_date, profile_photo, aadhar, pan, parent_contact, emergency_contact, rent_status, pg_id, room_id ) values (?, ?, ? , ? ,? , ? , ? , ? , ? , ? , ? , ? , ? ,? ,? )";

    db.query( query , [owner_data.id , name, phone, email, password, move_in_date, rent_due_date, profile_photo, aadhar, pan, parent_contact, emergency_contact, rent_status, pg_id, room_id] , (err,result)=>{

        if(err){
            if(err.errno == 1452){
                return res.status(500).json({status:false , data:err , message:"Pg or room not found"});
            }
            return res.status(500).json({status:false , data:err , message:err.sqlMessage});
        }
        
        return res.status(201).json({status:true , message:"Tenant created successfully"});

    })

});

export default router;


// request_body = 
// {
//     "phone":8368145192,
//     "email":"dheeraj@gmail.com",
//     "aadhar":"879789844",
//     "pan":"785425454",
//     "parent_contact":"8368145192",
//     "name":"dheeraj",
//     "emergency_contact":"787545467",
//     "profile_photo":"98263763257632",
//     "rent_status":"Pending",
//     "rent_due_date":"2025-05-01",
//     "move_in_date":"2025-04-03"
// }


