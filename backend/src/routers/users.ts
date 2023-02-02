import { Request, Response, Router } from 'express'
import { validationResult } from 'express-validator'
import { findUsers, createUser, deleteUserById } from '../controllers/users'
import matchedDataForUser from '../middlewares/matchedDataForUser'
import { formValidator } from '../middlewares/formValidatorForUser'
import passwordValidator from '../middlewares/passwordValidator'
import passwordEncryptor from '../middlewares/passwordEncryptor'
import jwtSign from '../middlewares/jwtSign'
import { User } from '../entitys/User'
import loginValidator from '../middlewares/loginValidator'
import jwtVerify from '../middlewares/authintications/jwtVerify'
import authinticateAdmin from '../middlewares/authintications/authinticateAdmin'

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

router.post(
   '/register',
   [
      matchedDataForUser,
      ...formValidator,
      passwordValidator,
      passwordEncryptor,
      jwtSign,
   ],
   async (req: Request, res: Response) => {
      try {
         if (!validationResult(req).isEmpty()) {
            return res
               .status(400)
               .send({ errors: validationResult(req).array() })
         }
         // const newUser = await createUser({
         //    first_name: req.body.first_name,
         //    last_name: req.body.last_name,
         //    username: req.body.username,
         //    password: res.locals.password,
         // })
         const newUser: User = await createUser({
            ...req.body,
            password: res.locals.password,
         })
         res.send({ newUser, accessToken: res.locals.accessToken })
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

router.post(
   '/login',
   [matchedDataForUser, ...formValidator, loginValidator, jwtSign],
   async (req: Request, res: Response) => {
      try {
         if (!validationResult(req).isEmpty()) {
            return res
               .status(400)
               .send({ errors: validationResult(req).array() })
         }
         res.send({
            accessToken: res.locals.accessToken,
            isAdmin: res.locals.is_admin,
         })
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

// delete user by id -- for user!
router.delete(
   '/:id',
   [jwtVerify, authinticateAdmin],
   async (req: Request, res: Response) => {
      try {
         const isDeleted = await deleteUserById(+req.params.id)
         isDeleted
            ? res.send(`User ${req.params.id} is deleted`)
            : res.send('Nothing is deleted')
      } catch (error) {
         console.error(error.message)
         res.sendStatus(500)
      }
   }
)

export default router
