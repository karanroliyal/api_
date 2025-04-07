import { body, validationResult } from 'express-validator';


export const add_validation =  [
    body("name").notEmpty().withMessage('Name is required').matches(/^[a-zA-Z ]+$/).withMessage('Name only include characters'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body("password").notEmpty().withMessage('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).withMessage('Password must be 8-15 chars with A-Z, a-z, 0-9 & special char'),
    body("address").notEmpty().withMessage('Address is required'),
    body("phone").notEmpty().withMessage('Phone number is required').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits only'),
    body("state").notEmpty().withMessage('State is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid state'),
    body("city").notEmpty().withMessage('City is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid city'),
    body("pincode").notEmpty().withMessage('Pincode is required').matches(/^[0-9]{6}$/).withMessage('Pincode is invalid'),
];

export const update_validation =  [
    body("name").notEmpty().withMessage('Name is required').matches(/^[a-zA-Z ]+$/).withMessage('Name only include characters'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body("password").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/).withMessage('Password must be 8-15 chars with A-Z, a-z, 0-9 & special char'),
    body("address").notEmpty().withMessage('Address is required'),
    body("phone").notEmpty().withMessage('Phone number is required').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits only'),
    body("state").notEmpty().withMessage('State is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid state'),
    body("city").notEmpty().withMessage('City is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid city'),
    body("pincode").notEmpty().withMessage('Pincode is required').matches(/^[0-9]{6}$/).withMessage('Pincode is invalid'),
    body("id").notEmpty().withMessage('id is required'),
];


export const delete_ = [
    body("delete_id").notEmpty().withMessage('Delete id is required'),
]


