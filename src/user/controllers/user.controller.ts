import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all-users')
  async getAll() {
    return await this.userService.getAll()
  }
}
