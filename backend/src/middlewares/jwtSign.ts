import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      if (!process.env.ACCESS_TOKEN_SECRET) {
         return res.sendStatus(500)
      }

      const { username } = req.body

      jwt.sign(
         { username },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: '20m' },
         (err: Error | null, accessToken: string | undefined) => {
            if (err) {
               console.error(err)
               return res.sendStatus(500)
            }
            res.locals.accessToken = accessToken
            next()
         }
      )
   } catch (error) {
      console.error(error)
      res.sendStatus(500)
   }
}
