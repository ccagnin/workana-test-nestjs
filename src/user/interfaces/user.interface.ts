import { Address } from './address.interface'

export interface User {
  id: string
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  address: Address
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}
