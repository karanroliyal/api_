import express from 'express';
import db from '../util/database.js';
const router = express.Router();

export const list_owners = router.post('/owner-list', (req, res) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'id',
        order = 'DESC',
        name,
        email,
        phone,
        pincode
    } = req.body;

    const offset = (page - 1) * limit;

    // Build filter conditions
    let filterQuery = 'WHERE 1=1';
    const filterParams = [];

    if (name) {
        filterQuery += ' AND name LIKE ?';
        filterParams.push(`%${name}%`);
    }

    if (email) {
        filterQuery += ' AND email LIKE ?';
        filterParams.push(`%${email}%`);
    }

    if (phone) {
        filterQuery += ' AND phone LIKE ?';
        filterParams.push(`%${phone}%`);
    }

    if (pincode) {
        filterQuery += ' AND pincode LIKE ?';
        filterParams.push(`%${pincode}%`);
    }

    // Get total records for pagination
    const countQuery = `SELECT COUNT(*) as total FROM pg_owners ${filterQuery}`;

    db.query(countQuery, filterParams, (err, countResult) => {
        if (err) {
            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords / limit);

        // Get paginated data
        const dataQuery = `SELECT * FROM pg_owners ${filterQuery} ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
        const dataParams = [...filterParams, parseInt(limit), parseInt(offset)];

        db.query(dataQuery, dataParams, (err, result) => {
            if (err) {
                return res.status(500).json({ status: false, message: err.sqlMessage });
            }

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Owners list fetched successfully',
                pagination: {
                    currentPage: parseInt(page),
                    limit: parseInt(limit),
                    totalRecords,
                    totalPages
                }
            });
        });
    });
});

export const list_rooms = router.post('/room-list', (req, res) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'id',
        order = 'DESC',
        status,
        type,
        room_number
    } = req.body;

    const offset = (page - 1) * limit;

    // Build filter query
    let filterQuery = 'WHERE 1=1';
    const filterParams = [];

    if (status) {
        filterQuery += ' AND status = ?';
        filterParams.push(status);
    }

    if (type) {
        filterQuery += ' AND type = ?';
        filterParams.push(type);
    }

    if (room_number) {
        filterQuery += ' AND room_number = ?';
        filterParams.push(room_number);
    }

    // Get total records first
    const countQuery = `SELECT COUNT(*) as total FROM rooms ${filterQuery}`;

    db.query(countQuery, filterParams, (err, countResult) => {
        if (err) {
            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords / limit);

        // Fetch paginated results
        const dataQuery = `SELECT * FROM rooms ${filterQuery} ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
        const dataParams = [...filterParams, parseInt(limit), parseInt(offset)];

        db.query(dataQuery, dataParams, (err, result) => {
            if (err) {
                return res.status(500).json({ status: false, message: err.sqlMessage });
            }

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Rooms list fetched successfully',
                pagination: {
                    currentPage: parseInt(page),
                    limit: parseInt(limit),
                    totalRecords,
                    totalPages
                }
            });
        });
    });
});

export const list_property = router.post('/property-list', (req, res) => {
    const {
        page = 1,
        limit = 10,
        sortBy = 'id',
        order = 'DESC',
        name,
        status,
        total_rooms
    } = req.body;

    const offset = (page - 1) * limit;

    // Build filter query
    let filterQuery = 'WHERE 1=1';
    const filterParams = [];

    if (status) {
        filterQuery += ' AND status = ?';
        filterParams.push(status);
    }

    if (name) {
        filterQuery += ' AND name = ?';
        filterParams.push(name);
    }

    if (total_rooms) {
        filterQuery += ' AND total_rooms = ?';
        filterParams.push(total_rooms);
    }

    // Get total records first
    const countQuery = `SELECT COUNT(*) as total FROM pg_properties ${filterQuery}`;

    db.query(countQuery, filterParams, (err, countResult) => {
        if (err) {
            return res.status(500).json({ status: false, message: err.sqlMessage });
        }

        const totalRecords = countResult[0].total;
        const totalPages = Math.ceil(totalRecords / limit);

        // Fetch paginated results
        const dataQuery = `SELECT * FROM pg_properties ${filterQuery} ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`;
        const dataParams = [...filterParams, parseInt(limit), parseInt(offset)];

        db.query(dataQuery, dataParams, (err, result) => {
            if (err) {
                return res.status(500).json({ status: false, message: err.sqlMessage });
            }

            return res.status(200).json({
                status: true,
                data: result,
                message: 'Rooms list fetched successfully',
                pagination: {
                    currentPage: parseInt(page),
                    limit: parseInt(limit),
                    totalRecords,
                    totalPages
                },
                query: dataQuery
            });
        });
    });
});
