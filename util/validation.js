import { body, validationResult } from 'express-validator';


export const add_validation =  [
    body("name").notEmpty().withMessage('Name is required').matches(/^[a-zA-Z]+$/).withMessage('Name only include characters'),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body("password").notEmpty().withMessage('Password is required'),
    body("address").notEmpty().withMessage('Address is required'),
    body("state").notEmpty().withMessage('State is required'),
    body("city").notEmpty().withMessage('City is required'),
    body("pincode").notEmpty().withMessage('Pincode is required').matches(/^[0-9]{6}$/).withMessage('Pincode is invalid'),
];