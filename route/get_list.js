import express from 'express';
import db from '../util/database.js';
const router = express.Router();

export const list_owners = router.post('/', (req, res) => {

    const query = 'Select * from pg_owners';

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        return res.status(200).json({ status: true, data: result, message:'Owners list get successfully' });

    })

})


export const list_rooms = router.post('/', (req, res) => {

    const query = 'Select * from rooms';

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        return res.status(200).json({ status: true, data: result, message: 'Rooms list get successfully' });

    })

})



