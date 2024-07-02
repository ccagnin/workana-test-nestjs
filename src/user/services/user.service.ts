import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan } from 'typeorm'
import { User } from '../entities/user.entity'
import { AddressService } from './address.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { EmailAlreadyExistsException } from '../exceptions/user.exception'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private addressService: AddressService,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const { addresses, ...userData } = user

    const existingUser = await this.usersRepository.findOne({
      where: { email: userData.email },
    })

    if (existingUser) throw new EmailAlreadyExistsException()

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    })
    const savedUser = await this.usersRepository.save(newUser)

    try {
      const savedAddress = await this.addressService.createWithUser(
        addresses,
        savedUser,
      )
      savedUser.addresses = savedAddress
      return this.usersRepository.save(savedUser)
    } catch (error) {
      await this.usersRepository.remove(savedUser)
      throw error
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['addresses'],
    })
  }

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['addresses'],
    })
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, user)
    return this.usersRepository.findOne({ where: { id } })
  }

  async findByResetPasswordToken(token: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    })
  }
}
