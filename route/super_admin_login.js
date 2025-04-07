import express from 'express';
import db from '../util/database.js';
import { body, validationResult } from 'express-validator'
import { encodeToken } from '../auth/authMiddleware.js';

const router = express.Router();

router.post('/',

    [
        body("email").notEmpty().withMessage('Email is required'),
        body("password").notEmpty().withMessage('Password is required'),
    ],

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;


        const query = 'Select * from super_admin where email = ? and password = ?';

        db.query(query, [email, password], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, data: false, message: 'Database error' });
            }
            if (result.length > 0) {
                return res.status(200).json({ success: true, data: true, message: 'Login successfully!', token: encodeToken(result[0]) });
            } else {
                return res.status(404).json({ success: false, data: false, message: 'Invalid email or password' });
            }
        })

    })

export default router;