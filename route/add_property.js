import express from 'express';
import db from '../util/database.js';
import { add_property } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js';
import {getAuthHeader , decodeToken} from '../auth/authMiddleware.js';
const router = express.Router();

router.post('/' , add_property , validation_result , async (req , res)=>{

    const token  = getAuthHeader(req);
    const owner_data = decodeToken(token);

    const { name , location , state , city , pincode , total_rooms , status} = req.body;

    const query = 'Insert into pg_properties(owner_id, name, location, state, city, pincode, total_rooms, status) values(?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query , [owner_data.id , name , location , state , city , pincode , total_rooms , status] , (err , result)=>{

        if(err){
            if(err.errno == 1062){
                return res.status(500).json({ status: false, data: false, message: "Name already exists for your pg property" });
            }
            return res.status(500).json({ status: false, data: false, message: err });
        }

        return res.status(201).json({ status: true, data: true, message: 'Pg property created successfully' });

    })

})

export default router;


