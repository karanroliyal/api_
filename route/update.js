import express from 'express';
import db from '../util/database.js';
import {update_validation} from '../util/validation.js';
import validation_result from '../middleware/show_validation.js'
const router = express.Router();

router.post('/' , update_validation , validation_result ,  async (req,res)=>{

    const { name, email, password, phone, address, state, city, pincode, id } = req.body;

    const query = "UPDATE pg_owners SET name = ?, email = ?, password = ?, phone = ?, address = ?, state = ?, city = ?, pincode = ? WHERE id = ?";

    db.query(query, [name, email, password, phone, address, state, city, pincode, id], (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          return res.status(500).json({ status: false, message: err.sqlMessage });
        }
      
        if (result.affectedRows === 0) {
          return res.status(404).json({ status: false, message: 'PG owner not found' });
        }
      
        return res.status(200).json({ status: true, message: 'Data updated successfully' });
      });

})

export default router;