import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { User } from '../../entitys/User'

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
         return res.sendStatus(401)
      }

      const token = authHeader.split(' ')[1]

      if (!token) {
         return res.sendStatus(401)
      }

      if (!process.env.ACCESS_TOKEN_SECRET) {
         return res.sendStatus(500)
      }

      jwt.verify(
         token,
         process.env.ACCESS_TOKEN_SECRET,
         async (err: VerifyErrors | null, decoded: any) => {
            if (err) {
               return res.sendStatus(403)
            }

            const { username } = decoded // username sent in jwtSign

            const user = await User.findOne({
               where: { username: username },
            }) // finds the user where username is equal to the username that been recieved from decoded

            if (!user) {
               return res.sendStatus(403)
            }

            res.locals.user = user // saves user in res locals for next middleware
            next()
         }
      )
   } catch (error) {
      console.error(error)
      res.sendStatus(500)
   }
}
