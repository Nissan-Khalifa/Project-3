import 'dotenv/config'
import express, { Application, Request, Response } from 'express'
import { AppDataSource } from './data-source'
import users from './routers/users'
import vacations from './routers/vacations'

//
;(async () => {
   try {
      await AppDataSource.initialize() // starts the the database connection

      console.log('Successfully connected to mysql')

      const app: Application = express()
      app.use(express.json())

      app.use('/users', users)
      app.use('/vacations', vacations)

      app.listen(process.env.APP_PORT, () =>
         console.log(`Server is listening on port ${process.env.APP_PORT}`)
      )
   } catch (error) {
      console.error(error.message)
   }
})()
