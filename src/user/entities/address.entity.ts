import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
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

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  zip: string

  @ManyToOne(() => User, (user) => user.addresses)
  user: User
}
