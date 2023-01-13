import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   BaseEntity,
   ManyToMany,
   JoinTable,
} from 'typeorm'
import { User } from './User'
enum Currency {
   ILS = 'ILS',
   USD = 'USD',
   EUR = 'EUR',
}

@Entity('vacations')
export class Vacation extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 255, nullable: false })
   discreption: string

   @Column()
   destination: string

   @Column()
   img_url: string

   @Column({ nullable: false })
   start_date: Date

   @Column({ nullable: false })
   end_date: Date

   @Column('decimal', { precision: 6 })
   price: string

   @Column({ type: 'enum', enum: Currency, nullable: false })
   currency: Currency

   @Column()
   followers: number

   @Column({ nullable: false })
   is_recommended_by_admin: boolean

   @ManyToMany(() => User, (user) => user.vacations)
   @JoinTable({
      name: 'vacations-users',
      joinColumn: {
         name: 'vacation_id',
         referencedColumnName: 'id',
      },
      inverseJoinColumn: {
         name: 'user_id',
         referencedColumnName: 'id',
      },
   })
   users: User[]
}
