import 'dotenv/config'
import express, { Application, Request, Response } from 'express'
import { AppDataSource } from './data-source'

//
;(async () => {
   try {
      await AppDataSource.initialize()

      console.log('Successfully connected to mysql')

      const app: Application = express()
      app.use(express.json())

      app.listen(process.env.APP_PORT, () =>
         console.log(`Server is listening on port ${process.env.APP_PORT}`)
      )
   } catch (error) {
      console.error(error.message)
   }
})()
