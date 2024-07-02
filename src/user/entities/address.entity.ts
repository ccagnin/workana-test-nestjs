import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  street: string

  @Column()
  neighborhood: string

  @Column()
  number: string

  @Column({ nullable: true })
  complement?: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  zip: string

  @OneToOne(() => User, (user) => user.addresses)
  user: User
}
