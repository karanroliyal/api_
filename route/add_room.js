import express from 'express';
import db from '../util/database.js';
import { add_room } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
const router = express.Router();


router.post('/' , add_room , validation_result , async (req , res)=>{

    const {property_id , room_number , type , status} = req.body;

    const query = 'Insert into rooms(property_id, room_number, type, status) values (?, ?, ?, ?)';

    db.query(query , [property_id , room_number , type , status] , (err,result)=>{

        if(err){
            if(err.errno  == 1452){
                return res.status(500).json({ status: false, data: "Create property first then add rooms into it" ,  message: "Property don't exists" });
            }
            if(err.errno  == 1062){
                return res.status(500).json({ status: false, data: "Same property doesn't have same room number" ,  message: "Room number already exists" });
            }
            return res.status(500).json({ status: false, data: false, message: err.sqlMessage });
        }

        return res.status(201).json({ status: true, data: true, message: 'Room added successfully' });

    })

})

export default router;