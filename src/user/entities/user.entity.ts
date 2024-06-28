import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Address } from './address.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses: Address[]

  @Column({ nullable: true })
  resetPasswordToken: string | null

  @Column({ nullable: true })
  resetPasswordExipires: Date | null
}
