import express from 'express';
import db from '../util/database.js';
import { delete_ } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js';
const router = express.Router();

router.post('/' , delete_ , validation_result , (req , res)=>{

    const {delete_id} = req.body;

    const query = 'Delete from pg_properties where id = ?';

    db.query(query , [delete_id] , (err , result)=>{

        if(err){
            return res.status(500).json({status:false , data:false , message:err});
        }

        return res.status(200).json({status:true , data:true , message:"Property deleted successfully"});

    })

})


export default router