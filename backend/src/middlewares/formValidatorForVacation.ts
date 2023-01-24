import { body, ValidationChain } from 'express-validator'

const createVacationValidator: ValidationChain[] = [
   body('discription').notEmpty().withMessage('Discription is requiered'),
   body('destination').notEmpty().withMessage('Destination is required'),
   body('img_url').notEmpty().withMessage('Img Url is required'),
   body('start_date').notEmpty().withMessage('Start Date is required'),
   body('end_date').notEmpty().withMessage('End Date is required'),
   body('price').notEmpty().withMessage('Price is required'),
   body('followers').notEmpty().withMessage('Followers is required'),
   body('is_recommended_by_admin')
      .notEmpty()
      .withMessage('Is Recommended By Admin is required'),
]
export default createVacationValidator
