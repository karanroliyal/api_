import express from 'express';
import db from '../util/database.js';
import { add_room } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
const router = express.Router();

router.post('/' , add_room , validation_result , async(req,res)=>{

    

})