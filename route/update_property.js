import express from 'express';
import db from '../util/database.js';
import { update_property } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js';
const router = express.Router();

router.post('/' , update_property , validation_result , async (req,res)=>{

    const {id, name , location , state , city , pincode , total_rooms , status} = req.body;

    const query = "Update pg_properties set name = ? , location = ? , state = ? , city = ? , pincode = ? , total_rooms = ? , status = ? where id = ?";

    db.query(query , [name , location , state , city , pincode , total_rooms , status , id] , (err,result)=>{

        if(err){
            if(err.errno == 1062){
                return res.status(500).json({ status: false, data: false, message: "Name already exists for your pg property" });
            }
            return res.status(500).json({status:false , data:false , message:err});
        }

        return res.status(201).json({status:true , data:true , message:'Property updated successfully'});

    })

})

export default router;