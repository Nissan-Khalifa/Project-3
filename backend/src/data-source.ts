import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { RDBMS_MYSQL } from './constants'
import { User } from './entitys/User'
import { Vacation } from './entitys/Vacation'

export const AppDataSource = new DataSource({
   type: RDBMS_MYSQL,
   host: process.env.MYSQL_HOST,
   port: +process.env.MYSQL_PORT,
   username: process.env.MYSQL_USERNAME,
   password: process.env.MYSQL_PASSWORD,
   database: process.env.MYSQL_DB_NAME,
   synchronize: true,
   logging: false,
   entities: [User, Vacation],
   migrations: [],
   subscribers: [],
})
