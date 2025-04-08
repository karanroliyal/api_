import express from 'express';
import db from '../util/database.js';
import { update_tenant } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
const router = express.Router();

router.post('/' , update_tenant , validation_result , (req , res)=>{


    const { id, name, phone, email, password, move_in_date, rent_due_date, profile_photo, aadhar, pan, parent_contact, emergency_contact, rent_status, pg_id, room_id } = req.body;

    const query = "Update tenants set name = ? , phone = ? , email = ? , password = ? , move_in_date = ? , rent_due_date = ? , profile_photo = ? , aadhar = ? , pan = ? , parent_contact = ? , emergency_contact = ? , rent_status = ? , pg_id = ? , room_id = ? where id = ?";

    db.query(query , [name, phone, email, password, move_in_date, rent_due_date, profile_photo, aadhar, pan, parent_contact, emergency_contact, rent_status, pg_id, room_id , id] , (err, result)=>{

        if(err){
            return res.status(500).json({status:false , data:false , message:err});
        }

        return res.status(200).json({status:true , data:true , message:'Tenant updated successfully'});

    })

})

export default router;

