import express from 'express';
import db from '../util/database.js';
import { delete_ } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
const router = express.Router();


router.post('/' , delete_ , validation_result , (req,res)=>{

    const {delete_id} = req.body;

    const query = 'Delete from tenants where id = ?';

    db.query(query , [delete_id] , (err,result)=>{

        if(err){
           return res.status(500).json({status:false ,  message:err});
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Tenant not found' });
        }

        return res.status(200).json({status:true ,  message: 'Tenant removed successfully'});

    })

})


export default router;