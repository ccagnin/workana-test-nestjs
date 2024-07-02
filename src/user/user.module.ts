import { Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { User } from './entities/user.entity'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Address } from './entities/address.entity'
import { AddressService } from './services/address.service'
import { FakeMailerModule } from 'src/fake-mailer/modules/fake-mailer.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    HttpModule,
    FakeMailerModule,
  ],
  providers: [UserService, AddressService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
