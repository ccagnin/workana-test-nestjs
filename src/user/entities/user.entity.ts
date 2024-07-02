import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
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

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  addresses: Address

  @Column({ nullable: true })
  refreshToken: string | null

  @Column({ nullable: true })
  resetPasswordToken: string | null

  @Column({ nullable: true })
  resetPasswordExpires: Date | null
}
