import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { ResetPasswordDto } from '../dto/reset-password.dto'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all-users')
  async getAll() {
    return await this.userService.getAll()
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return this.userService.requestPasswordReset(email)
  }

  @Post('reset-password')
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.userService.resetPassword(token, resetPasswordDto.password)
  }
}
