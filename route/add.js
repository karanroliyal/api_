import express from 'express';
import { validationResult } from 'express-validator';
import db from '../util/database.js';
import {add_validation} from '../util/validation.js'
const router = express.Router();

router.post('/',add_validation,async (req, res) => {

        const {name,email,password,phone,address,state,city,pincode} = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const query = "Insert into pg_owners(name,email,password,phone,address,state,city,pincode) values (?, ?, ?, ?, ?, ?, ?, ?)";

        db.query(query , [name,email,password,phone , address,state,city,pincode] , (err,result)=>{

            if(err){
                console.log(err.sqlMessage);
                return res.status(404).json({status:false,data:false,message:err});
            }
            console.log(result,'my result');
            return res.status(200).json({status:true,data:true,message:'Data inserted successfully'});

        })

    }
)

export default router;

