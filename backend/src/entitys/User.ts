import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   ManyToMany,
} from 'typeorm'
import { Vacation } from './Vacation'

@Entity('users')
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 10 })
   first_name: string

   @Column({ type: 'varchar', length: 10 })
   last_name: string

   @Column({ type: 'varchar', length: 10 })
   username: string

   @Column({ type: 'varchar'})
   password: string

   @ManyToMany(() => Vacation, (vacation) => vacation.users, {
      onDelete: 'CASCADE',
   })
   vacations: Vacation[]
}
