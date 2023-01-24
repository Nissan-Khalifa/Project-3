import { compare } from 'bcryptjs'
import { NextFunction, Request, Response } from 'express'
import { User } from '../entitys/User'

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = await User.findOne({
         where: { username: req.body.username },
      })

      if (!user) {
         return res.status(401).send({ errors: ['username does not exists'] })
      }

      const isPasswordValid = await compare(req.body.password, user.password)
      if (!isPasswordValid) {
         return res.status(401).send({ errors: ['password is invalid'] })
      }

      res.locals.is_admin = user.is_admin

      next()
   } catch (error) {
      console.error(error)
      res.sendStatus(500)
   }
}
