import { Request, Response, Router } from 'express'
import { findUsers, createUser, deleteUserById } from '../controllers/users'

const router: Router = Router()

// get user by id -- for admin
router.get('/:id', async (req: Request, res: Response) => {
   try {
      const [user] = await findUsers(+req.params.id)
      user ? res.send(user) : res.sendStatus(404)
   } catch (error) {
      console.error(error.message)
      res.sendStatus(500)
   }
})

// get all users -- for admin
router.get('/', async (req: Request, res: Response) => {
   try {
      const users = await findUsers()
      users.length ? res.send(users) : res.sendStatus(404)
   } catch (error) {
      console.error(error.message)
      res.sendStatus(500)
   }
})

// create new user (register)
router.post('/', async (req: Request, res: Response) => {
   try {
      const newUser = await createUser(req.body)
      res.send(newUser)
   } catch (error) {
      console.error(error.message)
      res.sendStatus(500)
   }
})

// delete user by id -- for user!
router.delete('/:id', async (req: Request, res: Response) => {
   try {
      const isDeleted = await deleteUserById(+req.params.id)
      isDeleted
         ? res.send(`User ${req.params.id} is deleted`)
         : res.send('Nothing is deleted')
   } catch (error) {
      console.error(error.message)
      res.sendStatus(500)
   }
})

export default router
