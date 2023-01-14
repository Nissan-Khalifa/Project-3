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

   @Column({ type: 'varchar', length: 10, nullable: false })
   first_name: string

   @Column({ type: 'varchar', length: 10, nullable: false })
   last_name: string

   @Column({ type: 'varchar', nullable: false })
   email: string

   @Column({ type: 'varchar', length: 10, nullable: false })
   username: string

   @Column({ type: 'varchar', nullable: false })
   password: string

   @ManyToMany(() => Vacation, (vacation) => vacation.users, {
      onDelete: 'CASCADE',
   })
   vacations: Vacation[]
}
