import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/entities/user.entity'
import { Address } from './user/entities/address.entity'
import { ConfigModule } from '@nestjs/config'
import { FakeMailerModule } from './fake-mailer/modules/fake-mailer.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Address],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    FakeMailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
