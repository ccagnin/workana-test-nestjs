import { Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { User } from './entities/user.entity'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Address } from './entities/address.entity'
import { AddressService } from './services/address.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Address]), HttpModule],
  providers: [UserService, AddressService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
