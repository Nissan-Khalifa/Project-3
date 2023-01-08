import 'dotenv/config'
import express, { Application, Request, Response } from 'express'

const app: Application = express()
app.use(express.json())

app.listen(process.env.APP_PORT, () =>
   console.log(`Server is listening on port ${process.env.APP_PORT}`)
)
