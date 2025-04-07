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

    const query = 'Insert into pg_properties(owner_id, name, location, state, city, pincode, total_rooms, status)';

})

export default router;