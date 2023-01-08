import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 10 })
   first_name: string

   @Column({ type: 'varchar', length: 10 })
   last_name: string

   @Column({ type: 'varchar', length: 10 })
   username: string

   @Column({ type: 'varchar', length: 8 })
   password: string
}
