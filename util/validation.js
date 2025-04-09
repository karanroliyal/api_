import { body } from 'express-validator';


export const add_validation =  [
    body("name").notEmpty().withMessage('Name is required').matches(/^[a-zA-Z ]+$/).withMessage('Name only include characters').isLength({ min: 3, max: 30 }).withMessage("Owner name must be between 3 and 30"),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body("password").notEmpty().withMessage('Password is required').isStrongPassword().withMessage('Password must be 8-15 chars with A-Z, a-z, 0-9 & special char'),
    body("address").notEmpty().withMessage('Address is required').isLength({min:1 , max:100}).withMessage('Address must be between 1 and 100'),
    body("phone").notEmpty().withMessage('Phone number is required').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits only'),
    body("state").notEmpty().withMessage('State is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid state'),
    body("city").notEmpty().withMessage('City is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid city'),
    body("pincode").notEmpty().withMessage('Pincode is required').isPostalCode('IN').withMessage('Pincode is invalid'),
];

export const update_validation =  [
    body("name").notEmpty().withMessage('Name is required').matches(/^[a-zA-Z ]+$/).withMessage('Name only include characters').isLength({ min: 3, max: 30 }).withMessage("Owner name must be between 3 and 30"),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body("password").isStrongPassword().withMessage('Password must be 8-15 chars with A-Z, a-z, 0-9 & special char'),
    body("address").notEmpty().withMessage('Address is required').isLength({min:1 , max:100}).withMessage('Address must be between 1 and 100'),
    body("phone").notEmpty().withMessage('Phone number is required').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits only'),
    body("state").notEmpty().withMessage('State is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid state'),
    body("city").notEmpty().withMessage('City is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid city'),
    body("pincode").notEmpty().withMessage('Pincode is required').isPostalCode('IN').withMessage('Pincode is invalid'),
    body("id").notEmpty().withMessage('id is required'),
];

export const delete_ = [
    body("delete_id").notEmpty().withMessage('Delete id is required'),
]

export const add_room = [
    body("property_id").notEmpty().withMessage('Property id is required'),
    body("room_number").notEmpty().withMessage('Room number is required').matches(/^[0-9]+$/).withMessage('Room number is invalid'),
    body("type").notEmpty().withMessage('Room type is required').matches(/^[0-9]+$/).withMessage('Room type is invalid'),
    body("status").notEmpty().withMessage('Room status is required').matches(/^(Available|Occupied|Under Maintenance)$/).withMessage('Room status is invalid')
]

export const update_room = [
    body("room_id").notEmpty().withMessage("Room id is required"),
    body("property_id").notEmpty().withMessage('Property id is required'),
    body("room_number").notEmpty().withMessage('Room number is required').matches(/^[0-9]+$/).withMessage('Room number is invalid'),
    body("type").notEmpty().withMessage('Room type is required').matches(/^[0-9]+$/).withMessage('Room type is invalid'),
    body("status").notEmpty().withMessage('Room status is required').matches(/^(Available|Occupied|Under Maintenance)$/).withMessage('Room status is invalid')
]

export const add_property = [
    body("name").notEmpty().withMessage('Property name is required').matches(/^[A-Za-z ]+$/).withMessage('Property name only includes characters').isLength({ min: 3, max: 40 }).withMessage('Property name must be between 3 and 40 characters long'),
    body("location").notEmpty().withMessage('Location is required').isLength({min:1 , max:100}).withMessage('Location must be between 1 and 100'),
    body("state").notEmpty().withMessage('State is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid state'),
    body("city").notEmpty().withMessage('City is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid city'),
    body("pincode").notEmpty().withMessage('Pincode is required').isPostalCode('IN').withMessage('Pincode is invalid'),
    body("total_rooms").notEmpty().withMessage('Total rooms is required').matches(/^[0-9]+$/).withMessage("Only number is allowed in total rooms"),
    body("status").matches(/^(Active|Under Maintenance|Closed)$/).withMessage('Property status is invalid')
]

export const update_property = [
    body("id").notEmpty().withMessage("Property id is required"),
    body("name").notEmpty().withMessage('Property name is required').matches(/^[A-Za-z ]+$/).withMessage('Property name only includes characters').isLength({ min: 3, max: 40 }).withMessage('Property name must be between 3 and 40 characters long'),
    body("location").notEmpty().withMessage('Location is required').isLength({min:1 , max:100}).withMessage('Location must be between 1 and 100'),
    body("state").notEmpty().withMessage('State is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid state'),
    body("city").notEmpty().withMessage('City is required').matches(/^[0-9]{1,2}$/).withMessage('Invalid city'),
    body("pincode").notEmpty().withMessage('Pincode is required').isPostalCode('IN').withMessage('Pincode is invalid'),
    body("total_rooms").notEmpty().withMessage('Total rooms is required').matches(/^[0-9]+$/).withMessage("Only number is allowed in total rooms"),
    body("status").matches(/^(Active|Under Maintenance|Closed)$/).withMessage('Property status is invalid')
]

export const add_tenant = [
    body('name').notEmpty().withMessage('Tenant name is required').matches(/^[A-Za-z ]+$/).withMessage('Tenant name only includes characters').isLength({ min: 3, max: 30 }).withMessage('Tenant name must be between 3 and 40 characters long'),
    body('phone').notEmpty().withMessage('Phone number is required').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits only'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('aadhar').notEmpty().withMessage('Aadhar is required').matches(/^data:(.+);base64,(.+)$/).withMessage('Please send a valid format of aadhar card (base64)'),
    body('pan').notEmpty().withMessage('Pan is required').matches(/^data:(.+);base64,(.+)$/).withMessage('Please send a valid format of pan card (base64)'),
    body('parent_contact').notEmpty().withMessage('Parent number is required').matches(/^[0-9]{10}$/).withMessage('Parent number must be 10 digits only'),
    body('emergency_contact').notEmpty().withMessage('Emergency number is required').matches(/^[0-9]{10}$/).withMessage('Emergency number must be 10 digits only'),
    body("password").notEmpty().withMessage('Password is required').isStrongPassword().withMessage('Password must be 8-15 chars with A-Z, a-z, 0-9 & special char'),
    body('move_in_date').notEmpty().withMessage('Move in date is required').isDate({
        format: 'YYYY-MM-DD',
        delimiters: ['-'],
        strictMode: true,
      }).withMessage('Move in date Is invalid'),
    body('rent_due_date').notEmpty().withMessage('Rent due date is required').isDate({
        format: 'YYYY-MM-DD',
        delimiters: ['-'],
        strictMode: true,
      }).withMessage('Rent due date is invalid'),
    body('profile_photo').notEmpty().withMessage('Profile photo is required').matches(/^data:(.+);base64,(.+)$/).withMessage('Profile photo format is invalid'),
    body('rent_status').notEmpty().withMessage('Rent status is required').matches(/^(Paid|Pending)$/).withMessage('Rent status is invalid'),

]

export const update_tenant = [
    body('id').notEmpty().withMessage('Id is required '),
    body('name').notEmpty().withMessage('Tenant name is required').matches(/^[A-Za-z ]+$/).withMessage('Tenant name only includes characters').isLength({ min: 3, max: 30 }).withMessage('Tenant name must be between 3 and 40 characters long'),
    body('phone').notEmpty().withMessage('Phone number is required').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits only'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('aadhar').notEmpty().withMessage('Aadhar is required').matches(/^data:(.+);base64,(.+)$/).withMessage('Please send a valid format of aadhar card (base64)'),
    body('pan').notEmpty().withMessage('Pan is required').matches(/^data:(.+);base64,(.+)$/).withMessage('Please send a valid format of pan card (base64)'),
    body('parent_contact').notEmpty().withMessage('Parent number is required').matches(/^[0-9]{10}$/).withMessage('Parent number must be 10 digits only'),
    body('emergency_contact').notEmpty().withMessage('Emergency number is required').matches(/^[0-9]{10}$/).withMessage('Emergency number must be 10 digits only'),
    body("password").notEmpty().withMessage('Password is required').isStrongPassword().withMessage('Password must be 8-15 chars with A-Z, a-z, 0-9 & special char'),
    body('move_in_date').notEmpty().withMessage('Move in date is required').isDate({
        format: 'YYYY-MM-DD',
        delimiters: ['-'],
        strictMode: true,
      }).withMessage('Move in date Is invalid'),
    body('rent_due_date').notEmpty().withMessage('Rent due date is required').isDate({
        format: 'YYYY-MM-DD',
        delimiters: ['-'],
        strictMode: true,
      }).withMessage('Rent due date is invalid'),
    body('profile_photo').notEmpty().withMessage('Profile photo is required').matches(/^data:(.+);base64,(.+)$/).withMessage('Profile photo format is invalid'),
    body('rent_status').notEmpty().withMessage('Rent status is required').matches(/^(Paid|Pending)$/).withMessage('Rent status is invalid'),
]
