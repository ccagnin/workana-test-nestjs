import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { Request } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request & { user: { email: string } }) {
    return this.userService.findByEmail(req.user.email)
  }
}
