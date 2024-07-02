import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth-dto'
// import { Request } from 'express'
import { CreateUserDto } from 'src/user/dto/create-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('signin')
  async signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto)
  }

  // @Post('forgot-password')
  // async forgotPassword(@Body('email') email: string) {
  //   await this.authService.forgotPassword(email)
  //   return { message: 'Password reset link sent' }
  // }

  // @Post('reset-password')
  // async resetPassword(
  //   @Body('token') token: string,
  //   @Body('newPassword') newPassword: string,
  // ) {
  //   await this.authService.resetPassword(token, newPassword)
  //   return { message: 'Password reset successful' }
  // }
}
