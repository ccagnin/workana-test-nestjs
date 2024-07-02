import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/services/user.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/user/entities/user.entity'
import { AuthDto } from './dto/auth-dto'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto)

    const accessToken = this.jwtService.sign({
      sub: newUser.id,
      user: newUser.email,
    })

    const refreshToken = this.jwtService.sign(
      { sub: newUser.id, user: newUser.email },
      {
        secret: this.configService.get<string>('SECRET_REFRESH'),
        expiresIn: '7d',
      },
    )

    await this.updateRefreshToken(newUser.id, refreshToken)

    return { accessToken, refreshToken }
  }

  async signIn(authDto: AuthDto) {
    const user = await this.validateUser(authDto.email, authDto.password)
    if (!user) throw new UnauthorizedException()

    const accessToken = this.jwtService.sign({
      sub: user.id,
      user: user.email,
    })

    const refreshToken = this.jwtService.sign(
      { sub: user.id, user: user.email },
      {
        secret: this.configService.get<string>('SECRET_REFRESH'),
        expiresIn: '7d',
      },
    )

    await this.updateRefreshToken(user.id, refreshToken)

    return { accessToken, refreshToken }
  }

  async logout(userId: string) {
    return this.userService.update(userId, { refreshToken: null })
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      return user
    }
    return null
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.userService.update(userId, { refreshToken: hashedRefreshToken })
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, user: email },
        {
          secret: this.configService.get<string>('SECRET_KEY'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, user: email },
        {
          secret: this.configService.get<string>('SECRET_REFRESH'),
          expiresIn: '7d',
        },
      ),
    ])

    return { accessToken, refreshToken }
  }
}
