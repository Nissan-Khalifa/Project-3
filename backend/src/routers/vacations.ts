import { Request, Response, Router } from 'express'
import {
   createVacation,
   findVacations,
   deleteVacationById,
   updateVacation,
} from '../controllers/vacations'
import authenticateAdmin from '../middlewares/authentications/authenticateAdmin'
import jwtVerify from '../middlewares/authentications/jwtVerify'
import createVacationValidator from '../middlewares/formValidatorForVacation'
import matchedDataForVacation from '../middlewares/matchedDataForVacation'

const router: Router = Router()

// gets vacation by id -- for search bar
router.get('/:id', async (req: Request, res: Response) => {
   try {
      const [vacation] = await findVacations(+req.params.id)
      vacation ? res.send(vacation) : res.sendStatus(404)
   } catch (error) {
      console.error(error.message)
      res.sendStatus(500)
   }
})

// gets all vacations -- when page is loaded (for all)
router.get(
   '/',
   // [jwtVerify],
   async (req: Request, res: Response) => {
      try {
         const vacation = await findVacations()
         vacation.length ? res.send(vacation) : res.sendStatus(404)
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

// creates a new vacation  -- must be admin!
router.post(
   '/create-vacation',
   [
      matchedDataForVacation,
      ...createVacationValidator,
      jwtVerify,
      authenticateAdmin,
   ],
   async (req: Request, res: Response) => {
      try {
         const newVacation = await createVacation(req.body)
         res.send(newVacation)
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

// update a vacation by id -- must be admin!
router.patch(
   '/:id',
   [jwtVerify, authenticateAdmin],
   async (req: Request, res: Response) => {
      try {
         const isUpdated = await updateVacation(+req.params.id, req.body)
         isUpdated
            ? res.send(`Vacation ${req.params.id} is updated`)
            : res.send('Nothing is updated')
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

// deletes vacation by id -- must be admin!
router.delete(
   '/:id',
   [jwtVerify, authenticateAdmin],
   async (req: Request, res: Response) => {
      try {
         const isDeleted = await deleteVacationById(+req.params.id)
         isDeleted
            ? res.send(`Vacation ${req.params.id} deleted!`)
            : res.send('Nothing is deleted')
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

export default router
