import express from 'express';
import db from '../util/database.js';
import { update_room } from '../util/validation.js'
import validation_result from '../middleware/show_validation.js'
const router = express.Router();

router.post('/', update_room, validation_result, async (req, res) => {

    const { room_id, property_id, room_number, type, status } = req.body;

    const query = 'Update rooms set property_id = ? , room_number = ? , type = ? , status = ? where id = ?';

    db.query(query, [property_id, room_number, type, status, room_id], (err, result) => {

        if (err) {
            return res.status(500).json({ status: false, message: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: 'Room not found' });
        }

        return res.status(200).json({ status: true, message: 'Room updated successfully' });

    })

})


export default router;