export interface Address {
  id: number
  userId: number
  street: string
  city: string
  state: string
  zip: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: number
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  address: Address
}
