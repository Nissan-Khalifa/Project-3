import { Request, Response, NextFunction } from 'express'
import PasswordValidator from 'password-validator'

const schema: PasswordValidator = new PasswordValidator()

schema
   .is()
   .min(8)
   .is()
   .max(16)
   .has()
   .uppercase()
   .has()
   .lowercase()
   .has()
   .digits(2)
   .has()
   .not()
   .spaces()
   .is()
   .not()
   .oneOf(['123', '456', '789'])

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      const validation = schema.validate(req.body.password, {
         details: true,
      }) as any[]
      // console.log(validation)
      if (!validation.length) {
         next()
      } else {
         return res.status(400).send({ errors: [validation] })
      }
   } catch (error) {
      console.error(error.message)
      res.sendStatus(500)
   }
}
