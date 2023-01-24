import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
   if (req.url === '/create-vacation' || req.url === '/create-vacation/') {
      const matchedData = [
         'discreption',
         'destination',
         'img_url',
         'start_date',
         'end_date',
         'price',
         'followers',
         'is_recommended_by_admin',
      ]
      for (const key in req.body) {
         if (!matchedData.includes(key)) {
            return res.status(400).send({ error: `Invalid property ${key}` })
         }
      }
   }
   next()
}
