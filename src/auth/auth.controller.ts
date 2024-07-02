import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth-dto'
// import { Request } from 'express'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { setTokens } from 'src/utils/cookie-helper'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const { accessToken, refreshToken, ...user } =
      await this.authService.signUp(createUserDto)

    setTokens(res, accessToken, refreshToken)

    return res.status(201).json(user)
  }

  @Post('signin')
  async signIn(@Body() authDto: AuthDto, @Res() res: Response) {
    const { accessToken, refreshToken, ...user } =
      await this.authService.signIn(authDto)

    setTokens(res, accessToken, refreshToken)

    return res.status(200).json(user)
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
