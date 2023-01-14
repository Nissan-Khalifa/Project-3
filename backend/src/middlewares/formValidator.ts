import { body, ValidationChain } from 'express-validator'

const validator: ValidationChain[] = [
   body('email').isEmail().withMessage('Invalid email'),
]

const registerValidator = [
   ...validator,
   body('username').notEmpty().withMessage('Username is requiered'),
   body('first_name').notEmpty().withMessage('First name is required'),
   body('last_name').notEmpty().withMessage('Last name is required'),
]

export { registerValidator, validator as loginValidator }
