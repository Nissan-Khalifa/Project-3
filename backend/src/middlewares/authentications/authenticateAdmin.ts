import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
   try {
      const user = res.locals.user
      if (user.is_admin === true) {
         return next()
      }
      res.sendStatus(403)
   } catch (error) {
      console.error(error)
      res.sendStatus(500)
   }
}
