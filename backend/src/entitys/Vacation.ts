import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

enum Currency {
   ILS = 'ILS',
   USD = 'USD',
   EUR = 'EUR',
}

Entity()
export class Vacation extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'varchar', length: 255, nullable: true })
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
}
