import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, MoreThan } from 'typeorm'
import { User } from '../entities/user.entity'
import { AddressService } from './address.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { EmailAlreadyExistsException } from '../exceptions/user.exception'
import * as bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import { FakeMailerService } from 'src/fake-mailer/services/fake-mailer.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private addressService: AddressService,
    private mailerService: FakeMailerService,
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

  async getAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['addresses'] })
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

  async requestPasswordReset(email: string) {
    const user = await this.findByEmail(email)
    if (!user) {
      throw new BadRequestException('Email não encontrado')
    }

    const resetToken = uuidv4()
    const resetPasswordExpires = new Date()
    resetPasswordExpires.setHours(resetPasswordExpires.getHours() + 1)
    await this.update(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires,
    })

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`

    await this.mailerService.sendPasswordResetEmail(
      user.email,
      resetUrl,
      user.name,
    )
  }

  async resetPassword(token: string, password: string) {
    const user = await this.findByResetPasswordToken(token)
    if (!user || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Token inválido ou expirado')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await this.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    })

    return { message: 'Senha alterada com sucesso!' }
  }
}
