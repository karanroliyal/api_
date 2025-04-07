import express from 'express';
import db from '../util/database.js';
import { add_validation } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
const router = express.Router();

router.post('/', add_validation , validation_result , async (req, res) => {

    const { name, email, password, phone, address, state, city, pincode } = req.body;

    const query = "Insert into pg_owners(name,email,password,phone,address,state,city,pincode) values (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [name, email, password, phone, address, state, city, pincode], (err, result) => {

        if (err) {
            console.log(err.sqlMessage);
            return res.status(500).json({ status: false, data: false, message: err.sqlMessage });
        }
        console.log(result, 'my result');
        return res.status(201).json({ status: true, data: true, message: 'Owner created successfully' });

    })

}
)

export default router;

